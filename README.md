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
GITHUB_TOKEN=your_token_here
```

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
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the `GITHUB_TOKEN` environment variable in Vercel project settings
4. Deploy!

## Project Structure

```
├── app/
│   ├── api/github/     # API route handlers
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
