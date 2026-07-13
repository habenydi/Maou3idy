import SettingsSection from "./SettingsSection";
import { User} from "@/app/layout";
interface ProfileSettingsProps {
  user: User;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  return (
    <SettingsSection
      title="Profile Information"
      description="Manage your personal account details."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder={user.name}
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder={user.email}
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="+212 6 12 34 56 78"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Profile Photo
          </label>

          <input
            type="file"
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Biography
          </label>

          <textarea
            rows={4}
            placeholder="Tell patients about yourself..."
            className="w-full px-4 py-3 rounded-xl border border-outline/20 bg-surface resize-none"
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