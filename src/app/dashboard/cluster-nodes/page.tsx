"use client";

import { useState } from 'react';
import { useNetworkData } from '@/hooks/useNetworkData';
import { ClusterNodesTable } from '@/components/network/ClusterNodesTable';
import { ClusterNodesStats } from '@/components/network/ClusterNodesStats';
import { ClusterNodesDiagram } from '@/components/network/ClusterNodesDiagram';

export default function ClusterNodesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { clusterNodes, loading, error } = useNetworkData(currentPage, 10);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading cluster nodes data</div>;
  }

  const pagination = {
    total: clusterNodes?.result?.pagination?.total || 0,
    page: currentPage,
    limit: clusterNodes?.result?.pagination?.limit || 10,
    totalPages: clusterNodes?.result?.pagination?.totalPages || 0,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cluster Nodes Analysis</h1>
      <div className="grid grid-cols-1 gap-6">
        <ClusterNodesStats nodes={clusterNodes?.result?.data || []} />
        <ClusterNodesDiagram nodes={clusterNodes?.result?.data || []} />
        <ClusterNodesTable 
          nodes={clusterNodes?.result?.data || []} 
          pagination={pagination}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}