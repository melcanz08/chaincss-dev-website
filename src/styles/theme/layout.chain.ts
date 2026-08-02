import { chain } from 'chaincss'

export const container = chain()
  .box({ maxWidth: 1400, margin: '0 auto', paddingLeft: 24, paddingRight: 24 })
  .$el('container')

export const section = chain()
  .box({ paddingTop: 100, paddingBottom: 60 })
  .media('(max-width: 640px)', (c) => c
    .box({ paddingTop: 60, paddingBottom: 40 })
  )
  .$el('section')

export const grid = chain()
  .grid({ columns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 })
  .media('(max-width: 640px)', (c) => c
    .grid({ columns: '1fr', gap: 16 })
  )
  .$el('grid')

export const flexCenter = chain()
  .flex({ align: 'center', justify: 'center' })
  .$el('flex-center')

export const flexBetween = chain()
  .flex({ align: 'center', justify: 'space-between' })
  .$el('flex-between')

export const flexCol = chain()
  .flex({ direction: 'column' })
  .$el('flex-col')

export const gap = {
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}
