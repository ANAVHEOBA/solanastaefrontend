"use client";

import { motion } from 'framer-motion';
import { ValidatorStats } from '@/types/network';
import { formatNumber, formatPercentage } from '@/lib/utils/format';

interface ValidatorStatsCardProps {
  stats: ValidatorStats | null;
  isLoading: boolean;
}

export const ValidatorStatsCard = ({ stats, isLoading }: ValidatorStatsCardProps) => {
  const activePercentage = stats ? (stats.result.activeValidators / stats.result.totalValidators) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Validator Statistics</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <StatItem
              label="Total Validators"
              value={formatNumber(stats?.result.totalValidators)}
              isLoading={isLoading}
            />
            <StatItem
              label="Active Validators"
              value={formatNumber(stats?.result.activeValidators)}
              isLoading={isLoading}
            />
            <StatItem
              label="Delinquent Validators"
              value={formatNumber(stats?.result.delinquentValidators)}
              isLoading={isLoading}
            />
          </div>
          
          <div className="space-y-4">
            <StatItem
              label="Total Active Stake"
              value={`${formatNumber(stats?.result.totalActiveStake)} SOL`}
              isLoading={isLoading}
            />
            <StatItem
              label="Total Delinquent Stake"
              value={`${formatNumber(stats?.result.totalDelinquentStake)} SOL`}
              isLoading={isLoading}
            />
            <StatItem
              label="Average Commission"
              value={formatPercentage(stats?.result.averageCommission)}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Validator Activity</span>
            <span className="text-white">{activePercentage.toFixed(2)}% Active</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${activePercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface StatItemProps {
  label: string;
  value?: string | number;
  isLoading: boolean;
}

const StatItem = ({ label, value, isLoading }: StatItemProps) => (
  <div className="space-y-1">
    <span className="text-sm text-gray-400">{label}</span>
    <div className="h-8 flex items-center">
      {isLoading ? (
        <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
      ) : (
        <span className="text-lg font-medium text-white">{value}</span>
      )}
    </div>
  </div>
);