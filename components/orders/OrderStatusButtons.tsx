'use client'

import { useTransition } from 'react'
import { updateOrderStatus } from '@/app/actions/orders'

const STATUS_OPTIONS = [
  { db: 'pending', label: 'Nuevo' },
  { db: 'preparing', label: 'Preparando' },
  { db: 'ready', label: 'Listo' },
  { db: 'delivered', label: 'Entregado' },
  { db: 'cancelled', label: 'Cancelado' },
] as const

export function OrderStatusButtons({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {
  const [isPending, startTransition] = useTransition()

  function handleClick(newStatus: string) {
    if (newStatus === currentStatus) return
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus)
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map(({ db, label }) => {
        const isCurrent = db === currentStatus
        return (
          <button
            key={db}
            type="button"
            disabled={isPending || isCurrent}
            onClick={() => handleClick(db)}
            className={`rounded-full border px-3 py-2 text-xs font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${
              isCurrent
                ? 'border-[var(--ap-accent-dim)] bg-[var(--ap-accent)] text-black'
                : 'border-white/10 bg-white/[0.04] text-[var(--ap-muted)] hover:border-[var(--ap-accent-dim)] hover:text-white'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
