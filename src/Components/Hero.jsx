import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'

export default function Hero() {
  const navigate = useNavigate()
  const { products } = useStore()
  const [sq, setSq] = useState('')

  const pills = useMemo(() => {
    const u = [...new Set(products.map((p) => p.category))].sort()
    return u.slice(0, 10)
  }, [products])

  const searchSubmit = (e) => {
    e.preventDefault()
    const t = sq.trim()
    navigate(t ? `/catalog?q=${encodeURIComponent(t)}` : '/catalog')
  }

  return (
    <section className="relative overflow-hidden border-b border-zinc-200/90 bg-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251,191,36,0.35), transparent),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(167,139,250,0.2), transparent),
            radial-gradient(ellipse 50% 30% at 0% 100%, rgba(56,189,248,0.15), transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            Yangilanishlar har hafta
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
            Bozor narxidagi qulaylik — onlayn
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-zinc-600 sm:text-lg">
            <span className="font-semibold text-zinc-800">{products.length}+</span> mahsulot, aniq tavsif va narx. Qidiring, solishtiring, savatda to‘plang.
          </p>

          <form onSubmit={searchSubmit} className="mx-auto mt-10 w-full max-w-2xl">
            <label htmlFor="hero-search" className="sr-only">
              Mahsulot qidirish
            </label>
            <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200/90 bg-white/90 p-2 shadow-xl shadow-zinc-900/[0.06] backdrop-blur-sm sm:flex-row sm:items-stretch sm:rounded-full sm:p-1.5">
              <input
                id="hero-search"
                type="search"
                value={sq}
                onChange={(e) => setSq(e.target.value)}
                placeholder="Masalan: smartfon, guruch, blender..."
                className="min-w-0 flex-1 cursor-text rounded-xl border-0 bg-transparent px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 sm:rounded-full sm:pl-6"
                aria-label="Mahsulot qidirish"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-zinc-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-amber-500 sm:rounded-full sm:py-3"
              >
                Qidirish
              </button>
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {pills.map((cat) => (
              <Link
                key={cat}
                to={`/catalog?cat=${encodeURIComponent(cat)}`}
                className="rounded-full border border-zinc-200/90 bg-white/70 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur transition hover:border-amber-300 hover:bg-amber-50/90 hover:text-amber-950"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-zinc-200/80 pt-10 text-center sm:gap-8">
            <div>
              <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">24/7</p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">Qabul</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">1–3</p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">Kun yetkazish</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600 sm:text-3xl">100%</p>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">Shaffof narx</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
