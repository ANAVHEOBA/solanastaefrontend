"use client";

import { useState } from 'react';
import { useAccountFees } from '@/hooks/useNetworkData';

interface WalletSidebarProps {
  onAddressChange: (address: string) => void;
}

export const WalletSidebar = ({ onAddressChange }: WalletSidebarProps) => {
  const [inputAddress, setInputAddress] = useState('');
  const [fromDate, setFromDate] = useState('2024-01-01');
  const [toDate, setToDate] = useState('2024-02-01');
  const [selectedAddress, setSelectedAddress] = useState('');

  const { data: fees, isLoading, error } = useAccountFees(
    selectedAddress,
    fromDate,
    toDate
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputAddress.trim()) {
      setSelectedAddress(inputAddress);
      onAddressChange(inputAddress);
    }
  };

  return (
    <div className="w-64 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Wallet Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Analyze
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-white mb-4">Date Range</h2>
        
        <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-2 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-2 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

          {selectedAddress && (
            <>
        {isLoading && (
          <div className="text-xs text-gray-400">Loading fees data...</div>
        )}

        {error && (
          <div className="text-xs text-red-400">Error loading fees data</div>
        )}

        {fees && fees.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-white mb-2">Summary</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Total Fees:</span>
                <span className="text-white">
                  {fees.reduce((sum, fee) => sum + fee.tx_fees, 0).toLocaleString()} LAMPORTS
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Days with Activity:</span>
                <span className="text-white">
                  {fees.filter(fee => fee.tx_fees > 0).length} days
                </span>
              </div>
            </div>
          </div>
        )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 