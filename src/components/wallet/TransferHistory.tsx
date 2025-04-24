"use client";

import { useSolscanTransfers } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface TransferHistoryProps {
  address: string;
}

export const TransferHistory = ({ address }: TransferHistoryProps) => {
  const { data, isLoading, error } = useSolscanTransfers(address);

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
        <div className="text-red-400">Error loading transfer history</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No transfer history available</div>
      </div>
    );
  }

  const { transfers, metadata } = data;

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Transfer History</h3>
      <div className="space-y-4">
        {transfers.map((transfer) => {
          const tokenInfo = metadata[transfer.token_address];
          const amount = transfer.amount / Math.pow(10, transfer.token_decimals);
          const isIncoming = transfer.flow === 'in';
          const date = new Date(transfer.time);

          return (
            <div key={transfer.trans_id} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                {tokenInfo?.token_icon && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={tokenInfo.token_icon}
                      alt={tokenInfo.token_name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">
                        {isIncoming ? 'Received' : 'Sent'} {tokenInfo?.token_name || 'Unknown Token'}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatDistanceToNow(date, { addSuffix: true })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-${isIncoming ? 'green' : 'red'}-400 font-medium`}>
                        {isIncoming ? '+' : '-'}{amount.toLocaleString()} {tokenInfo?.token_symbol || ''}
                      </div>
                      <div className="text-gray-400 text-sm">
                        ${transfer.value.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <div>From: {transfer.from_address}</div>
                    <div>To: {transfer.to_address}</div>
                    <div>Transaction: {transfer.trans_id}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 