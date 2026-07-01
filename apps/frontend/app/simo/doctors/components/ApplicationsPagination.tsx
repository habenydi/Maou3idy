export default function ApplicationsPagination() {
  return (
    <div className="mt-8 flex items-center justify-between px-4">
      <div className="text-sm text-on-surface-variant font-medium">
        Showing <span className="font-bold">3</span> of{' '}
        <span className="font-bold">24</span> applications
      </div>

      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-surface-container-low">
          <span className="material-symbols-outlined">
            chevron_left
          </span>
        </button>

        <button className="w-10 h-10 rounded-xl bg-primary text-on-primary">
          1
        </button>

        <button className="w-10 h-10 rounded-xl">
          2
        </button>

        <button className="w-10 h-10 rounded-xl">
          3
        </button>

        <button className="w-10 h-10 rounded-xl bg-surface-container-low">
          <span className="material-symbols-outlined">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}