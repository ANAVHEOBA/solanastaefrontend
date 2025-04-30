import { Supply } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface SupplyDiagramProps {
  supply: Supply | null;
}

export const SupplyDiagram = ({ supply }: SupplyDiagramProps) => {
  if (!supply) return null;

  const { total, circulating, nonCirculating } = supply.result.value;
  const circulatingPercentage = (circulating / total) * 100;
  const nonCirculatingPercentage = (nonCirculating / total) * 100;

  return (
    <div className="bg-slate-900 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-6">Supply Distribution Diagrams</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diagram 1: Pie Chart */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Supply Distribution (Pie)</h3>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-green-500"
                style={{ clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)` }}
              />
              <div 
                className="absolute inset-0 bg-red-500"
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + (circulatingPercentage / 2)}% 0%, ${50 + (circulatingPercentage / 2)}% ${circulatingPercentage}%, 50% ${circulatingPercentage}%)` 
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-900 rounded-full w-24 h-24" />
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2" />
              <span className="text-sm text-gray-300">Circulating ({circulatingPercentage.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
              <span className="text-sm text-gray-300">Non-Circulating ({nonCirculatingPercentage.toFixed(1)}%)</span>
            </div>
          </div>
        </div>

        {/* Diagram 2: Stacked Bar */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Supply Distribution (Stacked)</h3>
          <div className="h-48 flex items-end space-x-2">
            <div className="flex-1 flex flex-col">
              <div 
                className="bg-green-500"
                style={{ height: `${circulatingPercentage}%` }}
              />
              <div 
                className="bg-red-500"
                style={{ height: `${nonCirculatingPercentage}%` }}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <div className="text-sm text-gray-300">
              Total: {formatNumber(total)} SOL
            </div>
          </div>
        </div>

        {/* Diagram 3: Donut Chart */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Supply Distribution (Donut)</h3>
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#374151"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10B981"
                strokeWidth="10"
                strokeDasharray={`${circulatingPercentage * 2.83} ${283}`}
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#EF4444"
                strokeWidth="10"
                strokeDasharray={`${nonCirculatingPercentage * 2.83} ${283}`}
                strokeDashoffset={`-${circulatingPercentage * 2.83}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(total)}</div>
                <div className="text-sm text-gray-400">Total SOL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagram 4: Horizontal Bar */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Supply Distribution (Horizontal)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Circulating</span>
                <span>{formatNumber(circulating)} SOL</span>
              </div>
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${circulatingPercentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Non-Circulating</span>
                <span>{formatNumber(nonCirculating)} SOL</span>
              </div>
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500"
                  style={{ width: `${nonCirculatingPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 