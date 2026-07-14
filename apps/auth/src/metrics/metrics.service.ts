import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async recordRequest(responseTime: number) {
    const stats = await this.prisma.stats.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        ResponceTime: 0,
        totalrequests: 0,
        activeSessions: 0,
      },
    });

    const totalrequests = stats.totalrequests + 1;

    const averageResponseTime =
      ((stats.ResponceTime || 0) * stats.totalrequests + responseTime) /
      totalrequests;

    await this.prisma.stats.update({
      where: { id: "default" },
      data: {
        totalrequests,
        ResponceTime: averageResponseTime,
      },
    });
  }

  async incrementSession() {
    await this.prisma.stats.upsert({
      where: { id: "default" },
      update: {
        activeSessions: {
          increment: 1,
        },
      },
      create: {
        id: "default",
        activeSessions: 1,
        ResponceTime: 0,
        totalrequests: 0,
      },
    });
  }

  async decrementSession() {
    const stats = await this.prisma.stats.findUnique({
      where: { id: "default" },
    });

    if (!stats || stats.activeSessions <= 0) {
      return;
    }

    await this.prisma.stats.update({
      where: { id: "default" },
      data: {
        activeSessions: {
          decrement: 1,
        },
      },
    });
  }

  async getMetrics() {
    const stats = await this.prisma.stats.upsert({
      where: { id: "default" },
      update: {},
      create: {
        id: "default",
        activeSessions: 0,
        ResponceTime: 0,
        totalrequests: 0,
      },
    });

    return {
      ActiveSessions: stats.activeSessions,
      ApiResponseTime: Number(stats.ResponceTime.toFixed(2)),
      ServerUptime: Number((process.uptime() / 3600).toFixed(2)), // hours
      Totalrequests: stats.totalrequests,
    };
  }
}
