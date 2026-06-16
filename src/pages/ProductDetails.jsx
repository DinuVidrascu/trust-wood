import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import AppointmentModal from '../components/AppointmentModal';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const product = products.find(p => p.id === parseInt(id));

  const [activeSwatch, setActiveSwatch] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [singleBookingItem, setSingleBookingItem] = useState(null);

  // Configurator states
  const [fabricType, setFabricType] = useState('Catifea Premium');
  const [woodType, setWoodType] = useState('Stejar Natur');
  const [dimensionType, setDimensionType] = useState('Standard');
  const [customDimension, setCustomDimension] = useState(220);
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  // Gallery states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Initialize active swatch and resets
  useEffect(() => {
    if (product) {
      if (product.swatches && product.swatches.length > 0) {
        const matchedSwatch = product.swatches.find(s => s.productId === product.id);
        setActiveSwatch(matchedSwatch || product.swatches[0]);
      }
      
      // Reset selections for new products
      setFabricType('Catifea Premium');
      setWoodType('Stejar Natur');
      setDimensionType('Standard');
      setCustomDimension(220);
      setActiveImageIdx(0);
    }
  }, [product]);

  // Sync main image with selected swatch color
  useEffect(() => {
    if (activeSwatch && activeSwatch.img && product) {
      const images = product.images || [product.img];
      const idx = images.indexOf(activeSwatch.img);
      if (idx !== -1) {
        setActiveImageIdx(idx);
      }
    }
  }, [activeSwatch, product]);

  // Scroll to top on page transition unless prevented by navigation state
  useEffect(() => {
    if (!location.state?.preventScrollTop) {
      window.scrollTo({ top: 0 });
    }
  }, [id, location.state]);

  // Dynamic JSON-LD Structured Data for SEO
  useEffect(() => {
    if (!product) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-json-ld';

    const numericPrice = product.price ? parseInt(product.price.replace(/\s/g, '')) : 0;

    const schemaData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      'name': product.name,
      'image': product.img ? product.img.replace('w=800', 'w=1200') : '',
      'description': product.desc,
      'sku': `TRUSTERA-${product.id}`,
      'brand': {
        '@type': 'Brand',
        'name': 'Trustera Wood & Soft'
      },
      'offers': {
        '@type': 'Offer',
        'url': window.location.href,
        'priceCurrency': 'MDL',
        'price': numericPrice,
        'priceValidUntil': '2027-12-31',
        'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        'itemCondition': 'https://schema.org/NewCondition'
      }
    };

    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('product-json-ld');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [product]);

  // Price calculation engine
  useEffect(() => {
    if (!product) return;
    const base = parseInt(product.price.replace(/\s/g, ''));
    let extra = 0;

    // Fabric type extra costs
    if (fabricType === 'Bouclé Texturat') {
      extra += 1200;
    } else if (fabricType === 'In Premium') {
      extra += 800;
    }

    // Wood/Legs type extra costs
    if (woodType === 'Stejar Afumat') {
      extra += 400;
    } else if (woodType === 'Nuc Elegance') {
      extra += 900;
    }

    // Dimensions extra costs based on category
    const category = product.category;
    if (category === 'Canapele' || category === 'Scaune') {
      if (dimensionType === 'Mediu (250cm)') {
        extra += 1800;
      } else if (dimensionType === 'Lung (280cm)') {
        extra += 3500;
      } else if (dimensionType === 'Personalizat') {
        extra += Math.max(0, customDimension - 220) * 25; // 25 MDL per extra cm
      }
    } else if (category === 'Paturi') {
      if (dimensionType === '160x200 cm') {
        extra += 1500;
      } else if (dimensionType === '180x200 cm') {
        extra += 3000;
      } else if (dimensionType === '200x200 cm') {
        extra += 4500;
      }
    } else if (category === 'Mese') {
      if (dimensionType === 'Mediu (180cm)') {
        extra += 2000;
      } else if (dimensionType === 'Lung (220cm)') {
        extra += 3500;
      }
    }

    setCalculatedPrice(base + extra);
  }, [product, fabricType, woodType, dimensionType, customDimension]);

  // Keydown listener for Lightbox navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      const images = product?.images || [product?.img];
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIdx(prev => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIdx(prev => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, product]);

  if (!product) {
    return (
      <div className="page-entrance subpage" style={{ paddingBottom: '100px', textAlign: 'center' }}>
        <section className="section">
          <h2 className="title-serif" style={{ fontSize: '28px', marginBottom: '16px' }}>Produsul nu a fost găsit</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Ne cerem scuze, produsul căutat nu există în catalogul nostru sau a fost mutat.</p>
          <Link to="/catalog" className="btn-premium">Înapoi la Catalog</Link>
        </section>
      </div>
    );
  }

  // Get formatted dimension label
  const getDimensionLabel = () => {
    if (product.category === 'Canapele' || product.category === 'Scaune') {
      if (dimensionType === 'Personalizat') return `${customDimension} cm (Custom)`;
      return dimensionType === 'Standard' ? 'Standard (220cm)' : dimensionType;
    } else if (product.category === 'Paturi') {
      return dimensionType === 'Standard' ? 'Standard (140x200 cm)' : dimensionType;
    } else if (product.category === 'Mese') {
      return dimensionType === 'Standard' ? 'Standard (140cm)' : dimensionType;
    }
    return 'Standard';
  };

  const handleAddToWishlist = () => {
    const item = {
      id: product.id,
      name: product.name,
      type: product.type,
      img: (activeSwatch && activeSwatch.img) ? activeSwatch.img : product.img,
      fabricType,
      swatchName: activeSwatch?.name || 'Neselectat',
      woodType,
      dimension: getDimensionLabel(),
      price: calculatedPrice.toLocaleString('ro-RO')
    };
    addToWishlist(item);
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      type: product.type,
      img: (activeSwatch && activeSwatch.img) ? activeSwatch.img : product.img,
      fabricType,
      swatchName: activeSwatch?.name || 'Neselectat',
      woodType,
      dimension: getDimensionLabel(),
      price: calculatedPrice.toLocaleString('ro-RO'),
      quantity: 1
    };
    addToCart(item);
  };

  const handleBookSingle = () => {
    const item = {
      id: product.id,
      name: product.name,
      type: product.type,
      img: product.img,
      fabricType,
      swatchName: activeSwatch?.name || 'Neselectat',
      woodType,
      dimension: getDimensionLabel(),
      price: calculatedPrice.toLocaleString('ro-RO')
    };
    setSingleBookingItem([item]);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSingleBookingItem(null);
  };

  const hasDimensions = ['Canapele', 'Scaune', 'Paturi', 'Mese'].includes(product.category);
  
  // If the product has swatches with images, we treat the active swatch as the "product" being viewed
  const productImages = (activeSwatch && activeSwatch.img) 
    ? [activeSwatch.img] 
    : (product.images || [product.img]);

  return (
    <>
      {/* GALLERY LIGHTBOX OVERLAY - Placed outside page-entrance to bypass parent CSS transforms */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-bg"></div>
          
          {/* LIGHTBOX HEADER */}
          <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-counter">
              {lightboxIdx + 1} / {productImages.length}
            </div>
            <button className="lightbox-control-btn" onClick={() => setLightboxOpen(false)} aria-label="Închide">
              ✕
            </button>
          </div>

          {/* LIGHTBOX MAIN CONTENT */}
          <div className="lightbox-content">
            <button 
              className="lightbox-nav-btn prev" 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(prev => (prev - 1 + productImages.length) % productImages.length);
              }}
              aria-label="Imaginea anterioară"
            >
              ⟨
            </button>
            
            <div className="lightbox-img-container" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', maxHeight: '100%' }}>
                <img loading="lazy" 
                  src={productImages[lightboxIdx] ? productImages[lightboxIdx].replace('w=800', 'w=1400') : ''} 
                  alt={`${product.name} - vizualizare mărită ${lightboxIdx + 1}`} 
                  style={{ maxWidth: '100%', maxHeight: '80vh', width: 'auto', height: 'auto', display: 'block' }}
                />
                <div className={`material-texture-overlay texture-${fabricType === 'Catifea Premium' ? 'velvet' : fabricType === 'Bouclé Texturat' ? 'boucle' : 'linen'}`} />
              </div>
            </div>

            <button 
              className="lightbox-nav-btn next" 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(prev => (prev + 1) % productImages.length);
              }}
              aria-label="Imaginea următoare"
            >
              ⟩
            </button>
          </div>
        </div>
      )}

      {/* APPOINTMENT MODAL - Placed outside page-entrance to bypass parent CSS transforms */}
      <AppointmentModal 
        isOpen={modalOpen} 
        onClose={handleModalClose} 
        configuredItems={singleBookingItem || []}
      />

      <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
        <section className="section" style={{ paddingTop: '10px' }}>
          
          {/* BREADCRUMB */}
          <div style={{ marginBottom: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <Link to="/" style={{ marginRight: '8px' }}>Acasă</Link> / 
            <Link to="/catalog" style={{ margin: '0 8px' }}>Catalog</Link> / 
            <Link to={`/catalog?cat=${product.category}`} style={{ margin: '0 8px' }}>{product.category}</Link> / 
            <span style={{ marginLeft: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>{product.name}</span>
          </div>

          {/* CONTAINER GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '50px',
            alignItems: 'start'
          }} className="product-details-grid">
            
            {/* GALLERY AREA */}
            <div className="product-gallery-container">
              <div className="product-gallery">
                
                {/* THUMBNAILS LIST */}
                {productImages.length > 1 && (
                  <div className="gallery-thumbs">
                    {productImages.map((imgUrl, idx) => {
                      const thumbUrl = imgUrl ? imgUrl.replace('w=800', 'w=120&h=120') : imgUrl;
                      return (
                        <button
                          key={idx}
                          className={`gallery-thumb-btn ${activeImageIdx === idx ? 'active' : ''}`}
                          onClick={() => setActiveImageIdx(idx)}
                          aria-label={`Vezi imaginea ${idx + 1}`}
                        >
                          <img loading="lazy" src={thumbUrl} alt={`${product.name} - vizualizare ${idx + 1}`} />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* MAIN IMAGE CONTAINER */}
                <div className="gallery-main" onClick={() => {
                  setLightboxIdx(activeImageIdx);
                  setLightboxOpen(true);
                }} style={{ cursor: 'zoom-in', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', maxHeight: '100%' }}>
                    <img loading="lazy" 
                      src={productImages[activeImageIdx]} 
                      alt={product.name} 
                      style={{ maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 0.5s ease' }}
                    />
                    <div className={`material-texture-overlay texture-${fabricType === 'Catifea Premium' ? 'velvet' : fabricType === 'Bouclé Texturat' ? 'boucle' : 'linen'}`} />
                  </div>
                  <div className="gallery-zoom-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <span>Mărește</span>
                  </div>
                </div>

              </div>

              {/* MOBILE SWATCHES */}
              {product.swatches && product.swatches.length > 0 && (
                <div className="mobile-swatches-wrapper">
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    Nuanță Tapițerie: <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeSwatch?.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {product.swatches.map((swatch, idx) => (
                      <button 
                        key={idx}
                        className={`pm-swatch ${activeSwatch?.name === swatch.name ? 'active' : ''}`}
                        style={{
                          backgroundColor: swatch.code,
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          border: '2px solid #FFF',
                          outline: `1.5px solid ${activeSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                          transform: activeSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                          transition: 'var(--transition)'
                        }}
                        onClick={() => {
                          if (swatch.productId !== undefined && swatch.productId !== product.id) {
                            navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true } });
                          } else {
                            setActiveSwatch(swatch);
                          }
                        }}
                        title={swatch.name}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* META INFO AREA */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <div className="pm-type" style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>
                {product.type}
              </div>
              
              <h1 className="title-serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '12px', fontWeight: '500', lineHeight: '1.2' }}>
                {product.name}
              </h1>

              {/* STOCK & STATE BADGES */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {product.inStock ? (
                  <span className="pm-stock" style={{ background: '#EAF7ED', color: '#2E7D32', fontSize: '11px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    În Stoc / Livrare Rapidă
                  </span>
                ) : (
                  <span className="pm-stock" style={{ background: '#FFF5E6', color: '#D97706', fontSize: '11px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    La Comandă (15-25 zile)
                  </span>
                )}
                <span className="pm-premium-badge" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid rgba(197, 168, 128, 0.2)', fontSize: '11px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Finisaj Premium
                </span>
              </div>

              {/* PRICE */}
              <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '24px' }}>
                {calculatedPrice.toLocaleString('ro-RO')} MDL
              </div>


              {/* ─── INTERACTIVE CONFIGURATOR ─── */}
              <div className="pd-configurator" style={{ borderTop: '1px solid var(--border)', paddingTop: '30px', marginBottom: '30px' }}>
                <h3 className="title-serif" style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)' }}>Configurator Personalizat</h3>
                
                {/* 1. STOFĂ SELECTIE (SWATCHES) */}
                {product.swatches && product.swatches.length > 0 && (
                  <div className="desktop-swatches-wrapper" style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Nuanță Tapițerie: <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeSwatch?.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {product.swatches.map((swatch, idx) => (
                        <button 
                          key={idx}
                          className={`pm-swatch ${activeSwatch?.name === swatch.name ? 'active' : ''}`}
                          style={{
                            backgroundColor: swatch.code,
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            border: '2px solid #FFF',
                            outline: `1.5px solid ${activeSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                            transform: activeSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                            transition: 'var(--transition)'
                          }}
                          onClick={() => {
                            if (swatch.productId !== undefined && swatch.productId !== product.id) {
                              navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true } });
                            } else {
                              setActiveSwatch(swatch);
                            }
                          }}
                          title={swatch.name}
                        ></button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. TIP TEXTURA STOFA */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    Tipul Materialului: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{fabricType}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }} className="config-grid">
                    {[
                      { name: 'Catifea Premium', cost: '+0 MDL', desc: 'Moale, hidrofobă, fină' },
                      { name: 'Bouclé Texturat', cost: '+1 200 MDL', desc: 'Tridimensional, la modă' },
                      { name: 'In Premium', cost: '+800 MDL', desc: 'Fibre naturale, respirabil' }
                    ].map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setFabricType(f.name)}
                        className={`config-btn ${fabricType === f.name ? 'active' : ''}`}
                      >
                        <div className="cb-title">{f.name}</div>
                        <div className="cb-desc">{f.desc}</div>
                        <div className="cb-cost">{f.cost}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. MATERIAL PICIOARE / CADRU LEMN */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    Picioare & Detalii Lemn: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{woodType}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }} className="config-grid">
                    {[
                      { name: 'Stejar Natur', cost: '+0 MDL', desc: 'Tradițional, luminos' },
                      { name: 'Stejar Afumat', cost: '+400 MDL', desc: 'Modern, sobru, întunecat' },
                      { name: 'Nuc Elegance', cost: '+900 MDL', desc: 'Contrast bogat, clasic' }
                    ].map((w) => (
                      <button
                        key={w.name}
                        onClick={() => setWoodType(w.name)}
                        className={`config-btn ${woodType === w.name ? 'active' : ''}`}
                      >
                        <div className="cb-title">{w.name}</div>
                        <div className="cb-desc">{w.desc}</div>
                        <div className="cb-cost">{w.cost}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. DIMENSIUNI DINAMICE */}
                {hasDimensions && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Dimensiune: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{getDimensionLabel()}</span>
                    </div>
                    
                    {/* Category-based Dimension Options */}
                    {product.category === 'Canapele' || product.category === 'Scaune' ? (
                      <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }} className="config-grid-four">
                          {[
                            { id: 'Standard', label: 'Standard', sub: '220 cm', cost: '+0 MDL' },
                            { id: 'Mediu (250cm)', label: 'Mediu', sub: '250 cm', cost: '+1 800 MDL' },
                            { id: 'Lung (280cm)', label: 'Lung', sub: '280 cm', cost: '+3 500 MDL' },
                            { id: 'Personalizat', label: 'Custom', sub: 'Ajustabil', cost: '+25 MDL/cm' }
                          ].map((d) => (
                            <button
                              key={d.id}
                              onClick={() => setDimensionType(d.id)}
                              className={`config-btn ${dimensionType === d.id ? 'active' : ''}`}
                            >
                              <div className="cb-title">{d.label}</div>
                              <div className="cb-desc">{d.sub}</div>
                              <div className="cb-cost">{d.cost}</div>
                            </button>
                          ))}
                        </div>

                        {/* Custom dimension slider */}
                        {dimensionType === 'Personalizat' && (
                          <div className="custom-slider-wrap" style={{ background: 'var(--accent-light)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(197,168,128,0.15)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}>
                              <span>Lungime Canapea:</span>
                              <span style={{ color: 'var(--accent)', fontSize: '15px' }}>{customDimension} cm</span>
                            </div>
                            <input 
                              type="range" 
                              min="180" 
                              max="320" 
                              step="10"
                              value={customDimension}
                              onChange={(e) => setCustomDimension(parseInt(e.target.value))}
                              style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'ew-resize' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                              <span>Compact (180 cm)</span>
                              <span>Max (320 cm)</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : product.category === 'Paturi' ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }} className="config-grid-four">
                        {[
                          { id: 'Standard', label: '140x200 cm', sub: 'Saltea 140', cost: '+0 MDL' },
                          { id: '160x200 cm', label: '160x200 cm', sub: 'Saltea 160', cost: '+1 500 MDL' },
                          { id: '180x200 cm', label: '180x200 cm', sub: 'Saltea 180', cost: '+3 000 MDL' },
                          { id: '200x200 cm', label: '200x200 cm', sub: 'Saltea 200', cost: '+4 500 MDL' }
                        ].map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setDimensionType(d.id)}
                            className={`config-btn ${dimensionType === d.id ? 'active' : ''}`}
                          >
                            <div className="cb-title">{d.label}</div>
                            <div className="cb-desc">{d.sub}</div>
                            <div className="cb-cost">{d.cost}</div>
                          </button>
                        ))}
                      </div>
                    ) : product.category === 'Mese' ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }} className="config-grid">
                        {[
                          { id: 'Standard', label: 'L 140 cm', sub: '6 Persoane', cost: '+0 MDL' },
                          { id: 'Mediu (180cm)', label: 'L 180 cm', sub: '8 Persoane', cost: '+2 000 MDL' },
                          { id: 'Lung (220cm)', label: 'L 220 cm', sub: '10 Persoane', cost: '+3 500 MDL' }
                        ].map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setDimensionType(d.id)}
                            className={`config-btn ${dimensionType === d.id ? 'active' : ''}`}
                          >
                            <div className="cb-title">{d.label}</div>
                            <div className="cb-desc">{d.sub}</div>
                            <div className="cb-cost">{d.cost}</div>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '30px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
                {product.desc}
              </p>

              {/* DETAILS / FEATURES */}
              {product.features && product.features.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', marginBottom: '36px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    Specificații & Structură
                  </div>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {product.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ACTIONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px', width: '100%' }}>
                <button 
                  className="btn-premium pm-btn" 
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '16px 24px', fontSize: '15px' }}
                  onClick={handleAddToCart}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  Adaugă în Coș
                </button>
                
                <div style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
                  <button 
                    className="btn-outline pm-btn" 
                    style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    onClick={handleAddToWishlist}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Adaugă în Favorite
                  </button>
                  
                  <button 
                    className="btn-outline pm-btn" 
                    style={{ flex: '1', minWidth: '150px' }}
                    onClick={handleBookSingle}
                  >
                    Solicită Consultație
                  </button>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* RESPONSIVE CSS EMULATION, GALLERY & CONFIGURATOR BUTTONS */}
        <style>{`
          @media (max-width: 900px) {
            .product-details-grid {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
            .product-gallery-container {
              position: relative !important;
              top: 0 !important;
            }
          }
          
          /* ─── GALLERY STYLING ─── */
          .product-gallery-container {
            position: sticky;
            top: 120px;
          }

          .product-gallery {
            display: flex;
            gap: 16px;
            width: 100%;
          }

          .gallery-thumbs {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 80px;
            max-height: 480px;
            overflow-y: auto;
            padding-right: 4px;
          }

          .gallery-thumbs::-webkit-scrollbar {
            width: 4px;
          }
          .gallery-thumbs::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 2px;
          }
          .gallery-thumbs::-webkit-scrollbar-thumb {
            background: var(--accent);
            border-radius: 2px;
          }

          .gallery-thumb-btn {
            width: 76px;
            height: 76px;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid var(--border);
            background: #F3EFEA;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            transition: var(--transition);
          }

          .gallery-thumb-btn img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .gallery-thumb-btn:hover {
            border-color: var(--accent);
          }

          .gallery-thumb-btn.active {
            border-color: var(--accent);
            box-shadow: 0 0 0 1.5px var(--accent);
            transform: scale(0.96);
          }

          .gallery-main {
            flex: 1;
            background: #F3EFEA;
            border-radius: 4px;
            overflow: hidden;
            aspect-ratio: 1;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border);
            position: relative;
          }

          .gallery-main img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
            transition: transform 0.5s ease;
          }

          .gallery-main:hover img {
            transform: scale(1.02);
          }

          .gallery-zoom-badge {
            position: absolute;
            bottom: 16px;
            right: 16px;
            background: rgba(28, 27, 25, 0.7);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #FFF;
            font-size: 11px;
            font-weight: 600;
            padding: 8px 14px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
            pointer-events: none;
            transition: var(--transition);
            opacity: 0.8;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .gallery-main:hover .gallery-zoom-badge {
            opacity: 1;
            background: rgba(28, 27, 25, 0.85);
          }

          /* ─── LIGHTBOX OVERLAY ─── */
          .lightbox-overlay {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.3s ease-out;
          }

          .lightbox-bg {
            position: absolute;
            inset: 0;
            background: rgba(18, 17, 16, 0.95);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
          }

          .lightbox-header {
            position: relative;
            z-index: 2010;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 40px;
            color: #FFF;
          }

          .lightbox-counter {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.05em;
            opacity: 0.8;
          }

          .lightbox-control-btn {
            background: none;
            border: none;
            color: #FFF;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            opacity: 0.7;
            transition: var(--transition);
          }

          .lightbox-control-btn:hover {
            opacity: 1;
            transform: scale(1.1);
          }

          .lightbox-content {
            position: relative;
            z-index: 2010;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px 40px 40px;
          }

          .lightbox-img-container {
            max-width: 80%;
            max-height: 80vh;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: zoom-out;
            animation: scaleUp 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          }

          .lightbox-img-container img {
            max-width: 100%;
            max-height: 80vh;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            user-select: none;
          }

          .lightbox-nav-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #FFF;
            font-size: 32px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
            opacity: 0.7;
            user-select: none;
          }

          .lightbox-nav-btn:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.15);
            transform: scale(1.05);
          }

          .lightbox-nav-btn:active {
            transform: scale(0.95);
          }

          @keyframes scaleUp {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @media (max-width: 900px) {
            .product-gallery {
              flex-direction: column-reverse !important;
            }
            .gallery-thumbs {
              flex-direction: row !important;
              width: 100% !important;
              max-height: none !important;
              overflow-x: auto !important;
              overflow-y: hidden !important;
              padding-bottom: 8px;
              padding-right: 0 !important;
            }
            .gallery-thumb-btn {
              width: 70px !important;
              height: 70px !important;
            }
            .lightbox-content {
              padding: 0 10px 20px 10px;
            }
            .lightbox-img-container {
              max-width: 90%;
              max-height: 60vh;
            }
            .lightbox-nav-btn {
              width: 44px;
              height: 44px;
              font-size: 20px;
            }
          }
          
          /* ─── CONFIGURATOR STYLING ─── */
          .config-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .config-grid-four {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }

          .config-btn {
            background: #FAFAFA;
            border: 1px solid var(--border);
            border-radius: 4px;
            padding: 10px 8px;
            text-align: left;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .config-btn:hover {
            border-color: var(--accent);
            background: #FDFCF9;
          }

          .config-btn.active {
            border-color: var(--accent);
            background: var(--accent-light);
            box-shadow: 0 0 0 1px var(--accent);
          }

          .cb-title {
            font-size: 12px;
            font-weight: 700;
            color: var(--text-primary);
          }

          .cb-desc {
            font-size: 10px;
            color: var(--text-secondary);
            line-height: 1.2;
          }

          .cb-cost {
            font-size: 11px;
            font-weight: 600;
            color: var(--accent);
            margin-top: auto;
          }

          @media (max-width: 600px) {
            .config-grid {
              grid-template-columns: 1fr !important;
            }
            .config-grid-four {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          /* swatches responsiveness */
          .mobile-swatches-wrapper {
            display: none;
          }
          .desktop-swatches-wrapper {
            display: block;
          }

          @media (max-width: 900px) {
            .mobile-swatches-wrapper {
              display: block;
              margin-top: 24px;
              border-bottom: 1px solid var(--border);
              padding-bottom: 24px;
            }
            .desktop-swatches-wrapper {
              display: none;
            }
          }
        `}</style>
      </div>
    </>
  );
}

