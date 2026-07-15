'use client';

export default function SecuritySettings() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-6">
        Security
      </h2>

      <div className="space-y-4">
        <button className="w-full py-3 rounded-xl border">
          Logout From All Devices
        </button>

        <button className="w-full py-3 rounded-xl border border-red-300 text-red-600">
          Delete Account
        </button>
      </div>
    </div>
  );
}