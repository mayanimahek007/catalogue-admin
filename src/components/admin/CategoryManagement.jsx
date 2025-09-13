import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all jewelry items in this category.`)) {
      try {
        await axios.delete(`/categories/${id}`);
        toast.success('Category deleted successfully');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Loading categories...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ padding: '40px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: 0
          }}>
            Category Management
          </h1>
          
          <Link
            to="/admin/add-category"
            style={{
              padding: '12px 24px',
              backgroundColor: '#f39c12',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            ➕ Add New Category
          </Link>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>
              📁
            </div>
            <h3 style={{
              color: '#7f8c8d',
              margin: '0 0 10px 0'
            }}>
              No categories found
            </h3>
            <p style={{
              color: '#95a5a6',
              margin: 0
            }}>
              Start by adding your first category
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {categories.map((category) => (
              <div
                key={category._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}
              >
                {/* Image */}
                <div style={{
                  height: '200px',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {category.imageUrl ? (
                    <img
                      src={`http://localhost:5000${category.imageUrl}`}
                      alt={category.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: '48px',
                      color: '#bdc3c7'
                    }}>
                      📁
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    margin: '0 0 10px 0'
                  }}>
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p style={{
                      color: '#7f8c8d',
                      margin: '0 0 15px 0',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {category.description}
                    </p>
                  )}

                  <div style={{
                    color: '#95a5a6',
                    fontSize: '12px',
                    marginBottom: '15px'
                  }}>
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <Link
                      to={`/admin/edit-category/${category._id}`}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: '500'
                      }}
                    >
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(category._id, category.name)}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CategoryManagement;
