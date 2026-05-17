import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'
import { stableRating, stableReviewCount } from '../lib/rating'

export default function ProductCard({ product }) {
  const { addToCart } = useStore()
  const rating = stableRating(product.id)
  const reviews = stableReviewCount(product.id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.02] transition duration-300 hover:-translate-y-1 hover:border-amber-200/90 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.14)] hover:ring-amber-500/10">
      <Link
        to={`/product/${product.id}`}
        className="relative block bg-gradient-to-b from-zinc-50 to-zinc-100/80 p-3 sm:p-3.5"
      >
        <div className="relative aspect-[1/1] overflow-hidden rounded-xl bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-zinc-200/60">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>
        <span className="absolute left-5 top-5 rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-700 shadow-md ring-1 ring-zinc-200/80 backdrop-blur-sm sm:left-6 sm:top-6 sm:text-xs">
          {product.category}
        </span>
        <span className="absolute right-5 top-5 rounded-lg bg-emerald-500/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md sm:right-6 sm:top-6 sm:text-xs">
          Tez
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 sm:px-4 sm:pb-4 sm:pt-3.5">
        <div className="mb-2 flex items-center gap-1.5 text-amber-500">
          <span className="text-[13px] leading-none tracking-tight">★★★★★</span>
          <span className="text-xs font-semibold text-zinc-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-zinc-400">({reviews})</span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 min-h-[2.5rem] text-[0.9375rem] font-bold leading-snug text-zinc-900 transition group-hover:text-amber-700 sm:min-h-[2.75rem] sm:text-base"
        >
          {product.name}
        </Link>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-zinc-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Narx</p>
            <p className="text-lg font-black tracking-tight text-amber-600 sm:text-xl">{formatSum(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product.id, 1)
            }}
            className="rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-amber-500 hover:shadow-lg active:scale-[0.97] sm:px-5 sm:text-sm"
          >
            Savatga
          </button>
        </div>
      </div>
    </article>
  )
}
