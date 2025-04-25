export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  NETWORK: {
    HEALTH: `${API_BASE_URL}/api/v1/network/health`,
    STATS: `${API_BASE_URL}/api/v1/network/stats`,
    BLOCK_PRODUCTION: `${API_BASE_URL}/api/v1/network/block-production`,
    CLUSTER_NODES: `${API_BASE_URL}/api/v1/network/cluster-nodes`,
    SUPPLY: `${API_BASE_URL}/api/v1/network/supply`,
    INFLATION: `${API_BASE_URL}/api/v1/network/inflation`,
    PERFORMANCE_SAMPLES: `${API_BASE_URL}/api/v1/network/performance-samples`,
  },
  VALIDATORS: {
    STATS: `${API_BASE_URL}/api/v1/validators/stats`,
    LEADER_SCHEDULE: `${API_BASE_URL}/api/v1/validators/leader-schedule`,
    PRIORITIZATION_FEES: `${API_BASE_URL}/api/v1/validators/prioritization-fees`,
    STAKE_MINIMUM_DELEGATION: `${API_BASE_URL}/api/v1/validators/stake-minimum-delegation`,
  },
  ACCOUNT: {
    BALANCE: `${API_BASE_URL}/api/v1/account/balance`,
    TOKENS: `${API_BASE_URL}/api/v1/account/tokens`,
    TRANSACTIONS: `${API_BASE_URL}/api/v1/account/transactions`,
    FEES: (address: string) => `${API_BASE_URL}/api/v1/solanafm/account-fees/${address}`,
    SOLSCAN: {
      ACCOUNT: (address: string) => `${API_BASE_URL}/api/v1/solscan/account/${address}`,
      TRANSACTIONS: (address: string, limit: number = 10) => 
        `${API_BASE_URL}/api/v1/solscan/account/${address}/transactions?limit=${limit}`,
      PORTFOLIO: (address: string) => 
        `${API_BASE_URL}/api/v1/solscan/account/${address}/portfolio`,
      TOKEN_ACCOUNTS: (address: string, page: number = 1, pageSize: number = 10, hideZero: boolean = true) =>
        `${API_BASE_URL}/api/v1/solscan/account/${address}/token-accounts?type=token&page=${page}&pageSize=${pageSize}&hideZero=${hideZero}`,
      TRANSFERS: (address: string, page: number = 1, pageSize: number = 10, sortBy: string = 'block_time', sortOrder: string = 'desc') =>
        `${API_BASE_URL}/api/v1/solscan/account/${address}/transfer?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`,
      DEFI_ACTIVITIES: (address: string, page: number = 1, pageSize: number = 10, sortBy: string = 'block_time', sortOrder: string = 'desc') =>
        `${API_BASE_URL}/api/v1/solscan/account/${address}/defi/activities?page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`,
    },
  },
  TOKEN: {
    METADATA: `${API_BASE_URL}/api/v1/token/metadata`,
    PRICE_HISTORY: (address: string) => `${API_BASE_URL}/api/v1/solscan/token/price/multi?address=${address}`,
    HOLDERS: `${API_BASE_URL}/api/v1/token/holders`,
    TRANSACTIONS: `${API_BASE_URL}/api/v1/token/transactions`,
    DEFI_ACTIVITIES: (address: string, page: number = 1, pageSize: number = 10, sortBy: string = 'block_time', sortOrder: string = 'desc') => {
      return `${API_BASE_URL}/api/v1/solscan/token/defi/activities?address=${address}&page=${page}&page_size=${pageSize}&sort_by=${sortBy}&sort_order=${sortOrder}`;
    },
  },
  TRANSACTION: {
    DETAIL: `${API_BASE_URL}/api/v1/transaction/detail`,
    ACTIONS: `${API_BASE_URL}/api/v1/transaction/actions`,
    LATEST: `${API_BASE_URL}/api/v1/transaction/latest`,
    BLOCKS: (limit: number = 10) => {
      const url = new URL(`${API_BASE_URL}/api/v1/solscan/block/last`);
      url.searchParams.append('limit', limit.toString());
      return url.toString();
    },
    BLOCK_TRANSACTIONS: `${API_BASE_URL}/api/v1/solscan/block/transactions`,
  },
  SOLSCAN: {
    BLOCK_TRANSACTIONS: `${API_BASE_URL}/api/v1/solscan/block/transactions`,
    BLOCK_DETAIL: `${API_BASE_URL}/api/v1/solscan/block/detail`,
    MARKET_LIST: `${API_BASE_URL}/api/v1/solscan/market/list`,
    MARKET_INFO: (address: string) => `${API_BASE_URL}/api/v1/solscan/market/info?address=${address}`,
    MARKET_VOLUME: (address: string, timeRange: string[]) => {
      const url = new URL(`${API_BASE_URL}/api/v1/solscan/market/volume`);
      url.searchParams.append('address', address);
      timeRange.forEach(time => url.searchParams.append('time[]', time));
      return url.toString();
    },
  },
} as const; 