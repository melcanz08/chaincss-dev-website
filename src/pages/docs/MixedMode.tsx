import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function MixedMode() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Mixed Mode: Static + Dynamic Styles & Opt-in Runtime</h1>
      <p className={contentDesc}>
        ChainCSS's headline feature — static properties compile to zero-runtime CSS,
        dynamic functions run at runtime via CSS custom properties.{' '}
        <strong>Both in the same style definition, same API, per-property granularity.</strong>
        No other CSS tool does this.
      </p>

      <h2 className={sectionHeading}>The Problem</h2>
      <p className={paragraph}>
        Every CSS-in-JS library forces you to choose:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Runtime libraries</strong> (Styled Components, Emotion) — ship JavaScript for every style. Dynamic but slow.</li>
        <li><strong>Build-time libraries</strong> (Vanilla Extract, Panda CSS) — compile to static CSS. Fast but can't handle dynamic values without a separate API.</li>
      </ul>
      <p className={paragraph}>
        ChainCSS is the only library that lets you mix both in a single style definition.
        Static values become CSS at build time. Dynamic values become CSS custom properties
        resolved at runtime. <strong>Same API. Zero compromises.</strong>
      </p>

      <h2 className={sectionHeading}>Per-Property Granularity</h2>
      <p className={paragraph}>
        The key insight: classification happens per-property, not per-style-definition.
        A single component can have 10 static properties and 2 dynamic ones — the static
        ones ship in CSS, only the dynamic ones touch JavaScript at runtime.
      </p>

      <pre className={codeBlock}><code className="language-javascript">{`import { chain } from 'chaincss'

export const btn = chain.dynamic()
  .box({ padding: '12px 24px', borderRadius: 8 })                          // → static CSS
  .typography({ fontWeight: '600', fontSize: 14 })                          // → static CSS
  .transition({ tr: 'all 0.2s ease' })                                      // → static CSS
  .background({ color: (ctx) => ctx.isActive ? '#6366f1' : '#a5b4fc' })    // → runtime var
  .shadow({ box: (ctx) => ctx.isActive                                      // → runtime var
    ? '0 8px 25px rgba(99,102,241,0.4)'
    : '0 2px 8px rgba(0,0,0,0.1)'
  })
  .hover()
    .background({ color: '#4f46e5' })                                       // → static CSS
  .end()
  .$el('btn')`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Property</th>
            <th className={docTh}>Value</th>
            <th className={docTh}>Classification</th>
            <th className={docTh}>Output</th>
          </tr></thead>
          <tbody>{[
            ['padding', "'12px 24px'", 'Static', 'padding: 12px 24px; in CSS file'],
            ['borderRadius', '8', 'Static', 'border-radius: 8px; in CSS file'],
            ['fontWeight', "'600'", 'Static', 'font-weight: 600; in CSS file'],
            ['fontSize', '14', 'Static', 'font-size: 14px; in CSS file'],
            ['transition', "'all 0.2s ease'", 'Static', 'transition: all 0.2s ease; in CSS file'],
            ['backgroundColor', '(ctx) => ...', 'Dynamic', 'var(--chain-btn-backgroundColor) + JS function'],
            ['boxShadow', '(ctx) => ...', 'Dynamic', 'var(--chain-btn-boxShadow) + JS function'],
            [':hover background', "'#4f46e5'", 'Static', 'background-color: #4f46e5; in CSS file'],
          ].map(([prop, value, classification, output], i) => (
            <tr key={i}>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{prop}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{value}</td>
              <td className={docTd}>
                <span style={{ 
                  color: classification === 'Static' ? '#4ade80' : '#fbbf24',
                  fontWeight: 600,
                  fontSize: 13
                }}>{classification}</span>
              </td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{output}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>What Gets Generated</h2>

      <pre className={codeBlock}><code className="language-css">{`/* button.css — 10 static declarations + 2 var() placeholders */
.chain-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: var(--chain-btn-backgroundColor);
  box-shadow: var(--chain-btn-boxShadow);
}
.chain-btn:hover {
  background-color: #4f46e5;
}`}</code></pre>

      <pre className={codeBlock}><code className="language-javascript">{`// button.class.js — only the 2 dynamic functions ship
export const btn = {
  className: 'chain-btn',
  dynamic: {
    backgroundColor: (ctx) => ctx.isActive ? '#6366f1' : '#a5b4fc',
    boxShadow: (ctx) => ctx.isActive
      ? '0 8px 25px rgba(99,102,241,0.4)'
      : '0 2px 8px rgba(0,0,0,0.1)'
  }
}`}</code></pre>

      <h2 className={sectionHeading}>How It Works</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>classifyValue()</code> function runs at chain build time
        (when <code className={inlineCode}>.$el()</code> is called). It determines whether each value
        is static or dynamic:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Functions</strong> → dynamic. Preserved in <code className={inlineCode}>.class.js</code>, called at runtime.</li>
        <li><strong>Strings containing <code className={inlineCode}>$token</code> references</strong> → dynamic if tokens are unresolved.</li>
        <li><strong>Strings containing <code className={inlineCode}>theme.</code> or <code className={inlineCode}>props.</code></strong> → dynamic.</li>
        <li><strong>Everything else</strong> (numbers, plain strings, hex colors) → static. Compiled to CSS.</li>
      </ol>

      <h2 className={sectionHeading}>React</h2>

      <pre className={codeBlock}><code className="language-jsx">{`import { useChainStyles } from 'chaincss/runtime'
import { btn } from './button.chain'

function Button({ isActive }: { isActive: boolean }) {
  const { classes, styleVars } = useChainStyles(
    { btn },
    { isActive }  // ← passed to dynamic functions as (ctx)
  )

  return (
    <button 
      className={classes.btn}    // "chain-btn"
      style={styleVars}          // { "--chain-btn-backgroundColor": "#6366f1", ... }
    >
      Click
    </button>
  )
}

// When isActive changes:
// 1. React re-renders with new styleVars
// 2. Browser resolves var(--chain-btn-backgroundColor) to new value
// 3. No CSS regeneration. No style tag mutation. Just CSS custom properties.`}</code></pre>

      <h2 className={sectionHeading}>Vue</h2>

      <pre className={codeBlock}><code className="language-html">{`<script setup>
import { ref } from 'vue'
import { useChainStyles } from 'chaincss/runtime'
import { btn } from './button.chain'

const isActive = ref(true)

// Vue refs auto-unwrapped — no .value needed
const { classes, styleVars } = useChainStyles(
  { btn },
  { isActive }
)
</script>

<template>
  <button :class="classes.btn" :style="styleVars" @click="isActive = !isActive">
    {{ isActive ? 'Active' : 'Inactive' }}
  </button>
</template>`}</code></pre>

      <h2 className={sectionHeading}>Svelte</h2>

      <pre className={codeBlock}><code className="language-html">{`<script>
import { writable } from 'svelte/store'
import { useChainStyles } from 'chaincss/runtime'
import { btn } from './button.chain'

const isActive = writable(true)

// Svelte stores auto-subscribed
const { classes, styleVars } = useChainStyles(
  { btn },
  { isActive }
)
</script>

<button
  class={$classes.btn}
  style={Object.entries($styleVars).map(([k, v]) => \`\${k}: \${v}\`).join('; ')}
  on:click={() => $isActive = !$isActive}
>
  {$isActive ? 'Active' : 'Inactive'}
</button>`}</code></pre>

      <h2 className={sectionHeading}>Solid</h2>

      <pre className={codeBlock}><code className="language-jsx">{`import { createSignal } from 'solid-js'
import { useChainStyles } from 'chaincss/runtime'
import { btn } from './button.chain'

function Button() {
  const [isActive, setIsActive] = createSignal(true)

  // Solid signals auto-unwrapped — createMemo tracks access automatically
  const { classes, styleVars } = useChainStyles(
    { btn },
    { isActive }
  )

  return (
    <button
      class={classes().btn}
      style={styleVars()}
      onClick={() => setIsActive(!isActive())}
    >
      {isActive() ? 'Active' : 'Inactive'}
    </button>
  )
}`}</code></pre>

      <h2 className={sectionHeading}>Static-Only Optimization</h2>
      <p className={paragraph}>
        If none of your values are dynamic, use <code className={inlineCode}>chain()</code> instead
        of <code className={inlineCode}>chain.dynamic()</code>. The output is a plain string — no
        <code className={inlineCode}>useChainStyles</code> needed:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// All static — chain() returns a string
export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .$el('btn')

// Import and use directly — zero runtime cost
import { btn } from './button.chain'
<button className={btn}>Click</button>`}</code></pre>

      <div className={note}>
        <strong>💡 When to use each:</strong> Use <code className={inlineCode}>chain()</code> for
        design system components, static layouts, and anything where values are known at
        build time. Use <code className={inlineCode}>chain.dynamic()</code> when values depend on
        props, state, theme context, or user preferences. The compiler handles the split
        automatically — you write one API, it generates the optimal output.
        See <a href="/docs/frameworks" style={{ color: '#818cf8' }}>Framework Integration</a> for
        more details on each framework adapter.
      </div>

            <h2 className={sectionHeading}>Runtime vs Build-Time: The Two Modes</h2>
      <p className={paragraph}>
        ChainCSS operates in two distinct modes. The compiler ensures your styles ship
        as zero-runtime CSS by default. The runtime API is an <strong>opt-in choice</strong>{' '}
        you make per file or per function call.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}></th>
            <th className={docTh}>Build-Time (Default)</th>
            <th className={docTh}>Runtime (Opt-In)</th>
          </tr></thead>
          <tbody>{[
            ['How it works', '.chain.ts files compiled by Vite/Webpack/CLI', 'chain() called directly in .ts/.tsx files at runtime'],
            ['When styles resolve', 'At build time — CSS file emitted', 'At runtime — class name returned immediately'],
            ['JavaScript shipped', 'Zero — only the generated CSS file', '~15KB — the ChainCSS collector library'],
            ['Use case', 'Component styles, design systems, token-based theming', 'Dynamic class name generation, devtools, pipeline visualizer'],
            ['File extension', '.chain.ts', '.ts / .tsx'],
            ['Import from', "'./styles.chain'", "'chaincss'"],
            ['Example', 'export const btn = chain().$el("btn")', 'const btn = chain().$el("btn") // runs in browser'],
          ].map(([aspect, build, runtime], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{aspect}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{build}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{runtime}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>The Default: Zero-Runtime</h3>
      <p className={paragraph}>
        When you create a <code className={inlineCode}>.chain.ts</code> file and import it
        in your component, the Vite plugin intercepts the import. The ChainCSS compiler
        runs at build time, extracts all static CSS, and replaces the file's exports with
        plain class name strings. Your component receives a string. No ChainCSS code ships
        to the browser. The CSS file is loaded once. This is the default path.
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// button.chain.ts — compiled at BUILD TIME
export const btn = chain()
  .background({ color: '#6366f1' })
  .$el('btn')

// After compilation, the Vite plugin replaces this file with:
// export const btn = 'chain-btn'

// Your component — zero ChainCSS runtime code:
import { btn } from './button.chain'
<button className={btn}>Click</button>`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>The Opt-In: Runtime API</h3>
      <p className={paragraph}>
        You can also call <code className={inlineCode}>chain()</code> directly in regular{' '}
        <code className={inlineCode}>.ts</code> or <code className={inlineCode}>.tsx</code> files.
        This is useful for generating class names dynamically, building devtools, or any
        scenario where styles need to be created at runtime. The ChainCSS collector library
        (~15KB) ships to the browser and <code className={inlineCode}>chain()</code> runs
        exactly like it does at build time — just in the browser instead of Node.js.
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// pipeline.utils.ts — runs at RUNTIME (opt-in)
import { chain } from 'chaincss'

// Factory function — generates class names on the fly
export const dot = (color: string) => chain()
  .box({ width: 8, height: 8, borderRadius: '50%' })
  .background({ color })
  .$el(\`dot-\${color.replace('#', '')}\`)

// Component calls it at runtime:
<div className={dot('#6366f1')} />`}</code></pre>

      <div className={note}>
        <strong>💡 ChainCSS remains zero-runtime by default.</strong> The runtime API is
        an opt-in choice for specific use cases. Your <code className={inlineCode}>.chain.ts</code>{' '}
        component styles never ship ChainCSS code to the browser. The runtime API exists
        for dynamic class name generation, devtools, and interactive demos — it's the same{' '}
        <code className={inlineCode}>chain()</code> function, just called in a different context.
        See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for
        how <code className={inlineCode}>chain.dynamic()</code> bridges both worlds.
      </div>

    </>
  );
}