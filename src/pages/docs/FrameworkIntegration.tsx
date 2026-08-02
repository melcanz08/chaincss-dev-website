import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function FrameworkIntegration() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Framework Integration</h1>
      <p className={contentDesc}>
        ChainCSS works with React, Vue, Svelte, and Solid through a single{' '}
        <code className={inlineCode}>useChainStyles</code> hook that respects each framework's
        reactivity model. Static styles compile to zero-runtime CSS. Dynamic styles use
        CSS custom properties — no DOM injection, no memory leaks.
      </p>

      <h2 className={sectionHeading}>The Universal Pattern</h2>
      <p className={paragraph}>
        Every framework adapter follows the same three-step pattern:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>Extract <strong>className</strong> from the compiled style definition</li>
        <li>Call <strong>dynamic functions</strong> with component state/props as context</li>
        <li>Return <strong>CSS custom properties</strong> as <code className={inlineCode}>styleVars</code></li>
      </ol>

      <pre className={codeBlock}><code className="language-ts">{`// Every framework returns the same shape:
const { classes, styleVars } = useChainStyles(styles, deps)

// classes = { btn: 'chain-btn', card: 'chain-card' }
// styleVars = {
//   '--chain-btn-background-color': '#6366f1',
//   '--chain-btn-box-shadow': '0 8px 25px rgba(99,102,241,0.4)'
// }`}</code></pre>

      <h2 className={sectionHeading}>React</h2>
      <p className={paragraph}>
        Uses <code className={inlineCode}>useMemo</code> for dependency tracking.
        Re-evaluates only when <code className={inlineCode}>deps</code> values change.
      </p>

      <pre className={codeBlock}><code className="language-tsx">{`import { useChainStyles } from 'chaincss/runtime'
import { themeToggle, counterBadge } from './styles/playground.chain'

function Playground() {
  const [isDark, setIsDark] = useState(true)
  const [count, setCount] = useState(0)

  // Static styles → just class names. No runtime cost.
  // Dynamic styles → CSS custom properties. Functions called with { isDark, count }.
  const { classes, styleVars } = useChainStyles(
    { themeToggle, counterBadge },
    { isDark, count }  // ← passed to dynamic functions as (ctx)
  )

  return (
    <>
      <button
        className={classes.themeToggle}
        style={styleVars}
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </button>
      <button
        className={classes.counterBadge}
        style={styleVars}
        onClick={() => setCount(c => c + 1)}
      >
        Clicks: {count}
      </button>
    </>
  )
}`}</code></pre>

      <div className={note}>
        <strong>React concurrent mode safe:</strong> Dynamic values are applied via{' '}
        <code className={inlineCode}>style={"{{}}"}</code> attributes — CSS custom properties.
        No DOM mutation, no style tag injection. React can pause and resume rendering
        without corrupting the stylesheet.
      </div>

      <h2 className={sectionHeading}>Vue</h2>
      <p className={paragraph}>
        Uses <code className={inlineCode}>ref()</code> and <code className={inlineCode}>watch()</code>.
        Vue refs are auto-unwrapped — pass them directly.
      </p>

      <pre className={codeBlock}><code className="language-html">{`<script setup>
import { ref } from 'vue'
import { useChainStyles } from 'chaincss/runtime'
import { themeToggle, counterBadge } from './styles/playground.chain'

const isDark = ref(true)
const count = ref(0)

// Vue refs auto-unwrapped inside useChainStyles
const { classes, styleVars } = useChainStyles(
  { themeToggle, counterBadge },
  { isDark, count }  // ← refs, not .value!
)
</script>

<template>
  <button
    :class="classes.themeToggle"
    :style="styleVars"
    @click="isDark = !isDark"
  >
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
  <button
    :class="classes.counterBadge"
    :style="styleVars"
    @click="count++"
  >
    Clicks: {{ count }}
  </button>
</template>`}</code></pre>

      <div className={note}>
        <strong>Auto-unwrap:</strong> Pass Vue <code className={inlineCode}>ref()</code> objects directly —
        no <code className={inlineCode}>.value</code> needed. The adapter detects refs and unwraps them
        automatically when building the context object.
      </div>

      <h2 className={sectionHeading}>Svelte</h2>
      <p className={paragraph}>
        Uses Svelte stores for reactivity. Subscribe to context changes
        and re-evaluate dynamic styles automatically.
      </p>

      <pre className={codeBlock}><code className="language-html">{`<script>
import { writable } from 'svelte/store'
import { useChainStyles } from 'chaincss/runtime'
import { themeToggle, counterBadge } from './styles/playground.chain'

const isDark = writable(true)
const count = writable(0)

// Svelte stores auto-subscribed
const { classes, styleVars } = useChainStyles(
  { themeToggle, counterBadge },
  { isDark, count }  // ← stores, not $isDark!
)
</script>

<button
  class={$classes.themeToggle}
  style={Object.entries($styleVars).map(([k, v]) => \`\${k}: \${v}\`).join('; ')}
  on:click={() => $isDark = !$isDark}
>
  {$isDark ? '🌙 Dark' : '☀️ Light'}
</button>
<button
  class={$classes.counterBadge}
  style={Object.entries($styleVars).map(([k, v]) => \`\${k}: \${v}\`).join('; ')}
  on:click={() => $count++}
>
  Clicks: {$count}
</button>`}</code></pre>

      <div className={note}>
        <strong>Svelte 4 & 5 compatible:</strong> The adapter uses the store contract
        (<code className={inlineCode}>subscribe</code>) which works in both Svelte 4 and the
        new runes-based Svelte 5.
      </div>

      <h2 className={sectionHeading}>Solid</h2>
      <p className={paragraph}>
        Uses <code className={inlineCode}>createMemo</code> for automatic dependency tracking.
        Solid signals are auto-unwrapped — pass the signal function directly.
      </p>

      <pre className={codeBlock}><code className="language-tsx">{`import { createSignal } from 'solid-js'
import { useChainStyles } from 'chaincss/runtime'
import { themeToggle, counterBadge } from './styles/playground.chain'

function Playground() {
  const [isDark, setIsDark] = createSignal(true)
  const [count, setCount] = createSignal(0)

  // Solid signals auto-unwrapped — createMemo tracks access automatically
  const { classes, styleVars } = useChainStyles(
    { themeToggle, counterBadge },
    { isDark, count }  // ← signals, not isDark()!
  )

  return (
    <>
      <button
        class={classes().themeToggle}
        style={styleVars()}
        onClick={() => setIsDark(!isDark())}
      >
        {isDark() ? '🌙 Dark' : '☀️ Light'}
      </button>
      <button
        class={classes().counterBadge}
        style={styleVars()}
        onClick={() => setCount(c => c + 1)}
      >
        Clicks: {count()}
      </button>
    </>
  )
}`}</code></pre>

      <div className={note}>
        <strong>Fine-grained reactivity:</strong> Solid's <code className={inlineCode}>createMemo</code> tracks
        exactly which signals are accessed. If only <code className={inlineCode}>isDark</code> changes,
        only the dynamic functions that read <code className={inlineCode}>ctx.isDark</code> re-evaluate.
        Functions that only read <code className={inlineCode}>ctx.count</code> are skipped.
      </div>

      <h2 className={sectionHeading}>Reactivity Comparison</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Framework</th>
            <th className={docTh}>State Container</th>
            <th className={docTh}>Change Detection</th>
            <th className={docTh}>Re-evaluation Trigger</th>
          </tr></thead>
          <tbody>{[
            ['React', 'useMemo deps array', 'Reference equality', '[...depValues] changes'],
            ['Vue', 'ref() + watch()', 'Proxy-based', 'Watch source array'],
            ['Svelte', 'writable() store', 'Subscription', '.subscribe() callback'],
            ['Solid', 'createMemo()', 'Automatic tracking', 'Signal access inside memo'],
          ].map(([fw, container, detection, trigger], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{fw}</strong></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{container}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{detection}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{trigger}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Static-Only Components</h2>
      <p className={paragraph}>
        If a component uses only static styles (no <code className={inlineCode}>chain.dynamic()</code>),
        you don't need <code className={inlineCode}>useChainStyles</code> at all. Import the class
        name directly:
      </p>

      <pre className={codeBlock}><code className="language-tsx">{`// button.chain.ts — all static
export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .$el('btn')

// Button.tsx — no useChainStyles needed
import { btn } from './button.chain'

function Button() {
  return <button className={btn}>Click</button>
  // btn is just a string: 'chain-btn'
}`}</code></pre>

      <h2 className={sectionHeading}>Dynamic Context Pattern</h2>
      <p className={paragraph}>
        Dynamic functions receive a context object. The shape is whatever you pass
        as the second argument to <code className={inlineCode}>useChainStyles</code>:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Styles defined with chain.dynamic()
export const themedCard = chain.dynamic()
  .raw({
    backgroundColor: (ctx) => ctx.isDark ? '#1e293b' : '#f1f5f9',
    color: (ctx) => ctx.isDark ? '#e2e8f0' : '#0f172a',
    // ctx can contain anything you pass
    borderWidth: (ctx) => ctx.isFeatured ? '2px' : '1px',
    borderColor: (ctx) => ctx.isFeatured ? ctx.accentColor : '#e2e8f0',
  })
  .$el('card')

// Component
function Card({ isDark, isFeatured, accentColor }) {
  const { classes, styleVars } = useChainStyles(
    { themedCard },
    { isDark, isFeatured, accentColor }
    // ↑ These become the ctx object passed to each function
  )
  
  return <div className={classes.themedCard} style={styleVars}>...</div>
}`}</code></pre>

      <h2 className={sectionHeading}>Lazy-Loaded Dependencies</h2>
      <p className={paragraph}>
        Framework adapters don't crash if the framework isn't installed. They use
        dynamic <code className={inlineCode}>require()</code> with no-op fallbacks:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Vue adapter — no static import of 'vue'
let _vue: any = null
function getVue(): any {
  if (_vueLoaded) return _vue
  try {
    _vue = require('vue')  // ← only loads if Vue is installed
  } catch {
    _vue = {
      ref: (v: any) => ({ value: v }),
      computed: (fn: any) => ({ get value() { return fn() } }),
      // ... no-op fallbacks for every Vue API used
    }
  }
  _vueLoaded = true
  return _vue
}`}</code></pre>

      <div className={note}>
        <strong>💡 Bundle optimization:</strong> Import from <code className={inlineCode}>chaincss/runtime</code> to
        get framework-specific adapters. Your bundler tree-shakes adapters for frameworks
        you don't use. A React project won't ship the Vue, Svelte, or Solid adapter code.
        See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for the
        dynamic styling system these adapters power.
      </div>
    </>
  );
}