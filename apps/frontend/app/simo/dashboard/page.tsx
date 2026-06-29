'use client';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Image from 'next/image';
import { useAuth } from '@/app/layout';
import UserRegistrationTrends from '../components/UserRegistrationTrends';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  return (
<>
  {/* SideNavBar (Shared Component) */}
  <AdminSidebar />
  {/* TopAppBar (Shared Component) */}
  <AdminHeader />
  {/* Main Content */}
  <main className="ml-64 pt-24 p-8 min-h-screen">
    {/* Dashboard Header */}
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
        Clinical Dashboard
      </h1>
      <p className="text-on-surface-variant font-medium">
        Overview of MedReserve ecosystem health and practitioner activity.
      </p>
    </div>
    {/* Bento Grid Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Metric 1 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-fixed-variant"
              data-icon="person"
            >
              person
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">
            +12%
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Total Users
          </p>
          <p className="text-3xl font-extrabold text-on-surface">12,450</p>
        </div>
      </div>
      {/* Metric 2 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-secondary-fixed-variant"
              data-icon="medical_information"
            >
              medical_information
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-secondary/10 text-secondary rounded-full">
            Active
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Total Doctors
          </p>
          <p className="text-3xl font-extrabold text-on-surface">842</p>
        </div>
      </div>
      {/* Metric 3 */}
      <div className="p-6 rounded-xl bg-tertiary-fixed flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
            <span
              className="material-symbols-outlined text-white"
              data-icon="pending_actions"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              pending_actions
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant rounded-full">
            Urgent
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-tertiary-fixed-variant uppercase tracking-widest mb-1">
            Pending Applications
          </p>
          <p className="text-3xl font-extrabold text-on-tertiary-fixed">15</p>
        </div>
      </div>
      {/* Metric 4 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-green-700"
              data-icon="trending_up"
            >
              trending_up
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Monthly Growth
          </p>
          <p className="text-3xl font-extrabold text-on-surface">+8%</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Registration Trends Chart (Asymmetric larger span) */}
      <UserRegistrationTrends />
      {/* Recent Activity List */}
      <div className="p-8 rounded-xl bg-surface-container-lowest">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
          <button className="text-primary text-xs font-bold hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-6">
          {/* Activity Item 1 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                className="w-full h-full object-cover"
                alt="Close-up portrait of a female doctor in a white coat with a stethoscope around her neck"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmvwIVbqciF1q1vP8ev2UyQwitEyRBm2jmRPlfgL_tnK7fjSFCgHuU_j72T_LTNhg4dqMhlXWXffYF-QvtIok8CajfBw1srtqcFhrgF7HjoBWVF6hRqnbdqr3n_HffHYg0Rm9psJgrnRKUa7N-NgZxt2NjQ5ekKn0IlPbIM0Nde4EMa4AW_5dJ1uK-5P3ct4slnvw-pphq5ectk8alzXR6M1PLe-ZxUjFSetRBrj1GHf1hAMT2A3BbsgAmxo7S2zVlnR4aZjB35iI"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Dr. Elena Rodriguez
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                Approved for Cardiology Dept.
              </p>
              <span className="text-[10px] text-outline font-medium">
                2 mins ago
              </span>
            </div>
          </div>
          {/* Activity Item 2 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-white text-lg"
                data-icon="assignment_late"
              >
                assignment_late
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                System Alert
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                New medical license verification pending for Dr. Aris Thorne.
              </p>
              <span className="text-[10px] text-outline font-medium">
                45 mins ago
              </span>
            </div>
          </div>
          {/* Activity Item 3 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                className="w-full h-full object-cover"
                alt="Professional headshot of a diverse male doctor smiling warmly in a clinical hallway"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGhJRP_U3FeuGZ4z8Phn3za6Isft4_syIdPoQVvMUSpXuq2SyzPE-zdGx56m0cWq08dyY4bixz--l3p7kkPf5_VUaMa7sFCTOL9DY0rPqRswDxcNdpfeyzIfmacd7l35NehoumY78iJE1LzugoE-i-IC5mx8FaQ6LwzhuxiVERBbtNGm0lPbFBfPt54t4AgsPg2mcWE7mQC_JTUP7FywbY2KAiEvqiDEQcnCLbJSoKHqmk8vKGXor5Emy3rZ3Osd1dv9iZ-phUHoI"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Dr. Marcus Chen
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                Updated schedule for July 2024.
              </p>
              <span className="text-[10px] text-outline font-medium">
                3 hours ago
              </span>
            </div>
          </div>
          {/* Activity Item 4 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-on-primary-fixed-variant text-lg"
                data-icon="person_add"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                person_add
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                New Registration
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                5 new patient accounts created in the last hour.
              </p>
              <span className="text-[10px] text-outline font-medium">
                1 hour ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Clinical Pulse Cards (Specialty Component) */}
    <div className="mt-12">
      <h3 className="text-xl font-bold text-on-surface mb-6">
        Real-time Platform Pulse
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-primary-fixed-dim border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-primary-fixed uppercase tracking-widest mb-4">
              API Response Time
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-primary-fixed">
                124
              </span>
              <span className="text-xs font-bold text-on-primary-fixed/60">
                ms
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="bolt"
            >
              bolt
            </span>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-high border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">
              Active Sessions
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-surface">
                1.2k
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                Live
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="sensor_occupied"
            >
              sensor_occupied
            </span>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-highest border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">
              Server Uptime
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-surface">
                99.9
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                %
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="cloud_done"
            >
              cloud_done
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</>

  );
}