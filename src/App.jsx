import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import CategoryManagement from './components/CategoryManagement';
import ProductDisplay from './components/ProductDisplay';
import ListJewelry from './components/ListJewelry';
import AddJewelry from './components/AddJewelry';
import Catalog from './components/Catalog';

// Admin components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import JewelryManagement from './components/admin/JewelryManagement';
import AdminAddJewelry from './components/admin/AddJewelry';
import EditJewelry from './components/admin/EditJewelry';
import AdminCategoryManagement from './components/admin/CategoryManagement';
import AddCategory from './components/admin/AddCategory';
import EditCategory from './components/admin/EditCategory';

import './style.css';

function HomePage() {
  const handleCatalogClick = () => {
    // Open catalog in new window/tab
    window.open('/catalog', '_blank');
  };

  return (
    <div style={{
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Main Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '60px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {/* Logo/Brand */}
        <div style={{
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: '0 0 20px 0',
            fontFamily: 'serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            CRYSTOVA
          </h1>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'white',
              borderRadius: '50%'
            }} />
          </div>
          <p style={{
            fontSize: '24px',
            color: '#34495e',
            margin: '0 0 10px 0',
            fontStyle: 'italic',
            fontWeight: '300'
          }}>
            Lab Grown Diamond Jewelry
          </p>
          <p style={{
            fontSize: '16px',
            color: '#7f8c8d',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Wholesale catalog 2024
          </p>
        </div>

        {/* Catalog Button */}
        <button
          onClick={handleCatalogClick}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '20px 40px',
            borderRadius: '50px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2980b9';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#3498db';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.3)';
          }}
        >
          📖 View Catalog
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
          <Routes>
            {/* Public Routes - Only catalog is public */}
            <Route path="/" element={<Navigate to="/admin/login" replace />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/category/:categoryId" element={<ProductDisplay />} />

            {/* Protected Routes - Require Login */}
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/categories" element={
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            } />
            <Route path="/jewelry" element={
              <ProtectedRoute>
                <ListJewelry showDelete={true} />
              </ProtectedRoute>
            } />
            <Route path="/add-jewelry" element={
              <ProtectedRoute>
                <AddJewelry />
              </ProtectedRoute>
            } />

            {/* Admin Authentication Routes */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/jewelry" element={
              <ProtectedRoute>
                <JewelryManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/add-jewelry" element={
              <ProtectedRoute>
                <AdminAddJewelry />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/edit-jewelry/:id" element={
              <ProtectedRoute>
                <EditJewelry />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <AdminCategoryManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/add-category" element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/edit-category/:id" element={
              <ProtectedRoute>
                <EditCategory />
              </ProtectedRoute>
            } />

            {/* Redirect admin root to dashboard */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Navigation />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}