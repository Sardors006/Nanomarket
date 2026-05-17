import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'

export default function Checkout() {
  const { cartLines, cartTotal, clearCart } = useStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !address.trim()) return
    clearCart()
    setDone(true)
    setTimeout(() => navigate('/'), 2200)
  }

  if (cartLines.length === 0 && !done) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-16 text-center">
        <p className="text-lg text-zinc-700">Savatchada mahsulot yo‘q.</p>
        <Link to="/catalog" className="mt-4 inline-block font-semibold text-amber-600">
          Katalogga qaytish
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
        <div className="max-w-md rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            ✓
          </div>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">Rahmat!</h2>
          <p className="mt-2 text-zinc-600">Buyurtmangiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-zinc-900">Rasmiylashtirish</h1>
          <p className="mt-1 text-zinc-600">Yetkazib berish uchun ma’lumotlarni kiriting.</p>

          <form
            id="checkout-form"
            onSubmit={submit}
            className="mt-8 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="co-name">
                Ism familiya
              </label>
              <input
                id="co-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none ring-amber-500/30 focus:ring-4"
                placeholder="Masalan: Ali Valiyev"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="co-phone">
                Telefon
              </label>
              <input
                id="co-phone"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none ring-amber-500/30 focus:ring-4"
                placeholder="+998 __ ___ __ __"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700" htmlFor="co-addr">
                Manzil
              </label>
              <textarea
                id="co-addr"
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none ring-amber-500/30 focus:ring-4"
                placeholder="Shahar, ko‘cha, uy"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-zinc-900 py-3.5 font-semibold text-white transition hover:bg-amber-500 lg:hidden"
            >
              Buyurtmani tasdiqlash
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900">Buyurtma</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
              {cartLines.map((l) => (
                <li key={l.productId} className="flex justify-between gap-2 text-zinc-600">
                  <span className="min-w-0 truncate">
                    {l.product.name} × {l.quantity}
                  </span>
                  <span className="shrink-0 font-medium text-zinc-900">{formatSum(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-zinc-100 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Jami</span>
                <span className="text-amber-600">{formatSum(cartTotal)}</span>
              </div>
            </div>
            <button
              type="submit"
              form="checkout-form"
              className="mt-6 hidden w-full rounded-2xl bg-zinc-900 py-3.5 font-semibold text-white transition hover:bg-amber-500 lg:block"
            >
              Buyurtmani tasdiqlash
            </button>
            <p className="mt-4 text-xs text-zinc-500">
              Demo loyiha: to‘lov va server yo‘q. Ma’lumotlar brauzerda saqlanmaydi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
