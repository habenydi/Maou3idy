'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import DoctorShell from '../components/DoctorShell';
import AppointmentsHeader from './components/AppointmentsHeader';
import AppointmentsFilters from './components/AppointmentsFilters';
import AppointmentsTable from './components/AppointmentsTable';

export interface Appointment {
  id: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

// Status color configuration - matches HTML design exactly
export const STATUS_COLORS = {
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
  if (loading) {
    return (
      <DoctorShell>
        <main className="flex-1 bg-surface min-h-screen overflow-y-auto flex items-center justify-center">
          <p className="text-on-surface-variant">Loading appointments...</p>
        </main>
      </DoctorShell>
    );
  }

  return (
    <DoctorShell>
      <main className="flex-1 bg-surface min-h-screen overflow-y-auto">
        <AppointmentsHeader pendingCount={pendingCount} acceptedCount={acceptedCount} />
        <section className="px-4 sm:px-8 pb-12">
          <AppointmentsFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {error && (
            <div className="mb-4 p-4 bg-error/10 text-error rounded-lg border border-error/20">{error}</div>
          )}
          <AppointmentsTable appointments={filteredAppointments} onAccept={handleAccept} onReject={handleReject} />
        </section>
      </main>
    </DoctorShell>
  );
};

export default Appointments;
