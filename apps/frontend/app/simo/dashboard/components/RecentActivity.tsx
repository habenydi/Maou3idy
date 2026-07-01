import ActivityItem from './ActivityItem';

const activities = [
  {
    title: 'Dr. Elena Rodriguez',
    description: 'Approved for Cardiology Dept.',
    time: '2 mins ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmvwIVbqciF1q1vP8ev2UyQwitEyRBm2jmRPlfgL_tnK7fjSFCgHuU_j72T_LTNhg4dqMhlXWXffYF-QvtIok8CajfBw1srtqcFhrgF7HjoBWVF6hRqnbdqr3n_HffHYg0Rm9psJgrnRKUa7N-NgZxt2NjQ5ekKn0IlPbIM0Nde4EMa4AW_5dJ1uK-5P3ct4slnvw-pphq5ectk8alzXR6M1PLe-ZxUjFSetRBrj1GHf1hAMT2A3BbsgAmxo7S2zVlnR4aZjB35iI',
  },
  {
    title: 'System Alert',
    description:
      'New medical license verification pending for Dr. Aris Thorne.',
    time: '45 mins ago',
    icon: 'assignment_late',
    iconBg: 'bg-tertiary-container',
  },
  {
    title: 'Dr. Marcus Chen',
    description: 'Updated schedule for July.',
    time: '3 hours ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGhJRP_U3FeuGZ4z8Phn3za6Isft4_syIdPoQVvMUSpXuq2SyzPE-zdGx56m0cWq08dyY4bixz--l3p7kkPf5_VUaMa7sFCTOL9DY0rPqRswDxcNdpfeyzIfmacd7l35NehoumY78iJE1LzugoE-i-IC5mx8FaQ6LwzhuxiVERBbtNGm0lPbFBfPt54t4AgsPg2mcWE7mQC_JTUP7FywbY2KAiEvqiDEQcnCLbJSoKHqmk8vKGXor5Emy3rZ3Osd1dv9iZ-phUHoI',
  },
  {
    title: 'New Registration',
    description:
      '5 new patient accounts created in the last hour.',
    time: '1 hour ago',
    icon: 'person_add',
  },
];

export default function RecentActivity() {
  return (
    <div className="p-8 rounded-xl bg-surface-container-lowest">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-on-surface">
          Recent Activity
        </h3>

        <button className="text-primary text-xs font-bold hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <ActivityItem
            key={`${activity.title}-${activity.time}`}
            {...activity}
          />
        ))}
      </div>
    </div>
  );
}