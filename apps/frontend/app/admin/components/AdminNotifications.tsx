'use client';

import { useState } from 'react';

const notifications = [
  {
    id: 1,
    title: 'New doctor application',
    description: 'Dr. Sarah Ahmed submitted a verification request.',
    time: '2 min ago',
  },
  {
    id: 2,
    title: 'User account suspended',
    description: 'A patient account has been suspended.',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'System report generated',
    description: 'Monthly analytics report is ready.',
    time: '3 hours ago',
  },
];

export default function AdminNotifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all relative"
      >
        <span className="material-symbols-outlined">
          notifications
        </span>

        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error" />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-lg">
              Notifications
            </h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold text-sm">
                    {notification.title}
                  </h4>

                  <span className="text-xs text-slate-400">
                    {notification.time}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-1">
                  {notification.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50">
            <button className="w-full text-sm font-semibold text-primary">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}