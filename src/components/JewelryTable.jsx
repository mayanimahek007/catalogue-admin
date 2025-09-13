import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JewelryTable({ showDelete = false }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jewelry');
      setItems(res.data);
    } catch (err) { console.error(err); }
  };
  const del = async (id) => {
    if (!window.confirm('Delete this item from your collection?')) return;
    await axios.delete('http://localhost:5000/api/jewelry/' + id);
    fetchItems();
  };

  const handleEdit = (item) => {
    navigate('/add', { state: { editItem: item } });
  };

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px', color: '#a67c52', fontFamily: 'Georgia, serif' }}>
        No jewelry added yet.
      </div>
    );
  }

  return (
    <div style={{ padding: '30px 10px', background: '#f9f5f0', minHeight: '100vh' }}>
      <h2 style={{ color: '#a67c52', fontFamily: 'Georgia, serif', textAlign: 'center', marginBottom: '20px' }}>
        Jewelry Collection (Table View)
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #e2c7a7' }}>
          <thead>
            <tr style={{ background: '#e8ddd0', color: '#a67c52' }}>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Image</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Category</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>SKU</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Video</th>
              <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Edit</th>
              {showDelete && <th style={{ padding: '10px', border: '1px solid #e2c7a7' }}>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it._id} style={{ textAlign: 'center', fontFamily: 'Georgia, serif' }}>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>
                  {it.imageUrl ? (
                    <img src={'http://localhost:5000' + it.imageUrl} alt={it.name} style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '4px', border: '1px solid #f0e6db' }} />
                  ) : it.videoUrl ? (
                    <div style={{ color: '#a67c52', fontSize: '12px' }}>🎥 Video</div>
                  ) : '-' }
                </td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>{it.name}</td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>{it.categoryname || '-'}</td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>{it.sku || '-'}</td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>{it.price ? `$${it.price}` : '-'}</td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>
                  {it.videoUrl ? (
                    <video src={'http://localhost:5000' + it.videoUrl} style={{ maxWidth: '80px', maxHeight: '80px' }} controls />
                  ) : '-' }
                </td>
                <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>
                  <button onClick={() => handleEdit(it)} style={{ background: '#e2c7a7', color: '#7c5c36', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', marginRight: showDelete ? '6px' : 0 }}>Edit</button>
                </td>
                {showDelete && (
                  <td style={{ padding: '8px', border: '1px solid #e2c7a7' }}>
                    <button onClick={() => del(it._id)} style={{ background: '#c85050', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
