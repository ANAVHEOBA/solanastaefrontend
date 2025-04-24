export const formatNumber = (num?: number): string => {
  if (!num) return '0';
  return new Intl.NumberFormat('en-US').format(num);
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