'use client'

import { useState } from 'react'
import { StatusBadge } from '@/components/dashboard/StatusBadge'

export type CustomerRow = {
  id: string
  name: string
  phone: string | null
  email: string | null
  totalOrders: number
  totalSpend: string
  lastOrder: string
  frequent: boolean
}

export function CustomersList({ customers }: { customers: CustomerRow[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          (c.phone ?? '').includes(query) ||
          (c.email ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : customers

  return (
    <>
      <div className="mb-5 rounded-2xl border border-white/10 bg-black/20 p-4">
        <label
          htmlFor="customer-search"
          className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]"
        >
          Búsqueda
        </label>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            id="customer-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, teléfono o email"
            className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/[0.05] px-5 text-sm font-semibold text-white outline-none transition placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="min-h-12 rounded-full border border-white/10 bg-white/[0.06] px-6 text-sm font-black text-[var(--ap-muted)] transition hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>
        {query && (
          <p className="mt-2 text-xs text-[var(--ap-muted)]">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--ap-muted)]">
          {query ? 'Sin resultados para esa búsqueda.' : 'No hay clientes registrados todavía.'}
        </p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((customer) => (
            <article
              key={customer.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr_0.7fr_0.75fr_0.85fr_0.75fr] xl:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Cliente
                  </p>
                  <h3 className="mt-2 text-lg font-black text-white">
                    {customer.name}
                  </h3>
                  <div className="mt-2">
                    <StatusBadge
                      status={customer.frequent ? 'Frecuente' : 'No frecuente'}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Contacto
                  </p>
                  <p className="mt-2 font-bold text-white">
                    {customer.phone ?? '—'}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ap-muted)]">
                    {customer.email ?? 'Sin email registrado'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Pedidos
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {customer.totalOrders}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Gasto total
                  </p>
                  <p className="mt-2 text-xl font-black text-[var(--ap-accent)]">
                    {customer.totalSpend}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Último pedido
                  </p>
                  <p className="mt-2 font-bold text-white">{customer.lastOrder}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--ap-dim)]">
                    Acción
                  </p>
                  <button
                    type="button"
                    className="mt-2 min-h-11 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm font-black text-white transition hover:border-[var(--ap-accent-dim)] hover:bg-white/[0.1]"
                  >
                    Ver ficha
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
