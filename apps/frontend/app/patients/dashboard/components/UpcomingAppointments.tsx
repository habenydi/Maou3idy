'use client';
import { useRouter } from 'next/navigation';
import AppointmentCard from './AppointmentCard';

type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  dateTime: string;
};

type Props = {
  appointments: Appointment[];
};

export default function UpcomingAppointments({
  appointments,
}: Props) {
  const router = useRouter();

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Your Upcoming Appointments
        </h2>

        <button
          onClick={() => router.push('/patients/doctor')}
          className="text-primary font-bold hover:underline"
        >
          Book New Appointment
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            doctorName={appointment.doctorName}
            specialty={appointment.specialty}
            dateTime={appointment.dateTime}
          />
        ))}
      </div>
    </section>
  );
}