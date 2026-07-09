export default function UsersPagination() {
  return (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500">
            Showing 1 to 4 of 1,284 results
          </p>
          <div className="flex gap-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
              
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
  );
}