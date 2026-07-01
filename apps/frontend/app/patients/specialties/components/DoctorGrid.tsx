import DoctorCard from './DoctorCard';
import { doctors } from './doctors';

export default function DoctorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          {...doctor}
        />
      ))}
    </div>
  );
}