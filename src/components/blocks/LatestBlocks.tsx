"use client";

import { useState } from 'react';
import { useLatestBlocks } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTimestamp, formatNumber } from '@/lib/utils/format';

interface LatestBlocksProps {
  onBlockSelect?: (blockNumber: number) => void;
}

interface Block {
  blockhash: string;
  fee_rewards: number;
  transactions_count: number;
  current_slot: number;
  block_height: number;
  block_time: number;
  time: string;
  parent_slot: number;
  previous_block_hash: string;
}

export const LatestBlocks = ({ onBlockSelect }: LatestBlocksProps) => {
  const [limit, setLimit] = useState(20);
  const { data: blocks, isLoading, error } = useLatestBlocks(limit);

  const handleBlockClick = (blockNumber: number) => {
    if (onBlockSelect) {
      onBlockSelect(blockNumber);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Latest Blocks</h2>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="bg-slate-800 text-white px-3 py-2 rounded-md"
        >
          <option value={10}>10 blocks</option>
          <option value={20}>20 blocks</option>
          <option value={50}>50 blocks</option>
          <option value={100}>100 blocks</option>
        </select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full bg-slate-800" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 rounded-md bg-red-500/10">
          Error loading blocks: {error.message}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Block
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fee Rewards
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {blocks?.map((block: Block) => (
                <tr 
                  key={block.blockhash} 
                  className="hover:bg-slate-800/50 cursor-pointer" 
                  onClick={() => handleBlockClick(block.current_slot)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {block.current_slot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {block.blockhash.slice(0, 8)}...{block.blockhash.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatTimestamp(block.block_time)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatNumber(block.transactions_count)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatNumber(block.fee_rewards)} lamports
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}; 