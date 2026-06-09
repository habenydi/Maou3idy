import api from './api';
import { DoctorDetailResponse, Service, Location, AvailabilitySlot } from '@/types';

const FALLBACK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Standard Consultation',
    description: 'General heart health checkup and history review',
    icon: 'ecg',
    price: 150,
    insuranceAccepted: true,
  },
  {
    id: '2',
    name: 'Diagnostic Echocardiogram',
    description: 'Advanced ultrasound imaging of heart structure',
    icon: 'monitor_heart',
    price: 320,
    insuranceAccepted: true,
  },
  {
    id: '3',
    name: 'Lipid Profile & Stress Test',
    description: 'Comprehensive cardiac stress and blood analysis',
    icon: 'health_metrics',
    price: 450,
    insuranceAccepted: true,
  },
];

const FALLBACK_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Central Medical Plaza',
    address: '450 Medical Way, Suite 200',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9h6isf5z_k0DWk1B5-YAA224lwlxgH1_HJapvBdyTnp3wYpg40vYA11Hw5M_nzThPTLZdlyvuVqAs19lCOiox_fs54A3oLYN_tG4owJSBVeD9ZtdtHjZjlYohqHanm01yRU0t9Gv-fPLsmFH4by4KMe4kCJaWpxXe0nZ0S75TvtfgHC7A_oOdSMZubHGvopaaw-O6TxnsuyxebjtvLG_na-lFTblWKcF8sE4zTTFaE1hHh0ee8QNbc2uzLjx1wfUWltX_d97g-I8',
    isActive: true,
  },
  {
    id: '2',
    name: 'Uptown Wellness Center',
    address: '789 Health Ave',
    city: 'New York',
    state: 'NY',
    zip: '10002',
    mapImageUrl: '',
    isActive: false,
  },
];

const FALLBACK_AVAILABILITY: AvailabilitySlot[] = [
  {
    date: '2024-01-12',
    dayOfWeek: 'Monday',
    slots: [
      { time: '09:00 AM', isAvailable: true, locationId: '1' },
      { time: '09:45 AM', isAvailable: false, locationId: '1' },
      { time: '10:30 AM', isAvailable: true, locationId: '1' },
      { time: '11:15 AM', isAvailable: true, locationId: '1' },
      { time: '02:00 PM', isAvailable: true, locationId: '1' },
      { time: '03:30 PM', isAvailable: true, locationId: '1' },
    ],
  },
];

export const getDoctorDetail = async (
  doctorId: string
): Promise<DoctorDetailResponse> => {
  try {
    const response = await api.get(`/doctors/${doctorId}`);
    const data = response.data;

    return {
      doctor: data?.doctor || {
        id: doctorId,
        firstName: 'James',
        lastName: 'Wilson',
        specialty: 'Senior Cardiologist',
        yearsOfExperience: 15,
        profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYtWdA_ohvneu_r7bu8XLHWOqsHTlLujlYSOedETiyvqwB4zTuLZAsMffAVXDPup4nk2uXDziPbmyXMJK8GQUkvCvNPDwMf9lQ0eYXcuOacE_hPSySvybd6eB9IQbGt4UquxqYuHq0wykOyIvm9HAj8wab0o-3053C4P36Eq1PkZhYh3xKzfdpTzwrK97cbjfV6FWtghYcY9So8noVbK1AnftIpO4uG1ik49OCMu6vr0REgMM3XQWipuFotLQn5p6zK9svC6-njtM',
        isVerified: true,
        location: 'Central Medical Plaza, NY',
        rating: 4.9,
        reviewCount: 1240,
      },
      services: data?.services || FALLBACK_SERVICES,
      locations: data?.locations || FALLBACK_LOCATIONS,
      availability: data?.availability || FALLBACK_AVAILABILITY,
      reviews: data?.reviews || [],
      bio: data?.bio || 'Dr. James Wilson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine.',
      publications: data?.publications || 30,
    };
  } catch (error) {
    console.warn('Failed to fetch doctor details, using fallback:', error);
    return {
      doctor: {
        id: doctorId,
        firstName: 'James',
        lastName: 'Wilson',
        specialty: 'Senior Cardiologist',
        yearsOfExperience: 15,
        profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYtWdA_ohvneu_r7bu8XLHWOqsHTlLujlYSOedETiyvqwB4zTuLZAsMffAVXDPup4nk2uXDziPbmyXMJK8GQUkvCvNPDwMf9lQ0eYXcuOacE_hPSySvybd6eB9IQbGt4UquxqYuHq0wykOyIvm9HAj8wab0o-3053C4P36Eq1PkZhYh3xKzfdpTzwrK97cbjfV6FWtghYcY9So8noVbK1AnftIpO4uG1ik49OCMu6vr0REgMM3XQWipuFotLQn5p6zK9svC6-njtM',
        isVerified: true,
        location: 'Central Medical Plaza, NY',
        rating: 4.9,
        reviewCount: 1240,
      },
      services: FALLBACK_SERVICES,
      locations: FALLBACK_LOCATIONS,
      availability: FALLBACK_AVAILABILITY,
      reviews: [],
      bio: 'Dr. James Wilson is a board-certified cardiologist with over 15 years of experience in cardiovascular medicine.',
      publications: 30,
    };
  }
};

export const getAvailability = async (
  doctorId: string,
  date?: string
): Promise<AvailabilitySlot[]> => {
  try {
    const response = await api.get(`/doctors/${doctorId}/availability`, {
      params: { date },
    });
    return response.data?.availability || FALLBACK_AVAILABILITY;
  } catch (error) {
    console.warn('Failed to fetch availability, using fallback:', error);
    return FALLBACK_AVAILABILITY;
  }
};

export const createBooking = async (data: {
  doctorId: string;
  date: string;
  time: string;
  locationId: string;
}): Promise<{ success: boolean; bookingId?: string }> => {
  try {
    const response = await api.post('/bookings', data);
    return response.data || { success: false };
  } catch (error) {
    console.error('Failed to create booking:', error);
    return { success: false };
  }
};
