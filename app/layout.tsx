import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://andresproject.com"),
  title: {
    default: "Andres Project for Pizzerías | SaaS y automatización IA",
    template: "%s | Andres Project",
  },
  description:
    "Andres Project for Pizzerías ayuda a pizzerías locales a gestionar pedidos, clientes, reservas, promociones y WhatsApp automation desde sistemas digitales simples.",
  keywords: [
    "Andres Project",
    "Andres Project for Pizzerías",
    "SaaS para pizzerías",
    "software para pizzerías",
    "automatización IA",
    "servicios digitales",
    "asistentes IA",
    "automatización WhatsApp",
    "WhatsApp automation",
    "landing pages inteligentes",
    "CRM básico",
    "SaaS para negocios",
    "pedidos WhatsApp pizzería",
    "CRM para pizzerías",
    "chatbot para negocios",
    "CRM automático",
    "automatización para negocios locales",
  ],
  authors: [{ name: "Andres Project" }],
  creator: "Andres Project",
  publisher: "Andres Project",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Andres Project",
    title: "Andres Project for Pizzerías | SaaS y automatización IA",
    description:
      "SaaS en desarrollo para pizzerías locales: pedidos por WhatsApp, CRM básico, reservas, campañas y automatización IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andres Project for Pizzerías | SaaS y automatización IA",
    description:
      "Sistema digital para pizzerías locales que quieren ordenar pedidos, clientes, reservas y crecimiento con automatización IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
