import { useTokenPriceHistory } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { format, subDays, subHours, subMonths, subYears } from 'date-fns';

interface TokenPriceHistoryProps {
  tokenAddress: string;
}

type TimeRange = '24h' | '7d' | '1m' | '3m' | '1y' | 'all';

export const TokenPriceHistory = ({ tokenAddress }: TokenPriceHistoryProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const getDateRange = (range: TimeRange) => {
    const now = new Date();
    let fromDate: Date;

    switch (range) {
      case '24h':
        fromDate = subHours(now, 24);
        break;
      case '7d':
        fromDate = subDays(now, 7);
        break;
      case '1m':
        fromDate = subMonths(now, 1);
        break;
      case '3m':
        fromDate = subMonths(now, 3);
        break;
      case '1y':
        fromDate = subYears(now, 1);
        break;
      case 'all':
        fromDate = subYears(now, 5); // Default to 5 years for 'all'
        break;
      default:
        fromDate = subDays(now, 7);
    }

    return {
      from_time: format(fromDate, 'yyyyMMdd'),
      to_time: format(now, 'yyyyMMdd'),
    };
  };

  const { from_time, to_time } = getDateRange(timeRange);

  const { data: priceHistory, isLoading, error } = useTokenPriceHistory(tokenAddress);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        Error loading price history
      </div>
    );
  }

  if (!priceHistory?.success || !priceHistory.data?.[0]?.prices || priceHistory.data[0].prices.length === 0) {
    return (
      <div className="text-gray-400">
        No price history available
      </div>
    );
  }

  // Format the data for the chart
  const chartData = priceHistory.data[0].prices.map((pricePoint) => {
    // Convert YYYYMMDD to Date object
    const dateStr = pricePoint.date.toString();
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: pricePoint.price,
    };
  });

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Price History</h3>
        <div className="flex gap-2">
          {(['24h', '7d', '1m', '3m', '1y', 'all'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(4)}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
              }}
              formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#6366F1" 
              strokeWidth={2}
              dot={{ fill: '#6366F1', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#6366F1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 