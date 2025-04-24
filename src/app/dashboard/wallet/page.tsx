"use client";

import { SolscanAccountCard } from '@/components/wallet/SolscanAccountCard';
import { WalletAnalysis } from '@/components/wallet/WalletAnalysis';
import { WalletFeesChart } from '@/components/wallet/WalletFeesChart';
import { WalletSidebar } from '@/components/wallet/WalletSidebar';
import { useState } from 'react';

export default function WalletPage() {
  const [address, setAddress] = useState<string>('');

  return (
    <div className="flex h-screen bg-slate-950">
      <WalletSidebar onAddressChange={setAddress} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-white">Wallet Analysis</h1>
            
            {address ? (
              <>
                <SolscanAccountCard address={address} />
                <WalletAnalysis address={address} />
                <WalletFeesChart address={address} />
              </>
            ) : (
              <div className="bg-slate-900 rounded-xl p-6 text-center">
                <p className="text-gray-400">Please enter a wallet address to begin analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 