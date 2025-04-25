import { BlockProduction, ClusterNodesResponse, ValidatorStats, LeaderSchedule, PrioritizationFees, Supply, Inflation, PerformanceSamplesResponse, AccountFeesResponse, SolscanAccountResponse, SolscanTransactionsResponse, PortfolioResponse, TokenAccountsResponse, TransferResponse, DeFiActivitiesResponse, TokenMetadataResponse, TokenPriceHistoryResponse, TokenHoldersResponse, TokenTransferResponse, LatestTransactionsResponse, TransactionDetailResponse, TransactionActionsResponse, LatestBlocksResponse, BlockTransactionsResponse, BlockDetailResponse, MarketListResponse, MarketInfoResponse, MarketVolumeResponse, StakeMinimumDelegation } from '../types/network';
import { API_ENDPOINTS, API_BASE_URL } from '../lib/constants/endpoints';

export const fetchBlockProduction = async (): Promise<BlockProduction> => {
  const response = await fetch(API_ENDPOINTS.NETWORK.BLOCK_PRODUCTION);

  if (!response.ok) {
    throw new Error('Failed to fetch block production data');
  }

  return response.json();
};

export const fetchClusterNodes = async (): Promise<ClusterNodesResponse> => {
  const response = await fetch(API_ENDPOINTS.NETWORK.CLUSTER_NODES);

  if (!response.ok) {
    throw new Error('Failed to fetch cluster nodes data');
  }

  return response.json();
};

export const fetchValidatorStats = async (): Promise<ValidatorStats> => {
  const response = await fetch(API_ENDPOINTS.VALIDATORS.STATS);

  if (!response.ok) {
    throw new Error('Failed to fetch validator stats');
  }

  return response.json();
};

export const fetchLeaderSchedule = async (page: number = 1, limit: number = 10): Promise<LeaderSchedule> => {
  const url = new URL(API_ENDPOINTS.VALIDATORS.LEADER_SCHEDULE);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch leader schedule data');
  }

  return response.json();
};

export const fetchPrioritizationFees = async (limit: number = 5): Promise<PrioritizationFees> => {
  const url = new URL(API_ENDPOINTS.VALIDATORS.PRIORITIZATION_FEES);
  url.searchParams.append('limit', limit.toString());
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch prioritization fees data');
  }

  return response.json();
};

export const fetchSupply = async (page: number = 1, limit: number = 500): Promise<Supply> => {
  const url = new URL(API_ENDPOINTS.NETWORK.SUPPLY);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch supply data');
  }

  return response.json();
};

export const fetchInflation = async (): Promise<Inflation> => {
  const response = await fetch(API_ENDPOINTS.NETWORK.INFLATION);

  if (!response.ok) {
    throw new Error('Failed to fetch inflation data');
  }

  return response.json();
};

export const fetchPerformanceSamples = async (page: number = 1, limit: number = 10): Promise<PerformanceSamplesResponse> => {
  const url = new URL(API_ENDPOINTS.NETWORK.PERFORMANCE_SAMPLES);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to fetch performance samples data');
  }

  return response.json();
};

export const fetchAccountFees = async (address: string, from: string, to: string): Promise<AccountFeesResponse> => {
  const response = await fetch(`${API_ENDPOINTS.ACCOUNT.FEES}/${address}?from=${from}&to=${to}`);

  if (!response.ok) {
    throw new Error('Failed to fetch account fees data');
  }

  return response.json();
};

export const fetchSolscanAccount = async (address: string): Promise<SolscanAccountResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.ACCOUNT(address));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan account data');
  }

  return response.json();
};

export const fetchSolscanTransactions = async (address: string, limit: number = 10): Promise<SolscanTransactionsResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.TRANSACTIONS(address, limit));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan transactions data');
  }

  return response.json();
};

export const fetchSolscanPortfolio = async (address: string): Promise<PortfolioResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.PORTFOLIO(address));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan portfolio data');
  }

  return response.json();
};

export const fetchSolscanTokenAccounts = async (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  hideZero: boolean = true
): Promise<TokenAccountsResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.TOKEN_ACCOUNTS(address, page, pageSize, hideZero));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan token accounts data');
  }

  return response.json();
};

export const fetchSolscanTransfers = async (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'block_time',
  sortOrder: string = 'desc'
): Promise<TransferResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.TRANSFERS(address, page, pageSize, sortBy, sortOrder));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan transfers data');
  }

  return response.json();
};

export const fetchSolscanDeFiActivities = async (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'block_time',
  sortOrder: string = 'desc'
): Promise<DeFiActivitiesResponse> => {
  const response = await fetch(API_ENDPOINTS.ACCOUNT.SOLSCAN.DEFI_ACTIVITIES(address, page, pageSize, sortBy, sortOrder));

  if (!response.ok) {
    throw new Error('Failed to fetch Solscan DeFi activities data');
  }

  return response.json();
};

