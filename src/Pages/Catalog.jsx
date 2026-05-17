import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import { useStore } from '../hooks/useStore'

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const category = params.get('cat') || ''
  const { searchProducts, products } = useStore()

  const list = useMemo(() => searchProducts(q, category || null), [q, category, searchProducts])

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

  const setQuery = (nextQ) => {
    const p = new URLSearchParams(params)
    if (nextQ) p.set('q', nextQ)
    else p.delete('q')
    setParams(p, { replace: true })
  }

  const setCat = (nextCat) => {
    const p = new URLSearchParams(params)
    if (nextCat) p.set('cat', nextCat)
    else p.delete('cat')
    setParams(p, { replace: true })
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-16">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">Katalog</h1>
          <p className="mt-2 max-w-2xl text-zinc-600">
            Qidiruv va kategoriya bo‘yicha filtrlash. {list.length} ta mahsulot topildi.
          </p>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label htmlFor="catalog-search" className="sr-only">
                Qidiruv
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="catalog-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Mahsulot nomi, kategoriya yoki tavsif..."
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3.5 pl-12 pr-4 text-zinc-900 outline-none ring-amber-500/30 transition focus:border-amber-400 focus:bg-white focus:ring-4"
                />
              </div>
            </div>
            <div className="lg:w-64">
              <label htmlFor="catalog-cat" className="mb-1 block text-sm font-medium text-zinc-700">
                Kategoriya
              </label>
              <select
                id="catalog-cat"
                value={category}
                onChange={(e) => setCat(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 outline-none ring-amber-500/30 focus:ring-4"
              >
                <option value="">Hammasi</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {list.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-16 text-center">
            <p className="text-lg font-medium text-zinc-800">Hech narsa topilmadi</p>
            <p className="mt-2 text-zinc-500">Boshqa so‘z yoki kategoriyani tanlang.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
