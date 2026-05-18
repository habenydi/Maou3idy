'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Sidebar from '@/components/Sidebar';

interface Appointment {
  id: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// Status color configuration - matches HTML design exactly
const STATUS_COLORS = {
  pending: {
    bg: 'bg-tertiary-container/20',
    text: 'text-tertiary',
  },
  accepted: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
  },
  rejected: {
    bg: 'bg-error-container/20',
    text: 'text-error',
  },
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'RE-2931',
      patientName: 'Eleanor Pena',
      service: 'Cardiology Consultation',
      date: 'Oct 24, 2024',
      time: '10:30 AM — 11:00 AM',
      status: 'pending',
    },
    {
      id: 'RE-2844',
      patientName: 'Robert Fox',
      service: 'Post-Op Review',
      date: 'Oct 24, 2024',
      time: '11:30 AM — 12:00 PM',
      status: 'accepted',
    },
    {
      id: 'RE-2955',
      patientName: 'Albert Flores',
      service: 'Echocardiogram',
      date: 'Oct 25, 2024',
      time: '09:00 AM — 10:00 AM',
      status: 'pending',
    },
    {
      id: 'RE-2712',
      patientName: 'Jane Cooper',
      service: 'Blood Pressure Check',
      date: 'Oct 22, 2024',
      time: '02:00 PM — 02:15 PM',
      status: 'rejected',
    },
    {
      id: 'RE-3001',
      patientName: 'Guy Hawkins',
      service: 'Stress Test',
      date: 'Oct 26, 2024',
      time: '11:00 AM — 12:00 PM',
      status: 'accepted',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Uncomment when backend is ready
    // fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAppointments();
      setAppointments(data as Appointment[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (appointmentId: string) => {
    try {
      await api.acceptAppointment(appointmentId);
      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: 'accepted' } : apt
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept appointment');
    }
  };

  const handleReject = async (appointmentId: string) => {
    try {
      await api.rejectAppointment(appointmentId);
      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: 'rejected' } : apt
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject appointment');
    }
  };

  const filteredAppointments = appointments.filter((apt) =>
    apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const acceptedCount = appointments.filter((a) => a.status === 'accepted').length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-surface min-h-screen overflow-y-auto">
        {/* Header Section */}
        <header className="px-8 pt-10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
              Appointments
            </h1>
            <p className="text-on-surface-variant font-medium">
              Manage your patient schedule and consultation requests.
            </p>
          </div>
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-surface-container-lowest px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  pending_actions
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                  Pending
                </p>
                <p className="text-2xl font-black text-on-surface">{pendingCount}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest px-6 py-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                  Accepted
                </p>
                <p className="text-2xl font-black text-on-surface">{acceptedCount}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <section className="px-8 pb-12">
          <div className="bg-surface-container-low p-2 rounded-2xl mb-8 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
              <input
                className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-xl pl-12 pr-4 py-3 text-sm placeholder:text-outline"
                placeholder="Search patients, services or IDs..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-surface-container-lowest px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 text-on-surface-variant hover:bg-surface-bright transition-colors">
                <span className="material-symbols-outlined text-lg">filter_list</span>
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-error/10 text-error rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 text-[10px] font-black uppercase tracking-widest text-outline">
              <div className="col-span-4">Patient Name</div>
              <div className="col-span-2">Service</div>
              <div className="col-span-3">Date & Time</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Appointment Rows */}
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="grid grid-cols-12 items-center bg-surface-container-lowest p-5 rounded-2xl transition-all hover:bg-surface-bright group"
                >
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{appointment.patientName}</h4>
                      <p className="text-xs text-on-surface-variant">ID: #{appointment.id}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-on-surface">{appointment.service}</span>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center gap-2 text-on-surface text-sm">
                      <span className="material-symbols-outlined text-primary text-lg">
                        calendar_today
                      </span>
                      <span className="font-semibold">{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs mt-1">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span
                      className={`px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-wide ${
                        STATUS_COLORS[appointment.status].bg
                      } ${STATUS_COLORS[appointment.status].text}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {appointment.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAccept(appointment.id)}
                          className="p-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                          title="Accept"
                        >
                          <span className="material-symbols-outlined">check_circle</span>
                        </button>
                        <button
                          onClick={() => handleReject(appointment.id)}
                          className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                          title="Reject"
                        >
                          <span className="material-symbols-outlined">cancel</span>
                        </button>
                      </>
                    ) : (
                      <button className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant text-xs font-bold">
                        Details
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <span className="material-symbols-outlined text-4xl text-outline">inbox</span>
                <p className="text-on-surface-variant">No appointments found</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Appointments;
