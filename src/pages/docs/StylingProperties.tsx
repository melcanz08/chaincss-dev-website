import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const structuredShorthands = [
  ['Flexbox', '.flex()', 'display:flex, flex-direction, align-items, justify-content, gap, grow, shrink, wrap, basis, align-content, align-self', '.flex({ direction: "column", align: "center", gap: 16 })'],
  ['Grid', '.grid()', 'display:grid, grid-template-columns/rows, gap, area, auto-flow, auto-columns/rows, template', '.grid({ columns: "1fr 1fr", gap: 24 })'],
  ['Box Model', '.box()', 'margin/padding (all sides), border, border-radius, border-width/color/style, width, height, min/max, overflow', '.box({ padding: 24, margin: "0 auto", maxWidth: 1200 })'],
  ['Typography', '.typography()', 'font-family/size/weight/style, line-height, letter-spacing, text-align/transform/decoration/indent, word-spacing/break, white-space, color, opacity', '.typography({ fontSize: 16, fontWeight: "600", color: "#333" })'],
  ['Background', '.background()', 'background-color/image/position/size/repeat/attachment/clip/origin/blend-mode', '.background({ color: "#fff", size: "cover" })'],
  ['Position', '.position()', 'position, top/right/bottom/left, inset, z-index', '.position({ type: "absolute", top: 0, zIndex: 10 })'],
  ['Animation', '.animation()', 'animation-name/duration/timing/delay/iteration-count/direction/fill-mode/play-state', '.animation({ name: "fadeIn", duration: "300ms", timing: "ease" })'],
  ['Transform', '.transform()', 'translate/translateX/Y/Z, scale/scaleX/Y, rotate, skew/skewX/Y, origin, custom', '.transform({ x: 10, y: 20, rotate: 45 })'],
  ['Shadow', '.shadow()', 'box-shadow (x/y/blur/spread/color/inset), text-shadow', '.shadow({ y: 4, blur: 12, color: "rgba(0,0,0,0.1)" })'],
  ['Filter', '.filter()', 'blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, sepia, drop-shadow, backdrop, custom', '.filter({ blur: 5, brightness: 1.1 })'],
  ['Transition', '.transition()', 'transition-property/duration/timing/delay/behavior', '.transition({ tr: "all 0.2s ease" })'],
  ['Container Query', '.containerQuery()', 'container-type, container-name', '.containerQuery({ type: "inline-size", name: "card" })'],
  ['Outline', '.outline()', 'outline-width/style/color/offset', '.outline({ width: 2, color: "#6366f1" })'],
  ['Scroll', '.scroll()', 'scroll-behavior, scroll-snap-*, scroll-margin/padding, scrollbar-width/color, overflow-x/y', '.scroll({ behavior: "smooth", snapType: "x mandatory" })'],
  ['List', '.list()', 'list-style-type/position/image', '.list({ style: "none" })'],
  ['Raw (escape hatch)', '.raw()', 'Any CSS property not covered above — single prop or object of props', '.raw("cursor", "pointer") or .raw({ cursor: "pointer", resize: "vertical" })'],
];

const shortAliases = [
  ['Flex', 'd= direction, ai= align, jc= justify, g= gap, gr= grow, sh= shrink, b= basis, w= wrap, ac= alignContent, as= alignSelf, f= flex'],
  ['Grid', 'c= columns, r= rows, g= gap, a= area, af= autoFlow, ac= autoColumns, ar= autoRows'],
  ['Box', 'p= padding, m= margin, w= width, h= height, br= borderRadius, mw= maxWidth, mh= maxHeight'],
  ['Typography', 'fs= fontSize, fw= fontWeight, ff= fontFamily, lh= lineHeight, ta= textAlign, tt= textTransform, td= textDecoration, c= color, f= font'],
  ['Background', 'c= color, i= image, p= position, s= size, r= repeat, bg= background'],
  ['Position', 't= type, z= zIndex'],
  ['Animation', 'n= name, d= duration, t= timing, dl= delay, i= iterationCount, a= animation'],
  ['Transition', 'p= property, d= duration, t= timing, dl= delay, tr= transition'],
  ['Shadow', 'x, y, blur, spread, color, inset, box, text'],
  ['Filter', 'blur, brightness, contrast, grayscale, hueRotate, invert, filterOpacity, saturate, sepia, dropShadow, backdrop, custom'],
  ['Outline', 'w= width, s= style, c= color, o= outline, offset'],
  ['Scroll', 'b= behavior, overflowX, overflowY'],
];

