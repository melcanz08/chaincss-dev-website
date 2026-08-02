import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const pseudos = [
  ['hover', '.hover() ... .end()\nor .hover(c => c...)', ':hover', 'Mouse hover over element'],
  ['focus', '.focus() ... .end()\nor .focus(c => c...)', ':focus', 'Element has keyboard focus'],
  ['active', '.active() ... .end()\nor .active(c => c...)', ':active', 'Being pressed/clicked'],
  ['checked', '.checked() ... .end()\nor .checked(c => c...)', ':checked', 'Radio or checkbox is checked'],
  ['disabled', '.disabled() ... .end()\nor .disabled(c => c...)', ':disabled', 'Disabled form element'],
  ['before', '.before() ... .end()\nor .before(c => c...)', '::before', 'Insert generated content before element'],
  ['after', '.after() ... .end()\nor .after(c => c...)', '::after', 'Insert generated content after element'],
  ['placeholder', '.placeholder() ... .end()\nor .placeholder(c => c...)', '::placeholder', 'Style input placeholder text'],
];

export default function PseudoClasses() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Pseudo-Classes & Pseudo-Elements</h1>
      <p className={contentDesc}>
        Style interactive states, generated content, and form element states with
        8 pseudo-class methods. Each opens a new style context — all subsequent
        calls apply to that pseudo-class until <code className={inlineCode}>.end()</code> closes it.
      </p>

      <h2 className={sectionHeading}>Basic Usage</h2>

      <pre className={codeBlock}><code className="language-jsx">{`chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover()
    .background({ color: '#4f46e5' })
    .transform({ custom: 'translateY(-1px)' })
  .end()
  .focus()
    .outline({ width: '2px', style: 'solid', color: '#818cf8', offset: '2px' })
  .end()
  .$el('btn')`}</code></pre>

            <h2 className={sectionHeading}>Callback Style (No .end() Needed)</h2>
      <p className={paragraph}>
        Pseudo-classes accept an optional callback. The callback receives a child chain
        scoped to that pseudo-class — no <code className={inlineCode}>.end()</code> required:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// Callback style — scoped, auto-closed
chain()
  .background({ color: '#6366f1' })
  .typography({ color: '#ffffff' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .hover(c => c
    .background({ color: '#4f46e5' })
    .transform({ custom: 'translateY(-1px)' })
  )
  .focus(c => c
    .outline({ width: 2, style: 'solid', color: '#818cf8', offset: 2 })
  )
  .$el('btn')

// Stacking with callbacks
chain()
  .hover(c => c
    .background({ color: '#4f46e5' })
    .active(c2 => c2                    // :hover:active
      .background({ color: '#3730a3' })
      .transform({ custom: 'scale(0.98)' })
    )
  )
  .$el('btn')`}</code></pre>

      <p className={paragraph}>
        Both styles are fully supported — use whichever fits your codebase. The callback
        form is ideal for simple states. The fluent form (<code className={inlineCode}>.hover()...end()</code>)
        is better when you need multiple levels of stacking.
      </p>

      <h2 className={sectionHeading}>Stacking Pseudo-Classes</h2>
      <p className={paragraph}>
        You can chain multiple pseudo-classes together. Each <code className={inlineCode}>.end()</code>{' '}
        closes the current pseudo-class and returns to the parent context:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`chain()
  .typography({ color: '#ffffff' })
  .hover()                              // opens :hover
    .background({ color: '#4f46e5' })
    .active()                           // opens :active inside :hover → :hover:active
      .background({ color: '#3730a3' })
      .transform({ custom: 'scale(0.98)' })
    .end()                              // closes :active
  .end()                                // closes :hover
  .focus()
    .outline({ width: 2, color: '#818cf8' })
  .end()
  .$el('btn')

// Generated CSS:
// .chain-btn { color: #ffffff; }
// .chain-btn:hover { background-color: #4f46e5; }
// .chain-btn:hover:active { background-color: #3730a3; transform: scale(0.98); }
// .chain-btn:focus { outline: 2px solid #818cf8; }`}</code></pre>

      <h2 className={sectionHeading}>Auto-Close Behavior</h2>
      <p className={paragraph}>
        If you start a new pseudo-class without calling <code className={inlineCode}>.end()</code>,
        ChainCSS automatically closes the previous one. This keeps your code clean
        when you don't need stacking:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`// These produce the same CSS:
chain()
  .hover().background({ color: 'red' }).end()
  .focus().outline({ width: 2 }).end()
  .$el('btn')

// Auto-close — .focus() implicitly closes .hover()
chain()
  .hover().background({ color: 'red' })
  .focus().outline({ width: 2 })
  .$el('btn')`}</code></pre>

      <h2 className={sectionHeading}>Dynamic Values in Pseudo-Classes</h2>
      <p className={paragraph}>
        Pseudo-classes fully support dynamic values via <code className={inlineCode}>chain.dynamic()</code>.
        Functions receive the same context as the parent style:
      </p>

      <pre className={codeBlock}><code className="language-jsx">{`export const btn = chain.dynamic()
  .background({ color: '#6366f1' })
  .hover()
    .background({ 
      color: (ctx) => ctx.isActive ? '#3730a3' : '#4f46e5' 
    })
  .end()
  .$el('btn')`}</code></pre>

      <h2 className={sectionHeading}>All Pseudo-Classes & Pseudo-Elements</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Name</th>
            <th className={docTh}>Syntax</th>
            <th className={docTh}>CSS Selector</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{pseudos.map(([m, s, css, use]) => (
            <tr key={m}>
              <td className={docTd}><strong>{m}</strong></td>
              <td className={docTd}><code className={inlineCode}>{s}</code></td>
              <td className={docTd}><code className={inlineCode}>{css}</code></td>
              <td className={docTd}>{use}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Pro tips:</strong> Structured shorthands work inside pseudo-classes —
        you can call <code className={inlineCode}>.box()</code>, <code className={inlineCode}>.typography()</code>,{' '}
        and all 16 methods within a hover/focus/active block. Explicit <code className={inlineCode}>.end()</code>{' '}
        is recommended for readability. The accessibility validator checks that any element
        with <code className={inlineCode}>.hover()</code> also has <code className={inlineCode}>.focus()</code> or{' '}
        <code className={inlineCode}>.focus-visible</code> for keyboard users.
        See <a href="/docs/pseudo-classes" style={{ color: '#818cf8' }}>At-Rules & Nesting</a> for
        media queries and nested selectors.
      </div>
    </>
  );
}