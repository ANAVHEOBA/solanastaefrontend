"use client";

import { useState } from 'react';
import { useBlockTransactions } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTimestamp, formatAddress } from '@/lib/utils/format';

interface BlockTransactionsProps {
  blockNumber: number;
}

export const BlockTransactions = ({ blockNumber }: BlockTransactionsProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, error } = useBlockTransactions(blockNumber, page, pageSize);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-slate-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-md bg-red-500/10">
        Error loading transactions: {error.message}
      </div>
    );
  }

  if (!data?.transactions?.length) {
    return (
      <div className="text-gray-400 p-4 rounded-md bg-slate-800">
        No transactions found for this block
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / pageSize);

  return (
    <div className="bg-slate-900 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Block #{blockNumber} Transactions</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-slate-800 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-slate-800 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Hash
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Signer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Programs
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {data.transactions.map((tx) => (
              <tr key={tx.tx_hash} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {formatAddress(tx.tx_hash)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatTimestamp(tx.block_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {tx.signer.map(addr => formatAddress(addr)).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {tx.fee} lamports
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    tx.status === 'Success'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {tx.program_ids.map(pid => formatAddress(pid)).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};