import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src="/Mensah_Logo.png" alt="Mensah" />
        </Link>
        <div className="navbar__links">
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/shop" className="navbar__link">Shop</Link>
        </div>
        <div className="navbar__actions">
          <Link to="/cart" className="navbar__cart">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="navbar__cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
