'use client';
import Navbar from '@/components/Navbar';
import InformationFooter from '@/components/InformationFooter';

import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import UpcomingAppointments from './components/UpcomingAppointments';

export default function DashboardPage() {
  const appointments = [
    {
      id: '1',
      doctorName: 'Dr. James Wilson',
      specialty: 'Cardiology',
      dateTime: 'Dec 15, 2024 at 2:00 PM',
    },
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar showAuthButtons />

      <main className="pt-24 pb-12 max-w-screen-2xl mx-auto px-6">
        <DashboardHeader />

        <DashboardStats
          upcomingAppointments={2}
          completedVisits={8}
          pendingResults={1}
          favoriteDoctors={3}
        />

        <UpcomingAppointments appointments={appointments} />
      </main>

      <InformationFooter />
    </div>
  );
}