'use client';
import Sidebar from "../components/SideBar";
import InformationFooter from "@/components/InformationFooter";
import DoctorHeader from "../dashboard/components/DoctorHeader";

import ProfileSettings from "./components/ProfileSettings";
import ProfessionalSettings from "./components/ProfessionalSettings";
import SecuritySettings from "./components/SecuritySettings";
import { useAuth } from "@/app/layout";

export default function DoctorSettingsPage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen bg-surface">
                <Sidebar />
                <main className="grow overflow-y-auto">
                    <div className="p-8 space-y-8 max-w-7xl mx-auto">
                        <DoctorHeader name="Doctor" />
                        <div>Loading...</div>
                    </div>
                </main>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen bg-surface">
                <Sidebar />
                <main className="grow overflow-y-auto">
                    <div className="p-8 space-y-8 max-w-7xl mx-auto">
                        <DoctorHeader name="Doctor" />
                        <div>You must be logged in to access this page.</div>
                    </div>
                </main>
            </div>
        );
    }
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />

      <main className="grow overflow-y-auto">
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
          <DoctorHeader name="Doctor" />

          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
              Settings
            </h1>

            <p className="mt-2 text-on-surface-variant">
              Manage your account, professional information, security, and
              notification preferences.
            </p>
          </div>

          {/* Settings Sections */}
          <ProfileSettings user={user} />

          <ProfessionalSettings />

          <SecuritySettings />

          <InformationFooter />
        </div>
      </main>
    </div>
  );
}