// src/pages/docs/ThemeSwitching.tsx

import { useState, useEffect } from 'react'
import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';
import { 
  demoContainer, demoHeading, demoButton, demoTokenCard 
} from './themeSwitching-demoStyles/themeSwitching.chain';

export default function ThemeSwitching() {
  usePrism([]);
  const [demoTheme, setDemoTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('docs-demo-theme') || 'dark'  // ← default to dark
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', demoTheme)  // ← must be data-theme
    localStorage.setItem('docs-demo-theme', demoTheme)
  }, [demoTheme])

  const tokens = [
    { label: 'Background', light: '#ffffff', dark: '#1e293b' },
    { label: 'Text', light: '#0f172a', dark: '#f1f5f9' },
    { label: 'Border', light: '#e2e8f0', dark: '#334155' },
    { label: 'Shadow', light: '0 2px 8px rgba(0,0,0,0.06)', dark: '0 2px 8px rgba(0,0,0,0.4)' },
  ]

  return (
    <>
      <h1 className={contentTitle}>Theme Switching</h1>
      <p className={contentDesc}>
        Zero-runtime theme switching using CSS-only techniques. Define light and dark
        variants at build time. Switch themes by changing a single{' '}
        <code className={inlineCode}>data-theme</code> attribute. No{' '}
        <code className={inlineCode}>useChainStyles</code> needed.
      </p>

      {/* LIVE DEMO — Powered by real ChainCSS styles */}
      <div className={demoContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className={demoHeading}>🎨 Live Demo</h3>
          <button className={demoButton} onClick={() => setDemoTheme(t => t === 'light' ? 'dark' : 'light')}>
            {demoTheme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {tokens.map(token => (
            <div key={token.label} className={demoTokenCard}>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                {token.label}
              </div>
              <div style={{
                width: '100%',
                height: 40,
                borderRadius: 6,
                background: demoTheme === 'light' ? token.light : token.dark,
                boxShadow: token.label === 'Shadow' ? (demoTheme === 'light' ? token.light : token.dark) : 'none',
                transition: 'all 0.3s ease',
              }} />
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#94a3b8', marginTop: 8 }}>
                {demoTheme === 'light' ? token.light : token.dark}
              </div>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, marginTop: 16, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
          ↑ Container, heading, button, and token cards styled via{' '}
          <code style={{ color: '#818cf8' }}>themeSwitching.chain.ts</code>.{' '}
          The color swatches use React state for the demo.
        </p>
      </div>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const themedCard = chain()
  .box({ padding: 24, borderRadius: 12 })
  .background({ color: { theme: { light: '#ffffff', dark: '#1e293b' } } })
  .typography({ color: { theme: { light: '#0f172a', dark: '#f1f5f9' } } })
  .shadow({ box: { theme: {
    light: '0 4px 12px rgba(0,0,0,0.1)',
    dark: '0 4px 12px rgba(0,0,0,0.4)'
  } } })
  .$el('card')`}</code></pre>

      {/* ... rest of the existing content (Generated CSS, React, Vanilla, Vue examples, How It Works, etc.) ... */}

      <h2 className={sectionHeading}>Generated CSS</h2>
      <p className={paragraph}>
        Both themes are compiled at build time. The browser applies the correct one
        based on the <code className={inlineCode}>data-theme</code> attribute:
      </p>

      <pre className={codeBlock}><code className="language-css">{`.chain-card {
  padding: 24px;
  border-radius: 12px;
  background-color: #ffffff;
  color: #0f172a;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

[data-theme="dark"] .chain-card {
  background-color: #1e293b;
  color: #f1f5f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}`}</code></pre>

      <h2 className={sectionHeading}>Theme Toggle — React</h2>

      <pre className={codeBlock}><code className="language-jsx">{`import { useState, useEffect } from 'react'
import { themedCard, themedBtn } from './styles.chain'

function App() {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <div className={themedCard}>
        <h2>Current theme: {theme}</h2>
        <p>This card switches automatically via CSS. No useChainStyles needed.</p>
        <button className={themedBtn}>Themed Button</button>
      </div>
    </>
  )
}`}</code></pre>

      <h2 className={sectionHeading}>Theme Toggle — Vanilla JS</h2>

      <pre className={codeBlock}><code className="language-html">{`<!DOCTYPE html>
<html>
<head><link rel="stylesheet" href="styles.css"></head>
<body>
  <button onclick="toggleTheme()">Toggle Theme</button>
  <div class="chain-card">
    <h2>Theme Demo</h2>
    <p>No framework needed. Just static CSS + one attribute.</p>
    <button class="chain-btn">Click Me</button>
  </div>
  <script>
    const saved = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', saved)

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme')
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
    }
  </script>
</body>
</html>`}</code></pre>

      <h2 className={sectionHeading}>Theme Toggle — Vue</h2>

      <pre className={codeBlock}><code className="language-html">{`<script setup>
import { ref, watchEffect } from 'vue'
import { themedCard } from './styles.chain'

const theme = ref(localStorage.getItem('theme') || 'light')

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
})
</script>

<template>
  <button @click="theme = theme === 'light' ? 'dark' : 'light'">
    Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
  </button>
  <div :class="themedCard">
    <h2>Current theme: {{ theme }}</h2>
  </div>
</template>`}</code></pre>

      <h2 className={sectionHeading}>How It Works</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>theme</code> wrapper tells ChainCSS to generate
        CSS rules scoped to <code className={inlineCode}>[data-theme="..."]</code> ancestor
        selectors. When you change the attribute on <code className={inlineCode}>&lt;html&gt;</code>,
        every themed component on the page switches at once:
      </p>

      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Build time</strong> — ChainCSS generates CSS rules for every theme variant</li>
        <li><strong>Page load</strong> — Read saved theme from <code className={inlineCode}>localStorage</code>, set <code className={inlineCode}>data-theme</code> attribute</li>
        <li><strong>Toggle</strong> — Change the attribute, browser applies the other CSS rules</li>
        <li><strong>Persistence</strong> — Save choice to <code className={inlineCode}>localStorage</code> for next visit</li>
      </ol>

      <h2 className={sectionHeading}>Theme Keys</h2>
      <p className={paragraph}>
        Any key works — <code className={inlineCode}>light</code> and{' '}
        <code className={inlineCode}>dark</code> are just conventions. You can use
        brand names, user preferences, or any identifier:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .background({ color: { theme: { 
    light: '#fff',
    dark: '#1e293b',
    'high-contrast': '#000',
    acme: '#faf5ff'      // brand-specific theme
  } } })
  .$el('card')`}</code></pre>

      <h2 className={sectionHeading}>Multiple Properties Per Theme</h2>
      <p className={paragraph}>
        Every property supports the <code className={inlineCode}>theme</code> wrapper.
        Properties with the same theme keys share CSS rules:
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`chain()
  .background({ color: { theme: { light: '#fff', dark: '#1e293b' } } })
  .typography({ color: { theme: { light: '#111', dark: '#e2e8f0' } } })
  .shadow({ box: { theme: { light: '0 2px 8px rgba(0,0,0,0.1)', dark: '0 2px 8px rgba(0,0,0,0.4)' } } })
  .$el('card')

// All dark overrides in one block:
// [data-theme="dark"] .chain-card {
//   background-color: #1e293b;
//   color: #e2e8f0;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.4);
// }`}</code></pre>

      <h2 className={sectionHeading}>Comparison: Theme vs Mixed Mode</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}></th>
            <th className={docTh}>Theme Switching</th>
            <th className={docTh}>Mixed Mode (chain.dynamic)</th>
          </tr></thead>
          <tbody>{[
            ['Runtime cost', 'Zero — pure CSS', 'CSS custom properties set via JS'],
            ['Number of themes', 'Known at build time', 'Unlimited (dynamic)'],
            ['Toggle mechanism', 'data-theme attribute', 'useChainStyles() hook'],
            ['Best for', 'Light/dark mode, brand themes', 'User preferences, real-time state'],
            ['CSS output', 'One rule per theme variant', 'var() placeholders + JS functions'],
          ].map(([aspect, theme, mixed], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{aspect}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{theme}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{mixed}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Combine with system preference:</strong> Use{' '}
        <code className={inlineCode}>.media('(prefers-color-scheme: dark)')</code> for the
        automatic OS-level theme, and <code className={inlineCode}>.theme</code> for manual
        user overrides. The cascade handles conflicts — explicit attributes override
        media queries. See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for
        truly dynamic theming and{' '}
        <a href="/docs/tokens/theme-contracts" style={{ color: '#818cf8' }}>Theme Contracts</a> for
        type-safe theme definitions.
      </div>
    </>
  );
}