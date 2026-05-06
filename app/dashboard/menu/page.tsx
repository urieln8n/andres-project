import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { menuItems, topProducts } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Carta | Dashboard demo",
};

export default function MenuPage() {
  const metrics = [
    { label: "Productos activos", value: "24", detail: "5 categorías" },
    { label: "Más vendido", value: "Margherita", detail: "21 unidades hoy" },
    { label: "Combos activos", value: "3", detail: "1 destacado" },
    { label: "Agotados", value: "1", detail: "actualizar stock" },
  ];

  return (
    <DashboardShell
      title="Carta inteligente"
      description="Vista mock para gestionar productos, precios, disponibilidad y destacados de la pizzería."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardPanel title="Productos de carta" eyebrow="Menu">
          <div className="grid gap-4 md:grid-cols-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-white">{item.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                      {item.category}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--ap-muted)]">
                  {item.description}
                </p>
                <p className="mt-4 text-xl font-black text-[var(--ap-accent)]">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Ranking de ventas" eyebrow="Productos">
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
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>
    </DashboardShell>
  );
}
