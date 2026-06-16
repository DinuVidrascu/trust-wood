import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories as initialCategories } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem('trustera_wood_products');
    return localData ? JSON.parse(localData) : initialProducts;
  });

  // Sync products state to localStorage
  useEffect(() => {
    localStorage.setItem('trustera_wood_products', JSON.stringify(products));
  }, [products]);

  // Compute category counts dynamically based on active products
  const categories = initialCategories.map(cat => {
    const count = products.filter(p => p.category === cat.name).length;
    return {
      ...cat,
      count: `${count} ${count === 1 ? 'Model' : 'Modele'}`
    };
  });

  // Create a new product with safety defaults
  const addProduct = (newProduct) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithId = {
      ...newProduct,
      id: nextId,
      images: newProduct.images && newProduct.images.length > 0 ? newProduct.images : [newProduct.img],
      availableMaterials: newProduct.availableMaterials || [],
      availableColors: newProduct.availableColors || [],
      availableSizes: newProduct.availableSizes || [],
      swatches: newProduct.swatches || [],
      features: newProduct.features || []
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  // Update a product by ID
  const updateProduct = (id, updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  // Delete a product by ID
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Clear customizations and reset to original dataset
  const resetToDefault = () => {
    setProducts(initialProducts);
    localStorage.removeItem('trustera_wood_products');
  };

  return (
    <ProductsContext.Provider value={{
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefault
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
