'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GitHubCommit } from '@/lib/types';
import { format, parseISO, subDays } from 'date-fns';

interface CommitActivityProps {
  commits: GitHubCommit[];
}

export default function CommitActivity({ commits }: CommitActivityProps) {
  // Group commits by date
  const commitData: { [key: string]: number } = {};
  
  commits.forEach((commit) => {
    const date = format(parseISO(commit.commit.author.date), 'yyyy-MM-dd');
    commitData[date] = (commitData[date] || 0) + 1;
  });

  // Create chart data for last 30 days
  const chartData = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    chartData.push({
      date: format(date, 'MMM dd'),
      commits: commitData[dateStr] || 0,
    });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Commit Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="commits" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
