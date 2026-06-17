import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';

export default function ContentManager() {
  const { content, updateContent, schema } = useContent();
  const [activeTab, setActiveTab] = useState('home');
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('Salvat cu succes!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#1a1a1a',
    backgroundColor: '#fff',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', margin: '0 0 8px 0', color: '#1a1a1a' }}>
            Conținut Pagini
          </h1>
          <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
            Editează global textele de pe prima pagină și paginile informative.
          </p>
        </div>
        <button 
          onClick={handleSave}
          style={{
            padding: '12px 30px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s'
          }}
        >
          {saveStatus || 'Salvează Modificările'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('home')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'home' ? '#C5A880' : '#fff',
            color: activeTab === 'home' ? '#fff' : '#666',
            border: activeTab === 'home' ? 'none' : '1px solid #e0e0e0',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Acasă (Home)
        </button>
        <button
          onClick={() => setActiveTab('about')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'about' ? '#C5A880' : '#fff',
            color: activeTab === 'about' ? '#fff' : '#666',
            border: activeTab === 'about' ? 'none' : '1px solid #e0e0e0',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Despre Noi
        </button>
      </div>
      
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'grid', gap: '24px' }}>
          {Object.keys(schema[activeTab] || {}).map(key => (
            <div key={key}>
              <label style={labelStyle}>{formatLabel(key)}</label>
              <textarea
                value={content[activeTab][key]}
                onChange={(e) => updateContent(activeTab, key, e.target.value)}
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
