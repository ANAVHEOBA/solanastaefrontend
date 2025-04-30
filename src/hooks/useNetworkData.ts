"use client";

import { useQuery } from '@tanstack/react-query';
import { NetworkHealth, NetworkStats, ValidatorStats, BlockProduction, ClusterNodesResponse, LeaderSchedule, PrioritizationFees, Supply, Inflation, PerformanceSamplesResponse, AccountFeesResponse, SolscanAccountResponse, SolscanTransactionsResponse, PortfolioResponse, TokenAccountsResponse, TransferResponse, DeFiActivitiesResponse, TokenMetadataResponse, TokenPriceHistoryResponse, LatestTransactionsResponse, TransactionDetailResponse, TransactionActionsResponse, LatestBlocksResponse, BlockTransactionsResponse, LatestTransaction, LatestBlock, TransactionDetail, TransactionActions, BlockDetailResponse, BlockDetail, MarketListResponse, MarketPool, MarketInfoResponse, MarketInfo, MarketVolumeResponse, MarketVolume, StakeMinimumDelegation, ValidatorsResponse, Validator } from '@/types/network';
import { fetchBlockProduction, fetchClusterNodes, fetchValidatorStats, fetchLeaderSchedule, fetchPrioritizationFees, fetchSupply, fetchInflation, fetchPerformanceSamples, fetchAccountFees, fetchSolscanAccount, fetchSolscanTransactions, fetchSolscanPortfolio, fetchSolscanTokenAccounts, fetchSolscanTransfers, fetchSolscanDeFiActivities, fetchTokenMetadata, fetchTokenPriceHistory, fetchTokenHolders, fetchTokenTransfers, fetchTokenDefiActivities, fetchLatestTransactions, fetchTransactionDetail, fetchTransactionActions, fetchLatestBlocks, fetchBlockTransactions, fetchBlockDetail, fetchMarketList, fetchMarketInfo, fetchMarketVolume, fetchStakeMinimumDelegation, fetchValidators } from '@/services/networkData';
import { API_ENDPOINTS } from '@/lib/constants/endpoints';

