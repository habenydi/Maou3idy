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
        <button className="px-6 py-3 bg-surface-container-highest text-on-surface rounded-xl font-semibold text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">
            filter_list
          </span>
          Filters
        </button>

        <button
          onClick={onAddUser}
          className="px-6 py-3 bg-linear-to-r from-primary to-primary-container text-on-primary rounded-xl font-semibold text-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">
            person_add
          </span>
          Add New User
        </button>
      </div>
    </div>
  );
}