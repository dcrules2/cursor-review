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

export async function getRecentCommits(owner: string, repo: string, limit: number = 10, since?: string): Promise<GitHubCommit[]> {
  let endpoint = `/repos/${owner}/${repo}/commits?per_page=${limit}`;
  if (since) {
    endpoint += `&since=${since}`;
  }
  return fetchGitHubAPI(endpoint);
}

export async function getCommitsLast30Days(owner: string, repo: string): Promise<GitHubCommit[]> {
  // Calculate date 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const since = thirtyDaysAgo.toISOString();
  
  // Fetch commits from last 30 days (GitHub API allows up to 100 per page)
  // We'll fetch multiple pages if needed to get all commits
  const allCommits: GitHubCommit[] = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const commits = await fetchGitHubAPI(
      `/repos/${owner}/${repo}/commits?per_page=${perPage}&page=${page}&since=${since}`
    );
    
    if (!commits || commits.length === 0) {
      break;
    }
    
    allCommits.push(...commits);
    
    // Stop if we got fewer than perPage results (last page)
    if (commits.length < perPage) {
      break;
    }
    
    // Stop if we've fetched enough (safety limit)
    if (allCommits.length >= 1000) {
      break;
    }
    
    page++;
  }
  
  // Filter to only include commits up to today
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  return allCommits.filter(commit => {
    const commitDate = new Date(commit.commit.author.date);
    return commitDate <= today;
  });
}

export async function getRepositoryStats(owner: string, repo: string, includeLast30Days: boolean = false): Promise<GitHubStats> {
  try {
    const [repository, contributors, languages, recentCommits] = await Promise.all([
      getRepository(owner, repo),
      getContributors(owner, repo),
      getLanguages(owner, repo),
      includeLast30Days 
        ? getCommitsLast30Days(owner, repo)
        : getRecentCommits(owner, repo, 10),
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
