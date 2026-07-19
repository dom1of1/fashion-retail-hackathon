import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hackathonApi, resolveImageUrl, formatPrice } from '../api/hackathon';

export default function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const inventory = await hackathonApi.getInventory();
        setItems(inventory);
      } catch (err) {
        console.error('Failed to load inventory:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0' }}>
        <div className="loading-overlay__spinner" />
      </div>
    );
  }

  return (
    <div>
      <div className="shop-header">
        <h1 className="shop-header__title">Collection</h1>
        <p className="shop-header__count">{items.length} pieces</p>
      </div>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="product-grid">
          {items.map(item => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="product-card"
            >
              <div className="product-card__image-wrap">
                <img
                  src={resolveImageUrl(item.image_urls?.[0])}
                  alt={item.name}
                  className="product-card__image"
                />
                {!item.in_stock && (
                  <span className="product-card__badge">Sold Out</span>
                )}
              </div>
              <div className="product-card__name">{item.name}</div>
              <div className="product-card__price">
                {formatPrice(item.price_minor, item.currency)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
