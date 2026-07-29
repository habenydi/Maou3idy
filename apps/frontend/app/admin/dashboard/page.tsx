'use client';

import AdminShell from '@/app/admin/components/AdminShell';
import AdminHeader from '@/app/admin/components/AdminHeader';
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
      <div className="flex items-center justify-center h-screen">Loading...</div>
    );
  }

  return (
    <AdminShell activePage="dashboard">
      <AdminHeader />
      <main className="mt-16 p-4 sm:p-8 min-h-screen">
        <DashboardHeader />
        <MetricsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <UserRegistrationTrends />
          <RecentActivity />
        </div>
        <PlatformPulse />
      </main>
    </AdminShell>
  );
}