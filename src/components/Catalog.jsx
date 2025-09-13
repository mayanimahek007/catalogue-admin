import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handleBackToHome = () => {
    navigate('/');
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
        Loading Catalog...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <button
          onClick={handleBackToHome}
          style={{
            backgroundColor: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#2c3e50',
            fontWeight: 'bold'
          }}
        >
          ← Back to Home
        </button>
        
        <div style={{
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'serif'
          }}>
            CRYSTOVA CATALOG
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '100px 40px 40px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '1200px',
          width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Catalog Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h1 style={{
              fontFamily: 'serif',
              fontSize: '48px',
              color: '#2c3e50',
              margin: '0 0 10px 0',
              fontWeight: 'normal',
              position: 'relative'
            }}>
              Jewelry Categories
              <div style={{
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '1px',
                backgroundColor: '#2c3e50'
              }} />
            </h1>
            <p style={{
              color: '#7f8c8d',
              fontSize: '14px',
              margin: '10px 0 0 0',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Select a category to view products
            </p>
          </div>

          {/* Categories Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '20px'
          }}>
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#3498db';
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '50%',
                  margin: '0 auto 20px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  💎
                </div>
                <h3 style={{
                  color: '#2c3e50',
                  fontSize: '24px',
                  margin: '0 0 15px 0',
                  fontWeight: 'bold',
                  fontFamily: 'serif'
                }}>
                  {category.name}
                </h3>
                {category.description && (
                  <p style={{
                    color: '#6c757d',
                    fontSize: '16px',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {category.description}
                  </p>
                )}
                <div style={{
                  marginTop: '20px',
                  color: '#3498db',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  View Products →
                </div>
              </div>
            ))}
          </div>

          {categories.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6c757d'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>No categories found</h3>
              <p>Categories will appear here once they are added to the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
