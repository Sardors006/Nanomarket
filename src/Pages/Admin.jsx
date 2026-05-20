import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../hooks/useStore'
import { formatSum } from '../lib/format'

const ADMIN_KEY = 'nanomarket_admin_ok'

const emptyForm = {
  name: '',
  category: '',
  price: '',
  image: '',
  description: '',
}

function checkAdminPassword(value) {
  return value === '1387'
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_KEY) === '1')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

  const categoryCount = categories.length

  const login = (e) => {
    e.preventDefault()
    if (checkAdminPassword(password)) {
      sessionStorage.setItem(ADMIN_KEY, '1')
      setAuthed(true)
      setAuthError('')
      setPassword('')
    } else {
      setAuthError('Parol noto‘g‘ri')
    }
  }

  const logout = () => {
    sessionStorage.removeItem(ADMIN_KEY)
    setAuthed(false)
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      image: p.image,
      description: p.description,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  const save = (e) => {
    e.preventDefault()
    if (editingId) {
      updateProduct(editingId, form)
      cancelEdit()
    } else {
      addProduct(form)
      setForm(emptyForm)
    }
  }

  const onDelete = (id, name) => {
    if (window.confirm(`«${name}» o‘chirilsinmi?`)) deleteProduct(id)
    if (editingId === id) cancelEdit()
  }

  if (!authed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245,158,11,0.35), transparent), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(99,102,241,0.25), transparent)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.4))]" />

        <div className="relative w-full max-w-[420px]">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <svg className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">Boshqaruv paneli</h1>
            <p className="mt-2 text-sm text-zinc-400">Kirish uchun maxfiy parolingizni kiriting.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl backdrop-blur-2xl">
            <form onSubmit={login} className="space-y-5">
              <div>
                <label htmlFor="admin-pass" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Parol
                </label>
                <input
                  id="admin-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3.5 text-white placeholder:text-zinc-500 outline-none ring-amber-500/0 transition focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/20"
                  placeholder="••••"
                  autoComplete="current-password"
                />
                {authError && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-400">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                    {authError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-500/25 transition hover:from-amber-400 hover:to-orange-400"
              >
                Kirish
              </button>
            </form>
            <Link
              to="/"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              <span aria-hidden>←</span> Do‘konga qaytish
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-lg font-black text-amber-400 shadow-md">
              N
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">NanoMarket</p>
              <h1 className="text-lg font-bold text-zinc-900 sm:text-xl">Mahsulotlar boshqaruvi</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50/50"
            >
              Saytni ochish
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Jami mahsulot</p>
            <p className="mt-1 text-3xl font-black tabular-nums text-zinc-900">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Kategoriyalar</p>
            <p className="mt-1 text-3xl font-black tabular-nums text-amber-600">{categoryCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50/80 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/70">Holat</p>
            <p className="mt-1 text-sm font-semibold text-amber-950">Barcha o‘zgarishlar brauzerda saqlanadi</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white px-6 py-5 sm:px-8">
            <h2 className="text-lg font-bold text-zinc-900">
              {editingId ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo‘shish'}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {editingId ? 'Maydonlarni yangilab «Saqlash» ni bosing.' : 'Katalogga yangi pozitsiya qo‘shiladi.'}
            </p>
          </div>
          <form onSubmit={save} className="grid gap-5 p-6 sm:grid-cols-2 sm:gap-6 sm:p-8">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-zinc-700">Nomi</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/15"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700">Kategoriya</label>
              <input
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/15"
                list="admin-cats"
              />
              <datalist id="admin-cats">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="text-sm font-semibold text-zinc-700">Narx (so‘m)</label>
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/15"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-zinc-700">Rasm URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 font-mono text-sm text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/15"
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-zinc-700">Tavsif</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="mt-1.5 w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-500/15"
              />
            </div>
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-zinc-900 px-8 py-3 text-sm font-bold text-white shadow-md transition hover:bg-amber-500"
              >
                {editingId ? 'Saqlash' : 'Yaratish'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-xl border border-zinc-300 bg-white px-8 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50"
                >
                  Bekor qilish
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
          <div className="border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-white px-6 py-4 sm:px-8">
            <h2 className="text-lg font-bold text-zinc-900">Katalog ro‘yxati</h2>
            <p className="text-sm text-zinc-500">Tahrirlash yoki o‘chirish</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-100 text-left text-sm">
              <thead>
                <tr className="bg-zinc-50/90 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">Rasm</th>
                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">Mahsulot</th>
                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">Kategoriya</th>
                  <th className="whitespace-nowrap px-5 py-4 sm:px-6">Narx</th>
                  <th className="whitespace-nowrap px-5 py-4 text-right sm:px-6">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className={
                      editingId === p.id
                        ? 'bg-amber-50/60 ring-1 ring-inset ring-amber-200/80'
                        : 'transition hover:bg-zinc-50/80'
                    }
                  >
                    <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                      <img
                        src={p.image}
                        alt=""
                        className="h-14 w-20 rounded-xl object-cover shadow-sm ring-1 ring-zinc-200/80"
                      />
                    </td>
                    <td className="max-w-[200px] px-5 py-3 font-semibold text-zinc-900 sm:max-w-xs sm:px-6">
                      <span className="line-clamp-2">{p.name}</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-zinc-600 sm:px-6">
                      <span className="inline-flex rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-bold text-amber-700 sm:px-6">{formatSum(p.price)}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right sm:px-6">
                      <div className="inline-flex flex-wrap justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="rounded-lg bg-zinc-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-amber-500"
                        >
                          Tahrir
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(p.id, p.name)}
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          O‘chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
