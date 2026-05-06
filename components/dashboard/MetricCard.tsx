import { DashboardCard } from "./DashboardCard";

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <DashboardCard>
      <p className="text-sm text-[var(--ap-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[var(--ap-accent)]">
        {detail}
      </p>
    </DashboardCard>
  );
}
