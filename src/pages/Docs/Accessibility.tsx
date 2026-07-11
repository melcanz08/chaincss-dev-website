import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const checks = [
  ['Contrast Ratio','WCAG AA (4.5:1 normal, 3:1 large)','✅ Auto-fix'],
  ['Font Size Minimum','12px minimum for readable text','✅ Auto-fix'],
  ['Touch Target Size','44x44px minimum for interactive elements','✅ Auto-fix'],
  ['Focus Indicators','Visible focus styles required','⚠️ Manual review'],
  ['Motion Preferences','prefers-reduced-motion support','⚠️ Manual review'],
  ['Z-Index Conflicts','Detects stacking context issues','ℹ️ Warning only'],
];

export default function Accessibility() {
  return (
    <>
      <h1 className={contentTitle}>Accessibility Audit</h1>
      <p className={contentDesc}>Built-in WCAG 2.2 checker. 6 categories validated. Auto-fix for common issues.</p>
      <h2 className={sectionHeading}>Run an Audit</h2>
      <pre className={codeBlock}>{`npx chaincss check              # Run audit
npx chaincss check --fix        # Auto-fix where possible
npx chaincss check --verbose    # Detailed per-file report`}</pre>
      <h2 className={sectionHeading}>What Gets Checked</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Check</th><th className={docTh}>Threshold</th><th className={docTh}>Auto-Fix?</th></tr></thead>
          <tbody>{checks.map(([c, t, f]) => (
            <tr key={c}><td className={docTd}><strong>{c}</strong></td><td className={docTd}>{t}</td><td className={docTd}>{f}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
