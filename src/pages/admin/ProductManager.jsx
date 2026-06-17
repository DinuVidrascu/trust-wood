import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductsContext';

export default function ProductManager() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  // Modal and Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('generale'); // 'generale', 'config'

  const initialFormState = {
    sku: '',
    group: '',
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

  const [newSwatch, setNewSwatch] = useState({
    type: 'fabric', // 'fabric' or 'wood'
    name: '',
    code: '#9e7e59',
    textureImg: ''
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.group && p.group.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Toate' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setActiveTab('generale');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      sku: product.sku || product.id.toString(),
      group: product.group || '',
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
    setActiveTab('generale');
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    // Parse comma-separated strings back to arrays
    const formattedData = {
      ...formData,
      price: formData.price.toString(),
      availableMaterials: formData.availableMaterials.split(',').map(s => s.trim()).filter(Boolean),
      availableColors: formData.availableColors.split(',').map(s => s.trim()).filter(Boolean),
      availableSizes: formData.availableSizes.split(',').map(s => s.trim()).filter(Boolean),
      images: [formData.img, ...formData.images.split(',').map(s => s.trim()).filter(Boolean)]
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, formattedData);
    } else {
      addProduct(formattedData);
    }
    
    setIsModalOpen(false);
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

  const handleAddSwatch = () => {
    if (!newSwatch.name || (!newSwatch.code && !newSwatch.textureImg)) return;
    setFormData(prev => ({
      ...prev,
      swatches: [...prev.swatches, { ...newSwatch }]
    }));
    setNewSwatch({
      type: 'fabric',
      name: '',
      code: '#9e7e59',
      textureImg: ''
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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#fff',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#666',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', margin: '0 0 8px 0', color: '#1a1a1a' }}>
            Catalog Produse
          </h1>
          <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
            Gestionează inventarul, prețurile și configurațiile ({products.length} produse).
          </p>
        </div>
        <button 
          onClick={openAddModal}
          style={{
            padding: '12px 24px',
            backgroundColor: '#C5A880',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(197, 168, 128, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+</span> Adaugă Produs
        </button>
      </div>

      {/* FILTERS */}
      <div style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0',
        marginBottom: '30px',
        display: 'flex',
        gap: '20px'
      }}>
        <div style={{ flex: '1' }}>
          <input 
            type="text" 
            placeholder="Caută produs după nume..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{...inputStyle, backgroundColor: '#f8f9fa'}}
          />
        </div>
        <div style={{ width: '200px' }}>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{...inputStyle, backgroundColor: '#f8f9fa'}}
          >
            <option value="Toate">Toate Categoriile</option>
            {categories.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Cod / ID</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', width: '100%' }}>Produs</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Grupare</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Preț de Bază</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '600', color: '#666', textTransform: 'uppercase', textAlign: 'right', whiteSpace: 'nowrap' }}>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '16px 24px', fontSize: '14px', fontFamily: 'monospace', color: '#888', whiteSpace: 'nowrap' }}>
                  {product.sku || product.id}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={product.img} alt={product.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e0e0e0' }} />
                    <div>
                      <div style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '15px' }}>{product.name}</div>
                      <div style={{ fontSize: '13px', color: '#888' }}>{product.category} • {product.type}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#f0f4f8', color: '#4a5568', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                    {product.group || 'Fără grup'}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontWeight: '600', color: '#1a1a1a', whiteSpace: 'nowrap' }}>
                  {product.price} Lei
                </td>
                <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: product.inStock ? '#2e7d32' : '#d32f2f', fontWeight: '500' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: product.inStock ? '#2e7d32' : '#d32f2f' }}></div>
                    {product.inStock ? 'În Stoc' : 'Indisponibil'}
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button 
                    onClick={() => openEditModal(product)}
                    style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #e0e0e0', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', marginRight: '8px' }}
                  >
                    Editează
                  </button>
                  <button 
                    onClick={() => {
                      if(window.confirm('Ești sigur că vrei să ștergi acest produs?')) {
                        deleteProduct(product.id);
                      }
                    }}
                    style={{ padding: '8px 16px', backgroundColor: '#fff0f0', color: '#d32f2f', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                  Niciun produs găsit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL (ADD / EDIT) */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '16px', width: '90%', maxWidth: '900px',
            maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
          }}>
            {/* Modal Header */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>
                {editingProduct ? 'Editează Produsul' : 'Adaugă Produs Nou'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#888' }}>×</button>
            </div>

            {/* Modal Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', padding: '0 32px', backgroundColor: '#fafafa' }}>
              <button 
                onClick={() => setActiveTab('generale')}
                style={{ padding: '16px 24px', border: 'none', background: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', borderBottom: activeTab === 'generale' ? '3px solid #C5A880' : '3px solid transparent', color: activeTab === 'generale' ? '#C5A880' : '#888' }}
              >
                Informații Generale
              </button>
              <button 
                onClick={() => setActiveTab('config')}
                style={{ padding: '16px 24px', border: 'none', background: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', borderBottom: activeTab === 'config' ? '3px solid #C5A880' : '3px solid transparent', color: activeTab === 'config' ? '#C5A880' : '#888' }}
              >
                Configurator (Stofe/Lemn/Mărimi)
              </button>
              <button 
                onClick={() => setActiveTab('swatches')}
                style={{ padding: '16px 24px', border: 'none', background: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', borderBottom: activeTab === 'swatches' ? '3px solid #C5A880' : '3px solid transparent', color: activeTab === 'swatches' ? '#C5A880' : '#888' }}
              >
                Nuanțe & Texturi Vizuale
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ flex: '1', overflowY: 'auto', padding: '32px' }}>
              <form id="productForm" onSubmit={handleSaveProduct}>
                
                {activeTab === 'generale' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    
                    <div>
                      <label style={labelStyle}>Cod Produs (ID propriu / SKU)</label>
                      <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} style={inputStyle} placeholder="Ex: DS-BG-001" />
                    </div>

                    <div>
                      <label style={labelStyle}>Grupare (Model / Colecție)</label>
                      <input type="text" value={formData.group} onChange={e => setFormData({...formData, group: e.target.value})} style={inputStyle} placeholder="Ex: Colecția Deseda" />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Nume Produs</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} required placeholder="Ex: Canapea Chesterfield" />
                    </div>
                    
                    <div>
                      <label style={labelStyle}>Categorie</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={inputStyle}>
                        {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Preț de Bază (Lei)</label>
                      <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={inputStyle} required placeholder="Ex: 4500" />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Descriere scurtă (Subtitlu)</label>
                      <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={inputStyle} placeholder="Ex: Design clasic, confort absolut" />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Imagine Principală (URL)</label>
                      <input type="text" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} style={inputStyle} required placeholder="/img/canapele/..." />
                      {formData.img && <img src={formData.img} alt="Preview" style={{ marginTop: '10px', height: '100px', borderRadius: '8px', border: '1px solid #e0e0e0' }} />}
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Mai multe imagini (URL-uri separate prin virgulă)</label>
                      <textarea value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} style={{...inputStyle, height: '80px', resize: 'vertical'}} placeholder="/img/1.jpg, /img/2.jpg" />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Descriere Detaliată (Text lung)</label>
                      <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} style={{...inputStyle, height: '120px', resize: 'vertical'}} />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" id="instock" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                      <label htmlFor="instock" style={{ fontWeight: '600', color: '#1a1a1a', cursor: 'pointer' }}>Produsul este disponibil în stoc (poate fi comandat)</label>
                    </div>
                  </div>
                )}

                {activeTab === 'config' && (
                  <div>
                    <div style={{ backgroundColor: '#fff8e1', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffe082', color: '#8d6e63', fontSize: '14px' }}>
                      Aici poți adăuga opțiuni prin care clientul își poate personaliza produsul (ex: Stofe, Lemn). Clientul vede prețul extra în timp real.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px' }}>
                      <div>
                        <label style={labelStyle}>Grup de Opțiuni</label>
                        <select value={newConfig.type} onChange={e => setNewConfig({...newConfig, type: e.target.value})} style={inputStyle}>
                          <option value="fabrics">Stofe & Materiale</option>
                          <option value="wood">Finisaj Lemn</option>
                          <option value="dimensions">Dimensiuni Speciale</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Denumire Opțiune</label>
                        <input type="text" value={newConfig.name} onChange={e => setNewConfig({...newConfig, name: e.target.value})} style={inputStyle} placeholder="Ex: Catifea Premium" />
                      </div>
                      <div>
                        <label style={labelStyle}>Descriere (opțional)</label>
                        <input type="text" value={newConfig.desc} onChange={e => setNewConfig({...newConfig, desc: e.target.value})} style={inputStyle} placeholder="Ex: Fină la atingere, hidrofobă" />
                      </div>
                      <div>
                        <label style={labelStyle}>Preț Suplimentar (Lei)</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input type="number" value={newConfig.cost} onChange={e => setNewConfig({...newConfig, cost: e.target.value})} style={inputStyle} placeholder="0" />
                          <button type="button" onClick={handleAddConfig} style={{ padding: '0 20px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Adaugă</button>
                        </div>
                      </div>
                    </div>

                    {/* Display existing configs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      
                      {['fabrics', 'wood', 'dimensions'].map(type => (
                        <div key={type} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 16px 0', color: '#1a1a1a', textTransform: 'capitalize' }}>
                            {type === 'fabrics' ? 'Stofe' : type === 'wood' ? 'Lemn' : 'Dimensiuni'}
                          </h4>
                          {formData.configOptions?.[type]?.length === 0 && <div style={{ fontSize: '13px', color: '#888' }}>Fără opțiuni.</div>}
                          {formData.configOptions?.[type]?.map((opt, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '6px', marginBottom: '8px', fontSize: '13px' }}>
                              <div>
                                <div style={{ fontWeight: '600', color: '#1a1a1a' }}>{opt.name}</div>
                                <div style={{ color: '#888' }}>+{opt.cost} Lei</div>
                              </div>
                              <button type="button" onClick={() => handleRemoveConfig(type, i)} style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontSize: '18px' }}>×</button>
                            </div>
                          ))}
                        </div>
                      ))}

                    </div>
                  </div>
                )}

                {activeTab === 'swatches' && (
                  <div>
                    <div style={{ backgroundColor: '#fff8e1', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #ffe082', color: '#8d6e63', fontSize: '14px' }}>
                      Adaugă mostre vizuale (culori HEX sau poze cu texturi) pe care clienții le pot vedea direct pe pagina produsului pentru a alege nuanța tapițeriei sau finisajul lemnului.
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '30px', backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px' }}>
                      <div>
                        <label style={labelStyle}>Tip Nuanță</label>
                        <select value={newSwatch.type} onChange={e => setNewSwatch({...newSwatch, type: e.target.value})} style={inputStyle}>
                          <option value="fabric">Tapițerie (Material)</option>
                          <option value="wood">Lemn</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Nume Nuanță (Ex: Beige Boucle)</label>
                        <input type="text" value={newSwatch.name} onChange={e => setNewSwatch({...newSwatch, name: e.target.value})} style={inputStyle} placeholder="Ex: Beige Boucle" />
                      </div>
                      <div>
                        <label style={labelStyle}>Culoare HEX (Cercul colorat)</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input type="color" value={newSwatch.code} onChange={e => setNewSwatch({...newSwatch, code: e.target.value})} style={{ height: '44px', width: '60px', padding: '0', border: '1px solid #e0e0e0', borderRadius: '8px', cursor: 'pointer' }} />
                          <input type="text" value={newSwatch.code} onChange={e => setNewSwatch({...newSwatch, code: e.target.value})} style={inputStyle} placeholder="#C5A880" />
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Imagine Textură URL (Opțional, înlocuiește culoarea)</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <input type="text" value={newSwatch.textureImg} onChange={e => setNewSwatch({...newSwatch, textureImg: e.target.value})} style={inputStyle} placeholder="/img/stofe/..." />
                            {newSwatch.textureImg && <img src={newSwatch.textureImg} alt="Preview Textura" style={{ marginTop: '10px', width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e0e0e0' }} />}
                          </div>
                          <button type="button" onClick={handleAddSwatch} style={{ padding: '0 20px', height: '44px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Adaugă</button>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {['fabric', 'wood'].map(type => {
                        const items = formData.swatches.filter(s => type === 'fabric' ? s.type !== 'wood' : s.type === 'wood');
                        if (items.length === 0) return null;
                        return (
                          <div key={type} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                            <h4 style={{ margin: '0 0 16px 0', color: '#1a1a1a', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '0.05em' }}>
                              {type === 'fabric' ? 'Nuanțe Tapițerie' : 'Finisaje Lemn'}
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                              {items.map((swatch, i) => {
                                const realIndex = formData.swatches.findIndex(s => s === swatch);
                                return (
                                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative' }}>
                                    <div style={{ 
                                      width: '40px', height: '40px', borderRadius: '50%', 
                                      backgroundColor: swatch.code, 
                                      backgroundImage: swatch.textureImg ? `url(${swatch.textureImg})` : 'none',
                                      backgroundSize: 'cover', backgroundPosition: 'center',
                                      border: '2px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                                    }} />
                                    <div style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>{swatch.name}</div>
                                    <button type="button" onClick={() => handleEditSwatch(realIndex)} style={{ position: 'absolute', top: '-6px', right: '12px', background: '#C5A880', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✎</button>
                                    <button type="button" onClick={() => handleRemoveSwatch(realIndex)} style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '24px 32px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: '16px', backgroundColor: '#fafafa' }}>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '12px 24px', backgroundColor: 'transparent', color: '#1a1a1a', border: '1px solid #e0e0e0', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Anulează
              </button>
              <button 
                type="submit" 
                form="productForm"
                style={{ padding: '12px 32px', backgroundColor: '#C5A880', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(197, 168, 128, 0.3)' }}
              >
                Salvează Produsul
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
