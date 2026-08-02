import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function PostCSSPlugin() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>PostCSS Plugin</h1>
      <p className={contentDesc}>
        One plugin = all bundlers. Use ChainCSS with any PostCSS-compatible build tool —
        Vite, Webpack, Next.js, Parcel, Turbopack, Rspack, Farm, and more. Uses the real
        ChainCSS compiler — not regex-based.
      </p>

      <h2 className={sectionHeading}>Setup</h2>
      <p className={paragraph}>
        Install ChainCSS and add it to your PostCSS config. Use <code className={inlineCode}>.cjs</code> extension
        for maximum compatibility (Turbopack requires CommonJS).
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`// postcss.config.cjs
module.exports = {
  plugins: {
    'chaincss/postcss': {
      content: ['./src/**/*.chain.{ts,js,tsx,jsx}'],
    },
    autoprefixer: {},
  },
}`}</code></pre>

      <div className={note}>
        <strong>Extension Note:</strong> For PostCSS-only setups (no Vite/Webpack plugin),
        use <code className={inlineCode}>.chain.js</code> files. TypeScript <code className={inlineCode}>.chain.ts</code>
        files require compilation that PostCSS cannot perform alone.
        The Vite and Webpack plugins handle <code className={inlineCode}>.chain.ts</code> natively.
      </div>

      <h2 className={sectionHeading}>CSS Directive</h2>
      <p className={paragraph}>
        Add the <code className={inlineCode}>@chaincss</code> directive to your CSS file.
        It will be replaced with all compiled ChainCSS styles. Multiple directives
        with different parameters are supported:
      </p>
      <pre className={codeBlock}><code className="language-css">{`/* app.css or globals.css */

/* Inject all styles at this location */
@chaincss;

/* Inject only base styles */
@chaincss base;

/* Inject only utility styles */
@chaincss utilities;

/* Works alongside Tailwind */
@tailwind base;
@chaincss;
@tailwind utilities;`}</code></pre>

      <h2 className={sectionHeading}>How Style Detection Works</h2>
      <p className={paragraph}>
        The plugin handles three different export patterns from <code className={inlineCode}>.chain.ts</code> files:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Case</th>
            <th className={docTh}>Export Pattern</th>
            <th className={docTh}>How It's Detected</th>
          </tr></thead>
          <tbody>{[
            ['1', 'Object with selectors (from $el())', 'exportValue.selectors → extract className, compile with scope'],
            ['2', 'Object with className (from buildRuntimeResult)', 'exportValue.className → wrap with selectors, compile'],
            ['3', 'Raw style object (from $el() without args)', 'Auto-generate class name from export key, compile'],
          ].map(([caseNum, pattern, detection], i) => (
            <tr key={i}>
              <td className={docTd}><strong>Case {caseNum}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{pattern}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{detection}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Full API Support</h2>
      <p className={paragraph}>
        The PostCSS plugin uses the real ChainCSS compiler via <code className={inlineCode}>StyleCollector</code> +{' '}
        <code className={inlineCode}>compileToCSS</code>. All methods work identically
        to the Vite plugin — no regex-based fallbacks.
      </p>
      <pre className={codeBlock}><code className="language-ts">{`// Static styles — compiled at build time
chain()
  .box({ padding: 24, borderRadius: 8 })
  .typography({ fontSize: 16, color: '#fff' })
  .flex({ align: 'center', gap: 8 })
  .hover().background({ color: 'blue' }).end()
  .media('(max-width: 640px)', (c) => c.box({ padding: 12 }))
  .$el('my-component')

// Dynamic styles — CSS custom properties at runtime
chain.dynamic()
  .raw({ backgroundColor: (ctx: { isDark: boolean }) => ctx.isDark ? '#333' : '#fff' })
  .$el('theme-toggle')`}</code></pre>

      <h2 className={sectionHeading}>Hot Reload Support</h2>
      <p className={paragraph}>
        The plugin clears Node.js's require cache before each compilation, enabling
        hot reload when used with file watchers:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// Internal: cache busting for hot reload
delete require.cache[require.resolve(filePath)];
const mod = require(filePath);
// Fresh import — picks up file changes without restart`}</code></pre>

      <h2 className={sectionHeading}>File Output</h2>
      <p className={paragraph}>
        Optionally write compiled CSS to a file — useful for build pipelines
        that need a physical CSS artifact:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// postcss.config.cjs
module.exports = {
  plugins: {
    'chaincss/postcss': {
      content: ['./src/**/*.chain.{ts,js}'],
      output: './dist/chaincss.css',  // ← Write to file
      debug: true,                     // ← Verbose logging
    },
  },
}`}</code></pre>

      <h2 className={sectionHeading}>Result Messages</h2>
      <p className={paragraph}>
        The plugin emits PostCSS result messages that downstream plugins can consume:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// Downstream plugin can access compiled CSS
result.messages.forEach(msg => {
  if (msg.type === 'chaincss') {
    console.log(msg.css)  // Compiled CSS string
  }
})`}</code></pre>

      <h2 className={sectionHeading}>Supported Bundlers</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Bundler</th>
            <th className={docTh}>Status</th>
            <th className={docTh}>Notes</th>
          </tr></thead>
          <tbody>{[
            ['Vite', '✅', 'via postcss.config.cjs'],
            ['Webpack', '✅', 'via postcss-loader'],
            ['Next.js (Turbopack)', '✅', 'Use postcss.config.cjs'],
            ['Next.js (Webpack)', '✅', 'via postcss.config'],
            ['Parcel', '✅', 'Built-in PostCSS support'],
            ['Rspack', '✅', 'via postcss-loader'],
            ['Farm', '✅', 'Built-in PostCSS support'],
            ['Astro', '✅', 'Built-in PostCSS support'],
            ['SvelteKit', '✅', 'via postcss.config'],
            ['Nuxt', '✅', 'via postcss.config'],
          ].map(([bundler, status, notes], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{bundler}</strong></td>
              <td className={docTd} style={{ color: '#22c55e' }}>{status}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{notes}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Options</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['content', 'string[]', "['./src/**/*.chain.{ts,js,tsx,jsx}']", 'Glob patterns for chain files'],
            ['output', 'string', 'null', 'Optional file path to write CSS output'],
            ['debug', 'boolean', 'false', 'Enable verbose logging'],
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

      <h2 className={sectionHeading}>Comparison with Tailwind PostCSS</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Feature</th>
            <th className={docTh}>Tailwind</th>
            <th className={docTh}>ChainCSS PostCSS</th>
          </tr></thead>
          <tbody>{[
            ['PostCSS plugin', '✅', '✅'],
            ['Works in any bundler', '✅', '✅'],
            ['Build-time CSS', '✅', '✅'],
            ['Dynamic styles', '❌', '✅ via CSS custom properties'],
            ['Type-safe API', '❌', '✅ TypeScript .chain.ts'],
            ['Mixed mode (static + dynamic)', '❌', '✅'],
            ['Zero-runtime (static)', '✅', '✅'],
            ['Real compiler pipeline', '❌ (string-based)', '✅ (IR + 23 passes)'],
            ['Token entanglement', '❌', '✅'],
            ['Accessibility auditing', '❌', '✅'],
            ['Multi-target emission', '❌', '✅'],
          ].map(([feature, tailwind, chaincss], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{feature}</strong></td>
              <td className={docTd} style={{ textAlign: 'center' }}>{tailwind}</td>
              <td className={docTd} style={{ textAlign: 'center' }}>{chaincss}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Uses the real compiler:</strong> The PostCSS plugin runs <code className={inlineCode}>.chain.ts</code>
        files through the full ChainCSS pipeline via <code className={inlineCode}>StyleCollector</code> +{' '}
        <code className={inlineCode}>compileToCSS</code> — not regex-based. All features work identically
        to the Vite plugin. For the best developer experience with TypeScript, HMR, and inspector
        support, use the <a href="/docs/vite-plugin" style={{ color: '#818cf8' }}>Vite Plugin</a> instead.
      </div>
    </>
  );
}