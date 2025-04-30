"use client";

import { useValidators } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/utils/format';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ValidatorPerformance = () => {
  const { data, isLoading, error } = useValidators(1, 10);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading performance data: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-gray-400">
        No performance data available
      </div>
    );
  }

  // Prepare data for line chart (using the first validator as example)
  const performanceData = data.current[0]?.epochCredits.map(([epoch, credits]) => ({
    epoch,
    credits
  })) || [];

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-6">Validator Performance</h3>
      <div className="space-y-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Credits']}
              />
              <Line 
                type="monotone" 
                dataKey="credits" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Active Validators</h4>
            <p className="text-2xl font-semibold text-green-400">
              {data.current.length}
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Delinquent Validators</h4>
            <p className="text-2xl font-semibold text-red-400">
              {data.delinquent.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 