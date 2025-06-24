#!/bin/bash

# Function to cleanup background processes
cleanup() {
    echo "Stopping servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "Starting Movie Discovery Web Application..."
echo "========================================"

# Start frontend development server
echo "Starting frontend server..."
(cd frontend && npm run dev) &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 2

# Start backend server
echo "Starting backend server..."
(cd backend && go run main.go) &
BACKEND_PID=$!

echo ""
echo "Servers started successfully!"
echo "Frontend: http://localhost:5173 (or next available port)"
echo "Backend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait