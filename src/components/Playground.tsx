import { useState } from 'react'
import { useChainStyles } from 'chaincss/runtime'
import {
  playgroundSection, wrapper, panel, panelTitle, runButton,
  tabs, codeDisplay, outputDisplay,
  demoSection, demoDescription, controlBar,
  themeToggle, counterBadge, previewCard,
  previewTitle, previewText,
  infoBox, infoTitle, infoList
} from '../styles/playground.chain'

const DEFAULT_STATIC = `chain()
  .flex({ direction: 'column', gap: 16 })
  .box({ padding: 24, borderRadius: 12 })
  .background({ color: '#1e293b' })
  .typography({ color: '#e2e8f0' })
  .$el('my-card')`

const DEFAULT_DYNAMIC = `chain.dynamic()
  .box({ padding: 24, borderRadius: 12 })
  .background({ color: (ctx) => ctx.isDark ? '#1e293b' : '#f8fafc' })
  .typography({ color: (ctx) => ctx.isDark ? '#f1f5f9' : '#0f172a' })
  .shadow({ box: (ctx) => ctx.isDark
    ? '0 10px 60px rgba(0,0,0,0.5)'
    : '0 4px 12px rgba(0,0,0,0.1)'
  })
  .$el('dynamic-card')`

const TAB_STYLE = {
  padding: '10px 20px',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.15s ease',
}

function compileStatic(code: string): string {
  const props: string[] = []
  const lines = code.split('\n')
  for (const line of lines) {
    const match = line.match(/\.(\w+)\((.+)\)/)
    if (match) {
      const [, prop, value] = match
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      const cleanValue = value.replace(/['"]/g, '').replace(/^`|`$/g, '')
      if (prop === 'gap') props.push(`  ${cssProp}: ${cleanValue}px;`)
      else if (prop === 'padding' || prop === 'borderRadius') props.push(`  ${cssProp}: ${cleanValue}px;`)
      else props.push(`  ${cssProp}: ${cleanValue};`)
    }
  }
  const className = code.match(/\$el\(['"]([^'"]+)['"]\)/)?.[1] || 'my-element'
  return `.chain-${className} {\n${props.join('\n')}\n}\n\n/* Static mode — compiled at BUILD TIME */\n/* Zero JavaScript shipped. Plain CSS file. */`
}

function compileDynamic(code: string): string {
  const props: string[] = []
  const dynamicProps: string[] = []
  const lines = code.split('\n')
  for (const line of lines) {
    const match = line.match(/\.(\w+)\((.+)\)/)
    if (match) {
      const [, prop, value] = match
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      if (value.includes('=>')) {
        props.push(`  ${cssProp}: var(--chain-${cssProp}, initial);`)
        dynamicProps.push(`  /* ${prop}: ${value.trim()} — RUNTIME */`)
      } else {
        const cleanValue = value.replace(/['"]/g, '').replace(/^`|`$/g, '')
        if (prop === 'padding' || prop === 'borderRadius') props.push(`  ${cssProp}: ${cleanValue}px;`)
        else props.push(`  ${cssProp}: ${cleanValue};`)
      }
    }
  }
  const className = code.match(/\$el\(['"]([^'"]+)['"]\)/)?.[1] || 'dynamic-card'
  return `.chain-${className} {\n${props.join('\n')}\n}\n\n/* Mixed mode — static compiled at BUILD TIME */\n${dynamicProps.join('\n')}\n/* Dynamic values update at RUNTIME via CSS variables */`
}

export default function Playground() {
  const [activeTab, setActiveTab] = useState<'static' | 'dynamic'>('static')
  const [staticCode, setStaticCode] = useState(DEFAULT_STATIC)
  const [dynamicCode, setDynamicCode] = useState(DEFAULT_DYNAMIC)
  const [output, setOutput] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)

  // Pass state as context object — no window globals needed
  const { classes: dynamicClasses, styleVars } = useChainStyles(
    { themeToggle, counterBadge, previewCard },
    { isDark, count }
  )

  const runCompile = () => {
    const result = activeTab === 'static' 
      ? compileStatic(staticCode) 
      : compileDynamic(dynamicCode)
    setOutput(result)
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={playgroundSection}>
      <h2 className={panelTitle} style={{ fontSize: 24, marginBottom: 8 }}>Live Compiler Playground</h2>
      <p className={demoDescription} style={{ marginBottom: 32 }}>
        Edit the ChainCSS code below and compile it to CSS in real time.
      </p>

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
          <div className={panelTitle}>
            {activeTab === 'static' ? 'Input: chain()' : 'Input: chain.dynamic()'}
          </div>
          <textarea
            style={{
              width: '100%',
              minHeight: 200,
              background: '#0f172a',
              borderRadius: 8,
              padding: 16,
              fontSize: 13,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              color: '#e2e8f0',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.7,
            }}
            value={activeTab === 'static' ? staticCode : dynamicCode}
            onChange={(e) => {
              if (activeTab === 'static') setStaticCode(e.target.value)
              else setDynamicCode(e.target.value)
            }}
            spellCheck={false}
          />
          <button className={runButton} onClick={runCompile}>
            Compile →
          </button>
        </div>
        <div className={panel}>
          <div className={panelTitle}>Compiled CSS Output</div>
          <div className={outputDisplay} style={{ position: 'relative' }}>
            <code style={{ fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'pre-wrap' }}>
              {output || 'Edit the code on the left and click "Compile →"'}
            </code>
            {output && (
              <button
                onClick={copyOutput}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: copied ? '#22c55e' : 'rgba(255,255,255,0.1)',
                  color: copied ? '#fff' : '#94a3b8',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 11,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Mixed Mode Demo */}
      <div className={demoSection}>
        <h2 className={panelTitle}>Live Mixed Mode Demo</h2>
        <p className={demoDescription}>
          This card uses <code style={{ color: '#818cf8' }}>chain.dynamic()</code>.
          Toggle the theme — styles update instantly via CSS custom properties.
        </p>

        <div className={controlBar}>
          <button
            className={dynamicClasses.themeToggle}
            style={styleVars}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button
            className={dynamicClasses.counterBadge}
            style={styleVars}
            onClick={() => setCount(c => c + 1)}
          >
            Clicks: {count}
          </button>
        </div>

        <div className={dynamicClasses.previewCard} style={styleVars}>
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
          <li><strong style={{ color: '#818cf8' }}>Dynamic values</strong> (background, color, shadow) applied as CSS custom properties</li>
          <li>No <code style={{ color: '#a78bfa' }}>&lt;style&gt;</code> tag injection — values swap instantly on the element</li>
          <li>Zero memory leaks, React concurrent-mode safe</li>
        </ul>
      </div>
    </div>
  )
}