"use client";

import { useValidators } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/utils/format';

export const ValidatorStats = () => {
  const { data, isLoading, error } = useValidators(1, 1);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading validator stats: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-gray-400">
        No validator stats available
      </div>
    );
  }

  const totalValidators = data.pagination.total;
  const activeValidators = data.current.length;
  const delinquentValidators = data.delinquent.length;

  const totalStake = data.current.reduce((sum, validator) => sum + validator.activatedStake, 0);
  const averageCommission = data.current.reduce((sum, validator) => sum + validator.commission, 0) / activeValidators;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Validator Overview</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Validators</span>
            <span className="text-white">{formatNumber(totalValidators)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Active Validators</span>
            <span className="text-green-400">{formatNumber(activeValidators)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delinquent Validators</span>
            <span className="text-red-400">{formatNumber(delinquentValidators)}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Stake Distribution</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Stake</span>
            <span className="text-white">{formatNumber(totalStake)} SOL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Average Stake</span>
            <span className="text-white">{formatNumber(totalStake / activeValidators)} SOL</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-4">Commission</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Average Commission</span>
            <span className="text-white">{averageCommission.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Min Commission</span>
            <span className="text-white">
              {Math.min(...data.current.map(v => v.commission)).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Max Commission</span>
            <span className="text-white">
              {Math.max(...data.current.map(v => v.commission)).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 