import { chain } from 'chaincss';

export const footer = chain()
  .borderTop('1px solid rgba(255,255,255,0.06)')
  .padding('40px 24px')
  .textAlign('center')
  .$el('site-footer');

export const footerText = chain()
  .fontSize(14)
  .color('#52525b')
  .$el('footer-text');

export const footerLink = chain()
  .color('#71717a')
  .hover()
    .color('#a5b4fc')
  .end()
  .transition('color 0.15s ease')
  .$el('footer-link');
