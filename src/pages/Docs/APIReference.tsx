import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const shorthandMethods = [
  { method: '.box(options)', desc: 'Margin, padding, border, dimensions, overflow', example: '.box({ padding: 24, borderRadius: 8, width: "100%" })' },
  { method: '.typography(options)', desc: 'Font, text, color, opacity', example: '.typography({ fontSize: 16, fontWeight: "600", color: "#333" })' },
  { method: '.flex(options)', desc: 'Flexbox container + item properties', example: '.flex({ direction: "column", align: "center", gap: 16 })' },
  { method: '.grid(options)', desc: 'CSS Grid container + item properties', example: '.grid({ columns: "1fr 1fr", gap: 24 })' },
  { method: '.background(options)', desc: 'Background color, image, position, size', example: '.background({ color: "#fff", size: "cover" })' },
  { method: '.position(options)', desc: 'Position, top/right/bottom/left, z-index', example: '.position({ type: "absolute", top: 0, zIndex: 10 })' },
  { method: '.shadow(options)', desc: 'Box-shadow and text-shadow', example: '.shadow({ y: 4, blur: 12, color: "rgba(0,0,0,0.1)" })' },
  { method: '.animation(options)', desc: 'Animation name, duration, timing, delay', example: '.animation({ name: "fadeIn", duration: "0.3s" })' },
  { method: '.transform(options)', desc: 'Translate, scale, rotate, skew', example: '.transform({ scale: 1.05, rotate: "2deg" })' },
  { method: '.transition(options)', desc: 'Transition property, duration, timing', example: '.transition({ tr: "all 0.2s ease" })' },
  { method: '.filter(options)', desc: 'CSS filters: blur, brightness, contrast', example: '.filter({ blur: 4, brightness: 1.1 })' },
  { method: '.containerQuery(options)', desc: 'Container-type and container-name', example: '.containerQuery({ type: "inline-size" })' },
  { method: '.outline(options)', desc: 'Outline width, style, color, offset', example: '.outline({ width: 2, color: "blue" })' },
  { method: '.scroll(options)', desc: 'Scroll behavior, snap, margin, padding', example: '.scroll({ behavior: "smooth" })' },
  { method: '.list(options)', desc: 'List style type, position, image', example: '.list({ style: "none" })' },
  { method: '.raw(prop, value)', desc: 'Any CSS property not covered above', example: '.raw({ cursor: "pointer", resize: "vertical" })' },
];

const pseudoClasses = [
  { method: '.hover() … .end()', css: '&:hover' },
  { method: '.focus() … .end()', css: '&:focus' },
  { method: '.active() … .end()', css: '&:active' },
  { method: '.checked() … .end()', css: '&:checked' },
  { method: '.disabled() … .end()', css: '&:disabled' },
  { method: '.before() … .end()', css: '&::before' },
  { method: '.after() … .end()', css: '&::after' },
  { method: '.placeholder() … .end()', css: '&::placeholder' },
];

const atRules = [
  { method: '.media(query, fn)', desc: 'Wrap styles in @media query' },
  { method: '.supports(condition, fn)', desc: 'Wrap styles in @supports' },
  { method: '.container(query, fn)', desc: 'Wrap styles in @container' },
  { method: '.layer(name, fn)', desc: 'Wrap styles in @layer' },
  { method: '.nest(selector, fn)', desc: 'Nest child selector styles' },
  { method: '.children(fn)', desc: 'Target direct children (& > *)' },
  { method: '.keyframes(name, steps)', desc: 'Define @keyframes animation' },
  { method: '.when(condition, fn)', desc: 'Conditionally apply styles' },
];

