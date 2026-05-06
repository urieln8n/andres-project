export function StatusBadge({ status }: { status: string }) {
  const active = [
    "Nuevo",
    "Preparando",
    "Listo",
    "En reparto",
    "Activa",
    "Inactiva",
    "Programada",
    "Disponible",
    "VIP",
    "Recurrente",
    "Frecuente",
  ].includes(status);

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
        active
          ? "border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] text-[var(--ap-accent)]"
          : "border border-white/10 bg-white/[0.06] text-[var(--ap-muted)]"
      }`}
    >
      {status}
    </span>
  );
}
