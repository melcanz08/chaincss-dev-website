import { chain } from 'chaincss';

export const footer = chain()
  .box({ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px' })
  .flex({ direction: 'column', align: 'center', gap: 16 })
  .media('(max-width: 640px)', (c) => c
    .box({ padding: '32px 16px' })
    .flex({ gap: 12 })
  )
  .$el('site-footer');

export const footerRow = chain()
  .flex({ align: 'center', justify: 'center', gap: 24, wrap: 'wrap' })
  .media('(max-width: 640px)', (c) => c
    .flex({ direction: 'column', align: 'center', gap: 16 })
  )
  .$el('footer-row');

export const footerText = chain()
  .typography({ fontSize: 14, color: '#52525b' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 12, textAlign: 'center' })
  )
  .$el('footer-text');

export const footerLink = chain()
  .typography({ fontSize: 14, color: '#71717a', textDecoration: 'none' })
  .hover()
    .typography({ color: '#a5b4fc' })
  .end()
  .transition({ tr: 'color 0.15s ease' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 13 })
  )
  .$el('footer-link');

export const footerStat = chain()
  .typography({ fontSize: 14, color: '#6366f1' })
  .media('(max-width: 640px)', (c) => c
    .typography({ fontSize: 13 })
  )
  .$el('footer-stat');