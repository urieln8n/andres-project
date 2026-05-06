'use client'

import { useState, useTransition } from 'react'
import { createOrder } from '@/app/actions/orders'

type Product = {
  id: string
  name: string
  price: number
}

export function NewOrderForm({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

  function setQty(productId: string, value: number) {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, value) }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    const items = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([productId, qty]) => {
        const product = products.find((p) => p.id === productId)!
        return { product_id: productId, quantity: qty, unit_price: Number(product.price) }
      })

    startTransition(async () => {
      const result = await createOrder(customerName, items, notes || undefined)
      if ('error' in result && result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Pedido creado correctamente' })
        setCustomerName('')
        setNotes('')
        setQuantities({})
        setTimeout(() => {
          setOpen(false)
          setMessage(null)
        }, 1500)
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-[var(--ap-accent-dim)] bg-[var(--ap-accent-soft)] px-5 py-2.5 text-sm font-black text-[var(--ap-accent)] transition hover:bg-[var(--ap-accent)] hover:text-black"
      >
        + Nuevo pedido
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-black text-white">Nuevo pedido</h3>
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-[var(--ap-muted)] hover:text-white"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[var(--ap-dim)]">
              Cliente
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nombre del cliente"
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[var(--ap-text)] outline-none placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[var(--ap-dim)]">
              Notas
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instrucciones especiales"
              className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-[var(--ap-text)] outline-none placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
            />
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-sm text-[var(--ap-muted)]">
            Sin productos disponibles. Añade productos desde Supabase primero.
          </p>
        ) : (
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-[var(--ap-dim)]">
              Productos
            </p>
            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{product.name}</p>
                    <p className="text-xs text-[var(--ap-accent)]">
                      {Number(product.price).toFixed(2).replace('.', ',')}€
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(product.id, (quantities[product.id] ?? 0) - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-sm font-black text-[var(--ap-muted)] hover:border-white/30 hover:text-white"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-black text-white">
                      {quantities[product.id] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(product.id, (quantities[product.id] ?? 0) + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--ap-accent-dim)] text-sm font-black text-[var(--ap-accent)] hover:bg-[var(--ap-accent-soft)]"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {message && (
          <p
            className={`rounded-xl px-4 py-3 text-sm ${
              message.type === 'error'
                ? 'border border-red-500/20 bg-red-500/10 text-red-400'
                : 'border border-green-500/20 bg-green-500/10 text-green-400'
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-6 py-2.5 text-sm font-black text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? 'Guardando…' : 'Crear pedido'}
          </button>
        </div>
      </form>
    </div>
  )
}
