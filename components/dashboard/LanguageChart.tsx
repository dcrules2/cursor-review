'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { GitHubLanguageStats } from '@/lib/types';

interface LanguageChartProps {
  languages: GitHubLanguageStats;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export default function LanguageChart({ languages }: LanguageChartProps) {
  // Convert object to array and calculate percentages
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const data = Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      value: bytes,
      percentage: ((bytes / totalBytes) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 languages

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Language Distribution</h3>
        <p className="text-gray-500 dark:text-gray-400">No language data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Language Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
