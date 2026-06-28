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
        Performance benchmarks from ChainCSS v2.8.8. Tested on Node.js v22, Linux, 4 CPUs, 4GB RAM.
      </p>

      <h2 className={sectionHeading}>Compilation Performance</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Scenario</th><th className={docTh}>Rules</th><th className={docTh}>Declarations</th><th className={docTh}>Time</th><th className={docTh}>CSS Output</th><th className={docTh}>Savings</th></tr></thead>
          <tbody>
            <tr><td className={docTd} style={{fontWeight:600}}>Small</td><td className={docTd}>5</td><td className={docTd}>20</td><td className={docTd}>0.25ms</td><td className={docTd}>574B</td><td className={docTd}>—</td></tr>
            <tr><td className={docTd} style={{fontWeight:600}}>Medium</td><td className={docTd}>50</td><td className={docTd}>400</td><td className={docTd}>2.0ms</td><td className={docTd}>9.2KB</td><td className={docTd}>7.6%</td></tr>
            <tr><td className={docTd} style={{fontWeight:600}}>Large</td><td className={docTd}>500</td><td className={docTd}>5,000</td><td className={docTd}>21.6ms</td><td className={docTd}>112KB</td><td className={docTd}>10.4%</td></tr>
            <tr><td className={docTd} style={{fontWeight:600}}>X-Large</td><td className={docTd}>2,000</td><td className={docTd}>20,000</td><td className={docTd}>52ms</td><td className={docTd}>450KB</td><td className={docTd}>10.0%</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Cold vs Warm Start</h2>
      <p className={paragraph}>
        Cold start: ~21ms | Warm start: ~10ms<br />
        Compiler only — never ships to browser.
      </p>

      <h2 className={sectionHeading}>Pipeline Pass Breakdown (X-Large)</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Stage</th><th className={docTh}>Pass</th><th className={docTh}>Duration</th></tr></thead>
          <tbody>
            <tr><td className={docTd}>normalization</td><td className={docTd}>intent-normalizer</td><td className={docTd}>1ms</td></tr>
            <tr><td className={docTd}>normalization</td><td className={docTd}>unit-normalizer</td><td className={docTd}>1ms</td></tr>
            <tr><td className={docTd}>optimization</td><td className={docTd}>css-compressor</td><td className={docTd}>3ms</td></tr>
            <tr><td className={docTd}>lowering</td><td className={docTd}>token-resolver</td><td className={docTd}>0ms</td></tr>
            <tr><td className={docTd}>lowering</td><td className={docTd}>css-emitter</td><td className={docTd}>36ms</td></tr>
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>Scaling:</strong> Time scales sub-linearly with rule count. 
        Small→Medium (10x rules): 11x time. Medium→Large (10x rules): 15.1x time. 
        Large→X-Large (4x rules): 4.4x time. Full benchmark suite available in the repository.
      </div>
    </>
  );
}
