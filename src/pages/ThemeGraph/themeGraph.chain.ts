import { chain } from 'chaincss'

export const page = chain()
  .box({ 
    paddingTop: 100, 
    paddingLeft: 24, 
    paddingRight: 24, 
    paddingBottom: 60, 
    maxWidth: 1200, 
    margin: '0 auto',
  })
  .raw('minHeight', '100vh')
  .$el('theme-graph-page')

export const header = chain()
  .typography({ textAlign: 'center' })
  .box({ marginBottom: 48 })
  .$el('theme-graph-header')

export const title = chain()
  .typography({ fontSize: 48, fontWeight: '800', letterSpacing: '-1px' })
  .box({ marginBottom: 12 })
  .$el('theme-graph-title')

export const subtitle = chain()
  .typography({ fontSize: 18, color: '#71717a', lineHeight: '1.6' })
  .box({ maxWidth: 600, margin: '0 auto' })
  .$el('theme-graph-subtitle')

export const controls = chain()
  .flex({ justify: 'center', gap: 24, wrap: 'wrap', align: 'center' })
  .box({ marginBottom: 48 })
  .$el('theme-graph-controls')

export const controlGroup = chain()
  .flex({ direction: 'column', gap: 4 })
  .$el('theme-graph-control-group')

export const controlLabel = chain()
  .typography({ fontSize: 13, color: '#71717a' })
  .box({ marginBottom: 8 })
  .$el('theme-graph-control-label')

export const colorPicker = chain()
  .box({ width: 40, height: 40, borderRadius: 8, border: 'none' })
  .raw('cursor', 'pointer')
  .$el('theme-graph-color-picker')

export const colorInput = chain()
  .box({ 
    padding: '8px 12px', 
    borderRadius: 8, 
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: 100,
  })
  .background({ color: 'rgba(0, 0, 0, 0.3)' })
  .typography({ fontSize: 14, color: '#e4e4e7', fontFamily: 'monospace' })
  .$el('theme-graph-color-input')

export const quickPickBtn = chain()
  .box({ width: 32, height: 32, borderRadius: 8, border: '2px solid transparent' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.15s ease' })
  .$el('theme-graph-quick-pick')

export const modeBtn = chain()
  .box({ 
    padding: '8px 16px', 
    borderRadius: 8, 
    border: '1px solid rgba(255, 255, 255, 0.1)',
  })
  .typography({ fontSize: 13, fontWeight: '600' })
  .raw('cursor', 'pointer')
  .$el('theme-graph-mode-btn')

export const paletteSection = chain()
  .box({ marginBottom: 48 })
  .$el('theme-graph-palette-section')

export const sectionTitle = chain()
  .typography({ fontSize: 20, fontWeight: '700', textAlign: 'center', color: '#71717a' })
  .box({ marginBottom: 20 })
  .$el('theme-graph-section-title')

export const paletteGrid = chain()
  .flex({ gap: 8, justify: 'center' })
  .box({ padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.05)' })
  .background({ color: 'rgba(0, 0, 0, 0.2)' })
  .$el('theme-graph-palette-grid')

export const previewGrid = chain()
  .grid({ columns: '1fr 1fr', gap: 32 })
  .media('(max-width: 768px)', (c) => c
    .grid({ columns: '1fr' })
  )
  .$el('theme-graph-preview-grid')

export const semanticTokens = chain()
  .box({ padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.05)' })
  .background({ color: 'rgba(0, 0, 0, 0.2)' })
  .typography({ fontFamily: 'monospace', fontSize: 13, lineHeight: '2' })
  .$el('theme-graph-semantic-tokens')

export const exportSection = chain()
  .typography({ textAlign: 'center' })
  .box({ marginTop: 48 })
  .$el('theme-graph-export')

export const exportBtn = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 15, fontWeight: '600', color: '#ffffff' })
  .box({ padding: '12px 32px', borderRadius: 8, border: 'none' })
  .raw('cursor', 'pointer')
  .hover()
    .background({ color: '#4f46e5' })
  .end()
  .$el('theme-graph-export-btn')

export const exportHint = chain()
  .typography({ fontSize: 13, color: '#71717a' })
  .box({ marginTop: 12 })
  .$el('theme-graph-export-hint')
export const fileInput = chain()
  .box({ 
    padding: '8px 12px', 
    borderRadius: 8, 
    border: '1px solid rgba(255, 255, 255, 0.1)',
  })
  .background({ color: 'rgba(0, 0, 0, 0.3)' })
  .typography({ fontSize: 13, color: '#a1a1aa' })
  .raw('cursor', 'pointer')
  .$el('theme-graph-file-input')
