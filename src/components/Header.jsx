import { NavLink } from 'react-router'

function Header({ cartCount }) {
  return (
    <header className="header">
      <NavLink className="logo-link logo" to="/">CampusEats</NavLink>
      <nav className="nav">
        <NavLink className="link" to="/" end>Vendors</NavLink>
        <NavLink className="link" to="/orders">My Orders</NavLink>
        <NavLink className="link cart" to="/cart">
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header