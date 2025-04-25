"use client";

import { motion } from 'framer-motion';
import { NetworkStats } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface NetworkStatsCardProps {
  stats: NetworkStats | null;
  isLoading: boolean;
}

export const NetworkStatsCard = ({ stats, isLoading }: NetworkStatsCardProps) => {
  const progress = stats?.result?.currentEpochProgress ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Network Statistics</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <StatItem
              label="Block Height"
              value={stats?.result?.blockHeight ? formatNumber(stats.result.blockHeight) : undefined}
              isLoading={isLoading}
            />
            <StatItem
              label="Current Epoch"
              value={stats?.result?.epoch?.toString()}
              isLoading={isLoading}
            />
            <StatItem
              label="Transaction Count"
              value={stats?.result?.transactionCount ? formatNumber(stats.result.transactionCount) : undefined}
              isLoading={isLoading}
            />
          </div>
          
          <div className="space-y-4">
            <StatItem
              label="Average Slot Time"
              value={stats?.result?.averageSlotTime ? `${stats.result.averageSlotTime.toFixed(2)}s` : undefined}
              isLoading={isLoading}
            />
            <StatItem
              label="Current Slot Time"
              value={stats?.result?.currentSlotTime ? `${stats.result.currentSlotTime.toFixed(2)}s` : undefined}
              isLoading={isLoading}
            />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Epoch Progress</span>
                <span className="text-white">{progress.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                />
              </div>
            </div>
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