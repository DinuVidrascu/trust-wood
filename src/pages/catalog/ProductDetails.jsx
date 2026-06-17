import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import AppointmentModal from '../../components/ui/AppointmentModal';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ProductDetails() {
  const { products } = useProducts();
  const { id } = useParams();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const product = products.find(p => p.id === parseInt(id));

  const groupProducts = product?.group 
    ? products.filter(p => p.group === product.group)
    : product ? [product] : [];

  const fabricSwatchesMap = new Map();
  
  groupProducts.forEach(p => {
    const pFabricSwatches = (p.swatches || []).filter(sw => sw.type !== 'wood');
    if (pFabricSwatches.length > 0) {
      pFabricSwatches.forEach(sw => {
        if (!fabricSwatchesMap.has(sw.name)) {
          fabricSwatchesMap.set(sw.name, { productId: p.id, ...sw });
        }
      });
    } else if (p.id !== product.id) {
      // Fallback for variant products without native swatches
      if (!fabricSwatchesMap.has(p.name)) {
        fabricSwatchesMap.set(p.name, {
          type: 'fabric',
          name: p.name,
          code: '#C5A880',
          img: p.img,
          textureImg: null,
          productId: p.id,
          isVariant: true
        });
      }
    }
  });

  const fabricSwatches = Array.from(fabricSwatchesMap.values());
  
  const woodSwatchesMap = new Map();
  groupProducts.forEach(p => {
    const pWoodSwatches = (p.swatches || []).filter(sw => sw.type === 'wood');
    if (pWoodSwatches.length > 0) {
      pWoodSwatches.forEach(sw => {
        if (!woodSwatchesMap.has(sw.name)) {
          woodSwatchesMap.set(sw.name, { productId: p.id, ...sw });
        }
      });
    }
  });
  const woodSwatches = Array.from(woodSwatchesMap.values());

  const [activeFabricSwatch, setActiveFabricSwatch] = useState(null);
  const [activeWoodSwatch, setActiveWoodSwatch] = useState(null);
  const [expandedTexture, setExpandedTexture] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [singleBookingItem, setSingleBookingItem] = useState(null);

  // Configurator states
  const [fabricType, setFabricType] = useState('Catifea Premium');
  const [woodType, setWoodType] = useState('Stejar Natur');
  const [dimensionType, setDimensionType] = useState('Standard');
  const [customDimension, setCustomDimension] = useState(220);

  useEffect(() => {
    if (product && product.configOptions) {
      if (product.configOptions.fabrics?.length > 0) {
        setFabricType(product.configOptions.fabrics[0].name);
      }
      if (product.configOptions.wood?.length > 0) {
        setWoodType(product.configOptions.wood[0].name);
      }
      if (product.configOptions.dimensions?.length > 0) {
        setDimensionType(product.configOptions.dimensions[0].name);
      }
    }
  }, [product]);

  // Gallery states
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  // Initialize active swatch and resets
  useEffect(() => {
    if (product) {
      if (fabricSwatches.length > 0) {
        const preselectedName = location.state?.selectedSwatchName;
        if (preselectedName) {
          const matched = fabricSwatches.find(s => s.name === preselectedName);
          setActiveFabricSwatch(matched || fabricSwatches[0]);
        } else {
          // Find first swatch belonging to this product, or just first available
          const matched = fabricSwatches.find(s => s.productId === product.id);
          setActiveFabricSwatch(matched || fabricSwatches[0]);
        }
      } else {
        setActiveFabricSwatch(null);
      }
      if (woodSwatches.length > 0) {
        const preselectedWoodName = location.state?.selectedWoodSwatchName;
        if (preselectedWoodName) {
          const matchedW = woodSwatches.find(s => s.name === preselectedWoodName);
          setActiveWoodSwatch(matchedW || woodSwatches[0]);
        } else {
          const matchedW = woodSwatches.find(s => s.productId === product.id);
          setActiveWoodSwatch(matchedW || woodSwatches[0]);
        }
      } else {
        setActiveWoodSwatch(null);
      }
      
      // Reset selections for new products
      setFabricType('Catifea Premium');
      setWoodType('Stejar Natur');
      setDimensionType('Standard');
      setCustomDimension(220);
      setActiveImageIdx(0);
    }
  }, [product, id]);

  // Sync main image with selected swatch color
  useEffect(() => {
    if (activeFabricSwatch && activeFabricSwatch.img && product) {
      const images = product.images || [product.img];
      const idx = images.indexOf(activeFabricSwatch.img);
      if (idx !== -1) {
        setActiveImageIdx(idx);
      }
    }
  }, [activeFabricSwatch, product]);

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

  // Price calculation engine (Derived State)
  const calculatedPrice = React.useMemo(() => {
    if (!product) return 0;
    const base = parseInt(product.price.replace(/\s/g, ''));
    let extra = 0;

    const opts = product.configOptions || { fabrics: [], wood: [], dimensions: [] };

    const activeFabric = opts.fabrics?.find(f => f.name === fabricType);
    if (activeFabric) extra += parseInt(activeFabric.cost) || 0;

    const activeWood = opts.wood?.find(w => w.name === woodType);
    if (activeWood) extra += parseInt(activeWood.cost) || 0;

    const activeDim = opts.dimensions?.find(d => d.name === dimensionType);
    if (activeDim) {
       extra += parseInt(activeDim.cost) || 0;
    }

    if (dimensionType === 'Personalizat' || dimensionType === 'Custom') {
       extra += Math.max(0, customDimension - 220) * 25; // 25 MDL per extra cm
    }

    return base + extra;
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

  // Close inline texture when clicking outside
  useEffect(() => {
    if (!expandedTexture) return;
    
    const handleOutsideClick = (e) => {
      const box = document.querySelector('.macro-inline-box');
      const btn = document.querySelector('.macro-texture-container');
      if (box && !box.contains(e.target) && btn && !btn.contains(e.target)) {
        setExpandedTexture(null);
      }
    };
    
    const timer = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 50);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [expandedTexture]);

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
      img: (activeFabricSwatch && activeFabricSwatch.img) ? activeFabricSwatch.img : product.img,
      fabricType,
      swatchName: activeFabricSwatch?.name || 'Neselectat',
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
      img: (activeFabricSwatch && activeFabricSwatch.img) ? activeFabricSwatch.img : product.img,
      fabricType,
      swatchName: activeFabricSwatch?.name || 'Neselectat',
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
      swatchName: activeFabricSwatch?.name || 'Neselectat',
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

  const handleDownloadPDF = async () => {
    const pdfEl = document.getElementById('pdf-quote-template');
    if (!pdfEl) return;
    
    pdfEl.style.display = 'block';
    
    try {
      const canvas = await html2canvas(pdfEl, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#FAF8F5' 
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Oferta_${product.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('Eroare la generarea PDF:', err);
      alert('Eroare la generarea ofertei PDF.');
    } finally {
      pdfEl.style.display = 'none';
    }
  };

  const opts = product?.configOptions || { fabrics: [], wood: [], dimensions: [] };
  const hasFabrics = opts.fabrics && opts.fabrics.length > 0;
  const hasWood = opts.wood && opts.wood.length > 0;
  const hasDimensions = opts.dimensions && opts.dimensions.length > 0;
  
  // If the product has swatches with images, we treat the active swatch as the "product" being viewed
  const productImages = (activeFabricSwatch && activeFabricSwatch.img) 
    ? [activeFabricSwatch.img] 
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
                    {product.category === 'Mese' ? 'Finisaj Lemn:' : 'Nuanță Tapițerie:'} <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeFabricSwatch?.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {fabricSwatches.map((swatch, idx) => (
                      <button 
                        key={idx}
                        className={`pm-swatch ${activeFabricSwatch?.name === swatch.name ? 'active' : ''}`}
                        style={{
                          backgroundColor: swatch.code,
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          border: '2px solid #FFF',
                          outline: `1.5px solid ${activeFabricSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                          transform: activeFabricSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                          transition: 'var(--transition)'
                        }}
                        onClick={() => {
                          if (swatch.productId !== undefined && swatch.productId !== product.id) {
                            navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true, selectedSwatchName: swatch.name } });
                          } else {
                            setActiveFabricSwatch(swatch);
                          }
                        }}
                        title={swatch.name}
                      ></button>
                    ))}
                  </div>

                  
                  {woodSwatches.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                        Finisaj Lemn: <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeWoodSwatch?.name}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {woodSwatches.map((swatch, idx) => (
                          <button 
                            key={idx}
                            className={`pm-swatch ${activeWoodSwatch?.name === swatch.name ? 'active' : ''}`}
                            style={{
                              backgroundColor: swatch.code,
                              width: '34px',
                              height: '34px',
                              borderRadius: '50%',
                              border: '2px solid #FFF',
                              outline: `1.5px solid ${activeWoodSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                              transform: activeWoodSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                              transition: 'var(--transition)'
                            }}
                            onClick={() => {
                              if (swatch.productId !== undefined && swatch.productId !== product.id) {
                                navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true, selectedWoodSwatchName: swatch.name } });
                              } else {
                                setActiveWoodSwatch(swatch);
                              }
                            }}
                            title={swatch.name}
                          ></button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* INLINE MACRO TEXTURE EXPANDED BOX (MOBILE) */}
                  {(activeFabricSwatch?.textureImg || activeWoodSwatch?.textureImg) && (
                      <div className={`macro-inline-box ${expandedTexture ? 'open' : ''}`}
                      onClick={() => setExpandedTexture(null)}
                      style={{ marginTop: expandedTexture ? '14px' : '0' }}
                    >
                      <img loading="lazy" src={expandedTexture === 'wood' ? activeWoodSwatch?.textureImg : activeFabricSwatch?.textureImg} alt={expandedTexture === 'wood' ? activeWoodSwatch?.name : activeFabricSwatch?.name} 
                        style={{ 
                          width: '100%', 
                          height: '280px', 
                          objectFit: 'cover', 
                          display: 'block' 
                        }} 
                      />
                      
                      {/* Close button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedTexture(null);
                        }}
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 'bold',
                          color: 'var(--text-primary)',
                          transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 12,
                          opacity: expandedTexture ? 1 : 0,
                          pointerEvents: expandedTexture ? 'auto' : 'none',
                          transitionDelay: expandedTexture ? '0.1s' : '0s'
                        }}
                        className="macro-inline-close-btn"
                        aria-label="Închide previzualizarea"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                                    {/* COMBINED TEXTURE PREVIEW PANEL */}
                  {(activeFabricSwatch?.textureImg || activeWoodSwatch?.textureImg) && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: (activeFabricSwatch?.textureImg && activeWoodSwatch?.textureImg) ? '1fr 1fr' : '1fr',
                      gap: '10px',
                      marginTop: '14px',
                      padding: '4px',
                      background: '#FFF',
                      border: '1px solid var(--border)',
                      borderRadius: '8px'
                    }}>
                      {activeFabricSwatch?.textureImg && (
                        <div className="macro-texture-container" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#F8F6F2', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <button 
                            className="macro-thumbnail-btn" 
                            onClick={() => setExpandedTexture(expandedTexture === 'fabric' ? null : 'fabric')}
                            style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-dark)', padding: 0, cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                            title={product.category === 'Mese' ? 'Apasă pentru zoom textură lemn' : 'Apasă pentru zoom textură macro'}
                          >
                            <img loading="lazy" src={activeFabricSwatch.textureImg} alt={activeFabricSwatch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} className="macro-hover-overlay">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
                            </div>
                          </button>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>PREVIZUALIZARE TEXTURĂ MATERIAL</span>
                          </div>
                        </div>
                      )}
                      {activeWoodSwatch?.textureImg && (
                        <div className="macro-texture-container" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#F8F6F2', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                          <button 
                            className="macro-thumbnail-btn" 
                            onClick={() => setExpandedTexture(expandedTexture === 'wood' ? null : 'wood')}
                            style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-dark)', padding: 0, cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                            title="Apasă pentru zoom textură lemn"
                          >
                            <img loading="lazy" src={activeWoodSwatch.textureImg} alt={activeWoodSwatch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} className="macro-hover-overlay">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
                            </div>
                          </button>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>PREVIZUALIZARE TEXTURĂ LEMN</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                <span className="pm-premium-badge" style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid rgba(208, 155, 62, 0.2)', fontSize: '11px', fontWeight: '700', padding: '6px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                    {/* INLINE MACRO TEXTURE EXPANDED BOX (DESKTOP) */}
                    {(activeFabricSwatch?.textureImg || activeWoodSwatch?.textureImg) && (
                      <div className={`macro-inline-box ${expandedTexture ? 'open' : ''}`}
                        onClick={() => setExpandedTexture(null)}
                      >
                        <img loading="lazy" src={expandedTexture === 'wood' ? activeWoodSwatch?.textureImg : activeFabricSwatch?.textureImg} alt={expandedTexture === 'wood' ? activeWoodSwatch?.name : activeFabricSwatch?.name} 
                          style={{ 
                            width: '100%', 
                            height: '280px', 
                            objectFit: 'cover', 
                            display: 'block' 
                          }} 
                        />
                        
                        {/* Close button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedTexture(null);
                          }}
                          style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(4px)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: 'var(--text-primary)',
                            transition: 'opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            zIndex: 12,
                            opacity: expandedTexture ? 1 : 0,
                            pointerEvents: expandedTexture ? 'auto' : 'none',
                            transitionDelay: expandedTexture ? '0.1s' : '0s'
                          }}
                          className="macro-inline-close-btn"
                          aria-label="Închide previzualizarea"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      {product.category === 'Mese' ? 'Finisaj Lemn:' : 'Nuanță Tapițerie:'} <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeFabricSwatch?.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {fabricSwatches.map((swatch, idx) => (
                        <button 
                          key={idx}
                          className={`pm-swatch ${activeFabricSwatch?.name === swatch.name ? 'active' : ''}`}
                          style={{
                            backgroundColor: swatch.code,
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            border: '2px solid #FFF',
                            outline: `1.5px solid ${activeFabricSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                            transform: activeFabricSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                            transition: 'var(--transition)'
                          }}
                          onClick={() => {
                            if (swatch.productId !== undefined && swatch.productId !== product.id) {
                               navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true, selectedSwatchName: swatch.name } });
                            } else {
                               setActiveFabricSwatch(swatch);
                            }
                          }}
                          title={swatch.name}
                        ></button>
                      ))}
                    </div>

                                        {/* COMBINED TEXTURE PREVIEW PANEL */}
                    {(activeFabricSwatch?.textureImg || activeWoodSwatch?.textureImg) && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: (activeFabricSwatch?.textureImg && activeWoodSwatch?.textureImg) ? '1fr 1fr' : '1fr',
                        gap: '10px',
                        marginTop: '14px',
                        padding: '4px',
                        background: '#FFF',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}>
                        {activeFabricSwatch?.textureImg && (
                          <div className="macro-texture-container" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#F8F6F2', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                            <button 
                              className="macro-thumbnail-btn" 
                              onClick={() => setExpandedTexture(expandedTexture === 'fabric' ? null : 'fabric')}
                              style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-dark)', padding: 0, cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                              title={product.category === 'Mese' ? 'Apasă pentru zoom textură lemn' : 'Apasă pentru zoom textură macro'}
                            >
                              <img loading="lazy" src={activeFabricSwatch.textureImg} alt={activeFabricSwatch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} className="macro-hover-overlay">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
                              </div>
                            </button>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>PREVIZUALIZARE TEXTURĂ MATERIAL</span>
                            </div>
                          </div>
                        )}
                        {activeWoodSwatch?.textureImg && (
                          <div className="macro-texture-container" style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#F8F6F2', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                            <button 
                              className="macro-thumbnail-btn" 
                              onClick={() => setExpandedTexture(expandedTexture === 'wood' ? null : 'wood')}
                              style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-dark)', padding: 0, cursor: 'pointer', position: 'relative', flexShrink: 0 }}
                              title="Apasă pentru zoom textură lemn"
                            >
                              <img loading="lazy" src={activeWoodSwatch.textureImg} alt={activeWoodSwatch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} className="macro-hover-overlay">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
                              </div>
                            </button>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>PREVIZUALIZARE TEXTURĂ LEMN</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                
                    {woodSwatches.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                          Finisaj Lemn: <span style={{ color: 'var(--text-primary)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{activeWoodSwatch?.name}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {woodSwatches.map((swatch, idx) => (
                            <button 
                              key={idx}
                              className={`pm-swatch ${activeWoodSwatch?.name === swatch.name ? 'active' : ''}`}
                              style={{
                                backgroundColor: swatch.code,
                                width: '34px',
                                height: '34px',
                                borderRadius: '50%',
                                border: '2px solid #FFF',
                                outline: `1.5px solid ${activeWoodSwatch?.name === swatch.name ? 'var(--text-primary)' : 'var(--border-dark)'}`,
                                transform: activeWoodSwatch?.name === swatch.name ? 'scale(1.12)' : 'scale(1)',
                                transition: 'var(--transition)'
                              }}
                              onClick={() => {
                                if (swatch.productId !== undefined && swatch.productId !== product.id) {
                                   navigate(`/produs/${swatch.productId}`, { state: { preventScrollTop: true, selectedWoodSwatchName: swatch.name } });
                                } else {
                                   setActiveWoodSwatch(swatch);
                                }
                              }}
                              title={swatch.name}
                            ></button>
                          ))}
                        </div>

                      </div>
                    )}

                {/* 2. TIP TEXTURA STOFA */}
                {hasFabrics && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Tipul Materialului: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{fabricType}</span>
                    </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }} className="config-grid">
                    {opts.fabrics.map((f) => (
                      <button
                        key={f.name}
                        onClick={() => setFabricType(f.name)}
                        className={`config-btn ${fabricType === f.name ? 'active' : ''}`}
                      >
                        <div className="cb-title">{f.name}</div>
                        <div className="cb-desc">{f.desc}</div>
                        <div className="cb-cost">+{f.cost} MDL</div>
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* 3. MATERIAL PICIOARE / CADRU LEMN */}
                {hasWood && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    Picioare & Detalii Lemn: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{woodType}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }} className="config-grid">
                    {opts.wood.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => setWoodType(w.name)}
                        className={`config-btn ${woodType === w.name ? 'active' : ''}`}
                      >
                        <div className="cb-title">{w.name}</div>
                        <div className="cb-desc">{w.desc}</div>
                        <div className="cb-cost">+{w.cost} MDL</div>
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* 4. DIMENSIUNI DINAMICE */}
                {hasDimensions && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--text-secondary)' }}>
                      Dimensiune: <span style={{ color: 'var(--accent)', textTransform: 'none', fontWeight: '600', marginLeft: '6px' }}>{getDimensionLabel()}</span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '16px' }} className="config-grid-four">
                      {opts.dimensions.map((d) => (
                        <button
                          key={d.name}
                          onClick={() => setDimensionType(d.name)}
                          className={`config-btn ${dimensionType === d.name ? 'active' : ''}`}
                        >
                          <div className="cb-title">{d.name}</div>
                          <div className="cb-desc">{d.desc}</div>
                          <div className="cb-cost">+{d.cost} MDL</div>
                        </button>
                      ))}
                    </div>

                    {/* Custom dimension slider */}
                    {(dimensionType === 'Personalizat' || dimensionType === 'Custom') && (
                      <div className="custom-slider-wrap" style={{ background: 'var(--accent-light)', padding: '16px', borderRadius: '4px', border: '1px solid rgba(208, 155, 62,0.15)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}>
                          <span>Dimensiune Ajustabilă:</span>
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
                    onClick={handleDownloadPDF}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Ofertă PDF
                  </button>
                  <button 
                    className="btn-outline pm-btn" 
                    style={{ flex: '1', minWidth: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    onClick={handleAddToWishlist}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Favorite
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

      {/* HIDDEN PDF TEMPLATE */}
      <div 
        id="pdf-quote-template" 
        style={{ 
          display: 'none', 
          width: '800px', 
          padding: '40px', 
          backgroundColor: '#FAF8F5', 
          color: '#1C1B19', 
          fontFamily: '"Outfit", sans-serif',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #D09B3E', paddingBottom: '20px', marginBottom: '30px', width: '100%', position: 'relative' }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', margin: '0 0 8px 0', color: '#1C1B19', whiteSpace: 'nowrap' }}>Ofertă Comercială</h1>
            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Data: {new Date().toLocaleDateString('ro-RO')}</p>
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <img src="/logo_dark_text.png" alt="Trustera Wood & Soft" style={{ height: '45px', objectFit: 'contain' }} crossOrigin="anonymous" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Chișinău, Republica Moldova<br/>contact@woodsoft.md<br/>+373 60 53 56 65</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          <div style={{ flex: '1' }}>
            <img 
              src={productImages[0]} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} 
              crossOrigin="anonymous"
            />
          </div>
          <div style={{ flex: '1' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '28px', margin: '0 0 5px 0' }}>{product.type} {product.name}</h2>
            <p style={{ color: '#D09B3E', fontSize: '16px', fontWeight: '500', margin: '0 0 20px 0' }}>{product.category}</p>
            
            <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 15px 0' }}>Configurație Selectată</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666' }}>Stofă:</span>
                <span style={{ fontWeight: '500' }}>{fabricType} ({activeFabricSwatch?.name || 'Neselectat'})</span>
              </div>
              
              {hasWood && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#666' }}>Lemn/Picioare:</span>
                  <span style={{ fontWeight: '500' }}>{woodType}</span>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: '#666' }}>Dimensiune:</span>
                <span style={{ fontWeight: '500' }}>{getDimensionLabel()}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '10px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Estimativ:</span>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#D09B3E' }}>{calculatedPrice.toLocaleString('ro-RO')} MDL</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.6' }}>
            * Această ofertă are caracter informativ și nu reprezintă un contract comercial.<br/>
            Termenul de execuție standard este de 4-6 săptămâni. Prețul poate suferi ușoare modificări în funcție de complexitatea tehnică a proiectului personalizat și de disponibilitatea materialelor la momentul comenzii ferme.
          </p>
        </div>
      </div>
    </>
  );
}


