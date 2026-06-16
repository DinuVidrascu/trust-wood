import React, { useEffect } from 'react';

export default function DeliveryGuide() {
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
            <span className="section-title">Ghid Util</span>
            <h1 className="section-heading title-serif">Livrare & Montaj</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '15px' }}>
            Ne asigurăm că produsele noastre premium ajung la dumneavoastră în deplină siguranță și sunt asamblate cu maximă atenție de către meșteșugari experți.
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
          
          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>1. Serviciul de Livrare Premium</h2>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
            Toate produsele Trustera sunt ambalate cu materiale de protecție de înaltă densitate pentru a preveni orice daune în timpul tranzitului. Oferim două tipuri de livrare pe teritoriul Republicii Moldova:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Livrare Standard:</strong> Până în fața blocului sau a casei (se realizează în termenele stabilite la comandă).</li>
            <li style={{ marginBottom: '8px' }}><strong>Livrare Door-to-Door cu Manipulare:</strong> Echipa noastră transportă produsele până în interiorul locuinței dumneavoastră, indiferent de etaj (necesită specificare în prealabil).</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>2. Serviciul de Montaj Profesional</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Pentru a garanta stabilitatea structurală și durabilitatea în timp a mobilierului din lemn masiv și a canapelelor noastre modulare, recomandăm utilizarea serviciului nostru de montaj profesional. Echipa noastră de specialiști deține instrumentele adecvate și cunoștințele tehnice pentru a asambla fiecare element conform standardelor de calitate ale fabricii Trustera.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>3. Pregătirea Spațiului de Acces</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Înainte de sosirea echipei de livrare și montaj, vă rugăm să vă asigurați că spațiul este pregătit corespunzător:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Măsurați lățimea și înălțimea ușilor de la intrare, ale holurilor, ale liftului și ale scărilor pentru a vă asigura că pachetele voluminoase (în special cadrele de pat și canapelele mari) pot fi transportate cu ușurință.</li>
            <li style={{ marginBottom: '8px' }}>Eliberați calea de acces de obiecte fragile, decorațiuni sau obstacole care ar putea fi deteriorate accidental.</li>
            <li style={{ marginBottom: '8px' }}>Asigurați un spațiu curat și liber în camera unde urmează să fie montat mobilierul pentru a permite asamblarea în siguranță.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>4. Recepția Produselor</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            La livrare, este obligatoriu să inspectați vizual integritatea ambalajelor și a produselor în prezența echipei noastre de transport. Orice neconformitate (zgârieturi, defecte de tapițerie sau elemente lipsă) trebuie semnalată imediat pe documentul de recepție (avizul de însoțire). Reclamațiile ulterioare privind defecte estetice evidente vizual nu vor fi luate în considerare.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>5. Tarife Standard de Transport & Montaj</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Costurile serviciilor noastre sunt transparente și calculate în funcție de distanță și volumul produselor:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', fontWeight: '700' }}>
                <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Serviciu</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Chișinău</th>
                <th style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>Alte localități (MD)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 8px' }}><strong>Livrare Canapele & Mese</strong></td>
                <td style={{ padding: '12px 8px' }}>Gratuit (pentru comenzi &gt; 15,000 MDL)</td>
                <td style={{ padding: '12px 8px' }}>Calculat per km (de la Chișinău)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 8px' }}><strong>Urcat pe scări (fără lift)</strong></td>
                <td style={{ padding: '12px 8px' }}>30 MDL / etaj per colet voluminos</td>
                <td style={{ padding: '12px 8px' }}>30 MDL / etaj per colet voluminos</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 8px' }}><strong>Montaj Canapea Modulară</strong></td>
                <td style={{ padding: '12px 8px' }}>Inclus</td>
                <td style={{ padding: '12px 8px' }}>Inclus</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 8px' }}><strong>Montaj Masă / Scaune</strong></td>
                <td style={{ padding: '12px 8px' }}>150 - 300 MDL (în funcție de model)</td>
                <td style={{ padding: '12px 8px' }}>Agreat la contractare</td>
              </tr>
            </tbody>
          </table>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>6. Recomandări de Întreținere după Montare</h2>
          <p style={{ margin: '0', color: 'var(--text-secondary)' }}>
            După finalizarea montajului, recomandăm să evitați expunerea directă a mobilierului din lemn masiv la surse de căldură directă (calorifere, șeminee) sau la raze solare intense. Pentru canapelele din catifea sau bouclé, periați ușor fibrele după montaj pentru a ridica firele presate în timpul transportului și ambalării.
          </p>

        </div>

      </section>

      {/* RESPONSIVE OVERRIDES */}
      <style>{`
        @media (max-width: 600px) {
          .policy-container {
            padding: 24px 20px !important;
          }
          table {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
