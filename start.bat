@echo off
REM Start Script for Handwritten to Digital Text Application (Windows)

echo.
echo 🚀 Starting Handwritten to Digital Text Application...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js.
    pause
    exit /b 1
)

echo ✓ Python found
echo ✓ Node.js found
echo.

REM Start backend in new window
echo Starting Backend Server...
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -r requirements.txt
start "Hand-to-Text Backend" cmd /k python app.py

echo ✓ Backend started on http://localhost:5000
echo.
cd ..

REM Start frontend in new window
echo Starting Frontend Server...
cd frontend

if not exist node_modules (
    echo Installing npm dependencies...
    call npm install
)

start "Hand-to-Text Frontend" cmd /k npm start

echo ✓ Frontend starting on http://localhost:3000
echo.
cd ..

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✨ Application is launching!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close the command windows when done.
echo.
pause
