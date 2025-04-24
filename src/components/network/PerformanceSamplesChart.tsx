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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PerformanceSamplesChart = () => {
  const { data, isLoading, error } = usePerformanceSamples();

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

  if (!data || !Array.isArray(data)) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No performance data available</div>
      </div>
    );
  }

  const chartData = {
    labels: data.map((sample: PerformanceSample) => new Date(sample.slot * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Transactions per Second',
        data: data.map((sample: PerformanceSample) => sample.numTransactions / sample.samplePeriodSecs),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Non-Vote Transactions per Second',
        data: data.map((sample: PerformanceSample) => sample.numNonVoteTransactions / sample.samplePeriodSecs),
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
      <Line data={chartData} options={options} />
    </div>
  );
}; 