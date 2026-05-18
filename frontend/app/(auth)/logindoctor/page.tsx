'use client';

function LoginDoctor() {
  return (
    <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Join MedReserve | Professional Registration</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .glass-panel {\n            background: rgba(255, 255, 255, 0.7);\n            backdrop-filter: blur(12px);\n        }\n    "
    }}
  />
  <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
    <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
      <div className="text-xl font-bold tracking-tighter text-slate-900 font-manrope">
        MedReserve
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          Find Doctors
        </a>
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          Specialties
        </a>
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          About Us
        </a>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-600 font-manrope tracking-tight font-semibold px-4 py-2 active:scale-95 duration-200">
          Sign In
        </button>
        <button className="bg-primary text-on-primary font-manrope tracking-tight font-semibold px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-container shadow-md active:scale-95 duration-200">
          Join as Doctor
        </button>
      </div>
    </div>
    <div className="bg-slate-200/50 h-px" />
  </nav>
  <main className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <section className="lg:col-span-5 space-y-8 pt-12">
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-widest uppercase">
            Professional Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tight leading-[1.1]">
            Partner with clinical excellence.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
            Join over 12,000 board-certified specialists using MedReserve to
            streamline their digital practice and connect with patients.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary-fixed-dim p-3 rounded-xl text-primary">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface">Verified Identity</h3>
              <p className="text-sm text-on-surface-variant">
                Secure credential verification for patient trust.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary-fixed-dim p-3 rounded-xl text-primary">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h3 className="font-bold text-on-surface">Practice Analytics</h3>
              <p className="text-sm text-on-surface-variant">
                Real-time data on patient bookings and retention.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl h-64 shadow-xl">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            data-alt="Modern medical office with glass walls, clean minimalist interior, and a professional doctor holding a tablet in a soft lit environment"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxGWOK3Rac8eDP76IXKsXa1MlbxnjHvgmeBpoTuCvnITlEUUekdeDiY7xbRssnn3HJb7v4C155JzPsub59XW_bREF8VjDuubuWsegRqZDWY6lpEC-VtgknwD0hJoLOXQpijuE5HUD3Fvz8wAWRt4bsooVX4aLNx9uu-2DN32P5p4rR-s4GY-aAXbGi9k_mAprlxCiOj1ZxXx7-T7w37hKLIeU_7azJwujTiDRvuwV_hYR4NWPDrO6tgLkD6YVs6jkHwdSpvXjrL0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <p className="text-white font-medium italic text-sm">
              "MedReserve has transformed how I manage my cardiologist clinic in
              Manhattan."
            </p>
            <p className="text-white/80 text-xs mt-2">— Dr. Elena Rossi</p>
          </div>
        </div>
      </section>
      <section className="lg:col-span-7">
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm border-0">
          <form className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  person_add
                </span>
                Registration Details
              </h2>
              <p className="text-on-surface-variant text-sm mt-1">
                Please provide your primary clinical contact information.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Full Name
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder="Dr. Jane Smith"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Professional Email
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder="jane.smith@clinic.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Phone
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Specialty
                </label>
                <select className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none">
                  <option>Select Specialty</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Dermatology</option>
                </select>
              </div>
            </div>
            <div className="bg-surface-container p-[1px]" />
            <div>
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  workspace_premium
                </span>
                Clinical Details
              </h2>
              <p className="text-on-surface-variant text-sm mt-1">
                Verify your professional medical background.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  License Number
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder="MD-XXXX-XXXX"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Years of Experience
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder={"10"}
                  type="number"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                  Brief Bio
                </label>
                <textarea
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  placeholder="Describe your clinical focus and patient philosophy..."
                  rows={3}
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                Upload Medical License &amp; Credentials
              </label>
              <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-8 text-center hover:bg-surface-container-low transition-colors group">
                <input className="hidden" id="file-upload" type="file" />
                <label
                  className="cursor-pointer flex flex-col items-center"
                  htmlFor="file-upload"
                >
                  <span className="material-symbols-outlined text-4xl text-outline mb-3 group-hover:text-primary transition-colors">
                    cloud_upload
                  </span>
                  <p className="font-bold text-on-surface">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    PDF, PNG or JPG (max. 10MB)
                  </p>
                </label>
              </div>
            </div>
            <div className="pt-4">
              <button
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                type="submit"
              >
                Apply to Join
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="text-center text-xs text-on-surface-variant mt-6">
                By applying, you agree to our{" "}
                <a className="text-primary font-semibold" href="#">
                  Verification Terms
                </a>{" "}
                and{" "}
                <a className="text-primary font-semibold" href="#">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
  <footer className="bg-slate-50 w-full border-t border-slate-200">
    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
      <div className="text-xs text-slate-500 font-inter">
        © 2024 MedReserve Clinical Systems. All rights reserved.
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <a
          className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
          href="#"
        >
          Contact Support
        </a>
        <a
          className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
          href="#"
        >
          Healthcare Partners
        </a>
      </div>
    </div>
  </footer>
    </>
    );
}

export default LoginDoctor;
