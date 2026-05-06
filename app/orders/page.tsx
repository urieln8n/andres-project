import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { OrderStatusButtons } from "@/components/orders/OrderStatusButtons";
import { NewOrderForm } from "@/components/orders/NewOrderForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pedidos | Andres Project for Pizzerías",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Nuevo",
  confirmed: "Nuevo",
  preparing: "Preparando",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + "€";
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OrdersPage() {
  const supabase = await createClient();

  const [{ data: orders, error: ordersError }, { data: products }] =
    await Promise.all([
      supabase
        .from("orders")
        .select(
          "id, status, total, notes, created_at, customers(name), order_items(id, quantity, unit_price, products(name))"
        )
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("products")
        .select("id, name, price")
        .eq("available", true)
        .order("name"),
    ]);

  const os = orders ?? [];
  const prods = (products ?? []) as { id: string; name: string; price: number }[];

  const activeOrders = os.filter(
    (o) => !["delivered", "cancelled"].includes(o.status)
  );
  const revenue = os
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total), 0);

  const highlights = [
    {
      label: "Pedidos totales",
      value: String(os.length),
      detail: "desde la base de datos",
    },
    {
      label: "Ingresos",
      value: formatPrice(revenue),
      detail: "sin pedidos cancelados",
    },
    {
      label: "Pendientes",
      value: String(activeOrders.length),
      detail: "requieren seguimiento",
    },
  ];

  return (
    <DashboardShell
      title="Pedidos"
      description="Gestión de pedidos en tiempo real desde Supabase."
    >
      <section className="grid gap-4 py-6 md:grid-cols-3">
        {highlights.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      {ordersError && (
        <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          Error al cargar pedidos. Verifica la conexión con Supabase.
        </div>
      )}

      <div className="mb-5">
        <NewOrderForm products={prods} />
      </div>

      <DashboardPanel title="Pedidos de hoy" eyebrow="Cocina y operaciones">
        {os.length === 0 ? (
          <p className="text-sm text-[var(--ap-muted)]">
            No hay pedidos todavía. Crea el primero con el botón de arriba.
          </p>
        ) : (
          <div className="grid gap-4">
            {os.map((order) => {
              const customer = order.customers as unknown as { name: string } | null;
              const items = (order.order_items ?? []) as unknown as {
                id: string;
                quantity: number;
                unit_price: number;
                products: { name: string } | null;
              }[];
              const statusLabel =
                STATUS_LABELS[order.status] ?? order.status;

              return (
                <article
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="grid gap-4 xl:grid-cols-[0.55fr_0.9fr_1.5fr_0.75fr_0.65fr_1.7fr] xl:items-start">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Pedido
                      </p>
                      <p className="mt-2 font-mono text-lg font-black text-[var(--ap-accent)]">
                        #{order.id.slice(0, 6).toUpperCase()}
                      </p>
                      <p className="mt-1 text-sm font-bold text-[var(--ap-muted)]">
                        {formatTime(order.created_at)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Cliente
                      </p>
                      <p className="mt-2 font-black text-white">
                        {customer?.name ?? "Sin nombre"}
                      </p>
                      {order.notes && (
                        <p className="mt-1 text-xs text-[var(--ap-muted)]">
                          {order.notes}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Productos
                      </p>
                      <ul className="mt-2 space-y-1 text-sm leading-6 text-[var(--ap-muted)]">
                        {items.length > 0 ? (
                          items.map((item) => (
                            <li key={item.id}>
                              {item.quantity}×{" "}
                              {item.products?.name ?? "Producto eliminado"}
                            </li>
                          ))
                        ) : (
                          <li>Sin ítems</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Estado
                      </p>
                      <div className="mt-2">
                        <StatusBadge status={statusLabel} />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Total
                      </p>
                      <p className="mt-2 text-xl font-black text-white">
                        {formatPrice(Number(order.total))}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                        Cambiar estado
                      </p>
                      <div className="mt-2">
                        <OrderStatusButtons
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </DashboardPanel>
    </DashboardShell>
  );
}
