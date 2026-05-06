import { services } from "@/data/landing";
import { Card } from "./Card";
import { Section } from "./Section";

export function Features() {
  return (
    <Section
      id="services"
      eyebrow="Funciones"
      title="Funciones iniciales para un SaaS de pizzerías locales."
      lead="La Fase 1 presenta las funciones principales del producto: pedidos por WhatsApp, carta inteligente, CRM básico, reservas, promociones y automatización IA."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title}>
            <span className="rounded-full bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-black text-[var(--ap-accent)]">
              {service.tag}
            </span>
            <h3 className="mt-5 text-xl font-black">{service.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
              {service.desc}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
