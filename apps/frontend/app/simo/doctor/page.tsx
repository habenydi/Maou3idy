export default function DashboardPage() {
    return (
        <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
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
        "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n            display: inline-block;\n            vertical-align: middle;\n        }\n        .no-scrollbar::-webkit-scrollbar { display: none; }\n        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }\n    "
    }}
  />
  {/* SideNavBar Component */}
  <aside className="h-full w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex flex-col h-screen p-4 gap-2 z-50">
    <div className="flex items-center gap-3 px-2 mb-8">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
        <span
          className="material-symbols-outlined"
          data-icon="medical_services"
        >
          medical_services
        </span>
      </div>
      <div>
        <h1 className="font-['Manrope'] font-bold text-xl text-slate-90">
          MedReserve
        </h1>
        <p className="text-xs text-slate-500 font-medium">Clinical Admin</p>
      </div>
    </div>
    <nav className="flex flex-col gap-1">
      <a
        className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg font-['Inter'] font-medium text-sm transition-transform scale-95 active:scale-90"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="dashboard">
          dashboard
        </span>
        <span>Dashboard</span>
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg font-['Inter'] font-medium text-sm transition-transform scale-95 active:scale-90"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="group">
          group
        </span>
        <span>Users</span>
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-sm font-['Inter'] font-medium text-sm transition-transform scale-95 active:scale-90"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="description">
          description
        </span>
        <span>Applications</span>
      </a>
      <a
        className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900  hover:bg-slate-200/50 transition-colors rounded-lg font-['Inter'] font-medium text-sm transition-transform scale-95 active:scale-90"
        href="#"
      >
        <span className="material-symbols-outlined" data-icon="category">
          category
        </span>
        <span>Categories</span>
      </a>
    </nav>
    <div className="mt-auto p-4 bg-slate-100 rounded-xl">
      <div className="flex items-center gap-3">
        <img
          alt="Medical Clinic Logo"
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          data-alt="professional portrait of a senior male physician with graying hair and a confident, kind smile wearing a white medical coat"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIGf0QNjodU9byklOjRr39GomriDuYrNJfgF1cxlNieJ8FcyhHM_LOepSYI-NRiSySH8IjLDJB0Czgpo6B3LwPzo24Jq1vA8TDXYmrYTbYolrei97hxYjjJLNLaJFLZP9cw7tbRoCidAcnlWxWODEQXgptZHQcKNDNIn0yZO95NdZZvwYWXg-b8qPSK8_R_4qKju0aZDa3gcoxE-wEn99t5lgfBVytzMVTBa82ior1MQP1Ar7qaJgmWXptFTGwM8QzpiM6COPS3yQ"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate text-slate-900">
            Dr. Smith
          </p>
          <p className="text-xs text-slate-500 truncate">
            Chief Medical Officer
          </p>
        </div>
      </div>
    </div>
  </aside>
  {/* TopAppBar Component */}
  <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-white/80  backdrop-blur-xl border-b border-slate-100 shadow-sm  flex justify-between items-center px-8">
    <div className="flex items-center flex-1 max-w-md">
      <div className="relative w-full">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          data-icon="search"
        >
          search
        </span>
        <input
          className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-xl text-sm border-none focus:ring-2 focus:ring-primary/20 transition-all"
          placeholder="Search applications..."
          type="text"
        />
      </div>
    </div>
    <nav className="hidden md:flex items-center gap-8 px-8">
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
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-high transition-colors text-slate-600">
        <span className="material-symbols-outlined" data-icon="notifications">
          notifications
        </span>
      </button>
      <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-high transition-colors text-slate-600">
        <span className="material-symbols-outlined" data-icon="settings">
          settings
        </span>
      </button>
    </div>
  </header>
  {/* Main Content Canvas */}
  <main className="ml-64 pt-24 p-8 min-h-screen bg-surface">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">
          Doctor Applications
        </h2>
        <p className="text-on-surface-variant font-body">
          Review and manage credentialing for new medical practitioners.
        </p>
      </div>
      <div className="flex items-center gap-2 p-1.5 bg-surface-container-low rounded-2xl">
        <button className="px-6 py-2 rounded-xl text-sm font-semibold bg-surface-container-lowest text-primary shadow-sm">
          All
        </button>
        <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          Pending
        </button>
        <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          Approved
        </button>
        <button className="px-6 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
          Rejected
        </button>
      </div>
    </div>
    {/* Bento Table Container */}
    <div className="bg-surface-container-low rounded-3xl p-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2 px-3">
          <thead>
            <tr className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
              <th className="px-6 py-4">Practitioner Name</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Date Applied</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action Cluster</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {/* Application Row 1 */}
            <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group cursor-default">
              <td className="px-6 py-5 rounded-l-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-high">
                    <img
                      alt="Dr. Julianne White"
                      className="w-full h-full object-cover"
                      data-alt="close-up portrait of a young professional female doctor with glasses and a warm expression in a modern clinic setting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBjDWk6NjxRZQjErGRFTKvSiKzuD4XKP31oD0QgnHFCPBxoEc3oN-Y7Iuo04ebt4OVipN5BD1MBFuqGanpv7ITYMNdmUgF5rtR101vbNfQqdYCXv7ESXrMFQQC77I0SMI62gZcl4tZPbIeXrxHNudVnxZ39qEz_EZ_wJrwkK5QXI8UnGHsRLi-Ep_ibUNy_iZKGGWxDtBCXcxo0UWem8EOpm6MnhE_7tIqEQmY7bHF-dao-ynWD8r_86ACUKqyILh_wyv2XCmcC_g"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-base">
                      Dr. Julianne White
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      julianne.w@medclinic.com
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="inline-flex items-center px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
                  Neurosurgeon
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">
                Oct 12, 2023
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1.5 bg-tertiary-container/10 text-tertiary font-bold text-xs rounded-lg flex items-center gap-2 w-fit">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  Pending
                </span>
              </td>
              <td className="px-6 py-5 rounded-r-2xl text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-green-600 transition-colors hover:bg-green-50 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="check_circle"
                    >
                      check_circle
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors hover:bg-error/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="cancel"
                    >
                      cancel
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Application Row 2 */}
            <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group cursor-default">
              <td className="px-6 py-5 rounded-l-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-high">
                    <img
                      alt="Dr. Marcus Low"
                      className="w-full h-full object-cover"
                      data-alt="professional male doctor in his 40s with short hair wearing a stethoscope around his neck in a bright studio lighting"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKWH_eLit2VkCepAL3yJxt8xLWZABy5Q7zWTS13KSOtTXotL9JEmhs7KoQWUBLYHUFvybvbLC7zzL1WgrAl9YIFZF-XMEU3rfCBpYnNYg3DsBrMZ-1trBIdR-xHaaO6CAfqe3o-FFt8d9AE9ozc2mAfiUpTYUmr8UbpNXe7rrgvDq2KxPQgn661pP7RetbuozagpUOdaE4wsOj113GmuS70ESHahXULkjtGEqcMiXXnx43bxZR-0H6-h8mBleX0OvtzFV8lbCmSQs"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-base">
                      Dr. Marcus Low
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      m.low@university.edu
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="inline-flex items-center px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
                  Pediatrics
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">
                Oct 11, 2023
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1.5 bg-tertiary-container/10 text-tertiary font-bold text-xs rounded-lg flex items-center gap-2 w-fit">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  Pending
                </span>
              </td>
              <td className="px-6 py-5 rounded-r-2xl text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-green-600 transition-colors hover:bg-green-50 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="check_circle"
                    >
                      check_circle
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors hover:bg-error/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="cancel"
                    >
                      cancel
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Application Row 3 */}
            <tr className="bg-surface-container-lowest hover:bg-surface-bright transition-colors group cursor-default">
              <td className="px-6 py-5 rounded-l-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-high">
                    <img
                      alt="Dr. Elena Soros"
                      className="w-full h-full object-cover"
                      data-alt="modern clinical headshot of a middle-aged female doctor with silver hair and a professional black suit"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeBxw_iils1TMOk7w05uKeNEuNb91eGJZaESLgBGHOAXBLLtx0ei_PFDnR_mCwqJdhc7qTNUDTySso3GMeKhA4baxu_WuMfqGt95DVpuWFuaquVbE7g1IoRu3qufEBqilh1NxrJUUdtHo2KmK-3Ajp7OEMsVGGxPTXRLL5vrtan4csH-1jH-r2INwREr1FSbUavrub1rS6lgelsP9UMrYsGVCnGATUMpv8XjySG_cOC3y-N9O4X3xZstEPKCZF3fshb0mn9yH5KRI"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-on-surface text-base">
                      Dr. Elena Soros
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      soros.md@globalcare.org
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="inline-flex items-center px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-bold">
                  Cardiology
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-on-surface-variant">
                Oct 09, 2023
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1.5 bg-tertiary-container/10 text-tertiary font-bold text-xs rounded-lg flex items-center gap-2 w-fit">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  Pending
                </span>
              </td>
              <td className="px-6 py-5 rounded-r-2xl text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-primary/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-green-600 transition-colors hover:bg-green-50 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="check_circle"
                    >
                      check_circle
                    </span>
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors hover:bg-error/5 rounded-xl">
                    <span
                      className="material-symbols-outlined"
                      data-icon="cancel"
                    >
                      cancel
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {/* Empty State Hint or Pagination */}
    <div className="mt-8 flex items-center justify-between px-4">
      <div className="text-sm text-on-surface-variant font-medium">
        Showing <span className="text-on-surface font-bold">3</span> of{" "}
        <span className="text-on-surface font-bold">24</span> applications
      </div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined" data-icon="chevron_left">
            chevron_left
          </span>
        </button>
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-on-primary font-bold shadow-sm">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low text-on-surface-variant transition-colors font-medium">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container-low text-on-surface-variant transition-colors font-medium">
            3
          </button>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined" data-icon="chevron_right">
            chevron_right
          </span>
        </button>
      </div>
    </div>
    {/* Info Card: Application Summary */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 rounded-3xl bg-primary-fixed-dim/20 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary">
            <span
              className="material-symbols-outlined"
              data-icon="pending_actions"
            >
              pending_actions
            </span>
          </div>
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            New Submissions
          </span>
        </div>
        <div>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface">
            +12
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Applications received this week
          </p>
        </div>
      </div>
      <div className="p-6 rounded-3xl bg-secondary-fixed/30 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-on-secondary">
            <span className="material-symbols-outlined" data-icon="timer">
              timer
            </span>
          </div>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">
            Response Time
          </span>
        </div>
        <div>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface">
            4.2d
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Average time to initial review
          </p>
        </div>
      </div>
      <div className="p-6 rounded-3xl bg-surface-container-low flex flex-col gap-4 border border-outline-variant/10">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
            <span
              className="material-symbols-outlined"
              data-icon="verified_user"
            >
              verified_user
            </span>
          </div>
          <span className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
            Verified Rate
          </span>
        </div>
        <div>
          <h3 className="text-4xl font-headline font-extrabold text-on-surface">
            88%
          </h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Credentailing success rate
          </p>
        </div>
      </div>
    </div>
  </main>
</>
    );
}