import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '80px' }}>
      <section className="section">
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '60px', textAlign: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '700px' }}>
            <span className="section-title">Istoria Noastră</span>
            <h1 className="section-heading title-serif" style={{ marginBottom: '20px' }}>Povestea din spatele confortului tău</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
              De peste un deceniu, transformăm spațiile de locuit în cămine calde, rafinate și pline de personalitate. Credem că mobilierul nu este doar un obiect funcțional, ci o extensie a stilului tău de viață.
            </p>
          </div>
        </div>

        {/* HERO IMAGE BANNER */}
        <div style={{
          position: 'relative',
          height: '450px',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '80px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80" 
            alt="Atelier mobilier premium" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28,27,25,0.7) 10%, transparent 80%)'
          }}></div>
        </div>

        {/* TEXT CONTENT / GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '80px'
        }} className="about-grid">
          
          <div>
            <h2 className="title-serif" style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Producție proprie, personalizare fără limite
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              Spre deosebire de mobilierul de serie importat, noi controlăm întregul proces de producție. În atelierul propriu, combinăm tehnicile tradiționale de tâmplărie și tapițerie cu echipamente moderne de înaltă precizie.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              Acest lucru ne oferă libertatea de a ajusta orice dimensiune, de a modifica densitatea șezutului sau de a schimba picioarele mobilierului, oferindu-ți o piesă de mobilier unică, croită exact pentru casa ta.
            </p>
          </div>

          <div>
            <h2 className="title-serif" style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--text-primary)' }}>
              Materiale sustenabile și finisaje de lux
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              Sănătatea ta și a planetei este prioritatea noastră. Toată structura internă a canapelelor și paturilor noastre este realizată din lemn masiv de fag și mesteacăn, certificat ecologic FSC.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              Lucrăm exclusiv cu furnizori de stofe de top din Italia și Belgia. Colecția noastră include țesături hidrofobe, stofe catifelate cu rezistență de peste 100.000 de cicluri de frecare (Martindale) și materiale pet-friendly, ușor de curățat doar cu apă.
            </p>
          </div>

        </div>

        {/* KEY HIGHLIGHTS / COUNTERS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          textAlign: 'center',
          padding: '60px 40px',
          background: 'var(--accent-light)',
          borderRadius: '4px',
          border: '1px solid rgba(197, 168, 128, 0.15)',
          marginBottom: '80px'
        }} className="about-stats-grid">
          
          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }}>15+</div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>Ani de Experiență</div>
          </div>
          
          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }}>5000+</div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>Proiecte Livrate</div>
          </div>

          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }}>24 Luni</div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>Garanție Completă</div>
          </div>

        </div>

        {/* CALL TO ACTION */}
        <div style={{ textAlign: 'center' }}>
          <h2 className="title-serif" style={{ fontSize: '32px', marginBottom: '24px' }}>Ești gata să îți redefinești casa?</h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/catalog" className="btn-premium">Vezi Catalogul</Link>
            <Link to="/contact" className="btn-outline">Programează o Vizită</Link>
          </div>
        </div>

      </section>

      {/* ADD RESPONSIVE CSS EMULATION */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid, .about-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
