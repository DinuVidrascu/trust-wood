import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('trustera_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Synchronize state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('trustera_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  const addToWishlist = (item) => {
    // Check if item with exact same configuration already exists
    const exists = wishlist.some(existing => 
      existing.id === item.id &&
      existing.fabricType === item.fabricType &&
      existing.swatchName === item.swatchName &&
      existing.woodType === item.woodType &&
      existing.dimension === item.dimension
    );

    if (exists) {
      // Open drawer to show it's already there
      setDrawerOpen(true);
      return false; // Already exists
    }

    setWishlist(prev => [item, ...prev]);
    setDrawerOpen(true); // Automatically open wishlist drawer to give visual feedback
    return true;
  };

  const removeFromWishlist = (index) => {
    setWishlist(prev => prev.filter((_, i) => i !== index));
  };

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      drawerOpen,
      setDrawerOpen,
      toggleDrawer,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}
