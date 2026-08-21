// src/pages/Vanilla.tsx

import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from './Docs/docs.chain';
import { docTable, docTh, docTd } from './Docs/docs.chain';
import { usePrism } from '../../lib/usePrism';

const macroCategories = [
  {
    title: 'Layout',
    macros: ['center()', 'flexCenter()', 'gridCenter()', 'stack()', 'hstack()', 'vstack()', 'cluster()', 'switcher()', 'cover()', 'frame()', 'reel()', 'imposter()', 'autoGrid()', 'bento()'],
  },
  {
    title: 'Spacing',
    macros: ['mx()', 'my()', 'px()', 'py()', 'size()', 'inset()', 'insetX()', 'insetY()', 'gap()'],
  },
  {
    title: 'Positioning',
    macros: ['absolute()', 'fixed()', 'sticky()', 'relative()', 'dock()', 'bleed()'],
  },
  {
    title: 'Typography',
    macros: ['truncate()', 'lineClamp()', 'prose()', 'heading()', 'eyebrow()', 'caption()', 'textGradient()'],
  },
  {
    title: 'Visual',
    macros: ['card()', 'glass()', 'frosted()', 'glow()', 'innerGlow()', 'noise()', 'skeleton()', 'shimmer()', 'paper()', 'elevated()', 'ring()'],
  },
  {
    title: 'Animation',
    macros: ['float()', 'spin()', 'pulse()', 'bounce()', 'marquee()'],
  },
  {
    title: 'Interaction',
    macros: ['pressable()', 'clickScale()', 'hoverLift()', 'hoverGlow()', 'focusRing()', 'onHover()', 'onActive()', 'peerDim()', 'hasCount()'],
  },
  {
    title: 'Utility',
    macros: ['hide()', 'show()', 'srOnly()', 'unselectable()', 'scrollable()', 'safeArea()', 'pill()', 'badge()', 'container()', 'fullScreen()', 'hero()'],
  },
  {
    title: 'Semantic',
    macros: ['surface()', 'text()', 'elevation()', 'state()', 'spacing()'],
  },
  {
    title: 'Theme',
    macros: ['dark()', 'light()'],
  },
];

const browserExports = [
  { name: 'chain', desc: 'Style collector — create style objects' },
  { name: 'compileToCSS', desc: 'Compile one style object to CSS string' },
  { name: 'run', desc: 'Compile multiple style objects at once' },
  { name: 'transpile', desc: 'Same as run, also accepts object of styles' },
  { name: 'injectToDOM', desc: 'Create <style> tag and inject into <head>' },
  { name: 'VERSION', desc: 'Current ChainCSS version string' },
  { name: 'macros', desc: 'Macro registry object' },
  { name: 'getAvailableShorthands', desc: 'List all available macro names' },
];

const whenToUse = [
  { use: '✅ Prototyping and demos', build: '❌ Use build tools instead' },
  { use: '✅ Static HTML sites', build: '❌ Production applications' },
  { use: '✅ Learning ChainCSS', build: '❌ You want dead code elimination' },
  { use: '✅ CodePen / JSFiddle examples', build: '❌ You need atomic CSS extraction' },
  { use: '✅ No bundler setup wanted', build: '❌ You want CSS compression' },
  { use: '✅ Quick experiments', build: '❌ You need the full 23-pass pipeline' },
];

