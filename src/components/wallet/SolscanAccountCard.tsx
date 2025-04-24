"use client";

import { useSolscanAccount } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';

interface SolscanAccountCardProps {
  address: string;
}

export const SolscanAccountCard = ({ address }: SolscanAccountCardProps) => {
  const { data: account, isLoading, error } = useSolscanAccount(address);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-red-400">Error loading account data</div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No account data available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Account Information</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Address:</span>
            <span className="text-white font-mono">{account.account}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">On Curve:</span>
            <span className={`${account.is_oncurve ? 'text-green-400' : 'text-red-400'}`}>
              {account.is_oncurve ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 