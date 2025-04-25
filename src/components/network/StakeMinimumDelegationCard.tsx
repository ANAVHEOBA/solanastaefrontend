"use client";

import { useStakeMinimumDelegation } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';

interface StakeMinimumDelegationCardProps {
  className?: string;
}

export function StakeMinimumDelegationCard({ className = '' }: StakeMinimumDelegationCardProps) {
  const { data: minimumDelegation, isLoading, error } = useStakeMinimumDelegation();

  if (error) {
    return (
      <div className={`bg-red-500/10 border border-red-500/20 rounded-xl p-6 ${className}`}>
        <div className="text-red-400">Error loading minimum stake delegation</div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-medium text-white mb-4">Minimum Stake Delegation</h3>
      
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-2xl font-bold text-white">
            {minimumDelegation?.toLocaleString()} SOL
          </div>
          <div className="text-sm text-gray-400">
            Minimum amount required to delegate stake
          </div>
        </div>
      )}
    </div>
  );
} 