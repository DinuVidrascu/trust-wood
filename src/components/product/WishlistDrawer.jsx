import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import AppointmentModal from '../ui/AppointmentModal';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function WishlistDrawer() {
  const { wishlist, removeFromWishlist, drawerOpen, toggleDrawer, clearWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExploreCatalog = () => {
    toggleDrawer();
    navigate('/catalog');
  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [drawerOpen]);

  // Calculate total price
  const calculateTotal = () => {
    return wishlist.reduce((acc, item) => {
      // Remove spaces and dots from price string to parse it as number
      const numericPrice = parseInt(item.price.replace(/[\s\.]/g, ''));
      return acc + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);
  };

  const handleWhatsAppSend = () => {
    if (wishlist.length === 0) return;

    let message = `*TRUSTERA - Solicitare Ofertă Showroom*\n`;
    message += `--------------------------------------\n`;
    message += `Client: [Nume]\n`;
    message += `Telefon: [Telefon]\n\n`;
    message += `*Configurație Aleasă:*\n`;
    
    wishlist.forEach((item, index) => {
      message += `${index + 1}. *${item.type} ${item.name}*\n`;
      message += `   - Material: ${item.fabricType} (${item.swatchName})\n`;
      message += `   - Picioare: ${item.woodType}\n`;
      message += `   - Dimensiune: ${item.dimension}\n`;
      message += `   - Preț Estimat: ${item.price} MDL\n\n`;
    });
    
    const total = calculateTotal();
    message += `--------------------------------------\n`;
    message += `*Total Estimat:* ${total.toLocaleString('ro-RO')} MDL`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/37360535665?text=${encoded}`, '_blank');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    toggleDrawer(); // Close the drawer so the modal is displayed cleanly
  };

  const handleDownloadWishlistPDF = async () => {
    if (wishlist.length === 0) return;
    const pdfEl = document.getElementById('pdf-wishlist-template');
    if (!pdfEl) return;
    
    pdfEl.style.display = 'block';
    
    try {
      const canvas = await html2canvas(pdfEl, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: '#FAF8F5' 
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Oferta_Trustera_${new Date().toLocaleDateString('ro-RO').replace(/\./g, '-')}.pdf`);
    } catch (err) {
      console.error('Eroare la generarea PDF:', err);
      alert('Eroare la generarea ofertei PDF.');
    } finally {
      pdfEl.style.display = 'none';
    }
  };

  return (
    <>
      {/* DRAWER BACKDROP */}
      <div className={`wd-backdrop ${drawerOpen ? 'open' : ''}`} onClick={toggleDrawer}></div>

      {/* DRAWER PANEL */}
      <div className={`wd-panel ${drawerOpen ? 'open' : ''}`}>
          <div className="wd-header">
            <div className="wd-header-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent)' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <h3>Favoritele Mele ({wishlist.length})</h3>
            </div>
            <button className="wd-close" onClick={toggleDrawer} aria-label="Închide favorite">✕</button>
          </div>

          <div className="wd-content">
            {wishlist.length === 0 ? (
              <div className="wd-empty">
                <div className="wd-empty-icon">♡</div>
                <p className="wd-empty-title">Lista este goală</p>
                <p className="wd-empty-desc">Adaugă canapele sau piese de mobilier configurate direct din paginile de produs pentru a le salva aici.</p>
                <button className="btn-premium" onClick={handleExploreCatalog} style={{ marginTop: '20px', width: '100%' }}>
                  Explorează Catalogul
                </button>
              </div>
            ) : (
              <div className="wd-list-wrap">
                <div className="wd-list">
                  {wishlist.map((item, idx) => (
                    <div key={idx} className="wd-item">
                      <div className="wd-item-img-container">
                        <img loading="lazy" src={item.img} alt={item.name} className="wd-item-img" />
                      </div>
                      <div className="wd-item-details">
                        <div className="wd-item-title-row">
                          <span className="wd-item-name">{item.type} {item.name}</span>
                          <button 
                            className="wd-item-remove" 
                            onClick={() => removeFromWishlist(idx)}
                            aria-label="Șterge din favorite"
                            title="Șterge din favorite"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="wd-item-config">
                          <div><span>Stofă:</span> {item.fabricType} ({item.swatchName})</div>
                          <div><span>Picioare:</span> {item.woodType}</div>
                          <div><span>Dimensiune:</span> {item.dimension}</div>
                        </div>
                        <div className="wd-item-price-row">
                          <span className="wd-item-price">{item.price} MDL</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* DRAWER FOOTER */}
                <div className="wd-footer">
                  <div className="wd-total-row">
                    <span>Total estimat:</span>
                    <span className="wd-total-price">{calculateTotal().toLocaleString('ro-RO')} MDL</span>
                  </div>
                  
                  <p className="wd-footer-note">Cereți oferta de preț direct pe WhatsApp sau planificați o vizită în showroom cu produsele pre-selectate.</p>

                  <div className="wd-actions">
                    <button className="btn-whatsapp wd-btn" onClick={handleWhatsAppSend}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Trimite pe WhatsApp
                    </button>
                    
                    <button className="btn-premium wd-btn" onClick={handleDownloadWishlistPDF} style={{ background: '#333' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Descarcă Ofertă PDF
                    </button>

                    <button className="btn-premium wd-btn" onClick={handleOpenModal}>
                      Cere Ofertă / Rezervă Vizită
                    </button>

                    <button className="btn-outline wd-btn" onClick={clearWishlist} style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                      Golește Lista
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* APPOINTMENT MODAL */}
      <AppointmentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        configuredItems={wishlist}
      />

      {/* HIDDEN WISHLIST PDF TEMPLATE */}
      <div 
        id="pdf-wishlist-template" 
        style={{ 
          display: 'none', 
          width: '800px', 
          padding: '40px', 
          backgroundColor: '#FAF8F5', 
          color: '#1C1B19', 
          fontFamily: '"Outfit", sans-serif',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #D09B3E', paddingBottom: '20px', marginBottom: '30px', width: '100%', position: 'relative' }}>
          <div>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', margin: '0 0 8px 0', color: '#1C1B19', whiteSpace: 'nowrap' }}>Ofertă Comercială</h1>
            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Data: {new Date().toLocaleDateString('ro-RO')}</p>
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <img src="/logo_dark_text.png" alt="Trustera Wood & Soft" style={{ height: '45px', objectFit: 'contain' }} crossOrigin="anonymous" />
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Chișinău, Republica Moldova<br/>contact@woodsoft.md<br/>+373 60 53 56 65</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', margin: '0 0 15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Lista Produselor Configurate:</h3>
          {wishlist.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px dashed #eee' }}>
              <div style={{ width: '120px', height: '120px', flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} crossOrigin="anonymous" />
              </div>
              <div style={{ flex: '1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', margin: 0 }}>{item.type} {item.name}</h4>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#D09B3E' }}>{item.price} MDL</span>
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  <p style={{ margin: '0 0 4px 0' }}><strong>Stofă:</strong> {item.fabricType} ({item.swatchName})</p>
                  <p style={{ margin: '0 0 4px 0' }}><strong>Picioare:</strong> {item.woodType}</p>
                  <p style={{ margin: 0 }}><strong>Dimensiune:</strong> {item.dimension}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <div style={{ width: '300px', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Estimativ:</span>
              <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#D09B3E' }}>{calculateTotal().toLocaleString('ro-RO')} MDL</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.6' }}>
            * Această ofertă are caracter informativ și nu reprezintă un contract comercial.<br/>
            Termenul de execuție standard este de 4-6 săptămâni. Prețul poate suferi ușoare modificări în funcție de complexitatea tehnică a proiectelor personalizate.
          </p>
        </div>
      </div>
    </>
  );
}
