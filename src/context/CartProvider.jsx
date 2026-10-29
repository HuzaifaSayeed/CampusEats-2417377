import { useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { CartContext } from './cart-context.js'

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  const addToCart = useCallback((item) => {
    setCart((previousCart) => {
      const existingLine = previousCart.find(
        (line) => line.item.id === item.id
      )

      if (existingLine) {
        return previousCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previousCart, { item, qty: 1 }]
    })
  }, [setCart])

  const changeQty = useCallback((itemId, delta) => {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }, [setCart])

  const removeFromCart = useCallback((itemId) => {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }, [setCart])

  const updateNote = useCallback((itemId, note) => {
    setCart((previousCart) =>
      previousCart.map((line) =>
        line.item.id === itemId ? { ...line, note } : line
      )
    )
  }, [setCart])

  const placeOrder = useCallback((details) => {
    const orderTotal = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    const order = {
      id: `order-${Date.now()}`,
      ...details,
      items: cart.map((line) => ({
        item: line.item,
        qty: line.qty,
        note: line.note,
      })),
      total: orderTotal,
      placedAt: new Date().toISOString(),
    }

    setOrders((previousOrders) => [order, ...previousOrders])
    setCart([])

    return order
  }, [cart, setCart, setOrders])

  const value = useMemo(
    () => ({
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      updateNote,
      placeOrder,
    }),
    [
      cart,
      orders,
      count,
      total,
      addToCart,
      changeQty,
      removeFromCart,
      updateNote,
      placeOrder,
    ]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider