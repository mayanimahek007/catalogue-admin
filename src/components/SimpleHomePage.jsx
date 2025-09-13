import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SimpleHomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading Crystova Jewels...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#2c3e50',
          fontSize: '48px',
          marginBottom: '20px',
          fontFamily: 'serif'
        }}>
          CRYSTOVA JEWELS
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#7f8c8d',
          fontSize: '18px',
          marginBottom: '40px'
        }}>
          Lab Grown Diamond Jewelry - Wholesale Catalog 2024
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          {categories.map(category => (
            <div
              key={category._id}
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                border: '2px solid #e9ecef'
              }}
            >
              {category.imageUrl && (
                <img
                  src={`http://localhost:5000${category.imageUrl}`}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '15px'
                  }}
                />
              )}
              <h3 style={{
                color: '#2c3e50',
                fontSize: '16px',
                margin: 0
              }}>
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6c757d'
          }}>
            <p>No categories found. Please add some categories first.</p>
            <a 
              href="/categories" 
              style={{
                color: '#e74c3c',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Go to Category Management
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
