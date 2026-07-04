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
  @Patch("docotor/:id/approve")
  approveDoctor(@Param("id") id: string) {
    return this.adminService.approveDoctor(id);
  }

  @Patch("docotor/:id/reject")
  rejectDoctor(@Param("id") id: string) {
    // Implement logic to reject the doctor with the given ID
    return { message: `Doctor with ID ${id} rejected.` };
  }
  @Get("docotors/:id/license")
  getDoctorLicense(@Param("id") id: string) {
    // Implement logic to retrieve the doctor's license with the given ID
    return { message: `License for doctor with ID ${id} retrieved.` };
  }
  @Patch("docotor/:id/suspend")
  suspendDoctor(@Param("id") id: string) {
    // Implement logic to suspend the doctor with the given ID
    return { message: `Doctor with ID ${id} suspended.` };
  }

  // user management routes
  @Get("admin/users")
  getAllUsers() {
    // Implement logic to retrieve all users
    return { message: "All users retrieved." };
  }
  @Patch("admin/users/:id/disable")
  disableUser(@Param("id") id: string) {
    // Implement logic to disable the user with the given ID
    return { message: `User with ID ${id} disabled.` };
  }
  @Patch("admin/users/:id/activate")
  activateUser(@Param("id") id: string) {
    // Implement logic to activate the user with the given ID
    return { message: `User with ID ${id} activated.` };
  }
  @Delete("admin/users/:id")
  deleteUser(@Param("id") id: string) {
    // Implement logic to delete the user with the given ID
    return { message: `User with ID ${id} deleted.` };
  }

  // audit and reporting routes
  @Get("admin/audit-logs")
  getAuditLogs() {
    // Implement logic to retrieve audit logs
    return { message: "Audit logs retrieved." };
  }
  @Get("admin/reports")
  getReports() {
    // Implement logic to retrieve reports
    return { message: "Reports retrieved." };
  }
}
