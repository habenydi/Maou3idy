import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

type UserCreatedEvent = {
  id: string;
  email: string;
  name: string;
  verificationToken: string;
};

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('user.created')
  async handleUserCreatedEvent(@Payload() data: UserCreatedEvent) {
    await this.notificationService.handleUserCreatedEvent(data);
  }

  @EventPattern('user.forget_password')
  async handleUserForgetPasswordEvent(
    @Payload() data: { email: string; Token: string },
  ) {
    await this.notificationService.handleUserForgetPasswordEvent(data);
  }
}
