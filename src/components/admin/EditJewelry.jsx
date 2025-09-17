import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from './AdminLayout';

const EditJewelry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    sku: '',
    price: ''
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({ imageUrl: null, videoUrl: null });
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchJewelry();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error('Error:', error);
    }
  };

  const fetchJewelry = async () => {
    try {
      const response = await axios.get(`/jewelry/${id}`);
      const jewelry = response.data;
      
      setFormData({
        name: jewelry.name || '',
        category: jewelry.category || '',
        sku: jewelry.sku || ''
      });
      
      setCurrentMedia({
        imageUrl: jewelry.imageUrl,
        videoUrl: jewelry.videoUrl
      });
    } catch (error) {
      toast.error('Failed to fetch jewelry details');
      console.error('Error:', error);
      navigate('/admin/jewelry');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setVideoFile(null); // Clear video if image is selected
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
    setImageFile(null); // Clear image if video is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add file if new file is selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      } else if (videoFile) {
        formDataToSend.append('video', videoFile);
      }

      await axios.put(`/jewelry/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Jewelry updated successfully!');
      navigate('/admin/jewelry');
    } catch (error) {
      toast.error('Failed to update jewelry');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ padding: '40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2c3e50',
            margin: 0
          }}>
            Edit Jewelry
          </h1>
        </div>

        {/* Form */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '600px'
        }}>
          {/* Current Media Display */}
          {(currentMedia.imageUrl || currentMedia.videoUrl) && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2c3e50',
                margin: '0 0 15px 0'
              }}>
                Current Media:
              </h3>
              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {currentMedia.imageUrl ? (
                  <img
                    src={`https://catalogue-api.crystovajewels.com${currentMedia.imageUrl}`}
                    alt="Current jewelry"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : currentMedia.videoUrl ? (
                  <video
                    src={`https://catalogue-api.crystovajewels.com${currentMedia.videoUrl}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    controls
                  />
                ) : null}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                Name (Optional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>


            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                New Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {imageFile && (
                <p style={{ color: '#27ae60', margin: '5px 0 0 0', fontSize: '14px' }}>
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: '500'
              }}>
                New Video (optional)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {videoFile && (
                <p style={{ color: '#27ae60', margin: '5px 0 0 0', fontSize: '14px' }}>
                  Selected: {videoFile.name}
                </p>
              )}
              <p style={{ color: '#7f8c8d', margin: '5px 0 0 0', fontSize: '12px' }}>
                Note: Uploading new media will replace the current media
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: loading ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Updating...' : 'Update Jewelry'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/admin/jewelry')}
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditJewelry;
