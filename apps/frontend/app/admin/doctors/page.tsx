import AdminHeader from '@/app/admin/components/AdminHeader';
import AdminSidebar from '@/app/admin/components/AdminSidebar';

import ApplicationsHeader from './components/ApplicationsHeader';
import ApplicationFilters from './components/ApplicationFilters';
import ApplicationsTable from './components/ApplicationsTable';
import ApplicationsPagination from './components/ApplicationsPagination';
import ApplicationsSummary from './components/ApplicationsSummary';

export default function DashboardPage() {
  return (
    <>
      <AdminSidebar activePage="doctors" />
      <AdminHeader />

      <main className="ml-64 pt-24 p-8 min-h-screen bg-surface">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <ApplicationsHeader />
          <ApplicationFilters />
        </div>

        <ApplicationsTable />

        <ApplicationsPagination />

        <ApplicationsSummary />
      </main>
    </>
  );
}