import React, { useState, useEffect } from 'react';

export default function Showroom() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    let message = `*TRUSTERA - Programare Vizită Showroom*\n`;
    message += `--------------------------------------\n`;
    message += `Nume Client: ${name}\n`;
    message += `Telefon Client: ${phone}\n`;
    message += `Data dorită: ${date}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37360535665?text=${encoded}`, '_blank');

    setSuccess(true);
    setName('');
    setPhone('');
    setDate('');

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '0px', paddingTop: '85px' }}>
      <section className="section" style={{ paddingTop: '10px' }}>
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <div>
            <span className="section-title">Experiență Senzorială</span>
            <h1 className="section-heading title-serif">Showroom-ul Nostru</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', fontSize: '15px' }}>
            Vino în showroom-ul nostru din Chișinău pentru a alege cele mai fine texturi, mostre de lemn masiv și pentru a discuta configurația perfectă pentru casa ta.
          </p>
        </div>

        {/* GALLERY SHOWCASE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '80px'
        }} className="showroom-gallery">
          
          <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '280px', border: '1px solid var(--border)' }}>
            <img 
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fm=webp&fit=crop&w=800&q=80" 
              alt="Zona Canapele Showroom" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="showroom-img"
            />
            <div className="gallery-overlay" style={{
              position: 'absolute',
              bottom: '0', left: '0', right: '0',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Zona Living</h3>
              <p style={{ fontSize: '12px', opacity: '0.8', margin: '0' }}>Descoperă canapelele modulare în diverse tapițerii</p>
            </div>
          </div>

          <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '280px', border: '1px solid var(--border)' }}>
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fm=webp&fit=crop&w=800&q=80" 
              alt="Mese Dining Showroom" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="showroom-img"
            />
            <div className="gallery-overlay" style={{
              position: 'absolute',
              bottom: '0', left: '0', right: '0',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Zona Dining</h3>
              <p style={{ fontSize: '12px', opacity: '0.8', margin: '0' }}>Mese din stejar natural masiv și scaune ergonomice</p>
            </div>
          </div>

          <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '280px', border: '1px solid var(--border)' }}>
            <img 
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fm=webp&fit=crop&w=800&q=80" 
              alt="Mostre Materiale Showroom" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="showroom-img"
            />
            <div className="gallery-overlay" style={{
              position: 'absolute',
              bottom: '0', left: '0', right: '0',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Mostre Materiale</h3>
              <p style={{ fontSize: '12px', opacity: '0.8', margin: '0' }}>Peste 100 de texturi și culori de catifea, in și bouclé</p>
            </div>
          </div>

        </div>

        {/* DETAILS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '50px',
          marginBottom: '80px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* SHOWROOM DETAILS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{
              background: 'var(--bg-card)',
              padding: '30px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 className="title-serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent)' }}>Showroom Chișinău</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' }}>
                Bulevardul Mircea cel Bătrân 25/2, Chișinău, MD-2075, Republica Moldova
              </p>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div><strong>Luni – Vineri:</strong> 09:00 – 17:00</div>
                <div><strong>Sâmbătă – Duminică:</strong> Închis</div>
                <div><strong>Telefon:</strong> <a href="tel:+37360535665" style={{ fontWeight: '600', color: 'var(--accent)' }}>060 535 665</a></div>
                <div><strong>Email:</strong> <a href="mailto:showroom@trustera.md" style={{ color: 'var(--text-primary)' }}>showroom@trustera.md</a></div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '30px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 className="title-serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent)' }}>Consiliere Personalizată</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', margin: '0' }}>
                Pentru a-ți oferi cea mai bună experiență, recomandăm programarea unei vizite în prealabil. Un designer din echipa noastră îți va fi alocat exclusiv pentru a te ghida în alegerea materialelor, dimensiunilor și culorilor potrivite.
              </p>
            </div>

          </div>

          {/* APPOINTMENT FORM CARD */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}>
            {!success ? (
              <>
                <h2 className="title-serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Programează o vizită privată</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
                  Alege data în care dorești să ne vizitezi, iar un designer te va contacta pentru a confirma rezervarea intervalului orar.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-field" style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="showroomName" style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nume Complet</label>
                    <input 
                      type="text" 
                      id="showroomName"
                      className="form-input" 
                      placeholder="Nume Prenume" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="form-field" style={{ marginBottom: '20px' }}>
                    <label className="form-label" htmlFor="showroomPhone" style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Telefon Mobil</label>
                    <input 
                      type="tel" 
                      id="showroomPhone"
                      className="form-input" 
                      placeholder="+373 60 000 000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-field" style={{ marginBottom: '24px' }}>
                    <label className="form-label" htmlFor="showroomDate" style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data Vizitei</label>
                    <input 
                      type="date" 
                      id="showroomDate"
                      className="form-input" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>

                  <button className="btn-premium form-btn" type="submit" style={{ width: '100%' }}>Trimite Rezervarea</button>
                </form>
              </>
            ) : (
              <div className="form-success show" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0' }}>
                <div style={{ background: '#EAF7ED', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/>
                  </svg>
                </div>
                <h3 className="title-serif" style={{ fontSize: '22px', marginBottom: '12px' }}>Rezervare Trimisă!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>Datele au fost trimise prin WhatsApp. Un designer vă va contacta în cel mai scurt timp pentru a stabili ora vizitei.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* MAP */}
      <div className="map-wrap" style={{ height: '500px', borderTop: '1px solid var(--border)' }}>
        <iframe 
          src="https://maps.google.com/maps?q=Chisinau+Mircea+cel+Batran+25/2&t=m&z=16&output=embed&iwloc=near" 
          title="Locație Showroom Chisinau" 
          loading="lazy" 
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>

      {/* STYLES EMULATION */}
      <style>{`
        .gallery-item-wrap:hover .showroom-img {
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .showroom-gallery {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .gallery-item-wrap {
            height: 220px !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
