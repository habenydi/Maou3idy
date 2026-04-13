function Register() {
  return (
    <div className="bg-surface font-body text-on-surface">

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-slate-900 font-headline">
            MedReserve
          </div>

          <nav className="hidden md:flex gap-8">
            <a className="text-slate-600 font-headline font-semibold hover:text-blue-700 transition-colors" href="#">
              Find Doctors
            </a>
            <a className="text-slate-600 font-headline font-semibold hover:text-blue-700 transition-colors" href="#">
              Specialties
            </a>
            <a className="text-slate-600 font-headline font-semibold hover:text-blue-700 transition-colors" href="#">
              About Us
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a className="text-blue-600 font-semibold hover:text-blue-700" href="#">
              Sign In
            </a>
            <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-bold text-sm active:scale-95 duration-200">
              Join as Doctor
            </button>
          </div>
        </div>
        <div className="bg-slate-200/50 h-[1px]"></div>
      </header>

      {/* MAIN */}
      <main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">

        {/* Background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-container rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-primary-fixed rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-xl">

          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm relative z-10 overflow-hidden">

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tighter mb-3">
                Create an Account
              </h1>
              <p className="text-on-surface-variant text-sm md:text-base">
                Join MedReserve to manage your healthcare appointments with clinical precision.
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4 mb-8">
              <button className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl bg-surface-container-low hover:bg-surface-container transition">
                <img
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7sekk05ih7WxToSvBqVjBRIZ_sW2fr6DiucmVZvGhZmof4OkP2XJGGUTQIW7tAodaGdD7l4r0riWG05JO2Nnd8AiczWbQsbNEiywjHdF59_aXtElHddBdqHRVE6VtV-TvFhjgCk9ecyKmCUZZre7DxDHk-ktv44cUTS0X-pbfpNHQ2lRicHyQ-dkZUmZKaJrTpv9OZmQEy2m0kJqq1pm63_bOtCR73jugDvilnd2W0Ylj3xPuDFJ-IYJxHcpsz2vnO-33ui5xpTQ"
                  alt="Google"
                />
                Continue with Google
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-surface-container"></div>
                <span className="text-xs font-semibold uppercase text-outline">OR</span>
                <div className="h-[1px] flex-1 bg-surface-container"></div>
              </div>
            </div>

            {/* FORM */}
            <form className="space-y-6">

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase">
                  Full Name
                </label>
                <input id="name" type="text" className="w-full p-3 rounded-xl bg-surface-container-low" placeholder="John Doe" />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="email" placeholder="Email" className="p-3 rounded-xl bg-surface-container-low" />
                <input type="tel" placeholder="Phone" className="p-3 rounded-xl bg-surface-container-low" />
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="password" placeholder="Password" className="p-3 rounded-xl bg-surface-container-low" />
                <input type="password" placeholder="Confirm Password" className="p-3 rounded-xl bg-surface-container-low" />
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-xs">
                  I agree to Terms and Privacy Policy
                </span>
              </div>

              {/* Button */}
              <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-xl font-bold">
                Register
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a className="text-primary font-bold" href="#">
                  Sign In
                </a>
              </p>
            </div>

          </div>

          {/* Bottom badges */}
          <div className="mt-8 flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">encrypted</span>
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">security</span>
              256-bit SSL
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 max-w-screen-2xl mx-auto">
          <p className="text-xs text-slate-500">
            © 2024 MedReserve Clinical Systems
          </p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Register;