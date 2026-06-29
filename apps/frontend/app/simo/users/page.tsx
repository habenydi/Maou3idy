import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardPage() {
    return (
        <>
  {/* SideNavBar Component */}
  <AdminSidebar activePage="users" />
  {/* Main Content Area */}
  <main className="ml-64 min-h-screen flex flex-col">
    {/* TopAppBar Component */}
    <AdminHeader />
    {/* Canvas */}
    <section className="mt-16 p-8 flex-1">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
              Users Management
            </h1>
            <p className="text-on-surface-variant font-medium">
              Oversee and manage system access for clinical personnel and
              patients.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-surface-container-highest text-on-surface rounded-xl font-semibold text-sm transition-transform active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              Filters
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-semibold text-sm shadow-lg shadow-primary/20 transition-transform active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                person_add
              </span>
              Add New User
            </button>
          </div>
        </div>
        {/* Stats Bento Grid (Tonal Layering) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-surface-container-low rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              Total Users
            </p>
            <p className="text-4xl font-extrabold text-on-surface font-headline">
              1,284
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-green-600 font-bold">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>{" "}
              12% from last month
            </div>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              Active Doctors
            </p>
            <p className="text-4xl font-extrabold text-on-surface font-headline">
              86
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 font-medium">
              4 newly onboarded
            </div>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              Pending Patients
            </p>
            <p className="text-4xl font-extrabold text-on-surface font-headline">
              32
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-tertiary font-bold">
              Requires review
            </div>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
              System Health
            </p>
            <p className="text-4xl font-extrabold text-on-surface font-headline">
              99.9%
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs text-primary font-bold">
              Security: High
            </div>
          </div>
        </div>
        {/* Main Users Table (Capsule Pattern) */}
        <div className="space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-6 px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2">Name &amp; Identity</div>
            <div>Role</div>
            <div>Join Date</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>
          {/* Row 1 */}
          <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all group">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed flex-shrink-0">
                <img
                  alt="Julianne White"
                  className="w-full h-full object-cover"
                  data-alt="headshot of a middle-aged woman with glasses and professional attire, soft neutral background, high resolution photography"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg0DvHSMBLnbe0iqPg8jcrfQPpcxc-lygCetMOLec3vSYBDi3V6UMvUhrdTV6B3nkQc4DgRRhb5niwbt76rX-WnFiMwy7rF98jBoXpgoxI6M2B2wEfHqMnA9Gu1d97sZrd3hsCwsePN7rR6i540KrwJRa3KE2dAmL-uYI-Yq7OFNUNcOXwyc3Djr5ifXYOv_EnAgJoWjmxw-SigYj-shqMZE8H_Q878pPFR62zvhwxj-RXz2uqLVX-18wsFGB9uYzI5Y7PPeNATvA"
                />
              </div>
              <div>
                <p className="font-bold text-on-surface">Julianne White</p>
                <p className="text-xs text-slate-500">julianne.w@clinic.com</p>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 bg-secondary-container/30 text-on-secondary-container text-[11px] font-bold rounded-full border border-secondary-container/50">
                Doctor
              </span>
            </div>
            <div className="text-sm font-medium text-on-surface-variant">
              Oct 12, 2023
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                Active
              </span>
            </div>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Reset Password"
              >
                <span className="material-symbols-outlined text-lg">
                  lock_reset
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Change Role"
              >
                <span className="material-symbols-outlined text-lg">
                  edit_note
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                title="Deactivate"
              >
                <span className="material-symbols-outlined text-lg">
                  person_off
                </span>
              </button>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all group">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-tertiary-fixed flex-shrink-0">
                <img
                  alt="Aaron Miller"
                  className="w-full h-full object-cover"
                  data-alt="portrait of a young adult male with dark hair wearing a casual blue shirt, bright airy background, medical patient profile style"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8QhcnWddDi7SaI9DW4eW-TuvGBvX6ND-PCkR9wTmw6MSSFic4H4hNzoDy8kcnsV269guqy-b-KpMkc_OhllB5g1fi-Aorl75-MBJRfiQFAilqiVjNZLzAJKg7vLYt2lZ3H1MJVr5uDbsZecFCIApQbCOEUi5IsMW8AVdagIy28z2f6sf5INW0kHhtxRo-mT_eiqAHdUe2Jn97NDWb6JuQTvD_LgqmGo6b1uGAUAlpkPE3z5U3L6jAVxQX3MTDG1O3AFD5wkpl8Nk"
                />
              </div>
              <div>
                <p className="font-bold text-on-surface">Aaron Miller</p>
                <p className="text-xs text-slate-500">amiller_92@gmail.com</p>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full border border-outline-variant/30">
                Patient
              </span>
            </div>
            <div className="text-sm font-medium text-on-surface-variant">
              Nov 05, 2023
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                Active
              </span>
            </div>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Reset Password"
              >
                <span className="material-symbols-outlined text-lg">
                  lock_reset
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Change Role"
              >
                <span className="material-symbols-outlined text-lg">
                  edit_note
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                title="Deactivate"
              >
                <span className="material-symbols-outlined text-lg">
                  person_off
                </span>
              </button>
            </div>
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all group">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 grayscale">
                <img
                  alt="Sarah Kaine"
                  className="w-full h-full object-cover"
                  data-alt="senior woman portrait with grey hair and soft features, clinical patient record photo, natural daylight"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmQXYgHki5jZwEl2lDfhVTFJycxWFoDN6kxomhenUQc7OrcAQef3b4X-05TpA4wODrZogDYO9cURrmZ8nMHLBNZ4NPJDU-wSgKsQpzuEAE6ZSYyp6cBEWqVBY5_kau9mIKiTT10h7tqGSfnglQ2gwOlIpP19xvYLXWrtsRb0r_FPJqn9NKyu3LRk_O5Si7nrQa2pbeH-_5TpruR5XYB30-29FmnFZgdhnP_bNWciuzMKJdDt8sSBwF5Ns0QPH92c5tpcbTKWHboZE"
                />
              </div>
              <div>
                <p className="font-bold text-on-surface opacity-60">
                  Sarah Kaine
                </p>
                <p className="text-xs text-slate-400">
                  skaine.legacy@outlook.com
                </p>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 bg-surface-container-highest/50 text-on-surface/50 text-[11px] font-bold rounded-full border border-outline-variant/10">
                Patient
              </span>
            </div>
            <div className="text-sm font-medium text-on-surface-variant opacity-60">
              Aug 22, 2023
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 text-[11px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />{" "}
                Inactive
              </span>
            </div>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Activate Account"
              >
                <span className="material-symbols-outlined text-lg">
                  how_to_reg
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                title="Delete Records"
              >
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </button>
            </div>
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright transition-all group">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed flex-shrink-0">
                <img
                  alt="Marcus Bennett"
                  className="w-full h-full object-cover"
                  data-alt="young professional doctor with dark skin, wearing surgical scrubs, smiling slightly, high-end medical headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm2JDIOYAy6FXOf4LWBIDQK7XmZmC1YXODsuO-uo9zXfUVIv_A2DdfmfVemk0EA9wjZzyI3wQ9Xj2WUR7YjQPzMV8YIWGdLNGWRV5xLo6BM5LG4xkNeRY5m8qt03oni7nXzqlwWdrv8bWUDb8UbA_w4i5IL1cXF5qrddbUbh0bDqcLwRnkr5Qee89wmwTHaL4vVwXu8Zl9jJbNDCQyneMvEg4x24D_LPKpUPvOVReKqNu7uMGVghxwV_ja7zIWjUFCIqwN6R1ngc0"
                />
              </div>
              <div>
                <p className="font-bold text-on-surface">Dr. Marcus Bennett</p>
                <p className="text-xs text-slate-500">
                  m.bennett@medreserve.io
                </p>
              </div>
            </div>
            <div>
              <span className="px-3 py-1 bg-secondary-container/30 text-on-secondary-container text-[11px] font-bold rounded-full border border-secondary-container/50">
                Doctor
              </span>
            </div>
            <div className="text-sm font-medium text-on-surface-variant">
              Jan 18, 2024
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                Active
              </span>
            </div>
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Reset Password"
              >
                <span className="material-symbols-outlined text-lg">
                  lock_reset
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-fixed/30 rounded-lg transition-colors"
                title="Change Role"
              >
                <span className="material-symbols-outlined text-lg">
                  edit_note
                </span>
              </button>
              <button
                className="p-2 text-slate-400 hover:text-error hover:bg-error-container/30 rounded-lg transition-colors"
                title="Deactivate"
              >
                <span className="material-symbols-outlined text-lg">
                  person_off
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Pagination (Editorial Rhythm) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500">
            Showing 1 to 4 of 1,284 results
          </p>
          <div className="flex gap-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              disabled=""
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-sm">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  {/* Floating Action Button (Task Focused Suppression: Not suppressed here as it fits the Admin Dashboard) */}
  <div className="fixed bottom-8 right-8 z-50">
    <button className="w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group">
      <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">
        add
      </span>
    </button>
  </div>
</>
    );
}