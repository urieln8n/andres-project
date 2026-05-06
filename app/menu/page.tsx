import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { menuCategories, menuHighlights, menuProducts } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menú digital | Andres Project for Pizzerías",
};

export default function MenuPage() {
  return (
    <DashboardShell
      title="Menú digital"
      description="Carta mock para presentar productos, precios y disponibilidad antes de conectar base de datos."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {menuHighlights.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5">
        <DashboardPanel title="Categorías de productos" eyebrow="Menú digital">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {menuCategories.map((category) => {
              const productsInCategory = menuProducts.filter(
                (product) => product.categoryId === category.id,
              );
              const availableProducts = productsInCategory.filter(
                (product) => product.status === "Disponible",
              );

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
                      {availableProducts.length}/{productsInCategory.length}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                    {category.description}
                  </p>
                </article>
              );
            })}
          </div>
        </DashboardPanel>

        {menuCategories.map((category) => {
          const productsInCategory = menuProducts.filter(
            (product) => product.categoryId === category.id,
          );

          return (
            <DashboardPanel
              key={category.id}
              title={category.name}
              eyebrow="Productos"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {productsInCategory.map((product) => {
                  const isAvailable = product.status === "Disponible";

                  return (
                    <article
                      key={product.id}
                      className="flex min-h-[260px] flex-col rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-black text-white">
                            {product.name}
                          </h3>
                          {product.tag ? (
                            <p className="mt-2 w-fit rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-black text-[var(--ap-accent)]">
                              {product.tag}
                            </p>
                          ) : null}
                        </div>
                        <StatusBadge status={product.status} />
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-6 text-[var(--ap-muted)]">
                        {product.description}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-2xl font-black text-[var(--ap-accent)]">
                          {product.price}
                        </p>
                        <button
                          type="button"
                          disabled={!isAvailable}
                          className={`min-h-11 rounded-full px-5 py-3 text-sm font-black transition ${
                            isAvailable
                              ? "border border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] text-black hover:bg-white"
                              : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-[var(--ap-dim)]"
                          }`}
                        >
                          Añadir al pedido
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </DashboardPanel>
          );
        })}
      </section>
    </DashboardShell>
  );
}
