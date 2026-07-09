'use client';

export default function AdminHeader() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 flex justify-between items-center px-8 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search clinical records..."
            className="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all outline-none"
          />
        </div>
      </div>

      {/* Navigation + Actions */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
            <span className="material-symbols-outlined">
              settings
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}