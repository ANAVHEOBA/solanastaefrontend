"use client";

import { useState } from 'react';
import { LatestBlocks } from '@/components/blocks/LatestBlocks';
import { BlockTransactions } from '@/components/blocks/BlockTransactions';
import { BlockDetail } from '@/components/blocks/BlockDetail';

export default function BlocksPage() {
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Block Analysis</h1>
        <p className="text-gray-400">Explore the latest blocks on the Solana network</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Latest Blocks</h2>
          <LatestBlocks onBlockSelect={setSelectedBlock} />
        </div>

        {selectedBlock && (
          <div className="space-y-6">
            <BlockDetail blockNumber={selectedBlock} />
            <BlockTransactions blockNumber={selectedBlock} />
          </div>
        )}
      </div>
    </div>
  );
}