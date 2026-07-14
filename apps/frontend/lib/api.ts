import axios from 'axios';

// ✅ Points to port 4000 where NestJS is running
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ─── Request Interceptor: attach JWT token ────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token') || localStorage.getItem('token')
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor: normalize errors ───────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';

    // Redirect to login on 401
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(new Error(Array.isArray(message) ? message.join(', ') : message));
  },
);

// ─── Types ────────────────────────────────────────────────────────────────
export type CreateServicePayload = {
  name: string;
  categoryId: number;
  price: number;
  duration: number;
  description?: string;
};

export type UpdateServicePayload = Partial<CreateServicePayload>;

export type CreateWorkHourPayload = {
  dayOfWeek: string;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
};

export type UpdateWorkHourPayload = Partial<CreateWorkHourPayload>;

// ─── API Service ──────────────────────────────────────────────────────────
class ApiService {
  // ── Services (/api/services) ────────────────────────────────────────────

  /** GET /api/services/doctor/:doctorId */
  getDoctorServices<T>(doctorId: string | number) {
    return axiosInstance.get<T>(`/services/doctor/${doctorId}`).then((r) => r.data);
  }

  /** GET /api/services/category/:categoryId */
  getServicesByCategory<T>(categoryId: string | number) {
    return axiosInstance.get<T>(`/services/category/${categoryId}`).then((r) => r.data);
  }

  /** GET /api/services/:id */
  getService<T>(serviceId: string | number) {
    return axiosInstance.get<T>(`/services/${serviceId}`).then((r) => r.data);
  }

  /** POST /api/services */
  createService<T>(serviceData: CreateServicePayload) {
    return axiosInstance.post<T>('/services', serviceData).then((r) => r.data);
  }

  /** PUT /api/services/:id */
  updateService<T>(serviceId: string | number, serviceData: UpdateServicePayload) {
    return axiosInstance.put<T>(`/services/${serviceId}`, serviceData).then((r) => r.data);
  }

  /** DELETE /api/services/:id */
  deleteService<T>(serviceId: string | number) {
    return axiosInstance.delete<T>(`/services/${serviceId}`).then((r) => r.data);
  }

  // ── Work Hours (/api/work-hours) ────────────────────────────────────────

  /** POST /api/work-hours */
  addWorkHour<T>(data: CreateWorkHourPayload) {
    return axiosInstance.post<T>('/work-hours', data).then((r) => r.data);
  }

  /** GET /api/work-hours/doctor/:doctorId */
  getWorkHoursByDoctor<T>(doctorId: string | number) {
    return axiosInstance.get<T>(`/work-hours/doctor/${doctorId}`).then((r) => r.data);
  }

  /** PUT /api/work-hours/:id */
  updateWorkHour<T>(workHourId: string | number, data: UpdateWorkHourPayload) {
    return axiosInstance.put<T>(`/work-hours/${workHourId}`, data).then((r) => r.data);
  }

  /** DELETE /api/work-hours/:id */
  deleteWorkHour<T>(workHourId: string | number) {
    return axiosInstance.delete<T>(`/work-hours/${workHourId}`).then((r) => r.data);
  }

  /** GET /api/work-hours/check-availability */
  checkAvailability<T>(doctorId: number, dayOfWeek: string, time: string) {
    return axiosInstance
      .get<T>('/work-hours/check-availability', {
        params: { doctorId, dayOfWeek, time },
      })
      .then((r) => r.data);
  }

  // ── Appointments (/api/appointments) ────────────────────────────────────

  getAppointments<T>() {
    return axiosInstance.get<T>('/appointments').then((r) => r.data);
  }

  acceptAppointment<T>(appointmentId: string) {
    return axiosInstance
      .post<T>(`/appointments/${appointmentId}/accept`)
      .then((r) => r.data);
  }

  rejectAppointment<T>(appointmentId: string) {
    return axiosInstance
      .post<T>(`/appointments/${appointmentId}/reject`)
      .then((r) => r.data);
  }

  // ── Dashboard (/api/dashboard) ───────────────────────────────────────────

  getDashboardStats<T>() {
    return axiosInstance.get<T>('/dashboard/stats').then((r) => r.data);
  }

  getTodaySchedule<T>() {
    return axiosInstance.get<T>('/schedule/today').then((r) => r.data);
  }

  // ── Schedule (/api/schedule) ─────────────────────────────────────────────

  getWeeklySchedule<T>(startDate: string) {
    return axiosInstance
      .get<T>('/schedule/weekly', { params: { date: startDate } })
      .then((r) => r.data);
  }

  addSlot<T>(slotData: unknown) {
    return axiosInstance.post<T>('/schedule/slots', slotData).then((r) => r.data);
  }

  deleteSlot<T>(slotId: string) {
    return axiosInstance.delete<T>(`/schedule/slots/${slotId}`).then((r) => r.data);
  }
}

export const api = new ApiService();


const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token") || localStorage.getItem("token");
}

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = getToken();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}