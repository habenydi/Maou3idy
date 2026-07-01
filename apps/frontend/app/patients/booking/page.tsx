'use client';
import { useEffect, useState } from 'react';
import { getDoctorDetail } from '@/services/bookingService';
import { DoctorDetailResponse } from '@/types';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import InformationFooter from '@/components/InformationFooter';
import DoctorHero from './components/DoctorHero';
import DoctorAbout from './components/DoctorAbout';
import DoctorServices from './components/DoctorServices';
import DoctorLocations from './components/DoctorLocations';
import BookingSidebar from './components/BookingSidebar';
import ReviewsTeaser from './components/ReviewsTeaser';

function Booking() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('doctorId') || '1';
  const [doctorData, setDoctorData] = useState<DoctorDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const data = await getDoctorDetail(doctorId);
        setDoctorData(data);
      } catch (error) {
        console.error('Error loading doctor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!doctorData) {
    return <div>Error loading doctor data</div>;
  }
  const { doctor, services, locations, availability } = doctorData;

return (
  <>
    <Navbar activeLink="doctors" />

    <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-6">
      <DoctorHero doctor={doctor} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <DoctorAbout doctor={doctor} />

          <DoctorServices services={services} />

          <DoctorLocations locations={locations} />
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <BookingSidebar availability={availability} />
            <ReviewsTeaser />
          </div>
        </aside>
      </div>
    </main>

    <InformationFooter />
  </>
);
}

export default Booking;