export const fetchTokenMetadata = async (address: string): Promise<TokenMetadataResponse> => {
  const url = API_BASE_URL + API_ENDPOINTS.TOKEN.METADATA + `?address=${address}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch token metadata');
  }

  return response.json();
};

export const fetchTokenPriceHistory = async (address: string): Promise<TokenPriceHistoryResponse> => {
  const url = API_ENDPOINTS.TOKEN.PRICE_HISTORY(address);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch token price history');
  }

  return response.json();
};

export const fetchTokenHolders = async (address: string, page: number = 1, pageSize: number = 10): Promise<TokenHoldersResponse> => {
  const url = API_BASE_URL + API_ENDPOINTS.TOKEN.HOLDERS + `?address=${address}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch token holders');
  }

  return response.json();
};

export const fetchTokenTransfers = async (address: string, page: number = 1, pageSize: number = 10): Promise<TokenTransferResponse> => {
  const url = API_BASE_URL + API_ENDPOINTS.TOKEN.TRANSACTIONS + `?address=${address}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch token transfers');
  }

  return response.json();
};

export const fetchTokenDefiActivities = async (
  address: string,
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'timestamp',
  sortOrder: string = 'desc'
): Promise<DeFiActivitiesResponse> => {
  const url = API_ENDPOINTS.TOKEN.DEFI_ACTIVITIES(address, page, pageSize, sortBy, sortOrder);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch token defi activities');
  }

  return response.json();
};

export const fetchLatestTransactions = async (limit: number = 10, filter?: string): Promise<LatestTransactionsResponse> => {
  const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.TRANSACTION.LATEST}`);
  if (limit) url.searchParams.append('limit', limit.toString());
  if (filter) url.searchParams.append('filter', filter);

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch latest transactions');
  }

  return response.json();
};

export const fetchLatestBlocks = async (limit: number = 10): Promise<LatestBlocksResponse> => {
  const response = await fetch(API_ENDPOINTS.TRANSACTION.BLOCKS(limit), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch latest blocks');
  }

  return response.json();
};

export const fetchTransactionDetail = async (txHash: string): Promise<TransactionDetailResponse> => {
  try {
    const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.TRANSACTION.DETAIL}`);
    url.searchParams.append('tx', txHash);
    
    // Add required headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch transaction detail: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transaction detail:', error);
    throw error;
  }
};

export const fetchTransactionActions = async (txHash: string): Promise<TransactionActionsResponse> => {
  try {
    const url = new URL(`${API_BASE_URL}${API_ENDPOINTS.TRANSACTION.ACTIONS}`);
    url.searchParams.append('tx', txHash);
    
    // Add required headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to fetch transaction actions: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transaction actions:', error);
    throw error;
  }
};

export const fetchBlockTransactions = async (
  blockNumber: number,
  page: number = 1,
  pageSize: number = 10,
  excludeVote: boolean = true
): Promise<BlockTransactionsResponse> => {
  const url = new URL(`${API_BASE_URL}/api/v1/solscan/block/transactions`);
  url.searchParams.append('block', blockNumber.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('page_size', pageSize.toString());
  url.searchParams.append('exclude_vote', excludeVote.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch block transactions: ${response.statusText}`);
  }

  return response.json();
};

export const fetchBlockDetail = async (blockNumber: number): Promise<BlockDetailResponse> => {
  const url = new URL(`${API_BASE_URL}/api/v1/solscan/block/detail`);
  url.searchParams.append('block', blockNumber.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch block detail: ${response.statusText}`);
  }

  return response.json();
};

export const fetchMarketList = async (
  page: number = 1,
  pageSize: number = 10,
  sortBy: string = 'created_time',
  sortOrder: string = 'desc'
): Promise<MarketListResponse> => {
  const url = new URL(`${API_BASE_URL}/api/v1/solscan/market/list`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('page_size', pageSize.toString());
  url.searchParams.append('sort_by', sortBy);
  url.searchParams.append('sort_order', sortOrder);

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch market list: ${response.statusText}`);
  }

  return response.json();
};

export const fetchMarketInfo = async (address: string): Promise<MarketInfoResponse> => {
  const url = new URL(`${API_BASE_URL}/api/v1/solscan/market/info`);
  url.searchParams.append('address', address);

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch market info: ${response.statusText}`);
  }

  return response.json();
};

export const fetchMarketVolume = async (address: string, timeRange: string[]): Promise<MarketVolumeResponse> => {
  const url = new URL(`${API_BASE_URL}/api/v1/solscan/market/volume`);
  url.searchParams.append('address', address);
  timeRange.forEach(time => url.searchParams.append('time[]', time));

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch market volume: ${response.statusText}`);
  }

  return response.json();
};

export const fetchStakeMinimumDelegation = async (): Promise<StakeMinimumDelegation> => {
  const response = await fetch(API_ENDPOINTS.VALIDATORS.STAKE_MINIMUM_DELEGATION, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch stake minimum delegation');
  }

  return response.json();
};