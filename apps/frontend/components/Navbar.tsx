'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  activeLink?: 'doctors' | 'specialties' | 'about';
  showAuthButtons?: boolean;
  logoText?: string;
}

export default function Navbar({
  activeLink = 'doctors',
  showAuthButtons = true,
  logoText = 'MedReserve'
}: NavbarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(Boolean(token));
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span 
            onClick={() => router.push('/')} 
            className="text-xl font-bold tracking-tighter text-slate-900 cursor-pointer"
          >
            {logoText}
          </span>
          <nav className="hidden md:flex items-center gap-6 font-manrope tracking-tight font-semibold">
            <a 
              onClick={() => router.push('/patients/doctor')}
              className={`transition-colors cursor-pointer py-1 ${
                activeLink === 'doctors' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Find Doctors
            </a>
            <a 
              onClick={() => router.push('/specialties')}
              className={`transition-colors cursor-pointer py-1 ${
                activeLink === 'specialties' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Specialties
            </a>
            <a 
              className={`transition-colors cursor-pointer py-1 ${
                activeLink === 'about' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              About Us
            </a>
          </nav>
        </div>

        {showAuthButtons && (
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => router.push('/login')}
                  className="text-slate-600 font-semibold px-4 py-2 hover:text-blue-700 active:scale-95 duration-200"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => router.push('/register-doctor')}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 duration-200 transition-all"
                >
                  Join as Doctor
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => router.push('/patients/dashboard')}
                  className="text-slate-600 font-semibold px-4 py-2 hover:text-blue-700 active:scale-95 duration-200"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('user_id');
                    router.push('/login');
                  }}
                  className="bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 duration-200 transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="bg-slate-200/50 h-px"></div>
    </header>
  );
}
