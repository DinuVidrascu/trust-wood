import React, { useState, useEffect } from 'react';

// Materials and Fabrics Database
const materialsData = [
  {
    id: 'catifea-premium',
    name: 'Catifea Premium (Velvet)',
    category: 'fabrics',
    shortDesc: 'O textură extrem de moale și elegantă, cu o rezistență remarcabilă la uzură și tratament hidrofob.',
    longDesc: 'Catifeaua noastră premium este alegerea ideală pentru un living sofisticat. Datorită tehnologiei Easy Clean, lichidele rămân la suprafață sub formă de picături, oferindu-vă timp să le ștergeți cu o lavetă uscată. Stofa este catifelată la atingere, are un reflex discret în lumină și oferă un confort termic sporit.',
    imgSrc: '/img/textures/texture_emerald_velvet.webp', // Premium macro texture
    specs: {
      'Compoziție': '100% Poliester de înaltă densitate',
      'Rezistență (Martindale)': '100.000 cicluri (Uzură intensă/comercială)',
      'Greutate': '450 g/m²',
      'Tratament special': 'Hidrofob (Easy Clean), Pet-friendly',
      'Întreținere': 'Aspirare periodică la putere mică; curățare cu lavetă din microfibră umedă și săpun neutru.'
    },
    colors: [
      { name: 'Bej Cald', code: '#D9C3B0' },
      { name: 'Verde Emerald', code: '#1C3F35' },
      { name: 'Gri Cărbune', code: '#2E2D2C' },
      { name: 'Albastru Midnight', code: '#1C2938' },
      { name: 'Burgundy', code: '#6B1E2E' },
      { name: 'Dusty Mauve', code: '#9B7B8C' }
    ],
    recommendedFor: 'Canapele modulare (Deseda), Fotolii de design (Bliss), Scaune tapițate (Nova, Luxe).'
  },
  {
    id: 'boucle-confort',
    name: 'Bouclé Confort',
    category: 'fabrics',
    shortDesc: 'O stofă texturată premium, realizată din bucle neregulate care creează un aspect tridimensional extrem de călduros.',
    longDesc: 'Stofa Bouclé definește estetica organică contemporană. Cu textura sa bogată și moale, aduce adâncime vizuală oricărei piese de mobilier. Este o stofă rezistentă, care nu se șifonează și își păstrează forma în timp, fiind extrem de apreciată în designul de interior minimalist.',
    imgSrc: '/img/textures/texture_beige_boucle.webp',
    specs: {
      'Compoziție': '90% Poliester, 10% Acril',
      'Rezistență (Martindale)': '50.000 cicluri (Uzură casnică intensă)',
      'Greutate': '520 g/m²',
      'Tratament special': 'Rezistență sporită la scămoșare',
      'Întreținere': 'Se recomandă aspirarea ușoară și curățarea uscată (dry cleaning) sau spumă specială pentru tapițerii.'
    },
    colors: [
      { name: 'Alb Fildeș (Ivory)', code: '#EAE6DF' },
      { name: 'Bej Nisip', code: '#D0C7B9' },
      { name: 'Gri Soft', code: '#B8B5B0' }
    ],
    recommendedFor: 'Fotolii organice (Bliss), Canapele moderne curbe, Perne decorative.'
  },
  {
    id: 'in-natural',
    name: 'In Natural (Linen Mix)',
    category: 'fabrics',
    shortDesc: 'Un amestec organic de in și bumbac, oferind o respirabilitate excelentă și un aspect lejer, natural.',
    longDesc: 'Amestecul nostru de in oferă textura rustic-elegantă a fibrelor naturale, dar cu durabilitatea sporită adusă de poliester. Este o stofă extrem de plăcută în sezoanele calde datorită ventilației naturale excelente și este complet hipoalergenică, potrivită pentru persoanele cu piele sensibilă.',
    imgSrc: '/img/textures/texture_beige_velvet.webp',
    specs: {
      'Compoziție': '40% In, 30% Bumbac, 30% Poliester',
      'Rezistență (Martindale)': '35.000 cicluri (Uzură casnică medie)',
      'Greutate': '380 g/m²',
      'Tratament special': 'Hipoalergenic, respirabilitate ridicată',
      'Întreținere': 'Curățare profesională ecologică sau spălare manuală la temperaturi joase pentru husele detașabile.'
    },
    colors: [
      { name: 'In Natural', code: '#C4B9A7' },
      { name: 'Gri Pietros', code: '#9E9A92' },
      { name: 'Alb Crem', code: '#F5F2EC' }
    ],
    recommendedFor: 'Canapele de vară, fotolii de relaxare, perne de șezut.'
  },
  {
    id: 'stofa-petfriendly',
    name: 'Stofă Flatweave (Pet-Friendly)',
    category: 'fabrics',
    shortDesc: 'Stofă cu țesătură plată și densă, proiectată special pentru a rezista la zgârieturi și pentru o curățare ultra-rapidă a părului de animale.',
    longDesc: 'Dacă aveți animale de companie, această stofă este soluția ideală. Structura sa extrem de strânsă împiedică ghearele pisicilor sau câinilor să agațe firele, iar firele de păr pot fi îndepărtate cu ușurință folosind o simplă rolă adezivă sau o lavetă umedă. Are un tratament de protecție moleculară care previne pătrunderea murdăriei în profunzimea fiebrei.',
    imgSrc: '/img/textures/texture_sage_green.webp',
    specs: {
      'Compoziție': '100% Poliester tratat anti-pată',
      'Rezistență (Martindale)': '80.000 cicluri (Uzură foarte intensă)',
      'Greutate': '410 g/m²',
      'Tratament special': 'Anti-zgârieturi, Anti-aderență păr animale, Easy Clean',
      'Întreținere': 'Îndepărtarea părului cu perie moale sau rolă; petele se curăță doar cu apă călduță.'
    },
    colors: [
      { name: 'Gri Silver', code: '#A9A9A9' },
      { name: 'Bej Nisip', code: '#D2B48C' },
      { name: 'Verde Salvie (Sage)', code: '#7D9E8C' }
    ],
    recommendedFor: 'Scaune de dining, Canapele de familie, Mobilier expus la uzură zilnică mare.'
  },
  {
    id: 'stejar-natural',
    name: 'Stejar Masiv Natural',
    category: 'hard',
    shortDesc: 'Lemn masiv de stejar selecționat, finisat cu lac mat ecologic pentru a păstra textura și culoarea caldă naturală.',
    longDesc: 'Stejarul nostru provine exclusiv din surse sustenabile certificate FSC. Fiecare blat de masă este o piesă unică datorită desenului natural al fibrelor, nodurilor mici controlate și variațiilor subtile de culoare. Finisajul cu lac poliuretanic mat oferă protecție de lungă durată împotriva petelor de lichide, fără a altera aspectul organic al lemnului brut.',
    imgSrc: '/img/textures/texture_natural_oak.webp',
    specs: {
      'Tip material': 'Lemn masiv de Stejar',
      'Finisaj': 'Lac poliuretanic mat, anti-îngălbenire (2 straturi)',
      'Umiditate lemn': '8-10% (Uscare controlată în cameră tehnică)',
      'Origine': 'Europa de Est (FSC Certified)',
      'Întreținere': 'Ștergere cu lavetă ușor umezită, de-a lungul fibrei; utilizarea de suporturi pentru pahare/farfurii fierbinți.'
    },
    colors: [
      { name: 'Natural Oak', code: '#C4A265' }
    ],
    recommendedFor: 'Blaturi de mese (Rovo), Picioare de susținere scaune și canapele.'
  },
  {
    id: 'stejar-afumat',
    name: 'Stejar Afumat (Smoked Oak)',
    category: 'hard',
    shortDesc: 'Lemn de stejar tratat termic în profunzime, obținând o nuanță profundă de maro-negru dramatic și o stabilitate structurală superioară.',
    longDesc: 'Tratamentul termic (afumarea) modifică structura chimică a lemnului, oferindu-i o culoare închisă spectaculoasă în toată grosimea blatului, nu doar la suprafață. Acest procedeu elimină complet riscul de dilatare sau contractare la schimbările de umiditate din locuință și conferă un aer modern, masculin și extrem de elegant.',
    imgSrc: '/img/textures/texture_smoked_oak.webp',
    specs: {
      'Tip material': 'Lemn masiv de Stejar tratat termic',
      'Finisaj': 'Ulei ceară naturală (hardwax oil) sau lac mat închis',
      'Umiditate lemn': '6-8% (Stabilitate dimensională absolută)',
      'Origine': 'Europa de Est (FSC Certified)',
      'Întreținere': 'Se curăță de praf cu lavetă uscată; se evită soluțiile pe bază de alcool sau solvenți.'
    },
    colors: [
      { name: 'Smoked Black', code: '#2A2520' }
    ],
    recommendedFor: 'Mese dining moderne (Rovo Smoked), Panouri decorative de perete.'
  },
  {
    id: 'nuc-american',
    name: 'Nuc American Premium',
    category: 'hard',
    shortDesc: 'Esență nobilă de nuc cu nuanțe ciocolatii calde, renumită pentru desenul fluid al fibrei și exclusivitatea sa.',
    longDesc: 'Nucul American este una dintre cele mai prețioase esențe utilizate în mobilierul de lux. Lemnul are un luciu natural discret, cu fibre ondulate și tonuri bogate de la maro deschis până la ciocolatiu închis. Finisat exclusiv cu uleiuri organice care pătrund în fibră pentru a evidenția profunzimea culorii și textura catifelată la atingere.',
    imgSrc: '/img/textures/texture_dark_walnut.webp', // Premium macro texture
    specs: {
      'Tip material': 'Lemn masiv de Nuc American',
      'Finisaj': 'Ulei ecologic pe bază de in și ceară de albine',
      'Umiditate lemn': '8-10%',
      'Origine': 'America de Nord (Import sustenabil)',
      'Întreținere': 'Necesită re-uleiere periodică (o dată la 12-18 luni) pentru a-și păstra strălucirea și protecția la lichide.'
    },
    colors: [
      { name: 'American Walnut', code: '#5C4033' }
    ],
    recommendedFor: 'Mese premium personalizate, Console de living, Elemente de accent.'
  },
  {
    id: 'lemn-fag',
    name: 'Lemn de Fag (Cadru Structural)',
    category: 'hard',
    shortDesc: 'Lemn de fag de înaltă densitate, uscat și tratat, utilizat exclusiv în interiorul canapelelor pentru durabilitate structurală maximă.',
    longDesc: 'Deși nu este vizibil la exterior, lemnul de fag este inima mobilierului nostru tapițat. Datorită rezistenței sale extraordinare la încovoiere și compresiune, fagul asigură o structură rigidă care nu va scârțâi și nu se va deforma în timp, garantând că investiția dumneavoastră depășește 15 ani de utilizare zilnică.',
    imgSrc: '/img/textures/texture_white_matt.webp',
    specs: {
      'Tip material': 'Lemn masiv de Fag (densitate mare)',
      'Finisaj': 'Tratat antifungic și insecticid, netencuit (folosit intern)',
      'Îmbinări': 'Capse industriale din oțel strânse hidraulic + adeziv structural D3',
      'Origine': 'Munții Carpați (FSC Certified)',
      'Întreținere': 'Nu necesită întreținere exterioară (protejat complet de husa și spuma HR).'
    },
    colors: [
      { name: 'Fag Natural', code: '#E5C19E' }
    ],
    recommendedFor: 'Structurile interne ale canapelelor Deseda și fotoliilor Bliss.'
  },
  {
    id: 'catifea-burgundy',
    name: 'Catifea Burgundy (Premium)',
    category: 'fabrics',
    shortDesc: 'Nuanță profundă de roșu-burgundy pe o textură catifelată luxoasă, tratată hidrofob.',
    longDesc: 'Această variantă de catifea aduce un accent de pasiune și eleganță regală în orice încăpere. Beneficiază de aceleași proprietăți Easy Clean ca și restul gamei premium, fiind perfectă pentru piese de accent.',
    imgSrc: '/img/textures/texture_burgundy.webp',
    specs: {
      'Compoziție': '100% Poliester de înaltă densitate',
      'Rezistență (Martindale)': '100.000 cicluri',
      'Greutate': '450 g/m²',
      'Tratament special': 'Hidrofob (Easy Clean)',
      'Întreținere': 'Aspirare periodică; curățare cu lavetă umedă.'
    },
    colors: [
      { name: 'Burgundy', code: '#6B1E2E' }
    ],
    recommendedFor: 'Fotolii de accent (Stella, Aura), perne decorative.'
  },
  {
    id: 'catifea-charcoal',
    name: 'Catifea Gri Cărbune (Premium)',
    category: 'fabrics',
    shortDesc: 'O nuanță intensă de gri antracit, extrem de versatilă pentru interioarele moderne și industriale.',
    longDesc: 'Oferind o bază cromatică stabilă, griul cărbune ascunde perfect micile imperfecțiuni zilnice. Este o stofă excelentă pentru familii, menținând aspectul impecabil pe termen lung.',
    imgSrc: '/img/textures/texture_charcoal_velvet.webp',
    specs: {
      'Compoziție': '100% Poliester de înaltă densitate',
      'Rezistență (Martindale)': '100.000 cicluri',
      'Greutate': '450 g/m²',
      'Tratament special': 'Hidrofob, anti-scămoșare',
      'Întreținere': 'Aspirare ușoară, ștergere cu lavetă moale.'
    },
    colors: [
      { name: 'Gri Cărbune', code: '#2E2D2C' }
    ],
    recommendedFor: 'Canapele mari modulare, fotolii lounge.'
  },
  {
    id: 'catifea-midnight',
    name: 'Catifea Albastru Midnight (Premium)',
    category: 'fabrics',
    shortDesc: 'O nuanță de albastru nocturn, adânc și captivant, perfect pentru un design de interior statement.',
    longDesc: 'Inspirată de cerul nopții, această catifea adaugă profunzime și rafinament vizual. Textura sa captează și reflectă lumina în moduri subtile, schimbându-și ușor nuanța pe parcursul zilei.',
    imgSrc: '/img/textures/texture_midnight_blue.webp',
    specs: {
      'Compoziție': '100% Poliester de înaltă densitate',
      'Rezistență (Martindale)': '100.000 cicluri',
      'Greutate': '450 g/m²',
      'Tratament special': 'Hidrofob, rezistent la decolorare UV',
      'Întreținere': 'Evitați expunerea directă la soare prelungită; curățare ecologică.'
    },
    colors: [
      { name: 'Albastru Midnight', code: '#1C2938' }
    ],
    recommendedFor: 'Canapele elegante (Nuvola), scaune de birou sau dining.'
  },
  {
    id: 'piele-neagra',
    name: 'Piele Naturală Neagră',
    category: 'fabrics',
    shortDesc: 'Piele naturală premium, finisată fin pentru a păstra porii vizibili și textura organică autentică.',
    longDesc: 'O alegere clasică și atemporală, pielea noastră neagră este tratată ecologic pentru a-și păstra moliciunea în timp. Pe măsură ce îmbătrânește, capătă o patină nobilă inconfundabilă.',
    imgSrc: '/img/textures/texture_black_leather.webp',
    specs: {
      'Compoziție': '100% Piele naturală bovină',
      'Grosime': '1.2 - 1.4 mm',
      'Finisaj': 'Semi-anilină',
      'Tratament special': 'Rezistentă la pete, pigmenți stabili',
      'Întreținere': 'Se recomandă hidratare cu loțiuni speciale pentru piele o dată pe an.'
    },
    colors: [
      { name: 'Negru Abanos', code: '#1A1A1A' }
    ],
    recommendedFor: 'Fotolii executive, canapele stil Chesterfield sau moderne-minimaliste.'
  },
  {
    id: 'lemn-aura-blue',
    name: 'Finisaj Lemn Albastru (Aura Blue)',
    category: 'hard',
    shortDesc: 'Un finisaj translucid spectaculos care colorează fibra lemnului în albastru, păstrând vizibil desenul natural.',
    longDesc: 'Acest finisaj inovator îmbină estetica organică a lemnului masiv cu un accent cromatic curajos. Procesul implică impregnarea fibrei cu pigmenți ecologici albaștri, oferind o piesă de mobilier unicat, cu personalitate puternică.',
    imgSrc: '/img/textures/aura-blue-texture.webp',
    specs: {
      'Tip material': 'Lemn masiv (Esență tare) vopsit',
      'Finisaj': 'Lac poliuretanic mat peste baiț colorat translucid',
      'Tratament': 'Protecție UV împotriva decolorării',
      'Origine': 'Europa (FSC Certified)',
      'Întreținere': 'Ștergere cu lavetă uscată; se evită substanțele abrazive.'
    },
    colors: [
      { name: 'Aura Blue', code: '#24455E' }
    ],
    recommendedFor: 'Mese de accent, picioare pentru fotolii statement (ex: Aura Blue).'
  }
];

