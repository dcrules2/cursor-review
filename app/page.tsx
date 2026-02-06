import Image from 'next/image';
import { GitHubStats } from '@/lib/types';
import StatsCard from '@/components/dashboard/StatsCard';
import LanguageChart from '@/components/dashboard/LanguageChart';
import ContributorList from '@/components/dashboard/ContributorList';
import CommitActivity from '@/components/dashboard/CommitActivity';
import RecentCommits from '@/components/dashboard/RecentCommits';
import { format, parseISO } from 'date-fns';

async function getData(): Promise<GitHubStats> {
  // For static export, fetch directly from GitHub API at build time
  const { getRepositoryStats } = await import('@/lib/github');
  return getRepositoryStats('OpenHands', 'OpenHands');
}

export default async function Home() {
  let data: GitHubStats;
  let error: string | null = null;

  try {
    data = await getData();
  } catch (e: any) {
    error = e.message || 'Failed to load data';
    // Return error UI
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-2">Error Loading Dashboard</h1>
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-4">
              Make sure your TOKEN or GITHUB_TOKEN is set in .env.local file
            </p>
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
