import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('trustera_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  // Synchronize state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('trustera_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      // Check if item with exact same configuration already exists
      const existingIdx = prev.findIndex(existing => 
        existing.id === item.id &&
        existing.fabricType === item.fabricType &&
        existing.swatchName === item.swatchName &&
        existing.woodType === item.woodType &&
        existing.dimension === item.dimension
      );

      if (existingIdx > -1) {
        // Increment quantity of existing item
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity || 1;
        // Optionally update price if it has changed (configurator might have different pricing)
        updated[existingIdx].price = item.price;
        return updated;
      } else {
        // Add new item with quantity
        return [{ ...item, quantity: item.quantity || 1 }, ...prev];
      }
    });
    
    setCartOpen(true); // Open cart drawer to give visual feedback
    return true;
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      if (updated[index]) {
        const newQty = updated[index].quantity + delta;
        if (newQty <= 0) {
          // If quantity becomes 0, remove the item
          return prev.filter((_, i) => i !== index);
        } else {
          updated[index].quantity = newQty;
          return updated;
        }
      }
      return prev;
    });
  };

  const toggleCart = () => {
    setCartOpen(prev => !prev);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      cartOpen,
      setCartOpen,
      toggleCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
