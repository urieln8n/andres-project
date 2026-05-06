import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CustomersList } from "@/components/customers/CustomersList";
import type { CustomerRow } from "@/components/customers/CustomersList";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clientes | Andres Project for Pizzerías",
};

// 3+ pedidos no cancelados = cliente frecuente
const FREQUENT_THRESHOLD = 3;

function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + "€";
}

function formatLastOrder(isoString: string | undefined): string {
  if (!isoString) return "Sin pedidos";
  const date = new Date(isoString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === now.toDateString()) {
    return (
      "Hoy · " +
      date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    );
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return "Ayer";
  }
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

export default async function CustomersPage() {
  const supabase = await createClient();

  const { data: rawCustomers, error } = await supabase
    .from("customers")
    .select("id, name, phone, email, orders(id, total, status, created_at)")
    .order("created_at", { ascending: false });

  type RawOrder = { id: string; total: number; status: string; created_at: string };
  type RawCustomer = {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    orders: RawOrder[];
  };

  const rows = (rawCustomers ?? []) as unknown as RawCustomer[];

  const customers: CustomerRow[] = rows
    .map((c) => {
      const activeOrders = c.orders.filter((o) => o.status !== "cancelled");
      const totalOrders = activeOrders.length;
      const totalSpend = activeOrders.reduce(
        (sum, o) => sum + Number(o.total),
        0
      );
      const lastOrderDate = c.orders
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]?.created_at;

      return {
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        totalOrders,
        totalSpend: formatPrice(totalSpend),
        lastOrder: formatLastOrder(lastOrderDate),
        frequent: totalOrders >= FREQUENT_THRESHOLD,
      };
    })
    // Ordenar: primero los que tienen pedidos recientes
    .sort((a, b) => b.totalOrders - a.totalOrders);

  const frequentCount = customers.filter((c) => c.frequent).length;
  const withEmailCount = customers.filter((c) => c.email).length;
  const totalRevenue = rows.reduce((sum, c) => {
    return (
      sum +
      c.orders
        .filter((o) => o.status !== "cancelled")
        .reduce((s, o) => s + Number(o.total), 0)
    );
  }, 0);

  const summary = [
    {
      label: "Clientes",
      value: String(customers.length),
      detail: "registrados en Supabase",
    },
    {
      label: "Frecuentes",
      value: String(frequentCount),
      detail: `${FREQUENT_THRESHOLD}+ pedidos activos`,
    },
    {
      label: "Con email",
      value: String(withEmailCount),
      detail: "listos para campañas",
    },
    {
      label: "Gasto total",
      value: formatPrice(totalRevenue),
      detail: "sin pedidos cancelados",
    },
  ];

  return (
    <DashboardShell
      title="Clientes"
      description="CRM con datos reales desde Supabase."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          Error al cargar clientes. Verifica la conexión con Supabase.
        </div>
      )}

      <DashboardPanel title="Base de clientes" eyebrow="CRM básico">
        <CustomersList customers={customers} />
      </DashboardPanel>
    </DashboardShell>
  );
}
