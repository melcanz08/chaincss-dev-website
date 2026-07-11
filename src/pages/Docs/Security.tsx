import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function Security() {
  return (
    <>
      <h1 className={contentTitle}>Security</h1>
      <p className={contentDesc}>ChainCSS sanitizes CSS output to prevent injection attacks.</p>
      <h2 className={sectionHeading}>Protections</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2.5, color: '#cbd5e1', fontSize: 15 }}>
        <li><strong>CSS Injection Sanitization</strong> — Escapes <code className={inlineCode}>\</code>, <code className={inlineCode}>&lt;/</code>, <code className={inlineCode}>\n</code>, <code className={inlineCode}>\r</code></li>
        <li><strong>Error Boundaries</strong> — Try/catch on all compilation paths with contextual errors</li>
        <li><strong>Token Path Validation</strong> — Tokens cannot contain <code className={inlineCode}>)</code> or <code className={inlineCode}>;</code></li>
        <li><strong>No eval()</strong> — Dynamic functions are user-authored and opt-in via <code className={inlineCode}>chain.dynamic()</code></li>
        <li><strong>Var() Fallback</strong> — Unresolved tokens emit safe <code className={inlineCode}>var(--*)</code> references</li>
      </ul>
    </>
  );
}
