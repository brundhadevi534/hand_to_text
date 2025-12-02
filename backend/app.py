from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import os
from werkzeug.utils import secure_filename
import logging
from pathlib import Path
import platform
import traceback

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

# Ensure upload folder exists
Path(UPLOAD_FOLDER).mkdir(exist_ok=True)

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Try to auto-detect Tesseract on Windows and log status
if platform.system() == 'Windows':
    possible = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    if os.path.exists(possible):
        pytesseract.pytesseract.tesseract_cmd = possible
        logger.info(f"Using Tesseract at: {possible}")
    else:
        logger.warning("Tesseract executable not found at default path. If OCR fails, set pytesseract.pytesseract.tesseract_cmd to your tesseract.exe path.")


@app.before_request
def log_request_info():
    logger.info(f"Incoming request: {request.method} {request.path} from {request.remote_addr}")
    # don't log body for multipart files here

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    """Preprocess image for better OCR results"""
    try:
        img = Image.open(image_path)
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        # Enhance contrast for better OCR
        return img
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        logger.debug(traceback.format_exc())
        return None

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/extract-text', methods=['POST'])
def extract_text():
    """
    Extract text from uploaded handwritten image using Tesseract OCR
    """
    try:
        # Check if file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': f'File type not allowed. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        logger.info(f"File uploaded: {filename}")
        
        # Preprocess image
        img = preprocess_image(filepath)
        if img is None:
            return jsonify({'error': 'Failed to process image'}), 400
        
        # Extract text using Tesseract
        try:
            extracted_text = pytesseract.image_to_string(img)
        except Exception as ocr_e:
            logger.error(f"Tesseract OCR error: {ocr_e}")
            logger.debug(traceback.format_exc())
            return jsonify({'error': 'OCR engine error. Check Tesseract installation.'}), 500
        
        if not extracted_text.strip():
            return jsonify({'error': 'No text found in image'}), 400
        
        # Clean up uploaded file
        try:
            os.remove(filepath)
        except Exception as e:
            logger.warning(f"Could not delete uploaded file: {e}")
        
        return jsonify({
            'success': True,
            'text': extracted_text.strip(),
            'filename': filename,
            'message': 'Text extracted successfully'
        }), 200
    
    except Exception as e:
        logger.error(f"Error extracting text: {e}")
        logger.debug(traceback.format_exc())
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/extract-text-with-language', methods=['POST'])
def extract_text_with_language():
    """
    Extract text from image with language specification
    Supports multiple languages via language code (e.g., 'eng', 'deu', 'fra')
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        language = request.form.get('language', 'eng')  # Default to English
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        logger.info(f"File uploaded: {filename} with language: {language}")
        
        # Preprocess image
        img = preprocess_image(filepath)
        if img is None:
            return jsonify({'error': 'Failed to process image'}), 400
        
        # Extract text with language specification
        try:
            extracted_text = pytesseract.image_to_string(img, lang=language)
        except Exception as ocr_e:
            logger.error(f"Tesseract OCR error (lang={language}): {ocr_e}")
            logger.debug(traceback.format_exc())
            return jsonify({'error': 'OCR engine error. Check Tesseract installation and language packs.'}), 500
        
        if not extracted_text.strip():
            return jsonify({'error': 'No text found in image'}), 400
        
        # Clean up
        try:
            os.remove(filepath)
        except:
            pass
        
        return jsonify({
            'success': True,
            'text': extracted_text.strip(),
            'language': language,
            'message': 'Text extracted successfully'
        }), 200
    
    except Exception as e:
        logger.error(f"Error extracting text with language: {e}")
        logger.debug(traceback.format_exc())
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large error"""
    return jsonify({'error': f'File too large. Maximum size: {MAX_FILE_SIZE / (1024*1024):.0f}MB'}), 413

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
