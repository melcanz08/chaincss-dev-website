import { chain } from 'chaincss';

export const footer = chain()
  .borderTop('1px solid rgba(255,255,255,0.06)')
  .padding('40px 24px')
  .display('flex')
  .flexDirection('column')
  .alignItems('center')
  .gap(16)
  .media('(max-width: 640px)', (c) => c
    .padding('32px 16px')
    .gap(12)
  )
  .$el('site-footer');

export const footerRow = chain()
  .display('flex')
  .alignItems('center')
  .justifyContent('center')
  .gap(24)
  .flexWrap('wrap')
  .media('(max-width: 640px)', (c) => c
    .gap(16)
    .flexDirection('column')
    .alignItems('center')
  )
  .$el('footer-row');

export const footerText = chain()
  .fontSize(14)
  .color('#52525b')
  .media('(max-width: 640px)', (c) => c
    .fontSize(12)
    .textAlign('center')
  )
  .$el('footer-text');

export const footerLink = chain()
  .color('#71717a')
  .fontSize(14)
  .textDecoration('none')
  .hover()
    .color('#a5b4fc')
  .end()
  .transition('color 0.15s ease')
  .media('(max-width: 640px)', (c) => c
    .fontSize(13)
  )
  .$el('footer-link');

export const footerStat = chain()
  .color('#6366f1')
  .fontSize(14)
  .media('(max-width: 640px)', (c) => c
    .fontSize(13)
  )
  .$el('footer-stat');
