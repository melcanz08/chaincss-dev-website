import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';
export default function AtRules() {
  usePrism([]);
  return (
    <>
      <h1 className={contentTitle}>At-Rules & Nesting</h1>
      <p className={contentDesc}>Responsive breakpoints, feature queries, container queries, layers, and nested selectors.</p>

      <h2 className={sectionHeading}>@media — Responsive Design</h2>
      <pre className={codeBlock}><code className='language-ts'>{`chain()
  .flex({ direction: 'column' })
  .box({ padding: 16 })
  .media('(min-width: 768px)', (c) => c
    .flex({ direction: 'row', gap: 24 })
    .box({ padding: 24 })
  )
  .$el('layout')`}</code></pre>

      <h2 className={sectionHeading}>@supports — Feature Queries</h2>
      <pre className={codeBlock}><code className='language-ts'>{`chain()
  .grid({ columns: '1fr' })
  .supports('(display: grid)', (c) => c
    .grid({ columns: '1fr 1fr', gap: 16 })
  )
  .$el('grid-layout')`}</code></pre>

      <h2 className={sectionHeading}>@container — Container Queries</h2>
      <pre className={codeBlock}><code className='language-ts'>{`chain()
  .container('(min-width: 400px)', (c) => c
    .flex({ direction: 'row' })
  )
  .$el('card')`}</code></pre>

      <h2 className={sectionHeading}>Nesting & Children</h2>
      <pre className={codeBlock}>{`chain()
  .nest('.child', (c) => c.typography({ color: 'blue', fontSize: 14 }))
  .children((c) => c.box({ marginBottom: 8 }))  // & > *
  .$el('parent')`}</pre>

      <h2 className={sectionHeading}>All At-Rules</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>CSS</th><th className={docTh}>Use Case</th></tr></thead>
          <tbody>
            {[
              ['.media(query, fn)','@media','Responsive breakpoints'],
              ['.supports(cond, fn)','@supports','Feature detection'],
              ['.container(query, fn)','@container','Container queries'],
              ['.layer(name, fn)','@layer','Cascade layers'],
              ['.keyframes(name, steps)','@keyframes','Custom animations'],
              ['.nest(selector, fn)','Nested rules','Child selectors'],
              ['.children(fn)','& > *','Direct children'],
              ['.when(condition, fn)','Conditional','Toggle styles'],
            ].map(([m, css, use]) => (
              <tr key={m}><td className={docTd}><code className={inlineCode}>{m}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{use}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}