export const useNetworkData = (page: number = 1, limit: number = 10) => {
  const healthQuery = useQuery({
    queryKey: ['networkHealth'],
    queryFn: () => fetch(API_ENDPOINTS.NETWORK.HEALTH).then(res => res.json()),
    refetchInterval: 300000, // 5 minutes
    staleTime: 300000, // 5 minutes
  });

  const networkStatsQuery = useQuery({
    queryKey: ['networkStats'],
    queryFn: () => fetch(API_ENDPOINTS.NETWORK.STATS).then(res => res.json()),
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const validatorStatsQuery = useQuery({
    queryKey: ['validatorStats'],
    queryFn: fetchValidatorStats,
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const blockProductionQuery = useQuery({
    queryKey: ['blockProduction'],
    queryFn: fetchBlockProduction,
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const clusterNodesQuery = useQuery({
    queryKey: ['clusterNodes', page, limit],
    queryFn: () => fetchClusterNodes(page, limit),
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const leaderScheduleQuery = useQuery({
    queryKey: ['leaderSchedule'],
    queryFn: () => fetchLeaderSchedule(),
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const prioritizationFeesQuery = useQuery({
    queryKey: ['prioritizationFees'],
    queryFn: () => fetchPrioritizationFees(),
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const supplyQuery = useQuery({
    queryKey: ['supply'],
    queryFn: () => fetchSupply(),
    refetchInterval: 300000,
    staleTime: 300000,
  });

  const inflationQuery = useQuery({
    queryKey: ['inflation'],
    queryFn: fetchInflation,
    refetchInterval: 300000,
    staleTime: 300000,
  });

  return {
    health: healthQuery.data,
    networkStats: networkStatsQuery.data,
    validatorStats: validatorStatsQuery.data,
    blockProduction: blockProductionQuery.data,
    clusterNodes: clusterNodesQuery.data,
    leaderSchedule: leaderScheduleQuery.data,
    prioritizationFees: prioritizationFeesQuery.data,
    supply: supplyQuery.data,
    inflation: inflationQuery.data,
    loading: healthQuery.isLoading || networkStatsQuery.isLoading || validatorStatsQuery.isLoading || blockProductionQuery.isLoading || clusterNodesQuery.isLoading || leaderScheduleQuery.isLoading || prioritizationFeesQuery.isLoading || supplyQuery.isLoading || inflationQuery.isLoading,
    error: healthQuery.error || networkStatsQuery.error || validatorStatsQuery.error || blockProductionQuery.error || clusterNodesQuery.error || leaderScheduleQuery.error || prioritizationFeesQuery.error || supplyQuery.error || inflationQuery.error,
  };
};

export const usePerformanceSamples = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['performanceSamples', page, limit],
    queryFn: () => fetchPerformanceSamples(page, limit),
    refetchInterval: 10000, // Refetch every 10 seconds
    select: (data: PerformanceSamplesResponse) => {
      if (!data || !data.result) return [];
      return data.result;
    },
  });
};

export const useAccountFees = (address: string, from: string, to: string) => {
  return useQuery({
    queryKey: ['accountFees', address, from, to],
    queryFn: () => fetchAccountFees(address, from, to),
    refetchInterval: 300000, // 5 minutes
    select: (data: AccountFeesResponse) => {
      if (!data || !data.data) return [];
      return data.data;
    },
  });
};

export const useSolscanAccount = (address: string) => {
  return useQuery({
    queryKey: ['solscanAccount', address],
    queryFn: () => fetchSolscanAccount(address),
    refetchInterval: 300000, // 5 minutes
    select: (data: SolscanAccountResponse) => {
      if (!data || !data.success) return null;
      return data.data;
    },
  });
};

export const useSolscanTransactions = (address: string, limit: number = 10) => {
  return useQuery({
    queryKey: ['solscanTransactions', address, limit],
    queryFn: () => fetchSolscanTransactions(address, limit),
    refetchInterval: 300000, // 5 minutes
    select: (data: SolscanTransactionsResponse) => {
      if (!data || !data.success) return [];
      return data.data;
    },
  });
};

export const useSolscanPortfolio = (address: string) => {
  return useQuery({
    queryKey: ['solscanPortfolio', address],
    queryFn: () => fetchSolscanPortfolio(address),
    refetchInterval: 300000, // 5 minutes
    select: (data: PortfolioResponse) => {
      if (!data || !data.success) return null;
      return data.data;
    },
  });
};

export const useSolscanTokenAccounts = (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  hideZero: boolean = true
) => {
  return useQuery({
    queryKey: ['solscanTokenAccounts', address, page, pageSize, hideZero],
    queryFn: () => fetchSolscanTokenAccounts(address, page, pageSize, hideZero),
    refetchInterval: 300000, // 5 minutes
    select: (data: TokenAccountsResponse) => {
      if (!data || !data.success) return null;
      return {
        accounts: data.data,
        metadata: data.metadata.tokens,
      };
    },
  });
};

export const useSolscanTransfers = (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'block_time',
  sortOrder: string = 'desc'
) => {
  return useQuery({
    queryKey: ['solscanTransfers', address, page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchSolscanTransfers(address, page, pageSize, sortBy, sortOrder),
    refetchInterval: 300000, // 5 minutes
    select: (data: TransferResponse) => {
      if (!data || !data.success) return null;
      return {
        transfers: data.data,
        metadata: data.metadata.tokens,
      };
    },
  });
};

export const useSolscanDeFiActivities = (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'block_time',
  sortOrder: string = 'desc'
) => {
  return useQuery({
    queryKey: ['solscanDeFiActivities', address, page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchSolscanDeFiActivities(address, page, pageSize, sortBy, sortOrder),
    refetchInterval: 300000, // 5 minutes
    select: (data: DeFiActivitiesResponse) => {
      if (!data || !data.success) return null;
      return {
        activities: data.data,
        metadata: data.metadata.tokens,
      };
    },
  });
};

export const useTokenMetadata = (address: string) => {
  return useQuery({
    queryKey: ['tokenMetadata', address],
    queryFn: () => fetchTokenMetadata(address),
    refetchInterval: 300000, // 5 minutes
    select: (data: TokenMetadataResponse) => {
      if (!data || !data.success) return null;
      return data.data[0]; // Return the first token metadata since we're querying a single address
    },
  });
};

export const useTokenPriceHistory = (address: string) => {
  return useQuery({
    queryKey: ['tokenPriceHistory', address],
    queryFn: () => fetchTokenPriceHistory(address),
    enabled: !!address,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useTokenHolders = (
  address: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['tokenHolders', address, page, pageSize],
    queryFn: () => fetchTokenHolders(address, page, pageSize),
    enabled: !!address,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useTokenTransfers = (
  address: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryKey: ['tokenTransfers', address, page, pageSize],
    queryFn: () => fetchTokenTransfers(address, page, pageSize),
    enabled: !!address,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useTokenDeFiActivities = (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'block_time',
  sortOrder: string = 'desc'
) => {
  return useQuery({
    queryKey: ['tokenDeFiActivities', address, page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchTokenDefiActivities(address, page, pageSize, sortBy, sortOrder),
    enabled: !!address,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useLatestTransactions = (limit: number = 10, filter?: string) => {
  return useQuery<LatestTransactionsResponse, Error, LatestTransaction[]>({
    queryKey: ['latestTransactions', limit, filter],
    queryFn: () => fetchLatestTransactions(limit, filter),
    refetchInterval: 10000,
    select: (data) => data.data,
  });
};

export const useLatestBlocks = (limit: number = 10) => {
  return useQuery<LatestBlocksResponse, Error, LatestBlock[]>({
    queryKey: ['latestBlocks', limit],
    queryFn: () => fetchLatestBlocks(limit),
    refetchInterval: 10000,
    select: (data) => data.data,
  });
};

export const useTransactionDetail = (txHash: string) => {
  return useQuery<TransactionDetailResponse, Error, TransactionDetail>({
    queryKey: ['transactionDetail', txHash],
    queryFn: () => fetchTransactionDetail(txHash),
    enabled: !!txHash,
    select: (data) => data.data,
  });
};

export const useTransactionActions = (txHash: string) => {
  return useQuery<TransactionActionsResponse, Error, TransactionActions>({
    queryKey: ['transactionActions', txHash],
    queryFn: () => fetchTransactionActions(txHash),
    enabled: !!txHash,
    select: (data) => data.data,
  });
};

export const useBlockTransactions = (blockNumber: number, page: number, pageSize: number) => {
  return useQuery<BlockTransactionsResponse, Error, BlockTransactionsResponse['data']>({
    queryKey: ['blockTransactions', blockNumber, page, pageSize],
    queryFn: () => fetchBlockTransactions(blockNumber, page, pageSize),
    enabled: !!blockNumber,
    refetchInterval: 10000,
    select: (data) => data.data,
  });
};

export const useBlockDetail = (blockNumber: number) => {
  return useQuery<BlockDetailResponse, Error, BlockDetail>({
    queryKey: ['blockDetail', blockNumber],
    queryFn: () => fetchBlockDetail(blockNumber),
    enabled: !!blockNumber,
    select: (data) => data.data,
  });
};

export const useMarketList = (
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'created_time',
  sortOrder: string = 'desc'
) => {
  return useQuery<MarketListResponse, Error, MarketPool[]>({
    queryKey: ['marketList', page, pageSize, sortBy, sortOrder],
    queryFn: () => fetchMarketList(page, pageSize, sortBy, sortOrder),
    refetchInterval: 300000, // Refetch every 5 minutes
    select: (data) => data.data,
  });
};

export const useMarketInfo = (address: string) => {
  return useQuery<MarketInfoResponse, Error, MarketInfo>({
    queryKey: ['marketInfo', address],
    queryFn: () => fetchMarketInfo(address),
    enabled: !!address,
    refetchInterval: 300000, // Refetch every 5 minutes
    select: (data) => data.data,
  });
};

export const useMarketVolume = (address: string, timeRange: string[]) => {
  return useQuery<MarketVolumeResponse, Error, MarketVolume>({
    queryKey: ['marketVolume', address, timeRange],
    queryFn: () => fetchMarketVolume(address, timeRange),
    enabled: !!address && timeRange.length > 0,
    refetchInterval: 300000, // Refetch every 5 minutes
    select: (data) => data.data,
  });
};

export const useStakeMinimumDelegation = () => {
  return useQuery<StakeMinimumDelegation, Error, number>({
    queryKey: ['stakeMinimumDelegation'],
    queryFn: fetchStakeMinimumDelegation,
    refetchInterval: 300000, // 5 minutes
    select: (data) => {
      if (!data?.result?.value) {
        throw new Error('Invalid stake minimum delegation data');
      }
      return data.result.value;
    },
  });
};

export const useValidators = (
  page: number = 1, 
  limit: number = 10,
  filters?: {
    status?: 'active' | 'inactive' | 'delinquent';
    minStake?: number;
    maxCommission?: number;
  }
) => {
  return useQuery<ValidatorsResponse, Error, { current: Validator[]; delinquent: Validator[]; pagination: ValidatorsResponse['result']['pagination'] }>({
    queryKey: ['validators', page, limit, filters],
    queryFn: () => fetchValidators(page, limit, filters),
    refetchInterval: 300000, // 5 minutes
    select: (data) => ({
      current: data.result.current,
      delinquent: data.result.delinquent,
      pagination: data.result.pagination,
    }),
  });
};

export const useLeaderSchedule = (page: number = 1, limit: number = 10) => {
  return useQuery<LeaderSchedule, Error, { data: Record<string, number[]>; pagination: LeaderSchedule['result']['pagination'] }>({
    queryKey: ['leaderSchedule', page, limit],
    queryFn: () => fetchLeaderSchedule(page, limit),
    refetchInterval: 300000, // 5 minutes
    select: (data) => ({
      data: data.result.data,
      pagination: data.result.pagination,
    }),
  });
}; 
   