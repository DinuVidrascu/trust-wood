import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/admin');
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'block',
    padding: '12px 20px',
    margin: '8px 16px',
    borderRadius: '8px',
    color: isActive ? '#C5A880' : '#888',
    backgroundColor: isActive ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
    textDecoration: 'none',
    fontWeight: isActive ? '600' : '500',
    fontSize: '15px',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: '260px',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0,0,0,0.05)',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <img 
            src="/logo_dark_text.png" 
            alt="Wood & Soft Admin" 
            style={{ height: '40px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '10px', color: '#888' }}>
            Admin Dashboard
          </div>
        </div>

        <nav style={{ flexGrow: 1, paddingTop: '20px' }}>
          <NavLink to="/admin/dashboard" style={navItemStyle}>
            📊 Privire de Ansamblu
          </NavLink>
          <NavLink to="/admin/products" style={navItemStyle}>
            🛋️ Catalog Produse
          </NavLink>
          <NavLink to="/admin/content" style={navItemStyle}>
            📝 Conținut Pagini
          </NavLink>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              color: '#d32f2f',
              border: '1px solid rgba(211, 47, 47, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(211, 47, 47, 0.1)'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}
          >
            Deconectare
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{
        flexGrow: 1,
        marginLeft: '260px', // Offset for the fixed sidebar
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '300px' // Center content but leave room for sidebar
      }}>
        {/* Render nested routes (Dashboard, Products, Content) here */}
        <Outlet />
      </main>
      
    </div>
  );
}
