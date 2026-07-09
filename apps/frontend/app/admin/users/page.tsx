import AdminHeader from "@/app/admin/components/AdminHeader";
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import UsersPageHeader from "./components/UsersPageHeader";
import UsersStatsGrid from "./components/UsersStatsGrid";
import UsersTable from "./components/UsersTable";
import UsersPagination from "./components/UsersPagination";
import FloatingAddUserButton from "./components/FloatingAddUserButton";
import { getDashboardStats } from "@/lib/admin/dashboard";
import axios from "axios";

export default async function DashboardPage() {
  const data = await getDashboardStats();

  const response = await axios.get(
    "http://localhost:1337/admin/users"
  );

  const users = response.data.users;

  return (
    <>
      <AdminSidebar activePage="users" />

      <main className="ml-64 min-h-screen flex flex-col">
        <AdminHeader />

        <section className="mt-16 p-8 flex-1">
          <div className="max-w-7xl mx-auto space-y-8">
            <UsersPageHeader />

            <UsersStatsGrid stats={data.stats} />

            <UsersTable users={users} />

            <UsersPagination />
          </div>
        </section>
      </main>

      <FloatingAddUserButton />
    </>
  );
}