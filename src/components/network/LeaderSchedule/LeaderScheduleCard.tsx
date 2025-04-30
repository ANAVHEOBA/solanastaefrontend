"use client";

import { formatNumber } from '@/lib/utils/format';

interface LeaderScheduleCardProps {
  validator: string;
  slots: number[];
}

export function LeaderScheduleCard({ validator, slots }: LeaderScheduleCardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">Validator</h3>
            <p className="text-sm text-gray-400 break-all">{validator}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Slots</p>
            <p className="text-lg font-medium text-white">{formatNumber(slots.length)}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Upcoming Slots</h4>
          <div className="grid grid-cols-4 gap-2">
            {slots.slice(0, 8).map((slot, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded px-2 py-1 text-sm text-white text-center"
              >
                {formatNumber(slot)}
              </div>
            ))}
            {slots.length > 8 && (
              <div className="bg-slate-700 rounded px-2 py-1 text-sm text-white text-center">
                +{formatNumber(slots.length - 8)} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 