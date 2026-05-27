#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║       RockMount Voice Engine - Starting Server                 ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${RED}❌ ERROR: node_modules not found${NC}"
    echo ""
    echo "Please run ./setup.sh first to install dependencies"
    echo ""
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ ERROR: package.json not found${NC}"
    echo ""
    echo "This doesn't appear to be a valid RockMount Voice Engine directory"
    echo ""
    exit 1
fi

echo "Launching development server..."
echo ""
echo "Server will be available at: http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the dev server
npm run dev

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ ERROR: Failed to start dev server${NC}"
    echo ""
    exit 1
fi
