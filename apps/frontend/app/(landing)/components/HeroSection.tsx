'use client';

import Img from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
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
  );
}