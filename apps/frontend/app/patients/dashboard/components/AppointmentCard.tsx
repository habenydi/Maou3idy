type AppointmentCardProps = {
  doctorName: string;
  specialty: string;
  dateTime: string;
};

export default function AppointmentCard({
  doctorName,
  specialty,
  dateTime,
}: AppointmentCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary">
            person
          </span>
        </div>

        <div>
          <h3 className="font-bold text-on-surface">
            {doctorName}
          </h3>

          <p className="text-sm text-on-surface-variant">
            {specialty} • {dateTime}
          </p>
        </div>
      </div>

      <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all">
        View Details
      </button>
    </div>
  );
}