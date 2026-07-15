'use client';

import { useRouter } from 'next/navigation';
import ProfileMenuHeader from './ProfileMenuHeader';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileMenuFooter from './ProfileMenuFooter';

interface User {
  name: string;
  email: string;
  role: string;
}

interface ProfileMenuProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileMenu({
  user,
  onLogout,
}: ProfileMenuProps) {
  const router = useRouter();

  return (
    <div className="
      absolute
      right-0
      top-14
      w-80
      bg-white
      rounded-2xl
      border
      border-slate-200
      shadow-xl
      overflow-hidden
      z-50
    ">
      <ProfileMenuHeader
        name={user.name}
        email={user.email}
      />

      <div className="border-t border-slate-200 py-2">
        {(user.role === 'ADMIN' || user.role === 'DOCTOR') && (
          <ProfileMenuItem
            icon="dashboard"
            label="Dashboard"
            onClick={() =>
              router.push(
                user.role === 'ADMIN'
                  ? '/admin/dashboard'
                  : '/doctor/dashboard'
              )
            }
          />
        )}

        <ProfileMenuItem
          icon="person"
          label="Profile"
          onClick={() =>
            router.push(
              user.role === 'ADMIN'
                ? '/admin/profile'
                : user.role === 'DOCTOR'
                ? '/doctor/profile'
                : '/profile'
            )
          }
        />

        <ProfileMenuItem
          icon="settings"
          label="Settings"
          onClick={() =>
            router.push(
              user.role === 'ADMIN'
                ? '/admin/settings'
                : user.role === 'DOCTOR'
                ? '/doctor/settings'
                : '/settings'
            )
          }
        />

        <ProfileMenuItem
          icon="notifications"
          label="Notifications"
          onClick={() =>
            router.push('/notifications')
          }
        />

        <ProfileMenuItem
          icon="help"
          label="Help Center"
          onClick={() =>
            router.push('/help')
          }
        />
      </div>

      <ProfileMenuFooter onLogout={onLogout} />
    </div>
  );
}