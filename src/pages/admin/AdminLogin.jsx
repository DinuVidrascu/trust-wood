import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication for local development
    setTimeout(() => {
      if (email === 'admin@woodandsoft.ro' && password === 'admin123') {
        onLogin(true);
        navigate('/admin/dashboard');
      } else {
        setError('Email sau parolă incorectă.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img 
            src="/logo_dark_text.png" 
            alt="Wood & Soft Admin" 
            style={{ height: '50px', marginBottom: '20px', objectFit: 'contain' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h1 style={{ 
            fontFamily: '"Playfair Display", serif', 
            fontSize: '24px', 
            color: '#1a1a1a',
            margin: 0
          }}>
            Admin Portal
          </h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
            Autentifică-te pentru a gestiona magazinul.
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fff0f0',
            color: '#d32f2f',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '24px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@woodandsoft.ro"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#C5A880'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Parolă
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#C5A880'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'background-color 0.2s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onMouseOver={(e) => { if(!isLoading) e.target.style.backgroundColor = '#333'; }}
            onMouseOut={(e) => { if(!isLoading) e.target.style.backgroundColor = '#1a1a1a'; }}
          >
            {isLoading ? (
              <span style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid #ffffff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
            ) : (
              'Autentificare'
            )}
          </button>
        </form>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
