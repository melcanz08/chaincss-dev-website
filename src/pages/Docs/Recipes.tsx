import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Recipes() {
  usePrism([]);
  return (
    <>
      <h1 className={contentTitle}>Recipes: Type-Safe Component Variants</h1>
      <p className={contentDesc}>
        Create components with variants (size, color, state) that compile to zero-runtime CSS.
        Like Stitches or CVA, but compiled at build time.
      </p>

      <h2 className={sectionHeading}>Basic Recipe</h2>
      <pre className={codeBlock}><code className='language-ts'>{`import { recipe } from 'chaincss'

const button = recipe({
  base: chain()
    .box({ padding: '8px 16px', borderRadius: 8 })
    .typography({ fontWeight: '600' })
    .raw('cursor', 'pointer')
    .transition({ tr: 'all 0.2s ease' }),

  variants: {
    color: {
      primary: chain().background({ color: '#6366f1' }).typography({ color: '#ffffff' }),
      secondary: chain().background({ color: 'transparent' }).typography({ color: '#6366f1' }).box({ border: '1px solid #6366f1' }),
      danger: chain().background({ color: '#ef4444' }).typography({ color: '#ffffff' }),
    },
    size: {
      sm: chain().typography({ fontSize: 12 }).box({ padding: '6px 12px' }),
      md: chain().typography({ fontSize: 14 }).box({ padding: '8px 16px' }),
      lg: chain().typography({ fontSize: 16 }).box({ padding: '12px 24px' }),
    },
  },

  defaultVariants: { color: 'primary', size: 'md' },
})

// Type-safe variant selection
const primaryBtn = button({ color: 'primary', size: 'lg' })
const dangerBtn = button({ color: 'danger', size: 'sm' })`}</code></pre>

      <h2 className={sectionHeading}>Compound Variants</h2>
      <pre className={codeBlock}><code className='language-ts'>{`const button = recipe({
  base: chain().box({ padding: '8px 16px', borderRadius: 8 }),
  variants: {
    color: {
      primary: chain().background({ color: '#6366f1' }),
      ghost: chain().background({ color: 'transparent' }),
    },
    outlined: {
      true: chain().box({ border: '1px solid currentColor' }),
      false: chain(),
    },
  },
  compoundVariants: [{
    variants: { color: 'ghost', outlined: true },
    style: chain().box({ border: '2px solid #6366f1' }).background({ color: 'rgba(99,102,241,0.08)' }),
  }],
})`}</code></pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Recipes compile to static CSS. Use them for design systems 
        where variants are known ahead of time. For truly dynamic values, use{' '}
        <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a>.
      </div>
    </>
  );
}