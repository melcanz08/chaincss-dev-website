// src/pages/features/IntentPage/intent.chain.ts
import { chain } from 'chaincss'

export const intentContainer = chain()
  .box({ maxWidth: '900px', margin: '0 auto', padding: '100px 20px 40px 20px' })
  .$el('intent-container')

export const intentTitle = chain()
  .typography({ fontSize: 36, fontWeight: '800', lineHeight: 1.2 })
  .$el('intent-title')

export const intentSubtitle = chain()
  .typography({ fontSize: 16, lineHeight: 1.6, color: '#94a3b8' })
  .box({ marginBottom: 32 })
  .$el('intent-subtitle')

export const intentCard = chain()
  .box({ borderRadius: 16, padding: 32, marginBottom: 32 })
  .background({ color: { theme: { 
    'button-primary': '#1e293b', 
    warning: '#451a03',
    selected: '#064e3b', 
    disabled: '#4c0519' 
  } } })
  .box({ border: { theme: { 
    'button-primary': '1px solid #334155', 
    warning: '1px solid #78350f',
    selected: '1px solid #065f46', 
    disabled: '1px solid #881337' 
  } } })
  .raw('transition', 'all 0.3s ease')
  .$el('intent-card')

export const intentPreviewBox = chain()
  .box({ borderRadius: 12, padding: 24 })
  .background({ color: { theme: { 
    'button-primary': '#6366f1', 
    warning: '#f59e0b',
    selected: '#10b981', 
    disabled: '#f43f5e' 
  } } })
  .typography({ color: '#ffffff', fontSize: 15, fontWeight: '600' })
  .raw('transition', 'all 0.3s ease')
  .$el('intent-preview')