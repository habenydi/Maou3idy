"use client";

import ProfileHeader from "./components/ProfileHeader";
import PatientStats from "./components/PatientStats";
import PersonalInformation from "./components/PersonalInformation";
import BackButton from "@/components/BackButton"
import { useEffect, useState } from "react";
import axios from "axios";
import EditProfileModal from "./components/EditProfileModal";

interface User {
  name: string;
  email: string;
  role: string;
  image?: string | null;
  phone?: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/users/my-data`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-on-surface-variant">
          User not found.
        </p>
      </div>
    );
  }

  const stats = [
    { label: "Appointments", value: 18, icon: "calendar_month" },
    { label: "Favorite Doctors", value: 6, icon: "favorite" },
    { label: "Reviews", value: 12, icon: "star" },
    { label: "Medical Records", value: 24, icon: "folder_open" },
  ];

  return (
    <main className="min-h-screen bg-surface p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <BackButton />

        <ProfileHeader
          name={user.name}
          email={user.email}
          role={user.role}
          image={user.image ?? undefined}
          setEditOpen={setEditOpen}
        />

        <PatientStats stats={stats} />

        <div className="grid lg:grid-cols-2 gap-8">
          <PersonalInformation
            email={user.email}
            phone={user.phone ?? ""}
            address=""
            birthDate=""
          />
        </div>
      </div>
      {editOpen && (
        <EditProfileModal
          onClose={() => setEditOpen(false)}
          user={{
            name: user.name,
            email: user.email,
            role: user.role,
            }}
        />
      )}
    </main>
  );
}