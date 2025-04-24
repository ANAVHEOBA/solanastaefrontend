"use client";

import { useNetworkData } from '@/hooks/useNetworkData';
import { NetworkStatusCard } from '@/components/network/NetworkStatusCard';
import { NetworkStatsCard } from '@/components/network/NetworkStatsCard';
import { ValidatorStatsCard } from '@/components/network/ValidatorStatsCard';
import { BlockProductionChart } from '@/components/BlockProductionChart';
import { PerformanceSamplesChart } from '@/components/network/PerformanceSamplesChart';
import { ClusterNodesTable } from '@/components/network/ClusterNodesTable';
import { LeaderScheduleTable } from '@/components/network/LeaderScheduleTable';
import { PrioritizationFeesTable } from '@/components/network/PrioritizationFeesTable';
import { SupplyCard } from '@/components/network/SupplyCard';
import { InflationCard } from '@/components/network/InflationCard';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { health, networkStats, validatorStats, clusterNodes, leaderSchedule, prioritizationFees, supply, inflation, loading, error } = useNetworkData();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading network data: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Network Dashboard</h1>
            <div className="text-sm text-gray-400">
              Last updated: {currentTime}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NetworkStatusCard health={health} isLoading={loading} />
            <NetworkStatsCard stats={networkStats} isLoading={loading} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ValidatorStatsCard stats={validatorStats || null} isLoading={loading} />
            <SupplyCard supply={supply || null} isLoading={loading} />
            <InflationCard inflation={inflation || null} isLoading={loading} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <BlockProductionChart />
            <PerformanceSamplesChart />
          </div>

          {clusterNodes && (
            <ClusterNodesTable 
              nodes={clusterNodes.result.data} 
              isLoading={loading} 
            />
          )}

          {leaderSchedule && (
            <LeaderScheduleTable
              schedule={leaderSchedule}
              isLoading={loading}
            />
          )}

          {prioritizationFees && (
            <PrioritizationFeesTable
              fees={prioritizationFees}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}