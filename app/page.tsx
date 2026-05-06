"use client";

import { useEffect, useState } from "react";
import { Benefits } from "@/components/landing/Benefits";
import { Card } from "@/components/landing/Card";
import { CTA } from "@/components/landing/CTA";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { Section } from "@/components/landing/Section";
import {
  faqs,
  saasFeatures,
  sectors,
  testimonials,
  whatsappInfoHref,
} from "@/data/landing";

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
    <main className="min-h-screen overflow-hidden bg-[var(--ap-bg)] text-[var(--ap-text)]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[rgba(7,8,10,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:py-4">
          <button
            onClick={() => scrollToId("top")}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] text-sm font-black text-black shadow-[0_14px_40px_var(--ap-accent-glow)]">
              AP
            </span>
            <span className="text-base font-black md:text-lg">
              Andres Project for Pizzerías
            </span>
          </button>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--ap-muted)] md:flex">
            <button onClick={() => scrollToId("services")}>Servicios</button>
            <button onClick={() => scrollToId("saas")}>SaaS</button>
            <button onClick={() => scrollToId("pricing")}>Precios</button>
            <button onClick={() => scrollToId("sectors")}>Sectores</button>
            <button onClick={() => scrollToId("process")}>Proceso</button>
            <button onClick={() => scrollToId("testimonials")}>
              Testimonios
            </button>
            <button onClick={() => scrollToId("faq")}>FAQ</button>
          </nav>

          <button
            onClick={() => scrollToId("cta")}
            className="hidden rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-5 py-3 text-sm font-black text-black shadow-[0_16px_44px_var(--ap-accent-glow)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_54px_var(--ap-accent-glow)] md:block"
          >
            Pedir diagnóstico gratis
          </button>

          <button
            onClick={() => scrollToId("cta")}
            className="rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-4 py-2.5 text-sm font-black text-black md:hidden"
          >
            Demo
          </button>
        </div>
      </header>

      <Hero scrollToId={scrollToId} />
      <Benefits />

      <Section
        id="solution"
        eyebrow="Solución Andres Project"
        title="Un sistema digital vertical para la atención y crecimiento de tu pizzería."
        lead="Conectamos WhatsApp automation, carta inteligente, CRM básico, reservas, promociones y métricas simples para que cada cliente tenga respuesta, contexto y siguiente paso."
      >
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <div className="grid gap-4 md:grid-cols-5 md:items-center">
              {[
                "Cliente",
                "WhatsApp/Carta",
                "Automatización IA",
                "CRM/Reserva",
                "Panel SaaS",
              ].map((item, i) => (
                <div key={item} className="relative">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:p-5">
                    <p className="text-sm font-black">{item}</p>
                  </div>
                  {i < 4 && (
                    <div className="mx-auto my-2 h-6 w-px bg-[linear-gradient(to_bottom,var(--ap-accent),var(--ap-accent-2))] md:absolute md:right-[-14px] md:top-1/2 md:my-0 md:h-px md:w-7" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4">
            {[
              ["20h", "ahorradas por semana"],
              ["24/7", "primer filtro activo"],
              ["1 CRM", "clientes frecuentes"],
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

      <Features />

      <Section
        id="saas"
        eyebrow="Roadmap"
        title="Plataforma SaaS en desarrollo"
        lead="Andres Project for Pizzerías evolucionará hacia un panel para gestionar clientes, pedidos, reservas, automatizaciones y crecimiento desde un solo lugar."
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--ap-accent)]">
              Próxima etapa
            </p>
            <h3 className="mt-4 text-2xl font-black">
              De landing validada a producto SaaS para pizzerías.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--ap-muted)]">
              La visión es convertir esta primera propuesta en una plataforma
              SaaS: un panel sencillo para ver pedidos, clientes, reservas,
              promociones, automatizaciones activas y métricas de crecimiento.
            </p>
            <button
              onClick={() => scrollToId("cta")}
              className="mt-7 rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-6 py-3 text-sm font-black text-black shadow-[0_16px_44px_var(--ap-accent-glow)] transition hover:-translate-y-0.5"
            >
              Quiero entrar en la lista
            </button>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {saasFeatures.map((feature, i) => (
              <Card key={feature}>
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] text-sm font-black text-[var(--ap-accent)]">
                  {i + 1}
                </div>
                <h3 className="text-lg font-black">{feature}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                  Pensado para pizzerías que quieren operar mejor sin depender
                  de herramientas separadas o procesos improvisados.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Pricing scrollToId={scrollToId} />

      <Section
        id="sectors"
        eyebrow="Casos de uso"
        title="Pensado para distintos tipos de pizzerías locales."
        lead="La base visual se mantiene, pero el mensaje se enfoca en operaciones reales de pizzerías: reparto, reservas, clientes frecuentes y promociones."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Card key={sector.name}>
              <h3 className="text-xl font-black">{sector.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ap-muted)]">
                {sector.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="Proceso de trabajo"
        title="De pizzería manual a sistema digital validable."
        lead="Primero entendemos cómo entran pedidos y reservas. Después diseñamos una primera versión del sistema sin crear login, backend ni infraestructura compleja todavía."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            [
              "Paso 1",
              "Diagnóstico",
              "Entendemos carta, reparto, reservas y cómo llegan los pedidos.",
            ],
            [
              "Paso 2",
              "Diseño",
              "Definimos funciones: WhatsApp, carta, CRM básico, reservas o promociones.",
            ],
            [
              "Paso 3",
              "Landing",
              "Validamos el mensaje del SaaS con una landing clara y orientada a pizzerías.",
            ],
            [
              "Paso 4",
              "MVP",
              "Preparamos el camino para un panel real sin romper la base actual.",
            ],
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
        eyebrow="Confianza"
        title="Una marca que empieza validando el problema antes de construir el SaaS."
        lead="La Fase 1 no crea backend ni login. Presenta el producto, explica el valor para pizzerías y prepara el terreno para construir el MVP sin romper nada."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["7 días", "primera versión activa"],
            ["0", "permanencia larga"],
            ["Pizza", "vertical claro"],
            ["SaaS", "roadmap gradual"],
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
        id="testimonials"
        eyebrow="Confianza"
        title="Prueba social preparada para futuras pizzerías piloto."
        lead="Estos testimonios son placeholders para mantener la estructura de confianza hasta incorporar resultados reales de pizzerías locales."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <p className="text-4xl font-black leading-none text-[var(--ap-accent)]">
                “
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--ap-muted)]">
                {testimonial.quote}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-black text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[var(--ap-muted)]">
                  {testimonial.role}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="Preguntas frecuentes"
        title="Preguntas frecuentes."
        lead="Todo lo que suele preguntar una pizzería antes de usar WhatsApp automation, CRM básico, carta inteligente o un futuro panel SaaS."
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-white/10 bg-[var(--ap-card)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold transition hover:text-white"
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

      <CTA />

      <footer className="border-t border-white/10 bg-black/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm text-[var(--ap-muted)] md:flex-row md:items-center">
          <div>
            <p className="font-black text-white">Andres Project</p>
            <p className="mt-1">
              SaaS y automatización IA para pizzerías locales.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToId("services")}>Servicios</button>
            <button onClick={() => scrollToId("saas")}>SaaS</button>
            <button onClick={() => scrollToId("pricing")}>Precios</button>
            <button onClick={() => scrollToId("testimonials")}>
              Testimonios
            </button>
            <button onClick={() => scrollToId("faq")}>FAQ</button>
            <button onClick={() => scrollToId("cta")}>Contacto</button>
          </div>
        </div>
      </footer>

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[rgba(7,8,10,0.86)] p-3 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-md gap-2">
            <button
              onClick={() => scrollToId("cta")}
              className="flex-1 rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-4 py-3 text-sm font-black text-black shadow-[0_14px_38px_var(--ap-accent-glow)]"
            >
              Automatizar pizzería
            </button>
            <a
              href={whatsappInfoHref}
              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
