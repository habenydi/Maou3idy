import { Controller } from "@nestjs/common";
import { AuthEventListenerService } from "./auth-event-listener.service";
import { MessagePattern } from "@nestjs/microservices";

export interface AppointmentEventData {
  userId: string;
  doctorId: string;
}

@Controller("auth-event-listener")
export class AuthEventListenerController {
  constructor(
    private readonly authEventListenerService: AuthEventListenerService,
  ) {}

  // Appointment event handlers
  @MessagePattern("appointment_created")
  async handleAppointmentCreated(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentCreated(data);
  }

  @MessagePattern("appointment_confirmed")
  async handleAppointmentConfirmed(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentConfirmed(data);
  }

  @MessagePattern("appointment_canceled")
  async handleAppointmentCanceled(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentCanceled(data);
  }

  @MessagePattern("appointment_rescheduled")
  async handleAppointmentRescheduled(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentRescheduled(data);
  }

  @MessagePattern("appointment_completed")
  async handleAppointmentCompleted(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentCompleted(data);
  }
  @MessagePattern("appointment.rejected")
  async handleAppointmentRejected(data: AppointmentEventData) {
    await this.authEventListenerService.handleAppointmentRejected(data);
  }
}
