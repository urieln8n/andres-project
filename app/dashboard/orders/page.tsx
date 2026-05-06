import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { salesSummary, todayOrders } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Pedidos | Dashboard demo",
};

export default function OrdersPage() {
  return (
    <DashboardShell
      title="Pedidos de hoy"
      description="Vista mock para gestionar pedidos por WhatsApp, web, sala y reparto sin backend todavía."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {salesSummary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <DashboardPanel title="Cola operativa" eyebrow="Pedidos">
        <div className="space-y-3">
          {todayOrders.map((order) => (
            <div
              key={order.id}
              className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 lg:grid-cols-[0.45fr_1fr_1.35fr_0.75fr_0.75fr_0.7fr] lg:items-center"
            >
              <p className="font-black text-[var(--ap-accent)]">{order.id}</p>
              <div>
                <p className="font-bold text-white">{order.customer}</p>
                <p className="text-xs text-[var(--ap-muted)]">
                  {order.time} · {order.channel}
                </p>
              </div>
              <p className="text-sm leading-6 text-[var(--ap-muted)]">
                {order.items}
              </p>
              <StatusBadge status={order.status} />
              <p className="font-black text-white">{order.total}</p>
              <div className="flex gap-2">
                <button className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-black text-white transition hover:bg-white/[0.1]">
                  Preparar
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </DashboardShell>
  );
}
