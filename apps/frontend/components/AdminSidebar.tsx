'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'dashboard',
  },
  {
    title: 'Doctors',
    href: '/admin/doctors',
    icon: 'medical_services',
  },
  {
    title: 'Patients',
    href: '/admin/patients',
    icon: 'groups',
  },
  {
    title: 'Appointments',
    href: '/admin/appointments',
    icon: 'event_available',
  },
  {
    title: 'Specialties',
    href: '/admin/specialties',
    icon: 'category',
  },
  {
    title: 'Reviews',
    href: '/admin/reviews',
    icon: 'reviews',
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: 'analytics',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: 'settings',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-slate-200 bg-white flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>
          </div>

          <div>
            <h1 className="font-bold text-lg font-manrope">
              MedReserve
            </h1>

            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-3">
          Management
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    active
                      ? 'text-white'
                      : 'text-slate-400 group-hover:text-primary'
                  }`}
                >
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            A
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-sm">
              Administrator
            </h3>

            <p className="text-xs text-slate-500">
              admin@medreserve.com
            </p>
          </div>

          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">
              logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}