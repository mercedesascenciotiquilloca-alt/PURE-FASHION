import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => boolean;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toastMessage: { text: string; image?: string; show: boolean } | null;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pure_fashion_cart_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return getStorageItem<CartItem[]>(CART_STORAGE_KEY, []);
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; image?: string; show: boolean } | null>(null);

  useEffect(() => {
    setStorageItem(CART_STORAGE_KEY, cart);
  }, [cart]);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const hideToast = () => {
    setToastMessage((prev) => (prev ? { ...prev, show: false } : null));
  };

  const showToast = (text: string, image?: string) => {
    setToastMessage({ text, image, show: true });
    setTimeout(() => {
      setToastMessage((prev) => (prev ? { ...prev, show: false } : null));
    }, 3500);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1): boolean => {
    if (!size || !color) {
      return false;
    }

    const cartItemId = `${product.id}-${size}-${color}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const existingItem = prevCart[existingIndex];
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
        return updated;
      } else {
        const safeQuantity = Math.min(quantity, product.stock);
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: safeQuantity
          }
        ];
      }
    });

    showToast(`¡Prenda agregada al carrito! (${product.name} - ${size})`, product.images[0]);
    return true;
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const clamped = Math.min(newQty, item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toastMessage,
        hideToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
