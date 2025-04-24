"use client";

import { motion } from 'framer-motion';
import { PrioritizationFees } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface PrioritizationFeesTableProps {
  fees: PrioritizationFees | null;
  isLoading: boolean;
}

export const PrioritizationFeesTable = ({ fees, isLoading }: PrioritizationFeesTableProps) => {
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
          <h2 className="text-xl font-semibold text-white mb-6">Prioritization Fees</h2>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-full bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!fees) {
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
        <h2 className="text-xl font-semibold text-white mb-6">Prioritization Fees</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-3">Slot</th>
              </tr>
            </thead>
            <tbody>
              {fees.result.data.map((fee) => (
                <tr key={fee.slot} className="border-b border-gray-700/50">
                  <td className="py-3 text-sm text-gray-300">
                    {formatNumber(fee.slot)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>Page {fees.result.pagination.page} of {fees.result.pagination.totalPages}</p>
          <p>Total Slots: {formatNumber(fees.result.pagination.total)}</p>
        </div>
      </div>
    </motion.div>
  );
}; 