'use client';
import Img from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLandingPageData } from '@/services/landingPageService';
import { Doctor, LandingPageData } from '@/types';
import Navbar from '@/components/Navbar';

const LandingPage = () => {
  const [landingData, setLandingData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLandingPageData();
        setLandingData(data);
      } catch (error) {
        console.error('Error loading landing page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const doctors = landingData?.featuredDoctors || [];

  return (
    <div className="bg-surface text-on-surface antialiased">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-wider mb-6">TRUSTED BY 10k+ PATIENTS</span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-6">
                Find the right <span className="text-primary">doctor</span> easily
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed">
                Access world-class healthcare from the comfort of your home. Book appointments with top specialists in minutes.
              </p>

              {/* Hero Search Bar */}
              <div className="p-2 bg-surface-container-lowest rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 border border-outline-variant/20">
                <div className="flex-1 flex items-center gap-3 px-4 w-full">
                  <span className="material-symbols-outlined text-primary">search</span>
                  <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline/60" placeholder="Specialty, name, or condition" type="text" />
                </div>
                <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                <div className="flex-1 flex items-center gap-3 px-4 w-full">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline/60" placeholder="Location" type="text" />
                </div>
                <button onClick={() => router.push('/doctors')} className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-xl transition-transform active:scale-95">Search</button>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <Img width={500} height={500} className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfQY041qksFAKmADSXxMD-NN9ZMuxK64pnKJqLZhauXSy3l-2H2xDI8Tbu6zTgCYeAssIqQJ4-O_fEDjmhGHwJi34WFHDhGdT9Vy3MtNxPlmWsl1AM112yeoaVpv47pek7gSzczXBkd2u-tJ-_X0fc5UTyeI5bRg9vzG9bTJJU1U0FRGCKbAFgCahSY_ZweuTipsP8Fv4QeF2Wf7jOhyzg4Nb8_84JYbeGu0Ae2xPS9Y4niJMzozBBhDChFoD5ItAD8lAB-Tb36hM" alt="doctor" />
                  <Img width={500} height={500} className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2BfM3xlxA8O0WEY0A569j2YE0P81NDG5FOnDD2dQbrQrTDaiQtoZnsGv9bX41JOaLvlnLZUntcePUAPjMIo0ZCaY4SsYsHJzfD8dffcF8uLNKpNvobtxyaIrJzJASN7aP0ChLEQLOT96OJXUe80X8PJ8QqBIq8LGe4t7hnofOFbvfCwUYEU6PghpPPqAN4VGN4GFjnppgBx3XHI_JLcMwGKf8Y7gNQOZ2QefZutwzdg2XexxYdIHDkdfGrnq3ICqt49ofQALRZKs" alt="doctor" />
                  <Img width={500} height={500} className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD40zkamozLAfauKZQgODKbPUs-Ntyr4M3MbVvEMXVVnu_xglWwP4nQr06kR_lcG2h74RG33X5ogCWUs7L3xFuLW3VnNzMOi1jU_R5cMAa1kgZvnpJlfAIfCSjretKdwX_B3ri_7LnV8517AlfVOx1-7BvCiYGe9zQzk8m5Edk-ehdGqcaQFrCRiuT0fZYDqqGtEvHUpAl6Zgkucndor0V08wegUkMygk_eloRn6eC3alXm_uOK73bJevBK-joMUdFvljEx_M_HtqM" alt="doctor" />
                </div>
                <p className="text-sm text-on-surface-variant font-medium">Join 500+ specialized clinicians</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
              <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-2xl">
                <Img width={500} height={500} className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDu91gZQrxbXr9grN30AUxmG2QMGq6G-oupfmOFWO-sD4szJP0A5uM2V9UxEMWFVbblKPyFMRjylnMhw0nNIPi7iSOTsLFNWxLXufBuBPzGh5OoZ0ATOSQSJa41ChC0GAfOPNDzdF3lHMl1Cn-v4DGEFImeFIo3xB7zHeL2qtuUgrr6M-1dfOqK07EZidGenHvVWypqsgUgesLcl65Eo3dfNm8wsfYcgyQ91SlaDirv57ev3A_E9Dw7qlQqo1aMG4qOZPHKjCQDCU" alt="clinic" loading='eager' />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary">video_call</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Next Consultation</p>
                      <p className="text-xs text-on-surface-variant">Starting in 15 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="py-24 bg-surface-container-low px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-4xl font-bold tracking-tight mb-4">Our Top-Rated Specialists</h2>
                <p className="text-on-surface-variant">Qualified professionals across multiple disciplines.</p>
              </div>
              <button onClick={() => router.push('/doctors')} className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                View all specialties <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor: Doctor) => (
                <div key={doctor.id} className="bg-surface-container-lowest p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl group">
                  <div className="relative mb-4 rounded-xl overflow-hidden aspect-square">
                    <Img width={500} height={500} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" src={doctor.profileImage} alt={`${doctor.firstName} ${doctor.lastName}`} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {doctor.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Dr. {doctor.firstName} {doctor.lastName}</h3>
                  <p className="text-primary text-sm font-semibold mb-4">{doctor.specialty}</p>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-6">
                    <span className="material-symbols-outlined text-sm">location_on</span> {doctor.location}
                  </div>
                  <button onClick={() => router.push(`/doctors/${doctor.id}`)} className="w-full py-3 bg-surface-container-high rounded-xl font-bold text-sm hover:bg-primary hover:text-on-primary transition-colors">Book Appointment</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Seamless Healthcare Journey</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
                Skip the waiting room. Our streamlined process connects you with experts in three simple steps.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-primary/10 -z-10"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-8 border border-outline-variant/30 transition-all group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:-translate-y-2">
                  <span className="material-symbols-outlined text-3xl">person_search</span>
                </div>
                <div className="bg-primary-fixed text-on-primary-fixed text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-4">1</div>
                <h3 className="text-xl font-bold mb-3">Find Doctor</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Search by name, specialty, or hospital to find the perfect medical match for your needs.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-8 border border-outline-variant/30 transition-all group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:-translate-y-2">
                  <span className="material-symbols-outlined text-3xl">event_available</span>
                </div>
                <div className="bg-primary-fixed text-on-primary-fixed text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-4">2</div>
                <h3 className="text-xl font-bold mb-3">Choose Time</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  View real-time availability and select a slot that fits perfectly into your busy schedule.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-8 border border-outline-variant/30 transition-all group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:-translate-y-2">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <div className="bg-primary-fixed text-on-primary-fixed text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-4">3</div>
                <h3 className="text-xl font-bold mb-3">Book Appointment</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Confirm your booking instantly and receive automated reminders via email or SMS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-linear-to-br from-primary to-blue-700 p-12 lg:p-24 relative overflow-hidden text-center lg:text-left">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-8">Ready to prioritize your health?</h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button onClick={() => router.push('/signup')} className="px-10 py-5 bg-white text-primary font-bold rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all">Get Started</button>
                  <button onClick={() => router.push('/doctor-signup')} className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl text-lg hover:bg-white/10 transition-all">Join as Doctor</button>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 max-w-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">12k+ Doctors</p>
                      <p className="text-white/60 text-xs">Ready to assist you today</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 bg-white/20 rounded-full w-full"></div>
                    <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span onClick={() => router.push('/')} className="text-xl font-bold tracking-tighter text-slate-900 cursor-pointer">MedReserve</span>
            <p className="font-inter text-xs text-slate-500 max-w-xs">
              © 2024 MedReserve Clinical Systems. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Privacy Policy</a>
            <a className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Terms of Service</a>
            <a className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Contact Support</a>
          </div>
          <div className="flex gap-4">
            <a className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">language</span>
            </a>
            <a className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;