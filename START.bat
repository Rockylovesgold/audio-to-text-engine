@echo off
setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║       RockMount Voice Engine - Starting Server                 ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo ❌ ERROR: node_modules not found
    echo.
    echo Please run SETUP.bat first to install dependencies
    echo.
    pause
    exit /b 1
)

REM Check if package.json exists
if not exist "package.json" (
    echo.
    echo ❌ ERROR: package.json not found
    echo.
    echo This doesn't appear to be a valid RockMount Voice Engine directory
    echo.
    pause
    exit /b 1
)

echo Launching development server...
echo.
echo Server will be available at: http://localhost:4000
echo.
echo Press Ctrl+C to stop the server
echo.
pause

REM Start the dev server
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Failed to start dev server
    echo.
    pause
    exit /b 1
)
