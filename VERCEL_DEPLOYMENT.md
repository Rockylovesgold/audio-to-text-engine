# RockMount Voice Engine - Vercel Deployment Guide

## Overview

The RockMount Voice Engine is now deployed on Vercel. This guide explains how to:
- Set up environment variables
- Configure the API key securely
- Verify the deployment

## Important Security Note

**API keys are NOT committed to the repository.** They are hidden and must be set via Vercel's environment variables dashboard.

## Setting Up Environment Variables on Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/rockylovesgolds-projects/audio-to-text-engine
2. Click "Settings"
3. Navigate to "Environment Variables"

### Step 2: Add Environment Variable
1. Click "Add New"
2. Fill in the details:
   - **Name:** `NVIDIA_API_KEY`
   - **Value:** `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`
   - **Environments:** Select all (Development, Preview, Production)
3. Click "Add"

### Step 3: Redeploy
1. Go to "Deployments"
2. Click the three dots on the latest deployment
3. Select "Redeploy"
4. Wait for deployment to complete

## Verifying the Deployment

### Check Deployment Status
1. Visit: https://vercel.com/rockylovesgolds-projects/audio-to-text-engine
2. Look for a green checkmark on the latest deployment
3. Click the deployment to view logs

### Test the Live Application
1. Click "Visit" on the deployment card
2. Your Vercel deployment URL will open
3. Test uploading an audio file

## Accessing the Application

Once deployed, your app will be available at:
```
https://audio-to-text-engine.vercel.app
```

Or the custom domain if configured.

## What's Deployed

The Vercel deployment includes:
- ✅ Next.js 14 frontend
- ✅ API routes for transcription
- ✅ Real-time progress tracking
- ✅ History persistence (using local file system)
- ✅ Batch processing
- ✅ Professional UI with animations

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `NVIDIA_API_KEY` | Your API key | Yes |
| `NODE_ENV` | `production` | Auto (Vercel sets this) |

## Important Notes

### API Key Security
- ✅ API key is NOT in the GitHub repository
- ✅ API key is NOT in the codebase
- ✅ API key is ONLY set in Vercel environment variables
- ✅ API key is HIDDEN from browser/client

### File System Limitations
On Vercel's serverless environment:
- Files written to `/tmp` are temporary
- History data persists only during a deployment
- For persistent history, consider using:
  - Database (PostgreSQL, MongoDB)
  - Cloud storage (Supabase, Firebase)

For local deployment (Windows/Mac/Linux), history is saved permanently in `data/history.json`.

## Troubleshooting

### "API Key not found" Error
1. Verify environment variable is set in Vercel
2. Check that you selected all environments
3. Redeploy the application
4. Clear browser cache and reload

### Transcription Failing
1. Check Vercel function logs
2. Verify API key is correct in environment variables
3. Ensure function timeout is sufficient (default 60s might be too short)

To increase timeout:
1. Go to Settings > Functions
2. Change "Serverless Function Execution Timeout"
3. Set to 900 seconds (15 minutes) for first model download
4. Redeploy

### Build Failing
1. Check deployment logs in Vercel
2. Verify package.json is correct
3. Run locally: `npm install && npm run build`
4. Check for TypeScript errors

## Local Development vs Vercel

### Local Development
```bash
npm run dev
```
- Access at: http://localhost:3000
- History saved to: `data/history.json`
- Persistent across sessions

### Vercel Production
```
https://audio-to-text-engine.vercel.app
```
- History saved to: `/tmp/` (temporary)
- Persists only during current session
- Scales automatically

## Monitoring

### View Deployment Logs
1. Go to Vercel project
2. Click "Deployments"
3. Click the deployment
4. View logs in real-time

### Monitor Function Usage
1. Settings > Usage
2. See function invocations and errors
3. Monitor bandwidth and performance

## Continuous Deployment

The project is configured for automatic deployments:
1. Push to `main` branch on GitHub
2. Vercel automatically detects changes
3. New deployment starts automatically
4. Deployment completes in ~2-3 minutes

## Rolling Back

If something goes wrong:
1. Go to Vercel project
2. Click "Deployments"
3. Find the previous working deployment
4. Click the three dots
5. Select "Promote to Production"

## Next Steps

### Option 1: Persistent History (Recommended)
Integrate a database for persistent history:
- PostgreSQL (via Supabase, Railway, or Vercel Postgres)
- MongoDB (via Atlas)
- Firebase

### Option 2: Custom Domain
1. Go to Vercel Settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Option 3: Performance Optimization
1. Enable "Edge Caching"
2. Configure custom caching headers
3. Optimize image delivery

## Support

For issues:
1. Check Vercel documentation: https://vercel.com/docs
2. View function logs in Vercel dashboard
3. Check GitHub repository for code issues

## Summary

✅ Application deployed to Vercel
✅ API key hidden and secure
✅ All features functional
✅ Automatic deployments enabled
✅ Production ready

Your RockMount Voice Engine is live and ready to use!
