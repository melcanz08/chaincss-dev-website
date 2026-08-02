import { chain } from 'chaincss'

export const emitterDividerDrop = (left: string) => chain()
  .position({ type: 'absolute', top: 0 })
  .box({ width: 2, height: 20, left })
  .background({ color: 'rgba(255, 255, 255, 0.1)' })
  .$el(`emitter-drop-${left.replace('%', '')}`)

export const legendDot = (color: string) => chain()
  .box({ width: 8, height: 8, borderRadius: '50%' })
  .background({ color })
  .$el(`legend-dot-${color.replace('#', '')}`)

export const nodeDot = (color: string) => chain()
  .box({ width: 8, height: 8, borderRadius: '50%' })
  .background({ color })
  .$el(`node-dot-${color.replace('#', '')}`)

export const inspectorNodeDot = (color: string) => chain()
  .box({ width: 10, height: 10, borderRadius: '50%' })
  .background({ color })
  .$el(`inspector-node-dot-${color.replace('#', '')}`)
