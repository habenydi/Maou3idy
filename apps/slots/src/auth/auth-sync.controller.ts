import { Controller, Logger } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { PrismaService } from "src/prisma/prisma.service";

@Controller()
export class AuthSyncController {
  private readonly logger = new Logger(AuthSyncController.name);

  constructor(private readonly prisma: PrismaService) {}

  private async syncUserAndDoctor(payload: any, eventName: string) {
    const userId = payload?.userId ?? payload?.id;
    const doctorId = payload?.doctorId ?? payload?.doctor?.id;

    if (!userId || !doctorId) {
      this.logger.error(
        `❌ [${eventName}] Missing userId/id or doctorId in payload — refusing to process. Payload: ${JSON.stringify(payload)}`,
      );
      return;
    }

    const userName = payload?.name ?? payload?.user?.name ?? "User";
    const userEmail =
      payload?.email ?? payload?.user?.email ?? `${userId}@local.local`;

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.user.upsert({
          where: { id: userId },
          update: { name: userName, email: userEmail },
          create: { id: userId, name: userName, email: userEmail },
        });

        const existingDoctor = await tx.doctor.findUnique({
          where: { user_id: userId },
        });

        if (existingDoctor) {
          if (existingDoctor.id === doctorId) {
            this.logger.log(
              `✅ [${eventName}] Doctor already synced for user ${userId}`,
            );
            return;
          }

          const updated = await tx.doctor.update({
            where: { user_id: userId },
            data: { id: doctorId },
          });

          this.logger.log(
            `🔄 [${eventName}] Synced doctor id for user ${userId}: ${updated.id}`,
          );
          return;
        }

        const created = await tx.doctor.create({
          data: { id: doctorId, user_id: userId },
        });

        this.logger.log(
          `✨ [${eventName}] Created doctor ${created.id} for user ${userId}`,
        );
      });
    } catch (error) {
      this.logger.error(
        `❌ Failed to sync doctor event ${eventName} for user ${userId}`,
        error,
      );
    }
  }

  @EventPattern("user.created")
  async handleUserCreated(@Payload() data: any) {
    this.logger.log(
      `📥 [user.created] Received payload: ${JSON.stringify(data, null, 2)}`,
    );
    try {
      await this.prisma.user.upsert({
        where: { id: data.id },
        update: { name: data.name, email: data.email },
        create: { id: data.id, name: data.name, email: data.email },
      });
    } catch (error) {
      this.logger.error(`❌ Failed to sync created user ${data.id}`, error);
    }
  }

  @EventPattern("user.updated")
  async handleUserUpdated(@Payload() data: any) {
    this.logger.log(
      `📥 [user.updated] Received payload: ${JSON.stringify(data, null, 2)}`,
    );
    try {
      await this.prisma.user.upsert({
        where: { id: data.id },
        update: { name: data.name, email: data.email },
        create: { id: data.id, name: data.name, email: data.email },
      });
    } catch (error) {
      this.logger.error(`❌ Failed to sync updated user ${data.id}`, error);
    }
  }

  @EventPattern("doctor.created")
  async handleDoctorCreated(@Payload() data: any) {
    this.logger.log(
      `📥 [doctor.created] Received payload: ${JSON.stringify(data, null, 2)}`,
    );
    await this.syncUserAndDoctor(data, "doctor.created");
  }

  @EventPattern("doctor.approved")
  async handleDoctorApproved(@Payload() data: any) {
    this.logger.log(
      `📥 [doctor.approved] Received payload: ${JSON.stringify(data, null, 2)}`,
    );
    await this.syncUserAndDoctor(data, "doctor.approved");
  }
}
