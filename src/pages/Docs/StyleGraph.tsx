import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function StyleGraph() {
  return (
    <>
      <h1 className={contentTitle}>Style Graph Compiler</h1>
      <p className={contentDesc}>Advanced optimization via dependency graph analysis, dead code elimination, and rule merging.</p>
      <h2 className={sectionHeading}>What It Does</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2.5, color: '#cbd5e1', fontSize: 15 }}>
        <li><strong>Dependency Graph</strong> — Builds edges between overlapping selectors</li>
        <li><strong>Dead Code Elimination</strong> — Removes styles not referenced by known selectors</li>
        <li><strong>Identical Rule Merging</strong> — Combines selectors with identical properties</li>
        <li><strong>Topological Sort</strong> — Orders output by dependency chain</li>
        <li><strong>Specificity Calculation</strong> — Computes (a,b,c) specificity for every rule</li>
      </ul>
      <h2 className={sectionHeading}>Usage</h2>
      <pre className={codeBlock}>{`import { StyleGraphCompiler } from 'chaincss/compiler'
const result = new StyleGraphCompiler({
  eliminateDead: true,
  knownSelectors: ['.used-in-html'],
  mergeIdentical: true,
}).compile(styles)`}</pre>
    </>
  );
}
