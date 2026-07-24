import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const structuredShorthands = [
  ['Flexbox', '.flex()', 'display:flex, flex-direction, align-items, justify-content, gap, grow, shrink, wrap, basis', '.flex({ direction: "column", align: "center", gap: 16 })'],
  ['Grid', '.grid()', 'display:grid, grid-template-columns/rows, gap, area, auto-flow', '.grid({ columns: "1fr 1fr", gap: 24 })'],
  ['Box Model', '.box()', 'margin, padding, border, border-radius, width, height, min/max, overflow', '.box({ padding: 24, margin: "0 auto", maxWidth: 1200 })'],
  ['Typography', '.typography()', 'font-family/size/weight/style, line-height, letter-spacing, text-align, color, opacity', '.typography({ fontSize: 16, fontWeight: "600", color: "#333" })'],
  ['Background', '.background()', 'background-color/image/position/size/repeat/attachment/clip/origin', '.background({ color: "#fff", size: "cover" })'],
  ['Position', '.position()', 'position, top/right/bottom/left, inset, z-index', '.position({ type: "absolute", top: 0, zIndex: 10 })'],
  ['Animation', '.animation()', 'animation-name/duration/timing/delay/iteration-count/direction/fill-mode', '.animation({ name: "fadeIn", duration: "300ms", timing: "ease" })'],
  ['Transform', '.transform()', 'translate/translateX/Y/Z, scale/scaleX/Y, rotate, skew/skewX/Y, origin, custom', '.transform({ scale: 1.1, custom: "translateY(-2px)" })'],
  ['Shadow', '.shadow()', 'box-shadow (x/y/blur/spread/color/inset), text-shadow', '.shadow({ y: 4, blur: 12, color: "rgba(0,0,0,0.1)" })'],
  ['Filter', '.filter()', 'blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia, drop-shadow, backdrop', '.filter({ blur: 5, brightness: 1.1 })'],
  ['Transition', '.transition()', 'transition-property/duration/timing/delay/behavior', '.transition({ tr: "all 0.2s ease" })'],
  ['Container Query', '.containerQuery()', 'container-type, container-name', '.containerQuery({ type: "inline-size", name: "card" })'],
  ['Outline', '.outline()', 'outline-width/style/color/offset', '.outline({ width: 2, color: "#6366f1" })'],
  ['Scroll', '.scroll()', 'scroll-behavior, scroll-snap-*, scroll-margin/padding, scrollbar', '.scroll({ behavior: "smooth", snapType: "x mandatory" })'],
  ['List', '.list()', 'list-style-type/position/image', '.list({ style: "none" })'],
  ['Raw (escape hatch)', '.raw()', 'Any CSS property not covered above', '.raw({ cursor: "pointer", resize: "vertical" })'],
];

const shortAliases = [
  ['Flex', 'd= direction, ai= align, jc= justify, g= gap, gr= grow, sh= shrink, b= basis, w= wrap'],
  ['Grid', 'c= columns, r= rows, g= gap, a= area'],
  ['Box', 'p= padding, m= margin, w= width, h= height, br= borderRadius'],
  ['Typography', 'fs= fontSize, fw= fontWeight, ff= fontFamily, lh= lineHeight, ta= textAlign, c= color'],
  ['Background', 'c= color, i= image, p= position, s= size, r= repeat, bg= background'],
  ['Position', 't= type, z= zIndex'],
  ['Animation', 'n= name, d= duration, t= timing, dl= delay, i= iterationCount'],
  ['Transition', 'p= property, d= duration, t= timing, tr= transition'],
  ['Shadow', 'x, y, blur, spread, color, inset, box, text'],
  ['Filter', 'custom, backdrop'],
  ['Outline', 'w= width, s= style, c= color, o= outline'],
];

export default function StylingProperties() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Styling API Reference</h1>
      <p className={contentDesc}>
        ChainCSS offers structured shorthand methods that group related CSS properties
        into single, typed calls with full autocomplete.
      </p>

      <h2 className={sectionHeading}>Structured Shorthand Methods</h2>
      <p className={paragraph}>
        Each method accepts an options object. Every property supports static values
        and <code className={inlineCode}>Dynamic&lt;T&gt;</code> functions for mixed mode.
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
        Every shorthand method supports short property names for power users:
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

      <div className={note}>
        <strong>Dynamic&lt;T&gt;:</strong> Every property in every shorthand accepts either a static value{' '}
        or a function <code className={inlineCode}>(ctx) =&gt; value</code>. Functions receive context from{' '}
        <code className={inlineCode}>useChainStyles</code> and return values applied as CSS custom properties.
      </div>
    </>
  );
}