import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { customers } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Clientes | Dashboard demo",
};

export default function CustomersPage() {
  const metrics = [
    { label: "Clientes registrados", value: "284", detail: "+22 este mes" },
    { label: "Clientes recurrentes", value: "68", detail: "24% del total" },
    { label: "Clientes VIP", value: "19", detail: "alto valor" },
    { label: "Reactivables", value: "84", detail: "sin pedido en 30 días" },
  ];

  return (
    <DashboardShell
      title="Clientes y CRM básico"
      description="Vista mock para ordenar clientes, frecuencia de compra, gasto y etiquetas antes de conectar base de datos real."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <DashboardPanel title="Clientes destacados" eyebrow="CRM">
        <div className="grid gap-4 md:grid-cols-2">
          {customers.map((customer) => (
            <div
              key={customer.name}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black text-white">
                    {customer.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ap-muted)]">
                    {customer.orders} pedidos · último pedido: {customer.last}
                  </p>
                </div>
                <StatusBadge status={customer.tag} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[var(--ap-muted)]">Gasto total</p>
                  <p className="mt-1 font-black text-white">
                    {customer.spend}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[var(--ap-muted)]">Acción sugerida</p>
                  <p className="mt-1 font-black text-[var(--ap-accent)]">
                    Enviar promo
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </DashboardShell>
  );
}
