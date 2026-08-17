import axios from 'axios';
import PulseCard from './PulseCard';

const responce = await axios.get(process.env.NEXT_PUBLIC_URL + '/admin/dashboard', { withCredentials: true });

export default function PlatformPulse() {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-6">
        Real-time Platform Pulse
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PulseCard
          title="API Response Time"
          value={responce.data.stats.ApiResponseTime}
          unit="ms"
          icon="bolt"
          bg="bg-primary-fixed-dim"
        />

        <PulseCard
          title="Active Sessions"
          value={responce.data.stats.ActiveSessions}
          unit="Live"
          icon="sensor_occupied"
          bg="bg-surface-container-high"
        />

        <PulseCard
          title="Server Uptime"
          value={responce.data.stats.ServerUptime}
          unit="%"
          icon="cloud_done"
          bg="bg-surface-container-highest"
        />
      </div>
    </div>
  );
}