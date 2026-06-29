import { chain } from 'chaincss';

export const section = chain()
  .padding('100px 24px')
  .maxWidth(1200)
  .margin('0 auto')
  .media('(max-width: 640px)', (c) => c
    .padding('60px 16px')
  )
  .$el('features-section');

export const sectionLabel = chain()
  .fontSize(13)
  .fontWeight("600")
  .color('#818cf8')
  .textTransform('uppercase')
  .letterSpacing('1px')
  .textAlign('center')
  .marginBottom(16)
  .$el('section-label');

export const sectionTitle = chain()
  .fontSize(36)
  .fontWeight("700")
  .color('#f4f4f5')
  .textAlign('center')
  .marginBottom(16)
  .letterSpacing('-0.5px')
  .media('(max-width: 640px)', (c) => c
    .fontSize(28)
  )
  .$el('section-title');

export const sectionSubtitle = chain()
  .fontSize(17)
  .color('#a1a1aa')
  .textAlign('center')
  .maxWidth(600)
  .margin('0 auto 64px')
  .lineHeight("1.7")
  .media('(max-width: 640px)', (c) => c
    .fontSize(15)
    .margin('0 auto 40px')
    .padding('0 8px')
  )
  .$el('section-subtitle');

export const grid = chain()
  .display('grid')
  .gridTemplateColumns('repeat(auto-fit, minmax(340px, 1fr))')
  .gap(24)
  .media('(max-width: 640px)', (c) => c
    .gridTemplateColumns('1fr')
    .gap(16)
  )
  .$el('feature-grid');

export const card = chain()
  .bg('rgba(255, 255, 255, 0.02)')
  .border('1px solid rgba(255, 255, 255, 0.05)')
  .rounded(16)
  .padding('32px')
  .transition('all 0.2s ease')
  .hover()
    .borderColor('rgba(99, 102, 241, 0.2)')
    .bg('rgba(99, 102, 241, 0.04)')
  .end()
  .media('(max-width: 640px)', (c) => c
    .padding('24px')
  )
  .$el('feature-card');

export const cardIcon = chain()
  .fontSize(36)
  .marginBottom(20)
  .$el('feature-card-icon');

export const cardTitle = chain()
  .fontSize(18)
  .fontWeight("600")
  .color('#e4e4e7')
  .marginBottom(12)
  .$el('feature-card-title');

export const cardText = chain()
  .fontSize(14)
  .color('#a1a1aa')
  .lineHeight("1.7")
  .$el('feature-card-text');

export const cardCode = chain()
  .bg('rgba(0, 0, 0, 0.3)')
  .rounded(8)
  .padding('14px 16px')
  .fontSize(13)
  .fontFamily("'JetBrains Mono', 'Fira Code', monospace")
  .color('#a5b4fc')
  .marginTop(16)
  .overflow('auto')
  .lineHeight("1.6")
  .$el('feature-card-code');
