import React, { useState, useEffect } from 'react';

export default function Partners() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    partnerType: 'designer',
    website: '',
    message: ''
  });

  const [downloadNotification, setDownloadNotification] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const partnerTypeLabels = {
    designer: 'Designer de Interior',
    architect: 'Arhitect',
    retailer: 'Distribuitor / Salon',
    contractor: 'Antreprenor / Constructor',
    other: 'Altul'
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      alert('Vă rugăm să completați câmpurile obligatorii (Nume, Companie, E-mail).');
      return;
    }

    const typeLabel = partnerTypeLabels[formData.partnerType] || formData.partnerType;

    let message = `*TRUSTERA – Solicitare Parteneriat B2B*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Nume:* ${formData.name}\n`;
    message += `🏢 *Companie:* ${formData.company}\n`;
    message += `🤝 *Tip Partener:* ${typeLabel}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    if (formData.phone) message += `📞 *Telefon:* ${formData.phone}\n`;
    if (formData.website) message += `🌐 *Website:* ${formData.website}\n`;
    if (formData.message) {
      message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `💬 *Mesaj:*\n${formData.message}\n`;
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37360535665?text=${encoded}`, '_blank');

    setFormSubmitted(true);
  };

  const triggerDownload = (fileName) => {
    setDownloadNotification(`Descărcarea fișierului ${fileName} a început...`);
    setTimeout(() => {
      setDownloadNotification('');
    }, 4000);
  };

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
      <section className="section" style={{ paddingTop: '10px' }}>
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '50px' }}>
          <div>
            <span className="section-title">Programul B2B Trustera</span>
            <h1 className="section-heading title-serif">Parteneri & Colaborări</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '15px', lineHeight: '1.6' }}>
            Împreună modelăm spații deosebite. Oferim condiții comerciale avantajoase, flexibilitate în producție și suport complet pentru arhitecți, designeri de interior și comercianți din întreaga Europă.
          </p>
        </div>

        {/* 2 COLUMN B2B PILLARS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto 60px auto'
        }}>
          {/* Pillar 1: Designers & Architects */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '35px',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(229, 193, 158, 0.15)',
                color: 'var(--accent)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '18px'
              }}>
                A
              </div>
              <h2 className="title-serif" style={{ fontSize: '20px', margin: '0', color: 'var(--accent)' }}>
                Arhitecți & Designeri
              </h2>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
              Înțelegem importanța fiecărui detaliu în materializarea viziunii clienților voștri. Oferim libertate absolută în configurarea mobilierului Trustera pentru proiecte rezidențiale sau comerciale.
            </p>

            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '10px' }}><strong>Discount de Proiect:</strong> Prețuri speciale și sisteme de comisionare atractive.</li>
              <li style={{ marginBottom: '10px' }}><strong>Personalizare totală:</strong> Modificarea dimensiunilor standard ale meselor, canapelelor sau fotoliilor.</li>
              <li style={{ marginBottom: '10px' }}><strong>Cataloage & Mostrare:</strong> Livrăm mostrare fizice de stofe (velvet, bouclé, in) și mostre de lemn masiv direct la biroul vostru.</li>
              <li style={{ marginBottom: '10px' }}><strong>Fișiere 3D CAD:</strong> Acces direct la modele 3D (.dwg, .fbx, .obj) ale întregului nostru catalog pentru randări realiste.</li>
            </ul>
          </div>

          {/* Pillar 2: Retailers & Distributors */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '35px',
            borderRadius: '6px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                background: 'rgba(229, 193, 158, 0.15)',
                color: 'var(--accent)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '18px'
              }}>
                D
              </div>
              <h2 className="title-serif" style={{ fontSize: '20px', margin: '0', color: 'var(--accent)' }}>
                Distribuitori & Saloane
              </h2>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
              Dezvoltați portofoliul magazinului dumneavoastră cu produse de mobilier de lux realizate manual, din lemn masiv și structuri din oțel, cu finisaje impecabile.
            </p>

            <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '10px' }}><strong>Prețuri de Volum:</strong> Grilă de prețuri en-gros extrem de competitivă pentru comenzi de stoc sau proiect.</li>
              <li style={{ marginBottom: '10px' }}><strong>Logistică în Europa:</strong> Livrare asigurată direct din atelierul nostru către depozitul dumneavoastră sau drop-shipping către clientul final.</li>
              <li style={{ marginBottom: '10px' }}><strong>Asistență Tehnică:</strong> Instrucțiuni complete de montaj și mentenanță pentru echipa dumneavoastră de showroom.</li>
              <li style={{ marginBottom: '10px' }}><strong>Termene de Producție Stabile:</strong> Producție rapidă și termene respectate cu strictețe (3-5 săptămâni).</li>
            </ul>
          </div>
        </div>

        {/* 3D RESOURCES SECTION */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto 60px auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '35px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 className="title-serif" style={{ fontSize: '22px', color: 'var(--accent)', marginTop: '0', marginBottom: '10px' }}>
            Biblioteca de Modele 3D & CAD
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '25px' }}>
            Descarcă modelele tridimensionale ale pieselor noastre de design pentru a le integra direct în randările voastre. Oferim fișiere optimizate de înaltă calitate.
          </p>

          {/* Download Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {/* Model 1: Deseda */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.01)'
            }}>
              <div>
                <strong style={{ fontSize: '13.5px', display: 'block', color: 'var(--text-primary)' }}>Canapea Modulară Deseda</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Format: FBX, OBJ, DWG | 24 MB</span>
              </div>
              <button 
                onClick={() => triggerDownload('Canapea_Deseda_3D.zip')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  padding: '6px 12px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                Descărcare
              </button>
            </div>

            {/* Model 2: Bliss */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.01)'
            }}>
              <div>
                <strong style={{ fontSize: '13.5px', display: 'block', color: 'var(--text-primary)' }}>Fotoliu Bliss</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Format: FBX, OBJ, MAX | 18 MB</span>
              </div>
              <button 
                onClick={() => triggerDownload('Fotoliu_Bliss_3D.zip')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  padding: '6px 12px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                Descărcare
              </button>
            </div>

            {/* Model 3: Rovo Table */}
            <div style={{
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.01)'
            }}>
              <div>
                <strong style={{ fontSize: '13.5px', display: 'block', color: 'var(--text-primary)' }}>Masă Dining Rovo</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Format: FBX, OBJ, DWG | 12 MB</span>
              </div>
              <button 
                onClick={() => triggerDownload('Masa_Rovo_3D.zip')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  padding: '6px 12px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                Descărcare
              </button>
            </div>
          </div>
        </div>

        {/* B2B APPLICATION FORM */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit}>
              <h2 className="title-serif" style={{ fontSize: '22px', color: 'var(--accent)', marginTop: '0', marginBottom: '10px', textAlign: 'center' }}>
                Aplicați pentru Cont de Partener
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
                Completați formularul de mai jos și un manager dedicat B2B va lua legătura cu dumneavoastră în maximum 24 de ore lucrătoare pentru a discuta termenii colaborării.
              </p>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Nume și Prenume *
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="Numele dumneavoastră"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Denumire Companie / Studio *
                  </label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="Ex: Studio Design SRL"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    E-mail Profesional *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="office@companie.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Număr de Telefon *
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="+373 / +40 ..."
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Tip Activitate
                  </label>
                  <select 
                    name="partnerType" 
                    value={formData.partnerType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                  >
                    <option value="designer">Designer de Interior</option>
                    <option value="arhitect">Arhitect</option>
                    <option value="distribuitor">Distribuitor / Retailer</option>
                    <option value="dezvoltator">Dezvoltator Imobiliar</option>
                    <option value="altul">Altul</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Website / Portofoliu Link
                  </label>
                  <input 
                    type="url" 
                    name="website" 
                    value={formData.website}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg)',
                      color: 'var(--text-primary)',
                      fontSize: '14px'
                    }}
                    placeholder="https://portofoliu.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Detalii proiect sau solicitare suplimentară
                </label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Descrieți pe scurt activitatea dumneavoastră sau proiectul pentru care solicitați cotația de preț..."
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  type="submit"
                  style={{
                    background: 'var(--accent)',
                    color: '#FFF',
                    border: 'none',
                    padding: '12px 40px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease'
                  }}
                  className="btn-submit-b2b"
                >
                  Trimiteți Solicitarea
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(229, 193, 158, 0.15)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                margin: '0 auto 20px auto'
              }}>
                ✓
              </div>
              <h3 className="title-serif" style={{ fontSize: '22px', color: 'var(--accent)', marginBottom: '10px' }}>
                Solicitarea a fost înregistrată!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 25px auto' }}>
                Vă mulțumim pentru interesul manifestat față de brandul Trustera. Un manager dedicat clienților B2B va analiza portofoliul companiei dumneavoastră și vă va contacta pe e-mail sau telefon în maximum 24 de ore.
              </p>
              <button 
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    partnerType: 'designer',
                    website: '',
                    message: ''
                  });
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  padding: '10px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  fontWeight: '500',
                  transition: 'background 0.2s ease'
                }}
              >
                Trimite alt formular
              </button>
            </div>
          )}
        </div>

      </section>

      {/* DOWNLOAD TOAST NOTIFICATION */}
      {downloadNotification && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'var(--accent)',
          color: '#FFF',
          padding: '14px 24px',
          borderRadius: '4px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          zIndex: '99999',
          fontSize: '13.5px',
          animation: 'toastSlideIn 0.3s ease',
          fontWeight: '500'
        }}>
          {downloadNotification}
        </div>
      )}

      {/* CSS OVERRIDES */}
      <style>{`
        .btn-submit-b2b:hover {
          background: #d8aa7e !important;
        }
        @keyframes toastSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
