
export default function UserRegistrationTrends() {
    return (<>
          <div className="lg:col-span-2 p-8 rounded-xl bg-surface-container-low">
            <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-on-surface">
              User Registration Trends
            </h3>
            <p className="text-sm text-on-surface-variant">
              Last 6 months performance analysis
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface-variant shadow-sm">
              Monthly
            </button>
            <button className="px-4 py-1.5 hover:bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface-variant transition-all">
              Weekly
            </button>
          </div>
        </div>
        {/* Custom Bar Chart UI */}
        <div className="flex items-end justify-between h-64 px-4 gap-4">
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary-fixed-dim rounded-t-xl group-hover:bg-primary transition-all duration-500"
              style={{ height: "40%" }}
            />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              Jan
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary-fixed-dim rounded-t-xl group-hover:bg-primary transition-all duration-500"
              style={{ height: "65%" }}
            />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              Feb
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary-fixed-dim rounded-t-xl group-hover:bg-primary transition-all duration-500"
              style={{ height: "55%" }}
            />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              Mar
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary-fixed-dim rounded-t-xl group-hover:bg-primary transition-all duration-500"
              style={{ height: "85%" }}
            />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              Apr
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary-fixed-dim rounded-t-xl group-hover:bg-primary transition-all duration-500"
              style={{ height: "70%" }}
            />
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">
              May
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-4 group">
            <div
              className="w-full bg-primary rounded-t-xl shadow-lg shadow-primary/20"
              style={{ height: "95%" }}
            />
            <span className="text-[10px] font-bold text-on-surface uppercase">
              Jun
            </span>
          </div>
        </div>
      </div>
    </>);
}