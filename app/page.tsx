"use client";

import { useEffect, useState } from "react";

const services = [
  {
    title: "Chat Widget IA",
    desc: "Un asistente inteligente en tu web que responde dudas, capta leads y guía al cliente hacia la acción.",
    tag: "Web",
  },
  {
    title: "Asistente WhatsApp",
    desc: "Automatiza respuestas, reservas, preguntas frecuentes y seguimiento desde WhatsApp.",
    tag: "WhatsApp",
  },
  {
    title: "Reservas automáticas",
    desc: "Convierte mensajes en citas confirmadas sin depender de llamadas o respuestas manuales.",
    tag: "Reservas",
  },
  {
    title: "CRM automático",
    desc: "Guarda leads, clientes, estados y oportunidades sin hojas de cálculo.",
    tag: "CRM",
  },
  {
    title: "Seguimiento inteligente",
    desc: "Mensajes automáticos para recuperar clientes, recordar citas y cerrar ventas pendientes.",
    tag: "Growth",
  },
  {
    title: "Agentes IA a medida",
    desc: "Sistemas personalizados conectados con tus herramientas, procesos y datos.",
    tag: "Custom",
  },
];

const problems = [
  "Mensajes sin responder fuera de horario",
  "Clientes que preguntan y nunca vuelven",
  "Reservas manuales por WhatsApp o Instagram",
  "Tareas repetitivas todos los días",
  "Leads perdidos por falta de seguimiento",
  "Sin datos claros para tomar decisiones",
];

const sectors = [
  {
    name: "Barberías",
    text: "Reservas, recordatorios, clientes recurrentes y campañas por WhatsApp.",
  },
  {
    name: "Restaurantes",
    text: "Reservas, pedidos, dudas frecuentes, eventos y captación de clientes.",
  },
  {
    name: "Clínicas",
    text: "Citas, recordatorios, formularios previos y seguimiento de pacientes.",
  },
  {
    name: "Inmobiliarias",
    text: "Captación de leads, calificación automática y seguimiento comercial.",
  },
  {
    name: "Gimnasios",
    text: "Captación, seguimiento, horarios, clases y recuperación de antiguos clientes.",
  },
  {
    name: "Estética",
    text: "Reservas, promociones, recordatorios, clientes VIP y reactivación.",
  },
];

const tiers = [
  {
    name: "Starter Automation",
    tag: "Para empezar rápido",
    setup: "297€",
    monthly: "97€/mes",
    featured: false,
    cta: "Solicitar Starter",
    features: [
      "Asistente WhatsApp básico",
      "Respuestas automáticas 24/7",
      "FAQ entrenado con tu negocio",
      "1 automatización n8n",
      "Soporte por email",
      "Setup en 7 días",
    ],
  },
  {
    name: "Business Automation",
    tag: "Más recomendado",
    setup: "697€",
    monthly: "197€/mes",
    featured: true,
    cta: "Solicitar Business",
    features: [
      "Todo lo de Starter",
      "Reservas automáticas",
      "CRM conectado",
      "Recordatorios WhatsApp/email",
      "Captación de leads",
      "5 automatizaciones n8n",
      "Reportes mensuales",
      "Soporte prioritario",
    ],
  },
  {
    name: "Premium AI System",
    tag: "Sistema completo",
    setup: "1.497€",
    monthly: "497€/mes",
    featured: false,
    cta: "Solicitar Premium",
    features: [
      "Todo lo de Business",
      "Agente IA personalizado",
      "Landing + automatización",
      "Chat widget IA",
      "Dashboard personalizado",
      "Seguimiento avanzado",
      "Integraciones ampliadas",
      "Soporte premium",
    ],
  },
];

