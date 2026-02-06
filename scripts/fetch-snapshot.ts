import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getRepositoryStats } from '../lib/github';

async function fetchSnapshot() {
  console.log('Fetching GitHub repository snapshot data (last 30 days)...');
  
  try {
    // Fetch stats including last 30 days of commits
    const stats = await getRepositoryStats('OpenHands', 'OpenHands', true);
    
    // Calculate date range
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Add snapshot metadata
    const snapshot = {
      ...stats,
      snapshotDate: today.toISOString(),
      snapshotInfo: {
        generatedAt: today.toISOString(),
        repository: 'OpenHands/OpenHands',
        dataRange: {
          from: thirtyDaysAgo.toISOString(),
          to: today.toISOString(),
          days: 30,
        },
        commitsCount: stats.recentCommits.length,
      },
    };
    
    // Save to data directory
    const dataDir = join(process.cwd(), 'data');
    const filePath = join(dataDir, 'snapshot.json');
    
    // Create data directory if it doesn't exist
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    writeFileSync(filePath, JSON.stringify(snapshot, null, 2), 'utf-8');
    console.log(`✓ Snapshot saved to ${filePath}`);
    console.log(`  Snapshot date: ${snapshot.snapshotDate}`);
    console.log(`  Commits fetched: ${stats.recentCommits.length}`);
    console.log(`  Date range: ${thirtyDaysAgo.toISOString().split('T')[0]} to ${today.toISOString().split('T')[0]}`);
    
    return snapshot;
  } catch (error) {
    console.error('Error fetching snapshot:', error);
    process.exit(1);
  }
}

fetchSnapshot();
