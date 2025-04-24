import { useAccountFees } from '@/hooks/useNetworkData';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WalletFeesChartProps {
  address: string;
}

export const WalletFeesChart = ({ address }: WalletFeesChartProps) => {
  const { data: fees, isLoading, error } = useAccountFees(
    address,
    '2024-01-01',
    '2024-02-01'
  );

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
        <div className="text-red-400">Error loading fees data</div>
      </div>
    );
  }

  if (!fees || fees.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No fees data available</div>
      </div>
    );
  }

  const chartData = {
    labels: fees.map(fee => fee.time),
    datasets: [
      {
        label: 'Transaction Fees (LAMPORTS)',
        data: fees.map(fee => fee.tx_fees),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
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
        text: 'Daily Transaction Fees',
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
      <h2 className="text-lg font-semibold text-white mb-4">Transaction Fees</h2>
      <div className="text-gray-400">
        Fee analysis for address: <span className="text-white font-mono">{address}</span>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}; 