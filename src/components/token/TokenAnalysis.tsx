"use client";

import { useState } from 'react';
import { useTokenMetadata } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface TokenAnalysisProps {
  initialAddress?: string;
  onTokenSelect?: (tokenAddress: string) => void;
}

export const TokenAnalysis = ({ initialAddress = '', onTokenSelect }: TokenAnalysisProps) => {
  const [tokenAddress, setTokenAddress] = useState(initialAddress);
  const { data: tokenMetadata, isLoading, error } = useTokenMetadata(tokenAddress);

  const handleAnalyze = () => {
    if (onTokenSelect) {
      onTokenSelect(tokenAddress);
    }
  };

  return (
    <div className="w-full">
      {/* Token Search */}
      <div className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token address"
            className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Token Details */}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}

      {error && (
        <div className="text-red-400">
          Error loading token data
        </div>
      )}

      {tokenMetadata && (
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            {tokenMetadata.token_icon && (
              <div className="relative w-12 h-12">
                <Image
                  src={tokenMetadata.token_icon}
                  alt={tokenMetadata.token_name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">{tokenMetadata.token_name}</h2>
              <p className="text-gray-400">{tokenMetadata.token_symbol}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Price</p>
              <p className="text-white font-medium">
                ${tokenMetadata.price?.toFixed(6) ?? 'N/A'}
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">24h Change</p>
              <p className={`font-medium ${(tokenMetadata.price_change_24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {(tokenMetadata.price_change_24h?.toFixed(2) ?? '0.00')}%
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Market Cap</p>
              <p className="text-white font-medium">
                ${tokenMetadata.market_cap?.toLocaleString() ?? 'N/A'}
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-white font-medium">
                ${tokenMetadata.volume_24h?.toLocaleString() ?? 'N/A'}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Token Address</p>
              <p className="text-white font-mono text-sm break-all">{tokenMetadata.token_address}</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Creator</p>
              <p className="text-white font-mono text-sm break-all">{tokenMetadata.creator ?? 'Unknown'}</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Supply</p>
              <p className="text-white font-medium">
                {tokenMetadata.supply ? (
                  <>
                    {(parseInt(tokenMetadata.supply) / Math.pow(10, tokenMetadata.decimals)).toLocaleString()} {tokenMetadata.token_symbol}
                  </>
                ) : (
                  'N/A'
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};