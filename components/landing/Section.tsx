import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative px-5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--ap-accent)] md:text-sm">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--ap-muted)] md:text-lg md:leading-8">
            {lead}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}
