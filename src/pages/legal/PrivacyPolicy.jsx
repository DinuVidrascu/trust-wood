import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
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
            <span className="section-title">Confidențialitate & Încredere</span>
            <h1 className="section-heading title-serif">Politica de Confidențialitate</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '15px' }}>
            Protejarea datelor dumneavoastră cu caracter personal este o prioritate pentru noi. Această politică explică ce date colectăm, cum le prelucrăm și drepturile dumneavoastră.
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
          
          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>1. Informații Generale</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Această Politică de Confidențialitate reglementează modul în care site-ul <strong>trustera.md</strong> (operat de brandul Trustera) colectează, utilizează, păstrează și dezvăluie informațiile colectate de la utilizatorii site-ului.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>2. Datele cu Caracter Personal pe care le Colectăm</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Colectăm informații de identificare personală de la utilizatori în diverse moduri, inclusiv atunci când vizitează site-ul, completează formulare (cum ar fi programarea unei vizite în showroom sau trimiterea unui mesaj de contact).
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Nume complet:</strong> Necesar pentru a vă putea adresa personal și a valida rezervările.</li>
            <li style={{ marginBottom: '8px' }}><strong>Număr de telefon:</strong> Utilizat pentru confirmarea programărilor și contactul prin WhatsApp.</li>
            <li style={{ marginBottom: '8px' }}><strong>Data vizitei:</strong> Pentru planificarea intervalelor orare în showroom.</li>
            <li style={{ marginBottom: '8px' }}><strong>Date tehnice de navigare:</strong> Adresa IP, tipul de browser și paginile vizitate (prin module cookie) pentru statistici anonime.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>3. Scopul Prelucrării Datelor</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Trustera prelucrează datele dumneavoastră în următoarele scopuri:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Pentru a confirma și gestiona rezervările de vizite în showroom.</li>
            <li style={{ marginBottom: '8px' }}>Pentru a răspunde solicitărilor dumneavoastră de suport și oferte personalizate.</li>
            <li style={{ marginBottom: '8px' }}>Pentru a îmbunătăți experiența de navigare pe site-ul nostru.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>4. Securitatea Datelor</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Adoptăm practici adecvate de colectare, stocare și prelucrare a datelor și măsuri de securitate pentru a proteja împotriva accesului neautorizat, modificării, dezvăluirii sau distrugerii informațiilor dumneavoastră personale. Toate transferurile de date sensibile între browser-ul dumneavoastră și site se realizează prin canale securizate criptate SSL.
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>5. Distribuirea Informațiilor Personale</h2>
          <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
            Nu vindem, nu tranzacționăm și nu închiriem informațiile de identificare personală ale utilizatorilor către terți. Putem partaja informații demografice agregate generice, care nu sunt legate de nicio informație de identificare personală, cu partenerii noștri de încredere în scopurile menționate mai sus (analiză trafic).
          </p>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>6. Drepturile Dumneavoastră</h2>
          <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Conform legislației în vigoare privind protecția datelor (inclusiv Regulamentul GDPR unde este aplicabil), beneficiați de următoarele drepturi:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '8px' }}>Dreptul de acces la datele pe care le deținem despre dumneavoastră.</li>
            <li style={{ marginBottom: '8px' }}>Dreptul de rectificare a datelor incorecte sau incomplete.</li>
            <li style={{ marginBottom: '8px' }}>Dreptul de ștergere a datelor („dreptul de a fi uitat”).</li>
            <li style={{ marginBottom: '8px' }}>Dreptul de a vă retrage consimțământul pentru prelucrarea datelor în orice moment.</li>
          </ul>

          <h2 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px' }}>7. Contact</h2>
          <p style={{ margin: '0', color: 'var(--text-secondary)' }}>
            Dacă aveți întrebări referitoare la această Politică de Confidențialitate, practicile acestui site sau relația dumneavoastră cu site-ul nostru, vă rugăm să ne contactați la adresa de e-mail: <a href="mailto:info@trustera.md" style={{ color: 'var(--accent)', fontWeight: '600' }}>info@trustera.md</a>.
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
