import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function MixedMode() {
  return (
    <>
      <h1 className={contentTitle}>Mixed Mode: Static + Dynamic Styles</h1>
      <p className={contentDesc}>
        ChainCSS's killer feature — static properties compile away at build time,
        dynamic functions run at runtime via CSS custom properties. One API. Zero compromises.
      </p>

      <h2 className={sectionHeading}>The Problem</h2>
      <p className={paragraph}>
        Traditional CSS-in-JS libraries ship JavaScript to the browser to generate styles.
        Pure static CSS libraries can't handle dynamic values like theme changes or component state.
      </p>
      <p className={paragraph}>
        ChainCSS gives you both: static properties become CSS at build time,
        dynamic functions update CSS custom properties at runtime — no DOM injection, no memory leaks.
      </p>

      <h2 className={sectionHeading}>Static vs Dynamic</h2>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

// ── STATIC MODE — everything compiles to CSS at build time ──
export const staticBtn = chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover().background({ color: '#4f46e5' }).end()
  .$el('btn-static')

// ── DYNAMIC MODE — static → CSS, functions → runtime ──
export const dynamicBtn = chain.dynamic()
  .box({ padding: '12px 24px', borderRadius: 8 })
  .background({ color: () => isActive ? '#6366f1' : '#a5b4fc' })
  .typography({ color: '#ffffff', fontWeight: '600' })
  .shadow({ box: () => isActive
    ? '0 8px 25px rgba(99,102,241,0.4)'
    : '0 2px 8px rgba(0,0,0,0.1)'
  })
  .$el('btn-dynamic')`}</pre>

      <h2 className={sectionHeading}>How It Works</h2>
      <p className={paragraph}>
        The compiler splits styles at build time:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2', color: '#cbd5e1' }}>
        <li><strong>Static CSS</strong> — fixed values compile to <code className={inlineCode}>.css</code> file</li>
        <li><strong>Dynamic JS</strong> — functions preserved in <code className={inlineCode}>.class.js</code>, evaluated at runtime</li>
      </ol>

      <h2 className={sectionHeading}>Using Mixed Mode in React</h2>
      <pre className={codeBlock}>{`import { useChainStyles } from 'chaincss/runtime'
import { dynamicBtn } from './button.chain'

function Button({ isActive }) {
  const { classMap, styleVars } = useChainStyles(
    { dynamicBtn },
    [isActive]
  )

  return (
    <button
      className={dynamicBtn}
      style={styleVars}  // CSS custom properties applied inline
    >
      Click me
    </button>
  )
}`}</pre>

      <h2 className={sectionHeading}>What Gets Generated</h2>
      <pre className={codeBlock}>{`/* button.css — static CSS */
.chain-btn-dynamic {
  padding: 12px 24px;
  border-radius: 8px;
  color: #ffffff;
  font-weight: 600;
  background-color: var(--chain-btn-dynamic-bg, initial);
  box-shadow: var(--chain-btn-dynamic-shadow, none);
}

/* button.class.js — dynamic functions */
export const dynamicBtn = {
  className: 'chain-btn-dynamic',
  dynamic: {
    "background-color": () => isActive ? '#6366f1' : '#a5b4fc',
    "box-shadow": () => isActive ? '0 8px 25px ...' : '0 2px 8px ...'
  }
}`}</pre>

      <h2 className={sectionHeading}>Security</h2>
      <p className={paragraph}>
        Dynamic values are applied via CSS custom properties using the browser's CSSOM 
        (<code className={inlineCode}>element.style.setProperty()</code>). This is inherently safe 
        against CSS injection — characters like <code className={inlineCode}>;</code>,{' '}
        <code className={inlineCode}>{"}"}</code>, and <code className={inlineCode}>{"{"}</code> have 
        no special meaning in custom property values.
      </p>

      <h2 className={sectionHeading}>When to Use Each Mode</h2>
      <div className={note}>
        <strong>Static mode (<code className={inlineCode}>chain()</code>)</strong> — all values known at build time, design systems, component libraries.
        <br /><br />
        <strong>Dynamic mode (<code className={inlineCode}>chain.dynamic()</code>)</strong> — values depend on state/props, theme switching, interactive components.
      </div>
    </>
  );
}