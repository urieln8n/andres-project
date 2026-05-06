import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="ap-premium-border rounded-3xl border bg-[var(--ap-card)] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--ap-accent-dim)] hover:bg-[var(--ap-card-strong)] md:p-6">
      {children}
    </div>
  );
}
