import SettingsSection from "./SettingsSection";

export default function ProfessionalSettings() {
  return (
    <SettingsSection
      title="Professional Information"
      description="Manage your medical credentials and professional details."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Specialty
          </label>
          <input
            type="text"
            placeholder="Cardiology"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            License Number
          </label>
          <input
            type="text"
            placeholder="MED-123456"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Years of Experience
          </label>
          <input
            type="number"
            placeholder="10"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Consultation Fee
          </label>
          <input
            type="number"
            placeholder="300"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Clinic / Hospital
          </label>
          <input
            type="text"
            placeholder="Casablanca Medical Center"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold">
          Save Changes
        </button>
      </div>
    </SettingsSection>
  );
}