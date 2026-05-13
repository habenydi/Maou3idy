'use client';
export default function DoctorDashboard() {
	return (
		<>
			<style jsx>{`
				/* Local theme + missing utilities (scoped to this page only) */
				.dashboard-root {
					--primary: 0 87 205;
					--secondary: 66 92 155;
					--surface-container-lowest: 255 255 255;
					--primary-fixed: 218 226 255;
					--primary-fixed-dim: 177 197 255;
					--secondary-fixed: 218 226 255;
					--on-primary-fixed-variant: 0 65 158;
					--on-tertiary-fixed: 55 14 0;
					--inverse-surface: 46 49 51;
					--on-tertiary-fixed-variant: 127 43 0;
					--inverse-primary: 177 197 255;
					--on-surface: 25 28 30;
					--tertiary-fixed: 255 219 206;
					--surface-bright: 249 249 253;
					--on-primary: 255 255 255;
					--on-error-container: 147 0 10;
					--primary-container: 13 110 253;
					--on-error: 255 255 255;
					--surface-container: 237 238 241;
					--surface-dim: 217 218 221;
					--surface-container-low: 243 243 247;
					--background: 249 249 253;
					--surface-container-highest: 226 226 230;
					--error: 186 26 26;
					--outline: 114 119 135;
					--surface: 249 249 253;
					--on-tertiary: 255 255 255;
					--outline-variant: 194 198 216;
					--on-surface-variant: 66 70 85;
					--error-container: 255 218 214;
					--on-secondary-container: 46 73 134;
					--secondary-container: 160 186 255;
					--on-primary-container: 255 255 255;
					--tertiary-container: 207 75 0;
					--inverse-on-surface: 240 240 244;
					--surface-variant: 226 226 230;
					--on-tertiary-container: 255 255 255;
					--on-primary-fixed: 0 25 70;
					--secondary-fixed-dim: 177 197 255;
					--surface-tint: 0 87 206;
					--surface-container-high: 231 232 235;
					--on-background: 25 28 30;
					--on-secondary-fixed-variant: 41 68 129;
					--on-secondary-fixed: 0 25 70;
					--on-secondary: 255 255 255;
					--tertiary-fixed-dim: 255 181 153;
					--tertiary: 166 59 0;
				}

				.material-symbols-outlined {
					font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
				}

				.calendar-grid {
					display: grid;
					grid-template-columns: 80px repeat(7, 1fr);
				}

				.schedule-scroll::-webkit-scrollbar {
					width: 6px;
				}
				.schedule-scroll::-webkit-scrollbar-track {
					background: transparent;
				}
				.schedule-scroll::-webkit-scrollbar-thumb {
					background: rgb(var(--surface-container-highest) / 1);
					border-radius: 10px;
				}

				.glass-panel {
					background: rgb(255 255 255 / 0.7);
					backdrop-filter: blur(12px);
				}

				/* Match Tailwind CDN's default rounded-xl for this page */
				.rounded-xl {
					border-radius: 0.75rem;
				}

				/* Color utilities used by the HTML (implemented locally) */
				.bg-primary {
					background-color: rgb(var(--primary) / 1);
				}
				.bg-primary-container {
					background-color: rgb(var(--primary-container) / 1);
				}
				.bg-primary-fixed {
					background-color: rgb(var(--primary-fixed) / 1);
				}
				.bg-surface {
					background-color: rgb(var(--surface) / 1);
				}
				.bg-surface-container-lowest {
					background-color: rgb(var(--surface-container-lowest) / 1);
				}
				.bg-surface-container-low {
					background-color: rgb(var(--surface-container-low) / 1);
				}
				.bg-surface-container-high {
					background-color: rgb(var(--surface-container-high) / 1);
				}
				.bg-surface-container-highest {
					background-color: rgb(var(--surface-container-highest) / 1);
				}
				.bg-surface-dim {
					background-color: rgb(var(--surface-dim) / 1);
				}
				.text-primary {
					color: rgb(var(--primary) / 1);
				}
				.text-tertiary {
					color: rgb(var(--tertiary) / 1);
				}
				.text-on-primary {
					color: rgb(var(--on-primary) / 1);
				}
				.text-on-primary-container {
					color: rgb(var(--on-primary-container) / 1);
				}
				.text-on-surface {
					color: rgb(var(--on-surface) / 1);
				}
				.text-outline {
					color: rgb(var(--outline) / 1);
				}
				.text-on-error-container {
					color: rgb(var(--on-error-container) / 1);
				}
				.border-primary {
					border-color: rgb(var(--primary) / 1);
				}
				.border-tertiary {
					border-color: rgb(var(--tertiary) / 1);
				}
				.border-outline {
					border-color: rgb(var(--outline) / 1);
				}
				.border-outline-variant {
					border-color: rgb(var(--outline-variant) / 1);
				}
				.border-surface-container {
					border-color: rgb(var(--surface-container) / 1);
				}
				.border-surface-container-high {
					border-color: rgb(var(--surface-container-high) / 1);
				}

				/* Alpha variants */
				.bg-primary\/10 {
					background-color: rgb(var(--primary) / 0.1);
				}
				.bg-primary\/5 {
					background-color: rgb(var(--primary) / 0.05);
				}
				.border-primary\/10 {
					border-color: rgb(var(--primary) / 0.1);
				}
				.bg-tertiary-container\/10 {
					background-color: rgb(var(--tertiary-container) / 0.1);
				}
				.bg-on-surface\/20 {
					background-color: rgb(var(--on-surface) / 0.2);
				}

				/* Gradient stops to support bg-linear-to-r + from/to classes */
				.from-primary {
					--tw-gradient-from: rgb(var(--primary) / 1) var(--tw-gradient-from-position);
					--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
				}
				.to-primary-container {
					--tw-gradient-to: rgb(var(--primary-container) / 1) var(--tw-gradient-to-position);
				}

				/* Variant-style classes used in the HTML */
				.hover\\:bg-surface-container-high:hover {
					background-color: rgb(var(--surface-container-high) / 1);
				}
				.hover\\:bg-surface-dim:hover {
					background-color: rgb(var(--surface-dim) / 1);
				}
				.hover\\:bg-on-primary-fixed-variant:hover {
					background-color: rgb(var(--on-primary-fixed-variant) / 1);
				}
				.focus\\:ring-primary:focus {
					--tw-ring-color: rgb(var(--primary) / 1);
				}
				.group:hover .group-hover\\:text-primary {
					color: rgb(var(--primary) / 1);
				}
				.shadow-primary\\/20 {
					--tw-shadow-color: rgb(var(--primary) / 0.2);
					--tw-shadow: var(--tw-shadow-colored);
				}
			`}</style>
			<div className="dashboard-root bg-surface text-on-surface">
			<div className="flex min-h-screen">
			<aside className="h-screen w-64 bg-slate-100 flex flex-col py-6 sticky top-0 overflow-y-auto">
			<div className="text-lg font-black font-manrope text-blue-700 px-6 mb-8">
							MedReserve
			</div>
			<div className="px-4 mb-8">
			<div className="flex items-center gap-3 p-2 bg-slate-200/5 rounded-xl">
			<img alt="Doctor Avatar" className="w-10 h-10 rounded-lg object-cover shadow-sm" data-alt="Close-up professional portrait of a male doctor in a white coat with a stethoscope around his neck, bright clinical lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYKBBaV5ZYG21Nx_ydo0TfSzVwFudglzTSOYP7LWUEg1oQp7-4UDrVJROzN2G0iOfDeyte74r4Y2TLmt47XNh7S4gXgGIAazWh3GnQrD9tMhdRaBGHw2iNW8YDk1Pvn8wjVkZ53PglJe594DCIE09jOycdic2DLIUmCBapzjlc8bxiEoxWllYk-xgQcRcGDjPNlbh-eiq8xSZ4Ci9fFxDJ3UdXC6aIy1NzxgXCK1VY4V_uh5_2vC7a3_wtXXGPMVqtNK23j7WIni4"/>
			<div className="flex flex-col">
			<span className="text-sm font-bold font-manrope text-on-surface">Dr. James Wilson</span>
			<span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Cardiologist</span>
			</div>
			</div>
			</div>
			<nav className="grow space-y-1 font-inter text-sm font-medium">
			<a className="flex items-center gap-3 bg-white  text-blue-600 shadow-sm rounded-lg mx-2 px-4 py-3 transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
			<span>Dashboard</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
			<span>Appointments</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="schedule">schedule</span>
			<span>Schedule</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="group">group</span>
			<span>Patients</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="medical_services">medical_services</span>
			<span>Services</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg transition-all duration-200 ease-in-out" href="#">
			<span className="material-symbols-outlined" data-icon="settings">settings</span>
			<span>Settings</span>
			</a>
			</nav>
			<div className="px-4 mt-4">
			<button className="w-full py-3 bg-[linear-gradient(to_right,rgb(var(--primary)),rgb(var(--primary-container)))] text-on-primary rounded-xl font-semibold shadow-md active:scale-95 transition-all text-xs">
								New Appointment
							</button>
			</div>
			<div className="mt-auto pt-6 space-y-1 font-inter text-sm font-medium">
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg" href="#">
			<span className="material-symbols-outlined" data-icon="help">help</span>
			<span>Help Center</span>
			</a>
			<a className="flex items-center gap-3 text-slate-500 px-4 py-3 mx-2 hover:bg-slate-200/50 rounded-lg" href="#">
			<span className="material-symbols-outlined" data-icon="logout">logout</span>
			<span>Logout</span>
			</a>
			</div>
			</aside>
			<main className="grow p-8 space-y-8 max-w-7xl">
			<header className="flex justify-between items-end">
			<div>
			<h1 className="text-3xl font-extrabold font-manrope tracking-tight text-on-surface">Clinic Overview</h1>
			<p className="text-slate-500 font-medium">Welcome back, Dr. Wilson. Here’s what’s happening today.</p>
			</div>
			<div className="flex items-center gap-4">
			<div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2">
			<span className="material-symbols-outlined text-primary text-lg" data-icon="calendar_month">calendar_month</span>
			<span className="text-sm font-semibold">Oct 24, 2024</span>
			</div>
			</div>
			</header>
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:bg-surface-bright group">
			<div className="flex justify-between items-start mb-4">
			<div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
			<span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
			</div>
			<span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded-full">+12%</span>
			</div>
			<div className="space-y-1">
			<span className="text-sm font-semibold text-slate-500">Total Appointments</span>
			<div className="text-3xl font-black font-manrope">1,284</div>
			</div>
			</div>
			<div className="bg-surface-container-lowest p-6 rounded-xl transition-all hover:bg-surface-bright group">
			<div className="flex justify-between items-start mb-4">
			<div className="p-2 bg-secondary/10 text-secondary rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
			<span className="material-symbols-outlined" data-icon="pending_actions">pending_actions</span>
			</div>
			<span className="text-blue-600 text-xs font-bold bg-blue-100 px-2 py-1 rounded-full">Today</span>
			</div>
			<div className="space-y-1">
			<span className="text-sm font-semibold text-slate-500">Upcoming Today</span>
			<div className="text-3xl font-black font-manrope text-primary">18</div>
			</div>
			</div>
			<div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden">
			<div className="relative z-10">
			<div className="flex justify-between items-start mb-4">
			<div className="p-2 bg-white/20 rounded-lg">
			<span className="material-symbols-outlined" data-icon="trending_up">trending_up</span>
			</div>
			</div>
			<div className="space-y-1">
			<span className="text-sm font-medium text-blue-100">Weekly Patient Growth</span>
			<div className="text-3xl font-black font-manrope">84%</div>
			</div>
			</div>
			<div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
			</div>
			</section>
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl">
			<div className="flex justify-between items-center mb-10">
			<div>
			<h3 className="text-xl font-bold font-manrope">Appointment Trends</h3>
			<p className="text-xs text-slate-500">Overview of patient visits per month</p>
			</div>
			<div className="flex gap-2">
			<button className="px-3 py-1 text-xs font-bold bg-surface-container rounded-md">Weekly</button>
			<button className="px-3 py-1 text-xs font-bold text-primary bg-primary/10 rounded-md">Monthly</button>
			</div>
			</div>
			<div className="h-64 flex items-end justify-between gap-2 px-2">
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-slate-100 h-32 rounded-t-lg group-hover:bg-primary/20 transition-all"></div>
			<span className="text-[10px] font-bold text-slate-400">MAY</span>
			</div>
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-slate-100 h-40 rounded-t-lg group-hover:bg-primary/20 transition-all"></div>
			<span className="text-[10px] font-bold text-slate-400">JUN</span>
			</div>
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-[#0D6EFD]/80 h-56 rounded-t-lg group-hover:bg-[#0D6EFD] transition-all relative">
			<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">124</div>
			</div>
			<span className="text-[10px] font-bold text-[#0D6EFD]">JUL</span>
			</div>
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-slate-100 h-36 rounded-t-lg group-hover:bg-primary/20 transition-all"></div>
			<span className="text-[10px] font-bold text-slate-400">AUG</span>
			</div>
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-slate-100 h-48 rounded-t-lg group-hover:bg-primary/20 transition-all"></div>
			<span className="text-[10px] font-bold text-slate-400">SEP</span>
			</div>
			<div className="flex flex-col items-center gap-2 group cursor-pointer">
			<div className="w-12 bg-slate-200 h-52 rounded-t-lg group-hover:bg-primary transition-all"></div>
			<span className="text-[10px] font-bold text-slate-400">OCT</span>
			</div>
			</div>
			</div>
			<div className="bg-surface-container-low p-6 rounded-xl">
			<div className="flex justify-between items-center mb-6">
			<h3 className="text-lg font-bold font-manrope">Today's Schedule</h3>
			<a className="text-primary text-xs font-bold hover:underline" href="#">View All</a>
			</div>
			<div className="space-y-4">
			<div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:bg-surface-bright transition-colors border-l-4 border-blue-500">
			<img alt="Patient" className="w-10 h-10 rounded-lg object-cover" data-alt="Close up portrait of a middle-aged woman with a friendly expression in a casual setting, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwAzAZFILC-8Py_Y2JMqWLfaWH_qkcDc1Rhc8sNEhtbV-ZPz3yCOMIOXDMQvktEBug-9fJqnFecptSxzbcK6px210Eu3l2mk0qLJ0RhCPBZlAhHjzaai4LgSB-0yc4uV5IluL8YltYHtQIM2Mod4Qb86FpJBqac5KalOq4mpFIHnpx_VBMWDI0NfSI4l-zpq0V2NkqFX_-VCwHr8lBoNoZ4QGT26ioR_LUoVkGGp4F6UsW5lKwgE9UxzRUoB_Gzis5B-a17-hXm-4"/>
			<div className="grow">
			<h4 className="text-sm font-bold">Sarah Jenkins</h4>
			<p className="text-[11px] text-slate-500 font-medium">Follow-up • 09:30 AM</p>
			</div>
			<button className="text-slate-400 hover:text-primary transition-colors">
			<span className="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
			</button>
			</div>
			<div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:bg-surface-bright transition-colors border-l-4 border-amber-500">
			<img alt="Patient" className="w-10 h-10 rounded-lg object-cover" data-alt="Close up portrait of an elderly man with short grey hair and a calm expression, professional headshot style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd2sN_aSZ6xmg8INy1lWjsh4H59I6g-xRGAuoUq8mvkWOvLNh6aPGhNoRfbx7TpBvt3ypO5K75DNn8cLYNCProQoR5zuccvub5CELgGKBSdmTAMrw21IdcaKDKm0Q4k2G-yPSdYgN2GlniWRcreMGdD1R19VwWQCZpMW8sqU9z6dCQho_zNpJmqJoauJ7Ps5QyhgGTiudB2FKrLb96G5JAYw19Ya7R0qwf5iU_QIeP-uyRsjFQcepY04T5Iy0tShH9nSALKz47kdk"/>
			<div className="grow">
			<h4 className="text-sm font-bold">Robert Chen</h4>
			<p className="text-[11px] text-slate-500 font-medium">Consultation • 10:15 AM</p>
			</div>
			<button className="text-slate-400 hover:text-primary transition-colors">
			<span className="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
			</button>
			</div>
			<div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:bg-surface-bright transition-colors border-l-4 border-emerald-500">
			<img alt="Patient" className="w-10 h-10 rounded-lg object-cover" data-alt="Portrait of a young African American woman with a modern hairstyle and a neutral professional expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVxmr6c2leRd_u4Z-TdmxP2eKSw0KZXMaUhS_Aha8oGncPqEb6OtpgH4A8TVCfAGAc_wSKyWg2oma2KTYGYFOY4WlNShHIjx_NVifMxclBqG9eHIVVYPYdLBVzw8uRKKUgbY-vlO6sCq7i8KF_2b6vEcBoxDRaQ0zNWSY3Orw0O9Q15wr5_Om8KZV2tTqg7ujNsmTMaDF5DaaTGjWAG0uQTfOa-WngmxcairEM7tzSuneY-y5MP_mqyyCKiDh8OnUhKaXhcDZ9HQk"/>
			<div className="grow">
			<h4 className="text-sm font-bold">Aliyah Smith</h4>
			<p className="text-[11px] text-slate-500 font-medium">ECG Report • 11:45 AM</p>
			</div>
			<button className="text-slate-400 hover:text-primary transition-colors">
			<span className="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
			</button>
			</div>
			<div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 hover:bg-surface-bright transition-colors border-l-4 border-blue-500">
			<div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
			<span className="material-symbols-outlined" data-icon="person">person</span>
			</div>
			<div className="grow">
			<h4 className="text-sm font-bold">Marcus Thorne</h4>
			<p className="text-[11px] text-slate-500 font-medium">Initial Check • 02:00 PM</p>
			</div>
			<button className="text-slate-400 hover:text-primary transition-colors">
			<span className="material-symbols-outlined text-lg" data-icon="more_vert">more_vert</span>
			</button>
			</div>
			</div>
			</div>
			</section>
			</main>
			</div>
			<footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-200 dark:border-slate-800">
			<div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
			<div className="font-inter text-xs text-slate-500">
							© 2024 MedReserve Clinical Systems. All rights reserved.
						</div>
			<div className="flex flex-wrap justify-center gap-8 font-inter text-xs">
			<a className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" href="#">Privacy Policy</a>
			<a className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" href="#">Terms of Service</a>
			<a className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" href="#">Contact Support</a>
			<a className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" href="#">Healthcare Partners</a>
			</div>
			</div>
			</footer>
			</div>
		</>
	);
}