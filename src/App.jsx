import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './Components/Layout'
import { AuthProvider } from './context/AuthProvider'
import { StoreProvider } from './context/StoreProvider'
import Auth from './Pages/Auth'
import Admin from './Pages/Admin'
import Cart from './Pages/Cart'
import Catalog from './Pages/Catalog'
import Checkout from './Pages/Checkout'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'

function LoadingScreen() {
  return (
    <div className="container">
      <div className="box" />
    </div>
  )
}

function AppRoutes() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </StoreProvider>
  )
}
