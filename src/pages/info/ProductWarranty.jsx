import React, { useEffect } from 'react';

export default function ProductWarranty() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
      <section className="section" style={{ paddingTop: '10px' }}>
        
        {/* HEADER */}
        <div className="section-header" style={{ marginBottom: '50px' }}>
          <div>
            <span className="section-title">Angajamentul Nostru</span>
            <h1 className="section-heading title-serif">Garanția Produselor</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '15px' }}>
            Fiecare piesă de mobilier Trustera este o investiție în confort și design durabil. Oferim garanție completă și asistență tehnică pentru a ne asigura că te bucuri de ea o viață întreagă.
          </p>
        </div>

        {/* POLICY CONTENT */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'var(--bg-card)',
          padding: '40px',
          borderRadius: '4px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--text-primary)',
          lineHeight: '1.7',
          fontSize: '14.5px'
        }} className="policy-container">
          
          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>1. Perioada de Garanție și Durata de Viață</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Toate produsele achiziționate de pe site-ul nostru sau direct din showroom beneficiază de o garanție de conformitate de <strong>24 de luni</strong> de la data livrării. Durata medie de utilizare a structurilor din lemn masiv și oțel utilizate în mobilierul nostru depășește <strong>15 ani</strong>, reflectând calitatea materialelor și atenția la detalii în producție.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>2. Ce Acoperă Garanția?</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Garanția acoperă defectele de fabricație sau de material apărute în condiții normale de utilizare casnică:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Structura din lemn și metal:</strong> Fisuri sau deformări neobișnuite ale cadrului interior (lemn de fag, cadru oțel).</li>
            <li style={{ marginBottom: '8px' }}><strong>Suspensia internă:</strong> Ruperea sau cedarea arcurilor sinusoidale și a chingilor elastice.</li>
            <li style={{ marginBottom: '8px' }}><strong>Îmbinări structurale:</strong> Desfacerea îmbinărilor din lemn masiv realizate în atelier.</li>
            <li style={{ marginBottom: '8px' }}><strong>Integritatea cusăturilor:</strong> Defecte ale cusăturilor tapițeriei la livrare sau cedarea lor în timpul utilizării normale.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>3. Excluderi din Garanție</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Garanția NU se aplică în următoarele cazuri:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Uzură normală a materialelor (tasarea spumei HR în timp, scăderea elasticității firelor de bumbac/in).</li>
            <li style={{ marginBottom: '8px' }}>Deteriorări mecanice cauzate de utilizarea necorespunzătoare (tăieturi, zgârieturi cauzate de obiecte ascuțite, sărituri pe șezut).</li>
            <li style={{ marginBottom: '8px' }}>Pete, arsuri sau decolorări cauzate de expunerea prelungită la raze solare directe sau surse de căldură extremă.</li>
            <li style={{ marginBottom: '8px' }}>Deteriorări rezultate din utilizarea unor produse de curățare neadecvate, abrazive sau pe bază de solvenți chimici.</li>
            <li style={{ marginBottom: '8px' }}>Umezeală excesivă sau inundații care afectează structura lemnoasă.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>4. Modul de Solicitare a Garanției</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Pentru a solicita service în baza garanției, vă rugăm să trimiteți o notificare scrisă la adresa de e-mail <a href="mailto:info@trustera.md" style={{ color: 'var(--accent)', fontWeight: '600' }}>info@trustera.md</a> sau să ne contactați la numărul de telefon din showroom. Solicitarea dumneavoastră trebuie să conțină: o descriere scurtă a problemei, o copie a bonului/facturii sau a contractului de comandă și 2-3 fotografii clare din care să reiasă defectul reclamat.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>5. Remedierea Defectelor</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Echipa noastră va evalua solicitarea și vă va contacta în termen de maxim 5 zile lucrătoare. În funcție de natura defectului, remedierea se va face prin: repararea elementului defect în atelierul nostru (gratuit, inclusiv transportul), înlocuirea piesei neconforme, sau înlocuirea integrală a produsului dacă reparația nu este posibilă structural.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>6. Sfaturi de Întreținere pentru Protejarea Garanției</h2>
          <p style={{ margin: '0', color: 'var(--text-secondary)' }}>
            Pentru a menține valabilitatea garanției și a prelungi durata de viață a produselor, vă recomandăm: curățarea periodică a stofelor prin aspirare ușoară la putere mică, utilizarea exclusivă a lavetelor moi din microfibră și a apei călduțe cu săpun neutru pentru pete minore, strângerea periodică a șuruburilor de fixare ale picioarelor (la mese și scaune) și protejarea suprafețelor din lemn masiv de lichide fierbinți prin utilizarea de suporturi speciale.
          </p>

        </div>

      </section>

      {/* RESPONSIVE OVERRIDES */}
      <style>{`
        @media (max-width: 600px) {
          .policy-container {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
