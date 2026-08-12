import { Doctor, DoctorLocation } from './types';

export type { Doctor, DoctorLocation };

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  insuranceAccepted: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  mapImageUrl: string;
  isActive: boolean;
}

export interface TimeSlot {
  time: string;
  isAvailable: boolean;
  locationId: string;
}

export interface AvailabilitySlot {
  date: string;
  dayOfWeek: string;
  slots: TimeSlot[];
}

export interface Review {
  image: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DoctorDetailResponse {
  doctor: Doctor;
  location: Location;
  availability: AvailabilitySlot[];
  reviews: Review[];
  services: Service[];
  publications: number;
}

export interface LandingPageStats {
  totalDoctors: number;
  totalPatients: number;
  totalSpecializedClinicians: number;
}

export interface LandingPageData {
  featuredDoctors: Doctor[];
  stats: LandingPageStats;
  specialties: string[];
  locations: string[];
}
