import { pricingPlans } from "@/data/landing";

type PricingProps = {
  scrollToId: (id: string) => void;
};

export function Pricing({ scrollToId }: PricingProps) {
  return (
    <section id="pricing" className="relative px-5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[var(--ap-accent)] md:text-sm">
            Planes
          </p>
          <h2 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            Planes para validar el SaaS sin construirlo todo desde el primer
            día.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--ap-muted)] md:text-lg md:leading-8">
            Empieza con una primera versión útil para tu pizzería y escala hacia
            más automatización, CRM, campañas y futuras funciones del panel
            SaaS.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((tier) => (
            <div
              key={tier.name}
              className={`ap-premium-border rounded-3xl border p-6 transition hover:-translate-y-1 md:p-7 ${
                tier.featured
                  ? "border-[var(--ap-accent-dim)] bg-[linear-gradient(180deg,rgba(198,255,95,0.12),rgba(17,19,24,0.88))]"
                  : "border-white/10 bg-[var(--ap-card)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black">{tier.name}</p>
                  <p className="mt-1 text-sm text-[var(--ap-muted)]">
                    {tier.tag}
                  </p>
                </div>

                {tier.featured && (
                  <span className="rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-3 py-1 text-xs font-black text-black">
                    Más popular
                  </span>
                )}
              </div>

              <div className="mt-7">
                <p className="text-sm text-[var(--ap-muted)]">Setup desde</p>
                <p className="text-4xl font-black">{tier.setup}</p>
                <p className="mt-2 text-sm text-[var(--ap-muted)]">
                  + {tier.monthly}
                </p>
              </div>

              <button
                onClick={() => scrollToId("cta")}
                className={`mt-7 w-full rounded-full px-5 py-4 text-sm font-black transition hover:-translate-y-0.5 ${
                  tier.featured
                    ? "bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] text-black shadow-[0_16px_44px_var(--ap-accent-glow)]"
                    : "border border-white/15 bg-white/[0.06] text-white hover:border-white/25 hover:bg-white/[0.1]"
                }`}
              >
                {tier.featured ? "Quiero este plan" : tier.cta}
              </button>

              <ul className="mt-7 space-y-3 text-sm text-[var(--ap-muted)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-[var(--ap-accent)]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
