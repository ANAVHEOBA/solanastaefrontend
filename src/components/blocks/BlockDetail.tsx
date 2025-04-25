 "use client";

import { useBlockDetail } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTimestamp } from '@/lib/utils/format';

interface BlockDetailProps {
  blockNumber: number;
}

export const BlockDetail = ({ blockNumber }: BlockDetailProps) => {
  const { data: block, isLoading, error } = useBlockDetail(blockNumber);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3 bg-slate-800" />
          <Skeleton className="h-4 w-full bg-slate-800" />
          <Skeleton className="h-4 w-full bg-slate-800" />
          <Skeleton className="h-4 w-full bg-slate-800" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-md bg-red-500/10">
        Error loading block details: {error.message}
      </div>
    );
  }

  if (!block) {
    return (
      <div className="text-gray-400 p-4 rounded-md bg-slate-800">
        No block details found
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Block Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <span className="text-gray-400">Block Hash:</span>
            <p className="text-white font-mono text-sm">{block.blockhash}</p>
          </div>
          <div>
            <span className="text-gray-400">Previous Block Hash:</span>
            <p className="text-white font-mono text-sm">{block.previous_block_hash}</p>
          </div>
          <div>
            <span className="text-gray-400">Block Height:</span>
            <p className="text-white">{block.block_height}</p>
          </div>
          <div>
            <span className="text-gray-400">Slot:</span>
            <p className="text-white">{block.slot}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-gray-400">Timestamp:</span>
            <p className="text-white">{formatTimestamp(block.block_time)}</p>
          </div>
          <div>
            <span className="text-gray-400">Transactions:</span>
            <p className="text-white">{block.transactions_count}</p>
          </div>
          <div>
            <span className="text-gray-400">Fee Rewards:</span>
            <p className="text-white">{block.fee_rewards} lamports</p>
          </div>
          <div>
            <span className="text-gray-400">MEV Rewards:</span>
            <p className="text-white">{block.totalMevRewards} lamports</p>
          </div>
        </div>
      </div>
    </div>
  );
};