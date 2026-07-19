import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { hackathonApi, resolveImageUrl, formatPrice } from '../api/hackathon';

export default function Home() {
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

  const featuredItems = items.slice(0, 4);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0' }}>
        <div className="loading-overlay__spinner" />
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        {items[0] && (
          <img
            src={resolveImageUrl(items[0].image_urls?.[0])}
            alt="Mensah Collection"
            className="hero__image"
          />
        )}
        <div className="hero__content">
          <h1 className="hero__title">Tailored for the Modern Man</h1>
          <p className="hero__subtitle">
            Luxury menswear crafted with precision. Discover pieces that define confidence.
          </p>
          <Link to="/shop" className="hero__cta">
            Shop Collection <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Featured Items */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">New Arrivals</h2>
          <Link to="/shop" className="section__link">View All</Link>
        </div>
        <div className="product-grid">
          {featuredItems.map(item => (
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
              </div>
              <div className="product-card__name">{item.name}</div>
              <div className="product-card__price">
                {formatPrice(item.price_minor, item.currency)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Virtual Try-On Banner */}
      <section className="section" style={{ textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <h2 className="section__title" style={{ marginBottom: 12 }}>Virtual Try-On</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.6, fontSize: '0.95rem' }}>
          See how any piece looks on you before you buy. Our AI-powered fitting room brings the boutique experience to your screen.
        </p>
        <Link to="/shop" className="hero__cta" style={{ background: 'var(--primary)', color: '#fff' }}>
          Try It Now <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
