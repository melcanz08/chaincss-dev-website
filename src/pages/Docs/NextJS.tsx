import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function NextJS() {
  return (
    <>
      <h1 className={contentTitle}>Next.js Integration</h1>
      <p className={contentDesc}>
        ChainCSS works with Next.js App Router, Pages Router, Server Components, and Client Components.
        Zero-runtime static styles, CSS custom properties for dynamic values.
      </p>

      {/* ── PostCSS Setup (recommended) ──────────────────── */}
      <h2 className={sectionHeading}>PostCSS Setup (Turbopack + Webpack)</h2>
      <p className={paragraph}>
        The simplest approach — works with both Turbopack and Webpack. Uses the ChainCSS PostCSS plugin
        to compile <code className={inlineCode}>.chain.ts</code> files at build time.
      </p>
      <pre className={codeBlock}>{`// postcss.config.cjs (use .cjs for Turbopack compatibility)
module.exports = {
  plugins: {
    'chaincss/postcss': {
      content: ['./app/**/*.chain.{ts,js,tsx,jsx}'],
    },
  },
}`}</pre>
      <pre className={codeBlock}>{`/* app/globals.css */
@chaincss;  /* Replaced with all collected ChainCSS styles */`}</pre>

      <div className={note}>
        <strong>Turbopack:</strong> Use <code className={inlineCode}>postcss.config.cjs</code> (CommonJS).
        ESM configs (<code className={inlineCode}>.mjs</code>) may not be processed correctly.
        Chain style files should use <code className={inlineCode}>.chain.js</code> extension
        for PostCSS compatibility (TypeScript <code className={inlineCode}>.chain.ts</code> files
        require a build step that PostCSS cannot perform alone).
      </div>

      {/* ── Server Components ────────────────────────────── */}
      <h2 className={sectionHeading}>Server Components (RSC)</h2>
      <p className={paragraph}>
        With the PostCSS plugin, styles are compiled at build time and injected into your CSS bundle.
        No extra components needed in your layout. Zero JavaScript shipped for static styles.
      </p>
      <pre className={codeBlock}>{`// app/layout.tsx
import "./globals.css";  // ← @chaincss directive compiles styles here

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}`}</pre>
      <pre className={codeBlock}>{`// app/styles/home.chain.js
import { chain } from 'chaincss'

export const heroCard = chain()
  .box({ padding: 24, borderRadius: 12 })
  .background({ color: '#1e293b' })
  .typography({ color: '#e2e8f0', fontSize: 18 })
  .hover().background({ color: '#0f172a' }).end()
  .$el()`}</pre>
      <pre className={codeBlock}>{`// app/page.tsx — Server Component, 0 KB JS for styles
import { heroCard } from './styles/home.chain.js'

export default function Page() {
  return (
    <main style={{ padding: 40 }}>
      <div className={heroCard.root}>Hello RSC!</div>
    </main>
  );
}`}</pre>

      {/* ── Client Components ────────────────────────────── */}
      <h2 className={sectionHeading}>Client Components (Dynamic Styles)</h2>
      <p className={paragraph}>
        For dynamic styles with state, use <code className={inlineCode}>useChainStyles</code> from the runtime.
      </p>
      <pre className={codeBlock}>{`'use client'
import { useState } from 'react'
import { useChainStyles } from 'chaincss/runtime'
import { themeToggle } from '../styles/playground.chain'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const { classes, styleVars } = useChainStyles(
    { themeToggle },
    { isDark }
  )
  return (
    <button className={classes.themeToggle} style={styleVars}
      onClick={() => setIsDark(!isDark)}>
      Toggle Theme
    </button>
  )
}`}</pre>

      {/* ── Alternative: Next.js Plugin ──────────────────── */}
      <h2 className={sectionHeading}>Alternative: Next.js Plugin (Webpack only)</h2>
      <p className={paragraph}>
        You can also use the dedicated Next.js plugin. Note: this currently requires Webpack
        (<code className={inlineCode}>--webpack</code> flag or <code className={inlineCode}>webpack: {}</code> in config).
      </p>
      <pre className={codeBlock}>{`// next.config.ts
import withChainCSS from 'chaincss/next'

export default withChainCSS({
  inputs: ['./app/**/*.chain.{ts,js,tsx,jsx}'],
})({
  webpack: {},  // Forces Webpack for Turbopack projects
})`}</pre>

      <div className={note}>
        <strong>SSR Safe:</strong> ChainCSS uses CSS custom properties for dynamic styles.
        No <code className={inlineCode}>window</code> access needed. Server renders initial values,
        client hydrates with current state. PostCSS compiles styles at build time —
        no runtime CSS generation.
      </div>
    </>
  );
}