import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function MixedMode() {
  return (
    <>
      <h1 className={contentTitle}>Mixed Mode: Static + Dynamic Styles</h1>
      <p className={contentDesc}>
        ChainCSS's killer feature — static properties compile away at build time,
        dynamic functions run at runtime via CSS custom properties. Zero memory leaks.
      </p>

      <h2 className={sectionHeading}>The Problem</h2>
      <p className={paragraph}>
        Traditional CSS-in-JS libraries ship JavaScript to the browser to generate styles.
        This means slower page loads, runtime overhead, and memory leaks when styles change.
        Pure static CSS libraries (Vanilla Extract, Tailwind) can't handle dynamic values like
        theme changes or component state.
      </p>
      <p className={paragraph}>
        ChainCSS gives you both: static properties become CSS at build time,
        dynamic functions stay as tiny JavaScript that updates CSS variables at runtime.
      </p>

      <h2 className={sectionHeading}>Static vs Dynamic: Visual Breakdown</h2>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

// ── STATIC MODE (default) ──
// Everything compiles to CSS at build time. Zero runtime JS.
export const staticBtn = chain()
  .bg('#6366f1')          // → background: #6366f1
  .color('#ffffff')        // → color: #ffffff
  .padding('12px 24px')   // → padding: 12px 24px
  .rounded(8)             // → border-radius: 8px
  .$el('btn-static')

// Output CSS:
// .chain-btn-static { background: #6366f1; color: #ffffff; ... }

// ── DYNAMIC MODE (chain.dynamic()) ──
// Static props → CSS | Dynamic functions → runtime JS
export const dynamicBtn = chain.dynamic()
  .bg('#6366f1')                                    // → static CSS
  .color('#ffffff')                                  // → static CSS
  .padding('12px 24px')                              // → static CSS
  .rounded(8)                                        // → static CSS
  .opacity(() => isActive ? 1 : 0.5)                 // → runtime only
  .shadow(() => isActive                             // → runtime only
    ? '0 8px 25px rgba(16,185,129,0.6)'
    : '0 2px 8px rgba(0,0,0,0.3)')
  .$el('btn-dynamic')

// Output CSS (static part only):
// .chain-btn-dynamic { background: #6366f1; color: #ffffff; ... }
// Dynamic functions are preserved in .class.js for useChainStyles()`}</pre>

      <h2 className={sectionHeading}>How It Works</h2>
      <p className={paragraph}>
        The compiler splits your styles into two parts at build time:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', color: '#cbd5e1' }}>
        <li><strong>Static CSS</strong> — Properties with fixed values compile to a regular <code className={inlineCode}>.css</code> file</li>
        <li><strong>Dynamic JS</strong> — Functions are preserved in a <code className={inlineCode}>.class.js</code> file and evaluated at runtime</li>
      </ol>
      <p className={paragraph}>
        At runtime, <code className={inlineCode}>useChainStyles()</code> evaluates the functions
        and applies the results as CSS custom properties — no DOM injection, no style recalculations.
      </p>

      <h2 className={sectionHeading}>Using Mixed Mode in React</h2>
      <pre className={codeBlock}>{`import { useChainStyles } from 'chaincss/runtime'
import { dynamicBtn } from './button.chain'

function Button({ isActive }) {
  // Pass styles + dependency array (re-runs when deps change)
  const { classMap, styleVars } = useChainStyles(
    { dynamicBtn },
    [isActive]  // re-evaluate when isActive changes
  )

  return (
    <button
      className={dynamicBtn}
      style={styleVars}  // CSS custom properties applied inline
    >
      Click me
    </button>
  )
}`}</pre>

      <h2 className={sectionHeading}>What Gets Generated</h2>
      <pre className={codeBlock}>{`/* button.css — static CSS (always loaded) */
.chain-btn-dynamic {
  background: #6366f1;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  opacity: var(--chain-btn-dynamic-opacity, 1);
  box-shadow: var(--chain-btn-dynamic-shadow, none);
}

/* button.class.js — dynamic functions (evaluated at runtime) */
export const dynamicBtn = {
  className: 'chain-btn-dynamic',
  dynamic: {
    opacity: () => isActive ? 1 : 0.5,
    shadow: () => isActive ? '...' : '...'
  }
}`}</pre>

      <h2 className={sectionHeading}>Performance</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '12px' }}>
        {[
          { title: 'No DOM injection', desc: 'CSS variables update inline styles. No <style> tag manipulation.' },
          { title: 'No memory leaks', desc: 'Old values are overwritten, not appended. Safe for long-running SPAs.' },
          { title: 'Concurrent React safe', desc: 'Uses useMemo under the hood. Compatible with React 18+ concurrent mode.' },
          { title: 'Tiny runtime', desc: 'useChainStyles is ~200 bytes gzipped. No style engine shipped.' },
        ].map(card => (
          <div key={card.title} style={{
            background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px',
            padding: '16px', border: '1px solid rgba(99, 102, 241, 0.15)'
          }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '15px', color: '#e2e8f0' }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <h2 className={sectionHeading}>When to Use Each Mode</h2>
      <div className={note}>
        <strong>Use static mode (<code className={inlineCode}>chain()</code>) when:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '1.2rem' }}>
          <li>All values are known at build time</li>
          <li>You want zero JavaScript overhead</li>
          <li>Building a design system or component library</li>
        </ul>
        <strong style={{ display: 'block', marginTop: '12px' }}>Use dynamic mode (<code className={inlineCode}>chain.dynamic()</code>) when:</strong>
        <ul style={{ marginTop: '8px', paddingLeft: '1.2rem' }}>
          <li>Values depend on component state or props</li>
          <li>You need theme switching (dark/light mode)</li>
          <li>You're building interactive UI components</li>
        </ul>
      </div>
    </>
  );
}
