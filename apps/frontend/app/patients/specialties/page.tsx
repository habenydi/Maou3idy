'use client';

import Navbar from '@/components/Navbar';
import InformationFooter from '@/components/InformationFooter';

import SearchSection from './components/SearchSection';
import FilterSidebar from './components/FilterSidebar';
import DoctorGrid from './components/DoctorGrid';
import DoctorListHeader from './components/DoctorListHeader';
import Pagination from './components/Pagination';

export default function DoctorPage() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar activeLink="specialties" />

      <main className="pt-24 pb-12 max-w-screen-2xl mx-auto px-6">
        <SearchSection />

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />

          <div className="flex-1">
            <DoctorListHeader />
            <DoctorGrid />
            <Pagination />
          </div>
        </div>
      </main>

      <InformationFooter />
    </div>
  );
}