'use client';
import AdminHeader from "@/app/simo/components/AdminHeader";
import AdminSidebar from "@/app/simo/components/AdminSidebar";

import UsersPageHeader from "./components/UsersPageHeader";
import UsersStatsGrid from "./components/UsersStatsGrid";
import UsersTable from "./components/UsersTable";
import UsersPagination from "./components/UsersPagination";
import FloatingAddUserButton from "./components/FloatingAddUserButton";

export default function DashboardPage() {
  const users = [
    {
      id: 1,
      name: "Julianne White",
      email: "julianne.w@clinic.com",
      role: "Doctor" as const,
      status: "Active" as const,
      joinDate: "Oct 12, 2023",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBg0DvHSMBLnbe0iqPg8jcrfQPpcxc-lygCetMOLec3vSYBDi3V6UMvUhrdTV6B3nkQc4DgRRhb5niwbt76rX-WnFiMwy7rF98jBoXpgoxI6M2B2wEfHqMnA9Gu1d97sZrd3hsCwsePN7rR6i540KrwJRa3KE2dAmL-uYI-Yq7OFNUNcOXwyc3Djr5ifXYOv_EnAgJoWjmxw-SigYj-shqMZE8H_Q878pPFR62zvhwxj-RXz2uqLVX-18wsFGB9uYzI5Y7PPeNATvA",
    },
  ];
  return (
    <>
      <AdminSidebar activePage="users" />

      <main className="ml-64 min-h-screen flex flex-col">
        <AdminHeader />

        <section className="mt-16 p-8 flex-1">
          <div className="max-w-7xl mx-auto space-y-8">
            <UsersPageHeader />

            <UsersStatsGrid />

            <UsersTable users={users} />

            <UsersPagination />
          </div>
        </section>
      </main>

      <FloatingAddUserButton />
    </>
  );
}