"use client";

import { useSolscanTokenAccounts } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface TokenAccountsProps {
  address: string;
}

export const TokenAccounts = ({ address }: TokenAccountsProps) => {
  const { data, isLoading, error } = useSolscanTokenAccounts(address);

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
        <div className="text-red-400">Error loading token accounts data</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No token accounts data available</div>
      </div>
    );
  }

  const { accounts, metadata } = data;

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Token Accounts</h3>
      <div className="space-y-4">
        {accounts.map((account) => {
          const tokenInfo = metadata[account.token_address];
          const balance = account.amount / Math.pow(10, account.token_decimals);

          return (
            <div key={account.token_account} className="bg-slate-800 rounded-lg p-4">
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
                      <div className="text-white font-medium">{tokenInfo?.token_name || 'Unknown Token'}</div>
                      <div className="text-gray-400 text-sm">{tokenInfo?.token_symbol || 'UNKNOWN'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {balance.toLocaleString()} {tokenInfo?.token_symbol || ''}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {account.token_decimals} decimals
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Account: {account.token_account}
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