"use client";

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatNumber } from '@/lib/utils/format';

interface SlotIntervalAnalysisProps {
  data?: Record<string, number[]>;
  selectedValidators: string[];
}

export function SlotIntervalAnalysis({ data, selectedValidators }: SlotIntervalAnalysisProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    const intervals: { slot: number; [key: string]: number }[] = [];
    const validators = selectedValidators.length > 0 
      ? selectedValidators 
      : Object.keys(data).slice(0, 3); // Default to first 3 validators if none selected

    // Calculate intervals for each validator
    validators.forEach(validator => {
      const slots = data[validator]?.sort((a, b) => a - b) || [];
      for (let i = 1; i < slots.length; i++) {
        const interval = slots[i] - slots[i - 1];
        const existingPoint = intervals.find(p => p.slot === slots[i]);
        if (existingPoint) {
          existingPoint[validator] = interval;
        } else {
          intervals.push({
            slot: slots[i],
            [validator]: interval,
          });
        }
      }
    });

    return intervals.sort((a, b) => a.slot - b.slot);
  }, [data, selectedValidators]);

  if (!data || chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd'];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis 
            dataKey="slot" 
            stroke="#ffffff80"
            tick={{ fill: '#ffffff80' }}
            tickFormatter={(value) => formatNumber(value)}
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
            formatter={(value: number) => [`Interval: ${formatNumber(value)}`, '']}
            labelFormatter={(label) => `Slot: ${formatNumber(label)}`}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span style={{ color: '#ffffff80' }}>
                {value.slice(0, 8)}...
              </span>
            )}
          />
          {Object.keys(chartData[0] || {})
            .filter(key => key !== 'slot')
            .map((validator, index) => (
              <Line
                key={validator}
                type="monotone"
                dataKey={validator}
                stroke={COLORS[index % COLORS.length]}
                dot={false}
                name={validator}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 
 