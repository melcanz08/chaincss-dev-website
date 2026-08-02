import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function DevServer() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Dev Server</h1>
      <p className={contentDesc}>
        A zero-config development server with hot module replacement, build error overlay,
        persistent compiler state, and framework auto-detection. No Vite, no Webpack —
        just <code className={inlineCode}>chaincss dev</code>.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Start the dev server on port 3000
chaincss dev

# Custom port
chaincss dev --port 5173

# With a specific config file
chaincss dev --config chaincss.production.config.ts

# The server auto-detects your framework from package.json
# React, Vue, Svelte, and Solid are supported out of the box`}</code></pre>

      <h2 className={sectionHeading}>Architecture</h2>
      <p className={paragraph}>
        The dev server runs two compilers in parallel, coordinated through
        Server-Sent Events for instant browser updates:
      </p>

      <pre className={codeBlock}><code className="language-text">{`┌─────────────────────────────────────────────────┐
│              HTTP Server (Node.js)                │
│                                                   │
│  /index.html                                      │
│    → Serves HTML with live-reload script injected │
│    → Build errors appear as overlay in the page   │
│                                                   │
│  /__chaincss_reload (SSE)                         │
│    → Server-Sent Events endpoint                  │
│    → Heartbeat every 15s to keep connection alive │
│    → Pushes 'reload' events on CSS or JS changes  │
│                                                   │
│  /__chaincss_stats (JSON)                         │
│    → Returns persistent compiler state            │
│    → Shows total compiles, incremental %, rules   │
│                                                   │
│  /* (static files)                                │
│    → Serves from public/, dist/, and root         │
│    → Path traversal protection                    │
│    → Proper MIME types + Content-Length           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│           Background Compilers                    │
│                                                   │
│  CSS Watcher (child process)                      │
│    → Spawns: node dist/cli/index.js build --watch│
│    → Detects "✓ Updated" → notifies SSE clients  │
│    → Incremental: only changed rules recompile   │
│                                                   │
│  JS Bundler (programmatic esbuild)                │
│    → esbuild.context() with watch mode            │
│    → Auto-detects framework for JSX config        │
│    → Build errors → overlay injection            │
│    → Success → SSE notify → browser reload        │
└─────────────────────────────────────────────────┘`}</code></pre>

      <h2 className={sectionHeading}>Hot Module Replacement</h2>
      <p className={paragraph}>
        CSS changes are pushed to the browser instantly without a page reload.
        The mechanism is simple and reliable:
      </p>

      <pre className={codeBlock}><code className="language-html">{`<!-- Injected into every HTML page -->
<script>
  var es = new EventSource('/__chaincss_reload');
  var debounce = null;

  es.onmessage = function(e) {
    if (e.data === 'heartbeat') return;

    // Debounce: multiple rapid changes → single reload
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(function() {
      window.location.reload();
    }, 100);
  };
</script>`}</code></pre>

      <p className={paragraph}>
        When you save a <code className={inlineCode}>.chain.ts</code> file:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>The CSS watcher recompiles only the changed file</li>
        <li>The accumulated CSS is updated in memory</li>
        <li>A <code className={inlineCode}>chaincss-update</code> event pushes to the browser</li>
        <li>The browser fetches <code className={inlineCode}>/__chaincss.css</code> with a cache-busting timestamp</li>
        <li>The style element's <code className={inlineCode}>textContent</code> is replaced</li>
        <li>Styles update without page reload</li>
      </ol>

      <h2 className={sectionHeading}>Build Error Overlay</h2>
      <p className={paragraph}>
        When JS compilation fails, the error is injected directly into the page
        as a fixed overlay — no need to check the terminal:
      </p>

      <pre className={codeBlock}><code className="language-html">{`<!-- Injected into <body> on JS compilation failure -->
<div style="
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #e11d48;
  color: white;
  padding: 14px;
  font-family: monospace;
  font-size: 13px;
  z-index: 999999;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  white-space: pre-wrap;
">
  ⚠️ JS Compilation Error:
  Expected ">" but found "}" (src/App.tsx:42:15)
</div>`}</code></pre>

      <p className={paragraph}>
        Once the error is fixed and the file recompiles successfully, the overlay
        disappears automatically on the next reload.
      </p>

      <h2 className={sectionHeading}>Framework Auto-Detection</h2>
      <p className={paragraph}>
        The dev server reads your <code className={inlineCode}>package.json</code> to detect
        which framework you're using and configures esbuild's JSX settings automatically:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Framework</th>
            <th className={docTh}>Detection</th>
            <th className={docTh}>JSX Config</th>
            <th className={docTh}>Entry Points</th>
          </tr></thead>
          <tbody>{[
            ['React', 'react in dependencies', 'jsx: transform', 'src/main.tsx, src/App.tsx'],
            ['Vue', 'vue in dependencies', 'N/A (uses .vue SFCs)', 'src/main.ts, src/App.vue'],
            ['Svelte', 'svelte in dependencies', 'N/A (uses .svelte)', 'src/main.ts, src/App.svelte'],
            ['Solid', 'solid-js in dependencies', 'jsx: transform, jsxImportSource: solid-js', 'src/main.tsx, src/App.tsx'],
          ].map(([fw, detection, jsx, entry], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{fw}</strong></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{detection}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{jsx}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{entry}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        Entry points are resolved automatically by scanning for common patterns:{' '}
        <code className={inlineCode}>src/main.tsx</code>, <code className={inlineCode}>src/index.tsx</code>,{' '}
        <code className={inlineCode}>src/App.tsx</code>, and their JS/JSX variants.
      </p>

      <h2 className={sectionHeading}>Compiler Stats Endpoint</h2>
      <p className={paragraph}>
        The dev server exposes real-time compiler metrics at{' '}
        <code className={inlineCode}>/__chaincss_stats</code>:
      </p>

      <pre className={codeBlock}><code className="language-json">{`{
  "persistent": true,
  "totalCompiles": 1247,
  "incrementalCompiles": 1180,
  "fullCompiles": 67,
  "totalRulesEver": 892,
  "currentLiveRules": 845,
  "averageRecompilePercent": 4.2,
  "compiledFiles": 47,
  "metadataEntries": 1247,
  "lastCompiledAt": "2026-07-31T...",
  "uptime": 3245000
}`}</code></pre>

      <p className={paragraph}>
        Key metrics to watch:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>incrementalCompiles vs fullCompiles</strong> — higher is better. 94.6% incremental means only 5.4% of compiles are full rebuilds.</li>
        <li><strong>averageRecompilePercent</strong> — what percentage of rules are dirty per change. 4.2% means a typical file change only recompiles 4.2% of your stylesheet.</li>
        <li><strong>currentLiveRules vs totalRulesEver</strong> — dead code eliminated. 892 - 845 = 47 rules removed by DCE.</li>
      </ul>

      <h2 className={sectionHeading}>Persistent State Across Restarts</h2>
      <p className={paragraph}>
        The dev server saves compiler state to disk on shutdown and restores it on startup.
        This means you get incremental compilation even after restarting the dev server —
        only files that changed while the server was off are recompiled.
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# First start — full compilation
$ chaincss dev
[ChainCSS] Pre-compiling 47 styling definition file(s)...
[ChainCSS] Pipeline Engine Hook Active (atomic: true)
✅ Compiled 47 file(s) in 1,247ms
🚀 Development Server active: http://localhost:3000

# After restart — cold-start incremental
$ chaincss dev
[ChainCSS] Restored compiler state from cache.
📦 Restored state (1247 compiles, 845 live rules)
[ChainCSS] No files changed since last session — skipping compilation
🚀 Development Server active: http://localhost:3000`}</code></pre>

      <h2 className={sectionHeading}>CSS Polling for Dynamic Styles</h2>
      <p className={paragraph}>
        For components using <code className={inlineCode}>chain.dynamic()</code>, the generated CSS
        with <code className={inlineCode}>var()</code> placeholders is served through the same{' '}
        <code className={inlineCode}>/__chaincss.css</code> endpoint. The runtime injector
        handles the <code className={inlineCode}>style</code> attribute updates via{' '}
        <code className={inlineCode}>useChainStyles()</code>.
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// Component using dynamic styles
import { useChainStyles } from 'chaincss/runtime'
import { btn } from './button.chain'

function Button({ isActive }: { isActive: boolean }) {
  const { classes, styleVars } = useChainStyles({ btn }, { isActive })
  
  return (
    <button 
      className={classes.btn}           // "chain-btn"
      style={styleVars}                 // { "--chain-btn-bg": "#6366f1", ... }
    >
      Click
    </button>
  )
}

// When isActive changes:
// 1. React re-renders with new styleVars
// 2. Browser resolves var(--chain-btn-bg) to new value
// 3. No CSS regeneration. No style tag mutation. Just CSS custom properties.`}</code></pre>

      <h2 className={sectionHeading}>Comparison with Vite</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Feature</th>
            <th className={docTh}>chaincss dev</th>
            <th className={docTh}>Vite</th>
          </tr></thead>
          <tbody>{[
            ['CSS HMR', 'SSE → fetch CSS → textContent swap', 'WebSocket → CSSOM update'],
            ['JS HMR', 'esbuild rebuild → page reload', 'esbuild/rollup → module graph → partial update'],
            ['Error overlay', 'Server-side injection', 'Client-side overlay'],
            ['Framework detection', 'package.json scan', 'Plugin-based'],
            ['Compiler state', 'Persistent across restarts', 'Per-session only'],
            ['Setup required', 'Zero config', 'vite.config.ts'],
            ['Bundle size (dev)', 'Tiny (esbuild only)', 'Larger (rollup + plugins)'],
          ].map(([feature, chaincss, vite], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{feature}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{chaincss}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{vite}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 When to use each:</strong> Use <code className={inlineCode}>chaincss dev</code> for
        quick prototyping, style-focused development, or when you want the simplest possible setup.
        Use <strong>Vite + ChainCSS plugin</strong> when you need Vite's full ecosystem (plugins,
        module graph HMR, Rollup builds, etc.). Both work with ChainCSS — choose based on your needs.
      </div>
    </>
  );
}