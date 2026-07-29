import axios from 'axios';

export interface GetDoctorsParams {
  search?: string;
  location?: string;
  page?: number;
  speciality?: string;
  rating?: number;
  sort?: string;
}

export async function getDoctors(
  params: GetDoctorsParams
) {
  const response = await axios.get(
    'http://localhost:1337/doctors/find',
    {
      params,
      withCredentials: true,
    }
  );

  return response.data;
}