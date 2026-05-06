type HeroProps = {
  scrollToId: (id: string) => void;
};

export function Hero({ scrollToId }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(198,255,95,0.16),transparent_30%),radial-gradient(circle_at_78%_12%,rgba(82,240,208,0.1),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,10,0.12),rgba(7,8,10,0.94))]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-4 py-2 text-xs font-bold text-[var(--ap-accent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:text-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--ap-accent)] shadow-[0_0_18px_var(--ap-accent)]" />
            SaaS en desarrollo para pizzerías locales
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.02] md:text-6xl lg:text-7xl">
            Andres Project for Pizzerías ordena pedidos, clientes y{" "}
            <span className="text-[var(--ap-accent)]">WhatsApp</span> con
            automatización IA.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--ap-muted)] md:mt-7 md:text-xl md:leading-8">
            Un sistema digital para pizzerías locales que quieren gestionar
            pedidos por WhatsApp, reservas, clientes frecuentes, promociones y
            crecimiento sin depender de procesos manuales.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToId("cta")}
              className="rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-7 py-4 text-base font-black text-black shadow-[0_18px_54px_var(--ap-accent-glow)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_64px_var(--ap-accent-glow)]"
            >
              Quiero automatizar mi pizzería
            </button>

            <button
              onClick={() => scrollToId("services")}
              className="rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1]"
            >
              Ver funciones →
            </button>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-[var(--ap-muted)]">
            <span>✓ Diagnóstico sin coste</span>
            <span>✓ Pedidos + clientes + reservas</span>
            <span>✓ Primera versión en 7 días</span>
            <span>✓ Panel SaaS en desarrollo</span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 text-xs font-semibold text-[var(--ap-dim)] sm:grid-cols-3">
            {[
              "Pedidos WhatsApp",
              "Carta inteligente",
              "CRM clientes",
              "Reservas mesa",
              "Promociones",
              "Panel SaaS",
            ].map((logo) => (
              <div
                key={logo}
                className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                {logo}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium text-[var(--ap-dim)]">
            Componentes que se pueden combinar según el momento y el proceso
            real de cada pizzería.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-[linear-gradient(135deg,rgba(198,255,95,0.16),rgba(82,240,208,0.08))] blur-3xl" />

          <div className="ap-premium-border relative rounded-3xl border bg-[var(--ap-card)] p-3 backdrop-blur-xl md:p-4">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 md:p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-bold">Pedido asistido por IA</p>
                  <p className="text-xs text-[var(--ap-muted)]">
                    WhatsApp · Carta · CRM · Reservas
                  </p>
                </div>
                <span className="rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--ap-accent)]">
                  Online
                </span>
              </div>

              <div className="space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.08] p-4 text-sm text-white">
                  Hola, ¿tenéis promoción familiar para esta noche?
                </div>

                <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] p-4 text-sm font-semibold text-black">
                  Sí. Tenemos combo familiar con 2 pizzas, bebida y entrante.
                  ¿Recogida o reparto?
                </div>

                <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.08] p-4 text-sm text-white">
                  Reparto, por favor.
                </div>

                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] p-4 text-sm font-semibold text-black">
                  Perfecto. Te pido dirección, nombre y hora aproximada para
                  dejar el pedido preparado.
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  ["<5s", "Respuesta"],
                  ["CRM", "Clientes"],
                  ["SaaS", "Panel"],
                ].map(([n, t]) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-4"
                  >
                    <p className="text-xl font-black text-[var(--ap-accent)]">
                      {n}
                    </p>
                    <p className="text-xs text-[var(--ap-muted)]">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
