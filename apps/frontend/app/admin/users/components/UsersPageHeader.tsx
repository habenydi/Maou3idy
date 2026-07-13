'use client';
import { UserRow } from '@/types/user';

import { useRouter, useSearchParams } from 'next/navigation';

export default function UsersPageHeader({
  search,
  role,
}: {
  search?: string;
  role?: string;
  users?: UserRow[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set('page', '1');

    router.push(`/admin/users?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
          Users Management
        </h1>

        <p className="text-on-surface-variant font-medium">
          Oversee and manage system access for clinical personnel and patients.
        </p>
      </div>

      <div className="flex gap-3">
        {/* Search */}
        <div className="flex items-center gap-6 px-6 bg-surface-container-low rounded-xl">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>

            <input
              type="text"
              defaultValue={search}
              placeholder="Search users..."
              className="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-sm w-64 outline-none"
              onChange={(e) =>
                updateParam('search', e.target.value)
              }
            />
          </div>
        </div>

        {/* Role Filter */}
        <div className="px-4 py-3 bg-primary text-on-primary rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">
            filter_list
          </span>

          <select
            value={role || ''}
            onChange={(e) =>
              updateParam('role', e.target.value)
            }
            className="bg-transparent outline-none text-sm font-semibold cursor-pointer"
          >
            <option value="" className="text-black">
              All Users
            </option>
            <option value="DOCTOR" className="text-black">
              Doctors
            </option>
            <option value="PATIENT" className="text-black">
              Patients
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}