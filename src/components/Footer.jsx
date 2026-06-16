import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" onClick={scrollToTop} className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <img src="/logo.png" alt="Trustera Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
            <span>TRUSTERA</span>
          </Link>
          <div className="footer-contact">
            <p style={{ marginBottom: '15px' }}>Bulevardul Mircea cel Bătrân 25/2, Chișinău, MD-2075</p>
            <a href="tel:+37360535665">060 535 665</a><br />
            <p style={{ marginTop: '15px', opacity: 0.6 }}>Luni – Vineri: 09:00 – 17:00<br />Sâmbătă – Duminică: Închis</p>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Despre Noi</div>
          <div className="footer-links">
            <Link to="/despre" onClick={scrollToTop}>Valori & Calitate</Link>
            <Link to="/showroom" onClick={scrollToTop}>Locație Showroom</Link>
            <Link to="/politica-confidentialitate" onClick={scrollToTop}>Politica de Confidențialitate</Link>
            <Link to="/termeni-conditii" onClick={scrollToTop}>Termeni și Condiții</Link>
          </div>
        </div>
        <div>
          <div className="footer-heading">Informații Client</div>
          <div className="footer-links">
            <Link to="/contact" onClick={scrollToTop}>Contacte Rapide</Link>
            <Link to="/ghid-livrare-montaj" onClick={scrollToTop}>Ghid de Livrare & Montaj</Link>
            <Link to="/garantie-produse" onClick={scrollToTop}>Garanția Produselor</Link>
            <Link to="/catalog-materiale-stofe" onClick={scrollToTop}>Catalog Materiale & Stofe</Link>
          </div>
        </div>
        <div>
          <div className="footer-heading">Internațional</div>
          <div className="footer-links">
            <a href="#">Parteneri Europa</a>
            <a href="#">Proiecte Globale</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>trustera.md © 2026. Toate drepturile rezervate.</span>
        <span style={{ opacity: 0.6 }}>Design rafinat de Trustera Wood & Soft</span>
      </div>
    </footer>
  );
}
