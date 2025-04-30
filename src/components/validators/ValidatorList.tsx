"use client";

import { useValidators } from '@/hooks/useNetworkData';
import { ValidatorCard } from './ValidatorCard';
import { ValidatorPagination } from './ValidatorPagination';
import { Skeleton } from '@/components/ui/skeleton';

interface ValidatorListProps {
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  filters: {
    status?: 'active' | 'inactive' | 'delinquent';
    minStake?: number;
    maxCommission?: number;
  };
}

export const ValidatorList = ({ page, pageSize, onPageChange, filters }: ValidatorListProps) => {
  const { data, isLoading, error } = useValidators(page, pageSize, filters);

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
        Error loading validators: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 text-gray-400">
        No validators found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {data.current.map((validator) => (
          <ValidatorCard key={validator.nodePubkey} validator={validator} />
        ))}
      </div>

      <ValidatorPagination
        currentPage={page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}; 
 