# GitHub Pages Deployment Troubleshooting

## Common Issues and Solutions

### 1. Check if GitHub Pages is Enabled

**Required Steps:**
1. Go to: https://github.com/dcrules2/cursor-review/settings/pages
2. Under "Source", make sure **"GitHub Actions"** is selected (NOT "Deploy from a branch")
3. If it's not set, select "GitHub Actions" and save

### 2. Check if TOKEN Secret is Set

**Required Steps:**
1. Go to: https://github.com/dcrules2/cursor-review/settings/secrets/actions
2. Verify there's a secret named **`TOKEN`** (not GITHUB_TOKEN)
3. If missing, create it:
   - Click "New repository secret"
   - Name: `TOKEN`
   - Value: Your GitHub Personal Access Token
   - Click "Add secret"

### 3. Check Workflow Run Status

1. Go to: https://github.com/dcrules2/cursor-review/actions
2. Click on the latest workflow run
3. Check if it completed successfully (green checkmark)
4. If it failed (red X), click on it to see error details

### 4. Common Workflow Errors

**Error: "GITHUB_TOKEN is not set"**
- Solution: Make sure the `TOKEN` secret is created in repository settings

**Error: "Build failed"**
- Check the build logs for specific errors
- Common issues:
  - Missing dependencies
  - TypeScript errors
  - Environment variable issues

**Error: "Deployment failed"**
- Make sure GitHub Pages source is set to "GitHub Actions"
- Check repository permissions

### 5. Verify Deployment

After a successful workflow run:
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit: https://dcrules2.github.io/cursor-review/
3. If you see a 404, check:
   - The workflow completed successfully
   - GitHub Pages is enabled with "GitHub Actions" as source
   - The repository is public (or you have GitHub Pro/Enterprise)

### 6. Manual Verification

Check if the `out` directory was created in the build:
- The workflow should create an `out/` directory with static files
- If missing, the build step failed

### 7. Force Re-deploy

If deployment seems stuck:
1. Go to: https://github.com/dcrules2/cursor-review/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button (top right)
4. Select "main" branch
5. Click "Run workflow"

## Still Not Working?

1. Check the Actions tab for error messages
2. Verify all secrets are set correctly
3. Ensure GitHub Pages is enabled with "GitHub Actions" source
4. Make sure the repository is public (or you have GitHub Pro)
