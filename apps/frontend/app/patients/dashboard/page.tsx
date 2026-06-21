'use client';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/app/layout';

export default function PatientDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar showAuthButtons={true} />
      
      <main className="pt-24 pb-12 max-w-screen-2xl mx-auto px-6">
        <section className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">My Dashboard</h1>
          <p className="text-on-surface-variant text-lg">Welcome to your patient dashboard. Manage your appointments and health records here.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-surface-container-lowest rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant text-sm">Upcoming Appointments</p>
                <p className="text-3xl font-bold text-primary">2</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary">event</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant text-sm">Completed Visits</p>
                <p className="text-3xl font-bold text-primary">8</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant text-sm">Pending Results</p>
                <p className="text-3xl font-bold text-primary">1</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary">pending_actions</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-on-surface-variant text-sm">Favorite Doctors</p>
                <p className="text-3xl font-bold text-primary">3</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-primary">favorite</span>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Upcoming Appointments</h2>
            <button 
              onClick={() => router.push('/patients/doctor')}
              className="text-primary font-bold hover:underline"
            >
              Book New Appointment
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container-lowest rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary">person</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Dr. James Wilson</h3>
                  <p className="text-sm text-on-surface-variant">Cardiology • Dec 15, 2024 at 2:00 PM</p>
                </div>
              </div>
              <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 transition-all">
                View Details
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
          <div className="text-xs text-slate-500 font-inter">© 2024 MedReserve Clinical Systems. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-8 font-inter text-xs">
            <a className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Privacy Policy</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Terms of Service</a>
            <a className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
