import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andres Project — Automatización IA para negocios locales",
  description:
    "Asistentes IA, automatizaciones y sistemas conectados para que tu negocio responda, venda, reserve y haga seguimiento automáticamente.",
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