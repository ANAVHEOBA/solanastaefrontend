"use client";

import { useSolscanTransactions } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';

interface TransactionHistoryProps {
  address: string;
}

export const TransactionHistory = ({ address }: TransactionHistoryProps) => {
  const { data: transactions, isLoading, error } = useSolscanTransactions(address);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-red-400">Error loading transaction history</div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No transaction history available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.tx_hash} className="bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-400">
                  {new Date(tx.time).toLocaleString()}
                </div>
                <div className="text-white font-mono text-sm mt-1">
                  {tx.tx_hash.slice(0, 8)}...{tx.tx_hash.slice(-8)}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm ${tx.status === 'Success' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.status}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  {tx.fee} LAMPORTS
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-400">Programs:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {tx.program_ids.map((programId) => (
                  <span
                    key={programId}
                    className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded"
                  >
                    {programId.slice(0, 8)}...
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 