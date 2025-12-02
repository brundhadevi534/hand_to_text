import React, { useRef } from 'react';
import './ImageUploader.css';

function ImageUploader({ onImageUpload, disabled }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        onImageUpload(file);
      }
    }
  };

  const isValidFile = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff'];
    return allowedTypes.includes(file.type);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        onImageUpload(file);
      } else {
        alert('Please select a valid image file (PNG, JPG, GIF, BMP, TIFF)');
      }
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`image-uploader ${dragActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      
      <div className="upload-content">
        <div className="upload-icon">📸</div>
        <h3>Upload Your Handwritten Notes</h3>
        <p>Drag and drop an image here, or click to select</p>
        <p className="supported-formats">Supported: PNG, JPG, GIF, BMP, TIFF (Max 16MB)</p>
        <button className="upload-btn" disabled={disabled}>
          {disabled ? 'Processing...' : 'Choose Image'}
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
