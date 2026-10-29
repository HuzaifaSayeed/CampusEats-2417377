import { Outlet } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function Layout() {
  const { count } = useCart()

  return (
    <>
      <Header cartCount={count} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout