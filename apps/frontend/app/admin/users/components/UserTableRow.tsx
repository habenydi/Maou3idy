'use client';

import Img from 'next/image';
import { UserRow } from "@/types/user";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  user: UserRow;
}

export default function UserTableRow({ user }: Props) {
  const date = new Date("2026-06-26T08:43:29.189Z");

  const formatted = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBg0DvHSMBLnbe0iqPg8jcrfQPpcxc-lygCetMOLec3vSYBDi3V6UMvUhrdTV6B3nkQc4DgRRhb5niwbt76rX-WnFiMwy7rF98jBoXpgoxI6M2B2wEfHqMnA9Gu1d97sZrd3hsCwsePN7rR6i540KrwJRa3KE2dAmL-uYI-Yq7OFNUNcOXwyc3Djr5ifXYOv_EnAgJoWjmxw-SigYj-shqMZE8H_Q878pPFR62zvhwxj-RXz2uqLVX-18wsFGB9uYzI5Y7PPeNATvA";
  return (
    <div className="grid grid-cols-6 items-center px-6 py-4 bg-surface-container-lowest rounded-xl hover:bg-surface-bright group">
      <div className="col-span-2 flex items-center gap-4">
        <Img
        width={40}
          height={40}
          src={user.avatar ? user.avatar : defaultAvatar}
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

      <div>{formatted}</div>

      <div>
        <UserStatusBadge status={user.status} />
      </div>

      <div className="flex justify-end gap-2">
        {/* actions */}
      </div>
    </div>
  );
}