"use client";

import { useMarketInfo } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatAddress, formatTimestamp } from '@/lib/utils';

interface MarketInfoProps {
  address: string;
}

export function MarketInfo({ address }: MarketInfoProps) {
  const { data: marketInfo, isLoading, error } = useMarketInfo(address);

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <Skeleton className="h-8 w-1/2" />
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-center text-red-500">
        Error loading market info
      </div>
    );
  }

  if (!marketInfo) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-center text-gray-400">
        No market information available
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Market Pool Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Pool Information</h3>
          <div className="text-sm text-gray-400">
            Address: {formatAddress(marketInfo.pool_address)}
          </div>
          <div className="text-sm text-gray-400">
            Program: {formatAddress(marketInfo.program_id)}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-2">Tokens</h3>
          {marketInfo.tokens_info.map((token, index) => (
            <div key={index} className="bg-slate-700 rounded p-3 mb-2">
              <div className="text-sm text-gray-400">
                Token: {formatAddress(token.token)}
              </div>
              <div className="text-sm text-gray-400">
                Amount: {token.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-2">Creation Details</h3>
          <div className="text-sm text-gray-400">
            Created: {formatTimestamp(marketInfo.create_block_time)}
          </div>
          <div className="text-sm text-gray-400">
            Creator: {formatAddress(marketInfo.creator)}
          </div>
        </div>
      </div>
    </div>
  );
} 