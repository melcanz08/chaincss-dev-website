// src/pages/features/FigmaSyncPage/figmaSync.chain.ts
import { chain } from 'chaincss'

export const figmaContainer = chain()
  .box({ maxWidth: '900px', margin: '0 auto', padding: '100px 20px 40px 20px' })
  .$el('figma-container')

export const figmaTitle = chain()
  .typography({ fontSize: 36, fontWeight: '800', lineHeight: 1.2 })
  .$el('figma-title')

export const figmaSubtitle = chain()
  .typography({ fontSize: 16, lineHeight: 1.6, color: '#94a3b8' })
  .box({ marginBottom: 32 })
  .$el('figma-subtitle')

export const figmaCard = chain()
  .box({ borderRadius: 16, padding: 32, marginBottom: 32 })
  .background({ color: { theme: { idle: '#1e293b', syncing: '#1e1b4b', synced: '#064e3b' } } })
  .box({ border: { theme: { idle: '1px solid #334155', syncing: '1px solid #312e81', synced: '1px solid #065f46' } } })
  .raw('transition', 'all 0.3s ease')
  .$el('figma-card')

export const figmaButton = chain()
  .box({ padding: '10px 20px', borderRadius: 8, border: 'none' })
  .typography({ fontSize: 14, fontWeight: '600', color: '#ffffff' })
  .raw('cursor', 'pointer')
  .raw('transition', 'all 0.2s ease')
  .$el('figma-btn')