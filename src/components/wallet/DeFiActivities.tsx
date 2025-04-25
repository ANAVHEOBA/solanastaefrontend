"use client";

import { useSolscanDeFiActivities } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface DeFiActivitiesProps {
  address: string;
}

export const DeFiActivities = ({ address }: DeFiActivitiesProps) => {
  const { data, isLoading, error } = useSolscanDeFiActivities(address);

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-red-400">Error loading DeFi activities</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900 rounded-xl p-6">
        <div className="text-gray-400">No DeFi activities available</div>
      </div>
    );
  }

  const { activities, metadata } = data;

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'ACTIVITY_TOKEN_SWAP':
        return 'Token Swap';
      case 'ACTIVITY_SPL_TOKEN_UNSTAKE':
        return 'Unstake';
      default:
        return type.replace('ACTIVITY_', '').replace(/_/g, ' ');
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">DeFi Activities</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const date = new Date(activity.time);
          const token1Info = metadata[activity.routers.token1];
          const token2Info = activity.routers.token2 ? metadata[activity.routers.token2] : null;
          const amount1 = typeof activity.routers.amount1 === 'number' 
            ? activity.routers.amount1 / Math.pow(10, activity.routers.token1_decimals)
            : 0;
          const amount2 = activity.routers.amount2 && typeof activity.routers.amount2 === 'number'
            ? activity.routers.amount2 / Math.pow(10, activity.routers.token2_decimals || 0)
            : null;

          // Create a unique key by combining transaction ID, activity type, block time, amount, and index
          const uniqueKey = `${activity.trans_id}-${activity.activity_type}-${activity.block_time}-${amount1}-${amount2 || ''}-${index}`;

          return (
            <div key={uniqueKey} className="bg-slate-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                {token1Info?.token_icon && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={token1Info.token_icon}
                      alt={token1Info.token_name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-medium">
                        {getActivityTypeLabel(activity.activity_type)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {formatDistanceToNow(date, { addSuffix: true })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        ${activity.value.toFixed(2)}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {amount1.toLocaleString()} {token1Info?.token_symbol || ''}
                        {amount2 && ` → ${amount2.toLocaleString()} ${token2Info?.token_symbol || ''}`}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <div>Platform: {activity.platform.join(', ')}</div>
                    <div>Transaction: {activity.trans_id}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 