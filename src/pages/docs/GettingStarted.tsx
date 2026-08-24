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

          <h2 className={sectionHeading} style={{ marginTop: '40px' }}>Three Ways to Write Styles</h2>
          <p className={paragraph}>
            ChainCSS gives you three levels of abstraction. Choose the one that fits your workflow.
          </p>

          {/* Level 1: Natural Language */}
          <h3 style={{ margin: '24px 0 8px', fontSize: '16px', color: '#818cf8' }}>1. Natural Language (Most Magical)</h3>
          <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const card = chain()
  .describe("A frosted glass card with centered content")
  .$el('card')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Dark mode auto-generated */
[data-theme="dark"] .chain-card {
  background: rgba(0,0,0,0.3);
}`}</code></pre>

          {/* Level 2: Semantic Intents */}
          <h3 style={{ margin: '24px 0 8px', fontSize: '16px', color: '#818cf8' }}>2. Semantic Intents (Expressive)</h3>
          <pre className={codeBlock}><code className="language-ts">{`export const card = chain()
  .intents(['card', 'glass'])
  .$el('card')`}</code></pre>
          <p className={paragraph}>
            The compiler recognizes 30+ intents (card, glass, button, modal, etc.) and expands them 
            to 10+ CSS properties each. The <strong>Intent Suggestion Validator</strong> even detects 
            when you're writing properties manually and suggests the equivalent intent.
          </p>

          {/* Level 3: Structured Shorthands */}
          <h3 style={{ margin: '24px 0 8px', fontSize: '16px', color: '#818cf8' }}>3. Structured Shorthands (Explicit)</h3>
          <pre className={codeBlock}><code className="language-ts">{`export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .pseudo({
    hover: { background: '#4f46e5' },
    focus: { outline: '2px solid #818cf8' }
  })
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
}
.chain-button:focus {
  outline: 2px solid #818cf8;
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
  .describe("A indigo button with white text and rounded corners")
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
            Build a styled button step by step using the three abstraction levels.
          </p>

          <h2 className={sectionHeading}>1. Natural Language (Fastest)</h2>
          <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const btn = chain()
  .describe("A indigo button with white text and hover state")
  .$el('button')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-button {
  background-color: #6366f1;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
}
.chain-button:hover {
  background-color: #4f46e5;
}`}</code></pre>

          <h2 className={sectionHeading}>2. Semantic Intents (Expressive)</h2>
          <pre className={codeBlock}><code className="language-ts">{`export const btn = chain()
  .intents(['button-primary', 'compact'])
  .$el('button')`}</code></pre>

          <h2 className={sectionHeading}>3. Unified Pseudo Classes</h2>
          <pre className={codeBlock}><code className="language-ts">{`export const btn = chain()
  .background({ color: '#6366f1' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .pseudo({
    hover: { background: '#4f46e5', transform: 'scale(1.02)' },
    focus: { outline: '2px solid #818cf8' },
    active: { transform: 'scale(0.95)' }
  })
  .$el('button')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-button {
  background-color: #6366f1;
  padding: 12px 24px;
  border-radius: 8px;
}
.chain-button:hover {
  background-color: #4f46e5;
  transform: scale(1.02);
}
.chain-button:focus {
  outline: 2px solid #818cf8;
}
.chain-button:active {
  transform: scale(0.95);
}`}</code></pre>

          <h2 className={sectionHeading}>4. Unified At-Rules</h2>
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
    }
  })
  .$el('container')`}</code></pre>
          <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-container {
  padding: 16px;
}
@media (min-width: 768px) {
  .chain-container {
    padding: 24px;
  }
}
@supports (display: grid) {
  .chain-container {
    display: grid;
  }
}`}</code></pre>

          <h2 className={sectionHeading}>Next Steps</h2>
          <div className={note}>
            <strong>You're ready!</strong> Explore <a href="/docs/design-tokens" style={{ color: '#818cf8' }}>Design Tokens</a> for theming, <a href="/docs/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for natural language, or <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros</a> for layout primitives.
          </div>
        </>
      )}
    </>
  );
}