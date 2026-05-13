
'use client';

export default function SchedulePage() {
	return (
		<div className="schedule-root bg-surface font-body text-on-surface antialiased overflow-hidden">
			<style jsx>{`
				/* Local theme + missing utilities (scoped to this page only) */
				.schedule-root {
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

			{/* SideNavBar Shell */}
			<aside className="w-64 fixed left-0 top-0 border-r-0 bg-slate-50  flex flex-col h-screen p-4 gap-2 z-50">
				<div className="flex items-center gap-3 px-2 mb-8">
					<div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg">
						<span className="material-symbols-outlined" data-icon="clinical_notes">
							clinical_notes
						</span>
					</div>
					<div>
						<h1 className="font-headline font-bold text-xl text-slate-900 leading-none">MedReserve</h1>
						<p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">Clinical Admin</p>
					</div>
				</div>

				<nav className="flex-1 flex flex-col gap-1">
					<a
						className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group"
						href="#"
					>
						<span className="material-symbols-outlined" data-icon="dashboard">
							dashboard
						</span>
						<span className="font-['Inter'] font-medium text-sm">Dashboard</span>
					</a>

					<a
						className="flex items-center gap-3 px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-sm group"
						href="#"
					>
						<span className="material-symbols-outlined" data-icon="calendar_month">
							calendar_month
						</span>
						<span className="font-['Inter'] font-medium text-sm">Schedules</span>
					</a>

					<a
						className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group"
						href="#"
					>
						<span className="material-symbols-outlined" data-icon="group">
							group
						</span>
						<span className="font-['Inter'] font-medium text-sm">Patients</span>
					</a>

					<a
						className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group"
						href="#"
					>
						<span className="material-symbols-outlined" data-icon="description">
							description
						</span>
						<span className="font-['Inter'] font-medium text-sm">Applications</span>
					</a>

					<a
						className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 transition-colors rounded-lg group"
						href="#"
					>
						<span className="material-symbols-outlined" data-icon="category">
							category
						</span>
						<span className="font-['Inter'] font-medium text-sm">Categories</span>
					</a>
				</nav>

				<div className="mt-auto p-2 bg-slate-100 rounded-xl flex items-center gap-3">
					<img
						alt="Dr. Smith Profile"
						className="w-10 h-10 rounded-lg object-cover"
						data-alt="professional headshot of a middle-aged doctor with a kind expression wearing a white coat in a bright clinic setting"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjgHhnNCLsCZO3QnKR2gzmInjDYMvtZug9OkfZ_b_Ymx9tIjN_HYLCxIL0abCUE50HHsoCJVC4cMEjbCOOUxkUbtOz3hr7v4gE_Uib6XpsE-p54H7DVEybAks_-5zX4ybodESuqYI6WohJ2qYXOTN1lGa5efIAqWmvsT7z8oTvj3NRaQ4Xsw47fG2obhMzdbUQk8U7hHm5G6vjhVa4CGXykchpGOlnBjCKH1Ablt4tnPRjzZQ9Nhf9Qo4VJHquRYAQTZeNiekn9pE"
					/>
					<div className="overflow-hidden">
						<p className="text-xs font-bold text-slate-90 truncate">Dr. Sarah Smith</p>
						<p className="text-[10px] text-slate-500 truncate">Cardiologist</p>
					</div>
					<button className="ml-auto text-slate-400 hover:text-slate-900" type="button">
						<span className="material-symbols-outlined text-lg" data-icon="logout">
							logout
						</span>
					</button>
				</div>
			</aside>

			{/* Main Content Area */}
			<main className="ml-64 min-h-screen flex flex-col">
				{/* TopAppBar */}
				<header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-white/80  backdrop-blur-xl shadow-sm flex justify-between items-center px-8">
					<div className="flex items-center gap-8">
						<h2 className="font-headline font-extrabold text-blue-700 text-lg">Schedule &amp; Slot Management</h2>
						<nav className="hidden lg:flex items-center gap-6">
							<a className="text-blue-600 border-b-2 border-blue-600 pb-1 font-headline font-semibold text-base transition-all" href="#">
								Weekly View
							</a>
							<a className="text-slate-500 hover:text-blue-500  font-headline font-semibold text-base transition-all" href="#">
								List View
							</a>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all" type="button">
							<span className="material-symbols-outlined" data-icon="notifications">
								notifications
							</span>
						</button>
						<button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all" type="button">
							<span className="material-symbols-outlined" data-icon="settings">
								settings
							</span>
						</button>
					</div>
				</header>

				{/* Content Canvas */}
				<section className="mt-16 p-8 flex-1 flex flex-col gap-8 bg-surface overflow-y-auto">
					{/* Action Bar */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
						<div className="flex items-center gap-2">
							<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" type="button">
								<span className="material-symbols-outlined" data-icon="chevron_left">
									chevron_left
								</span>
							</button>
							<h3 className="font-headline font-bold text-2xl text-on-surface">Oct 23 - Oct 29, 2023</h3>
							<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" type="button">
								<span className="material-symbols-outlined" data-icon="chevron_right">
									chevron_right
								</span>
							</button>
						</div>
						<div className="flex items-center gap-3">
							<button
								className="px-5 py-2.5 bg-surface-container-highest text-on-surface rounded-xl font-medium text-sm flex items-center gap-2 transition-all hover:bg-surface-dim"
								type="button"
							>
								<span className="material-symbols-outlined text-lg" data-icon="auto_awesome">
									auto_awesome
								</span>
								Auto-generate Slots
							</button>
							<button
								className="px-5 py-2.5 bg-[linear-gradient(to_right,rgb(var(--primary)),rgb(var(--primary-container)))] text-on-primary rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
								type="button"
							>
								<span className="material-symbols-outlined text-lg" data-icon="add">
									add
								</span>
								Add Slot
							</button>
						</div>
					</div>

					{/* Dashboard Stats Tonal Layering */}
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-1">
							<span className="text-xs font-bold text-outline uppercase tracking-wider">Total Slots</span>
							<div className="flex items-baseline gap-2">
								<span className="text-3xl font-headline font-extrabold text-on-surface">42</span>
								<span className="text-xs font-medium text-[#0D6EFD]">+4 this week</span>
							</div>
						</div>
						<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-1">
							<span className="text-xs font-bold text-outline uppercase tracking-wider">Booked</span>
							<div className="flex items-baseline gap-2">
								<span className="text-3xl font-headline font-extrabold text-on-surface">28</span>
								<span className="text-xs font-medium text-tertiary">66.7% occupancy</span>
							</div>
						</div>
						<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-1">
							<span className="text-xs font-bold text-outline uppercase tracking-wider">Available</span>
							<div className="flex items-baseline gap-2">
								<span className="text-3xl font-headline font-extrabold text-on-surface">14</span>
								<span className="text-xs font-medium text-[#0D6EFD]">Open for booking</span>
							</div>
						</div>
						<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-1">
							<span className="text-xs font-bold text-outline uppercase tracking-wider">Avg. Wait</span>
							<div className="flex items-baseline gap-2">
								<span className="text-3xl font-headline font-extrabold text-on-surface">12m</span>
								<span className="text-xs font-medium text-on-error-container">-2m from avg</span>
							</div>
						</div>
					</div>

					{/* Weekly Grid View */}
					<div className="bg-surface-container-lowest rounded-4xl p-6 shadow-sm flex-1 flex flex-col min-h-150">
						{/* Grid Headers */}
						<div className="calendar-grid mb-6 border-b border-surface-container pb-4">
							<div className="flex items-center justify-center font-label text-xs font-bold text-outline uppercase">Time</div>
							<div className="flex flex-col items-center">
								<span className="text-xs font-bold text-outline uppercase">Mon</span>
								<span className="text-xl font-headline font-extrabold">23</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="text-xs font-bold text-outline uppercase">Tue</span>
								<span className="text-xl font-headline font-extrabold text-[#0D6EFD]">24</span>
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

						{/* Grid Body (Scrollable Area) */}
						<div className="schedule-scroll flex-1 overflow-y-auto pr-2 relative">
							{/* Current Time Indicator */}
							<div className="absolute w-full top-45 z-20 pointer-events-none">
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full bg-[#0D6EFD] -ml-1"></div>
									<div className="flex-1 h-px bg-[#0D6EFD] opacity-30"></div>
								</div>
							</div>

							<div className="space-y-4">
								{/* 09:00 Row */}
								<div className="calendar-grid min-h-20">
									<div className="text-xs font-bold text-outline flex items-start justify-center pt-1">09:00 AM</div>
									<div className="px-1">
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
											<p className="text-xs font-bold text-on-surface truncate">John Doe</p>
											<p className="text-[10px] text-outline truncate">Follow-up</p>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
											<span className="material-symbols-outlined text-outline group-hover:text-[#0D6EFD]" data-icon="add">
												add
											</span>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
											<p className="text-xs font-bold text-on-surface truncate">Alice Wang</p>
											<p className="text-[10px] text-outline truncate">Consultation</p>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
											<span className="material-symbols-outlined text-outline group-hover:text-[#0D6EFD]" data-icon="add">
												add
											</span>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
											<p className="text-xs font-bold text-on-surface truncate">Robert Chen</p>
											<p className="text-[10px] text-outline truncate">Checkup</p>
										</div>
									</div>
									<div className="px-1"></div>
									<div className="px-1"></div>
								</div>

								{/* 10:00 Row */}
								<div className="calendar-grid min-h-20">
									<div className="text-xs font-bold text-outline flex items-start justify-center pt-1">10:00 AM</div>
									<div className="px-1">
										<div className="bg-tertiary-container/10 border-l-4 border-tertiary p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-tertiary uppercase">Available</span>
											<p className="text-xs font-bold text-on-surface">30m Slot</p>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
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
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
											<p className="text-xs font-bold text-on-surface truncate">Sarah Jenkins</p>
											<p className="text-[10px] text-outline truncate">Cardio Test</p>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-surface-container-low border-2 border-dashed border-outline-variant p-3 rounded-xl h-full flex items-center justify-center group cursor-pointer hover:bg-surface-container-high transition-colors">
											<span className="material-symbols-outlined text-outline group-hover:text-[#0D6EFD]" data-icon="add">
												add
											</span>
										</div>
									</div>
									<div className="px-1"></div>
									<div className="px-1"></div>
								</div>

								{/* 11:00 Row */}
								<div className="calendar-grid min-h-20">
									<div className="text-xs font-bold text-outline flex items-start justify-center pt-1">11:00 AM</div>
									<div className="px-1 col-span-3">
										<div className="bg-surface-container-high border-l-4 border-outline p-3 rounded-xl h-full flex items-center gap-3">
											<span className="material-symbols-outlined text-outline" data-icon="block">
												block
											</span>
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
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
											<p className="text-xs font-bold text-on-surface truncate">Peter Parker</p>
											<p className="text-[10px] text-outline truncate">Routine</p>
										</div>
									</div>
									<div className="px-1"></div>
									<div className="px-1"></div>
								</div>

								{/* 12:00 Row */}
								<div className="calendar-grid min-h-20">
									<div className="text-xs font-bold text-outline flex items-start justify-center pt-1">12:00 PM</div>
									<div className="px-1 col-span-5 bg-surface-container-low rounded-xl flex items-center justify-center border-y border-surface-container-high border-dashed">
										<span className="text-xs font-bold text-outline uppercase tracking-widest flex items-center gap-2">
											<span className="material-symbols-outlined text-sm" data-icon="restaurant">
												restaurant
											</span>
											Lunch Break
										</span>
									</div>
									<div className="px-1"></div>
									<div className="px-1"></div>
								</div>

								{/* 01:00 Row */}
								<div className="calendar-grid min-h-20">
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
											<span className="material-symbols-outlined text-outline group-hover:text-[#0D6EFD]" data-icon="add">
												add
											</span>
										</div>
									</div>
									<div className="px-1">
										<div className="bg-[#0D6EFD]/10 border-l-4 border-[#0D6EFD] p-3 rounded-xl h-full flex flex-col justify-center">
											<span className="text-[10px] font-bold text-[#0D6EFD] uppercase">Booked</span>
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

					{/* Bento Bottom Section: Quick Settings */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
						<div className="lg:col-span-2 bg-surface-container-low p-6 rounded-3xl flex flex-col gap-6">
							<div className="flex justify-between items-center">
								<h4 className="font-headline font-bold text-lg">Auto-generation Settings</h4>
								<button className="text-[#0D6EFD] font-bold text-sm" type="button">
									Reset to Default
								</button>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-xs font-bold text-outline uppercase px-1">Slot Duration</label>
									<select
										className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D6EFD] shadow-sm"
										defaultValue="30"
									>
										<option value="15">15 Minutes</option>
										<option value="30">30 Minutes</option>
										<option value="45">45 Minutes</option>
										<option value="60">1 Hour</option>
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold text-outline uppercase px-1">Buffer Time</label>
									<select
										className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D6EFD] shadow-sm"
										defaultValue="5"
									>
										<option value="0">No Buffer</option>
										<option value="5">5 Minutes</option>
										<option value="10">10 Minutes</option>
										<option value="15">15 Minutes</option>
									</select>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold text-outline uppercase px-1">Start Hour</label>
									<input
										className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D6EFD] shadow-sm"
										type="time"
										defaultValue="09:00"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-xs font-bold text-outline uppercase px-1">End Hour</label>
									<input
										className="w-full bg-surface-container-lowest border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0D6EFD] shadow-sm"
										type="time"
										defaultValue="17:00"
									/>
								</div>
							</div>
						</div>

						<div className="bg-[#0D6EFD]/5 p-6 rounded-3xl border border-[#0D6EFD]/10 flex flex-col justify-between">
							<div>
								<h4 className="font-headline font-bold text-lg text-[#0D6EFD] mb-2">Weekly Summary</h4>
								<p className="text-sm text-outline mb-6 leading-relaxed">
									Your current availability is set to 32 hours per week. You have filled 88% of your core cardiological slots.
								</p>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-sm font-medium">Efficiency</span>
										<span className="text-sm font-bold">92%</span>
									</div>
									<div className="w-full h-2 bg-[#0D6EFD]-fixed rounded-full overflow-hidden">
										<div className="w-[92%] h-full bg-[#0D6EFD]"></div>
									</div>
								</div>
							</div>
							<button
								className="mt-8 w-full py-3 bg-[#0D6EFD] text-on-[#0D6EFD] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-on-[#0D6EFD]-fixed-variant transition-all"
								type="button"
							>
								<span className="material-symbols-outlined text-lg" data-icon="analytics">
									analytics
								</span>
								View Detailed Insights
							</button>
						</div>
					</div>
				</section>
			</main>

			{/* Floating Action Button - Only for Schedule Primary Action */}
			<button
				className="fixed bottom-8 right-8 w-16 h-16 bg-[#0D6EFD] text-on-[#0D6EFD] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
				type="button"
			>
				<span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90" data-icon="add">
					add
				</span>
			</button>

			{/* Slot Detail Glass Modal (Hidden by default, used for illustration of Glassmorphism Rule) */}
			<div className="hidden fixed inset-0 z-100 items-center justify-center p-6">
				<div className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"></div>
				<div className="relative glass-panel w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-white/20">
					<div className="flex justify-between items-start mb-6">
						<div>
							<span className="text-xs font-bold text-[#0D6EFD] uppercase tracking-widest">New Appointment Slot</span>
							<h5 className="font-headline font-extrabold text-2xl mt-1">Configure Slot</h5>
						</div>
						<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" type="button">
							<span className="material-symbols-outlined" data-icon="close">
								close
							</span>
						</button>
					</div>
					<div className="space-y-6">{/* Data components */}</div>
				</div>
			</div>
		</div>
	);
}
