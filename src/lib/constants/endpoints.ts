const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
  },
  ACCOUNT: {
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
    METADATA: (address: string) => `${API_BASE_URL}/api/v1/solscan/token/meta/multi?address=${address}`,
    PRICE_HISTORY: (address: string) => `${API_BASE_URL}/api/v1/solscan/token/price/multi?address=${address}`,
  },
}; 