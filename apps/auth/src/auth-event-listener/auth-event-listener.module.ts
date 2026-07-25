import { Module } from "@nestjs/common";
import { AuthEventListenerService } from "./auth-event-listener.service";
import { AuthEventListenerController } from "./auth-event-listener.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [AuthEventListenerController],
  providers: [AuthEventListenerService],
  imports: [PrismaModule],
})
export class AuthEventListenerModule {}
