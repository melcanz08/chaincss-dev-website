import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function WebpackPlugin() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Webpack Plugin</h1>
      <p className={contentDesc}>
        Full Webpack integration with a custom loader and companion plugin. Compiles{' '}
        <code className={inlineCode}>.chain.ts</code> files via the real compiler pipeline,
        supports HMR, CSS extraction, inspector data export, and in-memory compilation
        with no temp files.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-javascript">{`// webpack.config.js
const { ChainCSSWebpackPlugin } = require('chaincss/webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.chain\.(ts|js)x?$/,
        use: {
          loader: 'chaincss/webpack',
          options: {
            atomic: true,
            minify: process.env.NODE_ENV === 'production',
            extractCSS: true,
            verbose: false,
          }
        }
      }
    ]
  },
  plugins: [
    new ChainCSSWebpackPlugin({
      outputJsonPath: 'chaincss-ir.json'  // Inspector data output
    })
  ]
}`}</code></pre>

      <h2 className={sectionHeading}>Next.js Integration</h2>

      <pre className={codeBlock}><code className="language-javascript">{`// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.chain\.(ts|js)x?$/,
      use: {
        loader: 'chaincss/webpack',
        options: {
          atomic: true,
          extractCSS: true,
        }
      }
    })
    return config
  }
}`}</code></pre>

      <h2 className={sectionHeading}>How It Works</h2>

      <p className={paragraph}>
        The loader intercepts <code className={inlineCode}>.chain.ts</code> imports and transforms
        them into JavaScript modules. The companion plugin collects inspector data
        across all compilations:
      </p>

      <pre className={codeBlock}><code className="language-text">{`Webpack resolves: import { btn } from './button.chain'
    ↓
Loader intercepts (test: /\.chain\.(ts|js)x?$/)
    ↓
compileVirtualSource(source, resourcePath)
    • In-memory compilation — no temp files
    • Uses real ChainCSSCompiler (shared across files)
    • Collects inspector data for the plugin
    ↓
Transform output:
    export const btn = 'chain-btn';              // class name
    export const dynamicFn = (ctx) => {...};      // dynamic functions (if any)
    ↓
Webpack bundles the transformed module
    ↓
Plugin (emit phase):
    • Exports chaincss-ir.json with all inspector data`}</code></pre>

      <h2 className={sectionHeading}>Loader Options</h2>

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
            ['minify', 'boolean', 'false', 'Minify CSS output'],
            ['extractCSS', 'boolean', 'false', 'Emit CSS as separate files instead of inline injection'],
            ['verbose', 'boolean', 'false', 'Log compilation activity'],
            ['hmr', 'boolean', 'false', 'Enable hot module replacement support'],
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

      <h2 className={sectionHeading}>CSS Extraction vs Inline Injection</h2>
      <p className={paragraph}>
        Two modes for delivering CSS to the browser:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// extractCSS: false (default) — CSS injected at runtime
// The loader appends a <style> tag injection to each module:
if (typeof document !== 'undefined') {
  var s = document.createElement('style');
  s.setAttribute('data-chaincss', '');
  s.textContent = ".chain-btn { padding: 12px 24px; ... }";
  document.head.appendChild(s);
}

// extractCSS: true — CSS emitted as separate files
// Each .chain.ts file produces a .css file in the output directory
// button.chain.ts → button.css`}</code></pre>

      <h2 className={sectionHeading}>Inspector Data Export</h2>
      <p className={paragraph}>
        The companion plugin collects inspector data from every compiled file and
        exports it as a JSON asset during the emit phase:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`// webpack.config.js
const { ChainCSSWebpackPlugin } = require('chaincss/webpack')

module.exports = {
  plugins: [
    new ChainCSSWebpackPlugin({
      outputJsonPath: 'chaincss-ir.json'  // Default filename
    })
  ]
}

// After build, chaincss-ir.json contains:
// {
//   "schemaVersion": 1,
//   "compilerVersion": "2.14.5",
//   "pipeline": "development",
//   "rules": [ /* all compiled rules with diagnostics + timing */ ]
// }`}</code></pre>

      <h2 className={sectionHeading}>Compiler Caching</h2>
      <p className={paragraph}>
        The loader maintains a compiler cache keyed by options. Multiple files
        sharing the same options reuse the same compiler instance — no repeated
        initialization overhead:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Internal: compiler instances cached by options signature
const compilerCache = new Map<string, ChainCSSCompiler>()

function getCompiler(options) {
  const key = \`\${options.atomic}-\${options.minify}\`
  if (!compilerCache.has(key)) {
    compilerCache.set(key, new ChainCSSCompiler({ ... }))
  }
  return compilerCache.get(key)!
}`}</code></pre>

      <h2 className={sectionHeading}>HMR Support</h2>
      <p className={paragraph}>
        When <code className={inlineCode}>hmr: true</code> is set, the loader integrates with
        Webpack's Hot Module Replacement. Changes to <code className={inlineCode}>.chain.ts</code>{' '}
        files trigger recompilation and module updates without a full page reload.
        The inspector data is cleared and recollected on each compilation.
      </p>

      <div className={note}>
        <strong>💡 Real compiler, not regex:</strong> The Webpack loader uses the same{' '}
        <code className={inlineCode}>ChainCSSCompiler</code> and{' '}
        <code className={inlineCode}>compileVirtualSource()</code> as the Vite plugin.
        All 23 pipeline passes run — validation, analysis, optimization, and lowering.
        The output is identical regardless of which build tool you use.
        See <a href="/docs/vite-plugin" style={{ color: '#818cf8' }}>Vite Plugin</a> for the
        Vite-specific integration and <a href="/docs/compiler/multi-target" style={{ color: '#818cf8' }}>Multi-Target Emission</a> for
        CSS extraction options.
      </div>
    </>
  );
}