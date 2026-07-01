'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/layout';

type AdminSidebarProps = {
  activePage?: 'dashboard' | 'users' | 'doctors';
};

export default function AdminSidebar({
  activePage = 'dashboard',
}: AdminSidebarProps) {
  const navItems = [
    {
      name: 'Dashboard',
      href: '/simo/dashboard',
      icon: 'dashboard',
      key: 'dashboard',
    },
    {
      name: 'Users',
      href: '/simo/users',
      icon: 'group',
      key: 'users',
    },
    {
      name: 'Doctors',
      href: '/simo/doctors',
      icon: 'description',
      key: 'doctors',
    },
  ];
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-slate-50 p-4">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
          <span className="material-symbols-outlined">
            medical_services
          </span>
        </div>

        <div>
          <h2 className="font-['Manrope'] text-xl font-bold text-slate-900">
            MedReserve
          </h2>

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Clinical Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activePage === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all
                ${
                  isActive
                    ? 'bg-white font-semibold text-blue-600 shadow-sm'
                    : 'font-medium text-slate-500 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
            >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>

              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Admin Profile */}
      <div className="mt-auto rounded-xl bg-slate-100 p-4">
        <div className="flex items-center gap-3">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD81svyPA2q1S6VVGoKBKruqUMi6WgQIiCSP3YLFig9fRlJQn29pFZhMJhTYlpxvvHesozL1kyJoPO4u3SWXwOtyWtYCESYQehlKpV1jAS-5_nzkTAzW5eH_hbEK9DFYwdykj-FfPEZ-yGumnZbNu-rlPk_6Pi-mCts7MQnoRf4apUKMOxN8XTKxiGGQx1eCTuIJrafp2jnJfH8duLsvx-6krhTaRhLUb7uqsUS_t5YNvu8l79KuRTD2lu41b_mR884Rtty65RT_s"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />

          <div className="overflow-hidden">
            <p className="truncate text-xs font-bold text-slate-900">
              Mr. {user?.name || 'Admin'}
            </p>

            <p className="truncate text-[10px] text-slate-500">
              Senior Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}