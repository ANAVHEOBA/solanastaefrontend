"use client";

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import { LeaderSchedule } from '@/types/network';

interface SlotTimelineProps {
  data?: Record<string, number[]>;
  timeRange: [number, number];
}

export function SlotTimeline({ data, timeRange }: SlotTimelineProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    const timeline: { slot: number; validator: string }[] = [];
    const [startSlot, endSlot] = timeRange;

    Object.entries(data).forEach(([validator, slots]) => {
      slots.forEach(slot => {
        if (slot >= startSlot && slot <= endSlot) {
          timeline.push({ slot, validator });
        }
      });
    });

    return timeline.sort((a, b) => a.slot - b.slot);
  }, [data, timeRange]);

  if (!chartData.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis
          dataKey="slot"
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
          label={{ value: 'Slot', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
        />
        <YAxis
          dataKey="validator"
          stroke="#9CA3AF"
          tick={{ fill: '#9CA3AF' }}
          label={{ value: 'Validator', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '0.375rem',
          }}
          labelStyle={{ color: '#9CA3AF' }}
          itemStyle={{ color: '#9CA3AF' }}
        />
        <Line
          type="monotone"
          dataKey="slot"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={{ fill: '#3B82F6', strokeWidth: 2 }}
          activeDot={{ r: 8, fill: '#3B82F6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
} 
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
            type="category"
            dataKey="validator"
            tickFormatter={(value) => value.slice(0, 8) + '...'}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #ffffff20',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: string) => [`Validator: ${value}`, '']}
            labelFormatter={(label) => `Slot: ${formatNumber(label)}`}
          />
          <Line 
            type="monotone" 
            dataKey="validator" 
            stroke="#3b82f6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
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
            type="category"
            dataKey="validator"
            tickFormatter={(value) => value.slice(0, 8) + '...'}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #ffffff20',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: string) => [`Validator: ${value}`, '']}
            labelFormatter={(label) => `Slot: ${formatNumber(label)}`}
          />
          <Line 
            type="monotone" 
            dataKey="validator" 
            stroke="#3b82f6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );