import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSlotsDto } from "./dto/create-slots.dto";
import { UpdateSlotDto } from "./dto/update-slots.dto";
import { BookServiceSlotDto } from "./dto/book-service-slot.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class SlotsService {
    constructor(private prisma: PrismaService) { }

    private async getDoctorByUserId(userId: string) {
        const doctor = await this.prisma.doctor.findUnique({
            where: { user_id: userId },
        });

        if (doctor) return doctor;

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(
                "User not found locally — auth sync may not have run yet",
            );
        }

        throw new NotFoundException(
            "Doctor profile not synced yet. Please wait a moment and retry.",
        );
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

    private parseTimeToMinutes(time: string): number {
        const [hours, minutes] = time.split(":").map(Number);

        if (
            Number.isNaN(hours) ||
            Number.isNaN(minutes) ||
            hours < 0 ||
            hours > 23 ||
            minutes < 0 ||
            minutes > 59
        ) {
            throw new BadRequestException("Invalid time format. Expected HH:MM");
        }

        return hours * 60 + minutes;
    }

    private minutesToTime(totalMinutes: number): string {
        const h = Math.floor(totalMinutes / 60) % 24;
        const m = totalMinutes % 60;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    private combineDateAndTime(date: Date, time: string): Date {
        const [hours, minutes] = time.split(":").map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined;
    }

    /**
     * Merges contiguous unbooked AVAILABLE slots for a doctor on a specific date.
     * Prevents database fragmentation when bookings are cancelled or shifts are created.
     */
    private async mergeDoctorAvailableSlots(
        tx: Prisma.TransactionClient | PrismaService,
        doctorId: string,
        date: Date,
    ) {
        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const nextDay = new Date(dateOnly);
        nextDay.setDate(dateOnly.getDate() + 1);

        const slots = await tx.slots.findMany({
            where: {
                doctor_id: doctorId,
                date: { gte: dateOnly, lt: nextDay },
                is_booked: false,
                status: "AVAILABLE",
            },
            orderBy: { start_time: "asc" },
        });

        if (slots.length <= 1) return;

        let currentSlot = slots[0];

        for (let i = 1; i < slots.length; i++) {
            const nextSlot = slots[i];
            const currentEndMinutes = this.parseTimeToMinutes(currentSlot.end_time);
            const nextStartMinutes = this.parseTimeToMinutes(nextSlot.start_time);
            const nextEndMinutes = this.parseTimeToMinutes(nextSlot.end_time);

            // Merge if adjacent or overlapping
            if (nextStartMinutes <= currentEndMinutes) {
                const newEndMinutes = Math.max(currentEndMinutes, nextEndMinutes);
                const newEndTimeStr = this.minutesToTime(newEndMinutes);

                currentSlot = await tx.slots.update({
                    where: { id: currentSlot.id },
                    data: { end_time: newEndTimeStr },
                });

                await tx.slots.delete({
                    where: { id: nextSlot.id },
                });
            } else {
                currentSlot = nextSlot;
            }
        }
    }

    async generateSlots(doctorId: string, dto: CreateSlotsDto) {
        const { start_date, number_of_days, shifts } = dto;

        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = this.parseLocalDate(start_date);
        if (startDate < today) {
            throw new BadRequestException("Start date cannot be in the past");
        }

        const slotsToCreate: Prisma.SlotsCreateManyInput[] = [];

        for (let d = 0; d < number_of_days; d++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + d);

            const dateOnly = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate(),
            );

            for (const shift of shifts) {
                const startMinutes = this.parseTimeToMinutes(shift.start_hour);
                const endMinutes = this.parseTimeToMinutes(shift.end_hour);

                if (startMinutes >= endMinutes) {
                    throw new BadRequestException("End time must be after start time in shifts");
                }

                const shiftEnd = this.combineDateAndTime(day, shift.end_hour);

                // Entire shift is only UNAVAILABLE if its end time has already passed
                const status = shiftEnd <= now ? "UNAVAILABLE" : "AVAILABLE";

                slotsToCreate.push({
                    doctor_id: doctorId,
                    date: dateOnly,
                    start_time: shift.start_hour,
                    end_time: shift.end_hour,
                    is_booked: false,
                    status: status,
                });
            }
        }

        return await this.prisma.$transaction(async (tx) => {
            await tx.slots.deleteMany({
                where: {
                    doctor_id: doctorId,
                    is_booked: false,
                    date: { gte: startDate },
                },
            });

            const created = await tx.slots.createMany({
                data: slotsToCreate,
                skipDuplicates: true,
            });

            // Merge contiguous shifts for each generated day
            for (let d = 0; d < number_of_days; d++) {
                const day = new Date(startDate);
                day.setDate(startDate.getDate() + d);
                await this.mergeDoctorAvailableSlots(tx, doctorId, day);
            }

            return { created: created.count };
        });
    }

    /**
     * Slices available continuous shift blocks into service duration windows.
     * Automatically ignores windows starting in the past when date is today.
     */
    async getAvailableWindowsForService(
        doctorId: string,
        serviceId: string,
        dateStr: string,
    ) {
        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!service) throw new NotFoundException("Service not found");
        if (service.doctor_id !== doctorId) {
            throw new BadRequestException("Service does not belong to this doctor");
        }

        const date = this.parseLocalDate(dateStr);
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);

        const shiftBlocks = await this.prisma.slots.findMany({
            where: {
                doctor_id: doctorId,
                date: { gte: date, lt: nextDay },
                status: "AVAILABLE",
                is_booked: false,
            },
            orderBy: { start_time: "asc" },
        });

        const serviceDurationMinutes = service.duration;
        const windows: { start_time: string; end_time: string; slot_id: string }[] = [];

        const now = new Date();
        const todayStr = this.toLocalDateStr(now);
        const isToday = dateStr === todayStr;
        const currentMinutesNow = now.getHours() * 60 + now.getMinutes();

        for (const block of shiftBlocks) {
            let currentMinutes = this.parseTimeToMinutes(block.start_time);
            const blockEndMinutes = this.parseTimeToMinutes(block.end_time);

            while (currentMinutes + serviceDurationMinutes <= blockEndMinutes) {
                // Skip windows that start in the past for today's date
                if (isToday && currentMinutes < currentMinutesNow) {
                    currentMinutes += serviceDurationMinutes;
                    continue;
                }

                const windowStartStr = this.minutesToTime(currentMinutes);
                const windowEndStr = this.minutesToTime(currentMinutes + serviceDurationMinutes);

                windows.push({
                    start_time: windowStartStr,
                    end_time: windowEndStr,
                    slot_id: block.id,
                });

                currentMinutes += serviceDurationMinutes;
            }
        }

        return {
            date: dateStr,
            service_id: serviceId,
            available: windows.length > 0,
            windows,
        };
    }

    async generateSlotsForCurrentDoctor(userId: string, dto: CreateSlotsDto) {
        const doctor = await this.getDoctorByUserId(userId);
        return this.generateSlots(doctor.id, dto);
    }

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

        const updated = await this.prisma.slots.update({ where: { id }, data });

        if (slot.doctor_id) {
            await this.mergeDoctorAvailableSlots(this.prisma, slot.doctor_id, updated.date);
        }

        return updated;
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

    async releaseCurrentDoctorSlot(userId: string, id: string) {
        const doctor = await this.getDoctorByUserId(userId);
        const slot = await this.prisma.slots.findUnique({ where: { id } });

        if (!slot) {
            throw new NotFoundException("Slot not found");
        }

        if (slot.doctor_id !== doctor.id) {
            throw new ForbiddenException("You can only modify your own slots");
        }

        if (slot.status !== "BOOKED" && slot.is_booked !== true) {
            throw new BadRequestException("Only booked slots can be released");
        }

        const released = await this.prisma.slots.update({
            where: { id },
            data: {
                is_booked: false,
                status: "AVAILABLE",
                user_id: null,
                service_id: null,
            },
        });

        await this.mergeDoctorAvailableSlots(this.prisma, doctor.id, released.date);
        return released;
    }

    async bookSlot(id: string) {
        const slot = await this.prisma.slots.findUnique({ where: { id } });
        if (!slot) throw new NotFoundException("Slot not found");

        const slotStart = this.combineDateAndTime(slot.date, slot.start_time);
        if (slotStart < new Date()) {
            throw new BadRequestException("Past slots cannot be booked");
        }

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

    async findCurrentUserBookings(userId: string) {
        return this.prisma.slots.findMany({
            where: {
                user_id: userId,
                status: { in: ["BOOKED", "COMPLETED", "CANCELLED"] },
            },
            include: {
                doctor: {
                    include: { user: true },
                },
                service: true,
            },
            orderBy: [{ date: "asc" }, { start_time: "asc" }],
        });
    }

    async findCurrentDoctorBookings(userId: string) {
        const doctor = await this.getDoctorByUserId(userId);

        return this.prisma.slots.findMany({
            where: {
                doctor_id: doctor.id,
                status: { in: ["BOOKED", "COMPLETED", "CANCELLED"] },
            },
            include: {
                user: true,
                service: true,
            },
            orderBy: [{ date: "asc" }, { start_time: "asc" }],
        });
    }

    async cancelCurrentUserBooking(userId: string, id: string) {
        const slot = await this.prisma.slots.findFirst({
            where: {
                id,
                user_id: userId,
                status: { in: ["BOOKED", "COMPLETED"] },
            },
        });

        if (!slot) {
            throw new NotFoundException("Booking not found");
        }

        if (slot.status === "COMPLETED") {
            throw new BadRequestException("Completed appointments cannot be cancelled");
        }

        const cancelled = await this.prisma.slots.update({
            where: { id },
            data: {
                is_booked: false,
                status: "AVAILABLE",
                user_id: null,
                service_id: null,
            },
        });

        if (slot.doctor_id) {
            await this.mergeDoctorAvailableSlots(this.prisma, slot.doctor_id, slot.date);
        }
        return cancelled;
    }

    async completeCurrentDoctorBooking(userId: string, id: string) {
        const doctor = await this.getDoctorByUserId(userId);
        const slot = await this.prisma.slots.findFirst({
            where: {
                id,
                doctor_id: doctor.id,
                status: "BOOKED",
            },
        });

        if (!slot) {
            throw new NotFoundException("Appointment not found");
        }

        return this.prisma.slots.update({
            where: { id },
            data: {
                status: "COMPLETED",
                is_booked: true,
            },
        });
    }

    async cancelCurrentDoctorBooking(userId: string, id: string) {
        const doctor = await this.getDoctorByUserId(userId);
        const slot = await this.prisma.slots.findFirst({
            where: {
                id,
                doctor_id: doctor.id,
                status: "BOOKED",
            },
        });

        if (!slot) {
            throw new NotFoundException("Appointment not found");
        }

        const cancelled = await this.prisma.slots.update({
            where: { id },
            data: {
                is_booked: false,
                status: "AVAILABLE",
                user_id: null,
                service_id: null,
            },
        });

        await this.mergeDoctorAvailableSlots(this.prisma, doctor.id, slot.date);
        return cancelled;
    }

    /**
     * Atomically books a dynamic service window.
     * Splits shift blocks into leftover AVAILABLE slots before/after the booking.
     */
    async bookServiceSlot(userId: string, dto: BookServiceSlotDto) {
        const { doctorId, serviceId, date: dateStr, start_time } = dto;

        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!service) throw new NotFoundException("Service not found");
        if (service.doctor_id !== doctorId) {
            throw new BadRequestException("Service does not belong to this doctor");
        }

        const date = this.parseLocalDate(dateStr);
        const bookingStartMinutes = this.parseTimeToMinutes(start_time);
        const bookingEndMinutes = bookingStartMinutes + service.duration;
        const bookingEndStr = this.minutesToTime(bookingEndMinutes);

        // Disallow booking past time windows
        const now = new Date();
        const bookingStartDateTime = this.combineDateAndTime(date, start_time);
        if (bookingStartDateTime < now) {
            throw new BadRequestException("Cannot book slots in the past");
        }

        return this.prisma.$transaction(async (tx) => {
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            const blocks = await tx.slots.findMany({
                where: {
                    doctor_id: doctorId,
                    date: { gte: date, lt: nextDay },
                    is_booked: false,
                    status: "AVAILABLE",
                },
            });

            // Locate block that encapsulates [start_time, bookingEndStr]
            const targetBlock = blocks.find((block) => {
                const bStart = this.parseTimeToMinutes(block.start_time);
                const bEnd = this.parseTimeToMinutes(block.end_time);
                return bStart <= bookingStartMinutes && bEnd >= bookingEndMinutes;
            });

            if (!targetBlock) {
                throw new BadRequestException(
                    "This time slot is no longer available or was just booked by someone else.",
                );
            }

            const blockStartMinutes = this.parseTimeToMinutes(targetBlock.start_time);
            const blockEndMinutes = this.parseTimeToMinutes(targetBlock.end_time);

            // 1. Create leftover block BEFORE booking (if any)
            if (blockStartMinutes < bookingStartMinutes) {
                await tx.slots.create({
                    data: {
                        doctor_id: doctorId,
                        date: targetBlock.date,
                        start_time: targetBlock.start_time,
                        end_time: start_time,
                        is_booked: false,
                        status: "AVAILABLE",
                    },
                });
            }

            // 2. Create leftover block AFTER booking (if any)
            if (bookingEndMinutes < blockEndMinutes) {
                await tx.slots.create({
                    data: {
                        doctor_id: doctorId,
                        date: targetBlock.date,
                        start_time: bookingEndStr,
                        end_time: targetBlock.end_time,
                        is_booked: false,
                        status: "AVAILABLE",
                    },
                });
            }

            // 3. Convert target block into the BOOKED record
            const bookedSlot = await tx.slots.update({
                where: { id: targetBlock.id },
                data: {
                    start_time: start_time,
                    end_time: bookingEndStr,
                    is_booked: true,
                    status: "BOOKED",
                    user_id: userId,
                    service_id: serviceId,
                },
            });

            return { success: true, booked_slot: bookedSlot };
        });
    }
}