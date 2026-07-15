'use client';

interface Stat {
  label: string;
  value: string | number;
  icon: string;
}

export default function PatientStats({
  stats,
}: {
  stats: Stat[];
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="material-symbols-outlined text-primary text-3xl">
              {stat.icon}
            </span>

            <h3 className="text-2xl font-bold">
              {stat.value}
            </h3>
          </div>

          <p className="mt-4 text-sm text-on-surface-variant">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}