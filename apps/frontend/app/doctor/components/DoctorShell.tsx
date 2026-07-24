'use client';

import { useState } from 'react';
import Sidebar from './SideBar';

export default function DoctorShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 h-14 bg-slate-100 border-b border-slate-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-bold text-slate-900 text-lg">
          Maou<span className="text-blue-500">3</span>idy
        </span>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Offset content below mobile bar on small screens, no offset on lg */}
      <div className="flex-1 flex flex-col min-h-screen pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
