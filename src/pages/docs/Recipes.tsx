import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Recipes() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Recipes: Type-Safe Component Variants</h1>
      <p className={contentDesc}>
        Create components with variants (size, color, state) that compile to zero-runtime CSS.
        Like Stitches or CVA, but everything resolves at build time. Compound variants,
        default variants, and full variant matrix generation.
      </p>

      <h2 className={sectionHeading}>Basic Recipe</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain, recipe } from 'chaincss'

export const button = recipe({
  base: chain()
    .box({ padding: '8px 16px', borderRadius: 8 })
    .typography({ fontWeight: '600' })
    .raw('cursor', 'pointer')
    .transition({ tr: 'all 0.2s ease' })
    .$el('btn'),

  variants: {
    color: {
      primary: chain().background({ color: '#6366f1' }).typography({ color: '#ffffff' }).$el(),
      secondary: chain().background({ color: 'transparent' }).typography({ color: '#6366f1' }).box({ border: '1px solid #6366f1' }).$el(),
      danger: chain().background({ color: '#ef4444' }).typography({ color: '#ffffff' }).$el(),
    },
    size: {
      sm: chain().typography({ fontSize: 12 }).box({ padding: '6px 12px' }).$el(),
      md: chain().typography({ fontSize: 14 }).box({ padding: '8px 16px' }).$el(),
      lg: chain().typography({ fontSize: 16 }).box({ padding: '12px 24px' }).$el(),
    },
  },

  defaultVariants: { color: 'primary', size: 'md' },
})

// Type-safe variant selection — returns a merged StyleDefinition
const primaryBtn = button({ color: 'primary', size: 'lg' })   // primary + large
const dangerBtn = button({ color: 'danger' })                  // danger + md (default)
const defaultBtn = button()                                     // primary + md (both defaults)`}</code></pre>

      <h2 className={sectionHeading}>How Variants Are Merged</h2>
      <p className={paragraph}>
        The recipe engine deep-merges the base style with each selected variant.
        Later properties override earlier ones — variants override base, compound
        variants override everything:
      </p>

      <pre className={codeBlock}><code className="language-text">{`button({ color: 'secondary', size: 'lg' })

Merge order:
  1. base:      { padding: '8px 16px', borderRadius: 8, fontWeight: '600', ... }
  2. color:     { background: 'transparent', color: '#6366f1', border: '1px solid #6366f1' }
  3. size:      { fontSize: 16, padding: '12px 24px' }

Result:
  {
    padding: '12px 24px',        // ← overridden by size.lg
    borderRadius: 8,              // ← from base
    fontWeight: '600',            // ← from base
    fontSize: 16,                 // ← from size.lg
    background: 'transparent',    // ← from color.secondary
    color: '#6366f1',             // ← from color.secondary
    border: '1px solid #6366f1',  // ← from color.secondary
    cursor: 'pointer',            // ← from base
    transition: 'all 0.2s ease'   // ← from base
  }`}</code></pre>

      <h2 className={sectionHeading}>Compound Variants</h2>
      <p className={paragraph}>
        Compound variants apply when specific combinations of variants are active.
        They override both base and individual variant styles:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`export const button = recipe({
  base: chain().box({ padding: '8px 16px', borderRadius: 8 }).$el('btn'),
  
  variants: {
    color: {
      primary: chain().background({ color: '#6366f1' }).$el(),
      ghost: chain().background({ color: 'transparent' }).$el(),
    },
    outlined: {
      true: chain().box({ border: '1px solid currentColor' }).$el(),
      false: chain().$el(),
    },
  },
  
  // These only apply when BOTH conditions match
  compoundVariants: [
    {
      variants: { color: 'ghost', outlined: true },
      style: chain()
        .box({ border: '2px solid #6366f1' })
        .background({ color: 'rgba(99,102,241,0.08)' })
        .$el()
    },
    {
      variants: { color: 'primary', outlined: false },
      style: chain()
        .shadow({ box: '0 4px 12px rgba(99,102,241,0.3)' })
        .$el()
    }
  ],

  defaultVariants: { color: 'primary', outlined: false },
})

// ghost + outlined → compound variant #1 applies (2px border + tinted bg)
button({ color: 'ghost', outlined: true })

// primary + outlined=false → compound variant #2 applies (shadow)
button({ color: 'primary', outlined: false })

// ghost + outlined=false → no compound match, just base + variants
button({ color: 'ghost', outlined: false })`}</code></pre>

      <h2 className={sectionHeading}>Generating All Variants</h2>
      <p className={paragraph}>
        Recipes can enumerate every possible variant combination — useful for
        component galleries, visual regression testing, and static site generation:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Get all variant combinations (cartesian product)
const allVariants = button.getAllVariants()
// [
//   { color: 'primary', size: 'sm' },
//   { color: 'primary', size: 'md' },
//   { color: 'primary', size: 'lg' },
//   { color: 'secondary', size: 'sm' },
//   { color: 'secondary', size: 'md' },
//   { color: 'secondary', size: 'lg' },
//   { color: 'danger', size: 'sm' },
//   { color: 'danger', size: 'md' },
//   { color: 'danger', size: 'lg' },
// ]

// Compile all variants at once (build time)
const allCSS = button.compileAll()

// Get class names for every variant
const classNames = button.getVariantClassNames()
// {
//   'color-primary_size-sm': 'chain-btn-primary-sm',
//   'color-primary_size-md': 'chain-btn-primary-md',
//   ...
// }`}</code></pre>

      <h2 className={sectionHeading}>Lazy Variants (Functions)</h2>
      <p className={paragraph}>
        Variant styles can be functions — useful when styles depend on tokens
        or need to be computed:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`export const card = recipe({
  base: chain().box({ borderRadius: 12, overflow: 'hidden' }).$el('card'),
  
  variants: {
    elevation: {
      flat: () => chain().shadow({ box: 'none' }).$el(),
      raised: () => chain().shadow({ box: '$shadows.sm' }).$el(),
      floating: () => chain().shadow({ box: '$shadows.lg' }).$el(),
    },
  },
})

// Functions are called at variant selection time
// Token references ($shadows.sm) resolve at build time`}</code></pre>

      <h2 className={sectionHeading}>Recipe API Reference</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Method</th>
            <th className={docTh}>Returns</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['recipe(options)', 'Recipe function', 'Create a recipe with base, variants, defaults, and compound variants'],
            ['recipe(selection)', 'StyleDefinition', 'Select variants and get a merged style definition'],
            ['.getAllVariants()', 'VariantSelection[]', 'Get all possible variant combinations (cartesian product)'],
            ['.compileAll()', 'string (CSS)', 'Compile all variant combinations to CSS at build time'],
            ['.getVariantClassNames()', 'Record<string, string>', 'Get className for every variant combination'],
            ['.variants', 'TVariants', 'The original variant definitions (read-only)'],
            ['.defaultVariants', 'Partial<TVariants>', 'The default variant selections (read-only)'],
            ['.base', 'StyleDefinition', 'The base style definition (read-only)'],
          ].map(([method, returns, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{method}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{returns}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Build-time only:</strong> Recipes compile to static CSS at build time.
        All variant combinations are known ahead of time — the cartesian product
        has a hard limit of 1,000 combinations to prevent accidental explosion.
        For truly dynamic values (props, state, theme context), use{' '}
        <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> with{' '}
        <code className={inlineCode}>chain.dynamic()</code>.
      </div>
    </>
  );
}