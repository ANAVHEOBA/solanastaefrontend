"use client";

import { LeaderScheduleCard } from './LeaderScheduleCard';
import { LeaderSchedulePagination } from './LeaderSchedulePagination';
import { Skeleton } from '@/components/ui/skeleton';
import { LeaderSchedule } from '@/types/network';

interface LeaderScheduleListProps {
  data: LeaderSchedule | undefined;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function LeaderScheduleList({ data, page, pageSize, onPageChange }: LeaderScheduleListProps) {
  if (!data) return null;

  const { data: scheduleData, pagination } = data.result;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(scheduleData).map(([validator, slots]) => (
          <LeaderScheduleCard
            key={validator}
            validator={validator}
            slots={slots}
          />
        ))}
      </div>

      <LeaderSchedulePagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
} 