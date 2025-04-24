"use client";

import { useSolscanPortfolio } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface PortfolioProps {
  address: string;
}

export const Portfolio = ({ address }: PortfolioProps) => {
  const { data: portfolio, isLoading, error } = useSolscanPortfolio(address);

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
        <div className="text-red-400">Error loading portfolio data</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No portfolio data available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Portfolio</h3>
      <div className="mb-4">
        <div className="text-sm text-gray-400">Total Value</div>
        <div className="text-2xl font-bold text-white">${portfolio.total_value.toFixed(2)}</div>
      </div>
      <div className="space-y-4">
        {portfolio.tokens.map((token) => (
          <div key={token.token_address} className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-10 h-10">
                <Image
                  src={token.token_icon}
                  alt={token.token_name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{token.token_name}</div>
                    <div className="text-gray-400 text-sm">{token.token_symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">${token.value.toFixed(2)}</div>
                    <div className="text-gray-400 text-sm">
                      {token.balance.toLocaleString()} {token.token_symbol}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Price: ${typeof token.token_price === 'number' ? token.token_price.toFixed(8) : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};