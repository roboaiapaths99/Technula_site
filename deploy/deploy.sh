#!/bin/bash
# =========================================================
# Automated Deployment Script for Technula (VPS Production)
# Target Domain: technula.com | Target Port: 5005
# =========================================================

set -e # Exit immediately if any command fails

echo "🚀 Starting Technula Production Deployment..."

# Automatically detect project directory (or set custom path)
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$APP_DIR"
echo "📂 Project Directory: $APP_DIR"

# 1. Pull latest changes from git
echo "📦 Pulling latest code from Git..."
git pull origin main

# 2. Build Client Frontend
echo "⚡ Building Client Frontend..."
cd "$APP_DIR/client"
npm install
npm run build

# 3. Install & Update Backend Dependencies
echo "🔧 Setting up Backend..."
cd "$APP_DIR/server"
npm install

# 4. Reload PM2 Process Manager (Port 5005)
echo "🔄 Reloading PM2 Backend Server..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# 5. Test and Reload Nginx
echo "🌐 Reloading Nginx Web Server..."
sudo nginx -t
sudo systemctl reload nginx

echo "✅ Technula Website Successfully Deployed to https://technula.com!"
