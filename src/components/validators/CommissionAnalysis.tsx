"use client";

import { useValidators } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/utils/format';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const CommissionAnalysis = () => {
  const { data, isLoading, error } = useValidators(1, 10);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading commission data: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-gray-400">
        No commission data available
      </div>
    );
  }

  // Prepare data for bar chart
  const commissionData = data.current.map(validator => ({
    name: validator.nodePubkey.slice(0, 8) + '...',
    commission: validator.commission
  }));

  // Calculate average commission
  const averageCommission = data.current.reduce((sum, validator) => sum + validator.commission, 0) / data.current.length;

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-6">Commission Analysis</h3>
      <div className="space-y-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={commissionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Commission']}
              />
              <Bar dataKey="commission" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Average Commission</h4>
            <p className="text-2xl font-semibold text-white">
              {averageCommission.toFixed(2)}%
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Min Commission</h4>
            <p className="text-2xl font-semibold text-green-400">
              {Math.min(...data.current.map(v => v.commission))}%
            </p>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Max Commission</h4>
            <p className="text-2xl font-semibold text-red-400">
              {Math.max(...data.current.map(v => v.commission))}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 