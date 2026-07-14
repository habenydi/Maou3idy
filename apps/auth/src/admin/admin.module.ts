import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { MetricsService } from "src/metrics/metrics.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, MetricsService],
})
export class AdminModule {}
