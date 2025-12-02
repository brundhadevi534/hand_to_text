import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Extracting text from image...</p>
      <p className="spinner-subtitle">This may take a few moments</p>
    </div>
  );
}

export default LoadingSpinner;
