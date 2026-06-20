const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type RequestOptions = RequestInit & { json?: unknown };

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { json, headers, ...rest } = options;
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: json ? JSON.stringify(json) : undefined,
      ...rest,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  // Appointments
  getAppointments<T>() {
    return this.request<T>('/appointments');
  }

  acceptAppointment<T>(appointmentId: string) {
    return this.request<T>(`/appointments/${appointmentId}/accept`, { method: 'POST' });
  }

  rejectAppointment<T>(appointmentId: string) {
    return this.request<T>(`/appointments/${appointmentId}/reject`, { method: 'POST' });
  }

  // Dashboard
  getDashboardStats<T>() {
    return this.request<T>('/dashboard/stats');
  }

  getTodaySchedule<T>() {
    return this.request<T>('/schedule/today');
  }

  // Schedule
  getWeeklySchedule<T>(startDate: string) {
    return this.request<T>(`/schedule/weekly?date=${encodeURIComponent(startDate)}`);
  }

  addSlot<T>(slotData: unknown) {
    return this.request<T>('/schedule/slots', { method: 'POST', json: slotData });
  }

  deleteSlot<T>(slotId: string) {
    return this.request<T>(`/schedule/slots/${slotId}`, { method: 'DELETE' });
  }

  // Services
  getServices<T>() {
    return this.request<T>('/services');
  }

  createService<T>(serviceData: unknown) {
    return this.request<T>('/services', { method: 'POST', json: serviceData });
  }

  updateService<T>(serviceId: string, serviceData: unknown) {
    return this.request<T>(`/services/${serviceId}`, { method: 'PUT', json: serviceData });
  }

  deleteService<T>(serviceId: string) {
    return this.request<T>(`/services/${serviceId}`, { method: 'DELETE' });
  }
}

export const api = new ApiService(API_BASE_URL);