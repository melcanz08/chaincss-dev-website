import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function AtRules() {
  return (
    <>
      <h1 className={contentTitle}>At-Rules & Nesting</h1>
      <p className={contentDesc}>Responsive designs, feature queries, container queries, and nested selectors.</p>
      <h2 className={sectionHeading}>@media — Responsive Breakpoints</h2>
      <pre className={codeBlock}>{`chain()
  .flexDirection('column')
  .media('(min-width: 768px)', (c) => c
    .flexDirection('row')
    .gap(24)
  )
  .$el('layout')`}</pre>
      <h2 className={sectionHeading}>@supports — Feature Queries</h2>
      <pre className={codeBlock}>{`chain()
  .display('grid')
  .supports('(display: grid)', (c) => c
    .gridTemplateColumns('1fr 1fr')
  )
  .$el('grid-layout')`}</pre>
      <h2 className={sectionHeading}>@container — Container Queries</h2>
      <pre className={codeBlock}>{`chain()
  .container('(min-width: 400px)', (c) => c
    .flexDirection('row')
  )
  .$el('card')`}</pre>
      <h2 className={sectionHeading}>Nesting Selectors</h2>
      <pre className={codeBlock}>{`chain()
  .nest('.child', (c) => c.color('blue').fontSize(14))
  .nest('& > *', (c) => c.marginBottom(8))  // direct children
  .children((c) => c.padding(8))            // alias for & > *
  .$el('parent')`}</pre>
      <h2 className={sectionHeading}>All At-Rules</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>CSS</th><th className={docTh}>Use Case</th></tr></thead>
          <tbody>
            {[['.media(query, fn)','@media','Responsive breakpoints'],['.supports(cond, fn)','@supports','Feature detection'],['.container(query, fn)','@container','Container queries'],['.layer(name, fn)','@layer','Cascade layers'],['.keyframes(name, steps)','@keyframes','Custom animations'],['.nest(selector, fn)','Nested rules','Child selectors'],['.when(condition, fn)','Conditional','Toggle styles']].map(([m, css, use]) => (
              <tr key={m}><td className={docTd}><code className={inlineCode}>{m}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{use}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
