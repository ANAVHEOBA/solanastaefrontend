 "use client";

import { Validator } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface ValidatorCardProps {
  validator: Validator;
}

export const ValidatorCard = ({ validator }: ValidatorCardProps) => {
  const statusColor = validator.status === 'active' ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">Validator {validator.nodePubkey.slice(0, 8)}...</h3>
            <p className="text-sm text-gray-400">Vote Account: {validator.votePubkey.slice(0, 8)}...</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {validator.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-400">Stake</p>
            <p className="text-white font-medium">
              {formatNumber(validator.activatedStake)} SOL
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Commission</p>
            <p className="text-white font-medium">{validator.commission}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Vote</p>
            <p className="text-white font-medium">{validator.lastVote}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Root Slot</p>
            <p className="text-white font-medium">{validator.rootSlot}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Recent Epoch Credits</p>
          <div className="grid grid-cols-5 gap-2">
            {validator.epochCredits.slice(-5).map(([epoch, credits, previousCredits], index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-2">
                <p className="text-xs text-gray-400">Epoch {epoch}</p>
                <p className="text-white text-sm">
                  {formatNumber(credits - previousCredits)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};