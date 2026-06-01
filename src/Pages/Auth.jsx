import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDashboard from '../Components/UserDashboard'
import { useAuth } from '../hooks/useAuth'

export default function Auth() {
  const [tab, setTab] = useState('signin')
  const { signIn, signUp, isAuthenticated } = useAuth()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const switchTab = (next) => {
    setTab(next)
    setError('')
  }

  if (isAuthenticated) {
    return <UserDashboard />
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (tab === 'signin') {
      const res = signIn({ email, password })
      if (!res.ok) setError(res.error)
      return
    }

    const res = signUp({ name, email, phone: '', password })
    if (!res.ok) setError(res.error)
  }

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-xl font-bold text-zinc-900">Kirish</h1>

        <div className="mt-5 flex gap-1 rounded-xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => switchTab('signin')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              tab === 'signin' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchTab('signup')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${
              tab === 'signup' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <form onSubmit={submit} className="mt-5 space-y-3">
          {tab === 'signup' && (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ismingiz"
              className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol (kamida 6 belgi)"
            autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-amber-500"
          >
            {tab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-zinc-500 hover:text-amber-600">
            ← Orqaga
          </Link>
        </p>
      </div>
    </div>
  )
}
