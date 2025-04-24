import React from 'react';
import { useNetworkData } from '@/hooks/useNetworkData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const BlockProductionChart: React.FC = () => {
  const { blockProduction } = useNetworkData();

  if (!blockProduction) {
    return <div>Loading block production data...</div>;
  }

  // Transform the data for the chart
  const chartData = Object.entries(blockProduction.result.value.byIdentity).map(([validator, [blocks, slots]]) => ({
    validator: validator.slice(0, 8) + '...', // Shorten validator address for display
    blocks,
    slots,
    efficiency: (blocks / slots) * 100,
  }));

  // Sort by efficiency (highest first)
  chartData.sort((a, b) => b.efficiency - a.efficiency);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Block Production Efficiency</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData.slice(0, 10)} // Show top 10 validators
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="validator"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Efficiency']}
            />
            <Bar
              dataKey="efficiency"
              fill="#8884d8"
              name="Efficiency"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Showing top 10 validators by block production efficiency</p>
        <p>Data range: Slot {blockProduction.result.value.range.firstSlot} to {blockProduction.result.value.range.lastSlot}</p>
      </div>
    </div>
  );
}; 