export default function APIReference() {
  return (
    <>
      <h1 className={contentTitle}>API Reference</h1>
      <p className={contentDesc}>
        Complete reference of all ChainCSS shorthand methods, pseudo-classes, at-rules, and terminal methods.
      </p>

      <h2 className={sectionHeading}>Core API</h2>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

// Static mode — zero runtime
const styles = chain()
  .box({ padding: 24, borderRadius: 8 })
  .typography({ fontSize: 16, color: '#333' })
  .hover()
    .background({ color: '#f0f0f0' })
    .transform({ scale: 1.02 })
  .end()
  .media('(max-width: 640px)', (c) => c
    .box({ padding: 16 })
  )
  .$el('my-component')

// Dynamic mode — static CSS + runtime CSS vars
const dynamic = chain.dynamic()
  .box({ padding: '12px 24px', borderRadius: 8 })
  .background({ color: (ctx) => ctx.isActive ? '#6366f1' : '#e0e0e0' })
  .typography({ color: (ctx) => ctx.isActive ? '#fff' : '#333' })
  .$el('btn-dynamic')`}</pre>

      <h2 className={sectionHeading}>Structured Shorthand Methods</h2>
      <p className={paragraph}>
        Group related CSS properties into single, typed calls. Every property accepts <code className={inlineCode}>T | (() =&gt; T)</code> for mixed static/dynamic values.
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Covers</th><th className={docTh}>Example</th></tr></thead>
          <tbody>
            {shorthandMethods.map(s => (
              <tr key={s.method}>
                <td className={docTd}><code className={inlineCode}>{s.method}</code></td>
                <td className={docTd}>{s.desc}</td>
                <td className={docTd}><code className={inlineCode}>{s.example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>Short aliases:</strong> Most methods support shorter property names:{' '}
        <code className={inlineCode}>.box({'p: 24, m: 16, w: "100%"'})</code>,{' '}
        <code className={inlineCode}>.typography({'fs: 16, fw: "600", c: "#333"'})</code>,{' '}
        <code className={inlineCode}>.flex({'d: "col", ai: "center", g: 16'})</code>.
      </div>

      <h2 className={sectionHeading}>Pseudo-Classes</h2>
      <p className={paragraph}>
        Start a pseudo-class block, add styles, then call <code className={inlineCode}>.end()</code> to close.
        Pseudo-classes can be chained: <code className={inlineCode}>.hover().focus().end().end()</code>.
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

      <h2 className={sectionHeading}>Dynamic&lt;T&gt; — Mixed Mode Per-Property</h2>
      <p className={paragraph}>
        Every property in every shorthand accepts either a static value or a function.
        Functions receive context from <code className={inlineCode}>useChainStyles</code> and return values applied as CSS custom properties.
      </p>
      <pre className={codeBlock}>{`// Static values → compiled to CSS at build time
chain().box({ padding: 24, borderRadius: 8 }).$el('static')

// Dynamic values → CSS custom properties at runtime
chain.dynamic()
  .box({
    padding: 24,                                    // static
    borderRadius: 8,                                // static
    background: (ctx) => ctx.dark ? '#333' : '#fff' // dynamic!
  })
  .typography({
    fontSize: 16,                                   // static
    color: (ctx) => ctx.dark ? '#fff' : '#000'      // dynamic!
  })
  .$el('mixed')`}</pre>

      <h2 className={sectionHeading}>Terminal Methods</h2>
      <p className={paragraph}>
        These methods finalize the style definition and return a result:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Returns</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            <tr>
              <td className={docTd}><code className={inlineCode}>.$el('name')</code></td>
              <td className={docTd}>StyleDefinition</td>
              <td className={docTd}>Set selector and finalize. Class gets <code className={inlineCode}>chain-</code> prefix.</td>
            </tr>
            <tr>
              <td className={docTd}><code className={inlineCode}>.$el()</code></td>
              <td className={docTd}>StyleDefinition</td>
              <td className={docTd}>Finalize without selector (class generated from export name).</td>
            </tr>
            <tr>
              <td className={docTd}><code className={inlineCode}>.build(['.custom'])</code></td>
              <td className={docTd}>StyleDefinition</td>
              <td className={docTd}>Build with explicit selectors array.</td>
            </tr>
            <tr>
              <td className={docTd}><code className={inlineCode}>.explain()</code></td>
              <td className={docTd}>Explanation</td>
              <td className={docTd}>Debug: show how each property was resolved.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}