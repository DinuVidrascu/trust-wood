import React, { useState, useEffect } from 'react';

export default function AppointmentModal({ isOpen, onClose, configuredItems }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setName('');
      setPhone('');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Set min date to today
      const dateField = document.getElementById('modalDateInput');
      if (dateField) {
        const today = new Date().toISOString().split('T')[0];
        dateField.min = today;
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    let message = `*TRUSTERA - Programare Vizită Showroom*\n`;
    message += `--------------------------------------\n`;
    message += `Nume Client: ${name}\n`;
    message += `Telefon Client: ${phone}\n`;
    message += `Data dorită: ${date}\n\n`;

    if (configuredItems && configuredItems.length > 0) {
      message += `*Produse Configurate Salvate:*\n`;
      configuredItems.forEach((item, index) => {
        message += `${index + 1}. *${item.type} ${item.name}* (${item.dimension}, ${item.fabricType}, ${item.woodType})\n`;
      });
    }

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37360535665?text=${encoded}`, '_blank');

    setSuccess(true);
    setName('');
    setPhone('');
    setDate('');

    setTimeout(() => {
      onClose();
    }, 3500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-wrap open">
      <div className="modal-bg" onClick={onClose}></div>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Închide modalul">✕</button>
        
        {!success ? (
          <div id="formView">
            <h2 className="title-serif">Programează o vizită</h2>
            <p className="modal-desc">Configurează-ți vizita în showroom alături de un consultant dedicat. Îți vom prezenta toate mostrele de materiale.</p>
            {configuredItems && configuredItems.length > 0 && (
              <div className="modal-configured-summary" style={{
                background: 'var(--accent-light)',
                border: '1px solid rgba(197, 168, 128, 0.2)',
                borderRadius: '4px',
                padding: '14px',
                marginBottom: '20px',
                maxHeight: '160px',
                overflowY: 'auto',
                fontSize: '13px',
                textAlign: 'left'
              }}>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
                  Produse Configurate Salvate ({configuredItems.length}):
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
                  {configuredItems.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      <strong>{item.type} {item.name}</strong> - {item.dimension} | {item.fabricType} ({item.swatchName}) | {item.woodType}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label" htmlFor="modalName">Nume Complet</label>
                <input 
                  className="form-input" 
                  id="modalName" 
                  type="text" 
                  placeholder="Nume Prenume" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="modalPhone">Telefon Mobil</label>
                <input 
                  className="form-input" 
                  id="modalPhone" 
                  type="tel" 
                  placeholder="+373 60 000 000" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required 
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="modalDateInput">Data Vizitei</label>
                <input 
                  className="form-input" 
                  id="modalDateInput" 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required 
                />
              </div>
              <button className="btn-premium form-btn" type="submit">Trimite Solicitarea</button>
            </form>
          </div>
        ) : (
          <div className="form-success show">
            <div style={{ background: '#EAF7ED', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2.5" style={{ alignSelf: 'center' }}>
                <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/>
              </svg>
            </div>
            <h3 className="title-serif">Solicitare Înregistrată</h3>
            <p>Vă mulțumim! Un consultant vă va contacta în cel mai scurt timp pentru confirmarea datei stabilite.</p>
          </div>
        )}
      </div>
    </div>
  );
}
