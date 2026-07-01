export default function DoctorListHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-on-surface-variant font-medium">
        Showing <span className="font-bold text-on-surface">124</span> Doctors
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-outline">
          Sort by:
        </span>

        <select className="bg-transparent font-bold text-primary">
          <option>Highest Rated</option>
          <option>Most Experience</option>
          <option>Availability</option>
        </select>
      </div>
    </div>
  );
}