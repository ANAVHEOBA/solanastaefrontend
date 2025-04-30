"use client";

import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatNumber } from '@/lib/utils/format';

interface ValidatorParticipationProps {
  data?: Record<string, number[]>;
  selectedValidators: string[];
}

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

export function ValidatorParticipation({ data, selectedValidators }: ValidatorParticipationProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    const totalSlots = Object.values(data).reduce((sum, slots) => sum + slots.length, 0);
    
    return Object.entries(data)
      .map(([validator, slots]) => ({
        name: validator.slice(0, 8) + '...',
        value: slots.length,
        percentage: (slots.length / totalSlots) * 100,
        fullValidator: validator,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Show top 5 validators
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
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                stroke="#1a1a1a"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #ffffff20',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: number, name: string, props: any) => [
              `${formatNumber(value)} slots (${props.payload.percentage.toFixed(1)}%)`,
              `Validator: ${name}`,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => (
              <span style={{ color: '#ffffff80' }}>
                {value} ({entry.payload.percentage.toFixed(1)}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 

