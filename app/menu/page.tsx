import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menú digital | Andres Project for Pizzerías",
};

function formatPrice(price: number): string {
  return price.toFixed(2).replace(".", ",") + "€";
}

export default async function MenuPage() {
  const supabase = await createClient();

  const [{ data: categories, error: catError }, { data: products, error: prodError }] =
    await Promise.all([
      supabase.from("categories").select("id, name, description").order("position"),
      supabase.from("products").select("id, name, description, price, available, category_id").order("position"),
    ]);

  const hasError = catError || prodError;
  const cats = categories ?? [];
  const prods = products ?? [];

  const availableCount = prods.filter((p) => p.available).length;
  const unavailableCount = prods.filter((p) => !p.available).length;
  const maxPrice = prods.length ? Math.max(...prods.map((p) => Number(p.price))) : null;

  const highlights = [
    {
      label: "Categorías",
      value: String(cats.length),
      detail: cats.map((c) => c.name).join(", ") || "Sin datos",
    },
    {
      label: "Productos",
      value: String(prods.length),
      detail: `${availableCount} disponibles ahora`,
    },
    {
      label: "Precio máx.",
      value: maxPrice !== null ? formatPrice(maxPrice) : "—",
      detail: "producto más caro en carta",
    },
    {
      label: "Sin stock",
      value: String(unavailableCount),
      detail: "productos no disponibles",
    },
  ];

  return (
    <DashboardShell
      title="Menú digital"
      description="Carta con productos reales desde Supabase."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      {hasError && (
        <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          Error al cargar datos. Verifica la conexión con Supabase y las políticas RLS.
        </div>
      )}

      {!hasError && cats.length === 0 ? (
        <DashboardPanel title="Sin datos" eyebrow="Menú digital">
          <p className="text-sm text-[var(--ap-muted)]">
            No hay categorías en la base de datos. Añade datos desde el panel de Supabase.
          </p>
        </DashboardPanel>
      ) : (
        <section className="grid gap-5">
          <DashboardPanel title="Categorías de productos" eyebrow="Menú digital">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cats.map((category) => {
                const inCat = prods.filter((p) => p.category_id === category.id);
                const availableInCat = inCat.filter((p) => p.available).length;

                return (
                  <article
                    key={category.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black text-white">
                        {category.name}
                      </h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-[var(--ap-muted)]">
                        {availableInCat}/{inCat.length}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                      {category.description ?? "—"}
                    </p>
                  </article>
                );
              })}
            </div>
          </DashboardPanel>

          {cats.map((category) => {
            const inCat = prods.filter((p) => p.category_id === category.id);
            if (inCat.length === 0) return null;

            return (
              <DashboardPanel key={category.id} title={category.name} eyebrow="Productos">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {inCat.map((product) => (
                    <article
                      key={product.id}
                      className="flex min-h-[260px] flex-col rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-black text-white">
                          {product.name}
                        </h3>
                        <StatusBadge
                          status={product.available ? "Disponible" : "No disponible"}
                        />
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-6 text-[var(--ap-muted)]">
                        {product.description ?? "—"}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-2xl font-black text-[var(--ap-accent)]">
                          {formatPrice(Number(product.price))}
                        </p>
                        <button
                          type="button"
                          disabled={!product.available}
                          className={`min-h-11 rounded-full px-5 py-3 text-sm font-black transition ${
                            product.available
                              ? "border border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] text-black hover:bg-white"
                              : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-[var(--ap-dim)]"
                          }`}
                        >
                          Añadir al pedido
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </DashboardPanel>
            );
          })}
        </section>
      )}
    </DashboardShell>
  );
}
