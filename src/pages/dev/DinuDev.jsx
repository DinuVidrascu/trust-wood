import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useProducts } from '../../context/ProductsContext';
import { useContent } from '../../context/ContentContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const fieldLabels = {
  heroTag: 'Eticheta scurtă de deasupra titlului principal (sus de tot pe pagină)',
  heroTitle: 'Titlul principal mare al paginii',
  heroSub: 'Subtitlul / Paragraful descriptiv de sub titlul principal',
  categoriesSectionTitle: 'Textul mic de deasupra secțiunii de categorii',
  categoriesSectionHeading: 'Titlul secțiunii de categorii (ex: "Descoperă Modele Noi")',
  featuredSectionTitle: 'Textul mic de deasupra secțiunii de produse recomandate',
  featuredSectionHeading: 'Titlul secțiunii de produse recomandate',
  qualitySectionTitle: 'Textul mic de deasupra secțiunii "De ce să ne alegi?"',
  qualitySectionHeading: 'Titlul secțiunii "De ce să ne alegi?"',
  qualityItem1Title: 'Titlul primului avantaj (ex: "Materiale Premium")',
  qualityItem1Desc: 'Descrierea primului avantaj',
  qualityItem2Title: 'Titlul celui de-al doilea avantaj',
  qualityItem2Desc: 'Descrierea celui de-al doilea avantaj',
  qualityItem3Title: 'Titlul celui de-al treilea avantaj',
  qualityItem3Desc: 'Descrierea celui de-al treilea avantaj',
  ctaTitle: 'Titlul barei de acțiune (cea cu butonul de contact)',
  ctaDesc: 'Descrierea din bara de acțiune',
  ctaButton: 'Textul de pe butonul de contact',
  heroDesc: 'Descrierea scurtă de pe prima secțiune',
  storyTitle: 'Titlul secțiunii Povestea Noastră',
  storyParagraph1: 'Primul paragraf al poveștii',
  storyParagraph2: 'Al doilea paragraf al poveștii',
  stats1Value: 'Valoarea primei statistici (ex: "10+")',
  stats1Label: 'Eticheta primei statistici (ex: "Ani Experiență")',
  stats2Value: 'Valoarea a 2-a statistici (ex: "2500+")',
  stats2Label: 'Eticheta a 2-a statistici (ex: "Clienți")',
  stats3Value: 'Valoarea a 3-a statistici (ex: "100%")',
  stats3Label: 'Eticheta a 3-a statistici (ex: "Garanție")',
  missionTitle: 'Titlul secțiunii "Misiunea Noastră"',
  missionDesc: 'Textul cu misiunea companiei'
};

