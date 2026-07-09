interface Props {
  role: string;
}

export default function UserRoleBadge({ role }: Props) {
  if (role === "Doctor") {
    return (
      <span className="px-3 py-1 bg-secondary-container/30 text-on-secondary-container text-[11px] font-bold rounded-full">
        Doctor
      </span>
    );
  }

  return (
    <span className="px-3 py-1 bg-surface-container-highest text-on-surface text-[11px] font-bold rounded-full">
      Patient
    </span>
  );
}