import ChangePassword from './components/ChangePassword';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-surface p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-on-surface">
            Settings
          </h1>

          <p className="mt-2 text-on-surface-variant">
            Manage your account preferences, notifications, and security.
          </p>
        </div>

        <div className="space-y-8">
          <NotificationSettings />

          <ChangePassword />

          <SecuritySettings />
        </div>
      </div>
    </main>
  );
}