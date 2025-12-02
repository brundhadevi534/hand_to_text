# ✍️ Handwritten to Digital Text Converter

Convert your handwritten notes into clean, editable digital text using AI-powered Tesseract OCR technology.

## 🌟 Features

- **📸 Easy Image Upload**: Drag & drop or click to upload handwritten images
- **🤖 AI-Powered OCR**: Uses Tesseract OCR for accurate text extraction
- **✏️ Text Editing**: Edit extracted text directly in the interface
- **📊 Text Statistics**: Track word count, character count, and line count
- **📋 Copy & Download**: Copy text to clipboard or download as .txt file
- **🎨 Beautiful UI**: Modern, responsive interface built with React
- **🔄 Live Feedback**: Real-time processing with loading indicators

## 🛠️ Tech Stack

**Backend:**
- Python 3.8+
- Flask (Web Framework)
- Tesseract OCR (Text Recognition)
- Pillow (Image Processing)
- CORS Support

**Frontend:**
- React 18.2.0
- CSS3 (Styling)
- Modern ES6+ JavaScript
- Responsive Design

## 📋 Prerequisites

Before running the project, ensure you have installed:

### System Requirements
1. **Python 3.8 or higher** - [Download](https://www.python.org/downloads/)
2. **Node.js & npm** - [Download](https://nodejs.org/)
3. **Tesseract OCR** - Required for text extraction

### Installing Tesseract OCR

#### Windows
1. Download the installer from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run the installer and follow the prompts
3. Default installation path: `C:\Program Files\Tesseract-OCR`
4. The application will detect it automatically, or set the path in `app.py` if needed

#### macOS
```bash
brew install tesseract
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get install tesseract-ocr
```

#### Linux (Fedora/RHEL)
```bash
sudo yum install tesseract
```

## 🚀 Quick Start

### Step 1: Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Create virtual environment (macOS/Linux)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

If Tesseract is not in the default path, update `app.py`:
```python
import pytesseract
pytesseract.pytesseract.pytesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

Start the backend server:
```bash
python app.py
```

The server will run on `http://localhost:5000`

### Step 2: Set Up Frontend

In a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## 📖 API Documentation

### Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `{ "status": "healthy" }`

### Extract Text
- **Endpoint**: `POST /api/extract-text`
- **Content-Type**: `multipart/form-data`
- **Parameter**: `image` (file)
- **Response**:
```json
{
  "success": true,
  "text": "Extracted text from image",
  "filename": "upload_name.jpg",
  "message": "Text extracted successfully"
}
```

### Extract Text with Language Support
- **Endpoint**: `POST /api/extract-text-with-language`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `image` (file)
  - `language` (optional, e.g., 'eng', 'deu', 'fra')
- **Response**: Same as above

#### Supported Languages
Common language codes:
- `eng` - English
- `deu` - German
- `fra` - French
- `spa` - Spanish
- `ita` - Italian
- `por` - Portuguese
- `rus` - Russian
- `jpn` - Japanese
- `chi_sim` - Chinese (Simplified)
- `chi_tra` - Chinese (Traditional)

For a complete list, see Tesseract documentation.

## 📁 Project Structure

```
hand_to_text/
├── backend/
│   ├── app.py                 # Flask application & OCR logic
│   ├── requirements.txt        # Python dependencies
│   └── uploads/              # Temporary image storage
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ImageUploader.js
│   │   │   ├── TextDisplay.js
│   │   │   └── LoadingSpinner.js
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styles
│   │   ├── index.js          # React entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── package.json          # Node dependencies
│   └── .gitignore
│
└── README.md                 # This file
```

## 🎯 Usage

1. **Open the Application**: Navigate to `http://localhost:3000`
2. **Upload Image**: 
   - Drag and drop a handwritten image, or
   - Click the upload area to select a file
3. **Wait for Processing**: OCR will process the image (takes 5-30 seconds depending on image quality)
4. **View Results**: Extracted text will appear in the results section
5. **Edit if Needed**: Click "Edit Text" to make corrections
6. **Save/Download**: 
   - Click "Copy Text" to copy to clipboard
   - Click "Download as TXT" to save as a text file
7. **Clear**: Click "Clear All" to start over

## 🖼️ Supported Image Formats

- PNG
- JPG/JPEG
- GIF
- BMP
- TIFF

Maximum file size: 16MB

## ⚙️ Configuration

### Backend Configuration (app.py)

```python
# Upload folder
UPLOAD_FOLDER = 'uploads'

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'}

# Maximum file size (16MB)
MAX_FILE_SIZE = 16 * 1024 * 1024

# Flask settings
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Frontend Configuration

The frontend is configured to communicate with the backend at `http://localhost:5000` (set in `package.json` proxy).

To change the backend URL in production, modify the API calls in `App.js`:
```javascript
const response = await fetch('http://your-backend-url/api/extract-text', {...})
```

## 🔧 Troubleshooting

### Issue: "Module 'pytesseract' not found"
**Solution**: Ensure Tesseract OCR is installed and Python dependencies are installed
```bash
pip install -r requirements.txt
```

### Issue: "Tesseract is not installed"
**Solution**: Install Tesseract OCR for your operating system (see Prerequisites section)

### Issue: CORS errors in browser console
**Solution**: Ensure the backend is running on port 5000 and has CORS enabled

### Issue: "Cannot connect to backend"
**Solution**: 
1. Verify backend is running: `python app.py`
2. Check if port 5000 is in use: `netstat -ano | findstr :5000` (Windows)
3. Try restarting the backend server

### Issue: Poor OCR accuracy
**Solutions**:
- Use high-resolution images (300+ DPI)
- Ensure good lighting and minimal shadows
- Provide clear, legible handwriting
- Try cropping to focus on text area only

## 🚀 Building for Production

### Backend
```bash
# Create production-ready build
# Remove debug mode in app.py:
# app.run(debug=False, host='0.0.0.0', port=5000)

# Use production WSGI server (e.g., Gunicorn)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
cd frontend
npm run build
# Build output in frontend/build/
```

## 📝 Future Enhancements

- [ ] Multi-language support in UI
- [ ] Batch image processing
- [ ] Handwriting style training
- [ ] Cloud storage integration
- [ ] Export to PDF
- [ ] Undo/Redo functionality
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Database for history
- [ ] User authentication

## 📄 License

This project is open source and available for educational and commercial use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the API Documentation
3. Check Tesseract OCR documentation: https://github.com/UB-Mannheim/tesseract/wiki

## 🎓 Learning Resources

- [Tesseract OCR Documentation](https://github.com/madmaze/pytesseract)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Pillow (PIL) Documentation](https://pillow.readthedocs.io/)

---

**Made with ❤️ for converting handwritten notes to digital text**
