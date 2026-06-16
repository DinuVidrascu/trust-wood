import React, { useState, useEffect } from 'react';

export default function Contact() {
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

    setSuccess(true);
    setName('');
    setPhone('');
    setDate('');

    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '0px' }}>
      <section className="section">
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <div>
            <span className="section-title">Locație & Suport</span>
            <h1 className="section-heading title-serif">Să păstrăm legătura</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', fontSize: '15px' }}>
            Vino în showroom-ul nostru pentru a alege mostrele de materiale și a discuta în detaliu proiectul tău cu unul dintre experții noștri în design.
          </p>
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
                <div><strong>Număr de Telefon:</strong> <a href="tel:+37360535665" style={{ fontWeight: '600', color: 'var(--accent)' }}>060 535 665</a></div>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              padding: '30px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 className="title-serif" style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--accent)' }}>Parteneriate Design</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7', marginBottom: '12px' }}>
                Ești designer de interior sau arhitect? Scriene pe e-mail sau sună-ne pentru a stabili condițiile unui parteneriat de lungă durată.
              </p>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>
                Email: <a href="mailto:design@trustera.md" style={{ color: 'var(--text-primary)' }}>design@trustera.md</a>
              </div>
            </div>

          </div>

          {/* RESERVATION FORM CARD */}
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}>
            {!success ? (
              <>
                <h2 className="title-serif" style={{ fontSize: '24px', marginBottom: '12px' }}>Programează consultanța online</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginBottom: '24px' }}>
                  Completează datele de mai jos și un membru din echipa noastră te va contacta pentru a confirma disponibilitatea.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label className="form-label" htmlFor="contactName">Nume Complet</label>
                    <input 
                      type="text" 
                      id="contactName"
                      className="form-input" 
                      placeholder="Nume Prenume" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label" htmlFor="contactPhone">Telefon Mobil</label>
                    <input 
                      type="tel" 
                      id="contactPhone"
                      className="form-input" 
                      placeholder="+373 60 000 000" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="contactDate">Data dorită pentru vizită</label>
                    <input 
                      type="date" 
                      id="contactDate"
                      className="form-input" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required 
                    />
                  </div>

                  <button className="btn-premium form-btn" type="submit">Trimite Rezervarea</button>
                </form>
              </>
            ) : (
              <div className="form-success show">
                <div style={{ background: '#EAF7ED', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/>
                  </svg>
                </div>
                <h3 className="title-serif">Vă mulțumim!</h3>
                <p>Datele au fost înregistrate. Un designer de la Trustera vă va suna în cel mai scurt timp pentru confirmare.</p>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* MAP */}
      <div className="map-wrap" style={{ height: '500px' }}>
        <iframe src="https://maps.google.com/maps?q=Chisinau+Mircea+cel+Batran+25/2&t=m&z=16&output=embed&iwloc=near" title="Locație Showroom Chisinau" loading="lazy"></iframe>
      </div>

      {/* ADD RESPONSIVE CSS EMULATION */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
