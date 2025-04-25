"use client";

import { useTransactionActions } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

interface TransactionActionsProps {
  txHash: string;
}

export const TransactionActions = ({ txHash }: TransactionActionsProps) => {
  const { data: actions, isLoading, error } = useTransactionActions(txHash);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="text-red-500">Error loading transaction actions</div>
      </div>
    );
  }

  if (!actions) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="text-gray-400">No transaction actions found</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Transaction Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-400">Time</p>
            <p className="text-sm text-white">
              {format(new Date(actions.block_time * 1000), 'MMM d, yyyy HH:mm:ss')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Fee</p>
            <p className="text-sm text-white">{actions.fee} SOL</p>
          </div>
        </div>

        {actions.summaries.map((summary, index) => (
          <div key={index} className="mb-6 bg-slate-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{summary.title.activity_type}</h3>
                <p className="text-sm text-gray-400">{summary.title.program_id}</p>
              </div>
              <Link 
                href={`https://solscan.io/account/${summary.title.program_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                View Program
              </Link>
            </div>

            <div className="space-y-4">
              {summary.body.map((action, actionIndex) => (
                <div key={actionIndex} className="pl-4 border-l-2 border-slate-700">
                  <p className="text-sm text-gray-400">{action.activity_type}</p>
                  <p className="text-sm text-white">{action.program_id}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transfers</h3>
          <div className="space-y-4">
            {actions.transfers.map((transfer, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Source</p>
                    <Link 
                      href={`https://solscan.io/account/${transfer.source}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline break-all"
                    >
                      {transfer.source}
                    </Link>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Destination</p>
                    <Link 
                      href={`https://solscan.io/account/${transfer.destination}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline break-all"
                    >
                      {transfer.destination}
                    </Link>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Amount</p>
                    <p className="text-sm text-white">
                      {transfer.amount_str} {actions.metadata?.tokens?.[transfer.token_address]?.token_symbol || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Program</p>
                    <p className="text-sm text-white">{transfer.program_id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 