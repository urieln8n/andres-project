import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { customerSummary, mockCustomers } from "@/data/customers";

export const metadata: Metadata = {
  title: "Clientes | Andres Project for Pizzerías",
};

export default function CustomersPage() {
  return (
    <DashboardShell
      title="Clientes"
      description="CRM mock para consultar clientes, contacto, frecuencia de compra, gasto total y último pedido antes de conectar base de datos."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {customerSummary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <DashboardPanel title="Base de clientes" eyebrow="CRM básico">
        <div className="mb-5 rounded-2xl border border-white/10 bg-black/20 p-4">
          <label
            htmlFor="customer-search"
            className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]"
          >
            Búsqueda visual
          </label>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              id="customer-search"
              type="search"
              placeholder="Buscar por nombre, teléfono o email"
              className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-5 text-sm font-semibold text-white outline-none transition placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
            />
            <button
              type="button"
              className="min-h-12 rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] px-6 text-sm font-black text-black transition hover:bg-white"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {mockCustomers.map((customer) => (
            <article
              key={customer.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr_0.7fr_0.75fr_0.85fr_0.75fr] xl:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Cliente
                  </p>
                  <h3 className="mt-2 text-lg font-black text-white">
                    {customer.name}
                  </h3>
                  <div className="mt-2">
                    <StatusBadge
                      status={customer.frequent ? "Frecuente" : "No frecuente"}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Contacto
                  </p>
                  <p className="mt-2 font-bold text-white">{customer.phone}</p>
                  <p className="mt-1 text-sm text-[var(--ap-muted)]">
                    {customer.email ?? "Sin email registrado"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Pedidos
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {customer.totalOrders}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Gasto total
                  </p>
                  <p className="mt-2 text-xl font-black text-[var(--ap-accent)]">
                    {customer.totalSpend}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Último pedido
                  </p>
                  <p className="mt-2 font-bold text-white">
                    {customer.lastOrder}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Acción
                  </p>
                  <button
                    type="button"
                    className="mt-2 min-h-11 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white transition hover:border-[var(--ap-accent-dim)] hover:bg-white/[0.1]"
                  >
                    Ver ficha
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardPanel>
    </DashboardShell>
  );
}