export default function Vanilla() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Vanilla HTML (No Build Step)</h1>
      <p className={contentDesc}>
        Use ChainCSS directly in the browser with zero build tools. Import from
        CDN, write styles in <code className={inlineCode}>.chain.js</code> files,
        and compile at runtime. Perfect for prototypes, demos, static sites, and
        learning.
      </p>

      {/* ================================================================ */}
      {/* QUICK START */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Quick Start</h2>
      <p className={paragraph}>
        A single HTML file. Import from CDN, define styles, compile, inject.
        No bundler, no config, no build step.
      </p>
      <pre className={codeBlock}><code className="language-html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ChainCSS Vanilla</title>
</head>
<body>
  <h1 class="my-heading">Hello ChainCSS</h1>

  <script type="module">
    import { chain, compileToCSS } from 'https://cdn.jsdelivr.net/npm/chaincss@2.15.11/dist/browser.js';

    const styles = chain()
      .typography({ fontSize: '2rem', fontWeight: 800, color: '#6366f1' })
      .raw('text-align', 'center')
      .$el('.my-heading');

    const css = compileToCSS(styles);
    const styleTag = document.createElement('style');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  </script>
</body>
</html>`}</code></pre>

      {/* ================================================================ */}
      {/* TRANSPILE HELPER */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>The <code className={inlineCode}>transpile()</code> Helper</h2>
      <p className={paragraph}>
        Compile multiple style objects at once. Accepts spread arguments or a
        single object of named styles — perfect for importing from separate{' '}
        <code className={inlineCode}>.chain.js</code> files.
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`import { chain, transpile } from 'https://cdn.jsdelivr.net/npm/chaincss@2.15.11/dist/browser.js';

// ── Define styles ──────────────────────────────
const reset = chain()
  .raw({ margin: 0, padding: 0, boxSizing: 'border-box' })
  .$el('*');

const body = chain()
  .typography({ fontFamily: 'Inter, system-ui, sans-serif', color: '#e2e8f0' })
  .background({ color: '#0f172a' })
  .raw('min-height', '100vh')
  .$el('body');

const heading = chain()
  .typography({ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#f1f5f9' })
  .raw('text-align', 'center')
  .raw('padding-top', '40vh')
  .$el('h1');

const css = transpile(reset, body, heading);

const styleTag = document.createElement('style');
styleTag.textContent = css;
document.head.appendChild(styleTag);`}</code></pre>

      {/* ================================================================ */}
      {/* INJECT TO DOM */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>The <code className={inlineCode}>injectToDOM()</code> Helper</h2>
      <p className={paragraph}>
        Available in v2.15.11+. Creates a <code className={inlineCode}>&lt;style&gt;</code> tag
        and appends it to <code className={inlineCode}>&lt;head&gt;</code> automatically.
        Pass an optional ID to reference the style tag later.
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`import { chain, compileToCSS, injectToDOM } from 'https://cdn.jsdelivr.net/npm/chaincss@2.15.11/dist/browser.js';

const card = chain()
  .card()
  .box({ padding: 24 })
  .$el('.card');

const css = compileToCSS(card);

// Auto-creates <style> tag and appends to <head>
injectToDOM(css);

// Optional: pass an ID for later removal
injectToDOM(css, 'my-styles');`}</code></pre>

      {/* ================================================================ */}
      {/* SEPARATE FILES */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Organizing Styles in Separate Files</h2>
      <p className={paragraph}>
        For larger projects, split styles into <code className={inlineCode}>.chain.js</code> files.
        Import everything as a namespace and transpile at once.
      </p>

      <p className={paragraph} style={{ marginTop: 16, fontWeight: 600, color: '#94a3b8' }}>
        styles.chain.js
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`import { chain } from 'https://cdn.jsdelivr.net/npm/chaincss@2.15.11/dist/browser.js';

export const reset = chain()
  .raw({ margin: 0, padding: 0, boxSizing: 'border-box' })
  .$el('*');

export const body = chain()
  .background({ color: '#0f172a' })
  .typography({ color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' })
  .raw('min-height', '100vh')
  .$el('body');

export const navbar = chain()
  .flex({ align: 'center', justify: 'space-between' })
  .box({ padding: '16px 32px' })
  .background({ color: 'rgba(15, 23, 42, 0.9)' })
  .position({ type: 'sticky', top: 0, zIndex: 100 })
  .glass()
  .$el('#navbar');

export const logo = chain()
  .typography({ fontSize: '20px', fontWeight: 800, color: '#818cf8' })
  .$el('#logo');

export const navLink = chain()
  .typography({ color: '#94a3b8', fontSize: '14px', fontWeight: 500 })
  .raw('text-decoration', 'none')
  .hover().typography({ color: '#e2e8f0' }).end()
  .$el('.nav-link');

export const hero = chain()
  .flexCenter()
  .raw('flex-direction', 'column')
  .raw('min-height', '80vh')
  .raw('text-align', 'center')
  .$el('#hero');

export const cta = chain()
  .background({ color: '#6366f1' })
  .typography({ color: 'white', fontSize: '16px', fontWeight: 600 })
  .box({ borderRadius: 12, padding: '14px 32px' })
  .raw('border', 'none')
  .raw('cursor', 'pointer')
  .hover()
    .background({ color: '#4f46e5' })
    .raw('transform', 'translateY(-2px)')
  .end()
  .$el('#cta-btn');`}</code></pre>

      <p className={paragraph} style={{ marginTop: 16, fontWeight: 600, color: '#94a3b8' }}>
        index.html
      </p>
      <pre className={codeBlock}><code className="language-html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChainCSS Demo</title>
</head>
<body>
  <nav id="navbar">
    <span id="logo">ChainCSS</span>
    <div>
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">Docs</a>
      <a href="#" class="nav-link">GitHub</a>
    </div>
  </nav>
  <section id="hero">
    <h1>Build styles that compile away</h1>
    <p>Zero runtime CSS-in-JS with 100+ macros.</p>
    <button id="cta-btn">Get Started</button>
  </section>

  <script type="module">
    import { transpile, injectToDOM } from 'https://cdn.jsdelivr.net/npm/chaincss@2.15.11/dist/browser.js';
    import * as styles from './styles.chain.js';

    const css = transpile(styles);
    injectToDOM(css);
  </script>
</body>
</html>`}</code></pre>

      {/* ================================================================ */}
      {/* MACROS */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Using Macros</h2>
      <p className={paragraph}>
        All 120+ macros work in vanilla HTML. Chain them together for expressive,
        readable styles — no CSS properties needed.
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`import { chain, compileToCSS } from 'https://unpkg.com/chaincss/dist/browser.js';

const card = chain()
  .glass()            // Frosted glass effect
  .card()             // Card container with shadow
  .pressable()        // Cursor + hover + active states
  .$el('.premium-card');

const css = compileToCSS(card);`}</code></pre>

      <h2 className={sectionHeading} style={{ marginTop: 40 }}>Available Macros (Browser Bundle)</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 16 }}>
        {macroCategories.map(cat => (
          <div key={cat.title} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontWeight: 700, color: '#818cf8', marginBottom: 8, fontSize: 13 }}>{cat.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {cat.macros.map(m => (
                <code key={m} className={inlineCode} style={{ fontSize: 11 }}>{m}</code>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ================================================================ */}
      {/* EXPORTS */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Available Exports</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Export</th><th className={docTh}>Description</th></tr></thead>
          <tbody>{browserExports.map(e => (
            <tr key={e.name}><td className={docTd}><code className={inlineCode}>{e.name}</code></td><td className={docTd}>{e.desc}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ================================================================ */}
      {/* WHEN TO USE */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>When to Use Vanilla Mode</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Use vanilla when</th><th className={docTh}>Use build tools when</th></tr></thead>
          <tbody>{whenToUse.map((row, i) => (
            <tr key={i}><td className={docTd}>{row.use}</td><td className={docTd}>{row.build}</td></tr>
          ))}</tbody>
        </table>
      </div>

      {/* ================================================================ */}
      {/* BROWSER SUPPORT */}
      {/* ================================================================ */}
      <h2 className={sectionHeading}>Browser Support</h2>
      <p className={paragraph}>
        All modern browsers are supported. ChainCSS uses ES modules
        (<code className={inlineCode}>&lt;script type="module"&gt;</code>) which
        work in Chrome, Firefox, Safari, and Edge. No transpilation needed.
      </p>

      <div className={note}>
        <strong>💡 Tip:</strong> For production vanilla sites, consider using the{' '}
        <a href="/docs/vite-plugin" style={{ color: '#818cf8' }}>Vite plugin</a> or{' '}
        <a href="/docs/cli" style={{ color: '#818cf8' }}>CLI build</a> to run the
        full 23-pass optimization pipeline at build time. The vanilla mode is perfect
        for getting started, prototypes, and static sites that don't need build-time
        optimizations.
      </div>
    </>
  );
}