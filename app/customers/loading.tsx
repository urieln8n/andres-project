export default function CustomersLoading() {
  return (
    <main className="min-h-screen bg-[var(--ap-bg)] px-5 py-6 md:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 w-36 rounded-2xl bg-white/10" />
        <div className="mt-4 h-5 w-96 rounded-xl bg-white/[0.06]" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/[0.06]" />
          ))}
        </div>

        <div className="mt-6 h-16 rounded-2xl bg-white/[0.06]" />

        <div className="mt-4 grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      </div>
    </main>
  )
}
