import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function Recipes() {
  return (
    <>
      <h1 className={contentTitle}>Recipes: Type-Safe Component Variants</h1>
      <p className={contentDesc}>
        Create components with variants (size, color, state) that compile to zero-runtime CSS.
        Like Stitches or CVA, but compiled away at build time.
      </p>

      <h2 className={sectionHeading}>Why Recipes?</h2>
      <p className={paragraph}>
        When building a component library, you often need variants: a button can be primary or secondary,
        small or large. Without recipes, you'd write separate styles for each combination.
        Recipes let you define variants declaratively and ChainCSS generates all the CSS at build time.
      </p>

      <h2 className={sectionHeading}>Basic Recipe</h2>
      <pre className={codeBlock}>{`import { recipe } from 'chaincss'

const button = recipe({
  base: chain()
    .padding('8px 16px')
    .rounded(8)
    .fw(600)
    .cursor('pointer')
    .transition('all 0.2s ease'),

  variants: {
    color: {
      primary: chain().bg('#6366f1').color('#ffffff'),
      secondary: chain().bg('transparent').color('#6366f1').border('1px solid #6366f1'),
      danger: chain().bg('#ef4444').color('#ffffff'),
    },
    size: {
      sm: chain().fs(12).padding('6px 12px'),
      md: chain().fs(14).padding('8px 16px'),
      lg: chain().fs(16).padding('12px 24px'),
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

// Usage: pick variants with type-safe autocomplete
const primaryBtn = button({ color: 'primary', size: 'lg' })
const dangerBtn = button({ color: 'danger', size: 'sm' })
const defaultBtn = button()  // uses defaultVariants
const emptyBtn = button({})  // also uses defaultVariants`}</pre>

      <h2 className={sectionHeading}>Generated CSS</h2>
      <p className={paragraph}>
        ChainCSS generates CSS for all variant combinations at build time.
        For the button above: 3 colors × 3 sizes = 9 variant combinations, all compiled to static CSS.
      </p>
      <pre className={codeBlock}>{`/* All variants compiled at build time — zero runtime JS */
.chain-btn-primary-md { padding: 8px 16px; background: #6366f1; ... }
.chain-btn-primary-sm { padding: 6px 12px; background: #6366f1; ... }
.chain-btn-primary-lg { padding: 12px 24px; background: #6366f1; ... }
.chain-btn-secondary-md { ... }
/* ... all 9 combinations generated */`}</pre>

      <h2 className={sectionHeading}>Compound Variants</h2>
      <p className={paragraph}>
        Apply styles only when specific variant combinations match:
      </p>
      <pre className={codeBlock}>{`const button = recipe({
  base: chain().padding('8px 16px').rounded(8),
  variants: {
    color: {
      primary: chain().bg('#6366f1').color('#ffffff'),
      ghost: chain().bg('transparent').color('#6366f1'),
    },
    outlined: {
      true: chain().border('1px solid currentColor'),
      false: chain(),
    },
  },
  compoundVariants: [
    {
      variants: { color: 'ghost', outlined: true },
      style: chain().border('2px solid #6366f1').bg('rgba(99, 102, 241, 0.08)'),
    },
  ],
  defaultVariants: {
    color: 'primary',
    outlined: false,
  },
})`}</pre>

      <h2 className={sectionHeading}>All Variants at Once</h2>
      <p className={paragraph}>
        Need to generate a styleguide or test all combinations? Use <code className={inlineCode}>getAllVariants()</code>:
      </p>
      <pre className={codeBlock}>{`const allVariants = button.getAllVariants()
// Returns: [
//   { color: 'primary', size: 'sm' },
//   { color: 'primary', size: 'md' },
//   { color: 'primary', size: 'lg' },
//   { color: 'secondary', size: 'sm' },
//   ... all combinations
// ]

// Render a styleguide
allVariants.map(v => (
  <button key={v.color + v.size} className={button(v).selectors[0]}>
    {v.color} {v.size}
  </button>
))`}</pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Recipes compile to static CSS. Use them for design systems where all variants are known ahead of time. For truly dynamic values (like user-generated colors), use <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> instead.
      </div>
    </>
  );
}
