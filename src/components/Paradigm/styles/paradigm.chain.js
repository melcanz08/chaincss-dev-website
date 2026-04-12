// ========== PARADIGM SECTION ==========
import { $ } from 'chaincss';

export const paradigmSection = $
  .padding('80px 0')
  .backgroundColor('#f8fafc')
  .$el('.paradigm-section');

export const paradigmContainer = $
  .maxWidth('1200px')
  .margin('0 auto')
  .padding('0 20px')
  .$el('.paradigm-section .container');

export const sectionTitle = $
  .fontSize('36px')
  .fontWeight('700')
  .textAlign('center')
  .marginBottom('16px')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('24px');
  })
  .$el('.section-title');

export const sectionSubtitle = $
  .fontSize('18px')
  .textAlign('center')
  .color('#64748b')
  .marginBottom('48px')
  .maxWidth('600px')
  .margin('0 auto 48px')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('14px').marginBottom('32px');
  })
  .$el('.section-subtitle');

export const paradigmGrid = $
  .display('grid')
  .gridTemplateColumns('repeat(auto-fill, minmax(320px, 1fr))')  // ← KEY CHANGE
  .gap('32px')
  .marginTop('48px')
  .media('(max-width: 768px)', (css) => {
    return css.gap('1rem');
  })
  .$el('.paradigm-grid');

export const paradigmCard = $
  .backgroundColor('white')
  .borderRadius('16px')
  .padding('24px')
  .border('1px solid #e2e8f0')
  .transition('all 0.2s')
  .height('100%')
  .display('flex')
  .flexDirection('column')
  .hover()
    .transform('translateY(-4px)')
    .boxShadow('0 12px 24px -12px rgba(0,0,0,0.1)')
  .end()
  .media('(max-width: 768px)', (css) => {
    return css.padding('16px');
  })
  .$el('.paradigm-card');

export const cardComparison = $
  .fontSize('14px')
  .marginBottom('12px')
  .color('#64748b')
  .$el('.card-comparison');

export const before = $
  .color('#ef4444')
  .fontWeight('500')
  .$el('.before');

export const cardResult = $
  .fontSize('14px')
  .color('#10b981')
  .marginTop('12px')
  .paddingTop('12px')
  .borderTop('1px solid #e2e8f0')
  .$el('.card-result');

export const paradigmQuote = $
  .marginTop('48px')
  .padding('32px')
  .backgroundColor('#eef2ff')
  .borderRadius('16px')
  .textAlign('center')
  .media('(max-width: 768px)', (css) => {
    return css.padding('20px').marginTop('32px');
  })
  .$el('.paradigm-quote');

export const quote = $
  .fontSize('20px')
  .fontWeight('500')
  .color('#1e293b')
  .fontStyle('italic')
  .lineHeight('1.5')
  .media('(max-width: 768px)', (css) => {
    return css.fontSize('16px');
  })
  .$el('blockquote');