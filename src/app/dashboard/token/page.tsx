"use client";

import { TokenAnalysis } from '@/components/token/TokenAnalysis';
import { TokenPriceHistory } from '@/components/token/TokenPriceHistory';
import { TokenHolders } from '@/components/token/TokenHolders';
import { TokenTransfers } from '@/components/token/TokenTransfers';
import { TokenDeFiActivities } from '@/components/token/TokenDeFiActivities';
import { useState } from 'react';
import { useTokenMetadata } from '@/hooks/useNetworkData';

export default function TokenPage() {
  const [tokenAddress, setTokenAddress] = useState('');
  const { data: tokenMetadata, isLoading, error } = useTokenMetadata(tokenAddress);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Token Analysis</h1>
        
        {/* Token Analysis Section */}
        <div className="mb-8">
          <TokenAnalysis 
            initialAddress={tokenAddress}
            onTokenSelect={setTokenAddress}
          />
        </div>
        
        {/* Price History Section */}
        {tokenAddress && !isLoading && tokenMetadata && !error && (
          <div className="mt-8">
            <TokenPriceHistory tokenAddress={tokenAddress} />
          </div>
        )}

        {/* Token Holders Section */}
        {tokenAddress && !isLoading && tokenMetadata && !error && (
          <div className="mt-8">
            <TokenHolders tokenAddress={tokenAddress} />
          </div>
        )}

        {/* Token Transfers Section */}
        {tokenAddress && !isLoading && tokenMetadata && !error && (
          <div className="mt-8">
            <TokenTransfers tokenAddress={tokenAddress} />
          </div>
        )}

        {/* DeFi Activities Section */}
        {tokenAddress && !isLoading && tokenMetadata && !error && (
          <div className="mt-8">
            <TokenDeFiActivities tokenAddress={tokenAddress} />
          </div>
        )}
      </div>
    </div>
  );
}