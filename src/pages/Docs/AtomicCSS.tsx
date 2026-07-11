import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function AtomicCSS() {
  return (
    <>
      <h1 className={contentTitle}>Atomic CSS Extraction</h1>
      <p className={contentDesc}>ChainCSS detects repeated property:value pairs and extracts them into reusable utility classes — like Tailwind, but automated.</p>
      <h2 className={sectionHeading}>How It Works</h2>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: 2, color: '#cbd5e1' }}>
        <li><strong>Detect</strong> — Count usage of every property:value pair across all files</li>
        <li><strong>Extract</strong> — Create utility classes for pairs used 3+ times</li>
        <li><strong>Replace</strong> — Swap original declarations for atomic class references</li>
      </ol>
      <h2 className={sectionHeading}>Example</h2>
      <pre className={codeBlock}>{`// Input (3 components use color: #6366f1)
chain().color('#6366f1').$el('btn-primary')
chain().color('#6366f1').$el('link')
chain().color('#6366f1').$el('badge')

// Output (atomic extraction)
.color-6366f1 { color: #6366f1; }
.chain-btn-primary { /* ... other props */ }
.chain-link { /* ... other props */ }
.chain-badge { /* ... other props */ }`}</pre>
      <h2 className={sectionHeading}>Configuration</h2>
      <pre className={codeBlock}>{`// chaincss.config.js
export default {
  pipeline: 'atomic',       // Use atomic preset
  atomic: {
    threshold: 3,           // Min usages to extract (default: 3)
    mode: 'hybrid',         // Keep original + add atomic classes
    naming: 'readable',     // 'hash' for shorter names
  }
}`}</pre>
    </>
  );
}
