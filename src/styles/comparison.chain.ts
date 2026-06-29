import { chain } from 'chaincss';

export const table = chain()
  .width('100%')
  .borderCollapse('collapse')
  .fontSize(14)
  .$el('comparison-table');

export const th = chain()
  .padding('12px 16px')
  .textAlign('left')
  .color('#71717a')
  .fontWeight("500")
  .fontSize(13)
  .textTransform('uppercase')
  .letterSpacing('0.5px')
  .borderBottom('1px solid rgba(255,255,255,0.06)')
  .whiteSpace('nowrap')
  .$el('comparison-th');

export const td = chain()
  .padding('14px 16px')
  .color('#e4e4e7')
  .borderBottom('1px solid rgba(255,255,255,0.04)')
  .$el('comparison-td');

export const check = chain()
  .color('#22c55e')
  .fontWeight("600")
  .$el('comparison-check');

export const cross = chain()
  .color('#ef4444')
  .$el('comparison-cross');

export const partial = chain()
  .color('#f59e0b')
  .$el('comparison-partial');

export const wrapper = chain()
  .overflow("auto")
  .maxWidth("100%")
  .rounded(12)
  .border('1px solid rgba(255,255,255,0.06)')
  .media('(max-width: 768px)', (c) => c
    .maxWidth('calc(100vw - 48px)')
  )
  .$el('comparison-wrapper');
