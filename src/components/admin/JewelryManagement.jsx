import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';
import ConfirmationModal from './ConfirmationModal';

const JewelryManagement = () => {
  const [jewelry, setJewelry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    item: null
  });

  useEffect(() => {
    fetchJewelry();
  }, []);

  const fetchJewelry = async () => {
    try {
      const response = await axios.get('/jewelry');
      setJewelry(response.data);
    } catch (error) {
      toast.error('Failed to fetch jewelry');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteModal({
      isOpen: true,
      item: item
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item) return;
    
    try {
      await axios.delete(`/jewelry/${deleteModal.item._id}`);
      toast.success('Jewelry deleted successfully');
      fetchJewelry();
      setDeleteModal({ isOpen: false, item: null });
    } catch (error) {
      toast.error('Failed to delete jewelry');
      console.error('Error:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, item: null });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Loading jewelry...</p>
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
            Jewelry Management
          </h1>
          
          <Link
            to="/admin/add-jewelry"
            style={{
              padding: '12px 24px',
              backgroundColor: '#27ae60',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            ➕ Add New Jewelry
          </Link>
        </div>

        {/* Jewelry Grid */}
        {jewelry.length === 0 ? (
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
              💎
            </div>
            <h3 style={{
              color: '#7f8c8d',
              margin: '0 0 10px 0'
            }}>
              No jewelry found
            </h3>
            <p style={{
              color: '#95a5a6',
              margin: 0
            }}>
              Start by adding your first jewelry item
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {jewelry.map((item) => (
              <div
                key={item._id}
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
                  {item.imageUrl ? (
                    <img
                      src={`https://catalogue-api.crystovajewels.com${item.imageUrl}`}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : item.videoUrl ? (
                    <video
                      src={`https://catalogue-api.crystovajewels.com${item.videoUrl}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      muted
                    />
                  ) : (
                    <div style={{
                      fontSize: '48px',
                      color: '#bdc3c7'
                    }}>
                      💎
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    margin: '0 0 10px 0'
                  }}>
                    {item.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '15px'
                  }}>
                    <p style={{
                      color: '#7f8c8d',
                      margin: 0,
                      fontSize: '14px'
                    }}>
                      <strong>Category:</strong> {item.category?.name || item.categoryname || 'N/A'}
                    </p>
                    
                    {item.price && (
                      <p style={{
                        color: '#7f8c8d',
                        margin: 0,
                        fontSize: '14px'
                      }}>
                        <strong>Price:</strong> ₹{item.price}
                      </p>
                    )}
                    
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <Link
                      to={`/admin/edit-jewelry/${item._id}`}
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
                      onClick={() => handleDeleteClick(item)}
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

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Jewelry Item"
          message={`Are you sure you want to delete "${deleteModal.item?.name || 'this jewelry item'}"? This action cannot be undone and will also delete all associated images and videos.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          type="danger"
        />
      </div>
    </AdminLayout>
  );
};

export default JewelryManagement;
