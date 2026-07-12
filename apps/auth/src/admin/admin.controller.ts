import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // dashbord route
  @Get("dashboard")
  getDashboard() {
    return this.adminService.getDashboard();
  }

  // doctor approval routes
  @Patch("doctor/:id/approve")
  approveDoctor(@Param("id") id: string) {
    return this.adminService.approveDoctor(id);
  }

  @Patch("doctor/:id/reject")
  rejectDoctor(@Param("id") id: string) {
    return this.adminService.rejectDoctor(id);
  }
  @Get("doctor/:id/license")
  getDoctorLicense(@Param("id") id: string) {
    return this.adminService.getDoctorLicense(id);
  }
  @Patch("doctor/:id/suspend")
  suspendDoctor(@Param("id") id: string) {
    return this.adminService.suspendDoctor(id);
  }

  // user management routes
  @Get("users")
  async getAllUsers(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.adminService.getAllUsers(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }
  @Patch("users/:id/disable")
  disableUser(@Param("id") id: string) {
    return this.adminService.disableUser(id);
  }
  @Patch("users/:id/activate")
  activateUser(@Param("id") id: string) {
    return this.adminService.activateUser(id);
  }
  @Delete("users/:id")
  deleteUser(@Param("id") id: string) {
    return this.adminService.deleteUser(id);
  }
  @Get("users-registration-trends/period=:period")
  async getUserRegistrationTrends(@Param("period") period: string) {
    const result = await this.adminService.getUserRegistrationTrends(period);
    return result;
  }
  @Patch("users/:id/ban")
  banUser(@Param("id") id: string) {
    return this.adminService.banUser(id);
  }

  // audit and reporting routes
  @Get("recent-activities")
  async getRecentActivities() {
    const result = await this.adminService.getRecentActivities();
    return result;
  }
  @Get("activity-logs")
  async getActivityLogs(
    @Query("page", ParseIntPipe) page = 1,
    @Query("limit", ParseIntPipe) limit = 20,
  ) {
    return await this.adminService.getActivityLogs(page, limit);
  }
  @Get("audit-logs")
  async getAuditLogs() {
    const result = await this.adminService.getAuditLogs();
    return result;
  }
  @Get("reports")
  getReports() {
    return this.adminService.getReports();
  }
}
