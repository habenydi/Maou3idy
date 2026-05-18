'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, scheduleData] = await Promise.all([
        api.getDashboardStats().catch(() => ({ totalAppointments: 1284, upcomingToday: 18, weeklyGrowth: 84 })),
        api.getTodaySchedule().catch(() => [
          { id: 1, patientName: 'Sarah Jenkins', type: 'Follow-up', time: '09:30 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwAzAZFILC-8Py_Y2JMqWLfaWH_qkcDc1Rhc8sNEhtbV-ZPz3yCOMIOXDMQvktEBug-9fJqnFecptSxzbcK6px210Eu3l2mk0qLJ0RhCPBZlAhHjzaai4LgSB-0yc4uV5IluL8YltYHtQIM2Mod4Qb86FpJBqac5KalOq4mpFIHnpx_VBMWDI0NfSI4l-zpq0V2NkqFX_-VCwHr8lBoNoZ4QGT26ioR_LUoVkGGp4F6UsW5lKwgE9UxzRUoB_Gzis5B-a17-hXm-4' },
          { id: 2, patientName: 'Robert Chen', type: 'Consultation', time: '10:15 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd2sN_aSZ6xmg8INy1lWjsh4H59I6g-xRGAuoUq8mvkWOvLNh6aPGhNoRfbx7TpBvt3ypO5K75DNn8cLYNCProQoR5zuccvub5CELgGKBSdmTAMrw21IdcaKDKm0Q4k2G-yPSdYgN2GlniWRcreMGdD1R19VwWQCZpMW8sqU9z6dCQho_zNpJmqJoauJ7Ps5QyhgGTiudB2FKrLb96G5JAYw19Ya7R0qwf5iU_QIeP-uyRsjFQcepY04T5Iy0tShH9nSALKz47kdk' },
          { id: 3, patientName: 'Aliyah Smith', type: 'ECG Report', time: '11:45 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxmr6c2leRd_u4Z-TdmxP2eKSw0KZXMaUhS_Aha8oGncPqEb6OtpgH4A8TVCfAGAc_wSKyWg2oma2KTYGYFOY4WlNShHIjx_NVifMxclBqG9eHIVVYPYdLBVzw8uRKKUgbY-vlO6sCq7i8KF_2b6vEcBoxDRaQ0zNWSY3Orw0O9Q15wr5_Om8KZV2tTqg7ujNsmTMaDF5DaaTGjWAG0uQTfOa-WngmxcairEM7tzSuneY-y5MP_mqyyCKiDh8OnUhKaXhcDZ9HQk' },
        ]),
      ] as const);
      setStats(statsData);
      setTodaySchedule(scheduleData as any[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fallbackSchedule = [
    { id: 1, patientName: 'Sarah Jenkins', type: 'Follow-up', time: '09:30 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwAzAZFILC-8Py_Y2JMqWLfaWH_qkcDc1Rhc8sNEhtbV-ZPz3yCOMIOXDMQvktEBug-9fJqnFecptSxzbcK6px210Eu3l2mk0qLJ0RhCPBZlAhHjzaai4LgSB-0yc4uV5IluL8YltYHtQIM2Mod4Qb86FpJBqac5KalOq4mpFIHnpx_VBMWDI0NfSI4l-zpq0V2NkqFX_-VCwHr8lBoNoZ4QGT26ioR_LUoVkGGp4F6UsW5lKwgE9UxzRUoB_Gzis5B-a17-hXm-4', border: 'border-blue-500' },
    { id: 2, patientName: 'Robert Chen', type: 'Consultation', time: '10:15 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd2sN_aSZ6xmg8INy1lWjsh4H59I6g-xRGAuoUq8mvkWOvLNh6aPGhNoRfbx7TpBvt3ypO5K75DNn8cLYNCProQoR5zuccvub5CELgGKBSdmTAMrw21IdcaKDKm0Q4k2G-yPSdYgN2GlniWRcreMGdD1R19VwWQCZpMW8sqU9z6dCQho_zNpJmqJoauJ7Ps5QyhgGTiudB2FKrLb96G5JAYw19Ya7R0qwf5iU_QIeP-uyRsjFQcepY04T5Iy0tShH9nSALKz47kdk', border: 'border-amber-500' },
    { id: 3, patientName: 'Aliyah Smith', type: 'ECG Report', time: '11:45 AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVxmr6c2leRd_u4Z-TdmxP2eKSw0KZXMaUhS_Aha8oGncPqEb6OtpgH4A8TVCfAGAc_wSKyWg2oma2KTYGYFOY4WlNShHIjx_NVifMxclBqG9eHIVVYPYdLBVzw8uRKKUgbY-vlO6sCq7i8KF_2b6vEcBoxDRaQ0zNWSY3Orw0O9Q15wr5_Om8KZV2tTqg7ujNsmTMaDF5DaaTGjWAG0uQTfOa-WngmxcairEM7tzSuneY-y5MP_mqyyCKiDh8OnUhKaXhcDZ9HQk', border: 'border-emerald-500' },
    { id: 4, patientName: 'Marcus Thorne', type: 'Initial Check', time: '02:00 PM', avatar: null, border: 'border-blue-500' },
  ];

  const scheduleItems = todaySchedule.length ? todaySchedule : fallbackSchedule;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <main className="grow p-8 space-y-8 overflow-y-auto bg-surface">
          {/* Header */}
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-extrabold font-manrope tracking-tight text-on-surface">
                Clinic Overview
              </h1>
              <p className="text-slate-500 font-medium">
                Welcome back, Dr. Wilson. Here&apos;s what&apos;s happening today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">calendar_month</span>
                <span className="text-sm font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          {/* Error State */}
          {error && (
            <div className="p-4 bg-error/10 text-error rounded-lg border border-error/20">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-on-surface-variant">Loading dashboard...</p>
            </div>
          ) : (
            <>
              {/* Stats Section */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ...existing stats cards... */}
                <div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:bg-surface-bright group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">list_alt</span>
                    </div>
                    <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">
                      +12%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-500">Total Appointments</span>
                    <div className="text-3xl font-black font-manrope">
                      {stats?.totalAppointments || 0}
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:bg-surface-bright group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">pending_actions</span>
                    </div>
                    <span className="text-blue-600 text-xs font-bold bg-blue-100 px-2 py-1 rounded-full">
                      Today
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-slate-500">Upcoming Today</span>
                    <div className="text-3xl font-black font-manrope text-primary">
                      {stats?.upcomingToday || 0}
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-blue-100">Weekly Patient Growth</span>
                      <div className="text-3xl font-black font-manrope">
                        {stats?.weeklyGrowth || 0}%
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </section>

              {/* Chart & Today's Schedule */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-xl font-bold font-manrope">Appointment Trends</h3>
                      <p className="text-xs text-slate-500">Overview of patient visits per month</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs font-bold bg-surface-container rounded-md">
                        Weekly
                      </button>
                      <button className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-md">
                        Monthly
                      </button>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map((month, index) => (
                      <div key={month} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div
                          className={`w-12 ${
                            index === 2 ? 'bg-primary/80 h-56' : index === 5 ? 'bg-slate-200 h-52' : 'bg-slate-100 h-32'
                          } rounded-t-lg group-hover:bg-primary/20 transition-all relative`}
                        >
                          {index === 2 && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded">
                              124
                            </div>
                          )}
                        </div>
                        <span className={`text-[10px] font-bold ${index === 2 ? 'text-primary' : 'text-slate-400'}`}>
                          {month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-low p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold font-manrope">Today&apos;s Schedule</h3>
                    <a className="text-primary text-xs font-bold hover:underline" href="#">
                      View All
                    </a>
                  </div>
                  <div className="space-y-4">
                    {scheduleItems.map((appointment: any) => (
                      <div
                        key={appointment.id}
                        className={`bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:bg-surface-bright transition-colors border-l-4 ${appointment.border || 'border-blue-500'}`}
                      >
                        {appointment.avatar ? (
                          <img alt="Patient" className="w-10 h-10 rounded-lg object-cover" src={appointment.avatar} />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined">person</span>
                          </div>
                        )}
                        <div className="grow">
                          <h4 className="text-sm font-bold">{appointment.patientName}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {appointment.type} • {appointment.time}
                          </p>
                        </div>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      <footer className="bg-slate-50 w-full border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
          <div className="font-inter text-xs text-slate-500">
            © 2024 MedReserve Clinical Systems. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs">
            <a className="text-slate-500 hover:text-slate-900 transition-colors" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors" href="#">Contact Support</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors" href="#">Healthcare Partners</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;