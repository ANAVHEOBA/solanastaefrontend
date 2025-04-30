 "use client";

import { useValidators } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/utils/format';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const StakeDistribution = () => {
  const { data, isLoading, error } = useValidators(1, 10);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading stake distribution: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-gray-400">
        No stake distribution data available
      </div>
    );
  }

  // Prepare data for pie chart
  const pieData = data.current.map(validator => ({
    name: validator.nodePubkey.slice(0, 8) + '...',
    value: validator.activatedStake
  }));

  // Prepare data for bar chart (top 5 validators)
  const barData = data.current
    .sort((a, b) => b.activatedStake - a.activatedStake)
    .slice(0, 5)
    .map(validator => ({
      name: validator.nodePubkey.slice(0, 8) + '...',
      stake: validator.activatedStake
    }));

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-6">Stake Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${formatNumber(value)} SOL`, 'Stake']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${formatNumber(value)} SOL`, 'Stake']}
              />
              <Bar dataKey="stake" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};