interface UsersPageHeaderProps {
  onAddUser?: () => void;
}

export default function UsersPageHeader({
  onAddUser,
}: UsersPageHeaderProps) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-1">
          Users Management
        </h1>

        <p className="text-on-surface-variant font-medium">
          Oversee and manage system access for clinical personnel and patients.
        </p>
      </div>

      <div className="flex gap-3">
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
        <button className="px-6 py-3 bg-primary text-on-primary rounded-xl font-semibold text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">
            filter_list
          </span>
          Filters
        </button>
      </div>
    </div>
  );
}