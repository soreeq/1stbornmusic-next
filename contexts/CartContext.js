'use client';
import { createContext, useContext, useState, useRef } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2800);
  };

  const addToCart = (beat, lic) => {
    setItems(prev => {
      const exists = prev.find(i => i.beat._id === beat._id && i.licenseKey === lic.key);
      if (exists) { showToast('Already in cart'); return prev; }
      showToast(`${beat.title} added to cart`);
      return [...prev, { id: `${beat._id}-${lic.key}`, beat, licenseKey: lic.key, licName: lic.name, price: lic.price }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, isOpen, toast, addToCart, removeFromCart, clearCart, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}