const faqs = [
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "La primera versión puede estar lista en unos 7 días, dependiendo del alcance y de la información que tenga el negocio.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Andres Project diseña, configura y entrega el sistema listo para usar.",
  },
  {
    q: "¿Funciona para negocios pequeños?",
    a: "Sí. Está pensado especialmente para negocios locales que quieren ahorrar tiempo y captar más clientes.",
  },
  {
    q: "¿Puedo empezar solo con WhatsApp?",
    a: "Sí. Podemos empezar con un asistente básico de WhatsApp y luego añadir CRM, reservas, reportes o web.",
  },
  {
    q: "¿Hay permanencia?",
    a: "La propuesta recomendada es trabajar sin permanencia larga, con setup inicial y mensualidad de soporte.",
  },
  {
    q: "¿Qué pasa si mi negocio es diferente?",
    a: "Cada sistema se adapta al negocio: sector, horarios, servicios, precios, tono y proceso comercial.",
  },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > 550);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--ap-bg)] text-[var(--ap-text)]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollToId("top")}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ap-accent)] text-sm font-black text-black shadow-[0_0_40px_var(--ap-accent-glow)]">
              AP
            </span>
            <span className="text-lg font-black tracking-tight">
              Andres Project
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-[var(--ap-muted)] md:flex">
            <button onClick={() => scrollToId("services")}>Servicios</button>
            <button onClick={() => scrollToId("pricing")}>Paquetes</button>
            <button onClick={() => scrollToId("sectors")}>Sectores</button>
            <button onClick={() => scrollToId("process")}>
              Cómo funciona
            </button>
            <button onClick={() => scrollToId("faq")}>FAQ</button>
          </nav>

          <button
            onClick={() => scrollToId("cta")}
            className="hidden rounded-full bg-[var(--ap-accent)] px-5 py-3 text-sm font-black text-black shadow-[0_0_40px_var(--ap-accent-glow)] transition hover:scale-[1.02] md:block"
          >
            Solicitar demo gratuita
          </button>

          <button
            onClick={() => scrollToId("cta")}
            className="rounded-full bg-[var(--ap-accent)] px-4 py-2.5 text-sm font-black text-black md:hidden"
          >
            Demo
          </button>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden px-5 pb-20 pt-32 md:pb-28 md:pt-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,255,88,0.18),transparent_34%),radial-gradient(circle_at_70%_20%,rgba(0,194,168,0.13),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(10,10,11,0.92))]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--ap-accent)]">
              <span className="h-2 w-2 rounded-full bg-[var(--ap-accent)] shadow-[0_0_20px_var(--ap-accent)]" />
              Disponible para 3 clientes este mes
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Automatiza tu negocio con IA y{" "}
              <span className="text-[var(--ap-accent)]">
                convierte más clientes
              </span>{" "}
              sin trabajar más horas.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ap-muted)] md:text-xl">
              Creamos asistentes IA, automatizaciones y sistemas conectados
              para que tu negocio responda, venda, reserve y haga seguimiento
              automáticamente, 24/7.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollToId("cta")}
                className="rounded-full bg-[var(--ap-accent)] px-7 py-4 text-base font-black text-black shadow-[0_0_50px_var(--ap-accent-glow)] transition hover:scale-[1.02]"
              >
                ⚡ Solicitar demo gratuita
              </button>

              <button
                onClick={() => scrollToId("services")}
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Ver servicios →
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-[var(--ap-muted)]">
              <span>✓ Demo en 24h</span>
              <span>✓ Sin permanencia</span>
              <span>✓ Setup en 7 días</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 text-xs text-[var(--ap-dim)] sm:grid-cols-3">
              {[
                "Barbería The Cut",
                "Vitalis Clínica",
                "Núcleo Inmo",
                "Forma Gym",
                "La Mesa",
                "Glow Studio",
              ].map((logo) => (
                <div
                  key={logo}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[var(--ap-accent-soft)] blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-[var(--ap-card)] p-4 shadow-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm font-bold">Agente IA conectado</p>
                    <p className="text-xs text-[var(--ap-muted)]">
                      WhatsApp · Web · CRM · Reservas
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-bold text-[var(--ap-accent)]">
                    Online
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 p-4 text-sm text-white">
                    Hola, quiero saber precios y disponibilidad para esta tarde.
                  </div>

                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[var(--ap-accent)] p-4 text-sm font-semibold text-black">
                    Claro. Tenemos huecos a las 17:30 y 19:00. ¿Quieres que te
                    reserve?
                  </div>

                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 p-4 text-sm text-white">
                    Sí, a las 19:00.
                  </div>

                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[var(--ap-accent)] p-4 text-sm font-semibold text-black">
                    Reserva creada. Te enviaré recordatorio automático antes de
                    la cita.
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["<5s", "Respuesta"],
                    ["24/7", "Activo"],
                    ["+40%", "Leads"],
                  ].map(([n, t]) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center"
                    >
                      <p className="text-xl font-black text-[var(--ap-accent)]">
                        {n}
                      </p>
                      <p className="text-xs text-[var(--ap-muted)]">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="problems"
        eyebrow="El problema"
        title="Tu negocio pierde clientes mientras tú duermes."
        lead="Los negocios locales pierden oportunidades cada día por responder tarde, no hacer seguimiento o depender de tareas manuales."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Card key={p}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--ap-accent-soft)] text-lg font-black text-[var(--ap-accent)]">
                {i + 1}
              </div>
              <h3 className="text-lg font-black">{p}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                Cada minuto sin automatizar puede significar un cliente menos,
                una reserva perdida o una venta que se enfría.
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="solution"
        eyebrow="La solución"
        title="Un sistema que trabaja 24/7 por ti."
        lead="Conectamos IA, WhatsApp, web, formularios, CRM, reservas y reportes para que el negocio funcione incluso cuando no estás conectado."
      >
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <div className="grid gap-4 md:grid-cols-5 md:items-center">
              {["Cliente", "WhatsApp/Web", "Agente IA", "CRM/Reserva", "Reporte"].map(
                (item, i) => (
                  <div key={item} className="relative">
                    <div className="rounded-3xl border border-white/10 bg-black/30 p-5 text-center">
                      <p className="text-sm font-black">{item}</p>
                    </div>
                    {i < 4 && (
                      <div className="mx-auto my-2 h-6 w-px bg-[var(--ap-accent)] md:absolute md:right-[-14px] md:top-1/2 md:my-0 md:h-px md:w-7" />
                    )}
                  </div>
                )
              )}
            </div>
          </Card>

          <div className="grid gap-4">
            {[
              ["20h", "ahorradas por semana"],
              ["24/7", "atención automática"],
              ["+40%", "más conversión"],
            ].map(([n, t]) => (
              <Card key={n}>
                <p className="text-4xl font-black text-[var(--ap-accent)]">
                  {n}
                </p>
                <p className="mt-2 text-sm text-[var(--ap-muted)]">{t}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Servicios"
        title="6 servicios. Un objetivo: que vendas más."
        lead="No vendemos tecnología complicada. Instalamos sistemas prácticos para captar, responder, reservar, seguir y reportar."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title}>
              <span className="rounded-full bg-[var(--ap-accent-soft)] px-3 py-1 text-xs font-black text-[var(--ap-accent)]">
                {s.tag}
              </span>
              <h3 className="mt-5 text-xl font-black">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="pricing"
        eyebrow="Paquetes"
        title="Planes claros para empezar y escalar."
        lead="Empieza con lo esencial y crece hacia un sistema completo de automatización para tu negocio."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-[2rem] border p-6 ${
                tier.featured
                  ? "border-[var(--ap-accent)] bg-[var(--ap-accent-soft)] shadow-[0_0_60px_var(--ap-accent-glow)]"
                  : "border-white/10 bg-[var(--ap-card)]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-black">{tier.name}</p>
                  <p className="mt-1 text-sm text-[var(--ap-muted)]">
                    {tier.tag}
                  </p>
                </div>

                {tier.featured && (
                  <span className="rounded-full bg-[var(--ap-accent)] px-3 py-1 text-xs font-black text-black">
                    Más popular
                  </span>
                )}
              </div>

              <div className="mt-7">
                <p className="text-sm text-[var(--ap-muted)]">Setup desde</p>
                <p className="text-4xl font-black">{tier.setup}</p>
                <p className="mt-2 text-sm text-[var(--ap-muted)]">
                  + {tier.monthly}
                </p>
              </div>

              <button
                onClick={() => scrollToId("cta")}
                className={`mt-7 w-full rounded-full px-5 py-4 text-sm font-black ${
                  tier.featured
                    ? "bg-[var(--ap-accent)] text-black"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </button>

              <ul className="mt-7 space-y-3 text-sm text-[var(--ap-muted)]">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[var(--ap-accent)]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="sectors"
        eyebrow="Sectores"
        title="Automatizaciones para negocios locales reales."
        lead="Trabajamos con sectores donde responder rápido, reservar y hacer seguimiento marca la diferencia."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <Card key={s.name}>
              <h3 className="text-xl font-black">{s.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                {s.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="Proceso"
        title="Tu sistema funcionando en 7 días."
        lead="Trabajamos con un proceso simple, directo y pensado para que veas valor rápido."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Día 1", "Diagnóstico", "Entendemos tu negocio y detectamos qué automatizar."],
            ["Día 2-3", "Diseño", "Creamos el blueprint del sistema y sus flujos."],
            ["Día 4-6", "Implementación", "Conectamos IA, WhatsApp, CRM, reservas y reportes."],
            ["Día 7", "Lanzamiento", "Probamos, ajustamos y dejamos el sistema listo."],
          ].map(([day, title, desc]) => (
            <Card key={day}>
              <p className="text-sm font-black text-[var(--ap-accent)]">
                {day}
              </p>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="proof"
        eyebrow="Resultados"
        title="Lo que buscamos mejorar en cada negocio."
        lead="El objetivo no es instalar IA por moda. El objetivo es responder más rápido, perder menos clientes y vender más."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["+150", "procesos automatizables"],
            ["24/7", "atención disponible"],
            ["<5s", "respuesta al cliente"],
            ["7 días", "primer sistema activo"],
          ].map(([n, t]) => (
            <Card key={n}>
              <p className="text-3xl font-black text-[var(--ap-accent)]">
                {n}
              </p>
              <p className="mt-2 text-sm text-[var(--ap-muted)]">{t}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Preguntas frecuentes."
        lead="Todo lo que suele preguntar un negocio antes de automatizar."
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-3xl border border-white/10 bg-[var(--ap-card)]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold"
              >
                <span>{faq.q}</span>
                <span className="text-[var(--ap-accent)]">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>

              {openFaq === i && (
                <p className="px-5 pb-5 text-sm leading-7 text-[var(--ap-muted)]">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <section
        id="cta"
        className="relative overflow-hidden px-5 py-24 md:py-32"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(189,255,88,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-[var(--ap-accent-dim)] bg-[var(--ap-card)] p-8 text-center shadow-[0_0_80px_var(--ap-accent-glow)] md:p-14">
          <p className="mx-auto mb-5 w-fit rounded-full bg-[var(--ap-accent-soft)] px-4 py-2 text-sm font-black text-[var(--ap-accent)]">
            Disponible para 3 clientes este mes
          </p>

          <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
            Tu competencia ya está automatizando.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ap-muted)]">
            Agenda una demo gratuita de 30 minutos. Te enseñamos qué
            automatizaríamos en tu negocio y qué sistema te conviene instalar.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/34600000000?text=Hola%2C%20quiero%20una%20demo%20gratuita%20de%20Andres%20Project"
              className="rounded-full bg-[var(--ap-accent)] px-8 py-4 text-base font-black text-black shadow-[0_0_50px_var(--ap-accent-glow)]"
            >
              ⚡ Solicitar demo gratuita
            </a>

            <a
              href="https://wa.me/34600000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20automatizaciones%20IA"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10"
            >
              💬 Hablar por WhatsApp
            </a>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-[var(--ap-muted)]">
            <span>✓ Respuesta rápida</span>
            <span>✓ Demo en 24h</span>
            <span>✓ Sin compromiso</span>
            <span>✓ Sistema escalable</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[var(--ap-muted)] md:flex-row md:items-center">
          <div>
            <p className="font-black text-white">Andres Project</p>
            <p className="mt-1">
              Automatización IA para negocios locales.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToId("services")}>Servicios</button>
            <button onClick={() => scrollToId("pricing")}>Paquetes</button>
            <button onClick={() => scrollToId("faq")}>FAQ</button>
            <button onClick={() => scrollToId("cta")}>Contacto</button>
          </div>
        </div>
      </footer>

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 p-3 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-md gap-2">
            <button
              onClick={() => scrollToId("cta")}
              className="flex-1 rounded-full bg-[var(--ap-accent)] px-4 py-3 text-sm font-black text-black"
            >
              ⚡ Demo gratis
            </button>
            <a
              href="https://wa.me/34600000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Andres%20Project"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[var(--ap-accent)]">
            {eyebrow}
          </p>
          <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--ap-muted)]">
            {lead}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[var(--ap-card)] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition hover:border-[var(--ap-accent-dim)] hover:bg-white/[0.04]">
      {children}
    </div>
  );
}