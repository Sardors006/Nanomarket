import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'

function initials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return (parts[0]?.[0] ?? '?').toUpperCase()
}

const MENU = [
  { to: '/catalog', label: 'Katalog' },
  { to: '/cart', label: 'Savatcha', showCount: true },
  { to: '/checkout', label: 'Buyurtma berish', needsCart: true },
  { to: '/', label: 'Bosh sahifa' },
]

export default function UserDashboard() {
  const { user, signOut } = useAuth()
  const { cartCount, cartTotal } = useStore()
  const firstName = user.name.split(' ')[0]

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
              {initials(user.name)}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-zinc-900">Salom, {firstName}</h1>
              <p className="truncate text-sm text-zinc-500">{user.email}</p>
            </div>
          </div>

          {cartCount > 0 ? (
            <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Savatchada <span className="font-semibold">{cartCount} ta</span>
              {' · '}
              <span className="font-semibold">{formatSum(cartTotal)}</span>
            </p>
          ) : (
            <p className="mt-4 text-sm text-zinc-400">Savatcha hozircha bo‘sh</p>
          )}
        </div>

        <nav className="px-2 py-2">
          {MENU.map((item) => {
            const disabled = item.needsCart && cartCount === 0
            const row = (
              <span className="flex flex-1 items-center justify-between gap-2">
                <span className={disabled ? 'text-zinc-400' : 'text-zinc-800'}>{item.label}</span>
                <span className="flex items-center gap-2 text-zinc-400">
                  {item.showCount && cartCount > 0 && (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[11px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                  {!disabled && <span aria-hidden>›</span>}
                </span>
              </span>
            )

            if (disabled) {
              return (
                <div
                  key={item.to}
                  className="mx-2 flex rounded-xl px-3 py-3 text-sm opacity-60"
                  title="Avval savatchaga mahsulot qo‘shing"
                >
                  {row}
                </div>
              )
            }

            return (
              <Link
                key={item.to}
                to={item.to}
                className="mx-2 flex rounded-xl px-3 py-3 text-sm transition hover:bg-zinc-50"
              >
                {row}
              </Link>
            )
          })}
        </nav>

        <div className="space-y-2 border-t border-zinc-100 px-4 py-4">
          <Link
            to="/catalog"
            className="block w-full rounded-xl bg-zinc-900 py-2.5 text-center text-sm font-semibold text-white hover:bg-amber-500"
          >
            Xarid qilish
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="w-full rounded-xl py-2.5 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-red-600"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  )
}
