import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailService: MailerService,
    private readonly prisma: PrismaService,
  ) {}
  async handleUserCreatedEvent(data: {
    id: string;
    email: string;
    name: string;
    verificationToken: string;
  }) {
    try {
      await this.prisma.user.upsert({
        where: {
          id: data.id,
        },
        update: {
          email: data.email,
          name: data.name,
        },
        create: {
          id: data.id,
          email: data.email,
          name: data.name,
        },
      });

      const url = `${process.env.FRONTEND_URL}/verification-email?token=${encodeURIComponent(
        data.verificationToken,
      )}`;

      await this.mailService.sendMail({
        to: data.email,
        subject: 'Verify your email',
        text: `Please click the following link to verify your email: ${url}`,
        html: `
          <h2>Welcome ${data.name}</h2>
          <p>Please verify your email by clicking the link below:</p>
          <p>
            <a href="${url}">
              Verify Email
            </a>
          </p>
        `,
      });
    } catch (error) {
      console.error('Failed to process user.created event:', error);
    }
  }

  async handleUserForgetPasswordEvent(data: { email: string; Token: string }) {
    try {
      const url = `${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(
        data.Token,
      )}`;

      await this.mailService.sendMail({
        to: data.email,
        subject: 'Reset your password',
        text: `Please click the following link to reset your password: ${url}`,
        html: `
          <h2>Password Reset Request</h2>
          <p>Please reset your password by clicking the link below:</p>
          <p>
            <a href="${url}">
              Reset Password
            </a>
          </p>
        `,
      });
    } catch (error) {
      console.error('Failed to process user.forget_password event:', error);
    }
  }
}
