'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-[var(--ap-muted)] transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
    >
      Cerrar sesión
    </button>
  )
}
