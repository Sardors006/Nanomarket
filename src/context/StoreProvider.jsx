import { useCallback, useMemo, useState } from 'react'
import { SEED_PRODUCTS } from '../data/seedProducts'
import { StoreContext } from './storeContext'

const PRODUCTS_KEY = 'nanomarket_products'
const CART_KEY = 'nanomarket_cart'

/** Saqlangan mahsulotlar + yangi seed IDlar birlashtiriladi */
function mergeWithSeed(stored) {
  if (!Array.isArray(stored) || stored.length === 0) {
    return SEED_PRODUCTS.map((p) => ({ ...p }))
  }
  const seedIds = new Set(SEED_PRODUCTS.map((p) => p.id))
  const byId = new Map(stored.map((p) => [p.id, p]))
  const merged = SEED_PRODUCTS.map((sp) => {
    const local = byId.get(sp.id)
    return local ? { ...sp, ...local } : { ...sp }
  })
  for (const p of stored) {
    if (!seedIds.has(p.id)) merged.push(p)
  }
  return merged
}

function readProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return mergeWithSeed(parsed)
    }
  } catch {
    /* ignore */
  }
  return SEED_PRODUCTS.map((p) => ({ ...p }))
}

function writeProducts(list) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(list))
}

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* ignore */
  }
  return []
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => readProducts())
  const [cart, setCart] = useState(() => readCart())

  const persistProducts = useCallback((next) => {
    setProducts(next)
    writeProducts(next)
  }, [])

  const persistCart = useCallback((next) => {
    setCart(next)
    writeCart(next)
  }, [])

  const addProduct = useCallback(
    (payload) => {
      const id = `p_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
      const item = {
        id,
        name: payload.name?.trim() || 'Nomsiz',
        category: payload.category?.trim() || 'Boshqa',
        price: Number(payload.price) || 0,
        image: payload.image?.trim() || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
        description: payload.description?.trim() || '',
      }
      persistProducts([item, ...products])
      return id
    },
    [products, persistProducts]
  )

  const updateProduct = useCallback(
    (id, payload) => {
      persistProducts(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                name: payload.name?.trim() ?? p.name,
                category: payload.category?.trim() ?? p.category,
                price: Number(payload.price) >= 0 ? Number(payload.price) : p.price,
                image: payload.image?.trim() || p.image,
                description: payload.description?.trim() ?? p.description,
              }
            : p
        )
      )
    },
    [products, persistProducts]
  )

  const deleteProduct = useCallback(
    (id) => {
      persistProducts(products.filter((p) => p.id !== id))
      persistCart(cart.filter((c) => c.productId !== id))
    },
    [products, cart, persistProducts, persistCart]
  )

  const addToCart = useCallback(
    (productId, qty = 1) => {
      const n = Math.max(1, Number(qty) || 1)
      const idx = cart.findIndex((c) => c.productId === productId)
      if (idx === -1) {
        persistCart([...cart, { productId, quantity: n }])
      } else {
        const next = [...cart]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + n }
        persistCart(next)
      }
    },
    [cart, persistCart]
  )

  const setCartQty = useCallback(
    (productId, quantity) => {
      const q = Math.max(0, Math.floor(Number(quantity) || 0))
      if (q === 0) {
        persistCart(cart.filter((c) => c.productId !== productId))
        return
      }
      persistCart(
        cart.map((c) => (c.productId === productId ? { ...c, quantity: q } : c))
      )
    },
    [cart, persistCart]
  )

  const removeFromCart = useCallback(
    (productId) => {
      persistCart(cart.filter((c) => c.productId !== productId))
    },
    [cart, persistCart]
  )

  const clearCart = useCallback(() => {
    persistCart([])
  }, [persistCart])

  const cartCount = useMemo(
    () => cart.reduce((s, c) => s + c.quantity, 0),
    [cart]
  )

  const cartLines = useMemo(() => {
    return cart
      .map((c) => {
        const product = products.find((p) => p.id === c.productId)
        if (!product) return null
        return { ...c, product, lineTotal: product.price * c.quantity }
      })
      .filter(Boolean)
  }, [cart, products])

  const cartTotal = useMemo(
    () => cartLines.reduce((s, l) => s + l.lineTotal, 0),
    [cartLines]
  )

  const searchProducts = useCallback(
    (query, category) => {
      const q = (query || '').trim().toLowerCase()
      return products.filter((p) => {
        const catOk = !category || p.category === category
        if (!q) return catOk
        const blob = `${p.name} ${p.description} ${p.category}`.toLowerCase()
        return catOk && blob.includes(q)
      })
    },
    [products]
  )

  const value = useMemo(
    () => ({
      products,
      cart,
      cartCount,
      cartLines,
      cartTotal,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      setCartQty,
      removeFromCart,
      clearCart,
      searchProducts,
    }),
    [
      products,
      cart,
      cartCount,
      cartLines,
      cartTotal,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      setCartQty,
      removeFromCart,
      clearCart,
      searchProducts,
    ]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
