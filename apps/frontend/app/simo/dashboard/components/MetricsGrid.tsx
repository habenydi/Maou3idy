import MetricCard from './MetricGrid';

const metrics = [
  {
    title: 'Total Users',
    value: '12,450',
    icon: 'person',
    badge: '+12%',
  },
  {
    title: 'Total Doctors',
    value: '842',
    icon: 'medical_information',
    badge: 'Active',
  },
  {
    title: 'Pending Applications',
    value: '15',
    icon: 'pending_actions',
    badge: 'Urgent',
    cardClassName: 'bg-tertiary-fixed',
    iconContainerClassName: 'bg-tertiary-container',
    iconClassName: 'text-white',
  },
  {
    title: 'Monthly Growth',
    value: '+8%',
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