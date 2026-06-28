import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode
} from '../../styles/docs.chain.ts';

export default function Recipes() {
  return (
    <>
      <h1 className={contentTitle}>Recipes</h1>
      <p className={contentDesc}>
        Recipes are style factories with variants — similar to Stitches or Panda CSS recipes.
      </p>

      <pre className={codeBlock}>{`import { recipe } from 'chaincss'

const button = recipe({
  base: chain()
    .fontWeight(600)
    .rounded(8)
    .transition('all 0.15s ease')
    .$el('btn'),

  variants: {
    size: {
      sm: chain().padding('6px 12px').fontSize(13).$el('btn-sm'),
      md: chain().padding('10px 20px').fontSize(15).$el('btn-md'),
      lg: chain().padding('14px 28px').fontSize(17).$el('btn-lg'),
    },
    variant: {
      primary: chain().bg('#6366f1').color('#ffffff').$el('btn-primary'),
      secondary: chain().bg('transparent').color('#6366f1').border('1px solid #6366f1').$el('btn-secondary'),
      ghost: chain().bg('transparent').color('#6366f1').$el('btn-ghost'),
    }
  },

  defaultVariants: {
    size: 'md',
    variant: 'primary'
  }
})

// Usage:
import { button } from '../styles/button.chain'
// <button className={button({ size: 'lg', variant: 'secondary' })}>Click</button>`}</pre>
    </>
  );
}
