'use client';

export default function NotificationSettings() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">
        Notifications
      </h2>

      <div className="space-y-4">
        <label className="flex justify-between">
          <span>Email Notifications</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label className="flex justify-between">
          <span>Appointment Reminders</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label className="flex justify-between">
          <span>System Updates</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>
    </div>
  );
}