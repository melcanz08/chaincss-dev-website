import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function Benchmarks() {
  return (
    <>
      <h1 className={contentTitle}>Benchmarks</h1>
      <p className={contentDesc}>
        ChainCSS is designed for speed. The compiler never ships to the browser.
        Benchmarked on Node.js v22, Linux, 4 CPUs, 4GB RAM.
      </p>

      <h2 className={sectionHeading}>Compilation Speed</h2>
      <p className={paragraph}>
        Measured as <code className={inlineCode}>compileStyle()</code> wall time including all 5 pipeline stages on cold cache:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Scenario</th><th className={docTh}>Rules</th><th className={docTh}>Time</th><th className={docTh}>Output</th></tr></thead>
          <tbody>
            <tr><td className={docTd}>Small</td><td className={docTd}>5</td><td className={docTd}>0.5ms</td><td className={docTd}>383B</td></tr>
            <tr><td className={docTd}>Medium</td><td className={docTd}>50</td><td className={docTd}>2.4ms</td><td className={docTd}>11.5KB</td></tr>
            <tr><td className={docTd}>Large</td><td className={docTd}>500</td><td className={docTd}>23ms</td><td className={docTd}>133KB</td></tr>
            <tr><td className={docTd}>X-Large</td><td className={docTd}>2,000</td><td className={docTd}>127ms</td><td className={docTd}>530KB</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Runtime Cost</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '12px' }}>
        {[
          { title: 'Static Mode', value: '0KB', desc: 'No JavaScript shipped. Styles are plain CSS files.' },
          { title: 'Dynamic Mode', value: '~200B', desc: 'Tiny useChainStyles hook. CSS variables for updates.' },
          { title: 'Cold Start', value: '~61ms', desc: 'First compilation. Subsequent builds use cache.' },
          { title: 'HMR', value: '<10ms', desc: 'Single-file recompilation on change.' },
        ].map(card => (
          <div key={card.title} style={{
            background: 'rgba(99, 102, 241, 0.08)', borderRadius: '12px',
            padding: '20px', border: '1px solid rgba(99, 102, 241, 0.15)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: '#818cf8' }}>{card.value}</div>
            <div style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '8px' }}>{card.title}</div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{card.desc}</div>
          </div>
        ))}
      </div>

      <h2 className={sectionHeading}>Pipeline Preset Performance</h2>
      <p className={paragraph}>
        Different presets have different pass counts. Choose the right one for your environment:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Preset</th><th className={docTh}>Passes</th><th className={docTh}>Overhead</th><th className={docTh}>Best For</th></tr></thead>
          <tbody>
            <tr><td className={docTd}>default</td><td className={docTd}>5</td><td className={docTd}>Minimal</td><td className={docTd}>Development</td></tr>
            <tr><td className={docTd}>production</td><td className={docTd}>8</td><td className={docTd}>~15%</td><td className={docTd}>Build</td></tr>
            <tr><td className={docTd}>ci</td><td className={docTd}>12</td><td className={docTd}>~30%</td><td className={docTd}>CI / Audit</td></tr>
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Tip:</strong> The CI preset runs 12 passes but feature detection skips irrelevant ones. If your styles don't use <code className={inlineCode}>@media</code> queries, the media-query-packer pass is skipped automatically.
      </div>
    </>
  );
}
