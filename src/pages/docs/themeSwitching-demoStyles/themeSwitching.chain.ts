// src/pages/docs/themeSwitching-demoStyles/themeSwitching.chain.ts

import { chain } from 'chaincss'

export const demoContainer = chain()
  .box({ 
    borderRadius: 16, 
    padding: 32, 
    marginBottom: 40,
    border: { theme: { light: '1px solid #e2e8f0', dark: '1px solid #334155' } }
  })
  .background({ color: { theme: { light: '#ffffff', dark: '#1e293b' } } })
  .raw('transition', 'all 0.3s ease')
  .$el('theme-demo-container')

export const demoHeading = chain()
  .typography({ 
    fontSize: 18, 
    fontWeight: '700',
    color: { theme: { light: '#0f172a', dark: '#f1f5f9' } }
  })
  .$el('theme-demo-heading')

export const demoButton = chain()
  .box({ padding: '10px 20px', borderRadius: 8, border: 'none' })
  .typography({ fontSize: 14, fontWeight: '600' })
  .raw('cursor', 'pointer')
  .raw('transition', 'all 0.2s ease')
  .background({ color: { theme: { light: '#0f172a', dark: '#f1f5f9' } } })
  .typography({ color: { theme: { light: '#ffffff', dark: '#0f172a' } } })
  .$el('theme-demo-btn')

export const demoTokenCard = chain()
  .box({ borderRadius: 10, padding: 16 })
  .background({ color: { theme: { light: '#f8fafc', dark: '#0f172a' } } })
  .box({ border: { theme: { light: '1px solid #e2e8f0', dark: '1px solid #334155' } } })
  .raw('transition', 'all 0.3s ease')
  .$el('theme-demo-token')