export default function StylingProperties() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Styling API Reference</h1>
      <p className={contentDesc}>
        ChainCSS offers 16 structured shorthand methods that group related CSS properties
        into single, typed calls with full autocomplete. Every property supports static values
        and <code className={inlineCode}>Dynamic&lt;T&gt;</code> functions for mixed mode.
      </p>

      <h2 className={sectionHeading}>Structured Shorthand Methods</h2>
      <p className={paragraph}>
        Each method accepts an options object. Properties are auto-completed by TypeScript.
        Numeric values automatically receive <code className={inlineCode}>px</code> units where appropriate.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ direction: 'column', align: 'center', gap: 16 })
  .box({ padding: 24, margin: '0 auto', maxWidth: 1200 })
  .typography({ fontSize: 16, fontWeight: '600', color: '#333' })
  .background({ color: '#fff' })
  .hover()
    .background({ color: '#f0f0f0' })
    .transform({ scale: 1.02 })
  .end()
  .$el('card')`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Method</th><th className={docTh}>CSS Properties</th><th className={docTh}>Example</th></tr></thead>
          <tbody>{structuredShorthands.map(([cat, method, css, ex], i) => (
            <tr key={i}><td className={docTd}>{cat}</td><td className={docTd}><code className={inlineCode}>{method}</code></td><td className={docTd} style={{ fontSize: 12 }}>{css}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{ex}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Short Aliases</h2>
      <p className={paragraph}>
        Every shorthand method supports short property names for power users.
        Aliases are checked first — if a property isn't an alias, it's passed through as-is:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ d: 'col', ai: 'center', g: 16 })
  .box({ p: 24, m: '0 auto', w: '100%' })
  .typography({ fs: 16, fw: '600', c: '#333' })
  .$el('card')`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Aliases</th></tr></thead>
          <tbody>{shortAliases.map(([method, aliases], i) => (
            <tr key={i}><td className={docTd}><code className={inlineCode}>.{method.toLowerCase()}()</code></td><td className={docTd} style={{ fontSize: 12 }}>{aliases}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Pseudo-Classes & States</h2>
      <p className={paragraph}>
        ChainCSS supports 8 pseudo-class methods. Each opens a new style context —
        all subsequent method calls apply to that pseudo-class until <code className={inlineCode}>.end()</code> is called:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover()                          // opens :hover context
    .background({ color: '#4f46e5' })
    .transform({ custom: 'scale(1.02)' })
  .end()                            // closes :hover
  .focus()                          // opens :focus context
    .outline({ width: 2, color: '#818cf8' })
  .end()
  .$el('btn')

// Available: .hover() .focus() .active() .checked() 
//           .disabled() .before() .after() .placeholder()`}</code></pre>

      <h2 className={sectionHeading}>At-Rules & Nesting</h2>
      <p className={paragraph}>
        Media queries, container queries, and nested selectors use callback-based APIs.
        The callback receives a child chain that compiles within the at-rule's scope:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .box({ padding: 16 })
  .media('(max-width: 768px)', (c) => c    // @media query
    .box({ padding: 12 })
  )
  .container('(min-width: 400px)', (c) => c // @container query
    .flex({ direction: 'row' })
  )
  .nest('& .icon', (c) => c                 // nested selector
    .box({ width: 24, height: 24 })
  )
  .children((c) => c                        // & > * shorthand
    .box({ marginBottom: 8 })
  )
  .$el('responsive-card')`}</code></pre>

            <h2 className={sectionHeading}>Style Composition with .extend()</h2>
      <p className={paragraph}>
        Compose styles by inheriting from a base style definition. Properties from the
        base are merged first, then overridden by the extending chain. More flexible than
        recipes for one-off variants, simpler than copy-paste:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Build a base style (use .build() to get a reusable StyleObject)
const baseBtn = chain()
  .box({ p: '8px 16px', br: 8 })
  .typography({ fw: '600' })
  .transition({ tr: 'all 0.2s ease' })
  .build()

// Extend it — base properties are inherited, new ones override
const primaryBtn = chain()
  .extend(baseBtn)
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .hover(c => c.background({ color: '#4f46e5' }))
  .$el('btn-primary')

const secondaryBtn = chain()
  .extend(baseBtn)
  .background({ color: 'transparent' })
  .typography({ color: '#6366f1' })
  .box({ border: '1px solid #6366f1' })
  .$el('btn-secondary')`}</code></pre>

      <p className={paragraph}>
        <code className={inlineCode}>.extend()</code> works with pseudo-classes, at-rules,
        and nested rules from the base style. For complex multi-variant components,
        use <a href="/docs/recipes" style={{ color: '#818cf8' }}>Recipes</a> which offer
        type-safe variant selection and compound conditions.
      </p>

      <tr><td className={docTd}><code className={inlineCode}>.extend(styleDef)</code></td><td className={docTd}>StyleCollector</td><td className={docTd}>Inherit all properties from a base style definition.</td></tr>

      <h2 className={sectionHeading}>The .raw() Escape Hatch</h2>
      <p className={paragraph}>
        For CSS properties not covered by the 16 structured methods, use <code className={inlineCode}>.raw()</code>.
        It accepts either a property name + value or an object of properties:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`// Single property
chain().raw('cursor', 'pointer').raw('resize', 'vertical').$el('element')

// Object of properties
chain().raw({
  cursor: 'pointer',
  resize: 'vertical',
  WebkitAppearance: 'none',
  scrollBehavior: 'smooth',
}).$el('element')

// Mixed with structured methods
chain()
  .box({ padding: 24 })
  .raw({ cursor: 'pointer', userSelect: 'none' })
  .$el('card')`}</code></pre>

      <div className={note}>
        <strong>Dynamic&lt;T&gt;:</strong> Every property in every shorthand accepts either a static value{' '}
        or a function <code className={inlineCode}>(ctx) =&gt; value</code>. Functions receive context from{' '}
        <code className={inlineCode}>useChainStyles</code> and return values applied as CSS custom properties.
        See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for the full dynamic
        styling system and <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros (100+)</a> for
        higher-level abstractions built on these methods.
      </div>
    </>
  );
}