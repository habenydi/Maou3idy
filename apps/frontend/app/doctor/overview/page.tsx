function DoctorOverview() {
    return (
        <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>MedReserve Admin Dashboard</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n        .glass-panel {\n            background: rgba(255, 255, 255, 0.8);\n            backdrop-filter: blur(12px);\n            -webkit-backdrop-filter: blur(12px);\n        }\n    "
    }}
  />
  {/* SideNavBar (Shared Component) */}
  <aside className="flex flex-col h-screen p-4 gap-2 h-full w-64 fixed left-0 top-0 border-r-0 bg-slate-50 z-50">
    <div className="flex items-center gap-3 px-2 mb-8">
      <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
        <span
          className="material-symbols-outlined"
          data-icon="medical_services"
        >
          medical_services
        </span>
      </div>
      <div>
        <div className="font-['Manrope'] font-bold text-xl text-slate-900">
          MedReserve
        </div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          Clinical Admin
        </div>
      </div>
    </div>
    <nav className="flex-1 space-y-1">
      <a
        className="flex items-center gap-3 px-3 py-2.5 transition-all scale-95 active:scale-90 font-['Inter'] font-semibold text-sm bg-white  text-blue-600  rounded-lg shadow-sm"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        Dashboard
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2.5 transition-all scale-95 active:scale-90 font-['Inter'] font-medium text-sm text-slate-500  hover:text-slate-900 hover:bg-slate-200/50  transition-colors"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="group">
          group
        </span>
        Users
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2.5 transition-all scale-95 active:scale-90 font-['Inter'] font-medium text-sm text-slate-500  hover:text-slate-900 hover:bg-slate-200/50  transition-colors"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="description">
          description
        </span>
        Applications
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2.5 transition-all scale-95 active:scale-90 font-['Inter'] font-medium text-sm text-slate-500  hover:text-slate-900 hover:bg-slate-200/50  transition-colors"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="category">
          category
        </span>
        Categories
      </a>
    </nav>
    <div className="mt-auto p-4 bg-slate-100 rounded-xl">
      <div className="flex items-center gap-3">
        <img
          alt="Medical Clinic Logo"
          className="w-10 h-10 rounded-lg object-cover"
          data-alt="Professional headshot of a senior clinical director in a modern medical office setting, high-end photography"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD81svyPA2q1S6VVGoKBKruqUMi6WgQIiCSP3YLFig9fRlJQn29pFZhMJhTYlpxvvHesozL1kyJoPO4u3SWXwOtyWtYCESYQehlKpV1jAS-5_nzkTAzW5eH_hbEK9DFYwdykj-FfPEZ-yGumnZbNu-rlPk_6Pi-mCts7MQnoRf4apUKMOxN8XTKxiGGQx1eCTuIJrafp2jnJfH8duLsvx-6krhTaRhLUb7uqsUS_t5YNvu8l79KuRTD2lu41b_mR884Rtty65RT_s"
        />
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-slate-900 truncate">
            Dr. Smith
          </p>
          <p className="text-[10px] text-slate-500 truncate">Senior Admin</p>
        </div>
      </div>
    </div>
  </aside>
  {/* TopAppBar (Shared Component) */}
  <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 flex justify-between items-center px-8 bg-white/80  backdrop-blur-xl border-b border-slate-100 shadow-sm">
    <div className="flex items-center gap-6">
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          search
        </span>
        <input
          className="pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all"
          placeholder="Search clinical records..."
          type="text"
        />
      </div>
    </div>
    <div className="flex items-center gap-8">
      <nav className="hidden md:flex gap-6">
        <a
          className="font-['Manrope'] font-semibold text-base text-slate-500  hover:text-blue-500  transition-all opacity-80 hover:opacity-100"
          href="#"
        >
          Schedules
        </a>
        <a
          className="font-['Manrope'] font-semibold text-base text-slate-500  hover:text-blue-500  transition-all opacity-80 hover:opacity-100"
          href="#"
        >
          Patients
        </a>
        <a
          className="font-['Manrope'] font-semibold text-base text-slate-500  hover:text-blue-500  transition-all opacity-80 hover:opacity-100"
          href="#"
        >
          Analytics
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all">
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
        </button>
      </div>
    </div>
  </header>
  {/* Main Content */}
  <main className="ml-64 pt-24 p-8 min-h-screen">
    {/* Dashboard Header */}
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">
        Clinical Dashboard
      </h1>
      <p className="text-on-surface-variant font-medium">
        Overview of MedReserve ecosystem health and practitioner activity.
      </p>
    </div>
    {/* Bento Grid Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Metric 1 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-fixed-variant"
              data-icon="person"
            >
              person
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">
            +12%
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Total Users
          </p>
          <p className="text-3xl font-extrabold text-on-surface">12,450</p>
        </div>
      </div>
      {/* Metric 2 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-secondary-fixed-variant"
              data-icon="medical_information"
            >
              medical_information
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-secondary/10 text-secondary rounded-full">
            Active
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Total Doctors
          </p>
          <p className="text-3xl font-extrabold text-on-surface">842</p>
        </div>
      </div>
      {/* Metric 3 */}
      <div className="p-6 rounded-xl bg-tertiary-fixed flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
            <span
              className="material-symbols-outlined text-white"
              data-icon="pending_actions"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              pending_actions
            </span>
          </div>
          <span className="text-xs font-bold px-2 py-1 bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant rounded-full">
            Urgent
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-tertiary-fixed-variant uppercase tracking-widest mb-1">
            Pending Applications
          </p>
          <p className="text-3xl font-extrabold text-on-tertiary-fixed">15</p>
        </div>
      </div>
      {/* Metric 4 */}
      <div className="p-6 rounded-xl bg-surface-container-lowest border-none transition-all hover:bg-surface-bright flex flex-col justify-between h-40">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-green-700"
              data-icon="trending_up"
            >
              trending_up
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Monthly Growth
          </p>
          <p className="text-3xl font-extrabold text-on-surface">+8%</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Registration Trends Chart (Asymmetric larger span) */}
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
      {/* Recent Activity List */}
      <div className="p-8 rounded-xl bg-surface-container-lowest">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
          <button className="text-primary text-xs font-bold hover:underline">
            View All
          </button>
        </div>
        <div className="space-y-6">
          {/* Activity Item 1 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                data-alt="Close-up portrait of a female doctor in a white coat with a stethoscope around her neck"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmvwIVbqciF1q1vP8ev2UyQwitEyRBm2jmRPlfgL_tnK7fjSFCgHuU_j72T_LTNhg4dqMhlXWXffYF-QvtIok8CajfBw1srtqcFhrgF7HjoBWVF6hRqnbdqr3n_HffHYg0Rm9psJgrnRKUa7N-NgZxt2NjQ5ekKn0IlPbIM0Nde4EMa4AW_5dJ1uK-5P3ct4slnvw-pphq5ectk8alzXR6M1PLe-ZxUjFSetRBrj1GHf1hAMT2A3BbsgAmxo7S2zVlnR4aZjB35iI"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Dr. Elena Rodriguez
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                Approved for Cardiology Dept.
              </p>
              <span className="text-[10px] text-outline font-medium">
                2 mins ago
              </span>
            </div>
          </div>
          {/* Activity Item 2 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-white text-lg"
                data-icon="assignment_late"
              >
                assignment_late
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                System Alert
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                New medical license verification pending for Dr. Aris Thorne.
              </p>
              <span className="text-[10px] text-outline font-medium">
                45 mins ago
              </span>
            </div>
          </div>
          {/* Activity Item 3 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                data-alt="Professional headshot of a diverse male doctor smiling warmly in a clinical hallway"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGhJRP_U3FeuGZ4z8Phn3za6Isft4_syIdPoQVvMUSpXuq2SyzPE-zdGx56m0cWq08dyY4bixz--l3p7kkPf5_VUaMa7sFCTOL9DY0rPqRswDxcNdpfeyzIfmacd7l35NehoumY78iJE1LzugoE-i-IC5mx8FaQ6LwzhuxiVERBbtNGm0lPbFBfPt54t4AgsPg2mcWE7mQC_JTUP7FywbY2KAiEvqiDEQcnCLbJSoKHqmk8vKGXor5Emy3rZ3Osd1dv9iZ-phUHoI"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Dr. Marcus Chen
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                Updated schedule for July 2024.
              </p>
              <span className="text-[10px] text-outline font-medium">
                3 hours ago
              </span>
            </div>
          </div>
          {/* Activity Item 4 */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
              <span
                className="material-symbols-outlined text-on-primary-fixed-variant text-lg"
                data-icon="person_add"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                person_add
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">
                New Registration
              </p>
              <p className="text-xs text-on-surface-variant mb-1">
                5 new patient accounts created in the last hour.
              </p>
              <span className="text-[10px] text-outline font-medium">
                1 hour ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Clinical Pulse Cards (Specialty Component) */}
    <div className="mt-12">
      <h3 className="text-xl font-bold text-on-surface mb-6">
        Real-time Platform Pulse
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-primary-fixed-dim border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-primary-fixed uppercase tracking-widest mb-4">
              API Response Time
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-primary-fixed">
                124
              </span>
              <span className="text-xs font-bold text-on-primary-fixed/60">
                ms
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="bolt"
            >
              bolt
            </span>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-high border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">
              Active Sessions
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-surface">
                1.2k
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                Live
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="sensor_occupied"
            >
              sensor_occupied
            </span>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-surface-container-highest border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">
              Server Uptime
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-on-surface">
                99.9
              </span>
              <span className="text-xs font-bold text-on-surface-variant">
                %
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <span
              className="material-symbols-outlined text-[120px]"
              data-icon="cloud_done"
            >
              cloud_done
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</>
    );
}

export default DoctorOverview;