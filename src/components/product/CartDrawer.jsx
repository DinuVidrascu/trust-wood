import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateCartQuantity, cartOpen, toggleCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleExploreCatalog = () => {
    toggleCart();
    navigate('/catalog');
  };

  // Lock scrolling when drawer is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [cartOpen]);

  // Helper to parse price string to number
  const parsePrice = (priceStr) => {
    const numeric = parseInt(priceStr.replace(/[\s\.]/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      return acc + (parsePrice(item.price) * item.quantity);
    }, 0);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let message = `*TRUSTERA - Comandă Nouă Coș*\n`;
    message += `--------------------------------------\n\n`;
    message += `*Produse din Coș:*\n`;
    
    cart.forEach((item, index) => {
      const priceVal = parsePrice(item.price);
      const subtotal = priceVal * item.quantity;
      
      message += `${index + 1}. *${item.type || 'Produs'} ${item.name}*\n`;
      message += `   - Material: ${item.fabricType} (${item.swatchName})\n`;
      if (item.woodType && item.woodType !== 'Fără') {
        message += `   - Finisaj Lemn: ${item.woodType}\n`;
      }
      message += `   - Dimensiune: ${item.dimension}\n`;
      message += `   - Cantitate: ${item.quantity} buc.\n`;
      message += `   - Preț unitar: ${item.price} MDL\n`;
      message += `   - Subtotal: ${subtotal.toLocaleString('ro-RO')} MDL\n\n`;
    });
    
    const total = calculateTotal();
    message += `--------------------------------------\n`;
    message += `*Total de plată:* ${total.toLocaleString('ro-RO')} MDL\n\n`;
    message += `Doresc să confirm disponibilitatea și detaliile de livrare pentru produsele de mai sus.`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37360535665?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* DRAWER BACKDROP */}
      <div className={`cart-backdrop ${cartOpen ? 'open' : ''}`} onClick={toggleCart}></div>

      {/* DRAWER PANEL */}
      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <div className="cart-header-title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--accent)' }}>
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <h3>Coșul Meu ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
            </div>
            <button className="cart-close" onClick={toggleCart} aria-label="Închide coșul">✕</button>
          </div>

          <div className="cart-content">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.3, color: 'var(--text-secondary)' }}>
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </div>
                <p className="cart-empty-title">Coșul tău este gol</p>
                <p className="cart-empty-desc">Configurează produsele dorite direct din catalog și adaugă-le în coș pentru a plasa comanda.</p>
                <button className="btn-premium" onClick={handleExploreCatalog} style={{ marginTop: '24px', width: '100%' }}>
                  Explorează Catalogul
                </button>
              </div>
            ) : (
              <div className="cart-list-wrap">
                <div className="cart-list">
                  {cart.map((item, idx) => (
                    <div key={idx} className="cart-item">
                      <div className="cart-item-img-container">
                        <img loading="lazy" src={item.img} alt={item.name} className="cart-item-img" />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <span className="cart-item-name">{item.type || 'Produs'} {item.name}</span>
                          <button 
                            className="cart-item-remove" 
                            onClick={() => removeFromCart(idx)}
                            aria-label="Șterge din coș"
                            title="Șterge din coș"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="cart-item-config">
                          <div><span>Stofă:</span> {item.fabricType} ({item.swatchName})</div>
                          {item.woodType && item.woodType !== 'Fără' && (
                            <div><span>Lemn:</span> {item.woodType}</div>
                          )}
                          <div><span>Dimensiune:</span> {item.dimension}</div>
                        </div>

                        <div className="cart-item-price-row">
                          <div className="qty-controller">
                            <button 
                              className="qty-btn" 
                              onClick={() => updateCartQuantity(idx, -1)}
                              aria-label="Scade cantitate"
                            >
                              -
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button 
                              className="qty-btn" 
                              onClick={() => updateCartQuantity(idx, 1)}
                              aria-label="Crește cantitate"
                            >
                              +
                            </button>
                          </div>
                          <span className="cart-item-price">{(parsePrice(item.price) * item.quantity).toLocaleString('ro-RO')} MDL</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DRAWER FOOTER */}
                <div className="cart-footer">
                  <div className="cart-total-row">
                    <span>Total de plată:</span>
                    <span className="cart-total-price">{calculateTotal().toLocaleString('ro-RO')} MDL</span>
                  </div>
                  
                  <p className="cart-footer-note">Comanda va fi trimisă pe WhatsApp pentru a stabili detaliile de stoc, producție personalizată și livrare.</p>

                  <div className="cart-actions">
                    <button className="btn-whatsapp cart-btn" onClick={handleWhatsAppCheckout}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Trimite Comanda pe WhatsApp
                    </button>
                    
                    <button className="btn-outline cart-btn" onClick={clearCart} style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                      Golește Coșul
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  );
}
