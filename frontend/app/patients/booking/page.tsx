'use client';
function Booking() {
    return (
        <>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Doctor Profile - MedReserve</title>
        {/* Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap"
            rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
        />
        {/* Tailwind CSS */}
        <style
            dangerouslySetInnerHTML={{
            __html:
                "\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .material-fill {\n            font-variation-settings: 'FILL' 1;\n        }\n    "
            }}
        />
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
            <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-8">
                <span className="text-xl font-bold tracking-tighter text-slate-900">
                MedReserve
                </span>
                <nav className="hidden md:flex gap-6">
                <a
                    className="text-blue-600 border-b-2 border-blue-600 font-manrope tracking-tight font-semibold py-1"
                    href="#"
                >
                    Find Doctors
                </a>
                <a
                    className="text-slate-600 hover:text-blue-700 transition-colors font-manrope tracking-tight font-semibold py-1"
                    href="#"
                >
                    Specialties
                </a>
                <a
                    className="text-slate-600 hover:text-blue-700 transition-colors font-manrope tracking-tight font-semibold py-1"
                    href="#"
                >
                    About Us
                </a>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-blue-600 font-manrope tracking-tight font-semibold active:scale-95 duration-200">
                Sign In
                </button>
                <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-manrope tracking-tight font-semibold active:scale-95 duration-200 shadow-sm">
                Join as Doctor
                </button>
            </div>
            </div>
            <div className="bg-slate-200/50 h-[1px]" />
        </header>
        <main className="pt-24 pb-20 max-w-screen-2xl mx-auto px-6">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-8 bg-surface-container-lowest rounded-3xl overflow-hidden flex flex-col md:flex-row items-center md:items-end p-8 gap-8 relative">
                {/* Profile Image */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <img
                    alt="Doctor profile"
                    className="w-full h-full object-cover rounded-2xl shadow-xl shadow-primary/10"
                    data-alt="portrait of a professional male doctor in his 40s wearing a white clinical coat and stethoscope, smiling warmly in a bright modern medical office"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYtWdA_ohvneu_r7bu8XLHWOqsHTlLujlYSOedETiyvqwB4zTuLZAsMffAVXDPup4nk2uXDziPbmyXMJK8GQUkvCvNPDwMf9lQ0eYXcuOacE_hPSySvybd6eB9IQbGt4UquxqYuHq0wykOyIvm9HAj8wab0o-3053C4P36Eq1PkZhYh3xKzfdpTzwrK97cbjfV6FWtghYcY9So8noVbK1AnftIpO4uG1ik49OCMu6vr0REgMM3XQWipuFotLQn5p6zK9svC6-njtM"
                />
                </div>
                <div className="flex-grow space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1 uppercase">
                    <span className="material-symbols-outlined text-sm material-fill">
                        verified
                    </span>
                    Verified Specialist
                    </span>
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">
                    Dr. James Wilson
                    </h1>
                    <p className="text-xl text-secondary font-medium mt-1">
                    Senior Cardiologist • 15+ Years Experience
                    </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                    <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        location_on
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant">
                        Central Medical Plaza, NY
                    </span>
                    </div>
                    <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        star
                    </span>
                    <span className="text-sm font-bold text-on-surface">4.9</span>
                    <span className="text-sm text-on-surface-variant">
                        (1,240 Reviews)
                    </span>
                    </div>
                </div>
                </div>
            </div>
            {/* Quick Stats Bento Item */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
                <div className="bg-primary-fixed-dim/30 p-6 rounded-3xl flex flex-col justify-between">
                <span className="material-symbols-outlined text-primary text-3xl">
                    groups
                </span>
                <div>
                    <div className="text-2xl font-headline font-bold text-on-primary-fixed">
                    12k+
                    </div>
                    <div className="text-xs font-label uppercase tracking-widest text-on-primary-fixed-variant">
                    Patients Seen
                    </div>
                </div>
                </div>
                <div className="bg-secondary-fixed-dim/30 p-6 rounded-3xl flex flex-col justify-between">
                <span className="material-symbols-outlined text-secondary text-3xl">
                    workspace_premium
                </span>
                <div>
                    <div className="text-2xl font-headline font-bold text-on-secondary-fixed">
                    Top 1%
                    </div>
                    <div className="text-xs font-label uppercase tracking-widest text-on-secondary-fixed-variant">
                    Specialist
                    </div>
                </div>
                </div>
                <div className="col-span-2 bg-surface-container-low p-6 rounded-3xl">
                <h4 className="font-headline font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">language</span>
                    Languages
                </h4>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-surface-container-lowest rounded-full text-xs font-medium">
                    English
                    </span>
                    <span className="px-3 py-1 bg-surface-container-lowest rounded-full text-xs font-medium">
                    Spanish
                    </span>
                    <span className="px-3 py-1 bg-surface-container-lowest rounded-full text-xs font-medium">
                    German
                    </span>
                </div>
                </div>
            </div>
            </section>
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Content */}
            <div className="lg:col-span-8 space-y-12">
                {/* About Section */}
                <section>
                <h3 className="text-2xl font-headline font-bold mb-6 text-on-surface">
                    About Dr. Wilson
                </h3>
                <div className="bg-surface-container-lowest p-8 rounded-3xl leading-relaxed text-on-surface-variant">
                    <p className="mb-4">
                    Dr. James Wilson is a board-certified cardiologist with over 15
                    years of experience in cardiovascular medicine. He specializes in
                    preventative cardiology, heart failure management, and advanced
                    echocardiography. His patient-centric approach focuses on
                    utilizing the latest diagnostic technologies while maintaining a
                    compassionate, individual care plan for every patient.
                    </p>
                    <p>
                    Having published over 30 peer-reviewed articles, Dr. Wilson
                    remains at the forefront of medical innovation, ensuring his
                    patients receive the most current and effective treatments
                    available in modern medicine.
                    </p>
                </div>
                </section>
                {/* Services Section */}
                <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-headline font-bold text-on-surface">
                    Services &amp; Procedures
                    </h3>
                    <span className="text-sm font-medium text-primary">
                    Insurance Accepted
                    </span>
                </div>
                <div className="grid gap-3">
                    <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group hover:bg-surface-bright transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">ecg</span>
                        </div>
                        <div>
                        <h5 className="font-bold text-on-surface">
                            Standard Consultation
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                            General heart health checkup and history review
                        </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-headline font-extrabold text-lg">
                        $150
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        Out of pocket
                        </span>
                    </div>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group hover:bg-surface-bright transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                            monitor_heart
                        </span>
                        </div>
                        <div>
                        <h5 className="font-bold text-on-surface">
                            Diagnostic Echocardiogram
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                            Advanced ultrasound imaging of heart structure
                        </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-headline font-extrabold text-lg">
                        $320
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        Out of pocket
                        </span>
                    </div>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group hover:bg-surface-bright transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">
                            health_metrics
                        </span>
                        </div>
                        <div>
                        <h5 className="font-bold text-on-surface">
                            Lipid Profile &amp; Stress Test
                        </h5>
                        <p className="text-xs text-on-surface-variant">
                            Comprehensive cardiac stress and blood analysis
                        </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-headline font-extrabold text-lg">
                        $450
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        Out of pocket
                        </span>
                    </div>
                    </div>
                </div>
                </section>
                {/* Location & Dates */}
                <section>
                <h3 className="text-2xl font-headline font-bold mb-6 text-on-surface">
                    Available Locations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface-container-low p-6 rounded-3xl">
                    <div className="aspect-video bg-slate-300 rounded-2xl mb-4 overflow-hidden relative">
                        <div
                        className="absolute inset-0 bg-cover bg-center"
                        data-alt="clean minimalist city map interface with a blue pin marker on a medical center building"
                        style={{
                            backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9h6isf5z_k0DWk1B5-YAA224lwlxgH1_HJapvBdyTnp3wYpg40vYA11Hw5M_nzThPTLZdlyvuVqAs19lCOiox_fs54A3oLYN_tG4owJSBVeD9ZtdtHjZjlYohqHanm01yRU0t9Gv-fPLsmFH4by4KMe4kCJaWpxXe0nZ0S75TvtfgHC7A_oOdSMZubHGvopaaw-O6TxnsuyxebjtvLG_na-lFTblWKcF8sE4zTTFaE1hHh0ee8QNbc2uzLjx1wfUWltX_d97g-I8")'
                        }}
                        />
                    </div>
                    <h6 className="font-bold text-on-surface">
                        Central Medical Plaza
                    </h6>
                    <p className="text-sm text-on-surface-variant mb-4">
                        450 Medical Way, Suite 200, New York, NY
                    </p>
                    <button className="text-primary text-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                        directions
                        </span>
                        Get Directions
                    </button>
                    </div>
                    <div className="bg-surface-container-low p-6 rounded-3xl border border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center opacity-70">
                    <span className="material-symbols-outlined text-4xl mb-2 text-outline">
                        apartment
                    </span>
                    <h6 className="font-bold text-on-surface">
                        Uptown Wellness Center
                    </h6>
                    <p className="text-sm text-on-surface-variant">
                        Currently no available slots at this location
                    </p>
                    </div>
                </div>
                </section>
            </div>
            {/* Right Column: Booking Sidebar */}
            <aside className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-xl shadow-primary/5 border border-surface-container">
                    <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xl font-headline font-extrabold text-on-surface">
                        Book Appointment
                    </h4>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    </div>
                    {/* Date Selection */}
                    <div className="mb-8">
                    <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                        Select Date
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        <button className="flex flex-col items-center p-3 rounded-2xl bg-primary-container text-on-primary-container">
                        <span className="text-[10px] uppercase font-bold">Mon</span>
                        <span className="text-lg font-headline font-extrabold">
                            12
                        </span>
                        </button>
                        <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                            Tue
                        </span>
                        <span className="text-lg font-headline font-extrabold">
                            13
                        </span>
                        </button>
                        <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                            Wed
                        </span>
                        <span className="text-lg font-headline font-extrabold">
                            14
                        </span>
                        </button>
                        <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                        <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                            Thu
                        </span>
                        <span className="text-lg font-headline font-extrabold">
                            15
                        </span>
                        </button>
                    </div>
                    </div>
                    {/* Time Slots */}
                    <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                        Available Slots
                        </label>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        6 Slots Left
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                        09:00 AM
                        </button>
                        <button className="py-3 px-4 rounded-xl text-sm font-bold bg-surface-container-low text-on-surface-variant cursor-not-allowed line-through">
                        09:45 AM
                        </button>
                        <button className="py-3 px-4 rounded-xl text-sm font-bold border border-primary bg-primary/5 text-primary">
                        10:30 AM
                        </button>
                        <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                        11:15 AM
                        </button>
                        <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                        02:00 PM
                        </button>
                        <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                        03:30 PM
                        </button>
                    </div>
                    </div>
                    {/* CTA */}
                    <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-2xl font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    Book Appointment
                    </button>
                    <p className="text-[10px] text-center text-on-surface-variant mt-4 px-6">
                    By booking, you agree to our terms. You can cancel for free up to
                    24h before the appointment.
                    </p>
                </div>
                {/* Reviews Teaser */}
                <div className="bg-surface-container-low p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex -space-x-3">
                    <img
                        className="w-8 h-8 rounded-full border-2 border-surface"
                        data-alt="close up headshot of a smiling man"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJfqkSwK5GuzjPMxwce2iOPyrObrnnFDww82Vytw_2z78RyI6xQURhwB2hOp2H4-HlRufFhc1v2-wty9G7TzVcbv3TldUAnVPhPOKRKdi5jpIf4tINudZGwbd_f4W08AqZt2OEHHiE3B-uhmaac0TUN1k4I2Rr789NRacSORH-Hj3WfOjEgiay2NX5ApQZIH07LlRFDBouGleRlwudJ9VpyJ2J-WlLYBCEKlVIVjAF0cwfqZWB0HxxSxmVum64lu4xwkLeggQsxM"
                    />
                    <img
                        className="w-8 h-8 rounded-full border-2 border-surface"
                        data-alt="close up headshot of a professional woman"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9RhaoKRAPAcJRI_2ffM--VF2ih9NarOCTiDiW6hCRCV_1HvC8qiX9OLaGStFwsaFjQ_nBnLbRgLLbin5RSbgfDgHwTOiwnsjDJu8o8zIVOAAtu8iRNQGFtj_UxNudWIKyHvNBFAS5bQYyOWB6OnYL-BWEDvvJxG1M3DxP2iXuP_9xxgLSSv3yTYdoEtNqlPGJLV3UqOxeeBgPjTKsCzVazDf_q2dKXRrIPCmthUTKTztiyppjxDzJPXzl7jdcxRVi9OJlPXAJICM"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold">
                        +1k
                    </div>
                    </div>
                    <div className="text-right">
                    <div className="text-sm font-bold">Trusted by many</div>
                    <button className="text-xs text-primary font-medium underline decoration-primary/30">
                        Read all reviews
                    </button>
                    </div>
                </div>
                </div>
            </aside>
            </div>
        </main>
        {/* Footer */}
        <footer className="w-full border-t border-slate-200 bg-slate-50">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
            <div className="text-xs text-slate-500 font-inter">
                © 2024 MedReserve Clinical Systems. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-8">
                <a
                className="text-slate-500 hover:text-slate-900 transition-colors underline decoration-blue-500/30 font-inter text-xs"
                href="#"
                >
                Privacy Policy
                </a>
                <a
                className="text-slate-500 hover:text-slate-900 transition-colors underline decoration-blue-500/30 font-inter text-xs"
                href="#"
                >
                Terms of Service
                </a>
                <a
                className="text-slate-500 hover:text-slate-900 transition-colors underline decoration-blue-500/30 font-inter text-xs"
                href="#"
                >
                Contact Support
                </a>
                <a
                className="text-slate-500 hover:text-slate-900 transition-colors underline decoration-blue-500/30 font-inter text-xs"
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

export default Booking;
