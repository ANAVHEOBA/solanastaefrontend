Connection Flow:
Account Analysis Hub
Solscan                    SolanaFM
/account/:address    ←→    /tagged-accounts
       ↓                         ↓
/account/transactions  ←→   /account-transactions
       ↓                         ↓
/account/portfolio    ←→    /account-fees





Token Intelligence Center
Solscan                    SolanaFM
/token/meta/multi    ←→    /token-info
       ↓                         ↓
/token/price/multi   ←→    /token-supply
       ↓                         ↓
/token/holders       ←→    /owner-token-accounts



Transaction Tracking System
Solscan                    SolanaFM
/transaction/detail  ←→    /actions
       ↓                         ↓
/transaction/actions  ←→    /transfer



Dashboard Layout:
┌─────────────────────────────────────────────────────┐
│                  Global Overview                    │
├────────────────┬────────────────┬──────────────────┤
│  Account Hub   │  Token Center  │ Transaction Feed │
│                │                │                  │
│ • Portfolio    │ • Token List   │ • Latest Txns   │
│ • Activities   │ • Price Data   │ • Actions       │
│ • Transfers    │ • Holdings     │ • Transfers     │
└────────────────┴────────────────┴──────────────────┘



Interactive Components:
Account Dashboard
Account Overview
├── Basic Info (Solscan)
├── Tagged Status (SolanaFM)
├── Transaction History
│   ├── Recent Activity (Solscan)
│   └── Fee Analysis (SolanaFM)
└── Portfolio View
    ├── Token Holdings (Solscan)
    └── Account Relationships (SolanaFM)



Token Intelligence
Token Analytics
├── Token Details
│   ├── Metadata (Solscan)
│   └── Supply Info (SolanaFM)
├── Market Data
│   ├── Price History (Solscan)
│   └── Holder Distribution (Solscan)
└── Activity Monitor
    ├── DeFi Actions (Solscan)
    └── Transfer Tracking (SolanaFM)



Transaction Monitor
Transaction Center
├── Recent Activity
│   ├── Latest Blocks (Solscan)
│   └── Action Feed (SolanaFM)
├── Detailed Analysis
│   ├── Transaction Details (Solscan)
│   └── Transfer Tracking (SolanaFM)
└── Market Activity
    ├── Market List (Solscan)
    └── Volume Data (Solscan)



Data Integration Points:
Account Analysis
Solscan Account Detail
       ↓
SolanaFM Tagged Info
       ↓
Combined Account Profile




Token Tracking
Solscan Token Metadata
       ↓
SolanaFM Token Info
       ↓
Unified Token Dashboard




Transaction Monitoring
Solscan Transaction Detail
       ↓
SolanaFM Action Data
       ↓
Complete Transaction View



Real-time Features:
Live Updates
• Transaction Feed
• Token Price Updates
• Account Balance Changes



Interactive Elements
• Clickable Addresses
• Token Price Charts
• Transaction Graphs



Search & Filter
• Address Search
• Token Filters
• Transaction Types


