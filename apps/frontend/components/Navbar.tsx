'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/layout';
import { useEffect, useRef, useState } from 'react';
import ProfileMenu from './components/ProfileMenu';

interface NavbarProps {
  activeLink?: 'doctors' | 'specialties' | 'about';
  showAuthButtons?: boolean;
  logoText?: string;
}

export default function Navbar({
  activeLink = 'doctors',
  showAuthButtons = true,
}: NavbarProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:1337/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  if (loading) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span 
            onClick={() => router.push('/')} 
            className="text-xl font-bold tracking-tighter text-slate-900 cursor-pointer"
          >
            Maou<span className="text-blue-500">3</span>idy
          </span>
          <nav className="hidden md:flex items-center gap-6 font-manrope tracking-tight font-semibold">
            <a 
              onClick={() => router.push('/')}
              className={`transition-colors cursor-pointer py-1 ${
                activeLink === 'doctors' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Find Doctors
            </a>
            <a 
              onClick={() => router.push('/patients/specialties')}
              className={`transition-colors cursor-pointer py-1 ${
                activeLink === 'specialties' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              Specialties
            </a>
            <a 
              onClick={() => router.push('/about-us')}
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
          {!user ? (
            <>
              <button
                onClick={() => router.push('/login')}
                className="text-slate-600 font-semibold px-4 py-2 hover:text-blue-700 active:scale-95 duration-200"
              >
                Sign In
              </button>

              <button
                onClick={() => router.push('/doctor-register')}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 duration-200 transition-all"
              >
                Join as Doctor
              </button>
            </>
          ) : (
            <>
              {(user.role === 'ADMIN' || user.role === 'DOCTOR') ? (
                <button
                  onClick={() =>
                    router.push(
                      user.role === 'ADMIN'
                        ? '/admin/dashboard'
                        : '/doctor/dashboard'
                    )
                  }
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 duration-200 transition-all"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => router.push('/doctor-register')}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 duration-200 transition-all"
                >
                  Join as Doctor
                </button>
              )}

              {/* Profile Icon */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="
                    w-11 h-11 rounded-full
                    bg-slate-100
                    hover:bg-slate-200
                    flex items-center justify-center
                    transition-all
                  "
                >
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                </button>

                {menuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMenuOpen(false)}
                    />

                    <ProfileMenu
                      user={user}
                      onLogout={handleLogout}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
      </div>
      <div className="bg-slate-200/50 h-px"></div>
    </header>
  );
}
