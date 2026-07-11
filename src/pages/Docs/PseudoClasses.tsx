import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const pseudos = [
  ['hover','.hover() ... .end()',':hover','Styles on mouse hover'],
  ['focus','.focus() ... .end()',':focus','Styles when element is focused'],
  ['active','.active() ... .end()',':active','Styles when element is being clicked'],
  ['checked','.checked() ... .end()',':checked','Styles for checked radio/checkbox'],
  ['disabled','.disabled() ... .end()',':disabled','Styles for disabled form elements'],
  ['before','.before() ... .end()','::before','Insert content before element'],
  ['after','.after() ... .end()','::after','Insert content after element'],
  ['placeholder','.placeholder() ... .end()','::placeholder','Style input placeholder text'],
];

export default function PseudoClasses() {
  return (
    <>
      <h1 className={contentTitle}>Pseudo-Classes & Pseudo-Elements</h1>
      <p className={contentDesc}>Style interactive states and pseudo-elements with .hover(), .focus(), and more.</p>
      <pre className={codeBlock}>{`chain()
  .bg('#6366f1').color('#ffffff')
  .hover()                   // start hover block
    .bg('#4f46e5')           // darker on hover
  .end()                     // close hover block
  .focus()
    .outline('2px solid #818cf8')
  .end()
  .$el('btn')`}</pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Syntax</th><th className={docTh}>CSS</th><th className={docTh}>Use Case</th></tr></thead>
          <tbody>{pseudos.map(([m, s, css, use]) => (
            <tr key={m}><td className={docTd}><strong>{m}</strong></td><td className={docTd}><code className={inlineCode}>{s}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{use}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <div className={note}><strong>💡 Tip:</strong> ChainCSS auto-closes open pseudo-classes when you start a new one. But explicit .end() is recommended for clarity.</div>
    </>
  );
}
