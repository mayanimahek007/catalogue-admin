import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Don't show navigation on admin pages or if not authenticated
  if (location.pathname.startsWith('/admin') || !isAuthenticated) {
    return null;
  }
  
  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/categories', label: 'Categories', icon: '📁' },
    { path: '/jewelry', label: 'All Jewelry', icon: '💎' },
    { path: '/add-jewelry', label: 'Add Jewelry', icon: '➕' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '10px 20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: location.pathname === item.path ? '#e74c3c' : '#2c3e50',
            padding: '8px 12px',
            borderRadius: '15px',
            transition: 'all 0.3s ease',
            backgroundColor: location.pathname === item.path ? 'rgba(231, 76, 60, 0.1)' : 'transparent'
          }}
        >
          <span style={{ fontSize: '20px', marginBottom: '4px' }}>
            {item.icon}
          </span>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: location.pathname === item.path ? 'bold' : 'normal' 
          }}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
