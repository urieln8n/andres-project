import type { Metadata } from "next";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { whatsappAutomations } from "@/data/dashboard";

export const metadata: Metadata = {
  title: "WhatsApp | Dashboard demo",
};

export default function WhatsappPage() {
  const metrics = [
    { label: "Mensajes hoy", value: "312", detail: "126 resueltos por IA" },
    { label: "Pedidos guiados", value: "31", detail: "desde WhatsApp" },
    { label: "Reseñas pedidas", value: "19", detail: "post-entrega" },
    { label: "Campañas listas", value: "2", detail: "1 programada" },
  ];

  return (
    <DashboardShell
      title="Automatizaciones WhatsApp"
      description="Vista mock para gestionar flujos de WhatsApp: carta, dirección de reparto, reactivación y reseñas."
    >
      <section className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <DashboardPanel title="Flujos activos" eyebrow="WhatsApp automation">
        <div className="grid gap-4 md:grid-cols-2">
          {whatsappAutomations.map((automation) => (
            <div
              key={automation.name}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg font-black text-white">
                  {automation.name}
                </p>
                <StatusBadge status={automation.status} />
              </div>
              <p className="mt-5 text-sm font-bold text-[var(--ap-muted)]">
                {automation.runs}
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                  Mensaje ejemplo
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--ap-muted)]">
                  Hola, soy el asistente de Pizzería Napoli. Puedo ayudarte con
                  carta, horarios, reparto, reservas y promociones.
                </p>
              </div>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </DashboardShell>
  );
}
