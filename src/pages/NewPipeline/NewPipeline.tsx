// src/pages/NewPipeline/NewPipeline.tsx
import { useState, useMemo, useCallback } from 'react';
import {
  pipelinePage, pipelineTitle, pipelineSubtitle,
  legendBar, legendItem,
  pipelineContainer, pipelineInner,
  pipelineNode, pipelineNodeSelected, pipelineNodeDimmed,
  nodeHeader, nodeLeft, nodeLabel, nodeLabelText,
  nodeSub, nodePulse, nodeFiles, nodeFileTag, nodePerfTag, nodePerfDot, nodePerfText, nodeGlowOverlay,
  connector, connectorLine, connectorLineActive, connectorArrow, connectorArrowActive,
  branchContainer, branchStem, branchDivider, branchDividerLeft, branchDividerRight,
  branchRow, branchCol, branchColStem, branchJoin, branchJoinBar,
  emitterContainer, emitterStem, emitterDivider,
  emitterRow, emitterCol,
  pipelineGrid, pipelineMain, pipelineSidebar,
  inspectorPanel, inspectorHeader, inspectorHeaderTitle, inspectorHeaderId,
  inspectorBody, inspectorNodeTitle, inspectorNodeLabel, inspectorNodeSub,
  inspectorFilesBox, inspectorFilesLabel, inspectorFilesList, inspectorFileTag,
  inspectorDetail, inspectorPerfTag, inspectorPathSection, inspectorPathLabel,
  inspectorPathStats, inspectorPathAncestors, inspectorPathDescendants, inspectorPathChain,
  inspectorMetaGrid, inspectorMetaBox, inspectorMetaLabel, inspectorMetaValue,
  inspectorEmpty, inspectorEmptyIcon, inspectorEmptyDot, inspectorEmptyText, inspectorEmptyHint,
  btnPrimary, btnOutline,
  pluginPanel, pluginPanelTitle, pluginPanelDesc, pluginPanelFiles,
  perfCardsGrid, perfCard, perfCardTitle, perfCardList,
} from './newPipeline.chain';
import { emitterDividerDrop, legendDot, nodeDot, inspectorNodeDot } from './newPipeline.utils'
// Node data
interface PipelineNode {
  id: string;
  label: string;
  sub?: string;
  files: string[];
  color: string;
  bg: string;
  border: string;
  detail: string;
  perf?: string;
}

