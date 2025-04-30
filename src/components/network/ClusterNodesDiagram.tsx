import { useState } from 'react';
import { ClusterNode } from '@/types/network';
import { formatNumber } from '@/lib/utils/format';

interface ClusterNodesDiagramProps {
  nodes: ClusterNode[];
}

export const ClusterNodesDiagram = ({ nodes }: ClusterNodesDiagramProps) => {
  const [selectedMetric, setSelectedMetric] = useState<'version' | 'featureSet' | 'capabilities'>('version');
  
  const totalNodes = nodes.length;
  const nodesWithRPC = nodes.filter(node => node.rpc !== null).length;
  const nodesWithPubSub = nodes.filter(node => node.pubsub !== null).length;
  const uniqueVersions = new Set(nodes.map(node => node.version)).size;
  const uniqueShredVersions = new Set(nodes.map(node => node.shredVersion)).size;

  // Advanced statistics calculations
  const versionDistribution = nodes.reduce((acc, node) => {
    acc[node.version] = (acc[node.version] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const featureSetDistribution = nodes.reduce((acc, node) => {
    const featureSet = node.featureSet.toString();
    acc[featureSet] = (acc[featureSet] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate network health metrics
  const networkHealth = {
    rpcCoverage: (nodesWithRPC / totalNodes) * 100,
    pubsubCoverage: (nodesWithPubSub / totalNodes) * 100,
    versionDiversity: (uniqueVersions / totalNodes) * 100,
    shredVersionDiversity: (uniqueShredVersions / totalNodes) * 100
  };

  // Calculate geographic distribution (based on IP patterns)
  const geographicDistribution = nodes.reduce((acc, node) => {
    const ip = node.gossip.split(':')[0];
    const region = ip.startsWith('64.') ? 'North America' :
                  ip.startsWith('185.') ? 'Europe' :
                  ip.startsWith('146.') ? 'Europe' :
                  ip.startsWith('91.') ? 'Europe' :
                  ip.startsWith('217.') ? 'Europe' :
                  ip.startsWith('213.') ? 'Europe' :
                  ip.startsWith('89.') ? 'Europe' :
                  ip.startsWith('67.') ? 'North America' :
                  ip.startsWith('92.') ? 'Europe' : 'Other';
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-slate-900 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Advanced Network Analytics</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedMetric('version')}
            className={`px-3 py-1 rounded-md ${
              selectedMetric === 'version' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-700 text-gray-300'
            }`}
          >
            Version Stats
          </button>
          <button
            onClick={() => setSelectedMetric('featureSet')}
            className={`px-3 py-1 rounded-md ${
              selectedMetric === 'featureSet' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-700 text-gray-300'
            }`}
          >
            Feature Sets
          </button>
          <button
            onClick={() => setSelectedMetric('capabilities')}
            className={`px-3 py-1 rounded-md ${
              selectedMetric === 'capabilities' 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-700 text-gray-300'
            }`}
          >
            Capabilities
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Network Health Dashboard */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Network Health Metrics</h3>
          <div className="space-y-4">
            {Object.entries(networkHealth).map(([metric, value]) => (
              <div key={metric} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-300">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm text-gray-300">{value.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Geographic Distribution</h3>
          <div className="h-48 flex items-end space-x-2">
            {Object.entries(geographicDistribution)
              .sort((a, b) => b[1] - a[1])
              .map(([region, count]) => (
                <div key={region} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-green-500"
                    style={{ height: `${(count / totalNodes) * 100}%` }}
                  />
                  <div className="text-xs text-gray-400 mt-1 text-center">
                    {region}
                    <br />
                    {count}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Version Distribution (Interactive) */}
        {selectedMetric === 'version' && (
          <div className="bg-slate-800 rounded-lg p-4 md:col-span-2">
            <h3 className="text-lg font-medium text-white mb-4">Version Distribution Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {Object.entries(versionDistribution).map(([version, count], index, array) => {
                    const percentage = (count / totalNodes) * 100;
                    const previousPercentages = array
                      .slice(0, index)
                      .reduce((sum, [_, c]) => sum + (c / totalNodes) * 100, 0);
                    const offset = previousPercentages * 2.83;
                    
                    return (
                      <g key={version}>
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={index % 2 === 0 ? "#10B981" : "#3B82F6"}
                          strokeWidth="10"
                          strokeDasharray={`${percentage * 2.83} ${283}`}
                          strokeDashoffset={`-${offset}`}
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="4"
                        >
                          {version}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="space-y-4">
                {Object.entries(versionDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([version, count]) => (
                    <div key={version} className="bg-slate-700 rounded p-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-300">{version}</span>
                        <span className="text-sm text-gray-300">{count} nodes</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {((count / totalNodes) * 100).toFixed(1)}% of network
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Feature Set Analysis */}
        {selectedMetric === 'featureSet' && (
          <div className="bg-slate-800 rounded-lg p-4 md:col-span-2">
            <h3 className="text-lg font-medium text-white mb-4">Feature Set Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {Object.entries(featureSetDistribution)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                    .slice(0, 5)
                    .map(([featureSet, count], index) => {
                      const percentage = (count / totalNodes) * 100;
                      return (
                        <g key={featureSet} transform={`translate(0, ${index * 20})`}>
                          <rect
                            x="10"
                            y="0"
                            width={percentage}
                            height="15"
                            fill="#3B82F6"
                          />
                          <text
                            x="5"
                            y="10"
                            fill="white"
                            fontSize="4"
                          >
                            {formatNumber(parseInt(featureSet))}
                          </text>
                          <text
                            x={percentage + 15}
                            y="10"
                            fill="white"
                            fontSize="4"
                          >
                            {count} nodes
                          </text>
                        </g>
                      );
                    })}
                </svg>
              </div>
              <div className="space-y-4">
                {Object.entries(featureSetDistribution)
                  .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                  .map(([featureSet, count]) => (
                    <div key={featureSet} className="bg-slate-700 rounded p-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-300">
                          Feature Set {formatNumber(parseInt(featureSet))}
                        </span>
                        <span className="text-sm text-gray-300">{count} nodes</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {((count / totalNodes) * 100).toFixed(1)}% of network
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Capabilities Analysis */}
        {selectedMetric === 'capabilities' && (
          <div className="bg-slate-800 rounded-lg p-4 md:col-span-2">
            <h3 className="text-lg font-medium text-white mb-4">Node Capabilities Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background grid */}
                  {[20, 40, 60, 80].map((radius) => (
                    <circle
                      key={radius}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="none"
                      stroke="#374151"
                      strokeWidth="0.5"
                    />
                  ))}
                  
                  {/* Radar chart with labels */}
                  <polygon
                    points={`
                      50,${50 - (nodesWithRPC / totalNodes) * 40}
                      ${50 + (nodesWithPubSub / totalNodes) * 40},50
                      50,${50 + (uniqueVersions / totalNodes) * 40}
                      ${50 - (uniqueShredVersions / totalNodes) * 40},50
                    `}
                    fill="#3B82F6"
                    fillOpacity="0.3"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  
                  {/* Labels */}
                  <text x="50" y="5" textAnchor="middle" fill="white" fontSize="4">RPC</text>
                  <text x="95" y="50" textAnchor="end" fill="white" fontSize="4">PubSub</text>
                  <text x="50" y="95" textAnchor="middle" fill="white" fontSize="4">Versions</text>
                  <text x="5" y="50" textAnchor="start" fill="white" fontSize="4">Shred</text>
                </svg>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700 rounded p-4">
                  <h4 className="text-sm font-medium text-white mb-2">RPC Coverage</h4>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${networkHealth.rpcCoverage}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      {nodesWithRPC} nodes
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <h4 className="text-sm font-medium text-white mb-2">PubSub Coverage</h4>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${networkHealth.pubsubCoverage}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      {nodesWithPubSub} nodes
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Version Diversity</h4>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500"
                        style={{ width: `${networkHealth.versionDiversity}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      {uniqueVersions} versions
                    </span>
                  </div>
                </div>
                <div className="bg-slate-700 rounded p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Shred Version Diversity</h4>
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500"
                        style={{ width: `${networkHealth.shredVersionDiversity}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-300">
                      {uniqueShredVersions} versions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};