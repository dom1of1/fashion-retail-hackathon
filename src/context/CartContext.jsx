import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mensah_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mensah_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.item_id === item.id);
      if (existing) {
        return prev.map(i => 
          i.item_id === item.id 
            ? { ...i, qty: i.qty + qty } 
            : i
        );
      }
      return [...prev, { item_id: item.id, item, qty }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.item_id !== itemId));
  };

  const updateQuantity = (itemId, qty) => {
    if (qty < 1) return removeFromCart(itemId);
    setCartItems(prev => 
      prev.map(i => i.item_id === itemId ? { ...i, qty } : i)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((total, item) => total + (item.item.price_minor * item.qty), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
