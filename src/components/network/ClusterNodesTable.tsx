import { ClusterNode } from '@/types/network';

interface ClusterNodesTableProps {
  nodes: ClusterNode[];
  isLoading?: boolean;
}

export const ClusterNodesTable = ({ nodes, isLoading }: ClusterNodesTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 animate-pulse">
        <div className="h-6 w-1/4 bg-slate-800 rounded mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Cluster Nodes</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-slate-800">
              <th className="pb-3">Pubkey</th>
              <th className="pb-3">Version</th>
              <th className="pb-3">Gossip</th>
              <th className="pb-3">RPC</th>
              <th className="pb-3">TPU</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr key={node.pubkey} className="border-b border-slate-800">
                <td className="py-3 text-sm text-gray-300">
                  <span className="font-mono">{node.pubkey.slice(0, 8)}...</span>
                </td>
                <td className="py-3 text-sm text-gray-300">{node.version}</td>
                <td className="py-3 text-sm text-gray-300">{node.gossip}</td>
                <td className="py-3 text-sm text-gray-300">{node.rpc || '-'}</td>
                <td className="py-3 text-sm text-gray-300">{node.tpu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 