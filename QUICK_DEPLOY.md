# Quick Deploy Guide 🚀

## For Your Group Members

### Backend (Railway) - 5 minutes

1. **Sign up/Login**: Go to [railway.app](https://railway.app)
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Add Database**: Click "+ New" → "Database" → "PostgreSQL"
4. **Set Variables**: 
   - Click your web service → "Variables" tab
   - Add: `FLASK_ENV` = `production`
5. **Get URL**: Settings → "Generate Domain" → Copy the URL
6. **Run Migrations** (Important!):
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and link
   railway login
   railway link
   
   # Run migrations
   railway run flask db upgrade head
   
   # Seed database (optional)
   railway run python server/seed.py
   ```

### Frontend (Vercel) - 3 minutes

1. **Sign up/Login**: Go to [vercel.com](https://vercel.com)
2. **New Project**: Click "Add New Project" → Import your GitHub repo
3. **Configure**:
   - Framework: Create React App
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variable**:
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = (your Railway URL from above)
5. **Deploy**: Click Deploy!

### Final Step

Go back to Railway → Your service → Variables → Update:
- `FRONTEND_URL` = (your Vercel URL)

## Done! 🎉

Test your app at your Vercel URL!

---

## Troubleshooting

**"No such table" error?**
- You forgot to run migrations! See Backend step 6

**Frontend not loading data?**
- Check `REACT_APP_API_URL` is set in Vercel
- Make sure Railway URL doesn't have a trailing slash

**CORS errors?**
- Update `FRONTEND_URL` in Railway with your exact Vercel URL

---

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)
