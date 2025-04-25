"use client";

import { useState } from 'react';
import { useMarketList } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatAddress, formatTimestamp } from '@/lib/utils';

interface MarketListProps {
  onMarketSelect: (address: string) => void;
}

export const MarketList = ({ onMarketSelect }: MarketListProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: marketPools, isLoading, isError } = useMarketList(page, pageSize);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading market pools
      </div>
    );
  }

  if (!marketPools?.length) {
    return (
      <div className="text-center py-4 text-slate-400">
        No market pools found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="p-4">Pool Address</th>
              <th className="p-4">Program</th>
              <th className="p-4">Token 1</th>
              <th className="p-4">Token 2</th>
              <th className="p-4">Created time</th>
            </tr>
          </thead>
          <tbody>
            {marketPools.map((pool) => (
              <tr 
                key={pool.pool_address}
                className="border-t border-slate-700 hover:bg-slate-700 cursor-pointer"
                onClick={() => onMarketSelect(pool.pool_address)}
              >
                <td className="p-4">
                  <a
                    href={`https://solscan.io/account/${pool.pool_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatAddress(pool.pool_address)}
                  </a>
                </td>
                <td className="p-4">
                  <a
                    href={`https://solscan.io/account/${pool.program_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatAddress(pool.program_id)}
                  </a>
                </td>
                <td className="p-4">
                  <a
                    href={`https://solscan.io/account/${pool.token1}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatAddress(pool.token1)}
                  </a>
                </td>
                <td className="p-4">
                  <a
                    href={`https://solscan.io/account/${pool.token2}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatAddress(pool.token2)}
                  </a>
                </td>
                <td className="p-4">
                  {formatTimestamp(pool.created_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-slate-400">
          Page {page}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={marketPools.length < pageSize}
          className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}; 