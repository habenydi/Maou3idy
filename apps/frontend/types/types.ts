export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  profileImage: string;
  rating: number;
  reviewCount: number;
  yearsOfExperience: number;
  location: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  isActive: boolean;
  mapImageUrl: string;
}

export interface DoctorDetailResponse {
  doctor: Doctor;
  services: Service[];
  locations: Location[];
  availability: any[];
}