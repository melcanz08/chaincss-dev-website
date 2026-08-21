// src/pages/features/TokensPage/tokens.chain.ts
import { chain } from 'chaincss'

export const tokensContainer = chain()
  .box({ maxWidth: '900px', margin: '0 auto', padding: '100px 20px 40px 20px' })
  .$el('tokens-container')

export const tokensTitle = chain()
  .typography({ fontSize: 36, fontWeight: '800', lineHeight: 1.2 })
  .$el('tokens-title')

export const tokensSubtitle = chain()
  .typography({ fontSize: 16, lineHeight: 1.6, color: '#94a3b8' })
  .box({ marginBottom: 32 })
  .$el('tokens-subtitle')

export const sandboxCard = chain()
  .box({ borderRadius: 16, padding: 32, marginBottom: 32 })
  .background({ color: { theme: { indigo: '#1e293b', emerald: '#064e3b', rose: '#4c0519', amber: '#451a03' } } })
  .box({ border: { theme: { indigo: '1px solid #334155', emerald: '1px solid #065f46', rose: '1px solid #881337', amber: '1px solid #78350f' } } })
  .raw('transition', 'all 0.3s ease')
  .$el('tokens-sandbox')

export const derivedCard = chain()
  .box({ borderRadius: 12, padding: 24 })
  .background({ color: { theme: { indigo: '#eef2ff', emerald: '#ecfdf5', rose: '#fff1f2', amber: '#fffbeb' } } })
  .box({ border: { theme: { indigo: '1px solid #c7d2fe', emerald: '1px solid #a7f3d0', rose: '1px solid #fecdd3', amber: '1px solid #fde68a' } } })
  .typography({ color: { theme: { indigo: '#312e81', emerald: '#065f46', rose: '#881337', amber: '#78350f' } } })
  .raw('transition', 'all 0.3s ease')
  .$el('tokens-derived-card')

export const actionButton = chain()
  .box({ padding: '10px 20px', borderRadius: 8, border: 'none' })
  .typography({ fontSize: 14, fontWeight: '600', color: '#ffffff' })
  .raw('cursor', 'pointer')
  .raw('transition', 'all 0.2s ease')
  .background({ color: { theme: { indigo: '#6366f1', emerald: '#10b981', rose: '#f43f5e', amber: '#f59e0b' } } })
  .$el('tokens-action-btn')