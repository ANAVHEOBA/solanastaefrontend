import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { BlockProduction, ClusterNodesResponse } from '../types/network';
import { fetchBlockProduction, fetchClusterNodes } from '../services/networkData';
import { API_ENDPOINTS } from '../lib/constants/endpoints';

interface NetworkDataContextType {
  blockProduction: BlockProduction | null;
  clusterNodes: ClusterNodesResponse | null;
  loading: boolean;
  error: string | null;
}

const NetworkDataContext = createContext<NetworkDataContextType | undefined>(undefined);

export const useNetworkData = () => {
  const context = useContext(NetworkDataContext);
  if (!context) {
    throw new Error('useNetworkData must be used within a NetworkDataProvider');
  }
  return context;
};

interface NetworkDataProviderProps {
  children: ReactNode;
}

export const NetworkDataProvider = ({ children }: NetworkDataProviderProps) => {
  const [blockProduction, setBlockProduction] = useState<BlockProduction | null>(null);
  const [clusterNodes, setClusterNodes] = useState<ClusterNodesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockProduction = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.NETWORK.BLOCK_PRODUCTION);
      if (!response.ok) {
        throw new Error('Failed to fetch block production data');
      }
      const data = await response.json();
      setBlockProduction(data);
      return data;
    } catch (error) {
      console.error('Error fetching block production:', error);
      setBlockProduction(null);
      return null;
    }
  };

  const fetchClusterNodes = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.NETWORK.CLUSTER_NODES);
      if (!response.ok) {
        throw new Error('Failed to fetch cluster nodes data');
      }
      const data = await response.json();
      setClusterNodes(data);
      return data;
    } catch (error) {
      console.error('Error fetching cluster nodes:', error);
      setClusterNodes(null);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blockProductionData, clusterNodesData] = await Promise.all([
          fetchBlockProduction(),
          fetchClusterNodes(),
        ]);
        setBlockProduction(blockProductionData);
        setClusterNodes(clusterNodesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <NetworkDataContext.Provider value={{ blockProduction, clusterNodes, loading, error }}>
      {children}
    </NetworkDataContext.Provider>
  );
}; 