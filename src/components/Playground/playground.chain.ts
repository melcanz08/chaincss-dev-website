import { chain } from 'chaincss';

interface StyleContext {
  isDark: boolean;
  count: number;
  [key: string]: any; // Allow additional properties
}

// ============================================================
// STATIC STYLES
// ============================================================

export const playgroundSection = chain()
  .box({ paddingTop: 100, paddingLeft: 24, paddingRight: 24, paddingBottom: 60, maxWidth: 1400, margin: '0 auto' })
  .media('(max-width: 640px)', (c) => c
    .box({ paddingTop: 80, paddingLeft: 16, paddingRight: 16, paddingBottom: 40 })
  )
  .$el('playground-section');

export const wrapper = chain()
  .grid({ columns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 })
  .box({ marginTop: 24 })
  .media('(max-width: 640px)', (c) => c
    .grid({ columns: '1fr', gap: 16 })
  )
  .$el('playground-wrapper');

export const panel = chain()
  .background({ color: 'rgba(15, 23, 42, 0.8)' })
  .box({ border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: 12, padding: 24 })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: 16 })
  )
  .$el('playground-panel');

export const panelTitle = chain()
  .typography({ textAlign: 'center', fontSize: 15, fontWeight: '600', color: '#e2e8f0' })
  .box({ marginBottom: 16 })
  .$el('playground-panel-title');

export const runButton = chain()
  .flex({ align: 'center', justify: 'center' })
  .background({ color: '#6366f1' })
  .typography({ fontSize: 14, fontWeight: '600', color: '#ffffff' })
  .box({ border: 'none', borderRadius: 8, padding: '10px 20px', margin: '12px auto 0px', width: 'fit-content' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .background({ color: '#4f46e5' })
    .transform({ custom: 'scale(1.02)' })
  .end()
  .$el('playground-run');

export const tabs = chain()
  .flex({ gap: 0 })
  .box({ margin: '0 auto 24px', borderRadius: 10, padding: 4, width: 'fit-content' })
  .background({ color: 'rgba(15, 23, 42, 0.5)' })
  .$el('playground-tabs');

export const codeDisplay = chain()
  .background({ color: '#0f172a' })
  .box({ borderRadius: 8, padding: 16, overflow: 'auto', maxHeight: 240, border: '1px solid rgba(99, 102, 241, 0.3)' })
  .typography({ fontSize: 13, color: '#e2e8f0' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 11 })
    .box({ maxHeight: 180 })
  )
  .$el('playground-code');

export const outputDisplay = chain()
  .background({ color: '#0f172a' })
  .box({ borderRadius: 8, padding: 16, overflow: 'auto', maxHeight: 240, minHeight: 200, border: '1px solid rgba(16, 185, 129, 0.3)' })
  .typography({ fontSize: 13, color: '#4ade80' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 11 })
    .box({ maxHeight: 180, minHeight: 120 })
  )
  .$el('playground-output-display');

export const demoSection = chain()
  .box({ marginTop: 48 })
  .$el('demo-section');

export const demoDescription = chain()
  .typography({ textAlign: 'center', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 })
  .box({ marginBottom: 24 })
  .$el('demo-description');

export const controlBar = chain()
  .flex({ align: 'center', justify: 'center', gap: 16, wrap: 'wrap' })
  .box({ margin: '0 auto 24px', width: 'fit-content' })
  .media('(max-width: 640px)', (c) => c
    .flex({ direction: 'column' })
    .box({ width: '100%' })
  )
  .$el('control-bar');

export const infoBox = chain()
  .box({ marginTop: 48, padding: 24, borderRadius: 12, border: '1px solid rgba(99, 102, 241, 0.15)' })
  .background({ color: 'rgba(99, 102, 241, 0.08)' })
  .typography({ textAlign: 'center' })
  .$el('info-box');

export const infoTitle = chain()
  .typography({ color: '#e2e8f0', fontSize: 16, fontWeight: '600' })
  .box({ marginBottom: 12 })
  .$el('info-title');

export const infoList = chain()
  .typography({ color: '#94a3b8', fontSize: 14, lineHeight: 2.2, textAlign: 'center' })
  .raw('list-style-type', 'none')
  .box({ margin: 0, padding: 0 })
  .$el('info-list');

export const previewTitle = chain()
  .typography({ textAlign: 'center', fontSize: 24, fontWeight: '700' })
  .box({ marginBottom: 12 })
  .$el('preview-title');

export const previewText = chain()
  .typography({ textAlign: 'center', fontSize: 14, lineHeight: 1.7 })
  .raw('opacity', '0.7')
  .$el('preview-text');

// ============================================================
// DYNAMIC STYLES (Mixed Mode) — Context-aware, no window globals
// ============================================================

export const themeToggle = chain.dynamic()
  .flex({ align: 'center', gap: 8 })
  .raw('display', 'inline-flex')
  .box({ padding: '12px 24px', borderRadius: 8, border: '1px solid rgba(99, 102, 241, 0.3)' })
  .typography({ fontSize: 14, fontWeight: '600' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .raw({ backgroundColor: (ctx: StyleContext) => ctx.isDark ? '#1e293b' : '#f1f5f9' })
  .raw({ color: (ctx: StyleContext) => ctx.isDark ? '#e2e8f0' : '#0f172a' })
  .$el('theme-toggle');

export const counterBadge = chain.dynamic()
  .flex({ align: 'center', justify: 'center' })
  .raw('display', 'inline-flex')
  .box({ minWidth: 44, height: 44, borderRadius: 9999, padding: '0 16px', border: 'none' })
  .typography({ fontSize: 14, fontWeight: '700', color: '#ffffff' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .raw({ backgroundColor: (ctx: StyleContext) => ctx.count > 10 ? '#ef4444' : '#6366f1' })
  .$el('counter-badge');

export const previewCard = chain.dynamic()
  .box({ width: '100%', padding: 40, borderRadius: 16, border: '1px solid rgba(99, 102, 241, 0.15)' })
  .typography({ textAlign: 'center' })
  .transition({ tr: 'all 0.3s ease' })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: 24 })
  )
  .raw({ background: (ctx: StyleContext) => ctx.isDark
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  })
  .raw({ color: (ctx: StyleContext) => ctx.isDark ? '#f1f5f9' : '#0f172a' })
  .raw({ boxShadow: (ctx: StyleContext) => ctx.isDark
    ? '0 20px 60px rgba(0,0,0,0.5)'
    : '0 4px 12px rgba(0,0,0,0.1)'
  })
  .$el('preview-card');