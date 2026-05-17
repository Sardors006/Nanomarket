import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'

export default function Cart() {
  const { cartLines, cartTotal, setCartQty, removeFromCart } = useStore()

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900">Savatcha</h1>
        <p className="mt-1 text-zinc-600">Miqdorni o‘zgartiring yoki mahsulotni o‘chiring.</p>

        {cartLines.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-zinc-700">Savatcha bo‘sh</p>
            <Link
              to="/catalog"
              className="mt-6 inline-flex rounded-2xl bg-zinc-900 px-6 py-3 font-semibold text-white hover:bg-amber-500"
            >
              Katalogga
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {cartLines.map((line) => (
              <li
                key={line.productId}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={line.product.image}
                  alt=""
                  className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-28"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-zinc-900">{line.product.name}</p>
                  <p className="text-sm text-zinc-500">{formatSum(line.product.price)} / dona</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-stretch">
                  <div className="flex items-center rounded-xl border border-zinc-200">
                    <button
                      type="button"
                      aria-label="Kamaytirish"
                      className="px-3 py-2 text-lg font-medium text-zinc-600 hover:bg-zinc-50"
                      onClick={() => setCartQty(line.productId, line.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center font-semibold">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Ko‘paytirish"
                      className="px-3 py-2 text-lg font-medium text-zinc-600 hover:bg-zinc-50"
                      onClick={() => setCartQty(line.productId, line.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.productId)}
                    className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    O‘chirish
                  </button>
                </div>
                <div className="text-right sm:w-36">
                  <p className="text-sm text-zinc-500">Jami</p>
                  <p className="text-lg font-bold text-amber-600">{formatSum(line.lineTotal)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cartLines.length > 0 && (
          <div className="mt-10 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-zinc-500">Umumiy summa</p>
              <p className="text-2xl font-bold text-zinc-900">{formatSum(cartTotal)}</p>
            </div>
            <Link
              to="/checkout"
              className="inline-flex justify-center rounded-2xl bg-zinc-900 px-8 py-3 font-semibold text-white transition hover:bg-amber-500"
            >
              Buyurtmani rasmiylashtirish
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
