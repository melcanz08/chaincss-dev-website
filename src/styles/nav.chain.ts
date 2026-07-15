import { chain } from 'chaincss';

export const nav = chain()
  .position({ type: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 })
  .background({ color: 'rgba(10, 10, 15, 0.8)' })
  .raw('backdrop-filter', 'blur(12px)')
  .box({ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' })
  .$el('nav');

export const navInner = chain()
  .flex({ align: 'center', justify: 'space-between' })
  .box({ height: 64, padding: '0 24px' })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '0 16px', height: 56 })
  )
  .$el('nav-inner');

export const logo = chain()
  .typography({ fontSize: 20, fontWeight: '700', color: '#ffffff', letterSpacing: '-0.5px' })
  .raw('cursor', 'pointer')
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 17 })
  )
  .$el('nav-logo');

export const logoAccent = chain()
  .typography({ color: '#6366f1' })
  .$el('nav-logo-accent');

export const navLinks = chain()
  .flex({ align: 'center', gap: 24 })
  .media('(max-width: 640px)', (c) => c
    .flex({ gap: 12 })
  )
  .$el('nav-links');

export const navLink = chain()
  .typography({ fontSize: 14, fontWeight: '500', color: '#a1a1aa' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'color 0.15s ease' })
  .hover()
    .typography({ color: '#ffffff' })
  .end()
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 12 })
  )
  .$el('nav-link');

export const navCta = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 14, fontWeight: '600', color: '#ffffff' })
  .box({ padding: '8px 20px', borderRadius: 8, border: 'none' })
  .raw('cursor', 'pointer')
  .transition({ tr: 'background 0.15s ease' })
  .hover()
    .background({ color: '#4f46e5' })
  .end()
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '6px 14px' })
    .typography({ fontSize: 12 })
  )
  .$el('nav-cta');