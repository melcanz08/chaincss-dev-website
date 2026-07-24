// hero.chain.ts
import { chain, type ChainProxy } from 'chaincss';

export const heroSection = chain()
  .box({ padding: '140px 24px 100px', maxWidth: 1100, margin: '0 auto' })
  .typography({ textAlign: 'center' })
  .media('(max-width: 640px)', (c:ChainProxy) => c
    .box({ padding: '100px 16px 60px' })
  )
  .$el('hero');

export const heroBadge = chain()
  .flex({ align: 'center', gap: 8 })
  .raw('display','inline-flex')
  .background({ color: 'rgba(99, 102, 241, 0.1)' })
  .typography({ fontSize: 13, fontWeight: '500', color: '#a5b4fc' })
  .box({ padding: '6px 16px', borderRadius: 9999, marginBottom: 32 })
  .media('(max-width: 640px)', (c:ChainProxy) => c
    .typography({ fontSize: 12 })
    .box({ padding: '4px 12px', marginBottom: 24 })
  )
  .$el('hero-badge');

export const heroTitle = chain()
  .typography({
    fontSize: 60,
    fontWeight: '800',
    color: '#f4f4f5',
    lineHeight: '1.1',
    letterSpacing: '-2px',
  })
  .box({ marginBottom: 24 })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 36, letterSpacing: '-1px' })
    .box({ marginBottom: 16 })
  )
  .$el('hero-title');

export const heroGradient = chain()
  .background({ bg: 'linear-gradient(135deg, #818cf8, #a78bfa, #f472b6)' })
  .raw('backgroundClip', 'text')
  .raw('textFillColor', 'transparent')
  .$el('hero-gradient');

export const heroSubtitle = chain()
  .typography({ fontSize: 18, color: '#a1a1aa', lineHeight: '1.7' })
  .box({ maxWidth: 750, margin: '0 auto 48px' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 15 })
    .box({ margin: '0 auto 32px', padding: '0 8px' })
  )
  .$el('hero-subtitle');

export const heroCtaGroup = chain()
  .flex({ justify: 'center', gap: 16 })
  .media('(max-width: 640px)', (c) => c
    .flex({ direction: 'column', align: 'center', gap: 12 })
  )
  .$el('hero-cta-group');

export const heroPrimaryBtn = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 16, fontWeight: '600', color: '#ffffff' })
  .box({ padding: '14px 32px', borderRadius: 12, border: 'none' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .background({ color: '#4f46e5' })
    .transform({ custom: 'translateY(-1px)' })
    .shadow({ box: '0 4px 20px rgba(99, 102, 241, 0.3)' })
  .end()
  .media('(max-width: 640px)', (c) => c
    .box({ width: '100%', maxWidth: 400, padding: '14px 24px' })
    .typography({ fontSize: 15 })
  )
  .$el('hero-primary-btn');

export const heroSecondaryBtn = chain()
  .background({ color: 'rgba(255, 255, 255, 0.04)' })
  .typography({ fontSize: 16, fontWeight: '500', color: '#d4d4d8' })
  .box({ padding: '14px 32px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.1)' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'all 0.2s ease' })
  .hover()
    .background({ color: 'rgba(255, 255, 255, 0.08)' })
    .raw('border-color', 'rgba(255, 255, 255, 0.2)')
  .end()
  .media('(max-width: 640px)', (c) => c
    .box({ width: '100%', maxWidth: 400, padding: '14px 24px' })
    .typography({ fontSize: 15 })
  )
  .$el('hero-secondary-btn');