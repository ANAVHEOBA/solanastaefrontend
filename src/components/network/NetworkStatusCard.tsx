"use client";

import { motion } from 'framer-motion';
import { NetworkHealth } from '@/types/network';

interface NetworkStatusCardProps {
  health: NetworkHealth | null;
  isLoading: boolean;
}

export const NetworkStatusCard = ({ health, isLoading }: NetworkStatusCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Network Status</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${health?.result === 'ok' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <span className={`font-medium ${health?.result === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
              {isLoading ? 'Checking...' : health?.result.toUpperCase()}
            </span>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Last Check</span>
            <span className="text-white">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 