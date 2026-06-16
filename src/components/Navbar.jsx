import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { wishlist, toggleDrawer } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Scroll and path-aware effect
  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setScrolled(true);
      } else {
        setScrolled(window.scrollY > 60);
      }
    };
    
    // Run initially
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Search logic
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.type.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(matches);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    document.body.style.overflow = '';
  };

  const handleLogoClick = () => {
    closeAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    if (nextState) setSearchOpen(false);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const toggleSearch = () => {
    const nextState = !searchOpen;
    setSearchOpen(nextState);
    if (nextState) setMenuOpen(false);
    document.body.style.overflow = nextState ? 'hidden' : '';
    if (nextState) {
      setTimeout(() => {
        document.getElementById('searchInputReact')?.focus();
      }, 150);
    }
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <Link to="/" className="nav-logo" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img loading="lazy" src="/logo.png" alt="Trustera Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
          <span>Trustera</span>
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} end onClick={closeAll}>Acasă</NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} onClick={closeAll}>Catalog</NavLink>
          </li>
          <li>
            <NavLink to="/despre" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} onClick={closeAll}>Despre Noi</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} onClick={closeAll}>Contact</NavLink>
          </li>
        </ul>
        <div className="nav-right">
          <button className="nav-icon" onClick={toggleDrawer} aria-label="Favorite" style={{ position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlist.length > 0 && (
              <span className="wishlist-badge">{wishlist.length}</span>
            )}
          </button>
          <button className="nav-icon" onClick={toggleSearch} aria-label="Caută în catalog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
          <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Meniu navigare">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* BLUR OVERLAY */}
      <div className={`overlay ${(menuOpen || searchOpen) ? 'open' : ''}`} onClick={closeAll}></div>

      {/* MOBILE DRAWER MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mm-header">
          <Link to="/" className="mm-logo" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img loading="lazy" src="/logo.png" alt="Trustera Logo" style={{ height: '32px', width: 'auto', borderRadius: '4px' }} />
            <span>Trustera</span>
          </Link>
          <button className="mm-close" onClick={closeAll} aria-label="Închide meniu">✕</button>
        </div>
        <div className="mm-links-wrap">
          <Link to="/" className="mm-link" onClick={closeAll}>Acasă</Link>
          <Link to="/catalog" className="mm-link" onClick={closeAll}>Catalog Produse</Link>
          <Link to="/despre" className="mm-link" onClick={closeAll}>Despre Noi</Link>
          <Link to="/contact" className="mm-link" onClick={closeAll}>Contact</Link>
          
          <div className="mm-heading">Categorii Catalog</div>
          <div className="mm-sub">
            <Link to="/catalog?cat=Canapele" onClick={closeAll}>Canapele</Link>
            <Link to="/catalog?cat=Scaune" onClick={closeAll}>Scaune</Link>
            <Link to="/catalog?cat=Fotolii" onClick={closeAll}>Fotolii</Link>
            <Link to="/catalog?cat=Mese" onClick={closeAll}>Mese</Link>
          </div>
        </div>
      </div>

      {/* LIVE SEARCH SIDEBAR */}
      <div className={`search-sidebar ${searchOpen ? 'open' : ''}`}>
        <div className="ss-header">
          <h3>Caută în Catalog {searchResults.length > 0 && <span>({searchResults.length})</span>}</h3>
          <button className="ss-close" onClick={closeAll} aria-label="Închide căutarea">✕</button>
        </div>
        <div className="ss-input-wrap">
          <svg className="ss-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input 
            className="ss-input" 
            id="searchInputReact" 
            type="text" 
            placeholder="Scrie denumirea sau categoria..." 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="ss-results">
          {searchQuery.trim().length < 2 ? (
            <div className="ss-empty">Introdu cel puțin 2 caractere pentru a începe căutarea.</div>
          ) : searchResults.length === 0 ? (
            <div className="ss-empty">Nu am găsit rezultate pentru „{searchQuery}”. Încearcă altceva.</div>
          ) : (
            searchResults.map(p => (
              <div 
                key={p.id} 
                className="ss-item" 
                onClick={() => {
                  closeAll();
                  navigate(`/produs/${p.id}`);
                }}
              >
                <img loading="lazy" src={p.img} alt={p.name} />
                <div className="ss-item-details">
                  <div className="ss-item-name">{p.type} {p.name}</div>
                  <div className="ss-item-price">{p.price} MDL</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

