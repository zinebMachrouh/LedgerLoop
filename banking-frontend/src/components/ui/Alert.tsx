import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const icons = {
    success: '✅',
    error: '⚠️',
    info: 'ℹ️'
  };

  const titles = {
    success: 'Success',
    error: 'Error',
    info: 'Info'
  };

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-icon">{icons[type]}</div>
      <div className="alert-content">
        <div className="alert-title">{titles[type]}</div>
        <div className="alert-message">{message}</div>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>×</button>
      )}
    </div>
  );
};