import AppointmentsRow from "./AppointmentsRow";
import EmptyState from "./EmptyState";
import { Appointment } from "../page";

type AppointmentsTableProps = {
  appointments: Appointment[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

export default function AppointmentsTable({
  appointments,
  onAccept,
  onReject,
}: AppointmentsTableProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 px-6 text-[10px] font-black uppercase tracking-widest text-outline">
        <div className="col-span-4">Patient Name</div>
        <div className="col-span-2">Service</div>
        <div className="col-span-3">Date & Time</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {appointments.length ? (
        appointments.map((appointment) => (
          <AppointmentsRow
            key={appointment.id}
            appointment={appointment}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}