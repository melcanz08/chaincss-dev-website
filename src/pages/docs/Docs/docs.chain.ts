import { chain } from 'chaincss';

export const docsLayout = chain()
  .flex({ gap: 48 })
  .box({ maxWidth: 1500, margin: '0 auto', padding: '80px 24px 40px' })
  .media('(max-width: 768px)', (c) => c
    .flex({ direction: 'column', gap: 24 })
    .box({ padding: '80px 16px 40px' })
  )
  .$el('docs-layout');

export const sidebar = chain()
  .box({ width: 260, paddingRight: 16, overflow: 'auto' })
  .position({ type: 'sticky', top: 88 })
  .raw('flex-shrink', '0')
  .raw('height', 'fit-content')
  .raw('max-height', 'calc(100vh - 120px)')
  .media('(max-width: 768px)', (c) => c
    .box({ width: '100%', paddingRight: 0, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' })
    .position({ type: 'static' })
    .raw('max-height', 'none')
    .raw('overflow', 'visible')
  )
  .$el('docs-sidebar');

export const sidebarTitle = chain()
  .typography({
    fontSize: 12,
    fontWeight: '600',
    color: '#52525b',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  })
  .box({ marginBottom: 12 })
  .$el('sidebar-title');

export const sidebarLink = chain()
  .box({ padding: '8px 12px', borderRadius: 6, marginBottom: 2 })
  .typography({ fontSize: 14, color: '#a1a1aa', textDecoration: 'none' })
  .raw('display', 'block')
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.1s ease' })
  .hover()
    .background({ color: 'rgba(255,255,255,0.04)' })
    .typography({ color: '#e4e4e7' })
  .end()
  .$el('sidebar-link');

export const sidebarLinkActive = chain()
  .background({ color: 'rgba(99,102,241,0.12)' })
  .typography({ color: '#c7d2fe', fontWeight: '500' })
  .$el('sidebar-link-active');

export const content = chain()
  .box({ minWidth: 0, maxWidth: 'calc(100% - 308px)' })
  .raw('flex-grow', '1')
  .media('(max-width: 768px)', (c) => c
    .box({ maxWidth: '100%' })
  )
  .$el('docs-content');

export const contentTitle = chain()
  .typography({ fontSize: 36, fontWeight: '700', color: '#f4f4f5', letterSpacing: '-1px' })
  .box({ marginBottom: 8 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 28 })
  )
  .$el('content-title');

export const contentDesc = chain()
  .typography({ fontSize: 17, color: '#a1a1aa', lineHeight: '1.7' })
  .box({ marginBottom: 40 })
  .$el('content-desc');

export const sectionHeading = chain()
  .typography({ fontSize: 22, fontWeight: '600', color: '#e4e4e7' })
  .box({ marginTop: 48, marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.06)' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 18 })
    .box({ marginTop: 32 })
  )
  .$el('section-heading');

export const paragraph = chain()
  .typography({ fontSize: 15, color: '#c4c4cc', lineHeight: '1.8' })
  .box({ marginBottom: 20 })
  .$el('docs-paragraph');

export const codeBlock = chain()
  .background({ color: 'rgba(0,0,0,0.4)' })
  .box({ borderRadius: 12, padding: '20px 24px', overflow: 'auto', marginBottom: 24, border: '1px solid rgba(255,255,255,0.06)' })
  .typography({
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 14,
    lineHeight: '1.7',
    color: '#e4e4e7',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 13 })
    .box({ padding: '16px' })
  )
  .$el('code-block');

export const inlineCode = chain()
  .background({ color: 'rgba(99,102,241,0.12)' })
  .typography({ color: '#c7d2fe', fontSize: 13, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", whiteSpace: 'nowrap' })
  .box({ padding: '2px 8px', borderRadius: 4 })
  .$el('inline-code');

export const note = chain()
  .background({ color: 'rgba(99,102,241,0.08)' })
  .box({ borderLeft: '3px solid #6366f1', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: 24 })
  .typography({ fontSize: 14, color: '#c7d2fe', lineHeight: '1.7' })
  .$el('docs-note');

export const tableWrapper = chain()
  .box({ overflow: 'auto', marginBottom: 24, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' })
  .$el('docs-table-wrap');

export const docTable = chain()
  .box({ width: '100%' })
  .raw('border-collapse', 'collapse')
  .typography({ fontSize: 14 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 12 })
  )
  .$el('doc-table');

export const docTh = chain()
  .box({ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' })
  .background({ color: 'rgba(255,255,255,0.02)' })
  .typography({
    textAlign: 'left',
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '8px 10px' })
    .typography({ fontSize: 11 })
  )
  .$el('doc-th');

export const docTd = chain()
  .box({ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' })
  .typography({ fontSize: 14, color: '#d4d4d8' })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '8px 10px' })
    .typography({ fontSize: 12 })
  )
  .$el('doc-td');

export const auditTextarea = chain()
  .box({ width: '100%', minHeight: 300, borderRadius: 12, padding: '20px 24px', border: '1px solid rgba(255,255,255,0.06)' })
  .background({ color: 'rgba(0,0,0,0.4)' })
  .typography({ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 14, lineHeight: '1.7', color: '#e4e4e7' })
  .raw('outline', 'none')
  .raw('resize', 'vertical')
  .focus()
    .box({ borderColor: '#6366f1' })
  .end()
  .$el('audit-textarea');

export const auditBtn = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 15, fontWeight: '600', color: '#ffffff' })
  .box({ padding: '14px 32px', borderRadius: 10, border: 'none' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.15s ease' })
  .hover()
    .background({ color: '#4f46e5' })
  .end()
  .$el('audit-btn');

export const auditResultCard = chain()
  .background({ color: 'rgba(0,0,0,0.3)' })
  .box({ borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 })
  .$el('audit-result-card');

export const auditStatValue = chain()
  .typography({ fontSize: 32, fontWeight: '700', lineHeight: '1' })
  .$el('audit-stat-value');

export const auditStatLabel = chain()
  .typography({ fontSize: 12, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' })
  .box({ marginTop: 8 })
  .$el('audit-stat-label');

export const auditIssueItem = chain()
  .box({ padding: '14px 18px', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid' })
  .background({ color: 'rgba(255,255,255,0.02)' })
  .$el('audit-issue-item');

export const auditIssueMsg = chain()
  .typography({ fontSize: 14, fontWeight: '500', color: '#e4e4e7' })
  .box({ marginBottom: 4 })
  .$el('audit-issue-msg');

export const auditIssueSuggestion = chain()
  .typography({ fontSize: 13, color: '#71717a' })
  .$el('audit-issue-suggestion');

export const auditGrid = chain()
  .grid({ columns: 'repeat(4, 1fr)', gap: 16 })
  .box({ marginBottom: 32 })
  .media('(max-width: 640px)', (c) => c
    .grid({ columns: 'repeat(2, 1fr)' })
  )
  .$el('audit-grid');