"use client";

import { LeaderSchedule } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface LeaderScheduleStatsProps {
  data: LeaderSchedule | undefined;
}

export function LeaderScheduleStats({ data }: LeaderScheduleStatsProps) {
  if (!data) return null;

  const { data: scheduleData, pagination } = data.result;
  const totalValidators = Object.keys(scheduleData).length;
  const totalSlots = Object.values(scheduleData).reduce((acc, slots) => acc + slots.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400">Total Validators</h3>
        <p className="text-2xl font-bold text-white">{formatNumber(totalValidators)}</p>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400">Total Slots</h3>
        <p className="text-2xl font-bold text-white">{formatNumber(totalSlots)}</p>
      </div>
      
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-400">Average Slots per Validator</h3>
        <p className="text-2xl font-bold text-white">
          {formatNumber(Math.round(totalSlots / totalValidators))}
        </p>
      </div>
    </div>
  );
} 