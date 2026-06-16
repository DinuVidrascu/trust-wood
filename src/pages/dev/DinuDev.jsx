import React, { useState } from 'react';
import { products as initialProducts, categories } from '../../data/products';

export default function DinuDev() {
  const [productsList, setProductsList] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  // Stats calculation
  const totalProducts = productsList.length;
  const totalCategories = categories.length;
  const inStockCount = productsList.filter(p => p.inStock).length;
  const avgPrice = Math.round(
    productsList.reduce((acc, p) => acc + parseInt(p.price.replace(/\s/g, '')), 0) / totalProducts
  );

  // Filter products
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toString() === searchQuery;
    const matchesCategory = selectedCategory === 'Toate' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-entrance subpage" style={{ padding: '40px 20px', minHeight: '90vh', backgroundColor: '#faf9f6' }}>
      <style>{`
        .dev-container {
          max-width: 1200px;
          margin: 0 auto;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dev-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #e5e2db;
          padding-bottom: 20px;
        }
        .dev-title {
          font-size: 28px;
          font-weight: 700;
          color: #2b2927;
        }
        .dev-badge {
          background-color: #9e7e59;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: white;
          border: 1px solid #e5e2db;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .stat-label {
          font-size: 13px;
          color: #7b7875;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #2b2927;
        }
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        .search-input {
          padding: 10px 16px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          width: 300px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: #9e7e59;
        }
        .select-filter {
          padding: 10px 16px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          outline: none;
        }
        .btn-add {
          background: #2b2927;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        .btn-add:hover {
          background: #45423f;
        }
        .products-table-container {
          background: white;
          border: 1px solid #e5e2db;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.01);
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }
        .products-table th {
          background-color: #f5f2eb;
          color: #5b5855;
          font-weight: 600;
          padding: 14px 20px;
          border-bottom: 1px solid #e5e2db;
        }
        .products-table td {
          padding: 14px 20px;
          border-bottom: 1px solid #f0ede6;
          color: #2b2927;
          vertical-align: middle;
        }
        .products-table tr:last-child td {
          border-bottom: none;
        }
        .product-img-mini {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          object-fit: cover;
          background-color: #f5f2eb;
          border: 1px solid #e5e2db;
        }
        .action-btns {
          display: flex;
          gap: 8px;
        }
        .btn-action {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .btn-edit {
          background: #f5f2eb;
          color: #2b2927;
          border-color: #dcd9d0;
        }
        .btn-edit:hover {
          background: #9e7e59;
          color: white;
          border-color: #9e7e59;
        }
        .btn-delete {
          background: #fff5f5;
          color: #e53e3e;
          border-color: #fed7d7;
        }
        .btn-delete:hover {
          background: #e53e3e;
          color: white;
          border-color: #e53e3e;
        }
        .status-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-instock {
          background-color: #f0fdf4;
          color: #166534;
        }
        .status-out {
          background-color: #fef2f2;
          color: #991b1b;
        }
      `}</style>

      <div className="dev-container">
        
        {/* HEADER */}
        <div className="dev-header">
          <div>
            <h1 className="dev-title">Panou de Administrare</h1>
            <p style={{ color: '#7b7875', fontSize: '14px', marginTop: '4px' }}>Spațiu de configurare secret securizat (/dinudev)</p>
          </div>
          <span className="dev-badge">Developer Mode</span>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Produse</div>
            <div className="stat-value">{totalProducts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Categorii</div>
            <div className="stat-value">{totalCategories}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">În Stoc</div>
            <div className="stat-value">{inStockCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Preț Mediu</div>
            <div className="stat-value">{avgPrice.toLocaleString('ro-RO')} MDL</div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="controls-row">
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Caută după nume sau ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            
            <select 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              className="select-filter"
            >
              <option value="Toate">Toate Categoriile</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button className="btn-add" onClick={() => alert('Modulul de adăugare produse va fi implementat cu autentificare.')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>Adaugă Produs</span>
          </button>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th style={{ width: '80px' }}>Imagine</th>
                <th>Denumire Produs</th>
                <th>Categorie</th>
                <th>Preț (MDL)</th>
                <th>Stoc</th>
                <th style={{ width: '180px', textAlign: 'center' }}>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td style={{ fontWeight: '600', color: '#7b7875' }}>#{product.id}</td>
                  <td>
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="product-img-mini"
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#7b7875' }}>{product.type}</div>
                  </td>
                  <td>{product.category}</td>
                  <td style={{ fontWeight: '600' }}>{product.price} MDL</td>
                  <td>
                    <span className={`status-pill ${product.inStock ? 'status-instock' : 'status-out'}`}>
                      {product.inStock ? 'În Stoc' : 'Indisponibil'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'center' }}>
                      <button 
                        className="btn-action btn-edit"
                        onClick={() => alert(`Editarea pentru ${product.name} va fi disponibilă după configurarea autentificării.`)}
                      >
                        Editează
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => {
                          if (confirm(`Sigur dorești să ștergi produsul ${product.name}?`)) {
                            setProductsList(productsList.filter(p => p.id !== product.id));
                          }
                        }}
                      >
                        Șterge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7b7875' }}>
                    Niciun produs nu corespunde criteriilor de căutare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
