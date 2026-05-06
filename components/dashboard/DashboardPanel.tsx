import type { ReactNode } from "react";

export function DashboardPanel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <section className="ap-premium-border rounded-3xl border bg-[var(--ap-card)] p-5 backdrop-blur-xl md:p-6">
      <div className="mb-5 flex flex-col justify-between gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--ap-accent)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}
