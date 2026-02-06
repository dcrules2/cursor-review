import { GitHubRepository, GitHubContributor, GitHubCommit, GitHubLanguageStats, GitHubStats } from './types';

const GITHUB_API_BASE = 'https://api.github.com';

async function fetchGitHubAPI(endpoint: string): Promise<any> {
  const token = process.env.GITHUB_TOKEN || process.env.TOKEN;
  
  if (!token) {
    throw new Error('GITHUB_TOKEN or TOKEN is not set in environment variables');
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Dashboard',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`GitHub API error: ${response.status} - ${error.message || response.statusText}`);
  }

  return response.json();
}

export async function getRepository(owner: string, repo: string): Promise<GitHubRepository> {
  return fetchGitHubAPI(`/repos/${owner}/${repo}`);
}

export async function getContributors(owner: string, repo: string): Promise<GitHubContributor[]> {
  return fetchGitHubAPI(`/repos/${owner}/${repo}/contributors?per_page=10`);
}

export async function getLanguages(owner: string, repo: string): Promise<GitHubLanguageStats> {
  return fetchGitHubAPI(`/repos/${owner}/${repo}/languages`);
}

export async function getRecentCommits(owner: string, repo: string, limit: number = 10): Promise<GitHubCommit[]> {
  return fetchGitHubAPI(`/repos/${owner}/${repo}/commits?per_page=${limit}`);
}

export async function getRepositoryStats(owner: string, repo: string): Promise<GitHubStats> {
  try {
    const [repository, contributors, languages, recentCommits] = await Promise.all([
      getRepository(owner, repo),
      getContributors(owner, repo),
      getLanguages(owner, repo),
      getRecentCommits(owner, repo, 10),
    ]);

    return {
      repository,
      contributors,
      languages,
      recentCommits,
    };
  } catch (error) {
    console.error('Error fetching repository stats:', error);
    throw error;
  }
}
