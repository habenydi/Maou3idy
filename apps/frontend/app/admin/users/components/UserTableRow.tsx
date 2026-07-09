'use client';

import Img from 'next/image';
import { UserRow } from "@/types/user";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  user: UserRow;
}

export default function UserTableRow({ user }: Props) {
  return (
    <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright group">
      <div className="col-span-2 flex items-center gap-4">
        <Img
        width={40}
          height={40}
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="font-bold text-on-surface">
            {user.name}
          </p>

          <p className="text-xs text-slate-500">
            {user.email}
          </p>
        </div>
      </div>

      <div>
        <UserRoleBadge role={user.role} />
      </div>

      <div>{user.joinDate}</div>

      <div>
        <UserStatusBadge status={user.status} />
      </div>

      <div className="flex justify-end gap-2">
        {/* actions */}
      </div>
    </div>
  );
}