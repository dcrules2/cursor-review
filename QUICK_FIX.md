# Quick Fix Checklist for GitHub Pages Deployment

## ⚠️ Most Common Issue: GitHub Pages Source Not Set

**CRITICAL STEP - Do this first:**

1. Go to: https://github.com/dcrules2/cursor-review/settings/pages
2. Look for "Source" section
3. **Select "GitHub Actions"** (NOT "Deploy from a branch")
4. Click "Save"

This is the #1 reason deployments don't work!

## ✅ Complete Setup Checklist

### Step 1: Enable GitHub Pages (CRITICAL)
- [ ] Go to: https://github.com/dcrules2/cursor-review/settings/pages
- [ ] Under "Source", select **"GitHub Actions"**
- [ ] Click "Save"

### Step 2: Add TOKEN Secret
- [ ] Go to: https://github.com/dcrules2/cursor-review/settings/secrets/actions
- [ ] Click "New repository secret"
- [ ] Name: `TOKEN` (exactly this, case-sensitive)
- [ ] Value: Your GitHub Personal Access Token
- [ ] Click "Add secret"

### Step 3: Check Workflow Status
- [ ] Go to: https://github.com/dcrules2/cursor-review/actions
- [ ] Find the latest "Deploy to GitHub Pages" run
- [ ] Check if it has a ✅ green checkmark or ❌ red X
- [ ] If ❌, click on it to see error details

### Step 4: Trigger Deployment
If workflow hasn't run or failed:
- [ ] Go to: https://github.com/dcrules2/cursor-review/actions
- [ ] Click "Deploy to GitHub Pages" workflow
- [ ] Click "Run workflow" (top right)
- [ ] Select "main" branch
- [ ] Click "Run workflow"

### Step 5: Wait and Verify
- [ ] Wait 1-2 minutes after workflow completes
- [ ] Visit: https://dcrules2.github.io/cursor-review/
- [ ] If 404, wait another minute and refresh

## 🔍 If Still Not Working

Check the workflow logs:
1. Go to: https://github.com/dcrules2/cursor-review/actions
2. Click the latest workflow run
3. Click on "build" job to see build logs
4. Click on "deploy" job to see deployment logs
5. Look for error messages (usually in red)

## 📝 Common Error Messages

**"GITHUB_TOKEN is not set"**
→ Add the `TOKEN` secret in repository settings

**"Build failed"**
→ Check build logs for specific errors (usually TypeScript or missing dependencies)

**"Deployment failed"**
→ Make sure GitHub Pages source is set to "GitHub Actions"

**404 Not Found**
→ Wait 2-3 minutes, GitHub Pages can take time to propagate
