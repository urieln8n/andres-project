import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { mockOrders, orderStatusFlow, orderSummary } from "@/data/orders";

export const metadata: Metadata = {
  title: "Pedidos | Andres Project for Pizzerías",
};

export default function OrdersPage() {
  return (
    <DashboardShell
      title="Pedidos"
      description="Listado mock para controlar pedidos de hoy, estados de cocina, método de entrega e ingresos antes de conectar base de datos."
    >
      <section className="grid gap-4 py-6 md:grid-cols-3">
        {orderSummary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <DashboardPanel title="Pedidos de hoy" eyebrow="Cocina y operaciones">
        <div className="grid gap-4">
          {mockOrders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="grid gap-4 xl:grid-cols-[0.55fr_0.9fr_1.5fr_0.75fr_0.65fr_1.7fr] xl:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Pedido
                  </p>
                  <p className="mt-2 text-xl font-black text-[var(--ap-accent)]">
                    {order.id}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--ap-muted)]">
                    {order.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Cliente
                  </p>
                  <p className="mt-2 font-black text-white">
                    {order.customer}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--ap-muted)]">
                    {order.method}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Productos
                  </p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-[var(--ap-muted)]">
                    {order.products.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Estado
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={order.status} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Total
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {order.total}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Cambiar estado
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {orderStatusFlow.map((status) => {
                      const isCurrent = status === order.status;

                      return (
                        <button
                          key={status}
                          type="button"
                          className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                            isCurrent
                              ? "border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] text-black"
                              : "border-white/10 bg-white/[0.04] text-[var(--ap-muted)] hover:border-[var(--ap-accent-dim)] hover:text-white"
                          }`}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardPanel>
    </DashboardShell>
  );
}
