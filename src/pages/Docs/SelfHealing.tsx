import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function SelfHealing() {
  return (
    <>
      <h1 className={contentTitle}>Intent Engine & Self-Healing</h1>
      <p className={contentDesc}>ChainCSS detects what you meant and suggests corrections for typos and shorthand mistakes.</p>
      <h2 className={sectionHeading}>Intent Detection</h2>
      <pre className={codeBlock}>{`chain()
  .display('flexbox')   // ⚠️ Not valid CSS
  // Intent engine corrects: flexbox → flex`}</pre>
      <h2 className={sectionHeading}>Typo Suggestions</h2>
      <pre className={codeBlock}>{`chain()
  .colur('#fff')        // ⚠️ Typo
  // Suggests: Did you mean "color"? (Levenshtein distance: 1)`}</pre>
      <h2 className={sectionHeading}>Smart Defaults</h2>
      <p className={paragraph}>When you use <code className={inlineCode}>display: flex</code>, the intent engine can auto-add centering defaults if missing.</p>
      <div className={note}><strong>💡 Tip:</strong> Intent detection runs in the Normalization stage. It never changes your output without showing you what was corrected.</div>
    </>
  );
}
