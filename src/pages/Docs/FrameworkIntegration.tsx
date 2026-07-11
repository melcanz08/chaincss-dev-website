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
        Dedicated hooks for React, Vue, Svelte, and Solid for dynamic styles.
      </p>

      <h2 className={sectionHeading}>React</h2>
      <p className={paragraph}>
        Static styles work out of the box. For dynamic styles, use <code className={inlineCode}>useChainStyles</code>:
      </p>
      <pre className={codeBlock}>{`import { useChainStyles, cx } from 'chaincss/runtime'
import { btn, dynamicBtn } from './button.chain'

function Button({ isActive, children }) {
  const { classMap, styleVars } = useChainStyles(
    { dynamicBtn },
    [isActive]
  )

  return (
    <button
      className={cx(btn, classMap.dynamicBtn)}
      style={styleVars}
    >
      {children}
    </button>
  )
}`}</pre>
      <h3 className={sectionHeading}>React Exports</h3>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', color: '#cbd5e1' }}>
        <li><code className={inlineCode}>useChainStyles(styles, deps)</code> — Dynamic style hook</li>
        <li><code className={inlineCode}>useChainStylesApplied(styles, deps)</code> — Returns merged className + style</li>
        <li><code className={inlineCode}>cx(...classes)</code> — ClassName utility (like clsx)</li>
        <li><code className={inlineCode}>createStyledComponent(tag, style)</code> — Styled component factory</li>
        <li><code className={inlineCode}>withChainStyles(Component, styles)</code> — HOC wrapper</li>
        <li><code className={inlineCode}>ChainCSSGlobal</code> — Inject global styles</li>
      </ul>

      <h2 className={sectionHeading}>Vue</h2>
      <p className={paragraph}>
        Static styles work directly. For dynamic styles, evaluate in <code className={inlineCode}>setup()</code>:
      </p>
      <pre className={codeBlock}>{`import { ref } from 'vue'
import { btn, dynamicBtn } from './button.chain'

export default {
  setup() {
    const isActive = ref(false)
    return () => h('button', {
      class: isActive.value ? dynamicBtn : btn
    }, 'Click me')
  }
}`}</pre>

      <h2 className={sectionHeading}>Svelte</h2>
      <pre className={codeBlock}>{`<script>
  import { btn, dynamicBtn } from './button.chain'
  let isActive = false
</script>

<button class={isActive ? dynamicBtn : btn}>
  Click me
</button>`}</pre>

      <h2 className={sectionHeading}>SolidJS</h2>
      <pre className={codeBlock}>{`import { createSignal } from 'solid-js'
import { btn, dynamicBtn } from './button.chain'

function Button() {
  const [isActive, setIsActive] = createSignal(false)
  return (
    <button class={isActive() ? dynamicBtn : btn}>
      Click me
    </button>
  )
}`}</pre>

      <div className={note}>
        <strong>🌐 Universal:</strong> ChainCSS outputs plain CSS strings. Even vanilla HTML works — just import the generated <code className={inlineCode}>.css</code> file. Framework hooks are only needed for <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> dynamic styles.
      </div>
    </>
  );
}
