import { GitHubCommit } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

interface RecentCommitsProps {
  commits: GitHubCommit[];
}

export default function RecentCommits({ commits }: RecentCommitsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Commits</h3>
      <div className="space-y-3">
        {commits.slice(0, 10).map((commit) => (
          <div
            key={commit.sha}
            className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start space-x-3">
              {commit.author && (
                <Image
                  src={commit.author.avatar_url}
                  alt={commit.author.login}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {commit.commit.message.split('\n')[0]}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {commit.author?.login || commit.commit.author.name}
                  </p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(parseISO(commit.commit.author.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