const nodes: PipelineNode[] = [
  {
    id: 'source', label: 'Source', sub: '.css .ts .tsx',
    files: ['*.css', '*.ts', '*.tsx', 'glob / fs'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.5)',
    detail: 'Entry discovery. Reads file system, filters chain-css files. Produces raw source strings for Collector.',
  },
  {
    id: 'collector', label: 'Collector / Loader',
    files: ['style-collector.ts', 'style-proxy.ts', 'loader.ts'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.5)',
    detail: 'Intercepts style() calls, collects runtime objects, proxies template literals.',
    perf: 'TMP cached proxy',
  },
  {
    id: 'styleIR', label: 'Style IR', sub: 'intermediate representation',
    files: ['style-ir.ts', 'ir-types.ts'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.5)',
    detail: 'Normalized flat IR: selectors, declarations, at-rules. Lossless intermediate before graph construction.',
  },
  {
    id: 'graphBuilder', label: 'Graph Builder',
    files: ['graph-builder.ts', 'graph-nodes.ts'],
    color: '#06b6d4', bg: 'rgba(6,182,214,0.10)', border: 'rgba(6,182,214,0.5)',
    detail: 'Builds dependency graph: parent-child, references, composition edges.',
    perf: 'WeakMap for nodes',
  },
  {
    id: 'symbolTable', label: 'Symbol Table',
    files: ['symbols.ts', 'scope.ts', 'resolver.ts'],
    color: '#06b6d4', bg: 'rgba(6,182,214,0.10)', border: 'rgba(6,182,214,0.5)',
    detail: 'Interns class names, variables, keyframes. Scope chain + resolver.',
    perf: 'LRU 1000 entries',
  },
  {
    id: 'compilerContext', label: 'Compiler Context', sub: 'IR + Graph + Symbols + Services',
    files: ['compiler-context.ts', 'services.ts'],
    color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.5)',
    detail: 'Central context object passed through all passes.',
    perf: 'shallowMerge ctx',
  },
  {
    id: 'persistent', label: 'Persistent State', sub: 'disk cache',
    files: ['persistent-compiler.ts', 'disk-cache.ts'],
    color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.45)',
    detail: 'Persists graph + IR snapshot to disk.',
    perf: 'LRU 1000 + Set debounce 500ms',
  },
  {
    id: 'incremental', label: 'Incremental Scheduler', sub: 'dirty graph analysis',
    files: ['incremental.ts', 'dirty-tracker.ts'],
    color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.45)',
    detail: 'Marks dirty subgraphs on file change.',
    perf: 'Set + 500ms debounce',
  },
  {
    id: 'diagnostics', label: 'Diagnostics', sub: 'all phases',
    files: ['diagnostics.ts', 'reporter.ts'],
    color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.45)',
    detail: 'Collects warnings/errors from every phase.',
  },
  {
    id: 'passScheduler', label: 'Pass Scheduler',
    files: ['pass-scheduler.ts', 'scheduler.ts'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.5)',
    detail: 'Topologically sorts passes by requires/produces/invalidates.',
    perf: 'for...in 2-3x faster',
  },
  {
    id: 'passDecl', label: 'Pass Declarations', sub: 'requires / produces / invalidates',
    files: ['pass.ts', 'pass-decl.ts', 'pass-meta.ts'],
    color: '#fb923c', bg: 'rgba(251,146,60,0.10)', border: 'rgba(251,146,60,0.45)',
    detail: 'Declarative pass API. Each pass declares inputs/outputs.',
  },
  {
    id: 'pipeline', label: 'Pipeline',
    files: ['pipeline.ts', 'pipeline-runner.ts'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.14)', border: 'rgba(99,102,241,0.6)',
    detail: 'Orchestrates pass execution. Handles plugin passes insertion.',
  },
  {
    id: 'normalize', label: 'Normalize',
    files: ['normalize.ts', 'expand-shorthands.ts'],
    color: '#818cf8', bg: 'rgba(129,140,248,0.14)', border: 'rgba(129,140,248,0.6)',
    detail: 'Expands shorthands, normalizes units, sorts declarations.',
    perf: 'shallowMerge',
  },
  {
    id: 'validate', label: 'Validate',
    files: ['validate.ts', 'linter.ts'],
    color: '#a78bfa', bg: 'rgba(167,139,250,0.14)', border: 'rgba(167,139,250,0.6)',
    detail: 'Validates property/value pairs, at-rule nesting.',
  },
  {
    id: 'analyze', label: 'Analyze',
    files: ['analyze.ts', 'usage-graph.ts', 'dead-code.ts'],
    color: '#c084fc', bg: 'rgba(192,132,252,0.14)', border: 'rgba(192,132,252,0.6)',
    detail: 'Usage analysis, reference counting, dead-code detection.',
    perf: 'WeakMap cache',
  },
  {
    id: 'optimize', label: 'Optimize',
    files: ['optimize.ts', 'dedupe.ts', 'merge.ts'],
    color: '#e879f9', bg: 'rgba(232,121,249,0.14)', border: 'rgba(232,121,249,0.6)',
    detail: 'Dedupes rules, merges selectors, hoists common declarations.',
    perf: 'for...in 2-3x',
  },
  {
    id: 'lower', label: 'Lower',
    files: ['lower.ts', 'transform.ts', 'prefixer.ts'],
    color: '#fb7185', bg: 'rgba(251,113,133,0.14)', border: 'rgba(251,113,133,0.6)',
    detail: 'Lowers modern CSS to target browsers. Autoprefix, nesting desugar.',
  },
  {
    id: 'optimizedIR', label: 'Optimized IR', sub: 'graph + symbols + passMeta + diagnostics',
    files: ['optimized-ir.ts'],
    color: '#10b981', bg: 'rgba(16,185,129,0.14)', border: 'rgba(16,185,129,0.55)',
    detail: 'Final IR after all transforms. Immutable, serializable.',
  },
  {
    id: 'emitterRegistry', label: 'Emitter Registry',
    files: ['emitters/index.ts', 'registry.ts'],
    color: '#64748b', bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.45)',
    detail: 'Registry of output emitters. Plugin can register custom emitters.',
  },
  { id: 'css', label: 'CSS', files: ['emit-css.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Standard CSS emitter with source maps.' },
  { id: 'atomic', label: 'Atomic CSS', files: ['emit-atomic.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Atomic class generation.' },
  { id: 'tailwind', label: 'Tailwind', files: ['emit-tailwind.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Tailwind-compatible config and utilities output.' },
  { id: 'tokens', label: 'Tokens', files: ['emit-tokens.ts', 'design-tokens.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Design tokens JSON.' },
  { id: 'figma', label: 'Figma', files: ['emit-figma.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Figma Tokens plugin format.' },
  { id: 'graphjson', label: 'Graph JSON', files: ['emit-graph.ts'], color: '#64748b', bg: 'rgba(100,116,139,0.10)', border: 'rgba(100,116,139,0.35)', detail: 'Serialized graph for debugging.' },
];

// Edges between nodes
const edges: [string, string][] = [
  ['source', 'collector'],
  ['collector', 'styleIR'],
  ['styleIR', 'graphBuilder'],
  ['styleIR', 'symbolTable'],
  ['graphBuilder', 'compilerContext'],
  ['symbolTable', 'compilerContext'],
  ['compilerContext', 'persistent'],
  ['compilerContext', 'incremental'],
  ['compilerContext', 'diagnostics'],
  ['persistent', 'passScheduler'],
  ['incremental', 'passScheduler'],
  ['diagnostics', 'passScheduler'],
  ['passScheduler', 'passDecl'],
  ['passDecl', 'pipeline'],
  ['pipeline', 'normalize'],
  ['pipeline', 'validate'],
  ['pipeline', 'analyze'],
  ['normalize', 'optimize'],
  ['validate', 'optimize'],
  ['analyze', 'optimize'],
  ['optimize', 'lower'],
  ['lower', 'optimizedIR'],
  ['optimizedIR', 'emitterRegistry'],
  ['emitterRegistry', 'css'],
  ['emitterRegistry', 'atomic'],
  ['emitterRegistry', 'tailwind'],
  ['emitterRegistry', 'tokens'],
  ['emitterRegistry', 'figma'],
  ['figma', 'graphjson'],
];

// Build adjacency
function buildGraph(edges: [string, string][]) {
  const descendants: Record<string, Set<string>> = {};
  const ancestors: Record<string, Set<string>> = {};
  for (const [from, to] of edges) {
    if (!descendants[from]) descendants[from] = new Set();
    if (!ancestors[to]) ancestors[to] = new Set();
    descendants[from].add(to);
    ancestors[to].add(from);
  }
  // Transitive closure
  function traverse(start: string, dir: 'descendants' | 'ancestors'): Set<string> {
    const result = new Set<string>();
    const stack = [start];
    const map = dir === 'descendants' ? descendants : ancestors;
    while (stack.length) {
      const id = stack.pop()!;
      for (const neighbor of map[id] || []) {
        if (!result.has(neighbor)) {
          result.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    return result;
  }
  return {
    getDescendants: (id: string) => traverse(id, 'descendants'),
    getAncestors: (id: string) => traverse(id, 'ancestors'),
    hasEdge: (from: string, to: string) => {
      const desc = traverse(from, 'descendants');
      return desc.has(to) || from === to;
    },
  };
}

// ============================================================================
// Node Component
// ============================================================================

function NodeCard({ 
  node, 
  isSelected, 
  isHighlighted, 
  isDimmed, 
  onSelect, 
  onHover 
}: {
  node: PipelineNode;
  isSelected: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onSelect: () => void;
  onHover: (id: string | null) => void;
}) {
  const baseClass = [
    pipelineNode,
    isSelected ? pipelineNodeSelected : '',
    isDimmed ? pipelineNodeDimmed : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClass}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onSelect}
      style={{
        background: node.bg,
        borderColor: isSelected ? node.color : node.border,
        '--node-color': node.color,
        minWidth: (node.id === 'compilerContext' || node.id === 'optimizedIR') ? 280 : 200,
        maxWidth: 320,
        position: 'relative',
      } as React.CSSProperties}
    >
      <div className={nodeHeader}>
        <div className={nodeLeft}>
          <div className={nodeLabel}>
            <div className={nodeDot(node.color)} />
            <span className={nodeLabelText}>{node.label}</span>
          </div>
          {node.sub && <div className={nodeSub}>{node.sub}</div>}
        </div>
        {isSelected && <div className={nodePulse} />}
      </div>

      <div className={nodeFiles}>
        {node.files.slice(0, 3).map(f => (
          <span key={f} className={nodeFileTag}>{f}</span>
        ))}
        {node.files.length > 3 && (
          <span className={nodeFileTag}>+{node.files.length - 3}</span>
        )}
      </div>

      {node.perf && (
        <div className={nodePerfTag}>
          <div className={nodePerfDot} />
          <span className={nodePerfText}>{node.perf}</span>
        </div>
      )}

      {(isHighlighted || isSelected) && (
        <div
          className={nodeGlowOverlay}
          style={{ boxShadow: `inset 0 0 0 1px ${node.color}40` }}
        />
      )}
    </div>
  );
}

// ============================================================================
// Connector Component
// ============================================================================

function Connector({ active }: { active: boolean }) {
  return (
    <div className={connector}>
      <div className={active ? connectorLineActive : connectorLine} />
      <div className={active ? connectorArrowActive : connectorArrow} />
    </div>
  );
}

// ============================================================================
// Main Pipeline Page
// ============================================================================

export default function PipelinePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const graph = useMemo(() => buildGraph(edges), []);

  const activeId = hovered || selected;

  const isHighlighted = useCallback((id: string) => {
    if (!activeId) return false;
    return graph.hasEdge(activeId, id) || graph.hasEdge(id, activeId);
  }, [activeId, graph]);

  const isDimmed = useCallback((id: string) => {
    if (!activeId) return false;
    return !isHighlighted(id);
  }, [activeId, isHighlighted]);

  const isConnectorActive = useCallback((from: string, to: string) => {
    if (!activeId) return false;
    const a = graph.getAncestors(activeId);
    const d = graph.getDescendants(activeId);
    return (a.has(from) || from === activeId) && (d.has(to) || to === activeId);
  }, [activeId, graph]);

  const selectedNode = nodes.find(n => n.id === selected);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className={pipelinePage}>
      <h1 className={pipelineTitle}>Pipeline Architecture</h1>
      <p className={pipelineSubtitle}>
        Click any stage to trace its full upstream → downstream dependency path.
      </p>

      {/* Legend */}
      <div className={legendBar}>
        {[
          { label: 'Source', color: '#6366f1' },
          { label: 'Collector', color: '#8b5cf6' },
          { label: 'IR', color: '#3b82f6' },
          { label: 'Graph/Symbols', color: '#06b6d4' },
          { label: 'Context', color: '#10b981' },
          { label: 'Cache/Scheduler', color: '#f59e0b' },
          { label: 'Passes', color: '#f97316' },
          { label: 'Pipeline', color: '#818cf8' },
          { label: 'Emitters', color: '#64748b' },
        ].map(item => (
          <div key={item.label} className={legendItem}>
            <div className={legendDot(item.color)} />
            <span>{item.label}</span>
          </div>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className={btnOutline} onClick={() => setSelected(null)}>Clear</button>
          <button className={btnPrimary} onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>
      </div>

      <div className={pipelineGrid}>
        {/* Main Pipeline */}
        <div className={pipelineMain}>
          <div className={pipelineContainer}>
            <div className={pipelineInner}>
              {/* Source */}
              <NodeCard node={getNode('source')} isSelected={selected === 'source'} isHighlighted={isHighlighted('source')} isDimmed={isDimmed('source')} onSelect={() => setSelected(selected === 'source' ? null : 'source')} onHover={setHovered} />
              <Connector active={isConnectorActive('source', 'collector')} />

              {/* Collector */}
              <NodeCard node={getNode('collector')} isSelected={selected === 'collector'} isHighlighted={isHighlighted('collector')} isDimmed={isDimmed('collector')} onSelect={() => setSelected(selected === 'collector' ? null : 'collector')} onHover={setHovered} />
              <Connector active={isConnectorActive('collector', 'styleIR')} />

              {/* Style IR */}
              <NodeCard node={getNode('styleIR')} isSelected={selected === 'styleIR'} isHighlighted={isHighlighted('styleIR')} isDimmed={isDimmed('styleIR')} onSelect={() => setSelected(selected === 'styleIR' ? null : 'styleIR')} onHover={setHovered} />

              {/* Branch: Graph Builder + Symbol Table */}
              <div className={branchContainer}>
                <div className={branchStem} />
                <div className={branchDivider}>
                  <div className={branchDividerLeft} />
                  <div className={branchDividerRight} />
                </div>
                <div className={branchRow}>
                  <div className={branchCol}>
                    <div className={branchColStem} />
                    <NodeCard node={getNode('graphBuilder')} isSelected={selected === 'graphBuilder'} isHighlighted={isHighlighted('graphBuilder')} isDimmed={isDimmed('graphBuilder')} onSelect={() => setSelected(selected === 'graphBuilder' ? null : 'graphBuilder')} onHover={setHovered} />
                  </div>
                  <div className={branchCol}>
                    <div className={branchColStem} />
                    <NodeCard node={getNode('symbolTable')} isSelected={selected === 'symbolTable'} isHighlighted={isHighlighted('symbolTable')} isDimmed={isDimmed('symbolTable')} onSelect={() => setSelected(selected === 'symbolTable' ? null : 'symbolTable')} onHover={setHovered} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 32, width: '100%' }}>
                  <div className={branchJoin} />
                  <div className={branchJoin} />
                </div>
                <div className={branchJoinBar} />
                <div className={branchJoin} />
              </div>

              {/* Compiler Context */}
              <div style={{ position: 'relative' }}>
                <NodeCard node={getNode('compilerContext')} isSelected={selected === 'compilerContext'} isHighlighted={isHighlighted('compilerContext')} isDimmed={isDimmed('compilerContext')} onSelect={() => setSelected(selected === 'compilerContext' ? null : 'compilerContext')} onHover={setHovered} />
              </div>

              {/* Three branches: Persistent / Incremental / Diagnostics */}
              <div className={branchContainer}>
                <div className={branchStem} />
                <div className={branchDivider} style={{ width: '92%' }}>
                  <div className={branchDividerLeft} />
                  <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: 20, background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} />
                  <div className={branchDividerRight} />
                </div>
                <div className={branchRow} style={{ gap: 12 }}>
                  {['persistent', 'incremental', 'diagnostics'].map(id => (
                    <div key={id} className={branchCol}>
                      <div className={branchColStem} />
                      <NodeCard node={getNode(id)} isSelected={selected === id} isHighlighted={isHighlighted(id)} isDimmed={isDimmed(id)} onSelect={() => setSelected(selected === id ? null : id)} onHover={setHovered} />
                      <div className={branchColStem} />
                    </div>
                  ))}
                </div>
                <div className={branchJoinBar} style={{ width: '92%' }} />
                <div className={branchJoin} />
              </div>

              {/* Pass Scheduler */}
              <NodeCard node={getNode('passScheduler')} isSelected={selected === 'passScheduler'} isHighlighted={isHighlighted('passScheduler')} isDimmed={isDimmed('passScheduler')} onSelect={() => setSelected(selected === 'passScheduler' ? null : 'passScheduler')} onHover={setHovered} />
              <Connector active={isConnectorActive('passScheduler', 'passDecl')} />

              {/* Pass Decl */}
              <NodeCard node={getNode('passDecl')} isSelected={selected === 'passDecl'} isHighlighted={isHighlighted('passDecl')} isDimmed={isDimmed('passDecl')} onSelect={() => setSelected(selected === 'passDecl' ? null : 'passDecl')} onHover={setHovered} />
              <Connector active={isConnectorActive('passDecl', 'pipeline')} />

              {/* Pipeline */}
              <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <NodeCard node={getNode('pipeline')} isSelected={selected === 'pipeline'} isHighlighted={isHighlighted('pipeline')} isDimmed={isDimmed('pipeline')} onSelect={() => setSelected(selected === 'pipeline' ? null : 'pipeline')} onHover={setHovered} />

                {/* Pipeline sub-nodes: Normalize / Validate / Analyze */}
                <div className={branchContainer}>
                  <div className={branchStem} />
                  <div className={branchDivider} style={{ width: '88%' }}>
                    <div className={branchDividerLeft} />
                    <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: 20, background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} />
                    <div className={branchDividerRight} />
                  </div>
                  <div className={branchRow} style={{ gap: 12 }}>
                    {['normalize', 'validate', 'analyze'].map(id => (
                      <div key={id} className={branchCol}>
                        <div className={branchColStem} />
                        <NodeCard node={getNode(id)} isSelected={selected === id} isHighlighted={isHighlighted(id)} isDimmed={isDimmed(id)} onSelect={() => setSelected(selected === id ? null : id)} onHover={setHovered} />
                        <div className={branchColStem} />
                      </div>
                    ))}
                  </div>
                  <div className={branchJoinBar} style={{ width: '88%' }} />
                  <div className={branchJoin} />
                </div>
              </div>

              {/* Optimize */}
              <NodeCard node={getNode('optimize')} isSelected={selected === 'optimize'} isHighlighted={isHighlighted('optimize')} isDimmed={isDimmed('optimize')} onSelect={() => setSelected(selected === 'optimize' ? null : 'optimize')} onHover={setHovered} />
              <Connector active={isConnectorActive('optimize', 'lower')} />

              {/* Lower */}
              <NodeCard node={getNode('lower')} isSelected={selected === 'lower'} isHighlighted={isHighlighted('lower')} isDimmed={isDimmed('lower')} onSelect={() => setSelected(selected === 'lower' ? null : 'lower')} onHover={setHovered} />
              <Connector active={isConnectorActive('lower', 'optimizedIR')} />

              {/* Optimized IR */}
              <NodeCard node={getNode('optimizedIR')} isSelected={selected === 'optimizedIR'} isHighlighted={isHighlighted('optimizedIR')} isDimmed={isDimmed('optimizedIR')} onSelect={() => setSelected(selected === 'optimizedIR' ? null : 'optimizedIR')} onHover={setHovered} />
              <Connector active={isConnectorActive('optimizedIR', 'emitterRegistry')} />

              {/* Emitter Registry */}
              <NodeCard node={getNode('emitterRegistry')} isSelected={selected === 'emitterRegistry'} isHighlighted={isHighlighted('emitterRegistry')} isDimmed={isDimmed('emitterRegistry')} onSelect={() => setSelected(selected === 'emitterRegistry' ? null : 'emitterRegistry')} onHover={setHovered} />

              {/* Emitter outputs */}
              <div className={emitterContainer}>
                <div className={emitterStem} />
                <div className={emitterDivider}>
                  <div className={emitterDividerDrop('0%')} />
                  <div className={emitterDividerDrop('25%')} />
                  <div className={emitterDividerDrop('50%')} style={{ transform: 'translateX(-50%)' }} />
                  <div className={emitterDividerDrop('75%')} />
                  <div className={emitterDividerDrop('100%')} style={{ right: 0, left: 'auto' }} />
                </div>
                <div className={emitterRow}>
                  {['css', 'atomic', 'tailwind', 'tokens', 'figma'].map(id => (
                    <div key={id} className={emitterCol}>
                      <NodeCard node={getNode(id)} isSelected={selected === id} isHighlighted={isHighlighted(id)} isDimmed={isDimmed(id)} onSelect={() => setSelected(selected === id ? null : id)} onHover={setHovered} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Graph JSON (from Figma) */}
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}>Figma</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ width: 0, height: 0, borderLeft: '5px solid rgba(255,255,255,0.1)', borderTop: '4px solid transparent', borderBottom: '4px solid transparent' }} />
                </div>
                <NodeCard node={getNode('graphjson')} isSelected={selected === 'graphjson'} isHighlighted={isHighlighted('graphjson')} isDimmed={isDimmed('graphjson')} onSelect={() => setSelected(selected === 'graphjson' ? null : 'graphjson')} onHover={setHovered} />
              </div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className={perfCardsGrid}>
            <div className={perfCard}>
              <div className={perfCardTitle}>G560 PERF</div>
              <div className={perfCardList}>
                • LRU cache 1000 entries (symbols.ts)<br />
                • for...in 2-3x faster than Object.keys<br />
                • shallowMerge over deep clone
              </div>
            </div>
            <div className={perfCard}>
              <div className={perfCardTitle}>CACHE LAYERS</div>
              <div className={perfCardList}>
                • WeakMap graph nodes (no leak)<br />
                • TMP memoization for proxies<br />
                • disk-cache + content hash
              </div>
            </div>
            <div className={perfCard}>
              <div className={perfCardTitle}>INCREMENTAL</div>
              <div className={perfCardList}>
                • Set for dirty tracking<br />
                • 500ms debounce batch<br />
                • dirty graph analysis
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Inspector */}
        {showDetails && (
          <div className={pipelineSidebar}>
            <div className={inspectorPanel}>
              <div className={inspectorHeader}>
                <span className={inspectorHeaderTitle}>INSPECTOR</span>
                <span className={inspectorHeaderId}>{activeId || 'hover a node'}</span>
              </div>

              {selectedNode ? (
                <div className={inspectorBody}>
                  <div className={inspectorNodeTitle}>
                    <div className={inspectorNodeDot(selectedNode.color)} />
                    <span className={inspectorNodeLabel}>{selectedNode.label}</span>
                  </div>
                  {selectedNode.sub && <div className={inspectorNodeSub}>{selectedNode.sub}</div>}

                  <div className={inspectorFilesBox}>
                    <div className={inspectorFilesLabel}>FILES</div>
                    <div className={inspectorFilesList}>
                      {selectedNode.files.map(f => (
                        <span key={f} className={inspectorFileTag}>{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className={inspectorDetail}>{selectedNode.detail}</div>

                  {selectedNode.perf && (
                    <div className={inspectorPerfTag}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#fbbf24' }}>{selectedNode.perf}</span>
                    </div>
                  )}

                  <div className={inspectorPathSection}>
                    <div className={inspectorPathLabel}>PATH</div>
                    <div className={inspectorPathStats}>
                      <span className={inspectorPathAncestors}>↑ {graph.getAncestors(selected).size} ancestors</span>
                      <span style={{ color: '#2a2a3a' }}>•</span>
                      <span className={inspectorPathDescendants}>{graph.getDescendants(selected).size} descendants ↓</span>
                    </div>
                    <div className={inspectorPathChain}>
                      {[...graph.getAncestors(selected)].slice(0, 3).join(' → ') || '—'}
                      {' → '}[{selected}]{' → '}
                      {[...graph.getDescendants(selected)].slice(0, 3).join(' → ') || '—'}
                    </div>
                  </div>

                  <div className={inspectorMetaGrid}>
                    <div className={inspectorMetaBox}>
                      <div className={inspectorMetaLabel}>COLOR CODE</div>
                      <div className={inspectorMetaValue}>{selectedNode.color}</div>
                    </div>
                    <div className={inspectorMetaBox}>
                      <div className={inspectorMetaLabel}>TYPE</div>
                      <div className={inspectorMetaValue}>
                        {['css', 'atomic', 'tailwind', 'tokens', 'figma', 'graphjson'].includes(selected) || selectedNode.id.includes('emit')
                          ? 'Emitter / Output'
                          : 'Compiler Stage'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={inspectorEmpty}>
                  <div className={inspectorEmptyIcon}>
                    <div className={inspectorEmptyDot} />
                  </div>
                  <div className={inspectorEmptyText}>Hover or click any box</div>
                  <div className={inspectorEmptyHint}>
                    Click to highlight full upstream → downstream path.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}