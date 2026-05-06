import type { ReactNode } from "react";

export function DashboardCard({ children }: { children: ReactNode }) {
  return (
    <div className="ap-premium-border rounded-3xl border bg-[var(--ap-card)] p-5 backdrop-blur-xl">
      {children}
    </div>
  );
}
