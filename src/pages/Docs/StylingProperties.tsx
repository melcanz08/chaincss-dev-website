import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const structuredShorthands = [
  ['Flexbox', '.flex()', 'display, flex-direction, align-items, justify-content, gap, grow, shrink, wrap, basis', '.flex({ direction: "column", align: "center", gap: 16 })'],
  ['Grid', '.grid()', 'display, grid-template-columns/rows, gap, grid-area, auto-flow', '.grid({ columns: "1fr 1fr", gap: 24 })'],
  ['Box Model', '.box()', 'margin, padding, border, border-radius, width, height, min/max, overflow', '.box({ padding: 24, margin: "0 auto", maxWidth: 1200 })'],
  ['Typography', '.typography()', 'font-family/size/weight/style, line-height, letter-spacing, text-align, color', '.typography({ fontSize: 16, fontWeight: "600", color: "#333" })'],
  ['Background', '.background()', 'background-color/image/position/size/repeat/attachment', '.background({ color: "#fff", size: "cover" })'],
  ['Position', '.position()', 'position, top/right/bottom/left, z-index', '.position({ type: "absolute", top: 0, zIndex: 10 })'],
  ['Animation', '.animation()', 'animation-name/duration/timing/delay/iteration/direction', '.animation({ name: "fadeIn", duration: "300ms", timing: "ease" })'],
  ['Transform', '.transform()', 'translate, scale, rotate, skew, origin, custom', '.transform({ scale: 1.1, custom: "translateY(-2px)" })'],
  ['Shadow', '.shadow()', 'box-shadow (x/y/blur/spread/color/inset), text-shadow', '.shadow({ y: 4, blur: 12, color: "rgba(0,0,0,0.1)" })'],
  ['Filter', '.filter()', 'blur, brightness, contrast, grayscale, invert, saturate, backdrop-filter', '.filter({ blur: 5, brightness: 1.1 })'],
  ['Outline', '.outline()', 'outline-width/style/color/offset', '.outline({ width: "2px", style: "solid", color: "#6366f1" })'],
  ['Scroll', '.scroll()', 'scroll-behavior, scroll-snap-*, scroll-margin/padding, scrollbar', '.scroll({ behavior: "smooth", snapType: "x mandatory" })'],
  ['List', '.list()', 'list-style-type/position/image', '.list({ style: "none" })'],
  ['Transition', '.transition()', 'transition-property/duration/timing/delay', '.transition({ property: "all", duration: "200ms", timing: "ease" })'],
  ['Raw (escape hatch)', '.raw()', 'Any CSS property', '.raw({ cursor: "pointer", resize: "vertical" })'],
];

const flatProperties = [
  ['Layout','display','display','flex, grid, block, inline, none'],
  ['','position','position','relative, absolute, fixed, sticky'],
  ['','top / right / bottom / left','top / right / bottom / left','0, 50%, auto'],
  ['','zIndex','z-index','10, 100, 999'],
  ['Spacing','padding / p','padding','p(16) or padding("8px 16px")'],
  ['','margin / m','margin','m(8) or margin("0 auto")'],
  ['Sizing','width / w','width','w(200) or width("100%")'],
  ['','height / h','height','h(48) or height("100vh")'],
  ['','minWidth / maxWidth','min/max-width','minW(320), maxW(1200)'],
  ['Typography','fontSize / fs','font-size','fs(16) → 16px'],
  ['','fontWeight / fw','font-weight','fw(600)'],
  ['','fontFamily / ff','font-family','ff("Inter, sans-serif")'],
  ['','lineHeight / lh','line-height','lh(1.5)'],
  ['','textAlign / ta','text-align','center, left, right'],
  ['','color / c','color','#hex, rgb(), named'],
  ['Visual','background / bg','background','bg("#6366f1")'],
  ['','borderRadius / rounded','border-radius','rounded(8)'],
  ['','boxShadow / shadow','box-shadow','shadow("0 4px 12px ...")'],
  ['','opacity','opacity','0.5, 1'],
  ['','border','border','"1px solid #e2e8f0"'],
  ['Effects','transition','transition','"all 0.2s ease"'],
  ['','transform','transform','"scale(1.05)"'],
  ['','filter','filter','"blur(4px)"'],
];

export default function StylingProperties() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Styling API Reference</h1>
      <p className={contentDesc}>
        ChainCSS offers two ways to write styles: structured shorthands for grouped properties, 
        and flat methods for individual CSS properties. Both compile to the same zero-runtime CSS.
      </p>

      <h2 className={sectionHeading}>Structured Shorthands</h2>
      <p className={paragraph}>
        Group related CSS properties into single, typed calls with full autocomplete and short aliases:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ d: 'col', ai: 'center', g: 16 })
  .box({ p: 24, m: '0 auto', w: '100%' })
  .typography({ fs: 16, fw: '600', c: '#333' })
  .$el('card')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Method</th><th className={docTh}>CSS Properties</th><th className={docTh}>Example</th></tr></thead>
          <tbody>{structuredShorthands.map(([cat, method, css, ex], i) => (
            <tr key={i}><td className={docTd}>{cat}</td><td className={docTd}><code className={inlineCode}>{method}</code></td><td className={docTd} style={{ fontSize: 12 }}>{css}</td><td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{ex}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Flat CSS Properties</h2>
      <p className={paragraph}>
        All standard CSS properties are available as chainable methods. Numeric values auto-add <code className={inlineCode}>px</code> where appropriate:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Method</th><th className={docTh}>CSS</th><th className={docTh}>Example</th></tr></thead>
          <tbody>{flatProperties.map(([cat, method, css, ex], i) => (
            <tr key={i}><td className={docTd}>{cat}</td><td className={docTd}><code className={inlineCode}>{method}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{ex}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Mix and match:</strong> Use structured shorthands for readability, flat methods for one-off properties. 
        They're fully interoperable.
      </div>
    </>
  );
}