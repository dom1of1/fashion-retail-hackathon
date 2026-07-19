import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { hackathonApi, resolveImageUrl, formatPrice } from '../api/hackathon';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const currency = cartItems.length > 0 ? cartItems[0].item.currency : 'GHS';

  const buildWhatsAppMessage = () => {
    let msg = `🛍️ *New Order from Mensah*\n\n`;
    msg += `*Customer:* ${customerName}\n`;
    msg += `*Delivery Location:* ${deliveryLocation}\n\n`;
    msg += `*Items:*\n`;
    cartItems.forEach(ci => {
      msg += `• ${ci.item.name} × ${ci.qty} — ${formatPrice(ci.item.price_minor * ci.qty, ci.item.currency)}\n`;
    });
    msg += `\n*Total:* ${formatPrice(cartTotal, currency)}`;
    return encodeURIComponent(msg);
  };

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!deliveryLocation.trim()) {
      setError('Please enter your delivery location.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // 1. Create basket via the hackathon API for data integrity
      const basketItems = cartItems.map(ci => ({
        item_id: ci.item_id,
        qty: ci.qty,
      }));

      await hackathonApi.createBasket('mensah', basketItems, {
        name: customerName,
        phone: '', // not collecting phone, using WhatsApp redirect instead
      });

      // 2. Open WhatsApp with the order message
      const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
      const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
      const message = buildWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

      // Clear cart before redirecting
      clearCart();

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

    } catch (err) {
      console.error('Checkout failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page__title">Your Bag</h1>

      {cartItems.length === 0 ? (
        <div className="cart-page__empty">
          <p>Your bag is empty.</p>
          <Link to="/shop" className="btn btn--primary" style={{ display: 'inline-flex', width: 'auto' }}>
            Shop Collection
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map(ci => (
            <div className="cart-item" key={ci.item_id}>
              <img
                src={resolveImageUrl(ci.item.image_urls?.[0])}
                alt={ci.item.name}
                className="cart-item__image"
              />
              <div className="cart-item__details">
                <div>
                  <div className="cart-item__name">{ci.item.name}</div>
                  <div className="cart-item__price">
                    {formatPrice(ci.item.price_minor, ci.item.currency)}
                  </div>
                </div>
                <div className="cart-item__controls">
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(ci.item_id, ci.qty - 1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="cart-item__qty">{ci.qty}</span>
                  <button
                    className="cart-item__qty-btn"
                    onClick={() => updateQuantity(ci.item_id, ci.qty + 1)}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(ci.item_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="cart-summary__row">
              <span className="cart-summary__label">Total</span>
              <span className="cart-summary__value">{formatPrice(cartTotal, currency)}</span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="cart-checkout-form">
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Delivery Location (e.g. East Legon, Accra)"
                value={deliveryLocation}
                onChange={e => setDeliveryLocation(e.target.value)}
              />
            </div>

            <button
              className="btn btn--primary"
              style={{ width: '100%' }}
              onClick={handleCheckout}
              disabled={submitting}
            >
              {submitting ? 'Processing...' : 'Checkout via WhatsApp'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
