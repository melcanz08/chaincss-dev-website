import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function FrameworkIntegration() {
  return (
    <>
      <h1 className={contentTitle}>Framework Integration</h1>
      <p className={contentDesc}>
        ChainCSS compiles to plain CSS — works with any framework.
        Static styles need zero JavaScript. Dynamic styles use CSS custom properties
        applied via each framework's native mechanisms.
      </p>

      {/* ── React ─────────────────────────────────────────── */}
      <h2 className={sectionHeading}>React</h2>
      <p className={paragraph}>
        React has first-class support via <code className={inlineCode}>useChainStyles</code>.
        Pass your state as a context object — it returns <code className={inlineCode}>classes</code> and <code className={inlineCode}>styleVars</code> ready for JSX.
      </p>
      <pre className={codeBlock}>{`import { useState } from 'react'
import { useChainStyles } from 'chaincss/runtime'
import { themeToggle, counterBadge } from './playground.chain'

function Demo() {
  const [isDark, setIsDark] = useState(true)
  const [count, setCount] = useState(0)

  const { classes, styleVars } = useChainStyles(
    { themeToggle, counterBadge },
    { isDark, count }  // ← context passed to dynamic functions
  )

  return (
    <>
      <button className={classes.themeToggle} style={styleVars}
        onClick={() => setIsDark(!isDark)}>
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </button>
      <button className={classes.counterBadge} style={styleVars}
        onClick={() => setCount(c => c + 1)}>
        Clicks: {count}
      </button>
    </>
  )
}`}</pre>

      <h3 className={sectionHeading}>React Exports</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', color: '#cbd5e1' }}>
        <li><code className={inlineCode}>useChainStyles(styles, deps)</code> — Dynamic style hook with context</li>
        <li><code className={inlineCode}>useChainStylesApplied(styles, deps)</code> — Returns merged className + style</li>
        <li><code className={inlineCode}>cx(...classes)</code> — ClassName utility</li>
        <li><code className={inlineCode}>createStyledComponent(tag, style)</code> — Styled component factory</li>
        <li><code className={inlineCode}>withChainStyles(Component, styles)</code> — HOC wrapper</li>
      </ul>

      {/* ── Vue ──────────────────────────────────────────── */}
      <h2 className={sectionHeading}>Vue</h2>
      <p className={paragraph}>
        Static styles work as class names. For dynamic styles, use a template ref
        and apply CSS custom properties via <code className={inlineCode}>style.setProperty()</code>.
        Vue's <code className={inlineCode}>:style</code> binding does not handle CSS custom properties.
      </p>
      <pre className={codeBlock}>{`<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { themeToggle } from './theme.chain'

const isDark = ref(true)
const btnRef = ref<HTMLButtonElement | null>(null)

const applyStyle = () => {
  if (!btnRef.value || !themeToggle.dynamic) return
  const ctx = { isDark: isDark.value }
  const className = themeToggle.className
  for (const [prop, fn] of Object.entries(themeToggle.dynamic)) {
    const value = (fn as Function)(ctx)
    const kebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
    btnRef.value.style.setProperty(
      \`--\${className}-\${kebab}\`, String(value)
    )
  }
}

onMounted(() => applyStyle())
watch(isDark, () => applyStyle())
</script>

<template>
  <button ref="btnRef" :class="themeToggle.className"
    @click="isDark = !isDark">
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>`}</pre>

      {/* ── Svelte ───────────────────────────────────────── */}
      <h2 className={sectionHeading}>Svelte</h2>
      <p className={paragraph}>
        For SvelteKit, import the generated <code className={inlineCode}>.css</code> file directly.
        Use <code className={inlineCode}>$effect</code> to reactively apply CSS custom properties.
      </p>
      <pre className={codeBlock}>{`<script lang="ts">
  import './theme.css'  // ← Import generated CSS (SvelteKit requirement)
  import { themeToggle } from './theme.chain'

  let isDark = $state(true)
  let btnEl: HTMLButtonElement | undefined = $state()

  $effect(() => {
    if (!btnEl || !themeToggle.dynamic) return
    const ctx = { isDark }
    const className = themeToggle.className
    for (const [prop, fn] of Object.entries(themeToggle.dynamic)) {
      const value = (fn as Function)(ctx)
      const kebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      btnEl.style.setProperty(
        \`--\${className}-\${kebab}\`, String(value)
      )
    }
  })
</script>

<button bind:this={btnEl} class="chain-theme-toggle"
  onclick={() => isDark = !isDark}>
  {isDark ? '🌙 Dark' : '☀️ Light'}
</button>`}</pre>

      {/* ── Solid ────────────────────────────────────────── */}
      <h2 className={sectionHeading}>SolidJS</h2>
      <p className={paragraph}>
        Use a ref callback and apply CSS custom properties on mount and after state changes.
      </p>
      <pre className={codeBlock}>{`import { createSignal, onMount } from 'solid-js'
import { themeToggle } from './theme.chain'

function ThemeToggle() {
  const [isDark, setIsDark] = createSignal(true)
  let btnEl!: HTMLButtonElement

  const applyStyle = () => {
    if (!btnEl || !themeToggle.dynamic) return
    const ctx = { isDark: isDark() }
    const className = themeToggle.className
    for (const [prop, fn] of Object.entries(themeToggle.dynamic)) {
      const value = (fn as Function)(ctx)
      const kebab = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
      btnEl.style.setProperty(
        \`--\${className}-\${kebab}\`, String(value)
      )
    }
  }

  onMount(() => applyStyle())

  return (
    <button ref={btnEl} class="chain-theme-toggle"
      onClick={() => { setIsDark(!isDark()); applyStyle() }}>
      {isDark() ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}`}</pre>

      {/* ── Static-only ──────────────────────────────────── */}
      <h2 className={sectionHeading}>Static Styles — No JavaScript Needed</h2>
      <p className={paragraph}>
        For static styles (<code className={inlineCode}>chain()</code>), just import the class name.
        Works in any framework, even vanilla HTML. Zero runtime JavaScript.
      </p>
      <pre className={codeBlock}>{`// button.chain.ts
export const btn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#fff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover().background({ color: '#4f46e5' }).end()
  .$el('button')

// Usage — any framework
import { btn } from './button.chain'
<button className={btn}>Click me</button>`}</pre>

      <div className={note}>
        <strong>🌐 Universal:</strong> ChainCSS outputs plain CSS. Static styles work everywhere — React, Vue, Svelte, Solid, or vanilla HTML.
        Dynamic styles use CSS custom properties applied via each framework's native DOM APIs.
        See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for details on the static + dynamic split.
      </div>
    </>
  );
}