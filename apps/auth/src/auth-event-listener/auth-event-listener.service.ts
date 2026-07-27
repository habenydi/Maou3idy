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
    await this.prismaService.notification.create({
      data: {
        user_id: doctor.id,
        message: `You have a new appointment request from ${user.name}.`,
        title: "New Appointment Request",
        isRead: false,
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

    await this.prismaService.notification.create({
      data: {
        user_id: user.id,
        message: `Dr. ${doctor.name} has confirmed your appointment.`,
        title: "Appointment Confirmed",
        isRead: false,
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

    await this.prismaService.notification.create({
      data: {
        user_id: doctor.id,
        message: `${user.name} has canceled their appointment with you.`,
        title: "Appointment Canceled",
        isRead: false,
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

    await this.prismaService.notification.create({
      data: {
        user_id: doctor.id,
        message: `${user.name} has rescheduled their appointment with you.`,
        title: "Appointment Rescheduled",
        isRead: false,
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

    await this.prismaService.notification.create({
      data: {
        user_id: user.id,
        message: `Your appointment with Dr. ${doctor.name} has been marked as completed.`,
        title: "Appointment Completed",
        isRead: false,
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

    await this.prismaService.notification.create({
      data: {
        user_id: user.id,
        message: `Dr. ${doctor.name} has rejected your appointment request.`,
        title: "Appointment Rejected",
        isRead: false,
      },
    });
  }
}
