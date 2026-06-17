import React from 'react';
import { useProducts } from '../../context/ProductsContext';

export default function AdminDashboard() {
  const { products, categories } = useProducts();

  const activeProducts = products?.filter(p => p.inStock)?.length || 0;
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;

  const StatCard = ({ title, value, subtitle, icon }) => (
    <div style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      border: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        backgroundColor: 'rgba(197, 168, 128, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', lineHeight: '1' }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', margin: '0 0 8px 0', color: '#1a1a1a' }}>
          Bun venit, Administrator
        </h1>
        <p style={{ color: '#666', fontSize: '15px', margin: 0 }}>
          Iată o privire de ansamblu asupra magazinului tău Wood & Soft.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Total Produse" 
          value={totalProducts} 
          subtitle={`${activeProducts} în stoc activ`}
          icon="🛋️" 
        />
        <StatCard 
          title="Categorii" 
          value={totalCategories} 
          subtitle="Grupate în meniu"
          icon="📂" 
        />
        <StatCard 
          title="Vizitatori Azi" 
          value="—" 
          subtitle="Va fi disponibil cu Firebase"
          icon="👁️" 
        />
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0'
      }}>
        <h2 style={{ fontSize: '18px', margin: '0 0 20px 0', color: '#1a1a1a', fontWeight: '600' }}>Acțiuni Rapide</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            + Adaugă Produs Nou
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#f8f9fa',
            color: '#1a1a1a',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Editează Textele Acasă
          </button>
        </div>
      </div>
    </div>
  );
}
