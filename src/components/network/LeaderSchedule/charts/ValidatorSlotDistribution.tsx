"use client";

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatNumber } from '@/lib/utils/format';

interface ValidatorSlotDistributionProps {
  data?: Record<string, number[]>;
}

export function ValidatorSlotDistribution({ data }: ValidatorSlotDistributionProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    return Object.entries(data)
      .map(([validator, slots]) => ({
        validator: validator.slice(0, 8) + '...',
        slots: slots.length,
        fullValidator: validator,
      }))
      .sort((a, b) => b.slots - a.slots)
      .slice(0, 10); // Show top 10 validators
  }, [data]);

  if (!data || chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis 
            dataKey="validator" 
            stroke="#ffffff80"
            tick={{ fill: '#ffffff80' }}
          />
          <YAxis 
            stroke="#ffffff80"
            tick={{ fill: '#ffffff80' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #ffffff20',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: number) => [formatNumber(value), 'Slots']}
            labelFormatter={(label) => `Validator: ${label}`}
          />
          <Bar 
            dataKey="slots" 
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 