import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function AtRules() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>At-Rules & Nesting</h1>
      <p className={contentDesc}>
        Responsive breakpoints, feature queries, container queries, cascade layers,
        custom keyframes, font-face declarations, and nested selectors. All use
        callback-based APIs that compile within the at-rule's scope.
      </p>

      <h2 className={sectionHeading}>@media — Responsive Design</h2>
      <p className={paragraph}>
        The callback receives a child chain. All styles within the callback
        are scoped to the media query:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .flex({ direction: 'column' })
  .box({ padding: 16 })
  .media('(min-width: 768px)', (c) => c
    .flex({ direction: 'row', gap: 24 })
    .box({ padding: 24 })
  )
  .media('(max-width: 640px)', (c) => c
    .flex({ direction: 'column' })
    .box({ padding: 12 })
  )
  .$el('layout')`}</code></pre>

      <p className={paragraph}>
        Multiple <code className={inlineCode}>.media()</code> calls with the same query string
        are automatically merged by the rule builder — no duplicate <code className={inlineCode}>@media</code> blocks:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// These two calls produce ONE @media block
chain()
  .media('(max-width: 768px)', (c) => c.box({ padding: 16 }))
  .media('(max-width: 768px)', (c) => c.typography({ fontSize: 14 }))
  .$el('responsive')

// Output:
// @media (max-width: 768px) {
//   .chain-responsive { padding: 16px; font-size: 14px; }
// }`}</code></pre>

            <h2 className={sectionHeading}>Responsive Values (Media Query Shorthand)</h2>
      <p className={paragraph}>
        For the common case of changing a single property across breakpoints, use
        named responsive values instead of multiple <code className={inlineCode}>.media()</code> calls.
        Properties are automatically merged into shared <code className={inlineCode}>@media</code> blocks:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// Named breakpoints — explicit and self-documenting
chain()
  .box({ padding: { base: 16, md: 24, lg: 32 } })
  .typography({ fontSize: { base: 14, md: 16, lg: 18 } })
  .$el('container')

// Output — padding and font-size share the same @media blocks:
// .chain-container { padding: 16px; font-size: 14px; }
// @media (min-width: 768px) {
//   .chain-container { padding: 24px; font-size: 16px; }
// }
// @media (min-width: 1024px) {
//   .chain-container { padding: 32px; font-size: 18px; }
// }

// Any subset of breakpoints works:
chain()
  .box({ padding: { base: 16, lg: 32 } })  // skip md
  .$el('container')`}</code></pre>

      <p className={paragraph}>
        Available breakpoint keys: <code className={inlineCode}>base</code>,{' '}
        <code className={inlineCode}>sm</code>, <code className={inlineCode}>md</code>,{' '}
        <code className={inlineCode}>lg</code>, <code className={inlineCode}>xl</code>,{' '}
        <code className={inlineCode}>2xl</code>, <code className={inlineCode}>mobile</code>,{' '}
        <code className={inlineCode}>tablet</code>, <code className={inlineCode}>desktop</code>.
        Custom breakpoints defined in your config are also supported.
        Use <code className={inlineCode}>.media()</code> for complex cases where you need to
        change multiple properties or add nested rules within a breakpoint.
      </p>

      <h2 className={sectionHeading}>@supports — Feature Queries</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .grid({ columns: '1fr' })
  .supports('(display: grid)', (c) => c
    .grid({ columns: '1fr 1fr', gap: 16 })
  )
  .$el('grid-layout')

// Output:
// .chain-grid-layout { grid-template-columns: 1fr; }
// @supports (display: grid) {
//   .chain-grid-layout { grid-template-columns: 1fr 1fr; gap: 16px; }
// }`}</code></pre>

      <h2 className={sectionHeading}>@container — Container Queries</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .containerQuery({ type: 'inline-size', name: 'card' })
  .container('(min-width: 400px)', (c) => c
    .flex({ direction: 'row' })
  )
  .$el('card')

// Output:
// .chain-card { container-type: inline-size; container-name: card; }
// @container (min-width: 400px) {
//   .chain-card { display: flex; flex-direction: row; }
// }`}</code></pre>

      <h2 className={sectionHeading}>@layer — Cascade Layers</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .layer('components', (c) => c
    .box({ padding: 24, borderRadius: 8 })
    .background({ color: '#ffffff' })
  )
  .$el('layered-card')

