"use client";

import { motion } from 'framer-motion';
import { LeaderSchedule } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface LeaderScheduleTableProps {
  schedule: LeaderSchedule | null;
  isLoading: boolean;
}

export const LeaderScheduleTable = ({ schedule, isLoading }: LeaderScheduleTableProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-white mb-6">Leader Schedule</h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-full bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!schedule) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-white mb-6">Leader Schedule</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-3">Validator</th>
                <th className="pb-3">Assigned Slots</th>
                <th className="pb-3">Total Slots</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(schedule.result.data).map(([validator, slots]) => (
                <tr key={validator} className="border-b border-gray-700/50">
                  <td className="py-3 text-sm text-gray-300">
                    {validator.slice(0, 8)}...{validator.slice(-8)}
                  </td>
                  <td className="py-3 text-sm text-gray-300">
                    <div className="flex flex-wrap gap-1 max-w-md">
                      {slots.slice(0, 5).map((slot) => (
                        <span key={slot} className="px-2 py-1 bg-gray-700 rounded text-xs">
                          {formatNumber(slot)}
                        </span>
                      ))}
                      {slots.length > 5 && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                          +{slots.length - 5} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-300">
                    {formatNumber(slots.length)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>Page {schedule.result.pagination.page} of {schedule.result.pagination.totalPages}</p>
          <p>Total Validators: {formatNumber(schedule.result.pagination.total)}</p>
        </div>
      </div>
    </motion.div>
  );
}; 