import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './Components/Layout'
import { StoreProvider } from './context/StoreProvider'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

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
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  )
}
