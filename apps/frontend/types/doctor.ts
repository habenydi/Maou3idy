
export interface Doctor {
  id: string;
  name: string;
  image?: string | null;
  speciality: string;
  experience: number;
  rating: number;
  location: string;
}


export interface DoctorsResponse {
  doctors: Doctor[];
  total: number;
  page: number;
  totalPages: number;
}