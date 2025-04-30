"use client";

import { usePerformanceSamples } from '@/hooks/useNetworkData';
import { PerformanceSamplesTable } from '@/components/network/PerformanceSamplesTable';
import { PerformanceSamplesChart } from '@/components/network/PerformanceSamplesChart';
import { useState } from 'react';

export default function PerformanceSamplesPage() {
  const [page, setPage] = useState(1);
  const [timeFrame, setTimeFrame] = useState('15m');
  const { data, isLoading, error } = usePerformanceSamples(page, 10, timeFrame);

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

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No performance data available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Performance Samples</h1>
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow">
          <PerformanceSamplesChart />
        </div>
        <div className="bg-white rounded-lg shadow">
          <PerformanceSamplesTable
            samples={data.data}
            pagination={data.pagination}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
} 