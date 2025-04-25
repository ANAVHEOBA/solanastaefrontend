"use client";

import { useState } from 'react';
import { useLatestTransactions } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { TransactionalAnalysis } from '@/components/transactions/TransactionalAnalysis';
import { TransactionDetail } from '@/components/transactions/TransactionDetail';
import { TransactionActions } from '@/components/transactions/TransactionActions';

export default function TransactionsPage() {
  const [filter, setFilter] = useState<string>('');
  const [selectedTxHash, setSelectedTxHash] = useState<string | null>(null);
  const { data: transactions, isLoading, error } = useLatestTransactions(20, filter);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Transactional Analysis</h1>
        <p className="text-gray-400">Analyze recent transactions and network activity</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransactionalAnalysis 
          transactions={transactions || []}
          isLoading={isLoading}
          error={error}
          filter={filter}
          onFilterChange={setFilter}
          onTransactionSelect={setSelectedTxHash}
        />
        
        {selectedTxHash && (
          <>
            <TransactionDetail txHash={selectedTxHash} />
            <TransactionActions txHash={selectedTxHash} />
          </>
        )}
      </div>
    </div>
  );
} 