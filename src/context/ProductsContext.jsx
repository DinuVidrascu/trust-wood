import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts, categories as initialCategories } from '../data/products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem('trustera_wood_products');
    let parsedProducts = localData ? JSON.parse(localData) : initialProducts;
    
    // Inject default configOptions for products that don't have them
    return parsedProducts.map(p => {
      if (p.configOptions) return p;
      
      const fabrics = p.category !== 'Mese' ? [
        { name: 'Catifea Premium', cost: 0, desc: 'Moale, hidrofobă, fină' },
        { name: 'Bouclé Texturat', cost: 1200, desc: 'Tridimensional, la modă' },
        { name: 'In Premium', cost: 800, desc: 'Fibre naturale, respirabil' }
      ] : [];

      const wood = [
        { name: 'Stejar Natur', cost: 0, desc: 'Tradițional, luminos' },
        { name: 'Stejar Afumat', cost: 400, desc: 'Modern, sobru, întunecat' },
        { name: 'Nuc Elegance', cost: 900, desc: 'Contrast bogat, clasic' }
      ];

      let dimensions = [];
      if (p.category === 'Canapele' || p.category === 'Scaune') {
        dimensions = [
          { name: 'Standard (220cm)', cost: 0, desc: '220 cm' },
          { name: 'Mediu (250cm)', cost: 1800, desc: '250 cm' },
          { name: 'Lung (280cm)', cost: 3500, desc: '280 cm' }
        ];
      } else if (p.category === 'Paturi') {
        dimensions = [
          { name: '140x200 cm', cost: 0, desc: 'Saltea 140' },
          { name: '160x200 cm', cost: 1500, desc: 'Saltea 160' },
          { name: '180x200 cm', cost: 3000, desc: 'Saltea 180' },
          { name: '200x200 cm', cost: 4500, desc: 'Saltea 200' }
        ];
      } else if (p.category === 'Mese') {
        dimensions = [
          { name: 'L 140 cm', cost: 0, desc: '6 Persoane' },
          { name: 'L 180 cm', cost: 2000, desc: '8 Persoane' },
          { name: 'L 220 cm', cost: 3500, desc: '10 Persoane' }
        ];
      }

      return { ...p, configOptions: { fabrics, wood, dimensions } };
    });
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
