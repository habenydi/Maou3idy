import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
  getDashboard() {
    return {
      message: "Welcome to the Admin Dashboard",
      stats: {
        TotalUsers: 100,
        TotalDoctors: 10,
        PenddingDoctorApprovals: 5,
        TotalAppointments: 200,
        RecentActivities: [
          {
            activity: "User John Doe registered",
            timestamp: "2023-10-01T10:00:00Z",
          },
          {
            activity: "Doctor Jane Smith approved",
            timestamp: "2023-10-02T14:30:00Z",
          },
          {
            activity: "Appointment booked by User Alice",
            timestamp: "2023-10-03T09:15:00Z",
          },
        ],
      },
    };
  }
}
