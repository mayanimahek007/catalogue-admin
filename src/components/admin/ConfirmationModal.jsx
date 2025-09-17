import React from 'react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Yes, Delete", 
  cancelText = "Cancel",
  type = "danger" // "danger", "warning", "info"
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          icon: '⚠️',
          confirmBg: '#f39c12',
          confirmHover: '#e67e22'
        };
      case 'info':
        return {
          icon: 'ℹ️',
          confirmBg: '#3498db',
          confirmHover: '#2980b9'
        };
      default: // danger
        return {
          icon: '🗑️',
          confirmBg: '#e74c3c',
          confirmHover: '#c0392b'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        animation: 'modalSlideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '32px',
            marginRight: '15px'
          }}>
            {typeStyles.icon}
          </div>
          <h3 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2c3e50'
          }}>
            {title}
          </h3>
        </div>

        {/* Message */}
        <p style={{
          color: '#7f8c8d',
          lineHeight: '1.6',
          margin: '0 0 25px 0',
          fontSize: '16px'
        }}>
          {message}
        </p>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ecf0f1',
              color: '#2c3e50',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#d5dbdb';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ecf0f1';
            }}
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              backgroundColor: typeStyles.confirmBg,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = typeStyles.confirmHover;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = typeStyles.confirmBg;
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
