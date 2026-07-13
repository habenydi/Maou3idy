import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

import SettingsPageHeader from './components/SettingsPageHeader';
import GeneralSettingsCard from './components/GeneralSettingsCard';
import SecuritySettingsCard from './components/SecuritySettingsCard';
import NotificationSettingsCard from './components/NotificationSettingsCard';
import AppointmentSettingsCard from './components/AppointmentSettingsCard';
import MaintenanceSettingsCard from './components/MaintenanceSettingsCard';

export default function AdminSettingsPage() {
  return (
    <>
      <AdminSidebar  />

      <main className="ml-64 min-h-screen flex flex-col">
        <AdminHeader />

        <section className="mt-16 p-8 flex-1">
          <div className="max-w-6xl mx-auto space-y-8">
            <SettingsPageHeader />

            <GeneralSettingsCard />

            <SecuritySettingsCard />

            <NotificationSettingsCard />

            <AppointmentSettingsCard />

            <MaintenanceSettingsCard />
          </div>
        </section>
      </main>
    </>
  );
}