import { whatsappDemoHref, whatsappInfoHref } from "@/data/landing";

export function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden px-5 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,255,95,0.14),transparent_34%),radial-gradient(circle_at_70%_30%,rgba(82,240,208,0.08),transparent_28%)]" />

      <div className="ap-premium-border relative mx-auto max-w-5xl rounded-3xl border border-[var(--ap-accent-dim)] bg-[linear-gradient(180deg,rgba(22,25,31,0.94),rgba(13,15,19,0.92))] p-7 text-center backdrop-blur-xl md:p-14">
        <p className="mx-auto mb-5 w-fit rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-4 py-2 text-xs font-black text-[var(--ap-accent)] md:text-sm">
          Diagnóstico gratuito por WhatsApp
        </p>

        <h2 className="text-3xl font-black leading-tight md:text-6xl">
          ¿Quieres validar Andres Project for Pizzerías en tu local?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ap-muted)]">
          Escríbeme por WhatsApp y vemos cómo sería la primera versión para tu
          pizzería: pedidos por WhatsApp, carta inteligente, CRM básico,
          reservas, promociones o acceso temprano al futuro panel SaaS.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappDemoHref}
            className="rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-8 py-4 text-base font-black text-black shadow-[0_18px_54px_var(--ap-accent-glow)] transition hover:-translate-y-0.5"
          >
            Quiero automatizar mi pizzería
          </a>

          <a
            href={whatsappInfoHref}
            className="rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-[var(--ap-muted)]">
          <span>✓ Respuesta rápida</span>
          <span>✓ Diagnóstico en 24h</span>
          <span>✓ Sin compromiso</span>
          <span>✓ Ideal para pizzerías piloto</span>
        </div>
      </div>
    </section>
  );
}
