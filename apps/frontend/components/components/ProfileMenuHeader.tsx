'use client';

interface ProfileMenuHeaderProps {
  name: string;
  email: string;
}

export default function ProfileMenuHeader({
  name,
  email,
}: ProfileMenuHeaderProps) {
  return (
    <div className="p-4 flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-slate-500">
          account_circle
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="font-bold text-slate-900 truncate">
          {name}
        </h3>

        <p className="text-sm text-slate-500 truncate">
          {email}
        </p>
      </div>
    </div>
  );
}