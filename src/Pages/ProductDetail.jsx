import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addToCart } = useStore()
  const [qty, setQty] = useState(1)

  const product = useMemo(() => products.find((p) => p.id === id), [products, id])

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  }, [products, product])

  if (!product) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-lg font-medium text-zinc-800">Mahsulot topilmadi</p>
        <Link to="/catalog" className="mt-4 inline-block font-semibold text-amber-600 hover:underline">
          Katalogga qaytish
        </Link>
      </div>
    )
  }

  const add = () => {
    addToCart(product.id, qty)
    setQty(1)
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-zinc-600 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link to="/" className="hover:text-amber-600">
              Bosh sahifa
            </Link>
            <span className="text-zinc-300">/</span>
            <Link to="/catalog" className="hover:text-amber-600">
              Katalog
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="line-clamp-1 font-medium text-zinc-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg ring-1 ring-zinc-100">
              <div className="aspect-square bg-zinc-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Sifat kafolati</p>
                <p className="text-sm text-zinc-500">Rasmiy yetkazib beruvchi. Aloqada yordam.</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-amber-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Orqaga
            </button>

            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
              {product.category}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 font-mono text-xs text-zinc-400">SKU: {product.id}</p>

            <div className="mt-8 flex flex-wrap items-end gap-4 border-b border-zinc-200 pb-8">
              <div>
                <p className="text-sm font-medium text-zinc-500">Narxi</p>
                <p className="mt-1 text-4xl font-black text-amber-600 md:text-5xl">{formatSum(product.price)}</p>
                <p className="mt-1 text-sm text-zinc-500">QQS kiritilgan holda ko‘rsatiladi</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase text-zinc-400">Yetkazib berish</p>
                <p className="mt-1 text-sm font-bold text-zinc-900">1–3 kun</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase text-zinc-400">To‘lov</p>
                <p className="mt-1 text-sm font-bold text-zinc-900">Naqd / karta</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase text-zinc-400">Qaytarish</p>
                <p className="mt-1 text-sm font-bold text-zinc-900">14 kun</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Tavsif</h2>
              <div className="mt-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-base leading-relaxed text-zinc-700">
                  {product.description || 'Bu mahsulot uchun batafsil tavsif tez orada qo‘shiladi.'}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  aria-label="Kamaytirish"
                  className="rounded-xl px-4 py-3 text-lg font-medium text-zinc-600 hover:bg-zinc-50"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="min-w-[3rem] text-center text-lg font-bold text-zinc-900">{qty}</span>
                <button
                  type="button"
                  aria-label="Ko‘paytirish"
                  className="rounded-xl px-4 py-3 text-lg font-medium text-zinc-600 hover:bg-zinc-50"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={add}
                className="flex-1 rounded-2xl bg-zinc-900 py-4 text-center text-base font-bold text-white shadow-lg transition hover:bg-amber-500 sm:max-w-xs"
              >
                Savatga qo‘shish
              </button>
              <Link
                to="/cart"
                className="rounded-2xl border-2 border-zinc-900 py-4 text-center text-base font-bold text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:px-8"
              >
                Savatchaga
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-zinc-200 pt-14">
            <h2 className="text-2xl font-bold text-zinc-900">O‘xshash mahsulotlar</h2>
            <p className="mt-1 text-zinc-600">Xuddi shu kategoriyadan</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
