import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HTMLFlipBook from 'react-pageflip';
import pageFlipSound from '../assets/page-flip2.mp3';

export default function ListJewelry({ showDelete = false }) {
  const [items, setItems] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => { fetchItems(); }, []);
  const fetchItems = async () => {
    try {
      const res = await axios.get('https://catalogue-api.crystovajewels.com/api/jewelry');
      setItems(res.data);
    } catch (err) { console.error(err); }
  };
  const del = async (id) => {
    if (!window.confirm('Delete this item from your collection?')) return;
    await axios.delete('https://catalogue-api.crystovajewels.com/api/jewelry/' + id);
    fetchItems();
  };

  // Play sound on page flip
  const handleFlip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Group items into pages of 4
  const itemsPerPage = 2;
  const itemPages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    itemPages.push(items.slice(i, i + itemsPerPage));
  }

  if (items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        fontFamily: 'Georgia, serif',
        color: '#a67c52'
      }}>
        <p>No jewelry added yet. Go to Add page to start your collection.</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 20px',
      backgroundColor: '#f9f5f0',
      minHeight: '140vh',
    }}>
      <audio ref={audioRef} src={pageFlipSound} preload="auto" />

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          color: '#a67c52',
          fontWeight: 'normal',
          marginBottom: '5px'
        }}>
          Jewelry Collection
        </h1>
        <p style={{ color: '#b89b72', margin: 0 }}>Flip through your precious items</p>
        <p style={{ color: '#a67c52', fontSize: '14px', marginTop: '5px' }}>
          {items.length} item{items.length !== 1 ? 's' : ''} across {itemPages.length} page{itemPages.length !== 1 ? 's' : ''}
        </p>
      </div>

      <HTMLFlipBook
        width={400}
        height={600}
        size="stretch"
        minWidth={350}
        maxWidth={550}
        minHeight={500}
        maxHeight={750}
        maxShadowOpacity={0.5}
        showCover={true}
        // style={{ 
        //   boxShadow: '0 10px 30px rgba(166, 124, 82, 0.2)', 
        //   borderRadius: '8px'
        // }}
        className="jewelry-diary-book"
        onFlip={handleFlip}
      >
        {/* Cover Page */}
        <div key="cover" style={{
          background: 'linear-gradient(135deg, #f9f5f0 0%, #e8ddd0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{
            textAlign: 'center',
            padding: '20px'
          }}>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '32px',
              color: '#a67c52',
              marginBottom: '10px',
              fontWeight: 'normal'
            }}>
              Jewelry Diary
            </h1>
            <p style={{
              color: '#b89b72',
              fontStyle: 'italic',
              fontSize: '18px',
              marginBottom: '30px'
            }}>
              My Precious Collection
            </p>
            <div style={{
              width: '80px',
              height: '80px',
              border: '2px solid #a67c52',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              color: '#a67c52',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              {items.length}
            </div>
            <p style={{ color: '#a67c52', marginTop: '15px' }}>
              {items.length} precious item{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Item Pages - 4 items per page */}
        {itemPages.map((page, pageIndex) => (
          <div key={`page-${pageIndex}`} style={{
            background: '#fff',
            padding: '25px 20px',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            boxSizing: 'border-box',
            fontFamily: 'Georgia, serif',
            position: 'relative',
            border: '1px solid #e2c7a7',
          }}>
            {/* <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '1px solid #f0e6db'
            }}>
              <h2 style={{ 
                margin: 0, 
                color: '#a67c52', 
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: 'normal'
              }}>
                Page {pageIndex + 1}
              </h2>
              <span style={{ 
                color: '#b89b72', 
                fontSize: '14px' 
              }}>
                {page.length} of {items.length}
              </span>
            </div> */}

            <div style={{
              display: 'flex',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              flexDirection: 'column',
              padding: '10px 10px',
              justifyContent: 'center',
              height: '100%',
              flex: 1
            }}>
              {page.map((it, itemIndex) => (
                <div key={it._id} style={{
                  background: '#f9f5f0',
                  borderRadius: '8px',
                  padding: '15px',
                  position: 'relative',
                  // border: '1px solid #e2c7a7',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}>
                  {showDelete && (
                    <button
                      onClick={() => del(it._id)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(200, 80, 80, 0.8)',
                        color: '#fff',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        zIndex: 10
                      }}
                    >
                      ×
                    </button>
                  )}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    height: '250px'
                  }}>
                    {it.videoUrl ? (
                      // 🎥 Show video if video exists
                      <video
                        controls
                        style={{
                          maxWidth: '100%',
                          maxHeight: '250px',
                          borderRadius: '4px',
                          border: '1px solid #f0e6db'
                        }}
                      >
                        <source src={'https://catalogue-api.crystovajewels.com' + it.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : it.imageUrl ? (
                      // 🖼️ Show image if image exists
                      <img
                        src={'https://catalogue-api.crystovajewels.com' + it.imageUrl}
                        alt={it.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '250px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #f0e6db'
                        }}
                      />
                    ) : (
                      // 📷 Show placeholder if no media
                      <div style={{
                        width: '100%',
                        height: '250px',
                        backgroundColor: '#f0e6db',
                        borderRadius: '4px',
                        border: '1px solid #e2c7a7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#a67c52',
                        fontSize: '14px'
                      }}>
                        No Media
                      </div>
                    )}
                  </div>

                  {/* {it.imageUrl && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      height: '250px'
                    }}>
                      <img 
                        src={'https://catalogue-api.crystovajewels.com' + it.imageUrl} 
                        alt={it.name} 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '250px', 
                          objectFit: 'cover', 
                          borderRadius: '4px',
                          border: '1px solid #f0e6db'
                        }} 
                      />
                    </div>
                  )} */}

                  <div style={{
                    textAlign: 'center',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <h3 style={{
                      margin: '0 0 5px 0',
                      color: '#a67c52',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {it.sku}
                    </h3>

                    {/* <div style={{ 
                      color: '#b89b72', 
                      marginBottom: '5px',
                      fontSize: '12px',
                      textTransform: 'uppercase'
                    }}>
                      {it.category}
                    </div>
                    
                    <div style={{ 
                      color: '#7c5c36', 
                      marginBottom: '5px',
                      fontSize: '12px'
                    }}>
                      {it.metal}
                    </div>
                    
                    <div style={{ 
                      color: '#7c5c36', 
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {it.price ? `$${it.price}` : '-'}
                    </div> */}

                    {/* {it.notes && (
                      <div style={{ 
                        fontStyle: 'italic', 
                        color: '#6d4c1b', 
                        fontSize: '11px',
                        lineHeight: '1.3',
                        marginTop: '5px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        "{it.notes}"
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '20px',
              color: '#d9c9b3',
              fontSize: '12px'
            }}>
              {pageIndex + 1} / {itemPages.length}
            </div>
          </div>
        ))}

        {/* Back Cover */}
        <div key="back-cover" style={{
          background: 'linear-gradient(135deg, #e8ddd0 0%, #f9f5f0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #e2c7a7'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              color: '#a67c52',
              fontWeight: 'normal',
              marginBottom: '15px'
            }}>
              The End
            </h2>
            <p style={{ color: '#b89b72', fontStyle: 'italic' }}>
              Thank you for browsing your collection
            </p>
            <p style={{
              color: '#a67c52',
              fontSize: '14px',
              marginTop: '30px'
            }}>
              Your collection contains {items.length} precious item{items.length !== 1 ? 's' : ''}
            </p>
            <p style={{
              color: '#b89b72',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              Across {itemPages.length} page{itemPages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}