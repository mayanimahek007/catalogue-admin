import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddJewelry() {
  const location = useLocation();
  const editItem = location.state && location.state.editItem;
  const [form, setForm] = useState({
    name: '',
    sku: '',
    categoryname: '',
    category: ''
  });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'video'
  const nav = useNavigate();

  useEffect(() => {
    fetchCategories();
    if (editItem) {
      setForm({
        name: editItem.name || '',
        sku: editItem.sku || '',
        categoryname: editItem.categoryname || '',
        category: editItem.category?._id || ''
      });
      // Set active tab based on existing media
      if (editItem.videoUrl) {
        setActiveTab('video');
      } else if (editItem.imageUrl) {
        setActiveTab('image');
      }
    }
  }, [editItem]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://catalogue-api.crystovajewels.com/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    
    // If category is being changed, also set the categoryname
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat._id === value);
      setForm({
        ...form, 
        [name]: value,
        categoryname: selectedCategory ? selectedCategory.name : ''
      });
    } else {
      setForm({...form, [name]: value});
    }
  };
  const handleFile = e => setImage(e.target.files[0]);
  const handleVideo = e => setVideo(e.target.files[0]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      
      // Debug: Log the form data being sent
      console.log('Form data being sent:', {
        name: form.name,
        sku: form.sku,
        categoryname: form.categoryname,
        category: form.category
      });
      
      // Only append the selected media type
      if (activeTab === 'image' && image) {
        fd.append('image', image);
      } else if (activeTab === 'video' && video) {
        fd.append('video', video);
      }
      
      if (editItem && editItem._id) {
        await axios.put(`https://catalogue-api.crystovajewels.com/api/jewelry/${editItem._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Updated');
      } else {
        await axios.post('https://catalogue-api.crystovajewels.com/api/jewelry', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('Added');
      }
      nav('/jewelry');
    } catch (err) {
      console.error(err);
      alert('Error saving jewelry');
    }
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px #e2c7a7',
      padding: 32,
      fontFamily: 'Georgia, serif'
    }}>
      <h2 style={{textAlign:'center', color:'#a67c52', marginBottom:20}}>{editItem ? 'Edit Jewelry' : 'Add Jewelry'}</h2>
      
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: 20,
        borderBottom: '2px solid #e2c7a7'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('image')}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: activeTab === 'image' ? '#a67c52' : 'transparent',
            color: activeTab === 'image' ? '#fff' : '#7c5c36',
            border: 'none',
            borderRadius: '6px 6px 0 0',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          📷 Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: activeTab === 'video' ? '#a67c52' : 'transparent',
            color: activeTab === 'video' ? '#fff' : '#7c5c36',
            border: 'none',
            borderRadius: '6px 6px 0 0',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          🎥 Video
        </button>
      </div>

      <form onSubmit={submit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}>
        {/* 1st row: Name + Category */}
        <div style={{display:'flex', gap:18}}>
          <div style={{flex:1, display:'flex', flexDirection:'column', gap:6}}>
            <label style={{color:'#7c5c36', fontWeight:'bold'}}>Name*</label>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={{padding:10, borderRadius:6, border:'1px solid #e2c7a7'}}/>
          </div>
          <div style={{flex:1, display:'flex', flexDirection:'column', gap:6}}>
            <label style={{color:'#7c5c36', fontWeight:'bold'}}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={{padding:10, borderRadius:6, border:'1px solid #e2c7a7'}}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          
          </div>
        </div>
        
        {/* 2nd row: SKU + Price */}
        <div style={{display:'flex', gap:18}}>
          <div style={{flex:1, display:'flex', flexDirection:'column', gap:6}}>
            <label style={{color:'#7c5c36', fontWeight:'bold'}}>SKU</label>
            <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} style={{padding:10, borderRadius:6, border:'1px solid #e2c7a7'}}/>
          </div>
        </div>
        
        {/* Media Upload Section */}
        <div style={{
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '2px dashed #e2c7a7'
        }}>
          {activeTab === 'image' ? (
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              <label style={{color:'#7c5c36', fontWeight:'bold', fontSize:'16px'}}>📷 Upload Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFile} 
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2c7a7',
                  background: '#fff'
                }}
              />
              {image && (
                <div style={{marginTop: 10}}>
                  <p style={{color: '#7c5c36', fontSize: '14px'}}>Selected: {image.name}</p>
                </div>
              )}
              {editItem && editItem.imageUrl && (
                <div style={{marginTop: 10}}>
                  <p style={{color: '#7c5c36', fontSize: '14px'}}>Current: {editItem.imageUrl}</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              <label style={{color:'#7c5c36', fontWeight:'bold', fontSize:'16px'}}>🎥 Upload Video</label>
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleVideo} 
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e2c7a7',
                  background: '#fff'
                }}
              />
              {video && (
                <div style={{marginTop: 10}}>
                  <p style={{color: '#7c5c36', fontSize: '14px'}}>Selected: {video.name}</p>
                </div>
              )}
              {editItem && editItem.videoUrl && (
                <div style={{marginTop: 10}}>
                  <p style={{color: '#7c5c36', fontSize: '14px'}}>Current: {editItem.videoUrl}</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          style={{
            marginTop: 10, 
            padding: '12px 0', 
            background: '#a67c52', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 6, 
            fontWeight: 'bold', 
            fontSize: 16, 
            letterSpacing: 1, 
            cursor: 'pointer', 
            boxShadow: '0 1px 4px #e2c7a7'
          }}
        > 
          {editItem ? 'Update' : 'Save'} 
        </button>
      </form>
    </div>
  );
}
