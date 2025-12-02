# Handwritten Text to Digital Notes - Setup Guide

## ⚡ Quick Start (5 minutes)

### 1. Prerequisites Check
- [ ] Python 3.8+ installed
- [ ] Node.js & npm installed
- [ ] Tesseract OCR installed

### 2. Tesseract Installation (if not already installed)

**Windows:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run installer (default path works fine)

**macOS:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr  # Ubuntu/Debian
sudo yum install tesseract          # Fedora
```

### 3. Backend Setup (Terminal 1)
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

✅ Backend runs on: http://localhost:5000

### 4. Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start
```

✅ Frontend opens at: http://localhost:3000

## 🎯 Try It Out

1. Open http://localhost:3000 in your browser
2. Upload a handwritten image
3. Wait for OCR processing
4. Edit and download extracted text

## 📚 Full Documentation

See `README.md` in the root directory for complete documentation, API details, and troubleshooting.

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "pytesseract not found" | Run `pip install -r requirements.txt` in backend |
| "Cannot find tesseract" | Install Tesseract OCR for your OS |
| "Connection refused" | Make sure backend is running on port 5000 |
| "Port already in use" | Change port in `app.py` or `package.json` |

---

Happy converting! 📝✨
