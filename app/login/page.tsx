'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--ap-bg)] px-5">
      <div className="w-full max-w-sm">
        <p className="text-center text-sm font-black uppercase tracking-[0.18em] text-[var(--ap-accent)]">
          Andres Project
        </p>
        <h1 className="mt-3 text-center text-3xl font-black text-[var(--ap-text)]">
          Iniciar sesión
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[var(--ap-muted)]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[var(--ap-text)] outline-none placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold text-[var(--ap-muted)]">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[var(--ap-text)] outline-none placeholder:text-[var(--ap-dim)] focus:border-[var(--ap-accent-dim)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[linear-gradient(135deg,var(--ap-accent),var(--ap-accent-2))] px-4 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--ap-muted)]">
          ¿Sin cuenta?{' '}
          <Link
            href="/register"
            className="font-bold text-[var(--ap-accent)] hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  )
}
