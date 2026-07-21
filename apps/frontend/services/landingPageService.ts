'use client';

import api from './api';

export type FeaturedDoctor = {
  id: string;
  location: string;
  verified: boolean;
  rating?: number;
  speciality: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  };
};

export const getFeaturedDoctors = async (): Promise<FeaturedDoctor[]> => {
  try {
    const response = await api.get('/doctors/featured');

    return response.data;
  } catch (error) {
    console.error('Failed to fetch featured doctors:', error);
    return [];
  }
};

export const searchDoctors = async (
  specialty?: string,
  location?: string
): Promise<FeaturedDoctor[]> => {
  try {
    const response = await api.get('/doctors/search', {
      params: {
        specialty,
        location,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};