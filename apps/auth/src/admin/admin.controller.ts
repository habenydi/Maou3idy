import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
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
  getAllUsers() {
    return this.adminService.getAllUsers();
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

  // audit and reporting routes
  @Get("audit-logs")
  getAuditLogs() {
    return this.adminService.getAuditLogs();
  }
  @Get("reports")
  getReports() {
    return this.adminService.getReports();
  }
}
