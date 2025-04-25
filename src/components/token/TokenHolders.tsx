import { useTokenHolders } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

interface TokenHoldersProps {
  tokenAddress: string;
}

export const TokenHolders = ({ tokenAddress }: TokenHoldersProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: holdersData, isLoading, error } = useTokenHolders(
    tokenAddress,
    page,
    pageSize
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        Error loading token holders
      </div>
    );
  }

  if (!holdersData?.success || !holdersData.data.items.length) {
    return (
      <div className="text-gray-400">
        No token holders found
      </div>
    );
  }

  const totalPages = Math.ceil(holdersData.data.total / pageSize);

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Token Holders ({formatNumber(holdersData.data.total)})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md text-sm font-medium bg-slate-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md text-sm font-medium bg-slate-700 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-slate-700">
              <th className="pb-3 px-4">Rank</th>
              <th className="pb-3 px-4">Address</th>
              <th className="pb-3 px-4">Amount</th>
              <th className="pb-3 px-4">Owner</th>
            </tr>
          </thead>
          <tbody>
            {holdersData.data.items.map((holder) => (
              <tr key={holder.address} className="border-b border-slate-700">
                <td className="py-3 px-4 text-gray-300">{holder.rank}</td>
                <td className="py-3 px-4">
                  <a
                    href={`https://solscan.io/account/${holder.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {holder.address.slice(0, 4)}...{holder.address.slice(-4)}
                  </a>
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {formatNumber(holder.amount / Math.pow(10, holder.decimals))}
                </td>
                <td className="py-3 px-4">
                  <a
                    href={`https://solscan.io/account/${holder.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    {holder.owner.slice(0, 4)}...{holder.owner.slice(-4)}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-400 text-center">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}; 