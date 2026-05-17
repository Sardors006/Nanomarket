import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center text-sm text-zinc-500 sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} NanoMarket — onlayn do‘kon.</p>
          <p className="max-w-md">
            Savatcha va mahsulotlar brauzeringizda saqlanadi (localStorage). Admin: parol bilan kirish.
          </p>
        </div>
      </footer>
    </div>
  )
}
