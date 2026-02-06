# GitHub Dashboard

A Next.js dashboard for visualizing GitHub repository data. This dashboard displays statistics, charts, and insights for the OpenHands/OpenHands repository.

## Features

- 📊 Repository statistics (stars, forks, issues)
- 📈 Language distribution charts
- 👥 Top contributors list
- 📝 Recent commit activity
- 🎨 Modern, responsive UI with dark mode support

## Setup

### Prerequisites

- Node.js 18+ installed
- A GitHub Personal Access Token

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

3. Add your GitHub Personal Access Token to `.env.local`:
```
TOKEN=your_token_here
```
Note: You can also use `GITHUB_TOKEN` for local development, but GitHub Actions secrets must use `TOKEN` (cannot start with GITHUB).

### GitHub Token Permissions

Your GitHub Personal Access Token needs the following permissions:
- ✅ **public_repo** - Access public repositories (required for fetching public repo data)

To create a token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "GitHub Dashboard")
4. Select the `public_repo` scope
5. Click "Generate token"
6. Copy the token and add it to your `.env.local` file

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The static files will be generated in the `out` directory.

## Deployment to GitHub Pages

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings: `https://github.com/dcrules2/cursor-review/settings/pages`
   - Under "Source", select "GitHub Actions"

2. **Add GitHub Token Secret (for GitHub Actions):**
   - Go to: `https://github.com/dcrules2/cursor-review/settings/secrets/actions`
   - Click "New repository secret"
   - Name: `TOKEN` (Note: GitHub secrets cannot start with "GITHUB")
   - Value: Your GitHub Personal Access Token (same one used locally)
   - Click "Add secret"

3. **Push to main branch:**
   - The GitHub Action will automatically build and deploy your site
   - Your dashboard will be available at: `https://dcrules2.github.io/cursor-review/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the static site
npm run build

# The out/ directory contains the static files
# You can push the out/ directory to the gh-pages branch
```

### Static Export Note

This project uses Next.js static export for GitHub Pages. Data is fetched directly from GitHub API at build time. API routes are not used in this configuration.

## Project Structure

```
├── app/
│   ├── page.tsx        # Main dashboard page
│   └── layout.tsx      # Root layout
├── components/
│   └── dashboard/      # Dashboard components
├── lib/
│   ├── github.ts       # GitHub API client
│   └── types.ts        # TypeScript types
└── public/             # Static assets
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **date-fns** - Date formatting

## License

MIT
