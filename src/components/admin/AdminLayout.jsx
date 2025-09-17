import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        padding: '20px 0',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 20px 30px 20px',
          borderBottom: '1px solid #34495e'
        }}>
          <h2 style={{
            color: 'white',
            margin: 0,
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            CRYSTOVA
          </h2>
          <p style={{
            color: '#bdc3c7',
            margin: '5px 0 0 0',
            fontSize: '12px'
          }}>
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '20px 0' }}>
          <Link
            to="/admin/dashboard"
            style={{
              display: 'block',
              padding: '12px 20px',
              color: isActive('/admin/dashboard') ? '#3498db' : '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: isActive('/admin/dashboard') ? '#34495e' : 'transparent',
              borderLeft: isActive('/admin/dashboard') ? '3px solid #3498db' : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/categories"
            style={{
              display: 'block',
              padding: '12px 20px',
              color: isActive('/admin/categories') ? '#3498db' : '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: isActive('/admin/categories') ? '#34495e' : 'transparent',
              borderLeft: isActive('/admin/categories') ? '3px solid #3498db' : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            📁 Categories
          </Link>

          <Link
            to="/admin/jewelry"
            style={{
              display: 'block',
              padding: '12px 20px',
              color: isActive('/admin/jewelry') ? '#3498db' : '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: isActive('/admin/jewelry') ? '#34495e' : 'transparent',
              borderLeft: isActive('/admin/jewelry') ? '3px solid #3498db' : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            💎 Jewelry
          </Link>

          <Link
            to="/admin/add-category"
            style={{
              display: 'block',
              padding: '12px 20px',
              color: isActive('/admin/add-category') ? '#3498db' : '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: isActive('/admin/add-category') ? '#34495e' : 'transparent',
              borderLeft: isActive('/admin/add-category') ? '3px solid #3498db' : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            ➕ Add Category
          </Link>

          <Link
            to="/admin/add-jewelry"
            style={{
              display: 'block',
              padding: '12px 20px',
              color: isActive('/admin/add-jewelry') ? '#3498db' : '#bdc3c7',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: isActive('/admin/add-jewelry') ? '#34495e' : 'transparent',
              borderLeft: isActive('/admin/add-jewelry') ? '3px solid #3498db' : '3px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            ➕ Add Jewelry
          </Link>
        </nav>

        {/* Logout Button */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: '250px',
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
