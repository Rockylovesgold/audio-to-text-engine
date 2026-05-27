@echo off
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║       RockMount Voice Engine - Automatic Setup                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
echo Checking for Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo (Download the LTS version)
    echo.
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%

REM Check if npm is installed
echo Checking for npm installation...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: npm is not installed or not in PATH
    echo.
    pause
    exit /b 1
)

REM Get npm version
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm found: %NPM_VERSION%

REM Check if Python is installed
echo Checking for Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Python is not installed or not in PATH
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo (Make sure to check "Add Python to PATH" during installation)
    echo.
    pause
    exit /b 1
)

REM Get Python version
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i
echo ✓ Python found: %PYTHON_VERSION%

REM Install npm dependencies
echo.
echo Installing npm dependencies... this may take 2-3 minutes
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: npm install failed
    echo.
    pause
    exit /b 1
)
echo ✓ npm dependencies installed

REM Install Python dependencies
echo.
echo Installing Python dependencies...
call python -m pip install faster-whisper -q
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Warning: Python dependency installation had issues
    echo   But setup will continue. You may need to run:
    echo   python -m pip install faster-whisper
    echo.
)
echo ✓ Python dependencies ready

REM Check if .env.local exists
if not exist ".env.local" (
    echo.
    echo Creating .env.local file...
    (
        echo NVIDIA_API_KEY=your_nvidia_api_key_here
    ) > .env.local
    echo ✓ Created .env.local with template
    echo.
    echo NOTE: Update .env.local with your actual API key if using NVIDIA endpoints
) else (
    echo ✓ .env.local already exists
)

REM Create .next directory if it doesn't exist
if not exist ".next" (
    mkdir .next
)

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                  ✓ Setup Complete!                            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Run START.bat to launch the application
echo   2. Open http://localhost:4000 in your browser
echo   3. Upload an audio file to test
echo.
pause
