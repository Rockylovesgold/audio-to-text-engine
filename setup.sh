#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║       RockMount Voice Engine - Automatic Setup (Mac/Linux)     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking for Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ ERROR: Node.js is not installed${NC}"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "(Download the LTS version for Mac)"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js found: $NODE_VERSION${NC}"

# Check if npm is installed
echo "Checking for npm installation..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ ERROR: npm is not installed${NC}"
    echo ""
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ npm found: $NPM_VERSION${NC}"

# Check if Python is installed
echo "Checking for Python installation..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ ERROR: Python 3 is not installed${NC}"
    echo ""
    echo "Please install Python from: https://www.python.org/"
    echo "Or use Homebrew: brew install python3"
    echo ""
    exit 1
fi

PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}✓ Python found: $PYTHON_VERSION${NC}"

# Install npm dependencies
echo ""
echo "Installing npm dependencies... this may take 2-3 minutes"
echo ""
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ERROR: npm install failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm dependencies installed${NC}"

# Install Python dependencies
echo ""
echo "Installing Python dependencies..."
python3 -m pip install faster-whisper -q
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Warning: Python dependency installation had issues${NC}"
    echo "   But setup will continue. You may need to run:"
    echo "   python3 -m pip install faster-whisper"
    echo ""
fi
echo -e "${GREEN}✓ Python dependencies ready${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "Creating .env.local file..."
    cat > .env.local << 'EOF'
# RockMount Voice Engine - Environment Configuration

# NVIDIA API Key - Free tier for Parakeet/Nemotron ASR models
# Get your key from: https://build.nvidia.com
NVIDIA_API_KEY=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

# Application Port (optional)
# Change this if port 4000 is already in use
# PORT=4000

# Environment Mode
NODE_ENV=development
EOF
    echo -e "${GREEN}✓ Created .env.local with configuration${NC}"
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

# Create .next directory if it doesn't exist
if [ ! -d ".next" ]; then
    mkdir -p .next
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  ✓ Setup Complete!                            ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "  1. Run: ./start.sh"
echo "  2. Open http://localhost:4000 in your browser"
echo "  3. Upload an audio file to test"
echo ""
