import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

export default function About() {
  const { content } = useContent();
  
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
            <span className="section-title" dangerouslySetInnerHTML={{ __html: content.about.heroTag }}></span>
            <h1 className="section-heading title-serif" style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: content.about.heroTitle }}></h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
              <span dangerouslySetInnerHTML={{ __html: content.about.heroDesc }}></span>
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
          <img loading="lazy" 
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
              <span dangerouslySetInnerHTML={{ __html: content.about.storyTitle }}></span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              <span dangerouslySetInnerHTML={{ __html: content.about.storyParagraph1 }}></span>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
              <span dangerouslySetInnerHTML={{ __html: content.about.storyParagraph2 }}></span>
            </p>
          </div>

          <div>
            <h2 className="title-serif" style={{ fontSize: '28px', marginBottom: '20px', color: 'var(--text-primary)' }}>
              <span dangerouslySetInnerHTML={{ __html: content.about.missionTitle }}></span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              <span dangerouslySetInnerHTML={{ __html: content.about.missionDesc }}></span>
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
          border: '1px solid rgba(208, 155, 62, 0.15)',
          marginBottom: '80px'
        }} className="about-stats-grid">
          
          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: content.about.stats1Value }}></div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: content.about.stats1Label }}></div>
          </div>
          
          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: content.about.stats2Value }}></div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: content.about.stats2Label }}></div>
          </div>

          <div>
            <div className="title-serif" style={{ fontSize: '48px', color: 'var(--accent)', fontWeight: 'bold', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: content.about.stats3Value }}></div>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: content.about.stats3Label }}></div>
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
