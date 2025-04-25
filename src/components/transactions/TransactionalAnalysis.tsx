"use client";

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LatestTransaction } from '@/types/network';
import { format } from 'date-fns';
import Link from 'next/link';

interface TransactionalAnalysisProps {
  transactions: LatestTransaction[];
  isLoading: boolean;
  error: any;
  filter: string;
  onFilterChange: (filter: string) => void;
  onTransactionSelect: (txHash: string) => void;
}

export const TransactionalAnalysis = ({
  transactions,
  isLoading,
  error,
  filter,
  onFilterChange,
  onTransactionSelect,
}: TransactionalAnalysisProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<LatestTransaction | null>(null);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="text-red-500">Error loading transaction data</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
          <input
            type="text"
            placeholder="Filter transactions..."
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-4 py-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Programs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactions.map((tx) => (
                <tr 
                  key={tx.tx_hash}
                  className="hover:bg-slate-800 cursor-pointer"
                  onClick={() => onTransactionSelect(tx.tx_hash)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {format(new Date(tx.block_time * 1000), 'MMM d, yyyy HH:mm:ss')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-400">
                    <Link 
                      href={`https://solscan.io/tx/${tx.tx_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {tx.tx_hash.slice(0, 8)}...{tx.tx_hash.slice(-8)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      tx.status === 'Success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tx.fee} SOL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {tx.program_ids.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTransaction && (
        <div className="mt-6 p-4 bg-slate-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Transaction Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Hash</p>
              <p className="text-sm text-white">{selectedTransaction.tx_hash}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-sm text-white">{selectedTransaction.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Fee</p>
              <p className="text-sm text-white">{selectedTransaction.fee} SOL</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Slot</p>
              <p className="text-sm text-white">{selectedTransaction.slot}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-400">Signers</p>
              <div className="mt-1 space-y-1">
                {selectedTransaction.signer.map((signer) => (
                  <p key={signer} className="text-sm text-white">
                    {signer}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-400">Programs</p>
              <div className="mt-1 space-y-1">
                {selectedTransaction.program_ids.map((program) => (
                  <p key={program} className="text-sm text-white">
                    {program}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 