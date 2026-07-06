import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "@prisma/client";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private metricsService: MetricsService,
  ) {}

  async getDashboard() {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const totalUsers = await this.prisma.user.count();
    const totalDoctors = await this.prisma.doctor.count();
    const pendingDoctorApprovals = await this.prisma.user.count({
      where: { role: Role.PENDING_DOCTOR },
    });
    const stats = await this.prisma.stats.findFirst();

    const usersThisMonth = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: startOfThisMonth,
        },
      },
    });

    const usersLastMonth = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lte: endOfLastMonth,
        },
      },
    });

    let monthlyGrowth = 0;

    if (usersLastMonth > 0) {
      monthlyGrowth =
        ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;
    }
    const result = await this.metricsService.getMetrics();
    return {
      message: "Welcome to the Admin Dashboard",
      stats: {
        TotalUsers: totalUsers,
        TotalDoctors: totalDoctors,
        PendingDoctorApprovals: pendingDoctorApprovals,
        MonthlyGrowth: Number(monthlyGrowth.toFixed(2)),
        TotalAppointments: stats?.TotalAppointments || 0,
        ActiveDoctors: stats?.ActiveDoctors || 0,
        SystemHealth: stats?.SystemHealth || 0,
        ServerUptime: result?.ServerUptime || 0,
        ApiResponseTime: result?.ApiResponseTime || 0,
        ActiveSessions: result?.ActiveSessions || 0,
      },
    };
  }

  async approveDoctor(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!doctor || !doctor.verified) {
      return {
        message: `Doctor with ID ${id} not found or not verified.`,
        status: "error",
      };
    }
    if (doctor.user.role === Role.DOCTOR) {
      return {
        message: `Doctor with ID ${id} is already approved.`,
        status: "error",
      };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: doctor.user_id },
      data: { role: Role.DOCTOR },
    });

    await this.prisma.doctor.update({
      where: { id },
      data: { verified: true },
    });

    await this.prisma.auditlog.create({
      data: {
        user_id: doctor.user_id,
        action: `Doctor ${doctor.user.name} approved`,
      },
    });

    return {
      message: `Doctor with ID ${id} approved.`,
      status: "approved",
      doctor: updatedUser,
    };
  }

  async rejectDoctor(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!doctor) {
      return { message: `Doctor with ID ${id} not found.`, status: "error" };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: doctor.user_id },
      data: { role: Role.REJECTED },
    });

    await this.prisma.auditlog.create({
      data: {
        user_id: doctor.user_id,
        action: `Doctor ${doctor.user.name} rejected`,
      },
    });

    return {
      message: `Doctor with ID ${id} rejected.`,
      status: "rejected",
      doctor: updatedUser,
    };
  }

  async getDoctorLicense(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!doctor) {
      return { message: `Doctor with ID ${id} not found.`, status: "error" };
    }

    return {
      doctorId: id,
      doctorName: doctor.user.name,
      licenseNumber: doctor.license_number,
      speciality: doctor.speciality,
      verified: doctor.verified,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };
  }

  async suspendDoctor(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!doctor) {
      return { message: `Doctor with ID ${id} not found.`, status: "error" };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: doctor.user_id },
      data: { role: Role.BANNED },
    });

    await this.prisma.auditlog.create({
      data: {
        user_id: doctor.user_id,
        action: `Doctor ${doctor.user.name} suspended`,
      },
    });

    return {
      message: `Doctor with ID ${id} suspended.`,
      status: "suspended",
      doctor: updatedUser,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verified: true,
        createdAt: true,
      },
    });

    return {
      users: users,
      total: users.length,
    };
  }

  async disableUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return { message: `User with ID ${id} not found.`, status: "error" };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { role: Role.BANNED },
    });

    await this.prisma.auditlog.create({
      data: {
        user_id: id,
        action: `User ${user.name} disabled`,
      },
    });

    return {
      message: `User with ID ${id} disabled.`,
      status: "disabled",
      user: updatedUser,
    };
  }

  async activateUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return { message: `User with ID ${id} not found.`, status: "error" };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { role: Role.USER },
    });

    await this.prisma.auditlog.create({
      data: {
        user_id: id,
        action: `User ${user.name} activated`,
      },
    });

    return {
      message: `User with ID ${id} activated.`,
      status: "active",
      user: updatedUser,
    };
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      return { message: `User with ID ${id} not found.`, status: "error" };
    }

    await this.prisma.auditlog.create({
      data: {
        user_id: id,
        action: `User ${user.name} deleted`,
      },
    });

    await this.prisma.user.delete({ where: { id } });

    return {
      message: `User with ID ${id} deleted.`,
      status: "deleted",
    };
  }

  async getAuditLogs() {
    const logs = await this.prisma.auditlog.findMany({
      orderBy: { timestamp: "desc" },
      take: 100,
    });

    return {
      logs: logs,
      total: logs.length,
    };
  }

  async getReports() {
    const stats = await this.prisma.stats.findFirst();
    const userGrowth = await this.prisma.user.count();
    const doctorGrowth = await this.prisma.doctor.count();

    return {
      reports: [
        {
          id: "1",
          title: "User Statistics",
          totalUsers: userGrowth,
          growth: stats?.MonthlyGrowth || 0,
        },
        {
          id: "2",
          title: "Doctor Statistics",
          totalDoctors: doctorGrowth,
          verified: stats?.verifiedRate || 0,
        },
        {
          id: "3",
          title: "System Health",
          uptime: stats?.ServerUptime || 0,
          responseTime: stats?.ResponceTime || 0,
        },
      ],
    };
  }
}
