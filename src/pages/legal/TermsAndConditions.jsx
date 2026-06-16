import React, { useEffect } from 'react';

export default function TermsAndConditions() {
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
            <span className="section-title">Reguli & Transparență</span>
            <h1 className="section-heading title-serif">Termeni și Condiții</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '15px' }}>
            Vă rugăm să citiți cu atenție acești termeni și condiții înainte de a utiliza site-ul nostru sau de a plasa o comandă de produse personalizate.
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
          
          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>1. Introducere</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Bun venit pe site-ul <strong>trustera.md</strong>. Prin accesarea și utilizarea acestui site, sunteți de acord să respectați și să fiți legat de următorii termeni și condiții de utilizare, care împreună cu politica noastră de confidențialitate guvernează relația Trustera cu dumneavoastră.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>2. Proprietate Intelectuală</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Conținutul acestui site (inclusiv designul, fotografiile produselor, logoul, textele și elementele grafice) reprezintă proprietatea intelectuală exclusivă a Trustera și este protejat de legislația privind drepturile de autor. Reproducerea, distribuirea sau utilizarea comercială a oricărui material de pe site fără acordul nostru scris prealabil este strict interzisă.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>3. Utilizarea Site-ului</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Utilizarea acestui site este permisă numai în scopuri legale și de informare. Este interzisă utilizarea site-ului într-un mod care ar putea deteriora, dezactiva sau suprasolicita infrastructura noastră sau care ar putea interfera cu utilizarea site-ului de către alte persoane.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>4. Comenzi, Prețuri și Plăți</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Toate produsele prezentate pe site au prețurile exprimate în MDL (Lei moldovenești). Datorită naturii personalizabile a mobilierului nostru (alegerea stofelor, dimensiunilor speciale, finisajelor de stejar):
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Prețurile finale pot varia în funcție de materialele și dimensiunile alese prin configurator.</li>
            <li style={{ marginBottom: '8px' }}>Plasarea unei comenzi pe site sau programarea unei vizite reprezintă o solicitare de ofertă și necesită confirmarea ulterioară din partea echipei noastre.</li>
            <li style={{ marginBottom: '8px' }}>Plățile și condițiile de avans pentru producție se vor stabili în detaliu în cadrul contractului semnat la showroom-ul nostru sau online prin designer dedicat.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>5. Livrare și Garanție</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Livrarea produselor se face la adresa specificată de client pe teritoriul Republicii Moldova conform tarifelor și termenilor agreați la semnarea comenzii:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Termen de execuție:</strong> Pentru produsele realizate la comandă, termenul standard este de 15-25 de zile lucrătoare de la plata avansului.</li>
            <li style={{ marginBottom: '8px' }}><strong>Garanție:</strong> Oferim o garanție de 24 de luni pentru structura din lemn masiv și tapițerie, în condiții normale de utilizare casnică.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>6. Limitarea Răspunderii</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Trustera nu va fi responsabilă pentru daune indirecte, accidentale sau speciale ce rezultă din utilizarea sau imposibilitatea de utilizare a site-ului sau a informațiilor prezentate pe acesta. Ne străduim ca toate detaliile tehnice și imaginile să fie cât mai fidele, însă pot exista mici diferențe de nuanță din cauza setărilor ecranului dumneavoastră sau texturii naturale a lemnului.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>7. Modificări ale Termenilor</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment, fără o notificare prealabilă. Utilizarea în continuare a site-ului constituie acordul dumneavoastră cu privire la versiunea actualizată a termenilor.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>8. Contact</h2>
          <p style={{ margin: '0', color: 'var(--text-secondary)' }}>
            Pentru orice nelămuriri sau întrebări legate de acești termeni și condiții, vă rugăm să ne scrieți pe e-mail la adresa: <a href="mailto:info@trustera.md" style={{ color: 'var(--accent)', fontWeight: '600' }}>info@trustera.md</a>.
          </p>

        </div>

      </section>

      {/* RESPONSIVE CSS OVERRIDES */}
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
