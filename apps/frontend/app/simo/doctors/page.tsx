import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardPage() {
    return (
        <>
  {/* SideNavBar Component */}
  <AdminSidebar activePage="doctors" />
  {/* TopAppBar Component */}
  <AdminHeader />
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