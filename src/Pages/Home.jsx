import { Link } from 'react-router-dom'
import Hero from '../Components/Hero'
import ProductCard from '../Components/ProductCard'
import { useStore } from '../hooks/useStore'

export default function Home() {
  const { products } = useStore()
  const featured = products.slice(0, 12)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-zinc-50/80 to-white">
      <Hero />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="mb-10 flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Tanlangan</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-900 md:text-3xl">
              Mashhur mahsulotlar
            </h2>
            <p className="mt-2 max-w-lg text-sm text-zinc-600 md:text-base">
              Eng ko‘p ko‘riladigan pozitsiyalar. Batafsil uchun kartochkani bosing.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center self-start rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold text-zinc-800 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 sm:self-auto"
          >
            Barcha katalog →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
