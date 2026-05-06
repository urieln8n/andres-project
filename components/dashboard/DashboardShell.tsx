import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/orders", label: "Pedidos" },
  { href: "/customers", label: "Clientes" },
  { href: "/menu", label: "Carta" },
  { href: "/promotions", label: "Promos" },
  { href: "/settings", label: "Ajustes" },
];

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--ap-bg)] px-5 py-6 text-[var(--ap-text)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--ap-accent)]">
              Andres Project for Pizzerías
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ap-muted)] md:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-4 py-2 font-bold text-[var(--ap-accent)]">
              Hoy · 20:18
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 font-bold text-white">
              Demo UI
            </span>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b border-white/10 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-[var(--ap-muted)] transition hover:border-[var(--ap-accent-dim)] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </main>
  );
}
