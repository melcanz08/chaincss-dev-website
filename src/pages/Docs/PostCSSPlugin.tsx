import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function PostCSSPlugin() {
  return (
    <>
      <h1 className={contentTitle}>PostCSS Plugin</h1>
      <p className={contentDesc}>
        One plugin = all bundlers. Use ChainCSS with any PostCSS-compatible build tool —
        Vite, Webpack, Next.js, Parcel, Turbopack, Rspack, Farm, and more.
      </p>

      {/* ── Setup ────────────────────────────────────────── */}
      <h2 className={sectionHeading}>Setup</h2>
      <p className={paragraph}>
        Install ChainCSS and add it to your PostCSS config. Use <code className={inlineCode}>.cjs</code> extension
        for maximum compatibility (Turbopack requires CommonJS).
      </p>
      <pre className={codeBlock}>{`// postcss.config.cjs
module.exports = {
  plugins: {
    'chaincss/postcss': {
      content: ['./src/**/*.chain.{ts,js,tsx,jsx}'],
    },
    autoprefixer: {},
  },
}`}</pre>

      <div className={note}>
        <strong>Extension Note:</strong> For PostCSS-only setups (no Vite/Webpack plugin),
        use <code className={inlineCode}>.chain.js</code> files. TypeScript <code className={inlineCode}>.chain.ts</code>
        files require compilation that PostCSS cannot perform alone.
        The Vite and Webpack plugins handle <code className={inlineCode}>.chain.ts</code> natively.
      </div>

      {/* ── CSS Directive ────────────────────────────────── */}
      <h2 className={sectionHeading}>CSS Directive</h2>
      <p className={paragraph}>
        Add the <code className={inlineCode}>@chaincss</code> directive to your CSS file.
        It will be replaced with all compiled ChainCSS styles.
      </p>
      <pre className={codeBlock}>{`/* app.css or globals.css */
@chaincss;  /* Replaced with all collected styles */

/* Works alongside Tailwind */
@tailwind base;
@chaincss;
@tailwind utilities;`}</pre>

      {/* ── Supported Bundlers ──────────────────────────── */}
      <h2 className={sectionHeading}>Supported Bundlers</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Bundler</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Status</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Vite</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>via postcss.config.cjs</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Webpack</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>via postcss-loader</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Next.js (Turbopack)</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Use postcss.config.cjs</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Next.js (Webpack)</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>via postcss.config</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Parcel</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Built-in PostCSS support</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Rspack</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>via postcss-loader</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Farm</td>
              <td style={{ padding: '10px 16px', color: '#22c55e' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Built-in PostCSS support</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Full API Support ────────────────────────────── */}
      <h2 className={sectionHeading}>Full API Support</h2>
      <p className={paragraph}>
        The PostCSS plugin uses the real ChainCSS compiler. All methods work identically
        to the Vite plugin — no regex-based fallbacks.
      </p>
      <pre className={codeBlock}>{`// Static styles — compiled at build time
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
  .$el('theme-toggle')`}</pre>

      {/* ── Options ─────────────────────────────────────── */}
      <h2 className={sectionHeading}>Options</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Option</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Type</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Default</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}><code className={inlineCode}>content</code></td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>string[]</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>{`['./src/**/*.chain.{ts,js,tsx,jsx}']`}</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Glob patterns for chain files</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}><code className={inlineCode}>output</code></td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>string</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>null</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Optional file path to write CSS output</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}><code className={inlineCode}>debug</code></td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>boolean</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>false</td>
              <td style={{ padding: '10px 16px', color: '#71717a' }}>Enable verbose logging</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Comparison ──────────────────────────────────── */}
      <h2 className={sectionHeading}>Comparison</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>Tailwind</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>ChainCSS PostCSS</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>PostCSS plugin</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Works in any bundler</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Build-time CSS</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Dynamic styles</td>
              <td style={{ padding: '10px 16px', color: '#ef4444', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅ via CSS custom properties</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Type-safe API</td>
              <td style={{ padding: '10px 16px', color: '#ef4444', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅ TypeScript .chain.ts</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Mixed mode (static + dynamic)</td>
              <td style={{ padding: '10px 16px', color: '#ef4444', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '10px 16px', color: '#e4e4e7' }}>Zero-runtime (static)</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '10px 16px', color: '#22c55e', textAlign: 'center' }}>✅</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>Uses the real compiler:</strong> The PostCSS plugin runs <code className={inlineCode}>.chain.ts</code>
        files through the full ChainCSS pipeline — not regex-based. All features work identically
        to the Vite plugin. For PostCSS-only setups, use <code className={inlineCode}>.chain.js</code> files
        since TypeScript compilation requires a bundler.
      </div>
    </>
  );
}