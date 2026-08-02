import { useLocation } from 'react-router-dom';
import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function GettingStarted() {
  const location = useLocation();
  const path = location.pathname;
  usePrism([path]);

  return (
    <>
      {/* ============================================================ */}
      {/* /docs — Introduction */}
      {/* ============================================================ */}
      {path === '/docs' && (
        <>
          <h1 className={contentTitle}>ChainCSS: The Design-Aware CSS Compiler</h1>
          <p className={contentDesc}>
            ChainCSS is a compiler that understands the relationships between your styles, tokens, 
            and accessibility constraints — not just individual CSS declarations. Write styles in TypeScript. 
            Compile to zero-runtime CSS.
          </p>

          <h2 className={sectionHeading}>Why ChainCSS?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '12px' }}>
            {[
              { title: '🧬 Token Graph', desc: 'Tokens know their relationships. Change primary.500 — every derived shade, hover, and contrast propagates automatically.' },
              { title: '♿ A11y Auto-Fix', desc: 'WCAG 2.2 contrast failures detected and fixed at build time. Preserves hue, adjusts lightness via binary search.' },
              { title: '🔗 Relationship Macros', desc: 'peerDim(), entangleFocus(), hasCount() — express design intent, not selector mechanics. 32+ macros.' },
              { title: '🎯 Mixed Mode', desc: 'Static properties compile to CSS at build time. Dynamic functions run at runtime via CSS variables. One API.' },
              { title: '📦 Structured Shorthands', desc: '.flex(), .grid(), .box(), .typography() — grouped CSS properties in single, typed calls with autocomplete.' },
              { title: '🔬 Live Inspector', desc: 'Inspect every stage of the 5-stage compiler pipeline. See normalization, validation, and optimization in real time.' },
            ].map(card => (
              <div key={card.title} style={{
                background: 'rgba(99, 102, 241, 0.08)', borderRadius: '12px',
                padding: '20px', border: '1px solid rgba(99, 102, 241, 0.15)'
              }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#e2e8f0' }}>{card.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <h2 className={sectionHeading} style={{ marginTop: '40px' }}>How It Works</h2>
          <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover().background({ color: '#4f46e5' }).end()
  .$el('button')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Output CSS */
.chain-button {
  background-color: #6366f1;
  color: #ffffff;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
}
.chain-button:hover {
  background-color: #4f46e5;
}`}</code></pre>

          <div className={note}>
            <strong>Ready to try?</strong> Head to <a href="/docs/installation" style={{ color: '#818cf8' }}>Installation</a> or jump straight to the <a href="/docs/quickstart" style={{ color: '#818cf8' }}>Quick Start</a>.
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* /docs/installation */}
      {/* ============================================================ */}
      {path === '/docs/installation' && (
        <>
          <h1 className={contentTitle}>Installation</h1>
          <p className={contentDesc}>Add ChainCSS to any Vite project in two steps.</p>

          <h2 className={sectionHeading}>1. Install the Package</h2>
          <pre className={codeBlock}><code className="language-bash">npm install chaincss</code></pre>
          <p className={paragraph}>
            Works with React, Vue, Svelte, and Solid. Compiles to plain CSS — no framework-specific peer dependencies.
          </p>

          <h2 className={sectionHeading}>2. Add the Vite Plugin</h2>
          <pre className={codeBlock}><code className="language-ts">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [chaincss(), react()]
})`}</code></pre>
          <div className={note}>
            <strong>💡 Tip:</strong> ChainCSS must come <strong>before</strong> your framework plugin in the plugins array.
          </div>

          <h2 className={sectionHeading}>3. Create Your First File</h2>
          <p className={paragraph}>
            Create <code className={inlineCode}>src/styles/button.chain.ts</code>:
          </p>
          <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .$el('button')`}</code></pre>

          <h2 className={sectionHeading}>4. Use It</h2>
          <pre className={codeBlock}><code className="language-tsx">{`import { btn } from './styles/button.chain'

export function Button() {
  return <button className={btn}>Click me</button>
}`}</code></pre>

          <div className={note}>
            <strong>No Vite?</strong> ChainCSS works with the <a href="/docs/cli" style={{ color: '#818cf8' }}>standalone CLI</a> — <code className={inlineCode}>npx chaincss dev</code>.
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* /docs/quickstart */}
      {/* ============================================================ */}
      {path === '/docs/quickstart' && (
        <>
          <h1 className={contentTitle}>Quick Start</h1>
          <p className={contentDesc}>
            Build a styled button step by step using structured shorthands.
          </p>

          <h2 className={sectionHeading}>1. Your First Style</h2>
          <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ fontSize: 16, fontWeight: '600', color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .$el('button')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-button {
  background-color: #6366f1;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
}`}</code></pre>

          <h2 className={sectionHeading}>2. Add Hover and Focus</h2>
          <pre className={codeBlock}><code className="language-ts">{`export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover().background({ color: '#4f46e5' }).end()
  .focus().outline({ width: '2px', style: 'solid', color: '#818cf8' }).end()
  .$el('button')`}</code></pre>

          <h2 className={sectionHeading}>3. Responsive Design</h2>
          <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ direction: 'column' })
  .box({ padding: 16 })
  .media('(min-width: 768px)', (c) => c
    .flex({ direction: 'row' })
    .box({ padding: 24 })
  )
  .$el('container')`}</code></pre>

          <h2 className={sectionHeading}>4. Use Shorthands & Aliases</h2>
          <pre className={codeBlock}><code className="language-ts">{`chain()
  .flex({ d: 'col', ai: 'center', g: 16 })
  .box({ p: 24, m: '0 auto', w: '100%', mw: 1200 })
  .typography({ fs: 16, fw: '600', c: '#333' })
  .$el('card')`}</code></pre>

          <h2 className={sectionHeading}>Next Steps</h2>
          <div className={note}>
            <strong>You're ready!</strong> Explore <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for dynamic styles, <a href="/docs/tokens" style={{ color: '#818cf8' }}>Design Tokens</a> for theming, or <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros</a> for layout primitives.
          </div>
        </>
      )}
    </>
  );
}