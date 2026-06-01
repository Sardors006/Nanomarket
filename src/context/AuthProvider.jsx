import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

const USERS_KEY = 'nanomarket_users'
const SESSION_KEY = 'nanomarket_session'

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {
    /* ignore */
  }
  return []
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return null
}

function writeSession(session) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  else localStorage.removeItem(SESSION_KEY)
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  const signUp = useCallback(({ name, email, phone, password }) => {
    const trimmedName = name?.trim()
    const normEmail = normalizeEmail(email || '')
    const trimmedPhone = phone?.trim()
    const pwd = password || ''

    if (!trimmedName || trimmedName.length < 2) {
      return { ok: false, error: 'Ism kamida 2 ta belgidan iborat bo‘lsin.' }
    }
    if (!normEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normEmail)) {
      return { ok: false, error: 'To‘g‘ri email kiriting.' }
    }
    if (trimmedPhone && trimmedPhone.length < 9) {
      return { ok: false, error: 'Telefon raqamini to‘g‘ri kiriting.' }
    }
    if (pwd.length < 6) {
      return { ok: false, error: 'Parol kamida 6 ta belgidan iborat bo‘lsin.' }
    }

    const users = readUsers()
    if (users.some((u) => u.email === normEmail)) {
      return { ok: false, error: 'Bu email allaqachon ro‘yxatdan o‘tgan.' }
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name: trimmedName,
      email: normEmail,
      phone: trimmedPhone || '',
      password: pwd,
      createdAt: new Date().toISOString(),
    }
    writeUsers([newUser, ...users])

    const session = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
    }
    writeSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const signIn = useCallback(({ email, password }) => {
    const normEmail = normalizeEmail(email || '')
    const pwd = password || ''

    if (!normEmail || !pwd) {
      return { ok: false, error: 'Email va parolni kiriting.' }
    }

    const found = readUsers().find((u) => u.email === normEmail && u.password === pwd)
    if (!found) {
      return { ok: false, error: 'Email yoki parol noto‘g‘ri.' }
    }

    const session = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone,
      createdAt: found.createdAt,
    }
    writeSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const signOut = useCallback(() => {
    writeSession(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signUp,
      signIn,
      signOut,
    }),
    [user, signUp, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
