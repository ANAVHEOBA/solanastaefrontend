import { useTokenDeFiActivities } from '@/hooks/useNetworkData';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface TokenDeFiActivitiesProps {
  tokenAddress: string;
}

export function TokenDeFiActivities({ tokenAddress }: TokenDeFiActivitiesProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: activitiesData, isLoading, error } = useTokenDeFiActivities(tokenAddress, page, pageSize);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading DeFi activities. Please try again later.
      </div>
    );
  }

  if (!activitiesData?.data || activitiesData.data.length === 0) {
    return (
      <div className="text-gray-400">
        No DeFi activities available for this token.
      </div>
    );
  }

  const totalPages = Math.ceil(activitiesData.data.length / pageSize);

  const renderRouter = (router: any, metadata: any) => {
    const token1 = metadata[router.token1];
    const token2 = router.token2 ? metadata[router.token2] : null;

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Image
            src={token1.token_icon}
            alt={token1.token_symbol}
            width={16}
            height={16}
            className="rounded-full"
          />
          <span>
            {formatNumber(Number(router.amount1) / Math.pow(10, router.token1_decimals))} {token1.token_symbol}
          </span>
        </div>
        {token2 && (
          <>
            <span>→</span>
            <div className="flex items-center gap-1">
              <Image
                src={token2.token_icon}
                alt={token2.token_symbol}
                width={16}
                height={16}
                className="rounded-full"
              />
              <span>
                {formatNumber(Number(router.amount2) / Math.pow(10, router.token2_decimals))} {token2.token_symbol}
              </span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          DeFi Activities
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activitiesData.data.map((activity, index) => (
          <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm text-gray-400">
                  {new Date(activity.time).toLocaleString()}
                </div>
                <div className="text-sm">
                  <Link 
                    href={`https://solscan.io/account/${activity.from_address}`}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {activity.from_address.slice(0, 4)}...{activity.from_address.slice(-4)}
                  </Link>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Value</div>
                <div className="font-medium">${formatNumber(activity.value)}</div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-sm text-gray-400 mb-1">Swap Route</div>
              {renderRouter(activity.routers, activitiesData.metadata.tokens)}
              {activity.routers.child_routers?.map((childRouter, i) => (
                <div key={i} className="ml-4 mt-1">
                  {renderRouter(childRouter, activitiesData.metadata.tokens)}
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              {activity.platform.map((platform, i) => (
                <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 