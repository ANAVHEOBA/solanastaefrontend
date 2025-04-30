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
  token_address: string;
  token_name: string;
  token_symbol: string;
  token_icon: string;
  decimals: number;
  holder?: number;
  creator?: string;
  create_tx?: string;
  created_time?: number;
  metadata?: any | null;
  mint_authority?: string | null;
  freeze_authority?: string | null;
  supply?: string;
  price?: number;
  volume_24h?: number;
  market_cap?: number;
  market_cap_rank?: number;
  price_change_24h?: number;
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
  amount1: number | string;
  token2?: string;
  token2_decimals?: number;
  amount2?: number | string;
  program_address?: string;
  pool_address?: string;
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
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
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

export interface TokenPriceHistoryParams {
  address: string;
  from_time?: string; // Format: YYYYMMDD
  to_time?: string;   // Format: YYYYMMDD
}

export interface TokenHolder {
  address: string;
  amount: number;
  decimals: number;
  owner: string;
  rank: number;
}

export interface TokenHoldersResponse {
  success: boolean;
  data: {
    total: number;
    items: TokenHolder[];
  };
  metadata: Record<string, unknown>;
}

export interface TokenTransfer {
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
  value: number;
  time: string;
}

export interface TokenTransferResponse {
  success: boolean;
  data: TokenTransfer[];
  metadata: {
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
  };
}

export interface LatestTransaction {
  fee: number;
  signer: string[];
  slot: number;
  status: string;
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

export interface LatestTransactionsResponse {
  success: boolean;
  data: LatestTransaction[];
  metadata: Record<string, unknown>;
}

export interface TransactionDetail {
  block_id: number;
  fee: number;
  reward: any[];
  sol_bal_change: Array<{
    address: string;
    pre_balance: string;
    post_balance: string;
    change_amount: string;
  }>;
  token_bal_change: Array<{
    address: string;
    change_type: string;
    change_amount: string;
    decimals: number;
    post_balance: string;
    pre_balance: string;
    token_address: string;
    owner: string;
    post_owner: string;
    pre_owner: string;
  }>;
  tokens_involved: string[];
  parsed_instructions: Array<{
    ins_index: number;
    parsed_type: string;
    type: string;
    program_id: string;
    program: string;
    outer_program_id: string | null;
    outer_ins_index: number;
    data_raw: any;
    accounts: string[];
    activities: any[];
    transfers: any[];
    inner_instructions: any[];
    program_invoke_level: number;
    idl_data?: any;
  }>;
  programs_involved: string[];
  signer: string[];
  list_signer: string[];
  status: number;
  account_keys: Array<{
    pubkey: string;
    writable: boolean;
    signer: boolean;
    source: string;
  }>;
  compute_units_consumed: number;
  confirmations: null;
  version: number;
  priority_fee: number;
  tx_hash: string;
  block_time: number;
  address_table_lookup: any[];
  log_message: string[];
  recent_block_hash: string;
  tx_status: string;
}

export interface TransactionDetailResponse {
  success: boolean;
  data: TransactionDetail;
  metadata: {
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
  };
}

export interface TransactionAction {
  activity_type: string;
  program_id: string;
  data: Record<string, any>;
  ins_index: number;
  outer_ins_index: number;
  outer_program_id: string | null;
}

export interface TransactionTransfer {
  source_owner: string;
  source: string;
  destination: string;
  destination_owner: string;
  transfer_type: string;
  token_address: string;
  decimals: number;
  amount_str: string;
  amount: number;
  program_id: string;
  outer_program_id: string;
  ins_index: number;
  outer_ins_index: number;
  base_value?: {
    token_address: string;
    decimals: number;
    amount: number;
    amount_str: string;
  };
}

export interface TransactionSummary {
  title: {
    activity_type: string;
    program_id: string;
    data: Record<string, any>;
  };
  body: TransactionAction[];
}

export interface TransactionActions {
  tx_hash: string;
  block_id: number;
  block_time: number;
  time: string;
  fee: number;
  summaries: TransactionSummary[];
  transfers: TransactionTransfer[];
  activities: TransactionAction[];
  metadata?: {
    tokens: Record<string, TokenMetadata>;
  };
}

export interface TransactionActionsResponse {
  success: boolean;
  data: TransactionActions;
  metadata: {
    tokens: Record<string, {
      token_address: string;
      token_name: string;
      token_symbol: string;
      token_icon: string;
    }>;
  };
}

export interface LatestBlock {
  blockhash: string;
  fee_rewards: number;
  transactions_count: number;
  current_slot: number;
  block_height: number;
  block_time: number;
  time: string;
  parent_slot: number;
  previous_block_hash: string;
}

export interface LatestBlocksResponse {
  success: boolean;
  data: LatestBlock[];
  metadata: Record<string, unknown>;
}

export interface BlockTransaction {
  slot: number;
  fee: number;
  status: string;
  signer: string[];
  block_time: number;
  tx_hash: string;
  program_ids: string[];
  time: string;
  parsed_instructions: {
    type: string;
    program: string;
    program_id: string;
  }[];
}

export interface BlockTransactionsResponse {
  success: boolean;
  data: {
    total: number;
    transactions: BlockTransaction[];
  };
  metadata: Record<string, unknown>;
}

export interface BlockDetail {
  slot: number;
  blockhash: string;
  totalMevRewards: string;
  fee_rewards: number;
  transactions_count: number;
  block_height: number;
  block_time: number;
  time: string;
  parent_slot: number;
  previous_block_hash: string;
}

export interface BlockDetailResponse {
  success: boolean;
  data: BlockDetail;
  metadata: Record<string, unknown>;
}

export interface MarketPool {
  pool_address: string;
  program_id: string;
  token1: string;
  token1_account: string;
  token2: string;
  token2_account: string;
  created_time: number;
}

export interface MarketListResponse {
  success: boolean;
  data: MarketPool[];
  metadata: Record<string, unknown>;
}

export interface TokenInfo {
  token: string;
  token_account: string;
  amount: number;
}

export interface MarketInfo {
  pool_address: string;
  program_id: string;
  tokens_info: TokenInfo[];
  create_tx_hash: string;
  create_block_time: number;
  creator: string;
}

export interface MarketInfoResponse {
  success: boolean;
  data: MarketInfo;
  metadata: Record<string, unknown>;
}

export interface MarketVolume {
  pool_address: string;
  program_id: string;
  total_volume_24h: number;
  total_volume_change_24h: number;
  total_trades_24h: number;
  total_trades_change_24h: number;
}

export interface MarketVolumeResponse {
  success: boolean;
  data: MarketVolume;
  metadata: Record<string, unknown>;
}

export interface StakeMinimumDelegation {
  jsonrpc: string;
  id: string;
  result: {
    context: {
      slot: number;
    };
    value: number;
  };
}

export interface Validator {
  activatedStake: number;
  commission: number;
  epochCredits: Array<[number, number, number]>;
  epochVoteAccount: boolean;
  lastVote: number;
  nodePubkey: string;
  rootSlot: number;
  votePubkey: string;
  status: 'active' | 'inactive' | 'delinquent';
}

export interface ValidatorsResponse {
  jsonrpc: string;
  id: string;
  result: {
    current: Validator[];
    delinquent: Validator[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
} 