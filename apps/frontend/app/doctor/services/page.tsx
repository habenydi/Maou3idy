'use client';

import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import TableSection from './components/tableSection';
import AddServiceModal from './components/addServiceModal';
import InformationFooter from '@/components/InformationFooter';

const Services = () => {
  const [services] = useState([
    { id: 1, name: 'Cardiac Consultation', duration: 45, price: 150.0, status: 'active', icon: 'ecg' },
    { id: 2, name: 'Echocardiogram (ECG)', duration: 30, price: 280.0, status: 'active', icon: 'monitor_heart' },
    { id: 3, name: 'Stress Test Analysis', duration: 60, price: 320.0, status: 'paused', icon: 'pulse_alert' },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-surface min-h-screen p-8 md:p-12 overflow-y-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Services Management</h1>
            <p className="text-on-surface-variant font-medium">Define and manage your clinical offerings and pricing.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-linear-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold text-sm shadow-lg shadow-primary/10 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Service
          </button>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-surface-container-low p-6 rounded-xl border-0 flex flex-col">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Active Services</span>
            <span className="text-4xl font-headline font-black text-on-surface">12</span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border-0 flex flex-col">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Average Price</span>
            <span className="text-4xl font-headline font-black text-on-surface">$145</span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-xl border-0 flex flex-col">
            <span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Utilization</span>
            <span className="text-4xl font-headline font-black text-on-surface">88%</span>
          </div>
        </div>

        {/* Table Section */}
        <div>
          <TableSection services={services} />
        </div>
        {/* Pagination Footer */}
        <InformationFooter />

        {/* Add Service Modal */}
        {showModal && (<AddServiceModal
          open={showModal}
          onClose={() => setShowModal(false)} />)
        }
      </main>
    </div>
  );
};

export default Services;
