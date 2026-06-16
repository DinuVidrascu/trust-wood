import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const projectsData = [
  {
    id: 1,
    title: 'Minimalist Loft Apartment',
    location: 'Berlin, Germania',
    category: 'residential',
    categoryName: 'Rezidențial',
    desc: 'Un spațiu industrial reconvertit într-un loft modern, axat pe nuanțe pământii și texturi bogate. Zona de living se învârte în jurul canapelei noastre modulare configurate special în catifea verde smarald.',
    products: ['Canapea Modulară Deseda', 'Fotoliu Bliss (Emerald Green)'],
    imgSrc: '/img/.webp'
  },
  {
    id: 2,
    title: 'Bistro Organic & Coffee Lounge',
    location: 'Viena, Austria',
    category: 'commercial',
    categoryName: 'HORECA / Comercial',
    desc: 'Un bistro local ce pune accentul pe ingrediente naturale și design biofilic. Mesele noastre rotunde din stejar masiv cu picior central din oțel negru oferă o atmosferă primitoare alături de scaunele Luxe tapițate în catifea.',
    products: ['Mese Dining Rovo (Stejar Natural)', 'Scaune Luxe (Verde Pădure)'],
    imgSrc: '/img/.webp'
  },
  {
    id: 3,
    title: 'Vilă Premium Pipera',
    location: 'București, România',
    category: 'residential',
    categoryName: 'Rezidențial',
    desc: 'Amenajarea unui living luminos cu ferestre înalte într-o zonă rezidențială exclusivistă. S-a optat pentru nuanțe de bej și crem, folosind canapeaua Deseda modulară și fotoliul Bliss în stofă ecologică bouclé.',
    products: ['Canapea Modulară Deseda (Bej)', 'Fotoliu Bliss (Beige Bouclé)'],
    imgSrc: '/img/.webp'
  },
  {
    id: 4,
    title: 'Lounge Executive HQ',
    location: 'Chișinău, Moldova',
    category: 'commercial',
    categoryName: 'HORECA / Comercial',
    desc: 'Zona de protocol și sala de conferințe a unei companii internaționale. Masa Rovo în varianta Smoked Black și scaunele din catifea bleumarin transmit forță, profesionalism și confort.',
    products: ['Mese Dining Rovo (Smoked Black)', 'Scaune Nova (Midnight Blue)'],
    imgSrc: '/img/.webp'
  },
  {
    id: 5,
    title: 'Penthouse Skyline View',
    location: 'Londra, Marea Britanie',
    category: 'residential',
    categoryName: 'Rezidențial',
    desc: 'Proiect rezidențial la înălțime cu vedere panoramică asupra orașului. Canapeaua modulară gri oferă echilibrul cromatic perfect în contrast cu accentele din metal negru și sticlă.',
    products: ['Canapea Modulară Deseda (Gri)', 'Fotoliu Bliss (Charcoal Grey)'],
    imgSrc: '/img/.webp'
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'residential', 'commercial'

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
      <section className="section" style={{ paddingTop: '10px' }}>
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '50px' }}>
          <div>
            <span className="section-title">Portofoliu Internațional</span>
            <h1 className="section-heading title-serif">Proiecte Globale</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '15px', lineHeight: '1.6' }}>
            Mobilierul Trustera aduce confort și estetică minimalistă în proiecte rezidențiale de lux și spații HORECA de prestigiu. Descoperiți spațiile create în colaborare cu arhitecți din întreaga Europă.
          </p>
        </div>

        {/* STATISTICS STRIP */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto 50px auto',
          textAlign: 'center',
          borderBottom: '1px solid var(--border)',
          borderTop: '1px solid var(--border)',
          padding: '25px 0'
        }} className="stats-strip">
          <div>
            <strong style={{ fontSize: '32px', color: 'var(--accent)', display: 'block', fontFamily: 'serif' }}>50+</strong>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Proiecte Finalizate
            </span>
          </div>
          <div>
            <strong style={{ fontSize: '32px', color: 'var(--accent)', display: 'block', fontFamily: 'serif' }}>6</strong>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Țări Livrate
            </span>
          </div>
          <div>
            <strong style={{ fontSize: '32px', color: 'var(--accent)', display: 'block', fontFamily: 'serif' }}>1500+</strong>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Produse Configurate
            </span>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px'
        }}>
          <button 
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: activeFilter === 'all' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeFilter === 'all' ? 'var(--accent)' : 'transparent',
              color: activeFilter === 'all' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13.5px',
              transition: 'all 0.3s ease'
            }}
          >
            Toate Proiectele
          </button>
          <button 
            onClick={() => setActiveFilter('residential')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: activeFilter === 'residential' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeFilter === 'residential' ? 'var(--accent)' : 'transparent',
              color: activeFilter === 'residential' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13.5px',
              transition: 'all 0.3s ease'
            }}
          >
            Rezidențial
          </button>
          <button 
            onClick={() => setActiveFilter('commercial')}
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: activeFilter === 'commercial' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeFilter === 'commercial' ? 'var(--accent)' : 'transparent',
              color: activeFilter === 'commercial' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13.5px',
              transition: 'all 0.3s ease'
            }}
          >
            HORECA & Comercial
          </button>
        </div>

        {/* PROJECTS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '35px',
          maxWidth: '1200px',
          margin: '0 auto 60px auto'
        }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="project-card"
            >
              {/* Photo Frame */}
              <div style={{
                height: '240px',
                background: `url(${project.imgSrc}) center/cover no-repeat`,
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  background: 'var(--accent)',
                  color: '#FFF',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  textTransform: 'uppercase'
                }}>
                  {project.categoryName}
                </span>
              </div>

              {/* Text Body */}
              <div style={{ padding: '25px', flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 className="title-serif" style={{ fontSize: '19px', margin: '0', color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600', display: 'block', marginBottom: '15px' }}>
                    📍 {project.location}
                  </span>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                    {project.desc}
                  </p>
                </div>

                {/* Products Tagged */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                    Mobilier Utilizat:
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {project.products.map((p, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'rgba(229, 193, 158, 0.08)',
                          border: '1px solid var(--border)',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: 'var(--text-primary)'
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(229, 193, 158, 0.08) 100%)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="title-serif" style={{ fontSize: '24px', color: 'var(--accent)', marginTop: '0', marginBottom: '12px' }}>
            Realizezi un Proiect Nou?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 25px auto' }}>
            Oferim suport complet de la proiectare până la livrare și montaj pentru arhitecți și dezvoltatori. Accesează programul nostru de parteneriat B2B pentru a primi cotații speciale și fișiere 3D CAD.
          </p>
          <Link 
            to="/parteneri"
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#FFF',
              textDecoration: 'none',
              padding: '12px 36px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background 0.3s ease'
            }}
            className="btn-colaborare"
          >
            Alătură-te Programului B2B &rarr;
          </Link>
        </div>

      </section>

      {/* RESPONSIVE & HOVER STYLES */}
      <style>{`
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md) !important;
        }
        .btn-colaborare:hover {
          background: #d8aa7e !important;
        }
        @media (max-width: 600px) {
          .stats-strip {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
