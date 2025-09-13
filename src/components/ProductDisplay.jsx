import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDisplay() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 products per page in grid

  useEffect(() => {
    console.log('Category changed, resetting to page 1');
    fetchProducts();
    fetchCategory();
    setCurrentPage(1); // Reset to first page when category changes
  }, [categoryId]);

  // Ensure we always start on page 1 when component mounts
  useEffect(() => {
    console.log('Setting initial page to 1');
    setCurrentPage(1);
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products for category:', categoryId);
      // First try the category-specific route
      const res = await axios.get(`http://localhost:5000/api/jewelry/category/${categoryId}`);
      console.log('Products from category route:', res.data);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products by category:', err);
      // If that fails, try to get all products and filter by category
      try {
        const allProductsRes = await axios.get('http://localhost:5000/api/jewelry');
        console.log('All products:', allProductsRes.data);
        const filteredProducts = allProductsRes.data.filter(product => 
          product.category === categoryId || product.categoryname === category?.name
        );
        console.log('Filtered products:', filteredProducts);
        setProducts(filteredProducts);
      } catch (fallbackErr) {
        console.error('Error fetching all products:', fallbackErr);
        setProducts([]);
      }
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
      setCategory(res.data);
    } catch (err) {
      console.error('Error fetching category:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    console.log('Previous clicked, current page:', currentPage);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log('Going to page:', currentPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log('Next clicked, current page:', currentPage, 'total pages:', totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log('Going to page:', currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#2c3e50'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
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
          padding: '10px',
          borderRadius: '4px',
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
          {/* Category Header - Exact Design from Second Image */}
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
              {category?.name || 'Products'}
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
              {category?.name?.toUpperCase() || 'PRODUCTS'}
            </p>
          </div>

          {/* Products Grid - Responsive Grid Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '20px',
            padding: '0 10px'
          }}>
            {currentProducts.map((product, index) => (
              <div
                key={product._id}
                style={{
                  textAlign: 'center',
                  backgroundColor: 'white',
                  padding: '0',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {/* Main Product Image/Video */}
                <div style={{
                  height: '150px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px 8px 0 0',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {product.videoUrl ? (
                    <video
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    >
                      <source src={`http://localhost:5000${product.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : product.imageUrl ? (
                    <img
                      src={`http://localhost:5000${product.imageUrl}`}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6c757d',
                      fontSize: '14px'
                    }}>
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    color: '#2c3e50',
                    fontSize: '13px',
                    margin: '0 0 8px 0',
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {product.sku || product.name}
                  </h3>

                  {/* Shop Button - Compact style */}
                  <button
                    style={{
                      backgroundColor: '#f39c12',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      margin: '0 auto',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e67e22';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f39c12';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    🛒 Shop
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6c757d'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>No products found</h3>
              <p>This category doesn't have any products yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '15px 25px',
          borderRadius: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}>
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              backgroundColor: currentPage === 1 ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '20px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.3s ease',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (currentPage > 1) {
                e.target.style.backgroundColor = '#2980b9';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage > 1) {
                e.target.style.backgroundColor = '#3498db';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor: currentPage === page ? '#2c3e50' : 'transparent',
                  color: currentPage === page ? 'white' : '#2c3e50',
                  border: '2px solid #2c3e50',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  minWidth: '35px',
                  transition: 'all 0.3s ease'
                }}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: currentPage === totalPages ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '20px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.3s ease',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (currentPage < totalPages) {
                e.target.style.backgroundColor = '#2980b9';
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage < totalPages) {
                e.target.style.backgroundColor = '#3498db';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            Next →
          </button>

          {/* Page Info */}
          <div style={{
            color: '#2c3e50',
            fontSize: '12px',
            fontWeight: 'bold',
            marginLeft: '10px',
            paddingLeft: '10px',
            borderLeft: '1px solid #bdc3c7'
          }}>
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}
