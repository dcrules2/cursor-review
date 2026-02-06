import Image from 'next/image';
import { GitHubStats } from '@/lib/types';
import StatsCard from '@/components/dashboard/StatsCard';
import LanguageChart from '@/components/dashboard/LanguageChart';
import ContributorList from '@/components/dashboard/ContributorList';
import CommitActivity from '@/components/dashboard/CommitActivity';
import RecentCommits from '@/components/dashboard/RecentCommits';
import { format, parseISO } from 'date-fns';

async function getData(): Promise<GitHubStats> {
  // Try to load snapshot data first (saved during build)
  // This runs at build time, so we can use Node.js fs
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const snapshotPath = path.join(process.cwd(), 'data', 'snapshot.json');
      
      if (fs.existsSync(snapshotPath)) {
        const snapshotData = fs.readFileSync(snapshotPath, 'utf-8');
        const snapshot = JSON.parse(snapshotData);
        console.log(`Using snapshot data from ${snapshot.snapshotInfo?.generatedAt || 'unknown date'}`);
        return snapshot;
      }
    } catch (error) {
      console.warn('Could not load snapshot, falling back to API:', error);
    }
  }
  
  // Fallback: fetch directly from GitHub API at build time
  // This should only happen if snapshot doesn't exist
  const { getRepositoryStats } = await import('@/lib/github');
  return getRepositoryStats('OpenHands', 'OpenHands', true);
}

export default async function Home() {
  let data: GitHubStats | null = null;
  let error: string | null = null;

  try {
    data = await getData();
  } catch (e: any) {
    error = e.message || 'Failed to load data';
    console.error('Failed to fetch GitHub data:', e);
    // Don't throw - return error UI instead to allow build to succeed
  }

  // Show error UI if data fetch failed
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-2">Error Loading Dashboard</h1>
            <p className="text-red-700 dark:text-red-300">{error || 'Failed to load repository data'}</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-4">
              For GitHub Actions: Make sure TOKEN secret is set in repository settings
            </p>
            <p className="text-sm text-red-600 dark:text-red-400">
              For local development: Make sure TOKEN or GITHUB_TOKEN is set in .env.local file
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Setup instructions:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Go to: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Settings → Secrets and variables → Actions</code></li>
                <li>Add a secret named <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">TOKEN</code></li>
                <li>Value: Your GitHub Personal Access Token</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { repository, contributors, languages, recentCommits } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {repository.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {repository.description || 'No description available'}
              </p>
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                View on GitHub →
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Stars"
            value={repository.stargazers_count.toLocaleString()}
            icon="⭐"
          />
          <StatsCard
            title="Forks"
            value={repository.forks_count.toLocaleString()}
            icon="🍴"
          />
          <StatsCard
            title="Open Issues"
            value={repository.open_issues_count.toLocaleString()}
            icon="📝"
          />
          <StatsCard
            title="Language"
            value={repository.language || 'N/A'}
            icon="💻"
          />
        </div>

        {/* Repository Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Repository Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                <span className="text-gray-900 dark:text-white">
                  {format(parseISO(repository.created_at), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                <span className="text-gray-900 dark:text-white">
                  {format(parseISO(repository.updated_at), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Default Branch:</span>
                <span className="text-gray-900 dark:text-white">{repository.default_branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Owner:</span>
                <a
                  href={repository.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {repository.owner.login}
                </a>
              </div>
            </div>
          </div>
          <ContributorList contributors={contributors} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LanguageChart languages={languages} />
          <CommitActivity commits={recentCommits} />
        </div>

        {/* Recent Commits */}
        <RecentCommits commits={recentCommits} />
      </div>
    </div>
  );
}
