import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const normalizedVendors = Array.isArray(data)
          ? data.reduce((acc, vendor) => {
              const key = vendor.id ?? vendor.name
              if (acc.some((existing) => (existing.id ?? existing.name) === key)) {
                return acc
              }

              acc.push({
                ...vendor,
                menu: Array.isArray(vendor.menu)
                  ? Array.from(new Map((vendor.menu || []).map((item) => [item.id ?? item.name, item])).values())
                  : []
              })
              return acc
            }, [])
          : []

        setVendors(normalizedVendors)
        if (normalizedVendors.length > 0) {
          setSelectedVendorId((prev) => prev || normalizedVendors[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1, note: '' }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => {
          if (line.item.id === itemId) {
            const newQty = line.qty + delta
            return newQty > 0 ? { ...line, qty: newQty } : null
          }
          return line
        })
        .filter(Boolean)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handleUpdateNote(itemId, note) {
    setCart((prevCart) =>
      prevCart.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total, items: cart })
    setCart([])
    setView('done')
  }

  let content

  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onUpdateNote={handleUpdateNote}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed successfully!</h2>
        <p><strong>Name:</strong> {lastOrder?.name}</p>
        <p><strong>Mahallah:</strong> Mahallah {lastOrder?.mahallah}</p>
        <p><strong>Pickup Time:</strong> {lastOrder?.pickupTime}</p>
        <p><strong>Total Paid:</strong> RM {lastOrder?.total.toFixed(2)}</p>
        <button type="button" className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to Menu
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList items={selectedVendor.menu} onAdd={handleAddToCart} />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App