import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const pseudos = [
  ['hover', ':hover', 'Mouse hover over element'],
  ['focus', ':focus', 'Element has keyboard focus'],
  ['active', ':active', 'Being pressed/clicked'],
  ['checked', ':checked', 'Radio or checkbox is checked'],
  ['disabled', ':disabled', 'Disabled form element'],
  ['visited', ':visited', 'Link has been visited'],
  ['link', ':link', 'Unvisited link'],
  ['focus-within', ':focus-within', 'Element or child has focus'],
  ['focus-visible', ':focus-visible', 'Keyboard focus (not mouse)'],
  ['first-child', ':first-child', 'First child of parent'],
  ['last-child', ':last-child', 'Last child of parent'],
  ['nth-child(2n+1)', ':nth-child(2n+1)', 'Odd children'],
  ['before', '::before', 'Insert generated content before'],
  ['after', '::after', 'Insert generated content after'],
  ['placeholder', '::placeholder', 'Style input placeholder'],
  ['selection', '::selection', 'Style selected text'],
  ['marker', '::marker', 'Style list markers'],
];

export default function PseudoClasses() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Pseudo-Classes & Pseudo-Elements</h1>
      <p className={contentDesc}>
        Style interactive states, generated content, and form element states with the
        unified <code className={inlineCode}>.pseudo()</code> method. Or use the legacy
        fluent methods (<code className={inlineCode}>.hover()</code>, <code className={inlineCode}>.focus()</code>, etc.)
        for backward compatibility.
      </p>

      {/* ============================================================ */}
      {/* NEW: Unified pseudo() method */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Unified Method: .pseudo()</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>.pseudo()</code> method accepts an object where keys are
        pseudo-class names and values are style objects. This is the recommended way to
        write pseudo-classes in ChainCSS v2.15+:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .background({ color: '#6366f1' })
  .box({ padding: '12px 24px', borderRadius: 8 })
  .pseudo({
    hover: {
      background: '#4f46e5',
      transform: 'translateY(-1px)'
    },
    focus: {
      outline: '2px solid #818cf8'
    },
    active: {
      transform: 'scale(0.95)'
    }
  })
  .$el('btn')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-btn {
  background-color: #6366f1;
  padding: 12px 24px;
  border-radius: 8px;
}
.chain-btn:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
}
.chain-btn:focus {
  outline: 2px solid #818cf8;
}
.chain-btn:active {
  transform: scale(0.95);
}`}</code></pre>

      {/* Functional pseudo-classes */}
      <h2 className={sectionHeading}>Functional Pseudo-Classes</h2>
      <p className={paragraph}>
        Need <code className={inlineCode}>:nth-child()</code> or <code className={inlineCode}>:not()</code>?
        Just include the full selector in the key:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .box({ padding: 16 })
  .pseudo({
    'nth-child(2n+1)': {
      background: '#f0f0f0'
    },
    'not(:last-child)': {
      marginBottom: 8
    }
  })
  .$el('list')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-list {
  padding: 16px;
}
.chain-list:nth-child(2n+1) {
  background: #f0f0f0;
}
.chain-list:not(:last-child) {
  margin-bottom: 8px;
}`}</code></pre>

      {/* Pseudo-elements */}
      <h2 className={sectionHeading}>Pseudo-Elements</h2>
      <p className={paragraph}>
        Use <code className={inlineCode}>::</code> prefix for pseudo-elements:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .box({ padding: 16 })
  .pseudo({
    '::before': {
      content: '"→"',
      marginRight: 8
    },
    '::after': {
      content: '"←"',
      marginLeft: 8
    }
  })
  .$el('element')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
.chain-element {
  padding: 16px;
}
.chain-element::before {
  content: "→";
  margin-right: 8px;
}
.chain-element::after {
  content: "←";
  margin-left: 8px;
}`}</code></pre>

      {/* ============================================================ */}
      {/* Legacy fluent methods */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Legacy Fluent Methods (Backward Compatible)</h2>
      <p className={paragraph}>
        The older fluent API still works. Each method opens a style context and
        <code className={inlineCode}>.end()</code> closes it:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .background({ color: '#6366f1' })
  .hover()
    .background({ color: '#4f46e5' })
  .end()
  .focus()
    .outline({ width: 2, color: '#818cf8' })
  .end()
  .$el('btn')`}</code></pre>

      <p className={paragraph}>
        You can also use the callback style — no <code className={inlineCode}>.end()</code> required:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .background({ color: '#6366f1' })
  .hover(c => c
    .background({ color: '#4f46e5' })
  )
  .focus(c => c
    .outline({ width: 2, color: '#818cf8' })
  )
  .$el('btn')`}</code></pre>

      {/* ============================================================ */}
      {/* All pseudo-classes table */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>All Supported Pseudo-Classes & Pseudo-Elements</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Name</th>
            <th className={docTh}>CSS Selector</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{pseudos.map(([m, css, use]) => (
            <tr key={m}>
              <td className={docTd}><strong>{m}</strong></td>
              <td className={docTd}><code className={inlineCode}>{css}</code></td>
              <td className={docTd}>{use}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Pro tips:</strong> The <code className={inlineCode}>.pseudo()</code> method is the
        recommended way to write pseudo-classes. It's more readable, more maintainable,
        and supports all CSS pseudo-classes and pseudo-elements. The legacy fluent methods
        still work for backward compatibility.
        See <a href="/docs/at-rules" style={{ color: '#818cf8' }}>At-Rules & Nesting</a> for
        the unified <code className={inlineCode}>.atrule()</code> method.
      </div>
    </>
  );
}