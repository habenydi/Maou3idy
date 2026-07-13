'use client';

import AdminNotifications from './AdminNotifications';
import AdminSettingsButton from './AdminSettingsButton';

export default function AdminHeader() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 flex justify-end items-center px-8 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">

      <div className="flex items-center gap-4">
        <AdminNotifications />
        <AdminSettingsButton />
      </div>
    </header>
  );
}