import { benefits } from "@/data/landing";
import { Card } from "./Card";
import { Section } from "./Section";

export function Benefits() {
  return (
    <Section
      id="problems"
      eyebrow="Beneficios"
      title="Menos caos operativo. Más pedidos y clientes mejor gestionados."
      lead="Andres Project for Pizzerías está pensado para simplificar la operación diaria: atención por WhatsApp, carta, reservas, clientes y promociones desde un sistema más claro."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, i) => (
          <Card key={benefit}>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] text-lg font-black text-[var(--ap-accent)]">
              {i + 1}
            </div>
            <h3 className="text-lg font-black">{benefit}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
              Beneficio diseñado para pizzerías que quieren vender mejor sin
              añadir más carga manual al equipo en horas punta.
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
