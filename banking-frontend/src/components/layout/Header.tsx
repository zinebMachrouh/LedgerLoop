import React from 'react';

interface HeaderProps {
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownload }) => {
  return (
    <div className="header">
      <div className="logo">
        <div className="logo-icon">
            <img src="/skypayme_logo.jpg" alt="Skypay Logo" />
        </div>
        <div className="logo-text">
          <h1>Skypay Banking</h1>
          <p>Manage your account</p>
        </div>
      </div>
      <button className="download-btn" onClick={onDownload}>
        <img src="/download.png" alt="Download Icon" />
        Download Statement
      </button>
    </div>
  );
};