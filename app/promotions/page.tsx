import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  aiPromotionIdeas,
  mockPromotions,
  promotionSummary,
} from "@/data/promotions";

export const metadata: Metadata = {
  title: "Promociones | Andres Project for Pizzerías",
};

export default function PromotionsPage() {
  return (
    <DashboardShell
      title="Promociones"
      description="Campañas mock para planificar descuentos, canales sugeridos e ideas de promociones antes de conectar automatizaciones reales."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {promotionSummary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5">
        <DashboardPanel title="Listado de promociones" eyebrow="Growth">
          <div className="grid gap-4 lg:grid-cols-2">
            {mockPromotions.map((promotion) => (
              <article
                key={promotion.id}
                className="flex min-h-[300px] flex-col rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {promotion.name}
                    </h3>
                    <p className="mt-2 w-fit rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-[var(--ap-muted)]">
                      {promotion.channel}
                    </p>
                  </div>
                  <StatusBadge status={promotion.status} />
                </div>

                <p className="mt-5 flex-1 text-sm leading-6 text-[var(--ap-muted)]">
                  {promotion.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                      Descuento
                    </p>
                    <p className="mt-2 text-sm font-black text-[var(--ap-accent)]">
                      {promotion.discount}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                      Inicio
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">
                      {promotion.startDate}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                      Fin
                    </p>
                    <p className="mt-2 text-sm font-bold text-white">
                      {promotion.endDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 min-h-12 rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] px-5 text-sm font-black text-black transition hover:bg-white"
                >
                  Enviar promoción
                </button>
              </article>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Ideas de promociones generadas por IA" eyebrow="IA mock">
          <div className="grid gap-4 md:grid-cols-3">
            {aiPromotionIdeas.map((idea) => (
              <article
                key={idea.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
              <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">
                    {idea.title}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-[var(--ap-muted)]">
                    {idea.channel}
                  </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--ap-muted)]">
                  {idea.reason}
              </p>
              <p className="mt-4 text-sm font-black text-[var(--ap-accent)]">
                  {idea.suggestedDiscount}
              </p>
                <button
                  type="button"
                  className="mt-5 min-h-11 w-full rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white transition hover:border-[var(--ap-accent-dim)] hover:bg-white/[0.1]"
                >
                  Usar idea
                </button>
              </article>
            ))}
          </div>
        </DashboardPanel>
      </section>
    </DashboardShell>
  );
}
