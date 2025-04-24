import { Inflation } from '@/types/network';
import { Skeleton } from '@/components/ui/skeleton';

interface InflationCardProps {
  inflation: Inflation | null;
  isLoading: boolean;
}

export function InflationCard({ inflation, isLoading }: InflationCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Inflation</h2>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : inflation ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Inflation</span>
            <span className="text-white font-medium">
              {(inflation.result.total * 100).toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Validator Inflation</span>
            <span className="text-white font-medium">
              {(inflation.result.validator * 100).toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Foundation Inflation</span>
            <span className="text-white font-medium">
              {(inflation.result.foundation * 100).toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Epoch</span>
            <span className="text-white font-medium">
              {inflation.result.epoch}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">No inflation data available</div>
      )}
    </div>
  );
}