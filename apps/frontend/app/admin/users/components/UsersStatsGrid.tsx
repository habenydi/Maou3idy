export default function UsersStatsGrid() {
  return (
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
  );
}