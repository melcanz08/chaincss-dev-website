import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const pseudos = [
  ['hover','.hover() ... .end()',':hover','Mouse hover'],
  ['focus','.focus() ... .end()',':focus','Element focused'],
  ['active','.active() ... .end()',':active','Being clicked'],
  ['checked','.checked() ... .end()',':checked','Radio/checkbox checked'],
  ['disabled','.disabled() ... .end()',':disabled','Disabled form elements'],
  ['before','.before() ... .end()','::before','Insert content before'],
  ['after','.after() ... .end()','::after','Insert content after'],
  ['placeholder','.placeholder() ... .end()','::placeholder','Input placeholder text'],
];

export default function PseudoClasses() {
  usePrism([]);
  return (
    <>
      <h1 className={contentTitle}>Pseudo-Classes & Pseudo-Elements</h1>
      <p className={contentDesc}>Style interactive states with .hover(), .focus(), and more.</p>

      <h2 className={sectionHeading}>Basic Usage</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
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

      <h2 className={sectionHeading}>All Pseudo-Classes</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Syntax</th><th className={docTh}>CSS</th><th className={docTh}>Use Case</th></tr></thead>
          <tbody>{pseudos.map(([m, s, css, use]) => (
            <tr key={m}><td className={docTd}><strong>{m}</strong></td><td className={docTd}><code className={inlineCode}>{s}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{use}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Tip:</strong> ChainCSS auto-closes open pseudo-classes when you start a new one, 
        but explicit <code className={inlineCode}>.end()</code> is recommended for clarity. 
        Structured shorthands work inside pseudo-classes too.
      </div>
    </>
  );
}