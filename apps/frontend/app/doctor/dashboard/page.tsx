'use client';

import  { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import DoctorShell from '../components/DoctorShell';
import InformationFooter from '@/components/InformationFooter';
import DoctorHeader from './components/DoctorHeader';
import StatsCards from './components/StatsCards';
import AppointmentChart from './components/AppointmentChart';
import TodaySchedule from './components/TodaySchedule';
import { useAuth } from '@/app/layout';

type Stats = {
  totalAppointments: number;
  upcomingToday: number;
  weeklyGrowth: number;
};

type ScheduleItem = {
  id: number;
  patientName: string;
  type: string;
  time: string;
  avatar: string | null;
  border?: string;
};

const Dashboard = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    setName(user.name ?? 'Doctor');
    fetchDashboardData();
  }, [authLoading, router, user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, scheduleData] = (await Promise.all([
        api.getDashboardStats().catch(() => ({ totalAppointments: 1284, upcomingToday: 18, weeklyGrowth: 84 })),
        api.getTodaySchedule().catch(() => [
          { id: 1, patientName: 'Sarah Jenkins', type: 'Follow-up', time: '09:30 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwAzAZFILC-8Py_Y2JMqWLfaWH_qkcDc1Rhc8sNEhtbV-ZPz3yCOMIOXDMQvktEBug-9fJqnFecptSxzbcK6px210Eu3l2mk0qLJ0RhCPBZlAhHjzaai4LgSB-0yc4uV5IluL8YltYHtQIM2Mod4Qb86FpJBqac5KalOq4mpFIHnpx_VBMWDI0NfSI4l-zpq0V2NkqFX_-VCwHr8lBoNoZ4QGT26ioR_LUoVkGGp4F6UsW5lKwgE9UxzRUoB_Gzis5B-a17-hXm-4' },
          { id: 2, patientName: 'Robert Chen', type: 'Consultation', time: '10:15 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd2sN_aSZ6xmg8INy1lWjsh4H59I6g-xRGAuoUq8mvkWOvLNh6aPGhNoRfbx7TpBvt3ypO5K75DNn8cLYNCProQoR5zuccvub5CELgGKBSdmTAMrw21IdcaKDKm0Q4k2G-yPSdYgN2GlniWRcreMGdD1R19VwWQCZpMW8sqU9z6dCQho_zNpJmqJoauJ7Ps5QyhgGTiudB2FKrLb96G5JAYw19Ya7R0qwf5iU_QIeP-uyRsjFQcepY04T5Iy0tShH9nSALKz47kdk' },
          { id: 3, patientName: 'Aliyah Smith', type: 'ECG Report', time: '11:45 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxmr6c2leRd_u4Z-TdmxP2eKSw0KZXMaUhS_Aha8oGncPqEb6OtpgH4A8TVCfAGAc_wSKyWg2oma2KTYGYFOY4WlNShHIjx_NVifMxclBqG9eHIVVYPYdLBVzw8uRKKUgbY-vlO6sCq7i8KF_2b6vEcBoxDRaQ0zNWSY3Orw0O9Q15wr5_Om8KZV2tTqg7ujNsmTMaDF5DaaTGjWAG0uQTfOa-WngmxcairEM7tzSuneY-y5MP_mqyyCKiDh8OnUhKaXhcDZ9HQk' },
        ]),
      ])) as [Stats, ScheduleItem[]];
      setStats(statsData);
      setTodaySchedule(scheduleData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fallbackSchedule: ScheduleItem[] = [
    { id: 1, patientName: 'Sarah Jenkins', type: 'Follow-up', time: '09:30 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwAzAZFILC-8Py_Y2JMqWLfaWH_qkcDc1Rhc8sNEhtbV-ZPz3yCOMIOXDMQvktEBug-9fJqnFecptSxzbcK6px210Eu3l2mk0qLJ0RhCPBZlAhHjzaai4LgSB-0yc4uV5IluL8YltYHtQIM2Mod4Qb86FpJBqac5KalOq4mpFIHnpx_VBMWDI0NfSI4l-zpq0V2NkqFX_-VCwHr8lBoNoZ4QGT26ioR_LUoVkGGp4F6UsW5lKwgE9UxzRUoB_Gzis5B-a17-hXm-4', border: 'border-blue-500' },
    { id: 2, patientName: 'Robert Chen', type: 'Consultation', time: '10:15 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd2sN_aSZ6xmg8INy1lWjsh4H59I6g-xRGAuoUq8mvkWOvLNh6aPGhNoRfbx7TpBvt3ypO5K75DNn8cLYNCProQoR5zuccvub5CELgGKBSdmTAMrw21IdcaKDKm0Q4k2G-yPSdYgN2GlniWRcreMGdD1R19VwWQCZpMW8sqU9z6dCQho_zNpJmqJoauJ7Ps5QyhgGTiudB2FKrLb96G5JAYw19Ya7R0qwf5iU_QIeP-uyRsjFQcepY04T5Iy0tShH9nSALKz47kdk', border: 'border-amber-500' },
    { id: 3, patientName: 'Aliyah Smith', type: 'ECG Report', time: '11:45 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxmr6c2leRd_u4Z-TdmxP2eKSw0KZXMaUhS_Aha8oGncPqEb6OtpgH4A8TVCfAGAc_wSKyWg2oma2KTYGYFOY4WlNShHIjx_NVifMxclBqG9eHIVVYPYdLBVzw8uRKKUgbY-vlO6sCq7i8KF_2b6vEcBoxDRaQ0zNWSY3Orw0O9Q15wr5_Om8KZV2tTqg7ujNsmTMaDF5DaaTGjWAG0uQTfOa-WngmxcairEM7tzSuneY-y5MP_mqyyCKiDh8OnUhKaXhcDZ9HQk', border: 'border-emerald-500' },
    { id: 4, patientName: 'Marcus Thorne', type: 'Initial Check', time: '02:00 PM', avatar: null, border: 'border-blue-500' },
  ];

  const scheduleItems: ScheduleItem[] = todaySchedule.length ? todaySchedule : fallbackSchedule;

  return (
    <DoctorShell>
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto bg-surface">
        <DoctorHeader name={name || 'Doctor'} />
        {error && (
          <div className="p-4 bg-error/10 text-error rounded-lg border border-error/20">{error}</div>
        )}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-on-surface-variant">Loading dashboard...</p>
          </div>
        ) : (
          <>
            <StatsCards stats={stats} />
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AppointmentChart />
              <TodaySchedule scheduleItems={scheduleItems} />
            </section>
          </>
        )}
      </main>
      <InformationFooter />
    </DoctorShell>
  );
};

export default Dashboard;