import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const properties = [
  { method: '.bg(val)', css: 'background' },
  { method: '.color(val)', css: 'color' },
  { method: '.fs(val)', css: 'font-size' },
  { method: '.fw(val)', css: 'font-weight' },
  { method: '.ff(val)', css: 'font-family' },
  { method: '.lh(val)', css: 'line-height' },
  { method: '.ta(val)', css: 'text-align' },
  { method: '.p(val)', css: 'padding' },
  { method: '.pt(val)', css: 'padding-top' },
  { method: '.pr(val)', css: 'padding-right' },
  { method: '.pb(val)', css: 'padding-bottom' },
  { method: '.pl(val)', css: 'padding-left' },
  { method: '.m(val)', css: 'margin' },
  { method: '.mt(val)', css: 'margin-top' },
  { method: '.mr(val)', css: 'margin-right' },
  { method: '.mb(val)', css: 'margin-bottom' },
  { method: '.ml(val)', css: 'margin-left' },
  { method: '.w(val)', css: 'width' },
  { method: '.h(val)', css: 'height' },
  { method: '.minW(val)', css: 'min-width' },
  { method: '.maxW(val)', css: 'max-width' },
  { method: '.minH(val)', css: 'min-height' },
  { method: '.maxH(val)', css: 'max-height' },
  { method: '.rounded(val)', css: 'border-radius' },
  { method: '.border(val)', css: 'border' },
  { method: '.shadow(val)', css: 'box-shadow' },
  { method: '.opacity(val)', css: 'opacity' },
  { method: '.cursor(val)', css: 'cursor' },
  { method: '.overflow(val)', css: 'overflow' },
  { method: '.z(val)', css: 'z-index' },
  { method: '.pos(val)', css: 'position' },
  { method: '.top(val)', css: 'top' },
  { method: '.right(val)', css: 'right' },
  { method: '.bottom(val)', css: 'bottom' },
  { method: '.left(val)', css: 'left' },
  { method: '.transition(val)', css: 'transition' },
  { method: '.transform(val)', css: 'transform' },
  { method: '.display(val)', css: 'display' },
  { method: '.gap(val)', css: 'gap' },
  { method: '.flexDirection(val)', css: 'flex-direction' },
  { method: '.alignItems(val)', css: 'align-items' },
  { method: '.justifyContent(val)', css: 'justify-content' },
  { method: '.flexWrap(val)', css: 'flex-wrap' },
];

const pseudoClasses = [
  { method: '.hover()', css: ':hover' },
  { method: '.focus()', css: ':focus' },
  { method: '.active()', css: ':active' },
  { method: '.checked()', css: ':checked' },
  { method: '.disabled()', css: ':disabled' },
  { method: '.before()', css: '::before' },
  { method: '.after()', css: '::after' },
  { method: '.placeholder()', css: '::placeholder' },
];

const atRules = [
  { method: '.media(query, fn)', desc: 'Wrap styles in @media query' },
  { method: '.supports(condition, fn)', desc: 'Wrap styles in @supports' },
  { method: '.container(query, fn)', desc: 'Wrap styles in @container' },
  { method: '.layer(name, fn)', desc: 'Wrap styles in @layer' },
  { method: '.nest(selector, fn)', desc: 'Nest child selector styles' },
  { method: '.keyframes(name, steps)', desc: 'Define @keyframes animation' },
  { method: '.when(condition, fn)', desc: 'Conditionally apply styles' },
];

export default function APIReference() {
  return (
    <>
      <h1 className={contentTitle}>API Reference</h1>
      <p className={contentDesc}>
        Complete reference of all ChainCSS methods, pseudo-classes, at-rules, and utilities.
      </p>

      <h2 className={sectionHeading}>Core API</h2>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

// Static mode (zero runtime)
const styles = chain()
  .property(value)    // Set any CSS property
  .shorthand(value)   // Use shorthand aliases
  .macro()            // Apply layout macros
  .pseudo()           // Start pseudo-class block
  .end()              // End pseudo-class block
  .$el('name')        // Set selector and build

// Dynamic mode (mixed static + runtime)
const dynamic = chain.dynamic()
  .bg('#6366f1')                 // → static CSS
  .opacity(() => isActive ? 1 : 0.5)  // → runtime JS
  .$el('btn-dynamic')`}</pre>

      <h2 className={sectionHeading}>All CSS Properties</h2>
      <p className={paragraph}>
        ChainCSS supports all standard CSS properties via camelCase methods.
        Numeric values automatically get <code className={inlineCode}>px</code> suffix (except unitless properties like opacity, z-index, font-weight).
      </p>
      <pre className={codeBlock}>{`chain()
  .backgroundColor('#fff')   // → background-color: #fff
  .fontSize(16)              // → font-size: 16px
  .borderRadius(8)           // → border-radius: 8px
  .boxShadow('0 2px 8px rgba(0,0,0,0.1)')
  .zIndex(10)                // unitless — no px added
  .opacity(0.5)              // unitless
  .$el('box')`}</pre>

      <h2 className={sectionHeading}>Shorthand Reference</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>CSS Property</th></tr></thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.method}>
                <td className={docTd}><code className={inlineCode}>{p.method}</code></td>
                <td className={docTd}><code className={inlineCode}>{p.css}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Pseudo-Classes</h2>
      <p className={paragraph}>
        Start a pseudo-class block with the method, add styles, then call <code className={inlineCode}>.end()</code> to close:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>CSS Selector</th></tr></thead>
          <tbody>
            {pseudoClasses.map(p => (
              <tr key={p.method}>
                <td className={docTd}><code className={inlineCode}>{p.method}</code></td>
                <td className={docTd}><code className={inlineCode}>{p.css}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>At-Rules & Nesting</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            {atRules.map(a => (
              <tr key={a.method}>
                <td className={docTd}><code className={inlineCode}>{a.method}</code></td>
                <td className={docTd}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Terminal Methods</h2>
      <p className={paragraph}>
        These methods finalize the style and return a result:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Returns</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><code className={inlineCode}>.$el('name')</code></td><td className={docTd}>StyleDefinition</td><td className={docTd}>Set selector and build. Class gets <code className={inlineCode}>chain-</code> prefix.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.build(['.custom'])</code></td><td className={docTd}>StyleDefinition</td><td className={docTd}>Build with explicit selectors.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.explain()</code></td><td className={docTd}>Explanation</td><td className={docTd}>Debug: show how each property was resolved.</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
