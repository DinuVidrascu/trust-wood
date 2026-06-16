import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  // Optimize Unsplash image width for list card (from w=800 down to w=500)
  const cardImg = product.img ? product.img.replace('w=800', 'w=500') : product.img;

  return (
    <Link to={`/produs/${product.id}`} className="product-card" onClick={scrollToTop}>
      <div className="product-img-wrap">
        <img src={cardImg} alt={product.name} loading="lazy" />
        {product.inStock ? (
          <span className="product-badge">În Stoc</span>
        ) : (
          <span className="product-badge" style={{ background: '#8C8882', color: '#FFF' }}>La Comandă</span>
        )}
      </div>
      <div className="product-info">
        <div className="product-type">{product.type}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">{product.price} MDL</span>
          <span className="product-view-btn">
            <span>Detalii</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
