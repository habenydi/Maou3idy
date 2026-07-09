export default function ApplicationFilters() {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-surface-container-low rounded-2xl">
      <button className="px-6 py-2 rounded-xl text-sm font-semibold bg-surface-container-lowest text-primary shadow-sm">
        All
      </button>

      <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface">
        Pending
      </button>

      <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface">
        Approved
      </button>

      <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface">
        Rejected
      </button>
    </div>
  );
}