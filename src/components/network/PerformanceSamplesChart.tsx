import { usePerformanceSamples } from '@/hooks/useNetworkData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { PerformanceSample } from '@/types/network';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TIME_FRAMES = [
  { label: '1m', value: '1m' },
  { label: '5m', value: '5m' },
  { label: '15m', value: '15m' },
  { label: '30m', value: '30m' },
  { label: '1h', value: '1h' },
  { label: '4h', value: '4h' },
  { label: '1d', value: '1d' },
];

export const PerformanceSamplesChart = () => {
  const [timeFrame, setTimeFrame] = useState('15m');
  const { data, isLoading, error } = usePerformanceSamples(1, 100, timeFrame);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 animate-pulse">
        <div className="h-64 bg-slate-800 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-red-400">Error loading performance data</div>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No performance data available</div>
      </div>
    );
  }

  const chartData = {
    labels: data.data.map((sample: PerformanceSample) => new Date(sample.slot * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Transactions per Second',
        data: data.data.map((sample: PerformanceSample) => sample.numTransactions / sample.samplePeriodSecs),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Non-Vote Transactions per Second',
        data: data.data.map((sample: PerformanceSample) => sample.numNonVoteTransactions / sample.samplePeriodSecs),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e2e8f0',
        },
      },
      title: {
        display: true,
        text: 'Network Performance Metrics',
        color: '#e2e8f0',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {TIME_FRAMES.map((tf) => (
            <button
              key={tf.value}
              type="button"
              onClick={() => setTimeFrame(tf.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeFrame === tf.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};