import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function NextJS() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Next.js Integration</h1>
      <p className={contentDesc}>
        Full Next.js support with React Server Components (RSC), Server-Side Rendering (SSR),
        and client-side hydration. Separate server and client style registries prevent
        hydration mismatches. Works with both App Router and Pages Router.
      </p>

      <h2 className={sectionHeading}>Architecture: Dual Registry</h2>
      <p className={paragraph}>
        Next.js renders components on both the server and the client. ChainCSS uses
        two separate registries to prevent conflicts:
      </p>

      <pre className={codeBlock}><code className="language-text">{`┌─────────────────────────────────────────┐
│           SERVER (RSC/SSR)               │
│                                           │
│  import { chain } from 'chaincss/next/server' │
│                                           │
│  • serverRegistry (per-request)          │
│  • Styles collected during render        │
│  • Injected via <ChainCSSServerStyles>   │
│  • Falls back to .next/static/css/       │
│    chaincss.css if no runtime styles     │
└─────────────────────────────────────────┘
                    ↓
           HTML sent to browser
                    ↓
┌─────────────────────────────────────────┐
│           CLIENT (Hydration)             │
│                                           │
│  import { chain } from 'chaincss/next/client' │
│                                           │
│  • clientRegistry (per-session)          │
│  • Injected into <style> tag             │
│  • Deduplicated by className             │
│  • useIsomorphicLayoutEffect for         │
│    safe DOM access during hydration      │
└─────────────────────────────────────────┘`}</code></pre>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-js">{`# Install
npm install chaincss

# Wrap your next.config
# next.config.ts
import { withChainCSS } from 'chaincss/next'

export default withChainCSS({
  output: './.next/static/css/chaincss.css',
  serverComponents: true,
})({
  // your existing next config
})`}</code></pre>

      <h2 className={sectionHeading}>Server Component Usage (RSC)</h2>
      <p className={paragraph}>
        Server Components import from <code className={inlineCode}>chaincss/next/server</code>.
        Styles are collected during render and injected via{' '}
        <code className={inlineCode}>{"<ChainCSSServerStyles />"}</code>:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// app/layout.tsx — Server Component
import { ChainCSSServerStyles } from 'chaincss/next/server'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ChainCSSServerStyles />
      </head>
      <body>{children}</body>
    </html>
  )
}`}</code></pre>

      <pre className={codeBlock}><code className="language-jsx">{`// app/components/Card.tsx — Server Component
import { chain } from 'chaincss/next/server'

const cardStyles = chain()
  .box({ padding: 24, borderRadius: 12 })
  .background({ color: '#ffffff' })
  .shadow({ box: '0 4px 12px rgba(0,0,0,0.1)' })
  .$el('card')

export function Card({ children }) {
  return <div className={cardStyles.root}>{children}</div>
}`}</code></pre>

      <h2 className={sectionHeading}>Client Component Usage</h2>
      <p className={paragraph}>
        Client Components import from <code className={inlineCode}>chaincss/next/client</code>.
        The <code className={inlineCode}>'use client'</code> directive is already in the module:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`'use client'
// app/components/Button.tsx — Client Component
import { chain, useAtomicClasses } from 'chaincss/next/client'

const buttonStyles = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover().background({ color: '#4f46e5' }).end()
  .$el('btn')

export function Button({ children, onClick }) {
  const { classes } = useAtomicClasses({ btn: buttonStyles })
  
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  )
}`}</code></pre>

      <h2 className={sectionHeading}>useAtomicClasses Hook</h2>
      <p className={paragraph}>
        The client-side hook extracts class names from style definitions.
        It uses <code className={inlineCode}>useIsomorphicLayoutEffect</code> for safe
        DOM access during SSR hydration:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`import { useAtomicClasses } from 'chaincss/next/client'

function MyComponent() {
  const { classes, cx, cn } = useAtomicClasses({
    card: cardStyles,
    button: buttonStyles,
  })

  return (
    <div className={classes.card}>
      <button className={classes.button}>Click</button>
    </div>
  )
}

// classes = { card: 'chain-card', button: 'chain-btn' }
// cx('card') → 'chain-card'
// cn('card', 'button') → 'chain-card chain-btn'`}</code></pre>

      <h2 className={sectionHeading}>Server Style Fallback</h2>
      <p className={paragraph}>
        The server integration tries to read pre-compiled CSS from{' '}
        <code className={inlineCode}>.next/static/css/chaincss.css</code>. If the file
        doesn't exist (e.g., first render), it falls back to the per-request registry:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// Internal fallback chain in getChainCSS():
// 1. Try .next/static/css/chaincss.css (pre-compiled by webpack plugin)
// 2. Fall back to serverRegistry (per-request collection)
// 3. Fall back to empty string

export function getChainCSS(): string {
  // Check for pre-compiled file
  if (fs.existsSync('.next/static/css/chaincss.css')) {
    return fs.readFileSync(path, 'utf-8')
  }
  // Fall back to runtime collection
  return cssCache
}`}</code></pre>

      <h2 className={sectionHeading}>Webpack Plugin</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>withChainCSS</code> wrapper adds a Webpack plugin
        that collects CSS assets and writes the manifest:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// next.config.ts
import { withChainCSS } from 'chaincss/next'

export default withChainCSS({
  output: './.next/static/css/chaincss.css',  // CSS output path
  manifest: true,                               // Generate manifest.json
  debug: false,                                 // Verbose logging
  serverComponents: true,                       // Enable RSC support
})({
  // your existing next config
})`}</code></pre>

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
            ['output', 'string', "'./.next/static/css/chaincss.css'", 'Path for compiled CSS output'],
            ['manifest', 'boolean', 'true', 'Generate chaincss-manifest.json'],
            ['debug', 'boolean', 'false', 'Enable verbose logging'],
            ['serverComponents', 'boolean', 'true', 'Enable React Server Components support'],
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

      <h2 className={sectionHeading}>Server/Client Import Map</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Import Path</th>
            <th className={docTh}>Use In</th>
            <th className={docTh}>Provides</th>
          </tr></thead>
          <tbody>{[
            ['chaincss/next/server', 'Server Components, API routes', 'chain(), ChainCSSServerStyles, ChainCSSStyleTag, getChainCSS()'],
            ['chaincss/next/client', 'Client Components ("use client")', 'chain(), useAtomicClasses(), useChainStyles(), ChainCSSProvider, cx()'],
            ['chaincss/next', 'next.config.ts', 'withChainCSS() wrapper'],
          ].map(([importPath, useIn, provides], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{importPath}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{useIn}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{provides}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 RSC-safe by design:</strong> The server module has no <code className={inlineCode}>'use client'</code>{' '}
        directive — it's pure server code. The client module is marked{' '}
        <code className={inlineCode}>'use client'</code>. Server Components can import from{' '}
        <code className={inlineCode}>chaincss/next/server</code> without opting into client-side
        JavaScript. The dual registry ensures styles collected during SSR don't conflict
        with styles injected during hydration.
        See <a href="/docs/frameworks" style={{ color: '#818cf8' }}>Framework Integration</a> for
        runtime usage with <code className={inlineCode}>useChainStyles()</code> across all frameworks.
      </div>
    </>
  );
}