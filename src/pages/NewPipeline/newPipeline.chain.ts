// src/styles/pipeline.chain.ts
import { chain, type ChainProxy } from 'chaincss';

// ============================================================================
// Pipeline Page Layout
// ============================================================================

export const pipelinePage = chain()
  .box({ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 40px' })
  .media('(max-width: 768px)', (c: ChainProxy) => c
    .box({ padding: '60px 16px 30px' })
  )
  .$el('pipeline-page');

export const pipelineTitle = chain()
  .typography({ fontSize: 36, fontWeight: '700', color: '#f4f4f5', letterSpacing: '-1px' })
  .box({ marginBottom: 8 })
  .$el('pipeline-title');

export const pipelineSubtitle = chain()
  .typography({ fontSize: 16, color: '#a1a1aa', lineHeight: '1.6' })
  .box({ marginBottom: 40 })
  .$el('pipeline-subtitle');

// ============================================================================
// Legend Bar
// ============================================================================

export const legendBar = chain()
  .flex({ wrap: 'wrap', gap: 16 })
  .box({ marginBottom: 24, padding: '16px 20px', borderRadius: 12 })
  .background({ color: 'rgba(255, 255, 255, 0.02)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('legend-bar');

export const legendItem = chain()
  .flex({ align: 'center', gap: 8 })
  .typography({ fontSize: 11, color: '#a1a1aa' })
  .$el('legend-item');

export const legendDot = (color: string) => chain()
  .box({ width: 10, height: 10, borderRadius: 4 })
  .background({ color })
  .$el(`legend-dot-${color.replace('#', '')}`);

// ============================================================================
// Pipeline Container
// ============================================================================

export const pipelineContainer = chain()
  .box({ borderRadius: 16, padding: '32px 24px', overflow: 'auto' })
  .background({ color: 'rgba(255, 255, 255, 0.01)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('pipeline-container');

export const pipelineInner = chain()
  .box({ minWidth: 520 })
  .flex({ direction: 'column', align: 'center' })
  .$el('pipeline-inner');

// ============================================================================
// Pipeline Node (Card)
// ============================================================================

export const pipelineNode = chain()
  .box({ borderRadius: 10, padding: '14px 20px' })
  .raw('cursor', 'pointer')
  .raw('border', '1px solid rgba(255, 255, 255, 0.1)')
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .transform({ custom: 'translateY(-1px)' })
    .shadow({ box: '0 4px 16px rgba(0, 0, 0, 0.3)' })
  .end()
  .$el('pipeline-node');

export const pipelineNodeSelected = chain()
  .transform({ scale: 1.02 })
  .raw('border-color', 'var(--node-color)')
  .shadow({ box: '0 0 0 1px var(--node-color), 0 8px 24px rgba(0, 0, 0, 0.4)' })
  .raw('z-index', '10')
  .$el('pipeline-node-selected');

export const pipelineNodeDimmed = chain()
  .raw('opacity', '0.35')
  .$el('pipeline-node-dimmed');

// ============================================================================
// Node Inner Content
// ============================================================================

export const nodeHeader = chain()
  .flex({ align: 'flex-start', justify: 'space-between', gap: 8 })
  .$el('node-header');

export const nodeLeft = chain()
  .box({ minWidth: 0 })
  .raw('flex', '1')
  .$el('node-left');

export const nodeDot = (color: string) => chain()
  .box({ width: 6, height: 6, borderRadius: '50%' })
  .raw('flex-shrink', '0')
  .background({ color })
  .shadow({ box: `0 0 8px ${color}` })
  .$el(`node-dot-${color.replace('#', '')}`);

export const nodeLabel = chain()
  .flex({ align: 'center', gap: 8 })
  .$el('node-label');

export const nodeLabelText = chain()
  .typography({ fontSize: 13, fontWeight: '600', color: '#e6e6f0', letterSpacing: '-0.01em' })
  .raw('overflow', 'hidden')
  .raw('text-overflow', 'ellipsis')
  .raw('white-space', 'nowrap')
  .$el('node-label-text');

export const nodeSub = chain()
  .typography({ fontSize: 10, color: '#9a9ab0', fontFamily: "'JetBrains Mono', monospace" })
  .box({ marginTop: 4 })
  .$el('node-sub');

export const nodePulse = chain()
  .box({ width: 6, height: 6, borderRadius: '50%' })
  .background({ color: '#ffffff' })
  .raw('flex-shrink', '0')
  .raw('animation', 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite')
  .$el('node-pulse');

export const nodeFiles = chain()
  .flex({ wrap: 'wrap', gap: 4 })
  .box({ marginTop: 8 })
  .$el('node-files');

export const nodeFileTag = chain()
  .box({ padding: '2px 6px', borderRadius: 4 })
  .background({ color: 'rgba(255, 255, 255, 0.04)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .typography({ fontSize: 9, color: '#7a7a95', fontFamily: "'JetBrains Mono', monospace" })
  .$el('node-file-tag');

export const nodePerfTag = chain()
  .flex({ align: 'center', gap: 4 })
  .box({ marginTop: 8, padding: '2px 8px', borderRadius: 9999 })
  .background({ color: 'rgba(245, 158, 11, 0.12)' })
  .raw('border', '1px solid rgba(245, 158, 11, 0.25)')
  .raw('display', 'inline-flex')
  .$el('node-perf-tag');

export const nodePerfDot = chain()
  .box({ width: 4, height: 4, borderRadius: '50%' })
  .background({ color: '#f59e0b' })
  .$el('node-perf-dot');

export const nodePerfText = chain()
  .typography({ fontSize: 9, color: '#fbbf24', fontFamily: "'JetBrains Mono', monospace" })
  .$el('node-perf-text');

export const nodeGlowOverlay = chain()
  .position({ type: 'absolute', inset: 0 })
  .box({ borderRadius: 10 })
  .raw('pointer-events', 'none')
  .$el('node-glow-overlay');

// ============================================================================
// Connector (Arrow between nodes)
// ============================================================================

export const connector = chain()
  .flex({ direction: 'column', align: 'center' })
  .box({ padding: '4px 0' })
  .$el('connector');

export const connectorLine = chain()
  .box({ width: 2, height: 20 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .transition({ tr: 'background 0.2s' })
  .$el('connector-line');

export const connectorLineActive = chain()
  .background({ color: '#6366f1' })
  .$el('connector-line-active');

export const connectorArrow = chain()
  .box({ width: 0, height: 0 })
  .raw('border-left', '4px solid transparent')
  .raw('border-right', '4px solid transparent')
  .raw('border-top', '6px solid rgba(255, 255, 255, 0.1)')
  .transition({ tr: 'border-color 0.2s' })
  .$el('connector-arrow');

export const connectorArrowActive = chain()
  .raw('border-top-color', '#6366f1')
  .$el('connector-arrow-active');

// ============================================================================
// Branch Split (for Graph Builder + Symbol Table)
// ============================================================================

export const branchContainer = chain()
  .box({ width: '100%', maxWidth: 560 })
  .flex({ direction: 'column', align: 'center' })
  .$el('branch-container');

export const branchStem = chain()
  .box({ width: 2, height: 16 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-stem');

export const branchDivider = chain()
  .box({ width: '56%', maxWidth: 320, height: 2 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .position({ type: 'relative' })
  .$el('branch-divider');

export const branchDividerLeft = chain()
  .position({ type: 'absolute', left: 0, top: 0 })
  .box({ width: 2, height: 16 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-divider-left');

export const branchDividerRight = chain()
  .position({ type: 'absolute', right: 0, top: 0 })
  .box({ width: 2, height: 16 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-divider-right');

export const branchRow = chain()
  .flex({ justify: 'center', gap: 32 })
  .box({ width: '100%', marginTop: 0 })
  .media('(min-width: 768px)', (c: ChainProxy) => c
    .flex({ gap: 64 })
  )
  .$el('branch-row');

export const branchCol = chain()
  .flex({ direction: 'column', align: 'center' })
  .$el('branch-col');

export const branchColStem = chain()
  .box({ width: 2, height: 12 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-col-stem');

export const branchJoin = chain()
  .box({ width: 2, height: 16 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-join');

export const branchJoinBar = chain()
  .box({ width: '56%', maxWidth: 320, height: 2 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('branch-join-bar');

// ============================================================================
// Multi-output Footer (Emitter bars)
// ============================================================================

export const emitterContainer = chain()
  .box({ width: '100%', maxWidth: 800 })
  .flex({ direction: 'column', align: 'center' })
  .box({ marginTop: 8 })
  .$el('emitter-container');

export const emitterStem = chain()
  .box({ width: 2, height: 16 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el('emitter-stem');

export const emitterDivider = chain()
  .box({ width: '96%', height: 2 })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .position({ type: 'relative' })
  .$el('emitter-divider');

export const emitterDividerDrop = (left: string) => chain()
  .position({ type: 'absolute', top: 0 })
  .box({ width: 2, height: 20, left })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el(`emitter-drop-${left.replace('%', '')}`);

export const emitterRow = chain()
  .grid({ columns: 'repeat(2, 1fr)', gap: 8 })
  .box({ width: '100%', marginTop: 4 })
  .media('(min-width: 768px)', (c: ChainProxy) => c
    .grid({ columns: 'repeat(5, 1fr)' })
  )
  .$el('emitter-row');

export const emitterCol = chain()
  .flex({ direction: 'column', align: 'center' })
  .box({ width: '100%' })
  .$el('emitter-col');

// ============================================================================
// Sidebar (Inspector Panel)
// ============================================================================

export const inspectorPanel = chain()
  .box({ borderRadius: 14, overflow: 'hidden' })
  .background({ color: 'rgba(255, 255, 255, 0.02)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-panel');

export const inspectorHeader = chain()
  .flex({ align: 'center', justify: 'space-between' })
  .box({ padding: '12px 16px' })
  .raw('border-bottom', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-header');

export const inspectorHeaderTitle = chain()
  .typography({ fontSize: 11, fontWeight: '600', color: '#8a8aa3', letterSpacing: '1px', textTransform: 'uppercase' })
  .$el('inspector-header-title');

export const inspectorHeaderId = chain()
  .typography({ fontSize: 10, color: '#4a4a64', fontFamily: "'JetBrains Mono', monospace" })
  .$el('inspector-header-id');

export const inspectorBody = chain()
  .box({ padding: 16 })
  .$el('inspector-body');

export const inspectorNodeTitle = chain()
  .flex({ align: 'center', gap: 8 })
  .$el('inspector-node-title');

export const inspectorNodeDot = (color: string) => chain()
  .box({ width: 8, height: 8, borderRadius: '50%' })
  .background({ color })
  .shadow({ box: `0 0 8px ${color}` })
  .$el(`inspector-dot-${color.replace('#', '')}`);

export const inspectorNodeLabel = chain()
  .typography({ fontSize: 14, fontWeight: '600', color: '#ffffff', letterSpacing: '-0.01em' })
  .$el('inspector-node-label');

export const inspectorNodeSub = chain()
  .typography({ fontSize: 11, color: '#8a8aa3', fontFamily: "'JetBrains Mono', monospace" })
  .box({ marginTop: 4 })
  .$el('inspector-node-sub');

export const inspectorFilesBox = chain()
  .box({ marginTop: 12, padding: '10px 12px', borderRadius: 8 })
  .background({ color: 'rgba(0, 0, 0, 0.3)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-files-box');

export const inspectorFilesLabel = chain()
  .typography({ fontSize: 9, color: '#5a5a75', letterSpacing: '1px', textTransform: 'uppercase' })
  .box({ marginBottom: 6 })
  .$el('inspector-files-label');

export const inspectorFilesList = chain()
  .flex({ wrap: 'wrap', gap: 4 })
  .$el('inspector-files-list');

export const inspectorFileTag = chain()
  .box({ padding: '4px 8px', borderRadius: 6 })
  .background({ color: 'rgba(255, 255, 255, 0.04)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .typography({ fontSize: 11, color: '#b0b0c8', fontFamily: "'JetBrains Mono', monospace" })
  .$el('inspector-file-tag');

export const inspectorDetail = chain()
  .typography({ fontSize: 12, color: '#a0a0b8', lineHeight: '1.6' })
  .box({ marginTop: 12 })
  .$el('inspector-detail');

export const inspectorPerfTag = chain()
  .flex({ align: 'center', gap: 6 })
  .box({ marginTop: 12, padding: '4px 10px', borderRadius: 9999 })
  .background({ color: 'rgba(245, 158, 11, 0.12)' })
  .raw('border', '1px solid rgba(245, 158, 11, 0.25)')
  .raw('display', 'inline-flex')
  .$el('inspector-perf-tag');

export const inspectorPathSection = chain()
  .box({ marginTop: 16, paddingTop: 16 })
  .raw('border-top', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-path-section');

export const inspectorPathLabel = chain()
  .typography({ fontSize: 9, color: '#5a5a75', letterSpacing: '1px', textTransform: 'uppercase' })
  .box({ marginBottom: 8 })
  .$el('inspector-path-label');

export const inspectorPathStats = chain()
  .flex({ gap: 8 })
  .box({ marginBottom: 8 })
  .$el('inspector-path-stats');

export const inspectorPathAncestors = chain()
  .typography({ fontSize: 10, color: '#6366f1', fontFamily: "'JetBrains Mono', monospace" })
  .$el('inspector-path-ancestors');

export const inspectorPathDescendants = chain()
  .typography({ fontSize: 10, color: '#10b981', fontFamily: "'JetBrains Mono', monospace" })
  .$el('inspector-path-descendants');

export const inspectorPathChain = chain()
  .typography({ fontSize: 10, color: '#6a6a84', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.4' })
  .raw('word-break', 'break-all')
  .$el('inspector-path-chain');

export const inspectorMetaGrid = chain()
  .grid({ columns: 'repeat(2, 1fr)', gap: 8 })
  .box({ marginTop: 16 })
  .$el('inspector-meta-grid');

export const inspectorMetaBox = chain()
  .box({ padding: '10px 12px', borderRadius: 8 })
  .background({ color: 'rgba(0, 0, 0, 0.2)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-meta-box');

export const inspectorMetaLabel = chain()
  .typography({ fontSize: 9, color: '#5a5a75' })
  .$el('inspector-meta-label');

export const inspectorMetaValue = chain()
  .typography({ fontSize: 11, color: '#a0a0b8', fontFamily: "'JetBrains Mono', monospace" })
  .box({ marginTop: 4 })
  .$el('inspector-meta-value');

// ============================================================================
// Empty State
// ============================================================================

export const inspectorEmpty = chain()
  .box({ padding: 24 })
  .typography({ textAlign: 'center' })
  .$el('inspector-empty');

export const inspectorEmptyIcon = chain()
  .box({ width: 40, height: 40, margin: '0 auto', borderRadius: 10 })
  .flex({ align: 'center', justify: 'center' })
  .background({ color: 'rgba(255, 255, 255, 0.04)' })
  .raw('border', '1px solid rgba(255, 255, 255, 0.06)')
  .$el('inspector-empty-icon');

export const inspectorEmptyDot = chain()
  .box({ width: 8, height: 8, borderRadius: '50%' })
  .background({ color: '#3a3a4a' })
  .raw('animation', 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite')
  .$el('inspector-empty-dot');

export const inspectorEmptyText = chain()
  .typography({ fontSize: 12, color: '#7a7a95' })
  .box({ marginTop: 12 })
  .$el('inspector-empty-text');

export const inspectorEmptyHint = chain()
  .typography({ fontSize: 10, color: '#4a4a64', lineHeight: '1.4' })
  .box({ marginTop: 4 })
  .$el('inspector-empty-hint');

// ============================================================================
// CTA Button
// ============================================================================

export const btnPrimary = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 13, fontWeight: '500', color: '#ffffff' })
  .box({ padding: '10px 20px', borderRadius: 8, border: 'none' })
  .raw('cursor', 'pointer')
  .shadow({ box: '0 0 12px rgba(99, 102, 241, 0.35)' })
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .background({ color: '#5457e0' })
  .end()
  .$el('btn-primary');

export const btnOutline = chain()
  .background({ color: 'transparent' })
  .typography({ fontSize: 13, color: '#9a9ab0' })
  .box({ padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(255, 255, 255, 0.1)' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .typography({ color: '#ffffff' })
    .raw('border-color', 'rgba(255, 255, 255, 0.2)')
  .end()
  .$el('btn-outline');

// ============================================================================
// Plugin Registry (Side Panel on Desktop)
// ============================================================================

export const pluginPanel = chain()
  .box({ borderRadius: 12, padding: '16px 20px' })
  .raw('border', '1px dashed rgba(167, 139, 250, 0.5)')
  .background({ color: 'rgba(24, 20, 38, 0.9)' })
  .$el('plugin-panel');

export const pluginPanelTitle = chain()
  .typography({ fontSize: 11, fontWeight: '600', color: '#c4b5fd', letterSpacing: '0.5px' })
  .$el('plugin-panel-title');

export const pluginPanelDesc = chain()
  .typography({ fontSize: 10, color: '#9a8ac0', lineHeight: '1.3' })
  .box({ marginTop: 4 })
  .$el('plugin-panel-desc');

export const pluginPanelFiles = chain()
  .typography({ fontSize: 9, color: '#7a7a95', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.4' })
  .box({ marginTop: 8 })
  .$el('plugin-panel-files');

// ============================================================================
// Page Grid (Main + Sidebar)
// ============================================================================

export const pipelineGrid = chain()
  .grid({ columns: '1fr', gap: 24 })
  .media('(min-width: 1024px)', (c: ChainProxy) => c
    .grid({ columns: '1fr 300px' })
  )
  .$el('pipeline-grid');

export const pipelineMain = chain()
  .position({ type: 'relative' })
  .$el('pipeline-main');

export const pipelineSidebar = chain()
  .position({ type: 'sticky', top: 88 })
  .raw('height', 'fit-content')
  .$el('pipeline-sidebar');

// ============================================================================
// Performance Cards (Bottom)
// ============================================================================

export const perfCardsGrid = chain()
  .grid({ columns: '1fr', gap: 8 })
  .box({ marginTop: 16 })
  .media('(min-width: 768px)', (c: ChainProxy) => c
    .grid({ columns: 'repeat(3, 1fr)' })
  )
  .$el('perf-cards-grid');

export const perfCard = chain()
  .box({ borderRadius: 10, padding: '10px 14px' })
  .background({ color: 'rgba(255, 255, 255, 0.02)' })
  .raw('border', '1px solid rgba(35, 35, 58, 1)')
  .$el('perf-card');

export const perfCardTitle = chain()
  .typography({ fontSize: 10, fontWeight: '600', color: '#f59e0b', letterSpacing: '1px', textTransform: 'uppercase' })
  .$el('perf-card-title');

export const perfCardList = chain()
  .typography({ fontSize: 10, color: '#a0a0b8', fontFamily: "'JetBrains Mono', monospace", lineHeight: '1.4' })
  .box({ marginTop: 4 })
  .$el('perf-card-list');