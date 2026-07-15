import { chain } from 'chaincss';

export const table = chain()
  .box({ width: '100%' })
  .raw('border-collapse', 'collapse')
  .typography({ fontSize: 14 })
  .$el('comparison-table');

export const th = chain()
  .box({ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' })
  .typography({
    textAlign: 'left',
    color: '#71717a',
    fontWeight: '500',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  })
  .$el('comparison-th');

export const td = chain()
  .box({ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' })
  .typography({ color: '#e4e4e7' })
  .$el('comparison-td');

export const check = chain()
  .typography({ color: '#22c55e', fontWeight: '600' })
  .$el('comparison-check');

export const cross = chain()
  .typography({ color: '#ef4444' })
  .$el('comparison-cross');

export const partial = chain()
  .typography({ color: '#f59e0b' })
  .$el('comparison-partial');

export const wrapper = chain()
  .box({ overflow: 'auto', maxWidth: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' })
  .media('(max-width: 768px)', (c) => c
    .box({ maxWidth: 'calc(100vw - 48px)' })
  )
  .$el('comparison-wrapper');