import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_URL + '/api',
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

const API_BASE = process.env.NEXT_PUBLIC_URL;

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token') || localStorage.getItem('token')
      : null;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return fetch(`${API_BASE}${cleanPath}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}

export async function fetchServices(doctorId: string) {
  const res = await apiFetch(`/services/${doctorId}`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function createServiceApi(doctorId: string, data: any) {
  const res = await apiFetch('/services', {
    method: 'POST',
    body: JSON.stringify({ ...data, doctorId }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to create service');
  }
  return res.json();
}

export async function deleteServiceApi(doctorId: string, serviceId: string) {
  const res = await apiFetch(`/services/${doctorId}/${serviceId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete service');
  return res.json();
}

export async function updateServiceApi(doctorId: string, serviceId: string, data: any) {
  const res = await apiFetch(`/services/${doctorId}/${serviceId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to update service');
  }
  return res.json();
}

// ─── Categories API Helpers ───────────────────────────────────────────────

// Add to your API helper file
export async function fetchCategories() {
  try {
    const res = await apiFetch('/categories');
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch categories, returning fallback empty list", err);
    return [];
  }
}

export async function createCategoryApi(data: { name: string; description?: string }) {
  const res = await apiFetch('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategoryApi(id: string, data: { name?: string; description?: string }) {
  const res = await apiFetch(`/categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategoryApi(id: string) {
  const res = await apiFetch(`/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}


// ------------- slots API Helpers -------------

export async function fetchAvailableWindows(
  doctorId: string,
  serviceId: string,
  date: string,
) {
  const params = new URLSearchParams({ doctorId, serviceId, date });
  const res = await apiFetch(`/slots/available?${params.toString()}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch available times');
  }
  return res.json();
}

export async function bookServiceSlotApi(data: {
  doctorId: string;
  serviceId: string;
  date: string;
  start_time: string;
}) {
  const res = await apiFetch('/slots/book-service', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to book appointment');
  }
  return res.json();
}

export type UserBooking = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'BOOKED' | 'CANCELLED' | 'COMPLETED';
  doctor?: {
    id: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  } | null;
  service?: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description?: string | null;
  } | null;
};

export async function fetchMyBookingsApi(): Promise<UserBooking[]> {
  const res = await apiFetch('/slots/me/bookings');
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch bookings');
  }
  return res.json();
}

export async function cancelMyBookingApi(id: string) {
  const res = await apiFetch(`/slots/me/bookings/${id}/cancel`, {
    method: 'POST',
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to cancel booking');
  }
  return res.json();
}

export type DoctorBooking = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  service?: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description?: string | null;
  } | null;
};

export async function fetchDoctorBookingsApi(): Promise<DoctorBooking[]> {
  const res = await apiFetch('/slots/doctor/me/bookings');
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to fetch doctor appointments');
  }
  return res.json();
}

export async function completeDoctorBookingApi(id: string) {
  const res = await apiFetch(`/slots/doctor/me/bookings/${id}/complete`, {
    method: 'POST',
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to complete appointment');
  }
  return res.json();
}

export async function cancelDoctorBookingApi(id: string) {
  const res = await apiFetch(`/slots/doctor/me/bookings/${id}/cancel`, {
    method: 'POST',
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to cancel appointment');
  }
  return res.json();
}
