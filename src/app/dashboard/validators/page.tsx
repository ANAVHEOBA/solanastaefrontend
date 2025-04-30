"use client";

import { useState } from 'react';
import { ValidatorList } from '@/components/validators/ValidatorList';
import { ValidatorStats } from '@/components/validators/ValidatorStats';
import { StakeDistribution } from '@/components/validators/StakeDistribution';
import { ValidatorPerformance } from '@/components/validators/ValidatorPerformance';
import { CommissionAnalysis } from '@/components/validators/CommissionAnalysis';

export default function ValidatorsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: 'active' as const,
    minStake: 1000,
    maxCommission: 10
  });
  const pageSize = 10;

  return (
    <div className="h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">Validators</h1>
            <div className="flex gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'delinquent' }))}
                className="bg-slate-800 text-white rounded-lg px-4 py-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="delinquent">Delinquent</option>
              </select>
              <input
                type="number"
                value={filters.minStake}
                onChange={(e) => setFilters(prev => ({ ...prev, minStake: Number(e.target.value) }))}
                placeholder="Min Stake"
                className="bg-slate-800 text-white rounded-lg px-4 py-2 w-32"
              />
              <input
                type="number"
                value={filters.maxCommission}
                onChange={(e) => setFilters(prev => ({ ...prev, maxCommission: Number(e.target.value) }))}
                placeholder="Max Commission"
                className="bg-slate-800 text-white rounded-lg px-4 py-2 w-32"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <StakeDistribution />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ValidatorPerformance />
              <CommissionAnalysis />
            </div>
          </div>

          <ValidatorList 
            page={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
} 
 