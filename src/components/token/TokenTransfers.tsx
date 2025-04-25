import { useTokenTransfers } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

interface TokenTransfersProps {
  tokenAddress: string;
}

export function TokenTransfers({ tokenAddress }: TokenTransfersProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: transfersData, isLoading, error } = useTokenTransfers(tokenAddress, page, pageSize);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading token transfers. Please try again later.
      </div>
    );
  }

  if (!transfersData?.data || transfersData.data.length === 0) {
    return (
      <div className="text-gray-400">
        No transfer history available for this token.
      </div>
    );
  }

  const totalPages = Math.ceil(transfersData.data.length / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Transfer History
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">From</th>
              <th className="py-3 px-4 text-left">To</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {transfersData.data.map((transfer, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="py-3 px-4 text-gray-400">
                  {new Date(transfer.time).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Link 
                    href={`https://solscan.io/account/${transfer.from_address}`}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {transfer.from_address.slice(0, 4)}...{transfer.from_address.slice(-4)}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link 
                    href={`https://solscan.io/account/${transfer.to_address}`}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {transfer.to_address.slice(0, 4)}...{transfer.to_address.slice(-4)}
                  </Link>
                </td>
                <td className="py-3 px-4 text-right">
                  {formatNumber(transfer.amount / Math.pow(10, transfer.token_decimals))}
                </td>
                <td className="py-3 px-4 text-right">
                  ${formatNumber(transfer.value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 