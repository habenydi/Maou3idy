'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

type AdminShellProps = {
  children: React.ReactNode;
  activePage?: 'dashboard' | 'users' | 'doctors' | 'settings';
};

export default function AdminShell({ children, activePage }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center gap-3 px-4 h-14 bg-slate-50 border-b border-slate-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-bold text-slate-900 text-lg">
          Maou<span className="text-blue-500">3</span>idy Admin
        </span>
      </div>

      <AdminSidebar
        activePage={activePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Offset content: below mobile bar on small, behind fixed admin header on lg */}
      <div className="flex-1 flex flex-col min-h-screen pt-14 lg:pt-0 lg:ml-64">
        {children}
      </div>
    </div>
  );
}
