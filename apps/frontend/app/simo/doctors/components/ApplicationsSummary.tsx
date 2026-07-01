import SummaryCard from './SummaryCard';

export default function ApplicationsSummary() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="New Submissions"
        value="+12"
        description="Applications received this week"
        icon="pending_actions"
        bg="bg-primary-fixed-dim/20"
      />

      <SummaryCard
        title="Response Time"
        value="4.2d"
        description="Average time to initial review"
        icon="timer"
        bg="bg-secondary-fixed/30"
      />

      <SummaryCard
        title="Verified Rate"
        value="88%"
        description="Credentialing success rate"
        icon="verified_user"
        bg="bg-surface-container-low"
      />
    </div>
  );
}