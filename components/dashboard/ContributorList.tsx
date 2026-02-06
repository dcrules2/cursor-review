import { GitHubContributor } from '@/lib/types';
import Image from 'next/image';

interface ContributorListProps {
  contributors: GitHubContributor[];
}

export default function ContributorList({ contributors }: ContributorListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Contributors</h3>
      <div className="space-y-3">
        {contributors.slice(0, 10).map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Image
              src={contributor.avatar_url}
              alt={contributor.login}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{contributor.login}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {contributor.contributions.toLocaleString()} contributions
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
