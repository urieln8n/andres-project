import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { pizzeriaSettings } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "Ajustes | Andres Project for Pizzerías",
};

export default function SettingsPage() {
  const settingsMetrics = [
    { label: "Tiempo preparación", value: pizzeriaSettings.prepTime, detail: "estimación visible" },
    { label: "Pedido mínimo", value: pizzeriaSettings.minimumOrder, detail: "delivery" },
    { label: "Coste reparto", value: pizzeriaSettings.deliveryFee, detail: "zonas configuradas" },
    { label: "Zonas", value: String(pizzeriaSettings.deliveryZones.length), detail: "áreas activas" },
  ];

  return (
    <DashboardShell
      title="Ajustes de pizzería"
      description="Configura datos básicos, horarios, reparto, tono de WhatsApp y reglas operativas con datos mock."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {settingsMetrics.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <DashboardPanel title="Datos del local" eyebrow="Configuración">
          <div className="space-y-4">
            {[
              ["Nombre", pizzeriaSettings.name],
              ["WhatsApp", pizzeriaSettings.whatsapp],
              ["Dirección", pizzeriaSettings.address],
              ["Tono de atención", pizzeriaSettings.tone],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                  {label}
                </p>
                <p className="mt-2 font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Horarios y reparto" eyebrow="Operativa">
          <div className="space-y-4">
            {pizzeriaSettings.openingHours.map((item) => (
              <div
                key={item.day}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <p className="font-bold text-white">{item.day}</p>
                <StatusBadge status={item.hours} />
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                Zonas de reparto
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pizzeriaSettings.deliveryZones.map((zone) => (
                  <StatusBadge key={zone} status={zone} />
                ))}
              </div>
            </div>
          </div>
        </DashboardPanel>
      </section>
    </DashboardShell>
  );
}
