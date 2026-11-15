
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }

      return [...prev, {
        product,
        count: 1,
        price: product.price,
      }];
    });
  };

  const removeItem = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );
  };

  const updateQuantity = (productId, count) => {
    if (count < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, count }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.count,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        addToCart,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