// Output:
// @layer components {
//   .chain-layered-card { padding: 24px; border-radius: 8px; background-color: #ffffff; }
// }`}</code></pre>

      <h2 className={sectionHeading}>@keyframes — Custom Animations</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .keyframes('slideIn', {
    '0%': { transform: 'translateX(-20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  })
  .animation({ name: 'slideIn', duration: '0.3s', timing: 'ease' })
  .$el('animated')

// Output:
// @keyframes slideIn {
//   0% { transform: translateX(-20px); opacity: 0; }
//   100% { transform: translateX(0); opacity: 1; }
// }
// .chain-animated { animation: slideIn 0.3s ease; }`}</code></pre>

      <p className={paragraph}>
        Keyframes with the same name are merged, not duplicated. If you call{' '}
        <code className={inlineCode}>.keyframes('slideIn', ...)</code> multiple times with
        different steps, they're combined into a single <code className={inlineCode}>@keyframes</code> block.
      </p>

      <h2 className={sectionHeading}>@font-face — Custom Fonts</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .fontFace({
    fontFamily: 'MyCustomFont',
    src: "url('/fonts/MyCustomFont.woff2') format('woff2')",
    fontWeight: '400',
    fontStyle: 'normal',
    fontDisplay: 'swap'
  })
  .typography({ fontFamily: "'MyCustomFont', sans-serif" })
  .$el('custom-font')

// Output:
// @font-face {
//   font-family: 'MyCustomFont';
//   src: url('/fonts/MyCustomFont.woff2') format('woff2');
//   font-weight: 400;
//   font-style: normal;
//   font-display: swap;
// }
// .chain-custom-font { font-family: 'MyCustomFont', sans-serif; }`}</code></pre>

      <h2 className={sectionHeading}>Nesting & Children</h2>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .nest('.child', (c) => c
    .typography({ color: 'blue', fontSize: 14 })
  )
  .nest('&[data-active="true"]', (c) => c
    .background({ color: '#e0e7ff' })
  )
  .children((c) => c                       // & > * shorthand
    .box({ marginBottom: 8 })
  )
  .$el('parent')

// Output:
// .chain-parent .child { color: blue; font-size: 14px; }
// .chain-parent[data-active="true"] { background-color: #e0e7ff; }
// .chain-parent > * { margin-bottom: 8px; }`}</code></pre>

      <h2 className={sectionHeading}>.when() — Conditional Styles</h2>
      <p className={paragraph}>
        Conditionally apply styles at build time. The condition is evaluated once
        during compilation — not at runtime:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`const isProduction = process.env.NODE_ENV === 'production'

chain()
  .box({ padding: 24 })
  .when(isProduction, (c) => c
    .box({ padding: 16 })     // override padding in production
  )
  .$el('conditional')`}</code></pre>

      <h2 className={sectionHeading}>All At-Rules & Nesting Methods</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Method</th>
            <th className={docTh}>CSS Output</th>
            <th className={docTh}>Deduplication</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{[
            ['.media(query, fn)', '@media query { ... }', 'Yes — same query merged', 'Responsive breakpoints'],
            ['Responsive values', '{ base: 16, md: 24, lg: 32 }', 'Yes — same breakpoint merged', 'Simple responsive properties'],
            ['.supports(cond, fn)', '@supports cond { ... }', 'Yes — same condition merged', 'Feature detection'],
            ['.container(query, fn)', '@container query { ... }', 'Yes — same query merged', 'Container queries'],
            ['.layer(name, fn)', '@layer name { ... }', 'Yes — same layer merged', 'Cascade layers'],
            ['.keyframes(name, steps)', '@keyframes name { ... }', 'Yes — same name merged', 'Custom animations'],
            ['.fontFace(properties)', '@font-face { ... }', 'No — appended as new block', 'Custom fonts'],
            ['.nest(selector, fn)', 'parent selector child', 'No — each unique selector kept', 'Child selectors'],
            ['.children(fn)', 'parent > *', 'No — each unique style kept', 'Direct children'],
            ['.when(condition, fn)', 'Conditional inclusion', 'N/A', 'Build-time toggles'],
          ].map(([m, css, dedup, use]) => (
            <tr key={m}>
              <td className={docTd}><code className={inlineCode}>{m}</code></td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{css}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{dedup}</td>
              <td className={docTd}>{use}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Automatic deduplication:</strong> Repeated <code className={inlineCode}>.media()</code>,{' '}
        <code className={inlineCode}>.supports()</code>, <code className={inlineCode}>.container()</code>,{' '}
        <code className={inlineCode}>.layer()</code>, and <code className={inlineCode}>.keyframes()</code>{' '}
        calls with the same identifier are merged into single blocks. Nested selectors and
        font-face declarations are kept separate since they target different elements.
        See <a href="/docs/pseudo-classes" style={{ color: '#818cf8' }}>Pseudo-Classes</a> for
        interactive states and <a href="/docs/compiler/scroll-animations" style={{ color: '#818cf8' }}>Scroll Animations</a>{' '}
        for scroll-driven keyframe generation.
      </div>
    </>
  );
}