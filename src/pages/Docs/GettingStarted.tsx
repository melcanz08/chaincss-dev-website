import { useLocation } from 'react-router-dom';
import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function GettingStarted() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {/* ============================================================ */}
      {/* /docs — Introduction */}
      {/* ============================================================ */}
      {path === '/docs' && (
        <>
          <h1 className={contentTitle}>Welcome to ChainCSS</h1>
          <p className={contentDesc}>
            ChainCSS is a CSS-in-JS compiler — you write styles in TypeScript,
            it compiles them to static CSS with zero runtime cost.
          </p>

          <h2 className={sectionHeading}>Why ChainCSS?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '12px' }}>
            {[
              { title: '⚡ Zero Runtime', desc: 'Styles compile to plain CSS. No JavaScript shipped to the browser.' },
              { title: '🔒 Type-Safe', desc: 'Full TypeScript support. Catch errors at compile time, not in the browser.' },
              { title: '🎨 Mixed Mode', desc: 'Static styles compile away. Dynamic values update via CSS variables at runtime.' },
              { title: '♿ Built-in A11y', desc: 'WCAG 2.2 audit with auto-fix. Contrast, touch targets, focus indicators.' },
              { title: '🔬 Live Inspector', desc: 'Press Ctrl+Shift+I to see how every style was generated, pass by pass.' },
              { title: '🧩 Recipes', desc: 'Type-safe component variants like Stitches, compiled to zero-runtime CSS.' },
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
          <pre className={codeBlock}>{`chain()                    // start building
  .bg('#6366f1')            // add properties
  .padding('12px 24px')
  .rounded(8)
  .hover().bg('#4f46e5').end()  // pseudo-classes
  .$el('button')            // selector

// Output: .chain-button { background: #6366f1; ... }
//         .chain-button:hover { background: #4f46e5; }`}</pre>

          <div className={note}>
            <strong>Ready to try?</strong> Head to <a href="/docs/installation" style={{ color: '#818cf8' }}>Installation</a> or jump straight to the <a href="/docs/quickstart" style={{ color: '#818cf8' }}>Quick Start</a>.
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* /docs/installation — Installation */}
      {/* ============================================================ */}
      {path === '/docs/installation' && (
        <>
          <h1 className={contentTitle}>Installation</h1>
          <p className={contentDesc}>
            Add ChainCSS to any Vite project in two steps.
          </p>

          <h2 className={sectionHeading}>1. Install the Package</h2>
          <pre className={codeBlock}>{`npm install chaincss`}</pre>
          <p className={paragraph}>
            ChainCSS works with React, Vue, Svelte, and Solid. It compiles to plain CSS so there are no framework-specific peer dependencies.
          </p>

          <h2 className={sectionHeading}>2. Add the Vite Plugin</h2>
          <p className={paragraph}>
            Add ChainCSS to your <code className={inlineCode}>vite.config.ts</code>:
          </p>
          <pre className={codeBlock}>{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'      // or vue, svelte, solid
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [chaincss(), react()]
})`}</pre>
          <div className={note}>
            <strong>💡 Tip:</strong> ChainCSS must come <strong>before</strong> your framework plugin in the plugins array.
          </div>

          <h2 className={sectionHeading}>3. Create Your First File</h2>
          <p className={paragraph}>
            Create <code className={inlineCode}>src/styles/button.chain.ts</code>:
          </p>
          <pre className={codeBlock}>{`import { chain } from 'chaincss'

export const btn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .$el('button')`}</pre>

          <h2 className={sectionHeading}>4. Use It</h2>
          <pre className={codeBlock}>{`import { btn } from './styles/button.chain'

<button className={btn}>Click me</button>`}</pre>

          <div className={note}>
            <strong>No Vite?</strong> ChainCSS also works with a <a href="/docs/cli" style={{ color: '#818cf8' }}>standalone CLI</a> — just run <code className={inlineCode}>npx chaincss dev</code>.
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* /docs/quickstart — Quick Start Tutorial */}
      {/* ============================================================ */}
      {path === '/docs/quickstart' && (
        <>
          <h1 className={contentTitle}>Quick Start Tutorial</h1>
          <p className={contentDesc}>
            Build a styled button component step by step. By the end, you will understand the core ChainCSS workflow.
          </p>

          <h2 className={sectionHeading}>1. Your First Style</h2>
          <p className={paragraph}>
            Create <code className={inlineCode}>src/styles/button.chain.ts</code>:
          </p>
          <pre className={codeBlock}>{`import { chain } from 'chaincss'

export const btn = chain()
  .bg('#6366f1')          // background color
  .color('#ffffff')        // text color
  .padding('12px 24px')   // spacing
  .rounded(8)             // border-radius
  .$el('button')          // selector -> ".chain-button"`}</pre>
          <p className={paragraph}>
            Each method adds a CSS property. <code className={inlineCode}>$el('button')</code> sets the CSS selector.
            ChainCSS prefixes class names with <code className={inlineCode}>chain-</code> automatically.
          </p>
          <pre className={codeBlock}>{`/* Generated CSS: */
.chain-button {
  background: #6366f1;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
}`}</pre>

          <h2 className={sectionHeading}>2. Use It in a Component</h2>
          <pre className={codeBlock}>{`import { btn } from './styles/button.chain'

export function Button() {
  return <button className={btn}>Click me</button>
}`}</pre>
          <p className={paragraph}>
            <code className={inlineCode}>btn</code> is a plain string. No runtime JavaScript — zero overhead.
          </p>

          <h2 className={sectionHeading}>3. Add Hover and Focus</h2>
          <pre className={codeBlock}>{`export const btn = chain()
  .bg('#6366f1')
  .color('#ffffff')
  .padding('12px 24px')
  .rounded(8)
  .hover()                // start hover block
    .bg('#4f46e5')
  .end()                  // close hover block
  .focus()
    .outline('2px solid #818cf8')
  .end()
  .$el('button')`}</pre>
          <pre className={codeBlock}>{`/* Generated: */
.chain-button { background: #6366f1; ... }
.chain-button:hover { background: #4f46e5; }
.chain-button:focus { outline: 2px solid #818cf8; }`}</pre>

          <h2 className={sectionHeading}>4. Use Shorthands</h2>
          <pre className={codeBlock}>{`chain()
  .fs(16)       // font-size: 16px
  .fw(600)      // font-weight: 600
  .p('8px 16px') // padding
  .flex()       // display: flex
  .center()     // align-items + justify-content: center
  .truncate()   // text-overflow: ellipsis
  .$el('card')`}</pre>

          <h2 className={sectionHeading}>5. Responsive Styles</h2>
          <pre className={codeBlock}>{`chain()
  .flexDirection('column')
  .padding('16px')
  .media('(min-width: 768px)', (c) => c
    .flexDirection('row')
    .padding('24px')
  )
  .$el('container')`}</pre>

          <h2 className={sectionHeading}>Next Steps</h2>
          <div className={note}>
            <strong>You are ready!</strong> Explore <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for dynamic styles, <a href="/docs/recipes" style={{ color: '#818cf8' }}>Recipes</a> for variants, or <a href="/docs/tokens" style={{ color: '#818cf8' }}>Design Tokens</a> for theming.
          </div>
        </>
      )}
    </>
  );
}
