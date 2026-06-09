import api from './api';
import { LandingPageData, Doctor } from '@/types';

const FALLBACK_FEATURED_DOCTORS: Doctor[] = [
  {
    id: '1',
    firstName: 'Michael',
    lastName: 'Chen',
    specialty: 'Cardiologist',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJnQ0hCKaeNWKWVYi0W4LN_5OcPkDPs96t1tpykep2UKyd0jTujQD7SUg3TdYd9TfQFmpYBj4SCq57Lh59f5j8MdGRrqpswrXlezc2telszHtpR5vwvio5sdjtBUbH_YOPPC6VUhRkw8GStjM3yIMfTGdL27SszoDjcMTORvaVbPGQR3udDJzrInUroBaeB6kZ38k1GE7sVsnMD_zB_6NerDzt_tmnMY5-e3re_8LHxGA3ZAFf4jb3kA_H11WYznpMDlBxxKKX1eo',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviewCount: 1240,
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    specialty: 'Neurologist',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB84X6bdCMXmLNGU8SxTcoxlTvW4BCS9U7pufBtIOgqbWs-5A938Dig3s0WfGnSHG4wwxi0DIHtY33mPICmp-jxrdVHyBMfxTrf3ZZkBGne_kKeDfz3xdjZsyl2uohPAAlAP-IbwGSfzD0DnXr_F2-_zz5fZvYKpWhb8jlbDVtI7KEAT_dpWT35bFiDOGuXhxBIm8ICd-eR4_ubQN5THC1wFwNQqtMfl8VK8TpTdI02rUpKLndMBwLy1U0Bun29oLb9rrWX9TVvrEU',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 980,
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Wilson',
    specialty: 'Dermatologist',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQU9AIwklR8KSrtaM_AmCdBd0gjQmQt_J4Y3afU1m8_cbA_uaM34-tb-kZrDy75P793UTXX25NB4mTDJguy_oCkA7vE5r-pUg4RXujsWktrK7dmi_GBe1MaqnJw0c7oP72KIcqxQHQX8BQfEl9tTvBF9qgESHsa3Kn78TqkzNHGiEEgqQhvmquTPgRYEwVEi-gMF9rW51AdBczfHnoxBdsuGdKUs8ZMVQrbgwBsh1AZJBUoct64TYpZFD0sFukHxuPHr8inIUxUTQ',
    location: 'Austin, TX',
    rating: 5.0,
    reviewCount: 756,
  },
  {
    id: '4',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    specialty: 'Pediatrician',
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOOxjqmqSCaPeasSvjvv1skFCbXMe8M7iwxsROszjacbfj_0ZTHyzFpUfRNS2FkcpCrpTkdlcngeZFM6_IsatcbTUgQeSRP9iGIejeBJ7nOvWXc9xZJ-GnQlJ_duZXi-XnT8CfIFkHJpfDkJ60Ma2w6xcxnlKe7tXjKSO8NcbpgUnKapmsJodZ_eyfJM1jP5QAREVariIXZgCqUsFSubwHrayRvg-lYmtHamFj6Sm98q-ZqdVsGn9T_YKBiJ1v1Dlaxb7PSL1mKEc',
    location: 'Miami, FL',
    rating: 4.9,
    reviewCount: 645,
  },
];

const FALLBACK_STATS = {
  totalDoctors: 12000,
  totalPatients: 500000,
  totalSpecializedClinicians: 500,
};

const FALLBACK_SPECIALTIES = [
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Psychiatry',
];

const FALLBACK_LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Miami, FL',
  'Los Angeles, CA',
  'Chicago, IL',
];

export const getLandingPageData = async (): Promise<LandingPageData> => {
  try {
    const response = await api.get('/doctors/featured');
    const data = response.data;
    return {
      featuredDoctors: data?.featuredDoctors || FALLBACK_FEATURED_DOCTORS,
      stats: data?.stats || FALLBACK_STATS,
      specialties: data?.specialties || FALLBACK_SPECIALTIES,
      locations: data?.locations || FALLBACK_LOCATIONS,
    };
  } catch (error) {
    console.warn('Failed to fetch landing page data, using fallback:', error);
    return {
      featuredDoctors: FALLBACK_FEATURED_DOCTORS,
      stats: FALLBACK_STATS,
      specialties: FALLBACK_SPECIALTIES,
      locations: FALLBACK_LOCATIONS,
    };
  }
};

export const searchDoctors = async (
  specialty?: string,
  location?: string
): Promise<Doctor[]> => {
  try {
    const response = await api.get('/doctors/search', {
      params: { specialty, location },
    });
    return response.data?.doctors || FALLBACK_FEATURED_DOCTORS;
  } catch (error) {
    console.warn('Search failed, returning fallback doctors:', error);
    return FALLBACK_FEATURED_DOCTORS;
  }
};