export default function MaterialsCatalog() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'fabrics', 'hard'
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filteredMaterials = materialsData.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <div className="page-entrance subpage" style={{ paddingBottom: '80px', paddingTop: '85px' }}>
      
      {/* HEADER SECTION */}
      <section className="section" style={{ paddingTop: '10px', paddingBottom: '20px' }}>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <div>
            <span className="section-title">Paleta Noastră de Materiale</span>
            <h1 className="section-heading title-serif">Materiale & Stofe Premium</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', fontSize: '15px', lineHeight: '1.6' }}>
            Calitatea unui mobilier de lux pornește de la materia primă. Am selectat cu atenție stofe rezistente, plăcute la atingere și finisaje lemnoase nobile care garantează eleganța și durabilitatea în timp.
          </p>
        </div>

        {/* TABS FILTER */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setActiveTab('all')}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: activeTab === 'all' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeTab === 'all' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'all' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
          >
            Toate Materialele
          </button>
          <button 
            onClick={() => setActiveTab('fabrics')}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: activeTab === 'fabrics' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeTab === 'fabrics' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'fabrics' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
          >
            Stofe & Tapițerie
          </button>
          <button 
            onClick={() => setActiveTab('hard')}
            style={{
              padding: '10px 24px',
              borderRadius: '25px',
              border: activeTab === 'hard' ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeTab === 'hard' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'hard' ? '#FFF' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
          >
            Lemn Masiv & Structuri
          </button>
        </div>

        {/* MATERIALS GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filteredMaterials.map((mat) => (
            <div 
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="material-card"
            >
              {/* Image Preview / Decorative Header */}
              <div style={{
                height: '180px',
                background: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.45)), url(${mat.imgSrc}) center/cover no-repeat`,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '20px',
                position: 'relative'
              }}>
                {/* Category Badge */}
                <span style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'var(--bg)',
                  color: 'var(--accent)',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)'
                }}>
                  {mat.category === 'fabrics' ? 'Stofă' : 'Sursă Solidă'}
                </span>
                
                <h3 className="title-serif" style={{ color: '#FFF', margin: '0', fontSize: '18px', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
                  {mat.name}
                </h3>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px', flexGrow: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                    {mat.shortDesc}
                  </p>
                  
                  {/* Quick specs preview */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '15px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {mat.category === 'fabrics' ? 'Rezistență' : 'Material'}
                      </span>
                      <strong style={{ color: 'var(--text-primary)' }}>
                        {mat.specs['Rezistență (Martindale)'] || mat.specs['Tip material']}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Compoziție / Finisaj</span>
                      <strong style={{ color: 'var(--text-primary)', maxWidth: '180px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mat.specs['Compoziție'] || mat.specs['Finisaj']}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Swatches preview */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {mat.colors.slice(0, 5).map((color, idx) => (
                      <div 
                        key={idx}
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: color.code,
                          border: '1px solid rgba(0,0,0,0.15)'
                        }}
                        title={color.name}
                      />
                    ))}
                    {mat.colors.length > 5 && (
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px' }}>
                        +{mat.colors.length - 5}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>
                    Detalii Complete &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INFO BANNER */}
        <div style={{
          maxWidth: '1200px',
          margin: '60px auto 0 auto',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(229, 193, 158, 0.08) 100%)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '30px',
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 500px' }}>
            <h3 className="title-serif" style={{ fontSize: '20px', color: 'var(--accent)', marginTop: '0', marginBottom: '10px' }}>
              Mostre Gratuite în Showroom
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>
              Culorile și texturile pot varia ușor în funcție de ecranul pe care sunt vizualizate. Vă invităm în showroom-ul nostru din Chișinău pentru a atinge stofe premium, a vedea finisajele de stejar sub lumina naturală și a alege combinația perfectă împreună cu designerii noștri.
            </p>
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <a 
              href="/showroom" 
              style={{
                display: 'inline-block',
                background: 'var(--accent)',
                color: '#FFF',
                textDecoration: 'none',
                padding: '12px 28px',
                borderRadius: '4px',
                fontSize: '13.5px',
                fontWeight: '600',
                transition: 'background 0.3s ease'
              }}
              className="btn-showroom"
            >
              Vizitează Showroom &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL */}
      {selectedMaterial && (
        <div 
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            padding: '20px'
          }}
          onClick={() => setSelectedMaterial(null)}
        >
          <div 
            style={{
              background: 'var(--bg-card)',
              maxWidth: '650px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'modalFadeIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedMaterial(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '10',
                transition: 'background 0.2s ease'
              }}
            >
              &times;
            </button>

            {/* Modal Image Header */}
            <div style={{
              height: '220px',
              background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${selectedMaterial.imgSrc}) center/cover no-repeat`,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '25px'
            }}>
              <div>
                <span style={{
                  background: 'var(--accent)',
                  color: '#FFF',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  display: 'inline-block'
                }}>
                  {selectedMaterial.category === 'fabrics' ? 'Stofă Tapițerie' : 'Lemn & Structură'}
                </span>
                <h2 className="title-serif" style={{ color: '#FFF', margin: '0', fontSize: '24px', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  {selectedMaterial.name}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '25px', maxHeight: '70vh', overflowY: 'auto' }}>
              <h4 style={{ marginTop: '0', marginBottom: '8px', color: 'var(--accent)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Descriere Generală</h4>
              <p style={{ color: 'var(--text-primary)', fontSize: '14.5px', lineHeight: '1.6', marginTop: '0', marginBottom: '20px' }}>
                {selectedMaterial.longDesc}
              </p>

              {/* Color swatches in details */}
              <h4 style={{ marginBottom: '10px', color: 'var(--accent)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {selectedMaterial.category === 'fabrics' ? 'Nuanțe Disponibile în Catalog' : 'Finisaj/Culoare'}
              </h4>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {selectedMaterial.colors.map((color, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: color.code,
                      border: '1px solid rgba(0,0,0,0.2)',
                      boxShadow: 'var(--shadow-sm)'
                    }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{color.name}</span>
                  </div>
                ))}
              </div>

              {/* Specs Table */}
              <h4 style={{ marginBottom: '10px', color: 'var(--accent)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fișă Tehnică</h4>
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginBottom: '24px' }}>
                {Object.entries(selectedMaterial.specs).map(([key, val], idx) => (
                  <div 
                    key={key} 
                    style={{
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '10px 15px',
                      background: idx % 2 === 0 ? 'var(--bg-card)' : 'rgba(0,0,0,0.02)',
                      borderBottom: idx === Object.entries(selectedMaterial.specs).length - 1 ? 'none' : '1px solid var(--border)',
                      fontSize: '13px'
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{key}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600', maxWidth: '320px', textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Pairings */}
              <div style={{ padding: '15px', background: 'rgba(229, 193, 158, 0.08)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Utilizare Recomandată
                </span>
                <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {selectedMaterial.recommendedFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESPONSIVE & ANIMATION STYLES */}
      <style>{`
        .material-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md) !important;
        }
        .btn-showroom:hover {
          background: #d8aa7e !important;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
