import SettingsSection from "./SettingsSection";

export default function SecuritySettings() {
  return (
    <SettingsSection
      title="Security"
      description="Manage password and account security."
    >
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div className="flex items-center justify-between rounded-xl bg-surface-container p-4">
          <div>
            <h4 className="font-semibold">
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-on-surface-variant">
              Add an extra layer of security.
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold">
          Update Security
        </button>
      </div>
    </SettingsSection>
  );
}