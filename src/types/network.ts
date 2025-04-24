export interface NetworkHealth {
  jsonrpc: string;
  id: string;
  result: string;
}

export interface NetworkStats {
  jsonrpc: string;
  id: string;
  result: {
    absoluteSlot: number;
    blockHeight: number;
    epoch: number;
    slotIndex: number;
    slotsInEpoch: number;
    transactionCount: number;
    currentEpochProgress: number;
    averageSlotTime: number;
    currentSlotTime: number;
    inflationRate: {
      epoch: number;
      foundation: number;
      total: number;
      validator: number;
    };
  };
}

export interface ValidatorStats {
  jsonrpc: string;
  id: string;
  result: {
    totalActiveStake: number;
    totalDelinquentStake: number;
    averageCommission: number;
    totalValidators: number;
    activeValidators: number;
    delinquentValidators: number;
  };
}

export interface BlockProduction {
  jsonrpc: string;
  id: string;
  result: {
    context: {
      apiVersion: string;
      slot: number;
    };
    value: {
      byIdentity: Record<string, [number, number]>;
      range: {
        firstSlot: number;
        lastSlot: number;
      };
    };
  };
}

export interface ClusterNode {
  featureSet: number;
  gossip: string;
  pubkey: string;
  pubsub: string | null;
  rpc: string | null;
  serveRepair: string;
  shredVersion: number;
  tpu: string;
  tpuForwards: string;
  tpuForwardsQuic: string;
  tpuQuic: string;
  tpuVote: string;
  tvu: string;
  version: string;
}

export interface ClusterNodesResponse {
  jsonrpc: string;
  id: string;
  result: {
    data: ClusterNode[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface LeaderSchedule {
  jsonrpc: string;
  id: string;
  result: {
    data: Record<string, number[]>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface PrioritizationFees {
  jsonrpc: string;
  id: string;
  result: {
    data: Array<{
      slot: number;
    }>;
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface Supply {
  jsonrpc: string;
  id: string;
  result: {
    context: {
      slot: number;
    };
    value: {
      total: number;
      circulating: number;
      nonCirculating: number;
      nonCirculatingAccounts: string[];
    };
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface Inflation {
  jsonrpc: string;
  id: string;
  result: {
    epoch: number;
    foundation: number;
    total: number;
    validator: number;
  };
}

export interface PerformanceSample {
  numNonVoteTransactions: number;
  numSlots: number;
  numTransactions: number;
  samplePeriodSecs: number;
  slot: number;
}

export interface PerformanceSamplesResponse {
  jsonrpc: string;
  id: string;
  result: {
    data: PerformanceSample[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface AccountFees {
  tx_fees: number;
  time: string;
}

export interface AccountFeesResponse {
  data: AccountFees[];
}

export interface SolscanAccount {
  account: string;
  is_oncurve: boolean;
}

export interface SolscanAccountResponse {
  success: boolean;
  data: SolscanAccount;
  metadata: Record<string, unknown>;
}

export interface SolscanTransaction {
  slot: number;
  fee: number;
  status: string;
  signer: string[];
  block_time: number;
  tx_hash: string;
  parsed_instructions: Array<{
    type: string;
    program: string;
    program_id: string;
  }>;
  program_ids: string[];
  time: string;
}

export interface SolscanTransactionsResponse {
  success: boolean;
  data: SolscanTransaction[];
  metadata: Record<string, unknown>;
}

export interface TokenPortfolio {
  token_address: string;
  amount: number;
  balance: number;
  token_price: number;
  token_decimals: number;
  token_name: string;
  token_symbol: string;
  token_icon: string;
  value: number;
}

export interface PortfolioResponse {
  success: boolean;
  data: {
    total_value: number;
    native_balance: number | null;
    tokens: TokenPortfolio[];
  };
  metadata: Record<string, unknown>;
}

export interface TokenAccount {
  token_account: string;
  token_address: string;
  amount: number;
  token_decimals: number;
  owner: string;
}

export interface TokenMetadata {
  address: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  holder: number;
  creator: string;
  create_tx: string;
  created_time: number;
  metadata: any | null;
  mint_authority: string | null;
  freeze_authority: string | null;
  supply: string;
  price: number;
  volume_24h: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
}

export interface TokenMetadataResponse {
  success: boolean;
  data: TokenMetadata[];
  metadata: Record<string, unknown>;
}

export interface TokenAccountsResponse {
  success: boolean;
  data: TokenAccount[];
  metadata: {
    tokens: Record<string, TokenMetadata>;
  };
}

export interface Transfer {
  block_id: number;
  trans_id: string;
  block_time: number;
  activity_type: string;
  from_address: string;
  from_token_account: string;
  to_address: string;
  to_token_account: string;
  token_address: string;
  token_decimals: number;
  amount: number;
  flow: 'in' | 'out';
  value: number;
  time: string;
}

export interface TransferResponse {
  success: boolean;
  data: Transfer[];
  metadata: {
    tokens: Record<string, TokenMetadata>;
  };
}

export interface DeFiRouter {
  token1: string;
  token1_decimals: number;
  amount1: number;
  token2?: string;
  token2_decimals?: number;
  amount2?: number;
  child_routers?: DeFiRouter[];
}

export interface DeFiActivity {
  block_id: number;
  trans_id: string;
  block_time: number;
  activity_type: string;
  from_address: string;
  sources: string[];
  platform: string[];
  value: number;
  routers: DeFiRouter;
  time: string;
}

export interface DeFiActivitiesResponse {
  success: boolean;
  data: DeFiActivity[];
  metadata: {
    tokens: Record<string, TokenMetadata>;
  };
}

export interface TokenPriceHistory {
  token_address: string;
  prices: Array<{
    date: number;
    price: number;
  }>;
}

export interface TokenPriceHistoryResponse {
  success: boolean;
  data: TokenPriceHistory[];
  metadata: Record<string, unknown>;
} 