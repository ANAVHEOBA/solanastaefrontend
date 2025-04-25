"use client";

import { useState } from 'react';
import { MarketList } from '@/components/market/MarketList';
import { MarketInfo } from '@/components/market/MarketInfo';
import { MarketVolume } from '@/components/market/MarketVolume';

export default function MarketPage() {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Market Analysis</h1>
        <p className="text-gray-400">Explore the latest market pools on the Solana network</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <MarketList onMarketSelect={setSelectedMarket} />
        </div>
        <div className="space-y-6">
          {selectedMarket ? (
            <>
              <MarketInfo address={selectedMarket} />
              <MarketVolume address={selectedMarket} />
            </>
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 text-center text-gray-400">
              Select a market pool to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 