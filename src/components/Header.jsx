function Header({ cartCount, onShowMenu, onShowCart }) {
  return (
    <header className="header">
      <h1 className="logo" style={{ cursor: 'pointer' }} onClick={onShowMenu}>CampusEats</h1>
      <nav className="nav">
        <button type="button" className="link" onClick={onShowMenu}>Vendors</button>
        <button type="button" className="link cart" onClick={onShowCart}>
          Cart <span className="badge">{cartCount}</span>
        </button>
      </nav>
    </header>
  )
}

export default Header