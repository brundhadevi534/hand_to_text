import React, { useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import TextDisplay from './components/TextDisplay';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError('');
    setExtractedText('');
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Send to backend
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5000/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setExtractedText(data.text);
      } else {
        setError(data.error || 'Failed to extract text');
      }
    } catch (err) {
      setError('Error uploading image. Make sure the backend is running on port 5000.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setExtractedText('');
    setError('');
    setUploadedImage(null);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted_text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✍️ Handwritten to Digital Text</h1>
        <p>Convert your handwritten notes into clean digital text using AI-powered OCR</p>
      </header>

      <main className="App-main">
        <div className="container">
          <div className="upload-section">
            <ImageUploader onImageUpload={handleImageUpload} disabled={loading} />
            {error && <div className="error-message">{error}</div>}
            {loading && <LoadingSpinner />}
          </div>

          {uploadedImage && (
            <div className="image-preview-section">
              <h3>Uploaded Image</h3>
              <img src={uploadedImage} alt="Uploaded" className="preview-image" />
            </div>
          )}

          {extractedText && (
            <div className="result-section">
              <h3>Extracted Text</h3>
              <TextDisplay text={extractedText} />
              <div className="action-buttons">
                <button onClick={handleCopyText} className="btn btn-secondary">
                  📋 Copy Text
                </button>
                <button onClick={handleDownloadText} className="btn btn-secondary">
                  💾 Download as TXT
                </button>
                <button onClick={handleClearAll} className="btn btn-danger">
                  🗑️ Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Built with Python, Tesseract OCR, Flask & React | v1.0.0</p>
      </footer>
    </div>
  );
}

export default App;
