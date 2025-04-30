"use client";

import { useNetworkData } from '@/hooks/useNetworkData';
import { SupplyCard } from '@/components/network/SupplyCard';
import { NonCirculatingAccounts } from '@/components/network/NonCirculatingAccounts';
import { SupplyDiagram } from '@/components/network/SupplyDiagram';

export default function SupplyPage() {
  const { supply, loading, error } = useNetworkData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading supply data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Supply Analysis</h1>
      <div className="grid grid-cols-1 gap-6">
        <SupplyDiagram supply={supply} />
        <SupplyCard supply={supply} />
        <NonCirculatingAccounts accounts={supply?.result?.value?.nonCirculatingAccounts || []} />
      </div>
    </div>
  );
}