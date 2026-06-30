export default function AppointmentTrends() {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-xl font-bold font-manrope">
            Appointment Trends
          </h3>

          <p className="text-xs text-slate-500">
            Overview of patient visits per month
          </p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-bold bg-surface-container rounded-md">
            Weekly
          </button>

          <button className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-md">
            Monthly
          </button>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 px-2">
        {['MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT'].map(
          (month, index) => (
            <div
              key={month}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div
                className={`w-12 ${
                  index === 2
                    ? 'bg-primary/80 h-56'
                    : index === 5
                    ? 'bg-slate-200 h-52'
                    : 'bg-slate-100 h-32'
                } rounded-t-lg group-hover:bg-primary/20 transition-all relative`}
              >
                {index === 2 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded">
                    124
                  </div>
                )}
              </div>

              <span
                className={`text-[10px] font-bold ${
                  index === 2
                    ? 'text-primary'
                    : 'text-slate-400'
                }`}
              >
                {month}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}