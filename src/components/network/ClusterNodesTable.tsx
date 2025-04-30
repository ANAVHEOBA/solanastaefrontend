import { useState } from 'react';
import { ClusterNode } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ClusterNodesTableProps {
  nodes: ClusterNode[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export const ClusterNodesTable = ({ nodes, pagination, onPageChange }: ClusterNodesTableProps) => {
  const [sortField, setSortField] = useState<keyof ClusterNode>('pubkey');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof ClusterNode) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      onPageChange(newPage);
    }
  };

  const sortedNodes = [...nodes].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Cluster Nodes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead>
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('pubkey')}
              >
                Public Key
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('version')}
              >
                Version
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('featureSet')}
              >
                Feature Set
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('shredVersion')}
              >
                Shred Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Endpoints
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedNodes.map((node) => (
              <tr key={node.pubkey} className="hover:bg-slate-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">
                  {node.pubkey}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {node.version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {formatNumber(node.featureSet)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {node.shredVersion}
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  <div className="space-y-1">
                    <div>Gossip: {node.gossip}</div>
                    <div>TPU: {node.tpu}</div>
                    <div>TVU: {node.tvu}</div>
                    {node.rpc && <div>RPC: {node.rpc}</div>}
                    {node.pubsub && <div>PubSub: {node.pubsub}</div>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing {nodes.length} of {pagination.total} nodes
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-2 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm text-slate-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 