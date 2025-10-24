#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 LLM Text Generator - Setup${NC}"
echo ""

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker found${NC}"
    echo ""
    echo "Starting with Docker Compose..."
    docker-compose up
else
    echo -e "${BLUE}Docker not found. Starting manual setup...${NC}"
    echo ""
    
    # Setup backend
    echo -e "${BLUE}Setting up backend...${NC}"
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -q -r requirements.txt
    
    # Setup frontend
    echo -e "${BLUE}Setting up frontend...${NC}"
    cd frontend
    if [ ! -d "node_modules" ]; then
        npm install -q
    fi
    cd ..
    
    # Start services
    echo ""
    echo -e "${GREEN}Starting services...${NC}"
    echo -e "${BLUE}Backend on http://localhost:8000${NC}"
    echo -e "${BLUE}Frontend on http://localhost:5173${NC}"
    echo ""
    
    # Start backend in background
    python server.py &
    BACKEND_PID=$!
    
    # Start frontend
    cd frontend
    npm run dev
    
    # Cleanup on exit
    trap "kill $BACKEND_PID" EXIT
fi
