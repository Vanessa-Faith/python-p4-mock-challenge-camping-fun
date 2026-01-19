# Deployment Guide

This guide will help you deploy the Camping Fun app with the backend on Railway and the frontend on Vercel.

## Prerequisites

- GitHub account
- Railway account (https://railway.app)
- Vercel account (https://vercel.com)
- Your code pushed to a GitHub repository

---

## Part 1: Deploy Backend to Railway

### Step 1: Create a New Project on Railway

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository

### Step 2: Configure the Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically provision a PostgreSQL database

### Step 3: Configure Environment Variables

1. Click on your **web service** (not the database)
2. Go to the **"Variables"** tab
3. Add the following variables:
   - `FLASK_ENV` = `production`
   - `FRONTEND_URL` = (leave empty for now, will update after deploying frontend)

Railway will automatically set `DATABASE_URL` from the PostgreSQL database.

### Step 4: Deploy

1. Railway will automatically detect the `Procfile` and deploy
2. Wait for the deployment to complete
3. Click **"Settings"** → **"Generate Domain"** to get your backend URL
4. Copy this URL (e.g., `https://your-app-name.up.railway.app`)

### Step 5: Run Database Migrations

1. In Railway, go to your web service
2. Click on **"Deployments"** tab
3. Find the most recent deployment and click the three dots (⋯)
4. Select **"View Logs"**
5. To run migrations, you need to use Railway CLI or add a migration command to your Procfile

**Option A: Update Procfile with migrations** (Recommended)
- The current Procfile will work, but you may need to run migrations manually once

**Option B: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run flask db upgrade head

# Seed the database (optional)
railway run python server/seed.py
```

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend Configuration

1. In your project root, update the environment variable example
2. Note your Railway backend URL from Part 1

### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Set Environment Variables

1. In the Vercel project settings, go to **"Environment Variables"**
2. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app-name.up.railway.app`)
   - **Environment**: Select all (Production, Preview, Development)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. You'll get a URL like `https://your-app.vercel.app`

### Step 5: Update Backend CORS

1. Go back to your Railway project
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Railway will automatically redeploy

---

## Testing Your Deployment

1. Visit your Vercel frontend URL
2. You should see the camping app
3. Try:
   - Viewing campers and activities
   - Adding a new camper
   - Deleting an activity
   - Creating a signup

---

## Troubleshooting

### Backend Issues

**Database Connection Error**
- Check that PostgreSQL is running in Railway
- Verify `DATABASE_URL` is set correctly
- Check deployment logs in Railway

**CORS Errors**
- Make sure `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Ensure `flask-cors` is installed (check `requirements.txt`)

**500 Server Errors**
- Check Railway logs for detailed error messages
- Ensure migrations have been run
- Verify all required packages are in `requirements.txt`

### Frontend Issues

**API Calls Failing**
- Verify `REACT_APP_API_URL` is set in Vercel
- Check that the URL doesn't have a trailing slash
- Open browser dev tools to see the actual requests being made

**Blank Page**
- Check Vercel build logs for errors
- Ensure the build directory is set to `build`
- Verify React app builds locally: `cd client && npm run build`

### Running Migrations on Railway

If you need to run migrations after deployment:

1. **Using Railway CLI**:
```bash
railway login
railway link
railway run flask db upgrade head
```

2. **Using Web Interface**: 
   - Not directly supported, but you can add a one-time script
   - Or use the CLI method above

---

## Alternative: Render.com for Backend

If you prefer Render instead of Railway:

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --chdir server app:app`
4. Add PostgreSQL database from Render dashboard
5. Set environment variables as above

---

## Local Development

To run locally after these changes:

**Backend:**
```bash
cd server
flask run
```

**Frontend:**
```bash
cd client
npm start
```

The proxy in `package.json` will handle API calls in development.

---

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL database added to Railway
- [ ] Backend deployed and domain generated
- [ ] Database migrations run on Railway
- [ ] Vercel project created with `client` as root
- [ ] `REACT_APP_API_URL` set in Vercel
- [ ] Frontend deployed successfully
- [ ] `FRONTEND_URL` updated in Railway
- [ ] Test all features on production URLs

---

## Support

If you encounter issues, check:
1. Railway deployment logs
2. Vercel deployment logs  
3. Browser console for frontend errors
4. Network tab in browser dev tools for API calls
