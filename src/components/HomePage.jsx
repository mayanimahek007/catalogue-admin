import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import pageFlipSound from '../assets/page-flip2.mp3';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [audioRef] = useState(React.createRef());
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://catalogue-api.crystovajewels.com/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleFlip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <audio ref={audioRef} src={pageFlipSound} preload="auto" />
      
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
            CRYSTOVA
          </h1>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#3498db',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            0
          </div>
        </div>
      </div>

      {/* Main Diary */}
      <div style={{ marginTop: '80px' }}>
        <HTMLFlipBook
          width={600}
          height={800}
          size="stretch"
          minWidth={500}
          maxWidth={700}
          minHeight={700}
          maxHeight={900}
          maxShadowOpacity={0.5}
          showCover={true}
          className="crystova-diary-book"
          onFlip={handleFlip}
          onPageChange={handlePageChange}
        >
          {/* Cover Page */}
          <div key="cover" style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            borderRadius: '8px',
            padding: '40px',
            position: 'relative',
            border: '2px solid #dee2e6'
          }}>
            {/* Background Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
              borderRadius: '6px'
            }} />
            
            {/* Overlay */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: '40px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h1 style={{
                fontFamily: 'serif',
                fontSize: '48px',
                color: '#2c3e50',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}>
                CRYSTOVA
              </h1>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#e74c3c',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px'
              }}>
                ◆
              </div>
              <p style={{
                color: '#2c3e50',
                fontSize: '18px',
                marginBottom: '30px',
                fontStyle: 'italic'
              }}>
                Lab Grown Diamond Jewelry
              </p>
              <p style={{
                color: '#7f8c8d',
                fontSize: '14px',
                margin: 0
              }}>
                Wholesale catalog 2024
              </p>
            </div>
          </div>

          {/* Categories Page */}
          <div key="categories" style={{
            background: '#ffffff',
            padding: '40px',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            border: '2px solid #dee2e6'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontFamily: 'serif',
                fontSize: '36px',
                color: '#2c3e50',
                marginBottom: '10px',
                fontWeight: 'normal'
              }}>
                Categories
              </h2>
              <div style={{
                height: '2px',
                backgroundColor: '#e74c3c',
                width: '100px',
                margin: '0 auto'
              }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '30px',
              flex: 1
            }}>
              {categories.map((category, index) => (
                <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
                  style={{
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    ':hover': {
                      borderColor: '#e74c3c',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = '#e74c3c';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {category.imageUrl && (
                    <img
                      src={`https://catalogue-api.crystovajewels.com${category.imageUrl}`}
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
                    margin: 0,
                    fontWeight: 'bold'
                  }}>
                    {category.name}
                  </h3>
                  {category.description && (
                    <p style={{
                      color: '#7f8c8d',
                      fontSize: '12px',
                      margin: '5px 0 0 0'
                    }}>
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 20px',
        borderRadius: '25px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <span style={{ color: '#2c3e50', fontSize: '14px' }}>
          {currentPage + 1} / 2
        </span>
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: '#ecf0f1',
          borderRadius: '2px',
          position: 'relative'
        }}>
          <div style={{
            width: `${((currentPage + 1) / 2) * 100}%`,
            height: '100%',
            backgroundColor: '#e74c3c',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
}
