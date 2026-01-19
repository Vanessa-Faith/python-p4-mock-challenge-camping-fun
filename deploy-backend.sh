#!/bin/bash

# Deploy Helper Script for Camping Fun App

echo "🏕️  Camping Fun Deployment Helper"
echo "=================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "❌ Railway CLI not found!"
    echo "Install it with: npm install -g @railway/cli"
    echo ""
    read -p "Install Railway CLI now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        npm install -g @railway/cli
    else
        echo "Please install Railway CLI manually and run this script again."
        exit 1
    fi
fi

# Check if logged in to Railway
echo "Checking Railway login status..."
if ! railway whoami &> /dev/null
then
    echo "❌ Not logged in to Railway"
    echo "Logging in now..."
    railway login
fi

# Link to project
echo ""
echo "Linking to your Railway project..."
railway link

# Run migrations
echo ""
echo "Running database migrations..."
railway run flask db upgrade head

# Ask about seeding
echo ""
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Seeding database..."
    railway run python server/seed.py
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Get your Railway URL from the dashboard"
echo "2. Deploy frontend to Vercel"
echo "3. Set REACT_APP_API_URL in Vercel to your Railway URL"
echo "4. Update FRONTEND_URL in Railway to your Vercel URL"
echo ""
echo "See QUICK_DEPLOY.md for detailed instructions!"
