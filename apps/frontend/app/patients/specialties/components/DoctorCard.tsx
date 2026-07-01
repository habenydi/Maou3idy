'use client';

import Img from 'next/image';
import { useRouter } from 'next/navigation';

type DoctorCardProps = {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  badge: string;
  badgeClass: string;
  image: string;
};

export default function DoctorCard({
  id,
  name,
  specialty,
  image,
  rating,
  experience,
  badge,
}: DoctorCardProps) {
  const router = useRouter();

  return (
    <div className="group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <div className="relative h-64 overflow-hidden">
        <Img
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg">
          ⭐ {rating}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-primary font-semibold text-sm">
            {specialty}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-surface-container-low px-3 py-1 rounded-full text-xs">
            {experience}
          </span>

          <span className="bg-success/10 text-emerald-700 px-3 py-1 rounded-full text-xs">
            {badge}
          </span>
        </div>

        <button
          onClick={() =>
            router.push(`/patients/booking?doctorId=${id}`)
          }
          className="w-full bg-surface-container-highest py-3 rounded-lg font-bold"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}