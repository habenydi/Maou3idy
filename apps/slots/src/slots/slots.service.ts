import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSlotsDto } from "./dto/create-slots.dto";
import { UpdateSlotDto } from "./dto/update-slots.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class SlotsService {
    constructor(private prisma: PrismaService) { }

    private async getDoctorByUserId(userId: string) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { user_id: userId },
        });

        if (!doctor) {
            throw new NotFoundException("Doctor profile not found");
        }

        return doctor;
    }

    /** Parse a "YYYY-MM-DD" string as local midnight (avoids UTC shift bug). */
    private parseLocalDate(dateStr: string): Date {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    /** Format a Date to "YYYY-MM-DD" using local time (avoids toISOString() UTC shift). */
    private toLocalDateStr(date: Date): string {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");
    }

    private combineDateAndTime(date: Date, time: string): Date {
        const [hours, minutes] = time.split(":").map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    }

    async generateSlots(doctorId: string, dto: CreateSlotsDto) {
        const {
            start_date,
            number_of_days,
            start_hour,
            end_hour,
            duration,
            buffer_time,
        } = dto;

        const now = new Date();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Parse as local midnight — avoids UTC offset shifting the date back by one day
        const startDate = this.parseLocalDate(start_date);

        if (startDate < today) {
            throw new BadRequestException("Start date cannot be in the past");
        }

        if (start_hour >= end_hour) {
            throw new BadRequestException("End time must be after start time");
        }

        const slots: Prisma.SlotsCreateManyInput[] = [];

        for (let d = 0; d < number_of_days; d++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + d);

            const dateOnly = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate(),
            );

            // Use local date formatting instead of toISOString() which converts to UTC
            const dateStr = this.toLocalDateStr(day);

            let current = new Date(`${dateStr}T${start_hour}:00`);
            const end = new Date(`${dateStr}T${end_hour}:00`);

            while (current < end) {
                const slotEnd = new Date(current.getTime() + duration * 60000);
                if (slotEnd > end) break;

                slots.push({
                    doctor_id: doctorId,
                    date: dateOnly,
                    start_time: current.toTimeString().slice(0, 5),
                    end_time: slotEnd.toTimeString().slice(0, 5),
                    is_booked: false,
                    status: current < now ? "UNAVAILABLE" : "AVAILABLE",
                });

                current = new Date(slotEnd.getTime() + buffer_time * 60000);
            }
        }

        const result = await this.prisma.$transaction(async (tx) => {
            const deleted = await tx.slots.deleteMany({
                where: {
                    doctor_id: doctorId,
                    is_booked: false,
                    date: { gte: today },
                },
            });

            const created = await tx.slots.createMany({ data: slots });

            return { deleted: deleted.count, created: created.count };
        });

        return result;
    }

    async generateSlotsForCurrentDoctor(userId: string, dto: CreateSlotsDto) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.generateSlots(doctor.id, dto);
    }

    /** Fetch all slots, ordered chronologically. */
    findAll() {
        return this.prisma.slots.findMany({
            orderBy: [{ date: "asc" }, { start_time: "asc" }],
        });
    }

    findOneSlot(id: string) {
        return this.prisma.slots.findUnique({ where: { id } });
    }

    findByDoctorId(doctorId: string) {
        return this.prisma.slots.findMany({
            where: { doctor_id: doctorId },
            orderBy: [{ date: "asc" }, { start_time: "asc" }],
        });
    }

    async updateSlot(id: string, dto: UpdateSlotDto, doctorId?: string) {
        const slot = await this.prisma.slots.findUnique({ where: { id } });

        if (!slot) throw new NotFoundException("Slot not found");

        if (doctorId && slot.doctor_id !== doctorId) {
            throw new ForbiddenException("You can only modify your own slots");
        }

        if (slot.is_booked || slot.status === "BOOKED") {
            throw new BadRequestException("Booked slots cannot be modified");
        }

        const data: Prisma.SlotsUpdateInput = {};
        if (dto.date) data.date = this.parseLocalDate(dto.date);
        if (dto.start_time) data.start_time = dto.start_time;
        if (dto.end_time) data.end_time = dto.end_time;

        return this.prisma.slots.update({ where: { id }, data });
    }

    async deleteSlot(id: string, doctorId?: string) {
        const slot = await this.prisma.slots.findUnique({ where: { id } });

        if (!slot) throw new NotFoundException("Slot not found");

        if (doctorId && slot.doctor_id !== doctorId) {
            throw new ForbiddenException("You can only delete your own slots");
        }

        if (slot.is_booked || slot.status === "BOOKED") {
            throw new BadRequestException("Booked slot cannot be deleted");
        }

        await this.prisma.slots.delete({ where: { id } });
        return { success: true };
    }

    async findCurrentDoctorSlots(userId: string) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.findByDoctorId(doctor.id);
    }

    async clearCurrentDoctorSlots(userId: string) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.clearDoctorSlots(doctor.id);
    }

    async updateCurrentDoctorSlot(userId: string, id: string, dto: UpdateSlotDto) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.updateSlot(id, dto, doctor.id);
    }

    async deleteCurrentDoctorSlot(userId: string, id: string) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.deleteSlot(id, doctor.id);
    }

    async bookSlot(id: string) {
        const slot = await this.prisma.slots.findUnique({ where: { id } });
        if (!slot) throw new NotFoundException("Slot not found");

        const slotStart = this.combineDateAndTime(slot.date, slot.start_time);
        if (slotStart < new Date()) {
            throw new BadRequestException("Past slots cannot be booked");
        }

        // Atomic: only succeeds if the slot is STILL unbooked at write time.
        // Prevents two concurrent requests from both booking the same slot.
        const result = await this.prisma.slots.updateMany({
            where: { id, is_booked: false, status: { not: "BOOKED" } },
            data: { is_booked: true, status: "BOOKED" },
        });

        if (result.count === 0) {
            throw new BadRequestException("Slot is already booked");
        }

        const updated = await this.prisma.slots.findUnique({ where: { id } });
        return { success: true, slot: updated };
    }

    async clearDoctorSlots(doctorId: string) {
        const result = await this.prisma.slots.deleteMany({
            where: {
                doctor_id: doctorId,
                is_booked: false,
                status: { notIn: ["BOOKED", "COMPLETED"] },
            },
        });
        return { deleted: result.count };
    }
}
