import ProfileHeader from './components/ProfileHeader';
import PatientStats from './components/PatientStats';
import PersonalInformation from './components/PersonalInformation';
import EmergencyContact from './components/EmergencyContact';
import RecentActivity from './components/RecentActivity';

export default async function ProfilePage() {
  // Replace with API calls
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'PATIENT',
    image: '',
    phone: '+1 234 567 890',
    address: 'New York, USA',
    gender: 'Male',
    birthDate: '12 May 1998',
  };

  const stats = [
    {
      label: 'Appointments',
      value: 18,
      icon: 'calendar_month',
    },
    {
      label: 'Favorite Doctors',
      value: 6,
      icon: 'favorite',
    },
    {
      label: 'Reviews',
      value: 12,
      icon: 'star',
    },
    {
      label: 'Medical Records',
      value: 24,
      icon: 'folder_open',
    },
  ];

  const emergencyContact = {
    name: 'Jane Doe',
    phone: '+1 987 654 321',
    relationship: 'Sister',
  };

  const activities = [
    {
      title: 'Booked an appointment with Dr. Smith',
      time: '2 hours ago',
    },
    {
      title: 'Added a review',
      time: 'Yesterday',
    },
    {
      title: 'Updated profile information',
      time: '3 days ago',
    },
  ];

  return (
    <main className="min-h-screen bg-surface p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProfileHeader
          name={user.name}
          email={user.email}
          role={user.role}
          image={user.image}
        />

        <PatientStats stats={stats} />

        <div className="grid lg:grid-cols-2 gap-8">
          <PersonalInformation
            email={user.email}
            phone={user.phone}
            address={user.address}
            gender={user.gender}
            birthDate={user.birthDate}
          />

          <EmergencyContact
            name={emergencyContact.name}
            phone={emergencyContact.phone}
            relationship={emergencyContact.relationship}
          />
        </div>

        <RecentActivity activities={activities} />
      </div>
    </main>
  );
}