export default function DinuDev() {
  const { products, categories, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const { content, updateContent, schema } = useContent();
  const [adminMode, setAdminMode] = useState('products');
  const [selectedContentPage, setSelectedContentPage] = useState('home');
  const [draftContent, setDraftContent] = useState(() => {
    return content ? content['home'] : {};
  });

  useEffect(() => {
    if (adminMode === 'content' && content[selectedContentPage]) {
      setDraftContent(content[selectedContentPage]);
    }
  }, [selectedContentPage, adminMode]);

  const handleSaveContent = () => {
    Object.keys(draftContent).forEach(key => {
      updateContent(selectedContentPage, key, draftContent[key]);
    });
    alert('Modificările au fost salvate cu succes și sunt acum vizibile pe site!');
  };

  const handleSaveSingleContent = (key) => {
    updateContent(selectedContentPage, key, draftContent[key]);
    alert(`Textul pentru "${key}" a fost salvat pe site!`);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  // Modal and Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = adaugă, object = editează
  const [activeTab, setActiveTab] = useState('generale'); // 'generale', 'config', 'swatches'

  const initialFormState = {
    name: '',
    type: '',
    category: 'Canapele',
    price: '',
    img: '',
    inStock: true,
    desc: '',
    availableMaterials: '',
    availableColors: '',
    availableSizes: '',
    features: [],
    swatches: [],
    images: '',
    configOptions: { fabrics: [], wood: [], dimensions: [] }
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newFeature, setNewFeature] = useState('');
  

  const [newConfig, setNewConfig] = useState({
    type: 'fabrics',
    name: '',
    desc: '',
    cost: ''
  });

  const handleAddConfig = () => {
    if (!newConfig.name) return;
    setFormData(prev => {
      const currentOpts = prev.configOptions || { fabrics: [], wood: [], dimensions: [] };
      return {
        ...prev,
        configOptions: {
          ...currentOpts,
          [newConfig.type]: [
            ...(currentOpts[newConfig.type] || []),
            { 
              name: newConfig.name, 
              desc: newConfig.desc, 
              cost: parseInt(newConfig.cost) || 0 
            }
          ]
        }
      };
    });
    setNewConfig(prev => ({ ...prev, name: '', desc: '', cost: '' }));
  };

  const handleRemoveConfig = (type, idx) => {
    setFormData(prev => {
      const newConfigOptions = { ...prev.configOptions };
      newConfigOptions[type] = newConfigOptions[type].filter((_, i) => i !== idx);
      return { ...prev, configOptions: newConfigOptions };
    });
  };

  const handleEditConfig = (type, idx) => {
    const itemToEdit = formData.configOptions[type][idx];
    setNewConfig({
      type: type,
      name: itemToEdit.name,
      cost: itemToEdit.cost,
      desc: itemToEdit.desc || ''
    });
    handleRemoveConfig(type, idx);
  };

  // New Swatch local state
  const [newSwatch, setNewSwatch] = useState({
    name: '',
    code: '#9e7e59',
    productId: '',
    textureImg: '',
    textureDesc: ''
  });

  // Auto-save draft for new product
  useEffect(() => {
    if (isModalOpen && !editingProduct) {
      localStorage.setItem('dinu_dev_draft_product', JSON.stringify(formData));
    }
  }, [formData, isModalOpen, editingProduct]);

  // Stats calculation
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const avgPrice = totalProducts > 0 
    ? Math.round(products.reduce((acc, p) => acc + parseInt(p.price.toString().replace(/\s/g, '') || 0), 0) / totalProducts)
    : 0;

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toString() === searchQuery;
    const matchesCategory = selectedCategory === 'Toate' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    
    const draft = localStorage.getItem('dinu_dev_draft_product');
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
      } catch (e) {
        setFormData(initialFormState);
      }
    } else {
      setFormData(initialFormState);
    }

    setNewFeature('');
    setActiveTab('generale');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      type: product.type || '',
      category: product.category || 'Canapele',
      price: product.price || '',
      img: product.img || '',
      inStock: product.inStock !== undefined ? product.inStock : true,
      desc: product.desc || '',
      availableMaterials: (product.availableMaterials || []).join(', '),
      availableColors: (product.availableColors || []).join(', '),
      availableSizes: (product.availableSizes || []).join(', '),
      features: product.features || [],
      swatches: product.swatches || [],
      images: (product.images || []).filter(img => img !== product.img).join(', '),
      configOptions: product.configOptions || { fabrics: [], wood: [], dimensions: [] }
    });
    setNewFeature('');
    setActiveTab('generale');
    setIsModalOpen(true);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  const handleAddSwatch = () => {
    if (!newSwatch.name || !newSwatch.code) {
      alert('Te rugăm să completezi denumirea și codul de culoare HEX.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      swatches: [...prev.swatches, { ...newSwatch }]
    }));
    setNewSwatch({
      type: 'fabric',
      name: '',
      code: '#9e7e59',
      productId: '',
      textureImg: '',
      textureDesc: ''
    });
  };

  const handleRemoveSwatch = (idx) => {
    setFormData(prev => ({
      ...prev,
      swatches: prev.swatches.filter((_, i) => i !== idx)
    }));
  };

  const handleEditSwatch = (idx) => {
    const itemToEdit = formData.swatches[idx];
    setNewSwatch({ ...itemToEdit });
    handleRemoveSwatch(idx);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.img) {
      alert('Te rugăm să completezi câmpurile obligatorii: Nume, Preț și Imagine Principală.');
      return;
    }

    // Standardize price representation with spaces (e.g. "18 900")
    const numericPrice = formData.price.toString().replace(/\s/g, '');
    const formattedPrice = numericPrice.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

    const parsedProduct = {
      name: formData.name,
      type: formData.type || 'Mobilier',
      category: formData.category,
      price: formattedPrice,
      img: formData.img,
      inStock: formData.inStock,
      desc: formData.desc || '',
      availableMaterials: formData.availableMaterials
        ? formData.availableMaterials.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      availableColors: formData.availableColors
        ? formData.availableColors.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      availableSizes: formData.availableSizes
        ? formData.availableSizes.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      features: formData.features,
      swatches: formData.swatches.map(sw => ({
        ...sw,
        productId: sw.productId !== undefined && sw.productId !== '' ? parseInt(sw.productId) : undefined
      })),
      images: [...new Set([
        formData.img, 
        ...(formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [])
      ])],
      configOptions: formData.configOptions || { fabrics: [], wood: [], dimensions: [] }
    };

    const targetId = editingProduct ? editingProduct.id : (products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1);

    if (editingProduct) {
      updateProduct(editingProduct.id, parsedProduct);
    } else {
      addProduct(parsedProduct);
      localStorage.removeItem('dinu_dev_draft_product');
    }

    // Auto cross-link swatches for two-way binding
    const selfSwatch = parsedProduct.swatches.find(s => !s.productId || s.productId === targetId);
    
    parsedProduct.swatches.forEach(sw => {
      if (sw.productId && sw.productId !== targetId) {
        const linkedProduct = products.find(p => p.id === sw.productId);
        if (linkedProduct) {
          const hasBackLink = (linkedProduct.swatches || []).some(s => s.productId === targetId);
          if (!hasBackLink) {
            const backSwatch = selfSwatch ? {
              type: selfSwatch.type,
              name: selfSwatch.name,
              code: selfSwatch.code,
              productId: targetId,
              textureImg: selfSwatch.textureImg,
              textureDesc: selfSwatch.textureDesc
            } : {
              type: 'fabric',
              name: parsedProduct.name.includes('(') ? parsedProduct.name.replace(/.*\((.*)\).*/, '$1').trim() : parsedProduct.name,
              code: '#cccccc',
              productId: targetId,
              textureImg: parsedProduct.images[0] || parsedProduct.img,
              textureDesc: ''
            };
            
            updateProduct(linkedProduct.id, {
              swatches: [...(linkedProduct.swatches || []), backSwatch]
            });
          }
        }
      }
    });

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleResetData = () => {
    if (window.confirm('Sigur dorești să resetezi toate produsele la starea inițială? Această acțiune va șterge toate modificările tale.')) {
      resetToDefault();
      alert('Datele au fost resetate la starea inițială.');
    }
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("Atenție: Imaginea este prea mare (>800KB). Salvarea în baza de date locală (localStorage) ca Base64 poate atinge limita browserului. Vă recomandăm imagini comprimate (ex. WebP).");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'img') {
          setFormData({ ...formData, img: reader.result });
        } else if (field === 'images') {
          const currentImages = formData.images ? formData.images.split(',').map(i => i.trim()).filter(i => i) : [];
          currentImages.push(reader.result);
          setFormData({ ...formData, images: currentImages.join(', ') });
        } else if (field === 'textureImg') {
          setNewSwatch({ ...newSwatch, textureImg: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="page-entrance subpage" style={{ padding: '120px 20px 40px 20px', minHeight: '90vh', backgroundColor: '#faf9f6' }}>
      <style>{`
        .dev-container {
          max-width: 1200px;
          margin: 0 auto;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dev-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #e5e2db;
          padding-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }
        .dev-title {
          font-size: 28px;
          font-weight: 700;
          color: #2b2927;
        }
        .dev-badge {
          background-color: #9e7e59;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: white;
          border: 1px solid #e5e2db;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .stat-label {
          font-size: 13px;
          color: #7b7875;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #2b2927;
        }
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        .search-input {
          padding: 10px 16px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          width: 300px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: #9e7e59;
        }
        .select-filter {
          padding: 10px 16px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          outline: none;
        }
        .btn-add {
          background: #2b2927;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        .btn-add:hover {
          background: #45423f;
        }
        .btn-reset {
          background: #fff5f5;
          color: #e53e3e;
          border: 1px solid #fed7d7;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .btn-reset:hover {
          background: #ffebeb;
        }
        .products-table-container {
          background: white;
          border: 1px solid #e5e2db;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.01);
          margin-bottom: 40px;
        }
        .products-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }
        .products-table th {
          background-color: #f5f2eb;
          color: #5b5855;
          font-weight: 600;
          padding: 14px 20px;
          border-bottom: 1px solid #e5e2db;
        }
        .products-table td {
          padding: 14px 20px;
          border-bottom: 1px solid #f0ede6;
          color: #2b2927;
          vertical-align: middle;
        }
        .products-table tr:last-child td {
          border-bottom: none;
        }
        .product-img-mini {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          object-fit: cover;
          background-color: #f5f2eb;
          border: 1px solid #e5e2db;
        }
        .action-btns {
          display: flex;
          gap: 8px;
        }
        .btn-action {
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .btn-edit {
          background: #f5f2eb;
          color: #2b2927;
          border-color: #dcd9d0;
        }
        .btn-edit:hover {
          background: #9e7e59;
          color: white;
          border-color: #9e7e59;
        }
        .btn-delete {
          background: #fff5f5;
          color: #e53e3e;
          border-color: #fed7d7;
        }
        .btn-delete:hover {
          background: #e53e3e;
          color: white;
          border-color: #e53e3e;
        }
        .status-pill {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
        }
        .status-instock {
          background-color: #f0fdf4;
          color: #166534;
        }
        .status-out {
          background-color: #fef2f2;
          color: #991b1b;
        }

        /* Modal styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 20px;
        }
        .modal-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e2db;
          width: 100%;
          max-width: 750px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e2db;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #2b2927;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #7b7875;
        }
        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex-grow: 1;
        }
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e5e2db;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background-color: #faf9f6;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }
        .tab-nav {
          display: flex;
          border-bottom: 1px solid #e5e2db;
          margin-bottom: 24px;
          gap: 15px;
        }
        .tab-button {
          background: none;
          border: none;
          padding: 8px 4px 12px 4px;
          font-size: 14px;
          font-weight: 600;
          color: #7b7875;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .tab-button.active {
          color: #9e7e59;
          border-bottom-color: #9e7e59;
        }
        .form-group {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          gap: 6px;
        }
        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: #5b5855;
        }
        .form-input-text {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          background-color: #fff;
        }
        .form-input-text:focus {
          border-color: #9e7e59;
        }
        .form-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #dcd9d0;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          min-height: 80px;
          resize: vertical;
          font-family: inherit;
        }
        .form-textarea:focus {
          border-color: #9e7e59;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #2b2927;
          user-select: none;
          margin-top: 10px;
        }
        .checkbox-container input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        /* Swatches items list in form */
        .form-list-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #e5e2db;
          padding: 10px;
          border-radius: 6px;
          background: #faf9f6;
        }
        .form-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: white;
          border: 1px solid #e5e2db;
          border-radius: 4px;
          font-size: 13px;
        }
        .btn-remove-item {
          background: none;
          border: none;
          color: #e53e3e;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }
        .swatch-color-preview {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.15);
          display: inline-block;
          vertical-align: middle;
          margin-right: 8px;
        }
      `}</style>

      <div className="dev-container">
        
        {/* HEADER */}

        <div className="dev-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 className="dev-title">Panou de Administrare</h1>
            <span className="dev-badge">Secret</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className={`btn-outline ${adminMode === 'products' ? 'active' : ''}`} onClick={() => setAdminMode('products')} style={{ borderColor: adminMode === 'products' ? 'var(--accent)' : '', backgroundColor: adminMode === 'products' ? 'var(--accent)' : '', color: adminMode === 'products' ? '#fff' : ''}}>Catalog Produse</button>
            <button className={`btn-outline ${adminMode === 'content' ? 'active' : ''}`} onClick={() => setAdminMode('content')} style={{ borderColor: adminMode === 'content' ? 'var(--accent)' : '', backgroundColor: adminMode === 'content' ? 'var(--accent)' : '', color: adminMode === 'content' ? '#fff' : ''}}>Editare Texte Site</button>
            <button className="btn-outline" onClick={handleResetData} style={{ borderColor: '#e53935', color: '#e53935' }}>Resetare Fabrică</button>
          </div>
        </div>

        {adminMode === 'content' ? (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {Object.keys(schema).map(page => (
                <button 
                  key={page}
                  className="btn-outline"
                  onClick={() => setSelectedContentPage(page)}
                  style={{ textTransform: 'capitalize', borderColor: selectedContentPage === page ? 'var(--text-primary)' : '', backgroundColor: selectedContentPage === page ? 'var(--text-primary)' : '', color: selectedContentPage === page ? '#fff' : '' }}
                >
                  Pagina {page}
                </button>
              ))}
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', border: '1px solid #e5e2db' }}>
              <h2 className="title-serif" style={{ fontSize: '24px', marginBottom: '20px', textTransform: 'capitalize' }}>Editare Texte: {selectedContentPage}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {Object.keys(schema[selectedContentPage]).map(key => (
                  <div key={key} className="form-group" style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '8px', background: '#fafafa' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <label className="form-label" style={{ fontWeight: '600', color: 'var(--accent)', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', display: 'block' }}>
                        {fieldLabels[key] || key}
                      </label>
                      <span style={{ fontSize: '12px', color: '#888', fontFamily: 'monospace' }}>Cheie sistem: {key}</span>
                    </div>
                    <ReactQuill 
                      theme="snow"
                      value={draftContent[key] || ''}
                      onChange={(val) => setDraftContent(prev => ({ ...prev, [key]: val }))}
                      style={{ background: 'white' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button onClick={() => handleSaveSingleContent(key)} className="btn-outline" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>Confirmă Salvarea</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleSaveContent} className="btn-premium" style={{ width: '100%', marginTop: '20px', fontSize: '16px', padding: '15px' }}>Salvează Modificările</button>
            </div>
          </div>
        ) : (
          <>


        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Produse</div>
            <div className="stat-value">{totalProducts}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Categorii</div>
            <div className="stat-value">{totalCategories}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">În Stoc</div>
            <div className="stat-value">{inStockCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Preț Mediu</div>
            <div className="stat-value">{avgPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL</div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="controls-row">
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="Caută după nume sau ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            
            <select 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              className="select-filter"
            >
              <option value="Toate">Toate Categoriile</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button className="btn-add" onClick={openAddModal}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>Adaugă Produs</span>
          </button>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th style={{ width: '80px' }}>Imagine</th>
                <th>Denumire Produs</th>
                <th>Categorie</th>
                <th>Preț (MDL)</th>
                <th>Stoc</th>
                <th style={{ width: '180px', textAlign: 'center' }}>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td style={{ fontWeight: '600', color: '#7b7875' }}>#{product.id}</td>
                  <td>
                    <img loading="lazy" 
                      src={product.img} 
                      alt={product.name} 
                      className="product-img-mini"
                    />
                  </td>
                  <td>
                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                    <div style={{ fontSize: '12px', color: '#7b7875' }}>{product.type}</div>
                  </td>
                  <td>{product.category}</td>
                  <td style={{ fontWeight: '600' }}>{product.price} MDL</td>
                  <td>
                    <span className={`status-pill ${product.inStock ? 'status-instock' : 'status-out'}`}>
                      {product.inStock ? 'În Stoc' : 'Indisponibil'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'center' }}>
                      <button 
                        className="btn-action btn-edit"
                        onClick={() => openEditModal(product)}
                      >
                        Editează
                      </button>
                      <button 
                        className="btn-action btn-delete"
                        onClick={() => {
                          if (confirm(`Sigur dorești să ștergi produsul ${product.name}?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                      >
                        Șterge
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#7b7875' }}>
                    Niciun produs nu corespunde criteriilor de căutare.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        </>
      )}
      </div>

      {/* CREATE & EDIT MODAL */}
      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2 className="modal-title">{editingProduct ? `Editează Produsul #${editingProduct.id}` : 'Adaugă Produs Nou'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              {/* TAB NAVIGATION */}
              <div className="tab-nav">
                <button 
                  type="button" 
                  className={`tab-button ${activeTab === 'generale' ? 'active' : ''}`}
                  onClick={() => setActiveTab('generale')}
                >
                  Date Generale
                </button>
                <button 
                  type="button" 
                  className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
                  onClick={() => setActiveTab('config')}
                >
                  Configurație & Opționale
                </button>
                <button 
                  type="button" 
                  className={`tab-button ${activeTab === 'swatches' ? 'active' : ''}`}
                  onClick={() => setActiveTab('swatches')}
                >
                  Swatches & Texturi
                </button>
              </div>

              {/* TAB CONTENT - GENERALE */}
              {activeTab === 'generale' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Denumire Produs *</label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: Aura, Deseda"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tip Produs (Subtitlu)</label>
                      <input 
                        type="text" 
                        value={formData.type} 
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: Canapea modulară, Scaun Dining"
                      />
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label className="form-label">Categorie *</label>
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="select-filter"
                        style={{ height: '41px' }}
                      >
                        <option value="Canapele">Canapele</option>
                        <option value="Scaune">Scaune</option>
                        <option value="Fotolii">Fotolii</option>
                        <option value="Mese">Mese</option>
                        <option value="Pufuri">Pufuri</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preț de Bază (MDL) *</label>
                      <input 
                        type="text" 
                        value={formData.price} 
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: 18900"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={formData.inStock} 
                          onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                        />
                        <span>În Stoc / Livrare Rapidă</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Imagine Principală (URL sau Path) *</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={formData.img} 
                        onChange={e => setFormData({ ...formData, img: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: /img/sofa_green.webp"
                        required
                        style={{ flexGrow: 1 }}
                      />
                      <label style={{ 
                        background: '#e0d8cc', 
                        padding: '0 15px', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#333'
                      }} title="Încarcă imagine locală (se salvează ca Base64)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'img')} />
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Imagini Galerie Adiționale (Separate prin virgulă)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={formData.images} 
                        onChange={e => setFormData({ ...formData, images: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: /img/sofa_back.webp, /img/sofa_side.webp"
                        style={{ flexGrow: 1 }}
                      />
                      <label style={{ 
                        background: '#e0d8cc', 
                        padding: '0 15px', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#333'
                      }} title="Încarcă imagine locală (se salvează ca Base64)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'images')} />
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Descriere Produs</label>
                    <textarea 
                      value={formData.desc} 
                      onChange={e => setFormData({ ...formData, desc: e.target.value })}
                      className="form-textarea"
                      placeholder="Descrierea completă a produsului..."
                    />
                  </div>
                </div>
              )}

              
              {/* TAB CONTENT - CONFIGURATIE */}
              {activeTab === 'config' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  
                  {/* DYNAMIC CONFIG MANAGER */}
                  <div style={{ border: '1px solid #e5e2db', padding: '16px', borderRadius: '8px', backgroundColor: '#faf9f6', marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: '#2b2927' }}>Configurator Opțiuni Dinamice</h4>
                    <p style={{ fontSize: '12px', color: '#7b7875', marginBottom: '16px' }}>Adaugă materiale, culori de lemn sau dimensiuni cu prețuri specifice.</p>
                    
                    <div className="form-grid-3" style={{ marginBottom: '10px' }}>
                      <div className="form-group">
                        <label className="form-label">Tip Opțiune</label>
                        <select 
                          className="form-input-text" 
                          value={newConfig.type}
                          onChange={e => setNewConfig({...newConfig, type: e.target.value})}
                        >
                          <option value="fabrics">Material (Stofă/Catifea)</option>
                          <option value="wood">Picioare / Lemn</option>
                          <option value="dimensions">Dimensiuni</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nume (ex: Catifea Premium, 280cm)</label>
                        <input 
                          type="text" 
                          className="form-input-text" 
                          value={newConfig.name}
                          onChange={e => setNewConfig({...newConfig, name: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Cost Adițional (MDL, ex: 1200)</label>
                        <input 
                          type="number" 
                          className="form-input-text" 
                          value={newConfig.cost}
                          onChange={e => setNewConfig({...newConfig, cost: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                      <label className="form-label">Scurtă Descriere (opțional)</label>
                      <input 
                        type="text" 
                        className="form-input-text" 
                        value={newConfig.desc}
                        onChange={e => setNewConfig({...newConfig, desc: e.target.value})}
                        placeholder="Ex: Tridimensional, la modă"
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddConfig(); } }}
                      />
                    </div>
                    <button type="button" className="btn-add" style={{ width: '100%', justifyContent: 'center' }} onClick={handleAddConfig}>
                      + Adaugă Opțiunea
                    </button>
                  </div>

                  {/* LIST CONFIGURED OPTIONS */}
                  {(formData.configOptions?.fabrics?.length > 0 || formData.configOptions?.wood?.length > 0 || formData.configOptions?.dimensions?.length > 0) && (
                    <div className="form-group">
                      <label className="form-label">Opțiuni Salvate</label>
                      <div className="form-list-items" style={{ maxHeight: 'none' }}>
                        {['fabrics', 'wood', 'dimensions'].map(type => (
                          (formData.configOptions?.[type] || []).map((opt, idx) => (
                            <div key={type+idx} className="form-list-item">
                              <div>
                                <span style={{ fontWeight: '600', marginRight: '8px' }}>
                                  {type === 'fabrics' ? '🧵 Material' : type === 'wood' ? '🪵 Lemn' : '📏 Dimensiune'}: {opt.name}
                                </span>
                                <span style={{ color: '#7b7875', fontSize: '12px' }}>{opt.desc}</span>
                                <span style={{ color: 'var(--accent)', fontWeight: 'bold', marginLeft: '10px' }}>+{opt.cost} MDL</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button type="button" className="btn-remove-item" style={{ color: '#2b2927' }} onClick={() => handleEditConfig(type, idx)}>Editează</button>
                                <button type="button" className="btn-remove-item" onClick={() => handleRemoveConfig(type, idx)}>Șterge</button>
                              </div>
                            </div>
                          ))
                        ))}
                      </div>
                    </div>
                  )}

                  <hr style={{ border: 'none', borderTop: '1px solid #e5e2db', margin: '20px 0' }} />

                  {/* CARACTERISTICI MANAGER */}
                  <div className="form-group">
                    <label className="form-label">Caracteristici (Features)</label>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                      <input 
                        type="text" 
                        value={newFeature} 
                        onChange={e => setNewFeature(e.target.value)}
                        className="form-input-text"
                        placeholder="Ex: Structură din lemn masiv de fag"
                        style={{ flexGrow: 1 }}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                      />
                      <button type="button" className="btn-add" onClick={handleAddFeature}>+</button>
                    </div>
                    
                    <div className="form-list-items">
                      {formData.features.map((feat, idx) => (
                        <div key={idx} className="form-list-item">
                          <span>{feat}</span>
                          <button type="button" className="btn-remove-item" onClick={() => handleRemoveFeature(idx)}>Șterge</button>
                        </div>
                      ))}
                      {formData.features.length === 0 && (
                        <div style={{ color: '#7b7875', textAlign: 'center', fontSize: '13px', padding: '10px 0' }}>
                          Nicio caracteristică adăugată.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT - SWATCHES */}
              {activeTab === 'swatches' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  
                  {/* LIST EXISTING SWATCHES */}
                  <label className="form-label">Swatches Configurate ({formData.swatches.length})</label>
                  <div className="form-list-items" style={{ maxHeight: '180px', marginBottom: '24px' }}>
                    {formData.swatches.map((sw, idx) => (
                      <div key={idx} className="form-list-item">
                        <div>
                          <span className="swatch-color-preview" style={{ backgroundColor: sw.code }} />
                          <span style={{ fontWeight: '600', marginRight: '8px' }}>
                            {sw.type === 'wood' ? '🪵 Lemn' : '🧵 Tapițerie'}: {sw.name}
                          </span>
                          <span style={{ color: '#7b7875', marginLeft: '6px' }}>({sw.code})</span>
                          {sw.productId && <span style={{ color: '#9e7e59', marginLeft: '8px', fontSize: '11px', fontWeight: 'bold' }}>Variant ID: #{sw.productId}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button type="button" className="btn-remove-item" style={{ color: '#2b2927' }} onClick={() => handleEditSwatch(idx)}>Editează</button>
                          <button type="button" className="btn-remove-item" onClick={() => handleRemoveSwatch(idx)}>Șterge</button>
                        </div>
                      </div>
                    ))}
                    {formData.swatches.length === 0 && (
                      <div style={{ color: '#7b7875', textAlign: 'center', fontSize: '13px', padding: '10px 0' }}>
                        Niciun swatch adăugat. Produsul nu va avea varietate de nuanțe/texturi macro.
                      </div>
                    )}
                  </div>

                  {/* ADD SWATCH FORM */}
                  <div style={{ border: '1px solid #e5e2db', padding: '16px', borderRadius: '8px', backgroundColor: '#faf9f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#2b2927', margin: 0 }}>Adaugă Swatch Nuanță / Textură</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '12px', color: '#7b7875', fontWeight: 'bold' }}>+ Adaugă rapid produs existent:</span>
                        <select 
                          className="form-input-text"
                          style={{ padding: '6px 10px', fontSize: '13px', width: '200px' }}
                          onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            if (!selectedId) return;
                            const prod = products.find(p => p.id === selectedId);
                            if (prod) {
                              const selfSwatch = prod.swatches?.find(s => !s.productId || s.productId === prod.id) || prod.swatches?.[0];
                              setNewSwatch({
                                ...newSwatch,
                                name: prod.name.includes('(') ? prod.name.replace(/.*\((.*)\).*/, '$1').trim() : prod.name,
                                code: selfSwatch ? selfSwatch.code : '#cccccc',
                                productId: prod.id,
                                textureImg: selfSwatch ? selfSwatch.textureImg : prod.img,
                                type: selfSwatch ? selfSwatch.type : 'fabric'
                              });
                            }
                            e.target.value = ''; // reset after selection
                          }}
                        >
                          <option value="">-- Alegeți --</option>
                          {products.filter(p => p.id !== formData.id).map(p => (
                            <option key={p.id} value={p.id}>#{p.id} - {p.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">Tip Swatch</label>
                        <select 
                          className="form-input-text" 
                          value={newSwatch.type || 'fabric'}
                          onChange={e => setNewSwatch({ ...newSwatch, type: e.target.value })}
                        >
                          <option value="fabric">Tapițerie / Material</option>
                          <option value="wood">Nuanță Lemn</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Nume Culoare</label>
                        <input 
                          type="text" 
                          value={newSwatch.name} 
                          onChange={e => setNewSwatch({ ...newSwatch, name: e.target.value })}
                          className="form-input-text"
                          placeholder="Ex: Beige Velvet"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Cod HEX / Culoare</label>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <input 
                            type="color" 
                            value={newSwatch.code} 
                            onChange={e => setNewSwatch({ ...newSwatch, code: e.target.value })}
                            style={{ width: '42px', height: '42px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          />
                          <input 
                            type="text" 
                            value={newSwatch.code} 
                            onChange={e => setNewSwatch({ ...newSwatch, code: e.target.value })}
                            className="form-input-text"
                            placeholder="#D9C3B0"
                            style={{ flexGrow: 1, textTransform: 'uppercase' }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Variant Product ID</label>
                        <input 
                          type="text" 
                          value={newSwatch.productId} 
                          onChange={e => setNewSwatch({ ...newSwatch, productId: e.target.value })}
                          className="form-input-text"
                          placeholder="Gol = Produsul curent"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cale Imagine Textură (URL sau Path)</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          value={newSwatch.textureImg} 
                          onChange={e => setNewSwatch({ ...newSwatch, textureImg: e.target.value })}
                          className="form-input-text"
                          placeholder="Ex: /img/textures/texture_beige_velvet.webp"
                          style={{ flexGrow: 1 }}
                        />
                        <label style={{ 
                          background: '#e0d8cc', 
                          padding: '0 15px', 
                          borderRadius: '4px', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: '#333'
                        }} title="Încarcă imagine locală (se salvează ca Base64)">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e, 'textureImg')} />
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Descriere Textură</label>
                      <input 
                        type="text" 
                        value={newSwatch.textureDesc} 
                        onChange={e => setNewSwatch({ ...newSwatch, textureDesc: e.target.value })}
                        className="form-input-text"
                        placeholder="Ex: Catifea premium fină Easy Clean"
                      />
                    </div>

                    <button 
                      type="button" 
                      className="btn-add" 
                      style={{ width: '100%', justifyContent: 'center', marginTop: '5px' }}
                      onClick={handleAddSwatch}
                    >
                      Adaugă în Lista de Swatches
                    </button>
                  </div>

                </div>
              )}

            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-action btn-edit" 
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '10px 20px', fontSize: '14px' }}
              >
                Anulează
              </button>
              <button 
                type="button" 
                className="btn-add" 
                onClick={handleSave}
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                Salvează Produs
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
      </div>
    </>
  );
}

