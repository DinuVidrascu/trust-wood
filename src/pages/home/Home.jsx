import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { advantages } from '../../data/products';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/product/ProductCard';
import AppointmentModal from '../../components/ui/AppointmentModal';

export default function Home() {
  const { products, categories } = useProducts();
  const [activeFilter, setActiveFilter] = useState('Toate');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  // Scroll listener for window parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll carousel
  const scrollCats = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
    track.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' });
  };

  // Scroll listener for dot tracking
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const card = track.firstElementChild;
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width + 24;
      const index = Math.round(track.scrollLeft / cardWidth);
      setActiveDot(index);
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Filter logic
  const handleFilterChange = (filterTag) => {
    setActiveFilter(filterTag);
  };

  const getFilteredProducts = () => {
    let filtered = products;
    if (activeFilter === 'Canapele') {
      filtered = products.filter(p => p.category === 'Canapele' || p.category === 'Scaune');
    } else if (activeFilter === 'Paturi') {
      filtered = products.filter(p => p.category === 'Paturi');
    } else if (activeFilter === 'Altele') {
      filtered = products.filter(p => p.category === 'Mese' || p.category === 'Fotolii' || p.category === 'Pufuri');
    }
    // Return first 4 items for homepage featured section
    return filtered.slice(0, 4);
  };
  return (
    <>
    <div className="page-entrance">
      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-bg" style={{ transform: `translateY(${scrollY * 0.3}px) scale(${1.02 + scrollY / 2500})`, transition: 'transform 0.05s ease-out' }}></div>
        <div className="hero-content">
          <span className="hero-tag">Colecția 2026</span>
          <h1 className="hero-title title-serif">Design, Rafinament și Confort Absolut</h1>
          <p className="hero-sub">Mobilier premium creat la comandă din cele mai fine materiale, conceput pentru a adăuga valoare și caracter casei tale.</p>
          <div className="hero-actions">
            <Link to="/catalog" className="hero-cta">Descoperă Colecția</Link>
          </div>
        </div>
        <a href="#categories" className="hero-scroll" aria-label="Scroll down">
          <span>Explorează</span>
          <div className="hero-scroll-line"></div>
        </a>
      </section>

      {/* CATEGORIES CAROUSEL */}
      <section className="section" id="categories">
        <div className="section-header">
          <div>
            <span className="section-title">Colecții</span>
            <h2 className="section-heading title-serif">Descoperă Modele Noi</h2>
          </div>
          <div className="cat-nav">
            <button className="cat-nav-btn" id="catPrev" onClick={() => scrollCats('prev')} disabled={activeDot === 0} aria-label="Previous category">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="cat-nav-btn" id="catNext" onClick={() => scrollCats('next')} disabled={activeDot >= categories.length - 1} aria-label="Next category">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        
        <div className="cat-container">
          <div className="cat-track" ref={trackRef}>
            {categories.map((c, i) => (
              <div 
                key={i} 
                className="cat-card" 
                onClick={() => navigate(`/catalog?cat=${c.name}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={c.img} alt={c.name} loading="lazy" />
                <div className="cat-overlay">
                  <span className="cat-name">{c.name}</span>
                  <span className="cat-count">{c.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cat-dots-container">
          <div className="cat-dots">
            {categories.map((_, i) => (
              <button 
                key={i} 
                className={`cat-dot ${activeDot === i ? 'active' : ''}`} 
                onClick={() => {
                  const track = trackRef.current;
                  if (!track) return;
                  const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
                  track.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                }} 
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      {/* LUXURY BANNER */}
      <div className="banner fade-in">
        <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fm=webp&fit=crop&w=1600&q=75" alt="Interior modern cu mobilier premium" loading="lazy" />
        <div className="banner-dim"></div>
        <div className="banner-content">
          <h2 className="title-serif">Ești designer de interior?</h2>
          <p>Oferim resurse profesionale gratuite pentru proiectele tale. Descarcă modelele noastre 3D la rezoluție înaltă pentru randări fotorealiste impresionante.</p>
          <button className="btn-premium banner-btn">Accesează Modelele 3D</button>
        </div>
      </div>

      {/* ADVANTAGES */}
      <section className="section advantages-section" id="advantages" style={{ maxWidth: '100%', margin: '80px 0 0 0' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <span className="section-title">Valori</span>
              <h2 className="section-heading title-serif">Promisiunea Calității</h2>
            </div>
          </div>
          <div className="advantages">
            {advantages.map((a, i) => (
              <div key={i} className="adv-card fade-in">
                <div className="adv-icon">
                  {a.icon === 'fabric' && (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <rect x="4" y="4" width="14" height="14" rx="2"/><rect x="22" y="4" width="14" height="14" rx="2"/><rect x="4" y="22" width="14" height="14" rx="2"/><rect x="22" y="22" width="14" height="14" rx="2"/><line x1="6" y1="6" x2="16" y2="16"/><line x1="16" y1="6" x2="6" y2="16"/>
                    </svg>
                  )}
                  {a.icon === 'quality' && (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M20 4l4 8 9 1.3-6.5 6.3L28 29 20 24.5 12 29l1.5-9.4L7 13.3l9-1.3z"/><circle cx="20" cy="20" r="16"/>
                    </svg>
                  )}
                  {a.icon === 'shield' && (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M20 4L8 10v10c0 8.5 5.1 16.4 12 19 6.9-2.6 12-10.5 12-19V10L20 4z"/><path d="M15 20l3 3 7-7" strokeWidth="2"/>
                    </svg>
                  )}
                  {a.icon === 'sofa' && (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <rect x="4" y="14" width="32" height="20" rx="2"/><path d="M10 14V8h20v6"/><circle cx="20" cy="24" r="5"/><path d="M18 24l1.5 1.5L23 22"/>
                    </svg>
                  )}
                </div>
                <h3 className="adv-title">{a.title}</h3>
                <p className="adv-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CONVERSATION BAR */}
      <div className="cta-bar fade-in">
        <h2 className="title-serif">Vrei să discutăm proiectul tău în detaliu?</h2>
        <a href="tel:+37360535665" className="cta-phone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>060 535 665</span>
        </a>
      </div>

      {/* PRODUCTS featured */}
      <section className="section" id="products">
        <div className="section-header">
          <div>
            <span className="section-title">Recomandări</span>
            <h2 className="section-heading title-serif">Piese Semnătură</h2>
          </div>
          <Link to="/catalog" className="btn-outline" style={{ padding: '12px 24px', fontSize: '11px' }}>Vezi tot catalogul</Link>
        </div>

        {/* Filter Buttons */}
        <div className="filter-tags">
          <button className={`filter-btn ${activeFilter === 'Toate' ? 'active' : ''}`} onClick={() => handleFilterChange('Toate')}>Toate</button>
          <button className={`filter-btn ${activeFilter === 'Canapele' ? 'active' : ''}`} onClick={() => handleFilterChange('Canapele')}>Canapele & Scaune</button>
          <button className={`filter-btn ${activeFilter === 'Altele' ? 'active' : ''}`} onClick={() => handleFilterChange('Altele')}>Mese & Accesorii</button>
        </div>

        <div className="products-grid">
          {getFilteredProducts().map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SHOWROOM SCHEDULE */}
      <div className="showroom fade-in" id="showroom">
        <span className="section-title">Experiență Live</span>
        <h2 className="title-serif">Te așteptăm în Showroom-ul nostru</h2>
        <p>Vino să vezi texturile, să testezi confortul și să configurezi modelul ideal alături de arhitecții și designerii noștri.</p>
        <button className="btn-premium showroom-btn" onClick={() => setModalOpen(true)}>Programează consultanța</button>
      </div>
    </div>
    {/* APPOINTMENT MODAL - Placed outside to bypass CSS transforms */}
    <AppointmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

