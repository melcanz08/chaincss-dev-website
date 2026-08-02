import { chain } from 'chaincss';

export const section = chain()
  .box({ padding: '100px 24px', maxWidth: 1400, margin: '0 auto', overflow: 'hidden' })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '60px 16px' })
  )
  .$el('features-section');

export const sectionLabel = chain()
  .typography({
    fontSize: 13,
    fontWeight: '600',
    color: '#818cf8',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'center',
  })
  .box({ marginBottom: 16 })
  .$el('section-label');

export const sectionTitle = chain()
  .typography({
    fontSize: 36,
    fontWeight: '700',
    color: '#f4f4f5',
    textAlign: 'center',
    letterSpacing: '-0.5px',
  })
  .box({ marginBottom: 16 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 28 })
  )
  .$el('section-title');

export const sectionSubtitle = chain()
  .typography({ fontSize: 17, color: '#a1a1aa', textAlign: 'center', lineHeight: '1.7' })
  .box({ maxWidth: 700, margin: '0 auto 64px' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 15 })
    .box({ margin: '0 auto 40px' })
  )
  .$el('section-subtitle');

export const grid = chain()
  .grid({ columns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 })
  .box({ width: '100%' })
  .media('(max-width: 640px)', (c) => c
    .grid({ columns: '1fr', gap: 16 })
  )
  .$el('feature-grid');

export const card = chain()
  .background({ color: 'rgba(255, 255, 255, 0.02)' })
  .box({ border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: 16, minWidth: 0, padding: '32px' })
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .raw('border-color', 'rgba(99, 102, 241, 0.2)')
    .background({ color: 'rgba(99, 102, 241, 0.04)' })
  .end()
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '16px' })
  )
  .$el('feature-card');

export const cardIcon = chain()
  .typography({ fontSize: 36 })
  .box({ marginBottom: 20 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 28 })
    .box({ marginBottom: 12 })
  )
  .$el('feature-card-icon');

export const cardTitle = chain()
  .typography({ fontSize: 18, fontWeight: '600', color: '#e4e4e7' })
  .box({ marginBottom: 12 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 16 })
  )
  .$el('feature-card-title');

export const cardText = chain()
  .typography({ fontSize: 14, color: '#a1a1aa', lineHeight: '1.7' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 13 })
  )
  .$el('feature-card-text');

export const cardCode = chain()
  .background({ color: 'rgba(0, 0, 0, 0.3)' })
  .box({ borderRadius: 8, padding: '14px 16px', marginTop: 16, overflow: 'auto' })
  .typography({
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: '#a5b4fc',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    wordBreak: 'break-all',
  })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 11 })
    .box({ padding: '10px' })
  )
  .$el('feature-card-code');