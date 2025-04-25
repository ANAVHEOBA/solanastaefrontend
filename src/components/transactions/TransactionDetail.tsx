"use client";

import { useTransactionDetail } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Link from 'next/link';

interface TransactionDetailProps {
  txHash: string;
}

export const TransactionDetail = ({ txHash }: TransactionDetailProps) => {
  const { data: transaction, isLoading, error } = useTransactionDetail(txHash);

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
        <div className="text-red-500">Error loading transaction details</div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="bg-slate-900 rounded-lg p-6">
        <div className="text-gray-400">No transaction details found</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Transaction Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Hash</p>
            <p className="text-sm text-white break-all">{transaction.tx_hash}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-sm text-white">{transaction.tx_status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Fee</p>
            <p className="text-sm text-white">{transaction.fee} SOL</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Block Time</p>
            <p className="text-sm text-white">
              {format(new Date(transaction.block_time * 1000), 'MMM d, yyyy HH:mm:ss')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Compute Units</p>
            <p className="text-sm text-white">{transaction.compute_units_consumed}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Priority Fee</p>
            <p className="text-sm text-white">{transaction.priority_fee} SOL</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Signers</h3>
          <div className="space-y-2">
            {transaction.signer.map((signer) => (
              <div key={signer} className="flex items-center">
                <Link 
                  href={`https://solscan.io/account/${signer}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline break-all"
                >
                  {signer}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Programs Involved</h3>
          <div className="space-y-2">
            {transaction.programs_involved.map((program) => (
              <div key={program} className="flex items-center">
                <Link 
                  href={`https://solscan.io/account/${program}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline break-all"
                >
                  {program}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Instructions</h3>
          <div className="space-y-4">
            {transaction.parsed_instructions.map((instruction, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Program</p>
                    <p className="text-sm text-white">{instruction.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Type</p>
                    <p className="text-sm text-white">{instruction.parsed_type}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-400">Accounts</p>
                    <div className="mt-1 space-y-1">
                      {instruction.accounts.map((account, idx) => (
                        <p key={`${account}-${idx}`} className="text-sm text-white break-all">
                          {account}
                        </p>
                      ))}
                    </div>
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