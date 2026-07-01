'use client';

import AdminSidebar from '@/app/simo/components/AdminSidebar';
import AdminHeader from '@/app/simo/components/AdminHeader';
import { useAuth } from '@/app/layout';

import DashboardHeader from './components/DashboardHeader';
import MetricsGrid from './components/MetricsGrid';
import RecentActivity from './components/RecentActivity';
import PlatformPulse from './components/PlatformPulse';
import UserRegistrationTrends from './components/UserRegistrationTrends';

export default function AdminDashboard() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AdminSidebar />
      <AdminHeader />

      <main className="ml-64 pt-24 p-8 min-h-screen">
        <DashboardHeader />

        <MetricsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <UserRegistrationTrends />
          <RecentActivity />
        </div>

        <PlatformPulse />
      </main>
    </>
  );
}