import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  home: {
    heroTag: "Colecția 2026",
    heroTitle: "Design, Rafinament și Confort Absolut",
    heroSub: "Mobilier premium creat la comandă din cele mai fine materiale, conceput pentru a adăuga valoare și caracter casei tale.",
    categoriesSectionTitle: "Colecții",
    categoriesSectionHeading: "Descoperă Modele Noi",
    featuredSectionTitle: "Cele mai dorite",
    featuredSectionHeading: "Piese de Referință",
    qualitySectionTitle: "Angajamentul Nostru",
    qualitySectionHeading: "De ce să alegi Trustera?",
    qualityItem1Title: "Materiale Premium",
    qualityItem1Desc: "Selectăm cu strictețe furnizorii de lemn și stofe.",
    qualityItem2Title: "Lucrat Manual",
    qualityItem2Desc: "Atenție la fiecare cusătură și detaliu de asamblare.",
    qualityItem3Title: "Garanție 5 Ani",
    qualityItem3Desc: "Calitate certificată și durabilitate în timp.",
    ctaTitle: "Transformă-ți Viziunea în Realitate",
    ctaDesc: "Ai un proiect de design interior sau cauți o piesă unică? Echipa noastră te poate ajuta cu soluții personalizate.",
    ctaButton: "Programează o Consultanță"
  },
  about: {
    heroTag: "Despre Noi",
    heroTitle: "Măiestrie și Pasiune pentru Lemn",
    heroDesc: "Suntem mai mult decât un producător de mobilier. Suntem creatori de atmosfere, aducând confortul și estetica la superlativ în casa ta.",
    storyTitle: "Povestea Trustera",
    storyParagraph1: "A luat naștere din dorința de a oferi pieței din Moldova mobilier de o calitate ireproșabilă, comparabilă cu marile branduri internaționale, dar produs local.",
    storyParagraph2: "Fiecare piesă de mobilier este o dovadă a respectului nostru pentru materialele naturale și pentru confortul clienților noștri. Folosim esențe nobile de lemn, catifele premium tratate împotriva petelor și sisteme de amortizare de ultimă generație.",
    stats1Value: "10+",
    stats1Label: "Ani Experiență",
    stats2Value: "2500+",
    stats2Label: "Clienți Fericiți",
    stats3Value: "100%",
    stats3Label: "Personalizabil",
    missionTitle: "Misiunea Noastră",
    missionDesc: "Ne propunem să creăm piese care nu doar decorează un spațiu, ci îl transformă într-un 'acasă' autentic. Credem că mobilierul trebuie să reziste testului timpului, atât din punct de vedere al durabilității, cât și al designului."
  }
};

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('trustera_cms_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge to ensure no missing keys if we add new ones to defaultContent
        return {
          ...defaultContent,
          home: { ...defaultContent.home, ...(parsed.home || {}) },
          about: { ...defaultContent.about, ...(parsed.about || {}) }
        };
      } catch (e) {
        console.error("Error parsing CMS content from localStorage", e);
      }
    }
    return defaultContent;
  });

  // Expose defaultContent for the admin panel to know all valid keys
  const [schema] = useState(defaultContent);

  useEffect(() => {
    localStorage.setItem('trustera_cms_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (page, key, value) => {
    setContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [key]: value
      }
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, schema }}>
      {children}
    </ContentContext.Provider>
  );
};
