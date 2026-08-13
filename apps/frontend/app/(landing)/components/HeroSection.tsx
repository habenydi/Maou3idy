'use client';

import axios from 'axios';
import Img from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type FeaturedDoctor = {
  user: {
    name: string;
    image: string;
  };
};

type nextSession = {
  date: string;
  doctor: {
    name: string;
    specialty: string;
    image: string | null;
  };
};

type stats = {
  totalPatients: number;
  totalSpecialists: number;
  featuredDoctors: FeaturedDoctor[];
};

function formatNumber(num: number) {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }

  return num.toString();
}

export default function HeroSection() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set('search', search);
    }

    if (location.trim()) {
      params.set('location', location);
    }
    router.push(`/specialties?${params.toString()}`);
  };

  const [stats, setStats] = useState<stats>({
    totalPatients: 0,
    totalSpecialists: 0,
    featuredDoctors: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingPageData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + "/users/landing-page"
        , { withCredentials: true });

        setStats(response.data);
      } catch (error) {
        console.error('Error fetching landing page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPageData();
  }, []);

  const [nextSession, setNextSession] = useState<nextSession | null>(null);
  
  useEffect(() => {
    const fetchNextSession = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + '/users/next-session',
          { withCredentials: true }
        );
        setNextSession(response.data);
      } catch (error) {
        console.error('Error fetching next session:', error);
      }
    };

    fetchNextSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
const imageSrc =
  nextSession?.doctor?.image?.startsWith('http') &&
  !nextSession?.doctor?.image?.includes('fonts.googleapis.com')
    ? nextSession.doctor.image
    : nextSession?.doctor?.name
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
          nextSession.doctor.name
        )}`
      : '/default-avatar.png';
  return (
<section className="relative px-4 sm:px-6 py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-wider mb-4 sm:mb-6">{formatNumber(stats.totalPatients)}+ PATIENTS TRUST OUR PLATFORM</span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-4 sm:mb-6">
                Find the right <span className="text-primary">doctor</span> easily
              </h1>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-lg mb-8 sm:mb-10 leading-relaxed">
                Access world-class healthcare from the comfort of your home. Book appointments with top specialists in minutes.
              </p>

              {/* Hero Search Bar */}
              <div className="p-2 bg-surface-container-lowest rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 border border-outline-variant/20">
                <div className="flex-1 flex items-center gap-3 px-4 w-full">
                  <span className="material-symbols-outlined text-primary">search</span>
                  <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline/60" placeholder="Specialty, name, or condition" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="hidden md:block w-px h-8 bg-outline-variant/30"></div>
                <div className="flex-1 flex items-center gap-3 px-4 w-full">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-on-surface placeholder-outline/60" placeholder="Location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <button onClick={handleSearch} className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary font-bold rounded-xl transition-transform active:scale-95">Search</button>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {stats.featuredDoctors.map((doctor, index) => (
                    <Img
                      key={index}
                      width={40}
                      height={40}
                      src={
                        doctor.user.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          doctor.user.name
                        )}`
                      }
                      alt={doctor.user.name}
                      className="w-10 h-10 rounded-full border-2 border-surface object-cover"
                    />
                  ))}
                </div>

                <p className="text-sm text-on-surface-variant font-medium">
                  {loading
                    ? 'Loading...'
                    : `${stats.totalSpecialists}+ specialties • ${stats.totalPatients}+ patients`}
                </p>
              </div>
            </div>

            <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="relative rounded-2xl overflow-hidden aspect-4/5 shadow-2xl">
              <Img
                width={500}
                height={500}
                className="w-full h-full object-cover"
                src={imageSrc}
                alt="clinic"
                loading="eager"
              />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                {nextSession ? (
                  <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary">
                      person
                    </span>
                  </div>

                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        {nextSession.doctor.name}
                      </p>

                      <p className="text-xs text-on-surface-variant">
                        {nextSession.doctor.specialty}
                      </p>

                      <p className="text-xs text-primary font-medium">
                        {new Date(nextSession.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary">
                        video_call
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        No Upcoming Consultation
                      </p>

                      <p className="text-xs text-on-surface-variant">
                        Book an appointment with a specialist
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </section>
  );
}