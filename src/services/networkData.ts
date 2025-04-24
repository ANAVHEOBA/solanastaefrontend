import { BlockProduction, ClusterNodesResponse, ValidatorStats, LeaderSchedule, PrioritizationFees, Supply, Inflation, PerformanceSamplesResponse, AccountFeesResponse, SolscanAccountResponse, SolscanTransactionsResponse, PortfolioResponse, TokenAccountsResponse, TransferResponse, DeFiActivitiesResponse, TokenMetadataResponse, TokenPriceHistoryResponse } from '../types/network';
import { API_ENDPOINTS } from '../lib/constants/endpoints';

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
  const response = await fetch(`${API_ENDPOINTS.VALIDATORS.LEADER_SCHEDULE}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch leader schedule data');
  }

  return response.json();
};

export const fetchPrioritizationFees = async (limit: number = 5): Promise<PrioritizationFees> => {
  const response = await fetch(`${API_ENDPOINTS.VALIDATORS.PRIORITIZATION_FEES}?limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch prioritization fees data');
  }

  return response.json();
};

export const fetchSupply = async (page: number = 1, limit: number = 500): Promise<Supply> => {
  const response = await fetch(`${API_ENDPOINTS.NETWORK.SUPPLY}?page=${page}&limit=${limit}`);

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
  const response = await fetch(`${API_ENDPOINTS.NETWORK.PERFORMANCE_SAMPLES}?page=${page}&limit=${limit}`);

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
  const response = await fetch(API_ENDPOINTS.TOKEN.METADATA(address));

  if (!response.ok) {
    throw new Error('Failed to fetch token metadata');
  }

  return response.json();
};

export const fetchTokenPriceHistory = async (address: string): Promise<TokenPriceHistoryResponse> => {
  const response = await fetch(API_ENDPOINTS.TOKEN.PRICE_HISTORY(address));

  if (!response.ok) {
    throw new Error('Failed to fetch token price history');
  }

  return response.json();
}; 