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
        custom keyframes, font-face declarations, and nested selectors. Use the unified{' '}
        <code className={inlineCode}>.atrule()</code> method or the legacy callback-based APIs.
      </p>

      {/* ============================================================ */}
      {/* NEW: Unified atrule() method */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Unified Method: .atrule()</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>.atrule()</code> method accepts an object where keys are
        at-rule names and values are configuration objects. This is the recommended way
        to write at-rules in ChainCSS v2.15+:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .box({ padding: 16 })
  .atrule({
    media: {
      query: '(min-width: 768px)',
      styles: { padding: 24 }
    },
    supports: {
      query: '(display: grid)',
      styles: { display: 'grid' }
    },
    container: {
      query: '(min-width: 400px)',
      styles: { flexDirection: 'row' }
    },
    layer: {
      name: 'components',
      styles: { padding: 24 }
    }
  })
  .$el('layout')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-layout {
  padding: 16px;
}
@media (min-width: 768px) {
  .chain-layout {
    padding: 24px;
  }
}
@supports (display: grid) {
  .chain-layout {
    display: grid;
  }
}
@container (min-width: 400px) {
  .chain-layout {
    flex-direction: row;
  }
}
@layer components {
  .chain-layout {
    padding: 24px;
  }
}`}</code></pre>

      <p className={paragraph}>
        The <code className={inlineCode}>.atrule()</code> method supports <strong>all CSS at-rules</strong>:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Category</th>
            <th className={docTh}>At-Rules</th>
          </tr></thead>
          <tbody>
            <tr>
              <td className={docTd}><strong>Conditional</strong></td>
              <td className={docTd}><code className={inlineCode}>media</code>, <code className={inlineCode}>supports</code>, <code className={inlineCode}>container</code></td>
            </tr>
            <tr>
              <td className={docTd}><strong>Architecture</strong></td>
              <td className={docTd}><code className={inlineCode}>layer</code>, <code className={inlineCode}>scope</code>, <code className={inlineCode}>import</code>, <code className={inlineCode}>namespace</code>, <code className={inlineCode}>charset</code></td>
            </tr>
            <tr>
              <td className={docTd}><strong>Animation</strong></td>
              <td className={docTd}><code className={inlineCode}>keyframes</code>, <code className={inlineCode}>starting-style</code>, <code className={inlineCode}>view-transition</code>, <code className={inlineCode}>position-try</code></td>
            </tr>
            <tr>
              <td className={docTd}><strong>Typography</strong></td>
              <td className={docTd}><code className={inlineCode}>font-face</code>, <code className={inlineCode}>font-feature-values</code>, <code className={inlineCode}>font-palette-values</code></td>
            </tr>
            <tr>
              <td className={docTd}><strong>Custom Data</strong></td>
              <td className={docTd}><code className={inlineCode}>property</code>, <code className={inlineCode}>counter-style</code>, <code className={inlineCode}>color-profile</code>, <code className={inlineCode}>custom-media</code>, <code className={inlineCode}>custom-selector</code></td>
            </tr>
            <tr>
              <td className={docTd}><strong>Print</strong></td>
              <td className={docTd}><code className={inlineCode}>page</code>, <code className={inlineCode}>top-left</code>, <code className={inlineCode}>bottom-right</code>, etc.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* Legacy methods */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Legacy Methods (Backward Compatible)</h2>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@media — Responsive Design</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ direction: 'column' })
  .box({ padding: 16 })
  .media('(min-width: 768px)', (c) => c
    .flex({ direction: 'row', gap: 24 })
    .box({ padding: 24 })
  )
  .$el('layout')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>Responsive Values (Media Query Shorthand)</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .box({ padding: { base: 16, md: 24, lg: 32 } })
  .typography({ fontSize: { base: 14, md: 16, lg: 18 } })
  .$el('container')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@supports — Feature Queries</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .grid({ columns: '1fr' })
  .supports('(display: grid)', (c) => c
    .grid({ columns: '1fr 1fr', gap: 16 })
  )
  .$el('grid-layout')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@container — Container Queries</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .containerQuery({ type: 'inline-size', name: 'card' })
  .container('(min-width: 400px)', (c) => c
    .flex({ direction: 'row' })
  )
  .$el('card')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@layer — Cascade Layers</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .layer('components', (c) => c
    .box({ padding: 24, borderRadius: 8 })
  )
  .$el('layered-card')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@keyframes — Custom Animations</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .keyframes('slideIn', {
    '0%': { transform: 'translateX(-20px)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' }
  })
  .animation({ name: 'slideIn', duration: '0.3s', timing: 'ease' })
  .$el('animated')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>@font-face — Custom Fonts</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .fontFace({
    fontFamily: 'MyCustomFont',
    src: "url('/fonts/MyCustomFont.woff2') format('woff2')",
    fontWeight: '400',
    fontStyle: 'normal',
  })
  .typography({ fontFamily: "'MyCustomFont', sans-serif" })
  .$el('custom-font')`}</code></pre>

      <h3 style={{ margin: '24px 0 8px', fontSize: 16, color: '#818cf8' }}>Nesting & Children</h3>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .nest('.child', (c) => c
    .typography({ color: 'blue', fontSize: 14 })
  )
  .children((c) => c
    .box({ marginBottom: 8 })
  )
  .$el('parent')`}</code></pre>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Use <code className={inlineCode}>.atrule()</code> for new code.
        It's more readable, more maintainable, and supports all CSS at-rules in a single unified API.
        The legacy methods remain for backward compatibility.
        See <a href="/docs/pseudo-classes" style={{ color: '#818cf8' }}>Pseudo-Classes</a> for
        the unified <code className={inlineCode}>.pseudo()</code> method.
      </div>
    </>
  );
}