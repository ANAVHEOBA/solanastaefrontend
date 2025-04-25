import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

export const formatAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatTimestamp = (timestamp: number) => {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleString();
}; 