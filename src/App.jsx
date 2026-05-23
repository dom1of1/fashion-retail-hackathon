import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import TryOn from './pages/TryOn';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:itemId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/try-on/:itemId" element={<TryOn />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer__container">
          <p>&copy; 2026 Mensah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
