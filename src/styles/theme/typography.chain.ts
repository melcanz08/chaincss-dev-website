import { chain } from 'chaincss'

export const heading1 = chain()
  .typography({ fontSize: 60, fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px' })
  .$el('h1')

export const heading2 = chain()
  .typography({ fontSize: 36, fontWeight: '700', letterSpacing: '-0.5px' })
  .$el('h2')

export const heading3 = chain()
  .typography({ fontSize: 22, fontWeight: '600' })
  .$el('h3')

export const heading4 = chain()
  .typography({ fontSize: 18, fontWeight: '600' })
  .$el('h4')

export const bodyLarge = chain()
  .typography({ fontSize: 18, lineHeight: '1.7' })
  .$el('body-lg')

export const body = chain()
  .typography({ fontSize: 15, lineHeight: '1.8' })
  .$el('body')

export const bodySmall = chain()
  .typography({ fontSize: 13, lineHeight: '1.6' })
  .$el('body-sm')

export const caption = chain()
  .typography({ fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase' })
  .$el('caption')

export const mono = chain()
  .typography({ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 13, lineHeight: '1.7' })
  .$el('mono')

export const monoSmall = chain()
  .typography({ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 11 })
  .$el('mono-sm')
