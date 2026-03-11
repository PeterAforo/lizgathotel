#!/bin/bash
# ===========================================
# LIZGAT Hotel — Server Deployment Script
# ===========================================
# This script runs on your Namecheap server after code is pushed.
# It pulls the latest code, installs deps, builds, and restarts.

set -e

APP_DIR="$HOME/lizgathotel"
NODE_ENV_PATH="$HOME/nodevenv/lizgathotel/20/bin/activate"

echo "=== Deploying Lizgat Hotel ==="
echo "$(date)"

# Enter app directory
cd "$APP_DIR"

# Activate Node.js virtual environment
if [ -f "$NODE_ENV_PATH" ]; then
  source "$NODE_ENV_PATH"
fi

# Pull latest code
echo ">> Pulling latest changes..."
git pull origin main

# Install dependencies
echo ">> Installing dependencies..."
npm ci --production=false

# Generate Prisma client
echo ">> Generating Prisma client..."
npx prisma generate

# Run database migrations (safe — won't drop data)
echo ">> Pushing database schema..."
npx prisma db push --accept-data-loss=false

# Build the app
echo ">> Building Next.js app..."
npx next build

# Copy standalone output
echo ">> Preparing standalone files..."
cp -r .next/standalone/* .
cp -r .next/static .next/static

# Restart the app via Passenger
echo ">> Restarting application..."
mkdir -p tmp
touch tmp/restart.txt

echo "=== Deployment complete! ==="
echo "$(date)"
