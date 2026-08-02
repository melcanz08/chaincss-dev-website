import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function VitePlugin() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Vite Plugin</h1>
      <p className={contentDesc}>
        Deep integration with Vite's module graph for automatic compilation, HMR with
        CSS injection, persistent compiler state, live inspector data, and concurrent
        production builds. The plugin is the recommended way to use ChainCSS.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-ts">{`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincss from 'chaincss/vite'

export default defineConfig({
  plugins: [
    chaincss({
      atomic: true,        // Enable atomic CSS extraction
      verbose: true,       // Log compilation activity
      minify: false,       // Minify in production (auto-detected)
      tokens: { /* ... */ }, // Design tokens
    }),
    react()
  ]
})`}</code></pre>

      <div className={note}>
        <strong>⚠️ Plugin order matters:</strong> ChainCSS must come <strong>before</strong> your
        framework plugin. It transforms <code className={inlineCode}>.chain.ts</code> files into
        JavaScript modules that your framework plugin then processes.
      </div>

      <h2 className={sectionHeading}>How It Works</h2>

      <pre className={codeBlock}><code className="language-javascript">{`File saved: src/components/button.chain.ts
    ↓
1. Vite watcher fires 'change' event
    ↓
2. handleFileChange():
   • Invalidates Vite's module graph cache
   • compileFile(absPath) → ChainCSSCompiler.compileVirtualSource()
     - Content-addressable cache check (MD5 hash)
     - Cache hit? → return cached result (zero compilation)
     - Cache miss? → pipeline.execute(filteredIR)
   • updateCSS(absPath, css) → cssFileCache Map
   • rebuildCache() → joins all cached CSS into single string
   • devServer.ws.send('chaincss-update') → push to browser
    ↓
3. Browser receives WebSocket message:
   • fetch('/__chaincss.css?v=' + timestamp)
   • applyCSS(css) → styleElement.textContent = css
   • Styles updated without page reload`}</code></pre>

      <h2 className={sectionHeading}>Virtual CSS Module</h2>
      <p className={paragraph}>
        All compiled CSS is accumulated in memory and served through a virtual module.
        No CSS files are written to disk in development — everything stays in memory
        for instant updates:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# The plugin creates these endpoints in dev mode:

/__chaincss.css          → Accumulated CSS from all .chain.ts files
/__chaincss-ir.json      → Live inspector data (dependency graph, pass timing)
/@chaincss/client.js      → HMR client (20-line SSE script)`}</code></pre>

      <h2 className={sectionHeading}>HMR Client</h2>
      <p className={paragraph}>
        The HMR client is minimal — 20 lines of JavaScript injected into every page.
        It fetches the accumulated CSS and updates a single style element:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// /@chaincss/client.js (served by the plugin)
import { createHotContext } from "/@vite/client";

const STYLE_ID = 'chaincss-styles';

function ensureStyleEl() {
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    el.setAttribute('data-chaincss', '');
    document.head.appendChild(el);
  }
  return el;
}

function applyCSS(css) {
  ensureStyleEl().textContent = css;
}

// Initial load
fetch('/__chaincss.css', { cache: 'no-store' })
  .then(r => r.text())
  .then(applyCSS);

// HMR updates
const hot = createHotContext('/@chaincss/client.js');
hot.on('chaincss-update', (data) => {
  fetch('/__chaincss.css?v=' + (data?.timestamp || Date.now()))
    .then(r => r.text())
    .then(applyCSS);
});
hot.accept();`}</code></pre>

      <h2 className={sectionHeading}>Development Features</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Feature</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['Auto-compilation', '.chain.ts files compiled on save via Vite transform hook'],
            ['HMR', 'CSS updates via WebSocket → fetch virtual CSS → textContent swap'],
            ['Module graph integration', 'Invalidates affected modules, triggers Vite HMR boundary'],
            ['Memory cache', 'CSS accumulated in Map by file path, lazy-joined on request'],
            ['Inspector endpoint', '/__chaincss-ir.json serves serialized IR + pass timing + diagnostics'],
            ['Content-addressable cache', 'Virtual source compilation uses MD5 hash for dedup'],
            ['Persistent state', 'Compiler state saved/restored for cold-start incremental builds'],
            ['Dynamic base path', 'Respects Vite config.base for all asset paths'],
            ['File watcher dedup', 'compiling Set prevents duplicate compilation of same file'],
          ].map(([feature, desc], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{feature}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Production Build</h2>
      <p className={paragraph}>
        In production mode, the plugin pre-compiles all files with CPU-count concurrency
        and emits the combined CSS as a build asset:
      </p>

      <pre className={codeBlock}><code className="language-text">{`Production build flow:
1. buildStart → compileAllStyles()
   • Walk src/ directory, find all .chain.ts files
   • Compile with concurrency = min(cpus, files)
   • Write .css and .class.js files alongside sources
2. generateBundle → emit chaincss.css as asset
3. transformIndexHtml → inject <link> tag
4. buildEnd → save persistent compiler state`}</code></pre>

      <h2 className={sectionHeading}>Configuration Options</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['atomic', 'boolean', 'true', 'Enable atomic CSS extraction'],
            ['verbose', 'boolean', 'false', 'Log compilation activity'],
            ['silent', 'boolean', 'false', 'Suppress all output'],
            ['minify', 'boolean', 'auto (production)', 'Minify CSS output'],
            ['tokens', 'object', '{}', 'Design token definitions'],
            ['breakpoints', 'object', '{}', 'Custom breakpoints'],
            ['disablePipeline', 'boolean', 'false', 'Disable the compiler pipeline (direct mode)'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>File Cleanup</h2>
      <p className={paragraph}>
        When a <code className={inlineCode}>.chain.ts</code> file is deleted, the plugin automatically
        cleans up the generated files:
      </p>

      <pre className={codeBlock}><code className="language-text">{`# Delete src/components/button.chain.ts
# Plugin automatically removes:
src/components/button.css       ← deleted
src/components/button.class.js  ← deleted
# CSS cache entry for this file removed
# Browser notified via WebSocket to reload`}</code></pre>

      <div className={note}>
        <strong>💡 Use with the Figma Sync plugin:</strong> Chain the Figma sync plugin before
        the ChainCSS plugin to automatically pull design tokens and trigger recompilation.
        See <a href="/docs/tokens/figma" style={{ color: '#818cf8' }}>Figma Integration</a> for setup.
        For projects without Vite, use the standalone <a href="/docs/cli/dev-server" style={{ color: '#818cf8' }}>Dev Server</a>.
      </div>
    </>
  );
}