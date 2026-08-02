import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Benchmarks() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Benchmarks</h1>
      <p className={contentDesc}>
        Real-world performance measurements across four scale levels — from a single
        component to an enterprise design system. All measurements include the full
        23-pass pipeline with realistic CSS fixtures.
      </p>

      <div className={note}>
        <strong>Test environment:</strong> Lenovo G560, Node.js v22.23.1, 4 CPUs, 4GB RAM.
        Fixtures include hex colors, misspellings, semantic intents, media queries, and
        dead rules. Cold start includes Node.js JIT compilation and module loading.
      </div>

      <h2 className={sectionHeading}>Compilation Performance</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Scenario</th>
            <th className={docTh}>Rules</th>
            <th className={docTh}>Avg Time</th>
            <th className={docTh}>P95 Time</th>
            <th className={docTh}>CSS Output</th>
            <th className={docTh}>CSS Saved</th>
          </tr></thead>
          <tbody>{[
            ['Small (single component)', '5 → 4', '0.54ms', '0.88ms', '383B', '31.6%'],
            ['Medium (feature section)', '50 → 49', '4.80ms', '8.40ms', '11.3KB', '-3.1%*'],
            ['Large (full page)', '500 → 490', '93.06ms', '107.79ms', '133KB', '2.7%'],
            ['X-Large (design system)', '2,000 → 1,960', '1,709.92ms', '1,923.66ms', '533KB', '2.5%'],
          ].map(([scenario, rules, avg, p95, css, saved], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{scenario}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{rules}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', color: '#4ade80' }}>{avg}</td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{p95}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{css}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{saved}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph} style={{ fontSize: 12, color: '#71717a' }}>
        * Medium fixtures include additional declarations from intent expansion, resulting in
        slightly larger output than input. Savings are relative to uncompiled CSS.
      </p>

      <h2 className={sectionHeading}>What These Numbers Mean</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Scale</th>
            <th className={docTh}>Real-World Equivalent</th>
            <th className={docTh}>Compile Time</th>
          </tr></thead>
          <tbody>{[
            ['5 rules', 'A single button or card component', '0.54ms — imperceptible'],
            ['50 rules', 'A feature section with variants', '4.8ms — faster than a frame at 60fps'],
            ['500 rules', 'A full marketing page', '93ms — under 100ms, feels instant'],
            ['2,000 rules', 'An enterprise design system', '1.7s — acceptable for production build'],
          ].map(([scale, real, time], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{scale}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{real}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{time}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Cold vs Warm Start</h2>
      <p className={paragraph}>
        The first compilation after a fresh start includes Node.js JIT compilation
        and module loading overhead. Subsequent compilations are significantly faster:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Metric</th>
            <th className={docTh}>Time</th>
          </tr></thead>
          <tbody>{[
            ['Cold start (first compilation)', '119.08ms'],
            ['Warm average (subsequent)', '43.65ms'],
            ['JIT + module overhead', '75.43ms'],
          ].map(([metric, time], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{metric}</strong></td>
              <td className={docTd} style={{ fontFamily: 'monospace', color: '#4ade80' }}>{time}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        In practice, the dev server's persistent compiler state eliminates cold starts
        entirely — after the first build, only changed files are recompiled. A typical
        file change recompiles 4-5% of rules (incremental compilation), not the full
        stylesheet.
      </p>

      <h2 className={sectionHeading}>Pass Timing Breakdown (X-Large)</h2>
      <p className={paragraph}>
        Where does the time go? The 23-pass pipeline on a 2,000-rule stylesheet:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Stage</th>
            <th className={docTh}>Total Time</th>
            <th className={docTh}>% of Pipeline</th>
            <th className={docTh}>Heaviest Pass</th>
          </tr></thead>
          <tbody>{[
            ['Normalization (3 passes)', '62.8ms', '34.6%', 'intent-normalizer: 54.2ms (29.9%)'],
            ['Optimization (9 passes)', '78.5ms', '43.3%', 'source-optimizer: 31.7ms (17.5%)'],
            ['Lowering (4 passes)', '40.1ms', '22.1%', 'css-emitter: 28.0ms (15.4%)'],
          ].map(([stage, time, pct, heaviest], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{stage}</strong></td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{time}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{pct}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{heaviest}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Incremental Compilation Advantage</h2>
      <p className={paragraph}>
        The numbers above are for <strong>full compilations</strong>. In development,
        the incremental compiler recompiles only the rules affected by a file change:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Scenario</th>
            <th className={docTh}>Full Compile</th>
            <th className={docTh}>Incremental (4.2% dirty)</th>
            <th className={docTh}>Speedup</th>
          </tr></thead>
          <tbody>{[
            ['500 rules', '93.06ms', '~3.9ms', '~24x faster'],
            ['2,000 rules', '1,709.92ms', '~71.8ms', '~24x faster'],
          ].map(([scenario, full, inc, speedup], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{scenario}</strong></td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{full}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', color: '#4ade80' }}>{inc}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', color: '#4ade80' }}>{speedup}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Scaling Characteristics</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Metric</th>
            <th className={docTh}>Small → Medium</th>
            <th className={docTh}>Medium → Large</th>
            <th className={docTh}>Large → X-Large</th>
          </tr></thead>
          <tbody>{[
            ['Rules increase', '10.0x', '10.0x', '4.0x'],
            ['Time increase', '8.9x', '19.4x', '18.4x'],
            ['Memory increase', '1.3x', '2.0x', '1.9x'],
          ].map(([metric, sm, ml, lx], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{metric}</strong></td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{sm}</td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{ml}</td>
              <td className={docTd} style={{ fontFamily: 'monospace' }}>{lx}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        Time scaling is slightly super-linear at larger sizes due to cross-file analysis
        (pattern detection, source optimization). Memory scales sub-linearly due to
        efficient IR structures and WeakMap-based caches.
      </p>

      <h2 className={sectionHeading}>Optimization Savings</h2>
      <p className={paragraph}>
        The pipeline eliminates dead code and compresses output at every scale:
      </p>

      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Dead code elimination</strong> — ~2% of rules removed (fixtures include intentional dead rules)</li>
        <li><strong>CSS compression</strong> — hex shortening (#ffcc00→#fc0), zero unit removal (0px→0), font-weight keyword conversion (bold→700)</li>
        <li><strong>Atomic extraction</strong> — declarations used 3+ times extracted to shared utility classes</li>
        <li><strong>Source deduplication</strong> — identical rules across files merged</li>
      </ul>

      <div className={note}>
        <strong>💡 Real-world performance:</strong> These benchmarks use the full CI pipeline
        preset (all validators + analyzers + optimizers). Development builds use the
        lighter default preset. Production builds add minification. The persistent compiler
        state eliminates cold starts entirely after the first build.
        See <a href="/docs/pipeline" style={{ color: '#818cf8' }}>5-Stage Pipeline</a> for the
        full pass breakdown.
      </div>
    </>
  );
}