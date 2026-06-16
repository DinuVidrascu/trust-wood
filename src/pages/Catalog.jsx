import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

  const [activeCategory, setActiveCategory] = useState('Toate');
  const [activeMaterial, setActiveMaterial] = useState('Toate');
  const [activeWood, setActiveWood] = useState('Toate');
  const [activeColor, setActiveColor] = useState('Toate');
  const [activeSize, setActiveSize] = useState('Toate');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Extract dynamic filters from product data
  const availableMaterials = Array.from(new Set(
    products
      .filter(p => ['Canapele', 'Scaune', 'Paturi', 'Fotolii'].includes(p.category))
      .flatMap(p => p.availableMaterials || [])
  ));

  const availableWoodTypes = [
    'Stejar Natur',
    'Stejar Afumat',
    'Nuc Elegance',
    'MDF Lăcuit'
  ];

  const availableColors = Array.from(new Set(
    products.flatMap(p => p.availableColors || [])
  )).filter(color => color !== 'Bej' && color !== 'Gri' && color !== 'Verde');

  const availableSizes = Array.from(new Set(
    products.flatMap(p => p.availableSizes || [])
  ));

  // Set active category when query param changes
  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory('Toate');
    }
  }, [catParam]);

  // Handle active category selection
  const handleCategoryChange = (category) => {
    if (category === 'Toate') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', category);
    }
    setSearchParams(searchParams);
    setActiveCategory(category);
  };

  // Filter and sort logic
  const getProcessedProducts = () => {
    let list = [...products];

    // Filter by Category
    if (activeCategory !== 'Toate') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by Material (Fabrics)
    if (activeMaterial !== 'Toate') {
      list = list.filter(p => p.availableMaterials && p.availableMaterials.includes(activeMaterial));
    }

    // Filter by Wood Type / Hard Materials
    if (activeWood !== 'Toate') {
      list = list.filter(p => {
        // Tables (Mese)
        if (p.category === 'Mese') {
          if (activeWood === 'Stejar Natur') {
            return p.availableColors && p.availableColors.includes('Natural Oak');
          }
          if (activeWood === 'Stejar Afumat') {
            return p.availableColors && p.availableColors.includes('Smoked Black');
          }
          if (activeWood === 'MDF Lăcuit') {
            return p.availableMaterials && p.availableMaterials.includes('MDF Lăcuit');
          }
          return false;
        }
        
        // For other products (Canapele, Fotolii, Scaune)
        // They can be configured with Stejar Natur, Stejar Afumat, or Nuc Elegance
        if (['Stejar Natur', 'Stejar Afumat', 'Nuc Elegance'].includes(activeWood)) {
          return true;
        }
        return false;
      });
    }

    // Filter by Color
    if (activeColor !== 'Toate') {
      list = list.filter(p => p.availableColors && p.availableColors.includes(activeColor));
    }

    // Filter by Size
    if (activeSize !== 'Toate') {
      list = list.filter(p => p.availableSizes && p.availableSizes.includes(activeSize));
    }

    // Filter by Search Query
    if (searchQuery.trim().length >= 1) {
      list = list.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    if (sortBy === 'price-asc') {
      list.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, ''));
        const priceB = parseFloat(b.price.replace(/\s/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, ''));
        const priceB = parseFloat(b.price.replace(/\s/g, ''));
        return priceB - priceA;
      });
    }

    return list;
  };

  const processedList = getProcessedProducts();

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('Toate');
    setActiveMaterial('Toate');
    setActiveWood('Toate');
    setActiveColor('Toate');
    setActiveSize('Toate');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page-entrance subpage" style={{ minHeight: '80vh' }}>
      <section className="section">
        
        {/* CATALOG HEADER */}
        <div className="section-header" style={{ marginBottom: '30px' }}>
          <div>
            <span className="section-title">Catalog</span>
            <h1 className="section-heading title-serif">Colecția Completă</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '14px' }}>
            Alege din gama noastră de piese exclusiviste. Fiecare model poate fi tapițat în stofa dorită și configurat la dimensiunile potrivite.
          </p>
        </div>

        {/* SEARCH, FILTER & SORT BAR */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          padding: '16px 20px',
          background: 'var(--bg-card)',
          borderRadius: '4px',
          border: '1px solid var(--border)'
        }} className="catalog-filter-bar">
          
          {/* Inner Search */}
          <div style={{ position: 'relative', width: '200px', maxWidth: '100%', flexShrink: 0 }}>
            <input 
              type="text" 
              placeholder="Caută în catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 36px',
                border: '1px solid var(--border-dark)',
                borderRadius: '20px',
                fontSize: '13px',
                background: 'var(--bg-primary)'
              }}
            />
            <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>

          {/* Advanced Filters */}
          <select 
            value={activeMaterial} 
            onChange={e => setActiveMaterial(e.target.value)} 
            className="catalog-select"
          >
            <option value="Toate">Tip Material</option>
            {availableMaterials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>

          <select 
            value={activeWood} 
            onChange={e => setActiveWood(e.target.value)} 
            className="catalog-select"
          >
            <option value="Toate">Tip Lemn</option>
            {availableWoodTypes.map(wood => (
              <option key={wood} value={wood}>{wood}</option>
            ))}
          </select>

          <select 
            value={activeColor} 
            onChange={e => setActiveColor(e.target.value)} 
            className="catalog-select"
          >
            <option value="Toate">Culoare (Orice)</option>
            {availableColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>

          <select 
            value={activeSize} 
            onChange={e => setActiveSize(e.target.value)} 
            className="catalog-select"
          >
            <option value="Toate">Mărime (Orice)</option>
            {availableSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          {/* Sort Selection */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>ORDONEAZĂ:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="catalog-select"
            >
              <option value="featured">Recomandate</option>
              <option value="price-asc">Preț: crescător</option>
              <option value="price-desc">Preț: descrescător</option>
            </select>
          </div>

          {/* Reset Button (Cute Circle) */}
          {(activeMaterial !== 'Toate' || activeWood !== 'Toate' || activeColor !== 'Toate' || activeSize !== 'Toate' || searchQuery.trim().length > 0 || activeCategory !== 'Toate' || sortBy !== 'featured') && (
            <button 
              onClick={resetFilters}
              title="Resetează filtrele"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-dark)',
                color: 'var(--text-primary)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                padding: 0,
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-dark)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* CATEGORY TAGS */}
        <div className="filter-tags" style={{ marginBottom: '40px', justifyContent: 'center' }}>
          {['Toate', 'Canapele', 'Scaune', 'Fotolii', 'Mese'].map((category) => (
            <button 
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category === 'Toate' ? 'Toate Produsele' : category}
            </button>
          ))}
        </div>

        {/* LIST COUNT */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
          Am găsit {processedList.length} {processedList.length === 1 ? 'produs' : 'produse'}.
        </div>

        {/* PRODUCTS GRID */}
        {processedList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px' }}>
            <h3 className="title-serif" style={{ fontSize: '20px', marginBottom: '10px' }}>Niciun Produs Găsit</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>Încearcă să schimbi filtrele sau termenii de căutare.</p>
            <button className="btn-premium" onClick={resetFilters}>Resetează filtrele</button>
          </div>
        ) : (
          <div className="products-grid">
            {processedList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}

