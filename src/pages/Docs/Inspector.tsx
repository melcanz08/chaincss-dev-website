import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note } from '../../styles/docs.chain.ts';

export default function Inspector() {
  return (
    <>
      <h1 className={contentTitle}>Live Compiler Inspector</h1>
      <p className={contentDesc}>Press Ctrl+Shift+I to see how every style was generated, pass by pass.</p>
      <h2 className={sectionHeading}>Features</h2>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: 2.5, color: '#cbd5e1', fontSize: 15 }}>
        <li><strong>Per-Element History</strong> — See every pipeline pass that touched each style</li>
        <li><strong>Before/After Diffs</strong> — Compare property values across stages</li>
        <li><strong>Step-Through Replay</strong> — Watch styles transform through Normalize → Validate → Analyze → Optimize → Lower</li>
        <li><strong>Pipeline Timeline</strong> — Visual timeline with per-pass duration</li>
        <li><strong>Diagnostic Viewer</strong> — See warnings, errors, and suggestions inline</li>
      </ul>
      <div className={note}><strong>🔬 Available in:</strong> Vite (auto-injected), CLI (manual), and production (<code className={inlineCode}>debug: true</code>).</div>
    </>
  );
}
