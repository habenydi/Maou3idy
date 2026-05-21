'use client';

import React from 'react';

const Schedule = () => {
  const calendarGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px repeat(7, 1fr)',
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-hidden">
      {/* ...existing code... */}
      <aside className="w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex flex-col h-screen p-4 gap-2 z-50">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg">
            <span className="material-symbols-outlined">clinical_notes</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl text-slate-900 leading-none">MedReserve</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">Clinical Admin</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Inter'] font-medium text-sm">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-sm group" href="#">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-['Inter'] font-medium text-sm">Schedules</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="font-['Inter'] font-medium text-sm">Patients</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group" href="#">
            <span className="material-symbols-outlined">bio</span>
            <span className="font-['Inter'] font-medium text-sm">Applications</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group" href="#">
            <span className="material-symbols-outlined">category</span>
            <span className="font-['Inter'] font-medium text-sm">Categories</span>
          </a>
        </nav>
        <div className="mt-auto p-2 bg-slate-100 rounded-xl flex items-center gap-3">
          <img alt="Dr. Smith Profile" className="w-10 h-10 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgHhnNCLsCZO3QnKR2gzmInjDYMvtZug9OkfZ_b_Ymx9tIjN_HYLCxIL0abCUE50HHsoCJVC4cMEjbCOOUxkUbtOz3hr7v4gE_Uib6XpsE-p54H7DVEybAks_-5zX4ybodESuqYI6WohJ2qYXOTN1lGa5efIAqWmvsT7z8oTvj3NRaQ4Xsw47fG2obhMzdbUQk8U7hHm5G6vjhVa4CGXykchpGOlnBjCKH1Ablt4tnPRjzZQ9Nhf9Qo4VJHquRYAQTZeNiekn9pE" />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">Dr. Sarah Smith</p>
            <p className="text-[10px] text-slate-500 truncate">Cardiologist</p>
          </div>
          <button className="ml-auto text-slate-400 hover:text-slate-900">
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 min-h-screen flex flex-col">
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm flex justify-between items-center px-8">
          <div className="flex items-center gap-8">
            <h2 className="font-headline font-extrabold text-blue-700 text-lg">Schedule &amp; Slot Management</h2>
            <nav className="hidden lg:flex items-center gap-6">
              <a className="text-blue-600 border-b-2 border-blue-600 pb-1 font-headline font-semibold text-base transition-all" href="#">Weekly View</a>
              <a className="text-slate-500 hover:text-blue-500 font-headline font-semibold text-base transition-all" href="#">List View</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        <section className="mt-16 p-8 flex-1 flex flex-col gap-8 bg-surface overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <h3 className="font-headline font-bold text-2xl text-on-surface">Oct 23 - Oct 29, 2023</h3>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded-xl font-medium text-sm flex items-center gap-2 transition-all hover:bg-surface-dim">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Auto-generate Slots
              </button>
              <button className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                <span className="material-symbols-outlined text-lg">add</span>
                Add Slot
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-4xl p-6 shadow-sm flex-1 flex flex-col min-h-150">
            <div className="mb-6 border-b border-surface-container pb-4" style={calendarGridStyle}>
              <div className="flex items-center justify-center font-label text-xs font-bold text-outline uppercase">Time</div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-outline uppercase">Mon</span>
                <span className="text-xl font-headline font-extrabold">23</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-outline uppercase">Tue</span>
                <span className="text-xl font-headline font-extrabold text-primary">24</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-outline uppercase">Wed</span>
                <span className="text-xl font-headline font-extrabold">25</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-outline uppercase">Thu</span>
                <span className="text-xl font-headline font-extrabold">26</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-outline uppercase">Fri</span>
                <span className="text-xl font-headline font-extrabold">27</span>
              </div>
              <div className="flex flex-col items-center opacity-40">
                <span className="text-xs font-bold text-outline uppercase">Sat</span>
                <span className="text-xl font-headline font-extrabold">28</span>
              </div>
              <div className="flex flex-col items-center opacity-40">
                <span className="text-xs font-bold text-outline uppercase">Sun</span>
                <span className="text-xl font-headline font-extrabold">29</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 relative">
              <div className="absolute w-full top-45 z-20 pointer-events-none">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary -ml-1"></div>
                  <div className="flex-1 h-px bg-primary opacity-30"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="min-h-20" style={calendarGridStyle}>
                  <div className="text-xs font-bold text-outline flex items-start justify-center pt-1">09:00 AM</div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">John Doe</p>
                      <p className="text-[10px] text-outline truncate">Follow-up</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary">add</span>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Alice Wang</p>
                      <p className="text-[10px] text-outline truncate">Consultation</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary">add</span>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Robert Chen</p>
                      <p className="text-[10px] text-outline truncate">Checkup</p>
                    </div>
                  </div>
                  <div className="px-1"></div>
                  <div className="px-1"></div>
                </div>

                <div className="min-h-20" style={calendarGridStyle}>
                  <div className="text-xs font-bold text-outline flex items-start justify-center pt-1">10:00 AM</div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">30m Slot</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Mike Tyson</p>
                      <p className="text-[10px] text-outline truncate">Physiology</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">1h Slot</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Sarah Jenkins</p>
                      <p className="text-[10px] text-outline truncate">Cardio Test</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary">add</span>
                    </div>
                  </div>
                  <div className="px-1"></div>
                  <div className="px-1"></div>
                </div>

                <div className="min-h-20" style={calendarGridStyle}>
                  <div className="text-xs font-bold text-outline flex items-start justify-center pt-1">11:00 AM</div>
                  <div className="px-1 col-span-3">
                    <div className="bg-surface-container-high border-l-4 border-outline p-3 rounded-xl h-full flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline">block</span>
                      <div>
                        <p className="text-xs font-bold text-on-surface">Hospital Rounds</p>
                        <p className="text-[10px] text-outline">Busy until 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">1h Slot</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Peter Parker</p>
                      <p className="text-[10px] text-outline truncate">Routine</p>
                    </div>
                  </div>
                  <div className="px-1"></div>
                  <div className="px-1"></div>
                </div>

                <div className="min-h-20" style={calendarGridStyle}>
                  <div className="text-xs font-bold text-outline flex items-start justify-center pt-1">12:00 PM</div>
                  <div className="px-1 col-span-5 bg-surface-container-low rounded-xl flex items-center justify-center border-y border-surface-container-high border-dashed">
                    <span className="text-xs font-bold text-outline uppercase tracking-widest flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">restaurant</span>
                      Lunch Break
                    </span>
                  </div>
                  <div className="px-1"></div>
                  <div className="px-1"></div>
                </div>

                <div className="min-h-20" style={calendarGridStyle}>
                  <div className="text-xs font-bold text-outline flex items-start justify-center pt-1">01:00 PM</div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">1h Slot</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">30m Slot</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary">add</span>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-primary uppercase">Booked</span>
                      <p className="text-xs font-bold text-on-surface truncate">Gwen Stacy</p>
                      <p className="text-[10px] text-outline truncate">New Patient</p>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
                      <p className="text-xs font-bold text-on-surface">1h Slot</p>
                    </div>
                  </div>
                  <div className="px-1"></div>
                  <div className="px-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-surface-container-low p-6 rounded-3xl flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h4 className="font-headline font-bold text-lg">Auto-generation Settings</h4>
                <button className="text-primary font-bold text-sm">Reset to Default</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase px-1">Slot Duration</label>
                  <select className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm" defaultValue="30 Minutes">
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>45 Minutes</option>
                    <option>1 Hour</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase px-1">Buffer Time</label>
                  <select className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm" defaultValue="5 Minutes">
                    <option>No Buffer</option>
                    <option>5 Minutes</option>
                    <option>10 Minutes</option>
                    <option>15 Minutes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase px-1">Start Hour</label>
                  <input className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm" type="time" defaultValue="09:00" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase px-1">End Hour</label>
                  <input className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary shadow-sm" type="time" defaultValue="17:00" />
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col justify-between">
              <div>
                <h4 className="font-headline font-bold text-lg text-primary mb-2">Weekly Summary</h4>
                <p className="text-sm text-outline mb-6 leading-relaxed">
                  Your current availability is set to 32 hours per week. You have filled 88% of your core cardiological slots.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Efficiency</span>
                    <span className="text-sm font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 bg-primary-fixed rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <button className="mt-8 w-full py-3 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-all">
                <span className="material-symbols-outlined text-lg">analytics</span>
                View Detailed Insights
              </button>
            </div>
          </div>
        </section>
      </main>

      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
      </button>
      <div className="hidden fixed inset-0 z-100 flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"></div>
        <div className="relative glass-panel w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-white/20">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">New Appointment Slot</span>
              <h5 className="font-headline font-extrabold text-2xl mt-1">Configure Slot</h5>
            </div>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="space-y-6">
            {/* ...existing code... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;