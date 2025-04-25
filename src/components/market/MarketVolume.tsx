"use client";

import { useMarketVolume } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber, formatTimestamp } from '@/lib/utils/format';

interface MarketVolumeProps {
  address: string;
}

export function MarketVolume({ address }: MarketVolumeProps) {
  const timeRange = ['24h']; // You can extend this to support multiple time ranges
  const { data, isLoading, error } = useMarketVolume(address, timeRange);

  if (isLoading) {
    return (
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-red-500">
        Error loading market volume: {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 text-gray-400">
        No volume data available
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Market Volume</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-sm text-gray-400 mb-2">24h Volume</h3>
          <p className="text-2xl font-bold text-white">
            ${formatNumber(data.total_volume_24h)}
          </p>
          <p className={`text-sm ${data.total_volume_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.total_volume_change_24h >= 0 ? '+' : ''}
            {formatNumber(data.total_volume_change_24h)}%
          </p>
        </div>

        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-sm text-gray-400 mb-2">24h Trades</h3>
          <p className="text-2xl font-bold text-white">
            {formatNumber(data.total_trades_24h)}
          </p>
          <p className={`text-sm ${data.total_trades_change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {data.total_trades_change_24h >= 0 ? '+' : ''}
            {formatNumber(data.total_trades_change_24h)}%
          </p>
        </div>
      </div>
    </div>
  );
} 