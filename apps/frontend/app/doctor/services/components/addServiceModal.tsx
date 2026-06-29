'use client';

import React from 'react';

interface AddServiceModalProps {
  open: boolean;
  onClose: () => void;
}

const AddServiceModal = ({ open, onClose }: AddServiceModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl">
        <div className="border-b border-surface-container p-6">
          <h2 className="text-xl font-bold">Add New Service</h2>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-outline">
              Service Name
            </label>

            <input
              type="text"
              placeholder="e.g. Annual Checkup"
              className="w-full rounded-lg border-0 bg-surface-container-low p-3 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-outline">
                Duration (mins)
              </label>

              <input
                type="number"
                placeholder="30"
                className="w-full rounded-lg border-0 bg-surface-container-low p-3 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-outline">
                Price ($)
              </label>

              <input
                type="number"
                placeholder="100"
                className="w-full rounded-lg border-0 bg-surface-container-low p-3 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 bg-surface-container-low p-6">
          <button
            onClick={onClose}
            className="rounded-lg px-6 py-2 font-semibold text-on-surface hover:bg-surface-container-high"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-primary px-6 py-2 font-bold text-white shadow-lg shadow-primary/10">
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;