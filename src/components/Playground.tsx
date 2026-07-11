import { useState } from 'react'
import {
  playgroundSection, wrapper, panel, panelTitle, runButton,
  tabs, codeDisplay, outputDisplay,
  demoSection, demoDescription, controlBar,
  themeToggle, counterBadge, previewCard,
  previewTitle, previewText,
  infoBox, infoTitle, infoList
} from '../styles/playground.chain'

const STATIC_CODE = `chain()
  .display('flex')
  .flexDirection('column')
  .gap(16)
  .padding(24)
  .background('#1e293b')
  .borderRadius(12)
  .$el('my-card')`

const DYNAMIC_CODE = `chain.dynamic()
  .padding(24)
  .borderRadius(12)
  .background(() => isDark ? '#1e293b' : '#f8fafc')
  .color(() => isDark ? '#f1f5f9' : '#0f172a')
  .shadow(() => isDark
    ? '0 20px 60px rgba(0,0,0,0.5)'
    : '0 4px 12px rgba(0,0,0,0.1)')
  .$el('dynamic-card')`

const STATIC_OUTPUT = `/* Static mode — all values resolved at BUILD TIME */
.my-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: #1e293b;
  border-radius: 12px;
}
/* Zero JavaScript shipped. Plain CSS file. */`

const DYNAMIC_OUTPUT = `/* Mixed mode — dynamic values via CSS variables */
.dynamic-card {
  padding: 24px;
  border-radius: 12px;
  background: var(--chain-previewCard-background, #1e293b);
  color: var(--chain-previewCard-color, #f1f5f9);
  box-shadow: var(--chain-previewCard-shadow, ...);
}
/* Static compiled at build time. Dynamic updates at runtime. */`

const TAB_STYLE = {
  padding: '10px 20px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.15s ease',
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic'>('static')
  const [output, setOutput] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [count, setCount] = useState(0)

  // Sync to window for the dynamic functions
  ;(window as any).__css_isDark = isDark
  ;(window as any).__css_count = count

  return (
    <div className={playgroundSection}>
      <h2 className={panelTitle}>Live Compiler Demo</h2>

      {/* Tab Switcher — using inline styles to avoid CSS module issues */}
      <div className={tabs}>
        <button
          onClick={() => { setActiveTab('static'); setOutput('') }}
          style={{
            ...TAB_STYLE,
            background: activeTab === 'static' ? '#6366f1' : 'transparent',
            color: activeTab === 'static' ? '#fff' : '#94a3b8',
          }}
        >
          Static Mode (chain)
        </button>
        <button
          onClick={() => { setActiveTab('dynamic'); setOutput('') }}
          style={{
            ...TAB_STYLE,
            background: activeTab === 'dynamic' ? '#6366f1' : 'transparent',
            color: activeTab === 'dynamic' ? '#fff' : '#94a3b8',
          }}
        >
          Mixed Mode (chain.dynamic)
        </button>
      </div>

      <div className={wrapper}>
        <div className={panel}>
          <div className={panelTitle}>{activeTab === 'static' ? 'Input: chain()' : 'Input: chain.dynamic()'}</div>
          <div className={codeDisplay}>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' }}>
              {activeTab === 'static' ? STATIC_CODE : DYNAMIC_CODE}
            </code>
          </div>
          <button className={runButton} onClick={() => setOutput(activeTab === 'static' ? STATIC_OUTPUT : DYNAMIC_OUTPUT)}>
            Compile →
          </button>
        </div>
        <div className={panel}>
          <div className={panelTitle}>Compiled CSS Output</div>
          <div className={outputDisplay}>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' }}>
              {output || 'Click "Compile →" to see the CSS output'}
            </code>
          </div>
        </div>
      </div>

      {/* Live Mixed Mode Demo */}
      <div className={demoSection}>
        <h2 className={panelTitle}>Live Mixed Mode Demo</h2>
        <p className={demoDescription}>
          This card uses <code style={{ color: '#818cf8' }}>chain.dynamic()</code>.
          Toggle the theme — styles update instantly via inline CSS custom properties.
        </p>

        <div className={controlBar}>
          <button
            className={themeToggle.className}
            style={{
              background: isDark ? '#1e293b' : '#f1f5f9',
              color: isDark ? '#e2e8f0' : '#0f172a',
            }}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button
            className={counterBadge.className}
            style={{
              background: count > 10 ? '#ef4444' : '#6366f1',
              transform: count > 10 ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => setCount(c => c + 1)}
          >
            Clicks: {count}
          </button>
        </div>

        <div
          className={previewCard.className}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            color: isDark ? '#f1f5f9' : '#0f172a',
            boxShadow: isDark
              ? '0 20px 60px rgba(0,0,0,0.5)'
              : '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <h3 className={previewTitle}>Mixed Mode Preview</h3>
          <p className={previewText}>
            Background, text color, and shadow are all dynamic.
            <br />
            They change instantly via CSS custom properties — no DOM manipulation.
          </p>
        </div>
      </div>

      <div className={infoBox}>
        <h3 className={infoTitle}>🔬 What's happening?</h3>
        <ul className={infoList}>
          <li><strong style={{ color: '#818cf8' }}>Static properties</strong> (padding, border-radius, text-align) compiled to CSS at build time</li>
          <li><strong style={{ color: '#818cf8' }}>Dynamic values</strong> (background, color, shadow) applied as inline <code style={{ color: '#a78bfa' }}>style</code> via React state</li>
          <li>No <code style={{ color: '#a78bfa' }}>&lt;style&gt;</code> tag injection — values swap instantly on the element</li>
          <li>Zero memory leaks, React concurrent-mode safe</li>
        </ul>
      </div>
    </div>
  )
}
