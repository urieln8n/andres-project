import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  customers,
  promotions,
  reviews,
  salesSummary,
  todayOrders,
  topProducts,
  whatsappAutomations,
} from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Dashboard demo para pizzerías",
  description:
    "Primera versión visual del dashboard Andres Project for Pizzerías con datos mock de pedidos, ventas, clientes, promociones y automatizaciones WhatsApp.",
};

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard operativo de Pizzería Napoli"
      description="Vista demo con datos mock para validar pedidos, ventas, clientes, promociones, reseñas y automatizaciones WhatsApp antes de crear backend o login."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {salesSummary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
        <DashboardPanel title="Pedidos de hoy" eyebrow="Cocina y reparto">
          <div className="space-y-3">
            {todayOrders.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[0.5fr_1fr_1.2fr_0.7fr_0.7fr_0.6fr] md:items-center"
              >
                <p className="font-black text-[var(--ap-accent)]">
                  {order.id}
                </p>
                <div>
                  <p className="font-bold text-white">{order.customer}</p>
                  <p className="text-xs text-[var(--ap-muted)]">
                    {order.time} · {order.channel}
                  </p>
                </div>
                <p className="text-sm text-[var(--ap-muted)]">{order.items}</p>
                <StatusBadge status={order.status} />
                <p className="font-black text-white">{order.total}</p>
                <button className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white transition hover:bg-white/[0.1]">
                  Ver
                </button>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Productos más vendidos" eyebrow="Carta">
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">
                      {index + 1}. {product.name}
                    </p>
                    <p className="text-sm text-[var(--ap-muted)]">
                      {product.sold} unidades · {product.revenue}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-black text-[var(--ap-accent)]">
                    {product.trend}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                  <div
                    className="h-2 rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))]"
                    style={{ width: `${90 - index * 14}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>

      <section className="grid gap-5 py-5 lg:grid-cols-3">
        <DashboardPanel title="Clientes" eyebrow="CRM básico">
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.name}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div>
                  <p className="font-bold text-white">{customer.name}</p>
                  <p className="text-sm text-[var(--ap-muted)]">
                    {customer.orders} pedidos · último: {customer.last}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-white">{customer.spend}</p>
                  <p className="text-xs font-bold text-[var(--ap-accent)]">
                    {customer.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Promociones" eyebrow="Growth">
          <div className="space-y-3">
            {promotions.map((promo) => (
              <div
                key={promo.title}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-white">{promo.title}</p>
                  <StatusBadge status={promo.status} />
                </div>
                <p className="mt-3 text-sm text-[var(--ap-muted)]">
                  {promo.audience}
                </p>
                <p className="mt-2 text-sm font-bold text-[var(--ap-accent)]">
                  {promo.result}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Reseñas" eyebrow="Reputación">
          <div className="space-y-3">
            {reviews.map((review) => (
              <div
                key={`${review.author}-${review.source}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white">{review.author}</p>
                  <p className="font-black text-[var(--ap-accent)]">
                    {review.rating}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                  {review.text}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                  {review.source}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>

      <section className="pb-8">
        <DashboardPanel title="Automatizaciones WhatsApp" eyebrow="IA operativa">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whatsappAutomations.map((automation) => (
              <div
                key={automation.name}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-bold text-white">{automation.name}</p>
                  <StatusBadge status={automation.status} />
                </div>
                <p className="mt-5 text-sm font-bold text-[var(--ap-muted)]">
                  {automation.runs}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>
    </DashboardShell>
  );
}
