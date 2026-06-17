import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '520px', width: '100%' }}>

        {/* Big 404 number */}
        <div style={{
          fontSize: 'clamp(80px, 18vw, 160px)',
          fontFamily: 'var(--font-serif)',
          fontWeight: '700',
          color: 'var(--accent)',
          lineHeight: '1',
          opacity: '0.18',
          userSelect: 'none',
          letterSpacing: '-4px',
          marginBottom: '-30px'
        }}>
          404
        </div>

        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(208, 155, 62, 0.12)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <span style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: 'var(--accent)',
          marginBottom: '12px'
        }}>
          Pagina nu a fost găsită
        </span>

        <h1 className="title-serif" style={{
          fontSize: 'clamp(22px, 4vw, 30px)',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          fontWeight: '700'
        }}>
          Această pagină nu există
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.6',
          marginBottom: '36px'
        }}>
          Adresa pe care ați accesat-o nu este validă sau a fost mutată. Veți fi redirecționat automat spre pagina principală în <strong style={{ color: 'var(--accent)' }}>{countdown}</strong> secunde.
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#FFF',
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background 0.3s ease'
            }}
            className="btn-home-404"
          >
            ← Înapoi Acasă
          </Link>
          <Link
            to="/catalog"
            style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid var(--border)',
              transition: 'all 0.3s ease'
            }}
            className="btn-catalog-404"
          >
            Vezi Catalogul
          </Link>
        </div>

        {/* Quick links */}
        <div style={{
          marginTop: '48px',
          paddingTop: '28px',
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Pagini populare
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { to: '/catalog?cat=Canapele', label: 'Canapele' },
              { to: '/catalog?cat=Fotolii', label: 'Fotolii' },
              { to: '/catalog?cat=Mese', label: 'Mese' },
              { to: '/showroom', label: 'Showroom' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                className="link-chip-404"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .btn-home-404:hover { background: var(--accent-hover) !important; }
        .btn-catalog-404:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
        .link-chip-404:hover { border-color: var(--accent) !important; color: var(--accent) !important; background: rgba(208, 155, 62,0.06) !important; }
      `}</style>
    </div>
  );
}
