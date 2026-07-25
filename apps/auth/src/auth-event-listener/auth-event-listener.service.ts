import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AppointmentEventData } from "./auth-event-listener.controller";

@Injectable()
export class AuthEventListenerService {
  constructor(private readonly prismaService: PrismaService) {}

  async handleAppointmentCreated(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Requested appointment with Dr. ${doctor.name}`,
      },
    });

    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `Received appointment request from ${user.name}`,
      },
    });
  }
  async handleAppointmentConfirmed(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Dr. ${doctor.name} confirmed your appointment`,
      },
    });

    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `You confirmed an appointment with ${user.name}`,
      },
    });
  }
  async handleAppointmentCanceled(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Canceled appointment with Dr. ${doctor.name}`,
      },
    });
    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `Appointment canceled with ${user.name}`,
      },
    });
  }
  async handleAppointmentRescheduled(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Rescheduled appointment with Dr. ${doctor.name}`,
      },
    });
    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `Appointment rescheduled with ${user.name}`,
      },
    });
  }
  async handleAppointmentCompleted(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Appointment with Dr. ${doctor.name} was completed`,
      },
    });

    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `Appointment with ${user.name} was completed`,
      },
    });
  }

  async handleAppointmentRejected(data: AppointmentEventData) {
    const user = await this.prismaService.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${data.userId} not found`);
    }
    const doctor = await this.prismaService.user.findUnique({
      where: { id: data.doctorId },
    });

    if (!doctor) {
      throw new Error(`Doctor with ID ${data.doctorId} not found`);
    }

    await this.prismaService.auditlog.create({
      data: {
        user_id: user.id,
        action: `Dr. ${doctor.name} rejected your appointment request`,
      },
    });

    await this.prismaService.auditlog.create({
      data: {
        user_id: doctor.id,
        action: `You rejected an appointment request from ${user.name}`,
      },
    });
  }
}
