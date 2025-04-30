"use client";

import { usePerformanceSamples } from '@/hooks/useNetworkData';
import { PerformanceSamplesTable } from '@/components/network/PerformanceSamplesTable';
import { useState } from 'react';

export default function PerformanceSamplesPage() {
  const [page, setPage] = useState(1);
  const { data: samples, isLoading, error } = usePerformanceSamples(page, 10);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading performance samples: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Performance Samples</h1>
      <PerformanceSamplesTable 
        samples={samples || []} 
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
} 