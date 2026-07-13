'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Img from 'next/image';
import LogoutPage from '@/app/(auth)/logout/page';

function Sidebar() {
  const pathname = usePathname();

  const isActive = (activePath: string) => pathname === activePath;

  const navItems = [
    { path: '/doctor/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/doctor/appointments', icon: 'calendar_today', label: 'Appointments' },
    { path: '/doctor/schedule', icon: 'schedule', label: 'Schedule' },
    { path: '/doctor/services', icon: 'medical_services', label: 'Services' },
    { path: '/doctor/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="h-screen w-64 bg-slate-100 flex flex-col py-6 sticky top-0 font-inter text-sm font-medium border-r-0">
      <div className="text-lg font-black font-manrope text-blue-700 px-4 mb-8">
        Maou<span className="text-blue-500">3</span>idy
      </div>

      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 p-3 bg-slate-200/50 rounded-xl">
          <Img
            alt="Doctor Avatar"
            width={10}
            height={10}
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ZqETx9_RaazbfBUW5ZRV_2W2vPgBDwAceiiKcnOlPTtOWfn2bPOLIndSHqLQcSXyWg4esxd6baEAEt66oj3QDqVOlHAHl4LfjfgU-mrTW_tknyMDmQqArNxvOJRCm-3AjS4Uw1URqWd8cRWBLMp4GVV04Pgvur2gqbI-VK-dI0k620bUxGoR5py15JaEClW_73JsOZSxSm8O9tUaRVmCviAiPDDmykBZa6kBgi0cRATE3UhSNhZuEbiwQlEwP2v5RSewDpCoP0Y"
          />
          <div>
            <p className="text-on-surface font-bold text-xs truncate">Dr. James Wilson</p>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">
              Cardiologist
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-white text-blue-600 shadow-sm font-bold'
                : 'text-slate-500 hover:bg-slate-200/50'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-slate-200/50">
        <Link
          href="/doctor/appointments/new"
          className="w-full mb-4 bg-linear-to-r from-primary to-primary-container text-white py-3 rounded-xl font-bold active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Appointment</span>
        </Link>
        <div className="space-y-1">
          <Link
            className="flex items-center gap-3 text-slate-500 px-4 py-2 hover:bg-slate-200/50 rounded-lg transition-all"
            href="/help"
          >
            <span className="material-symbols-outlined text-lg">help</span>
            <span>Help Center</span>
          </Link>
          <Link
            className="flex items-center gap-3 text-error px-4 py-2 hover:bg-error-container/10 rounded-lg transition-all"
            onClick={LogoutPage}
            href="/login"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;