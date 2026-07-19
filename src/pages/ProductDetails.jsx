import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Scan } from 'lucide-react';
import { hackathonApi, resolveImageUrl, formatPrice } from '../api/hackathon';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await hackathonApi.getItem(itemId);
        setItem(data);
      } catch (err) {
        console.error('Failed to load item:', err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [itemId]);

  const handleAddToCart = () => {
    if (!item || !item.in_stock) return;
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0' }}>
        <div className="loading-overlay__spinner" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="page" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p>Item not found.</p>
        <Link to="/shop" style={{ color: 'var(--text-secondary)', marginTop: 16, display: 'inline-block' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const imageUrl = resolveImageUrl(item.image_urls?.[0]);

  return (
    <div className="pdp">
      <div className="pdp__gallery">
        <img src={imageUrl} alt={item.name} />
      </div>

      <div className="pdp__info">
        <Link
          to="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            marginBottom: 24,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <h1 className="pdp__name">{item.name}</h1>
        <p className="pdp__price">{formatPrice(item.price_minor, item.currency)}</p>

        <div className="pdp__stock">
          <span className={`pdp__stock-dot${item.in_stock ? '' : ' pdp__stock-dot--out'}`} />
          {item.in_stock ? 'In Stock' : 'Out of Stock'}
        </div>

        {item.description && (
          <p className="pdp__description">{item.description}</p>
        )}

        <div className="pdp__actions">
          <button
            className="pdp__btn pdp__btn--primary"
            onClick={handleAddToCart}
            disabled={!item.in_stock}
          >
            <ShoppingBag size={16} />
            {added ? 'Added to Bag' : 'Add to Bag'}
          </button>

          <button
            className="pdp__btn pdp__btn--secondary"
            onClick={() => navigate(`/try-on/${item.id}`)}
          >
            <Scan size={16} />
            Virtual Try-On
          </button>
        </div>
      </div>
    </div>
  );
}
