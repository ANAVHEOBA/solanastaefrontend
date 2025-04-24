"use client";

import { WalletFeesChart } from './WalletFeesChart';
import { TransactionHistory } from './TransactionHistory';
import { Portfolio } from './Portfolio';
import { TokenAccounts } from './TokenAccounts';
import { TransferHistory } from './TransferHistory';
import { DeFiActivities } from './DeFiActivities';

interface WalletAnalysisProps {
  address: string;
}

export const WalletAnalysis = ({ address }: WalletAnalysisProps) => {
  return (
    <div className="space-y-6">
      <Portfolio address={address} />
      <TokenAccounts address={address} />
      <DeFiActivities address={address} />
      <TransferHistory address={address} />
      <WalletFeesChart address={address} />
      <TransactionHistory address={address} />
    </div>
  );
}; 