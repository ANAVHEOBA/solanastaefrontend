import { Supply } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';
import { useState, useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SupplyCardProps {
  supply: Supply | null;
  isLoading: boolean;
}

export const SupplyCard = ({ supply, isLoading }: SupplyCardProps) => {
  const [showAccounts, setShowAccounts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAccounts = useMemo(() => {
    if (!supply) return [];
    return supply.result.value.nonCirculatingAccounts.filter(account =>
      account.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [supply, searchQuery]);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!supply) {
    return null;
  }

  const { total, circulating, nonCirculating } = supply.result.value;
  const circulatingPercentage = (circulating / total) * 100;
  const nonCirculatingPercentage = (nonCirculating / total) * 100;

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Supply Overview</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-400">Total Supply</span>
            <span className="text-sm font-medium text-white">{formatNumber(total)} SOL</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-400">Circulating Supply</span>
            <span className="text-sm font-medium text-white">
              {formatNumber(circulating)} SOL ({circulatingPercentage.toFixed(2)}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${circulatingPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-400">Non-Circulating Supply</span>
            <span className="text-sm font-medium text-white">
              {formatNumber(nonCirculating)} SOL ({nonCirculatingPercentage.toFixed(2)}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full" 
              style={{ width: `${nonCirculatingPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowAccounts(!showAccounts)}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          <span>Non-Circulating Accounts ({supply.result.value.nonCirculatingAccounts.length})</span>
          {showAccounts ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        
        {showAccounts && (
          <div className="mt-2 bg-slate-800 rounded-lg p-4 max-h-64 overflow-y-auto">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounts..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 text-sm text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Showing {filteredAccounts.length} of {supply.result.value.nonCirculatingAccounts.length} accounts
            </div>
            <ul className="space-y-2">
              {filteredAccounts.map((account, index) => (
                <li key={index} className="text-sm text-gray-300 break-all hover:text-white transition-colors">
                  {account}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};