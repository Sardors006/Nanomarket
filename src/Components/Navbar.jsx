import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../hooks/useAuth'
import { useStore } from '../hooks/useStore'

export default function Navbar() {
  const { cartCount } = useStore()
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const onSearch = (e) => {
    e.preventDefault()
    const trimmed = q.trim()
    navigate(trimmed ? `/catalog?q=${encodeURIComponent(trimmed)}` : '/catalog')
    setMenuOpen(false)
  }

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition ${isActive ? 'text-amber-600' : 'text-zinc-700 hover:text-amber-600'}`

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="NanoMarket" className="h-11 w-auto rounded-xl object-contain ring-1 ring-zinc-100" />
          <span className="text-xl font-extrabold tracking-tight text-zinc-900">
            Nano<span className="text-amber-500">market</span>
          </span>
        </Link>

        <form
          onSubmit={onSearch}
          className="order-3 flex w-full flex-1 items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 md:order-none md:max-w-md lg:max-w-xl"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-zinc-400" aria-hidden>
            <path
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Mahsulot qidirish..."
            className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            aria-label="Qidiruv"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-500"
          >
            Qidirish
          </button>
        </form>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={navClass} end>
              Bosh sahifa
            </NavLink>
            <NavLink to="/catalog" className={navClass}>
              Katalog
            </NavLink>
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
            <NavLink to="/auth" className={navClass}>
              {isAuthenticated ? user.name.split(' ')[0] : 'Kirish'}
            </NavLink>
          </nav>

          <Link
            to="/cart"
            className="relative rounded-xl p-2 text-zinc-800 ring-1 ring-zinc-200/80 transition hover:bg-zinc-50"
            aria-label="Savatcha"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rounded-xl p-2 text-zinc-700 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Menyu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink to="/" className={navClass} end onClick={() => setMenuOpen(false)}>
              Bosh sahifa
            </NavLink>
            <NavLink to="/catalog" className={navClass} onClick={() => setMenuOpen(false)}>
              Katalog
            </NavLink>
            <NavLink to="/cart" className={navClass} onClick={() => setMenuOpen(false)}>
              Savatcha
            </NavLink>
            <NavLink to="/admin" className={navClass} onClick={() => setMenuOpen(false)}>
              Admin
            </NavLink>
            <NavLink to="/auth" className={navClass} onClick={() => setMenuOpen(false)}>
              {isAuthenticated ? user.name.split(' ')[0] : 'Kirish'}
            </NavLink>
            {isAuthenticated && (
              <button
                type="button"
                className="text-left text-sm font-semibold text-zinc-700 hover:text-amber-600"
                onClick={() => {
                  signOut()
                  setMenuOpen(false)
                }}
              >
                Chiqish
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
