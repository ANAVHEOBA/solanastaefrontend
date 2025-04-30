import { ClusterNode } from '@/types/network';

interface ClusterNodesStatsProps {
  nodes: ClusterNode[];
}

export const ClusterNodesStats = ({ nodes }: ClusterNodesStatsProps) => {
  const totalNodes = nodes.length;
  const nodesWithRPC = nodes.filter(node => node.rpc !== null).length;
  const nodesWithPubSub = nodes.filter(node => node.pubsub !== null).length;
  const uniqueVersions = new Set(nodes.map(node => node.version)).size;
  const uniqueShredVersions = new Set(nodes.map(node => node.shredVersion)).size;

  const stats = [
    { name: 'Total Nodes', value: totalNodes },
    { name: 'Nodes with RPC', value: nodesWithRPC },
    { name: 'Nodes with PubSub', value: nodesWithPubSub },
    { name: 'Unique Versions', value: uniqueVersions },
    { name: 'Unique Shred Versions', value: uniqueShredVersions },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Cluster Nodes Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-800 rounded-lg p-4">
            <dt className="text-sm font-medium text-gray-400">{stat.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-white">{stat.value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}; 