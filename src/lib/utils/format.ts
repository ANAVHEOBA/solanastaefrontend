export const formatTimestamp = (timestamp: number): string => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatAddress = (address: string): string => {
  if (!address) return 'N/A';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatSol = (lamports: number): string => {
  return (lamports / 1e9).toFixed(9);
};

export const formatPercentage = (num?: number): string => {
  if (!num) return '0%';
  return `${num.toFixed(2)}%`;
};

export const formatCurrency = (num?: number): string => {
  if (!num) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const formatLamports = (lamports?: number): string => {
  if (!lamports) return '0 LAMPORTS';
  return `${formatNumber(lamports)} LAMPORTS`;
}; 