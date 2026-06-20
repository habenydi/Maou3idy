'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

const Services = () => {
  const router = useRouter();
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
        <div className="bg-surface-container-lowest rounded-xl p-2">
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-4 text-[11px] font-bold text-outline tracking-widest uppercase">Service Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-outline tracking-widest uppercase">Duration</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-outline tracking-widest uppercase">Price</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-outline tracking-widest uppercase">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-outline tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {services.map((service) => (
                  <tr key={service.id} className="group hover:bg-surface-bright transition-colors rounded-xl">
                    <td className="px-6 py-5 bg-surface-container-low/30 group-hover:bg-transparent rounded-l-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">{service.icon}</span>
                        </div>
                        <span className="font-semibold text-on-surface">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 bg-surface-container-low/30 group-hover:bg-transparent">
                      <span className="text-on-surface-variant font-medium">{service.duration} Minutes</span>
                    </td>
                    <td className="px-6 py-5 bg-surface-container-low/30 group-hover:bg-transparent">
                      <span className="font-bold text-on-surface">${service.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-5 bg-surface-container-low/30 group-hover:bg-transparent">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          service.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-surface-variant text-outline'
                        }`}
                      >
                        {service.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </td>
                    <td className="px-6 py-5 bg-surface-container-low/30 group-hover:bg-transparent rounded-r-xl text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-outline hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button className="p-2 text-outline hover:text-error hover:bg-error/5 rounded-lg transition-all">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center px-4 py-6 border-t border-slate-200 gap-4">
          <span className="font-inter text-xs text-slate-500">© 2024 MedReserve Clinical Systems. All rights reserved.</span>
          <div className="flex gap-6">
            <a onClick={() => router.push('#')} className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Privacy Policy</a>
            <a onClick={() => router.push('#')} className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Terms of Service</a>
            <a onClick={() => router.push('#')} className="font-inter text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30 cursor-pointer">Contact Support</a>
          </div>
        </footer>

        {/* Add Service Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-surface-container">
                <h2 className="text-xl font-bold">Add New Service</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Service Name</label>
                  <input className="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary/20 p-3" placeholder="e.g. Annual Checkup" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Duration (mins)</label>
                    <input className="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary/20 p-3" placeholder="30" type="number" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-2">Price ($)</label>
                    <input className="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary/20 p-3" placeholder="100" type="number" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-surface-container-low flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-6 py-2 text-on-surface font-semibold hover:bg-surface-container-high rounded-lg transition-colors">Cancel</button>
                <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/10">Save Service</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;
