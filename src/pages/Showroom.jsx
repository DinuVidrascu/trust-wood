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
    <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
      <section className="section" style={{ paddingTop: '10px' }}>
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <div>
            <span className="section-title">Experiență Senzorială</span>
            <h1 className="section-heading title-serif">Showroom Chișinău</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', fontSize: '15px' }}>
            Vino în showroom-ul nostru din Chișinău pentru a alege cele mai fine texturi, mostre de lemn masiv și pentru a discuta configurația perfectă cu un designer de interior.
          </p>
        </div>

        {/* MAP & PHOTOS INTEGRATED SECTION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 2fr 1.2fr',
          gap: '24px',
          marginBottom: '80px',
          alignItems: 'start'
        }} className="showroom-main-grid">
          
          {/* Left Column: Photos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="showroom-side-col">
            <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '200px', border: '1px solid var(--border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fm=webp&fit=crop&w=800&q=80" 
                alt="Zona Canapele Showroom" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="showroom-img"
              />
              <div className="gallery-overlay" style={{
                position: 'absolute', bottom: '0', left: '0', right: '0', padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>Zona Living</h3>
              </div>
            </div>

            <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '200px', border: '1px solid var(--border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fm=webp&fit=crop&w=800&q=80" 
                alt="Mostre Materiale Showroom" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="showroom-img"
              />
              <div className="gallery-overlay" style={{
                position: 'absolute', bottom: '0', left: '0', right: '0', padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>Mostre Tapițerie</h3>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Map */}
          <div style={{ height: '420px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }} className="showroom-map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Chisinau+Mircea+cel+Batran+25/2&t=m&z=16&output=embed&iwloc=near" 
              title="Locație Showroom Chisinau" 
              loading="lazy" 
              style={{ width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          </div>

          {/* Right Column: Photo + Address Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="showroom-side-col">
            <div className="gallery-item-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '200px', border: '1px solid var(--border)' }}>
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fm=webp&fit=crop&w=800&q=80" 
                alt="Mese Dining Showroom" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="showroom-img"
              />
              <div className="gallery-overlay" style={{
                position: 'absolute', bottom: '0', left: '0', right: '0', padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0' }}>Mese & Dining</h3>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '24px 20px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              height: '200px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxSizing: 'border-box'
            }}>
              <h3 className="title-serif" style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--accent)' }}>Chișinău, MD-2075</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '12.5px', margin: '0 0 10px 0', lineHeight: '1.4' }}>
                Bd. Mircea cel Bătrân 25/2
              </p>
              <div style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>L-V:</strong> 09:00 – 17:00 (S-D: Închis)</div>
                <div><strong>Tel:</strong> <a href="tel:+37360535665" style={{ fontWeight: '600', color: 'var(--accent)' }}>060 535 665</a></div>
              </div>
            </div>
          </div>

        </div>

        {/* BOOKING & COUNSELING SECTION */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          marginBottom: '80px',
          alignItems: 'start'
        }} className="showroom-form-grid">
          
          {/* COUNSELING DETAILS */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            height: '100%',
            boxSizing: 'border-box'
          }}>
            <h2 className="title-serif" style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text-primary)' }}>Consiliere Personalizată</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
              Fiecare proiect de mobilier este unic. Pentru a-ți oferi cea mai bună atenție și ghidaj, vizitele în showroom se fac pe bază de programare.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Un designer de interior din echipa Trustera îți va fi alocat exclusiv pentru a parcurge mostrele de stofe, finisaje de stejar și pentru a schița configurația optimă.
            </p>
            <div style={{ fontSize: '14px', fontWeight: '600', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              Email Showroom: <a href="mailto:showroom@trustera.md" style={{ color: 'var(--accent)' }}>showroom@trustera.md</a>
            </div>
          </div>

          {/* BOOKING FORM */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            boxSizing: 'border-box'
          }}>
            {!success ? (
              <>
                <h2 className="title-serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Rezervă o vizită privată</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
                  Alege data în care dorești să ne vizitezi, iar noi te vom contacta pentru a confirma intervalul orar.
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
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>Datele au fost înregistrate. Un designer de la Trustera vă va contacta pe WhatsApp/Telefon în cel mai scurt timp.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* STYLES EMULATION */}
      <style>{`
        .gallery-item-wrap:hover .showroom-img {
          transform: scale(1.06);
        }
        @media (max-width: 990px) {
          .showroom-main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .showroom-map-container {
            height: 350px !important;
            order: -1;
          }
          .showroom-form-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
