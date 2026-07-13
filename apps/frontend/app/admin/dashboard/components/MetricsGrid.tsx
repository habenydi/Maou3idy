import axios from 'axios';
import MetricCard from './MetricGrid';

const responce = await axios.get('http://localhost:1337/admin/dashboard', { withCredentials: true });

const metrics = [
  {
    title: 'Total Users',
    value: responce.data.stats.TotalUsers,
    icon: 'person',
    badge: '+12%',
  },
  {
    title: 'Total Doctors',
    value: responce.data.stats.TotalDoctors,
    icon: 'medical_information',
    badge: 'Active',
  },
  {
    title: 'Pending Applications',
    value: responce.data.stats.PendingDoctorApprovals,
    icon: 'pending_actions',
    badge: 'Urgent',
    cardClassName: 'bg-tertiary-fixed',
    iconContainerClassName: 'bg-tertiary-container',
    iconClassName: 'text-white',
  },
  {
    title: 'Monthly Growth',
    value: responce.data.stats.MonthlyGrowth,
    icon: 'trending_up',
    iconContainerClassName: 'bg-green-100',
    iconClassName: 'text-green-700',
  },
];

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          {...metric}
        />
      ))}
    </div>
  );
}