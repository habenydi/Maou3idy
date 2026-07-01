type DashboardHeaderProps = {
  name?: string;
};

export default function DashboardHeader({
  name = 'Patient',
}: DashboardHeaderProps) {
  return (
    <section className="mb-12">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        My Dashboard
      </h1>
      <p className="text-on-surface-variant text-lg">
        Welcome{name ? `, ${name}` : ''}. Manage your appointments and health
        records here.
      </p>
    </section>
  );
}