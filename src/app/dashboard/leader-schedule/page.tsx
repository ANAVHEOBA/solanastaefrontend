"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLeaderSchedule } from '@/services/networkData';
import { LeaderScheduleList } from '@/components/network/LeaderSchedule/LeaderScheduleList';
import { LeaderScheduleStats } from '@/components/network/LeaderSchedule/LeaderScheduleStats';
import { Skeleton } from '@/components/ui/skeleton';
import { LeaderSchedule } from '@/types/network';
import { ValidatorSlotDistribution } from '@/components/network/LeaderSchedule/charts/ValidatorSlotDistribution';
import { SlotTimeline } from '@/components/network/LeaderSchedule/charts/SlotTimeline';
import { SlotDensityHeatMap } from '@/components/network/LeaderSchedule/charts/SlotDensityHeatMap';
import { ValidatorParticipation } from '@/components/network/LeaderSchedule/charts/ValidatorParticipation';
import { SlotIntervalAnalysis } from '@/components/network/LeaderSchedule/charts/SlotIntervalAnalysis';

export default function LeaderSchedulePage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[number, number]>([0, 500000]);
  const [selectedValidators, setSelectedValidators] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery<LeaderSchedule, Error>({
    queryKey: ['leaderSchedule', page, limit],
    queryFn: () => fetchLeaderSchedule(page, limit),
    refetchInterval: 300000, // 5 minutes
  });

  const leaderScheduleData = data?.result.data;

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          Error loading leader schedule: {error.message}
        </div>
      </div>
    );
  }

  const renderCharts = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      );
    }

    if (!leaderScheduleData) {
      return (
        <div className="text-gray-500 text-center p-4">
          No leader schedule data available
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Validator Slot Distribution</h3>
          <ValidatorSlotDistribution data={leaderScheduleData} />
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Slot Timeline</h3>
          <SlotTimeline 
            data={leaderScheduleData} 
            timeRange={selectedTimeRange}
          />
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Slot Density Heat Map</h3>
          <SlotDensityHeatMap 
            data={leaderScheduleData}
            timeRange={selectedTimeRange}
          />
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Validator Participation</h3>
          <ValidatorParticipation 
            data={leaderScheduleData}
            selectedValidators={selectedValidators}
          />
        </div>
        <div className="bg-white/5 rounded-lg p-4 col-span-1 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Slot Interval Analysis</h3>
          <SlotIntervalAnalysis 
            data={leaderScheduleData}
            selectedValidators={selectedValidators}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Leader Schedule</h1>
      </div>

      {renderCharts()}

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <>
          <LeaderScheduleStats data={data} />
          <LeaderScheduleList 
            data={data} 
            page={page}
            pageSize={limit}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}