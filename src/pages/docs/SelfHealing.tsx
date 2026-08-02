import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function SelfHealing() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Intent Engine & Self-Healing</h1>
      <p className={contentDesc}>
        ChainCSS's first pipeline pass doesn't just validate — it actively fixes mistakes.
        Auto-corrects typos via Levenshtein distance, maps semantic values to correct CSS,
        injects smart defaults, and suggests the closest match for every unrecognized property.
        All during compilation, before any other pass runs.
      </p>

      <h2 className={sectionHeading}>Three Kinds of Corrections</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Type</th>
            <th className={docTh}>What It Detects</th>
            <th className={docTh}>Example</th>
            <th className={docTh}>Correction</th>
          </tr></thead>
          <tbody>{[
            ['Property Correction', 'Misspelled or wrong property names', 'flx-direction', 'flex-direction'],
            ['Value Correction', 'Wrong values for known properties', 'display: flexbox', 'display: flex'],
            ['Semantic Intent', 'Human-readable values', 'border-radius: rounded', 'border-radius: 9999px (pill)'],
          ].map(([type, detects, example, correction], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{type}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{detects}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{example}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace', color: '#4ade80' }}>{correction}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Property Correction: Levenshtein Distance</h2>
      <p className={paragraph}>
        When the engine encounters an unknown property, it computes the Levenshtein distance
        against all 120+ known CSS properties. The closest match within a distance of 3
        is auto-applied. The algorithm uses an optimized <code className={inlineCode}>Int32Array</code>{' '}
        two-row buffer — zero heap allocations:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// These all auto-correct during compilation:
chain()
  .raw('flx-direction', 'column')   // → flex-direction (distance: 1, missing 'e')
  .raw('align-itesm', 'center')     // → align-items (distance: 1, transposition)
  .raw('bordr-radius', '8px')       // → border-radius (distance: 1, missing 'e')
  .raw('backgroud-color', '#fff')   // → background-color (distance: 1, missing 'n')
  .$el('auto-corrected')`}</code></pre>

      <h2 className={sectionHeading}>Value Correction: Known Mistakes</h2>
      <p className={paragraph}>
        The engine maintains a dictionary of common value mistakes for specific properties.
        Each correction has a confidence score — high-confidence corrections are applied
        silently, low-confidence ones generate suggestions:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Property</th>
            <th className={docTh}>Wrong Value</th>
            <th className={docTh}>Correct Value</th>
            <th className={docTh}>Confidence</th>
          </tr></thead>
          <tbody>{[
            ['display', 'flexbox', 'flex', '0.95'],
            ['display', 'inline-flexbox', 'inline-flex', '0.95'],
            ['position', 'abs', 'absolute', '0.90'],
            ['position', 'rel', 'relative', '0.90'],
            ['text-align', 'centered', 'center', '0.85'],
            ['text-align', 'justified', 'justify', '0.85'],
            ['overflow', 'scrollable', 'auto', '0.80'],
            ['cursor', 'hand', 'pointer', '0.90'],
            ['user-select', 'unselectable', 'none', '0.85'],
          ].map(([prop, wrong, correct, confidence], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{prop}</code></td>
              <td className={docTd} style={{ color: '#f87171', fontFamily: 'monospace', fontSize: 13 }}>{wrong}</td>
              <td className={docTd} style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: 13 }}>{correct}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{confidence}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Semantic Intent: Human Words → CSS</h2>
      <p className={paragraph}>
        The most powerful feature — write what you mean, not the CSS property value.
        The engine maps semantic words to correct CSS:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>What You Write</th>
            <th className={docTh}>The Intent</th>
            <th className={docTh}>Expands To</th>
          </tr></thead>
          <tbody>{[
            ['rounded', 'Fully rounded pill shape', 'border-radius: 9999px'],
            ['full / fullscreen', 'Fill available space', 'width: 100%; height: 100%'],
            ['abs / absolutely', 'Absolute positioning', 'position: absolute'],
            ['rel / relatively', 'Relative positioning', 'position: relative'],
            ['hidden / invisible', 'Visibility toggle', 'visibility: hidden'],
            ['flexbox', 'Flexbox with centering', 'display: flex; justify-content: center; align-items: center'],
          ].map(([write, intent, expands], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{write}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{intent}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace', color: '#4ade80' }}>{expands}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Smart Defaults</h2>
      <p className={paragraph}>
        Some corrections come with defaults — related properties that should be set
        together. For example, <code className={inlineCode}>position: absolute</code> is often
        paired with positioning coordinates:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// "flexbox" doesn't just fix the value — it adds centering defaults
chain()
  .raw('display', 'flexbox')
  .$el('centered')

// The intent engine expands this to:
// display: flex;
// justify-content: center;  ← auto-added default
// align-items: center;       ← auto-added default

// "full" expands to both dimensions
chain()
  .raw('width', 'full')
  .$el('full-width')

// Expands to:
// width: 100%;
// height: 100%;  ← auto-added default`}</code></pre>

      <h2 className={sectionHeading}>Layout Macros via Intents</h2>
      <p className={paragraph}>
        Beyond single-property corrections, the intent engine can expand named layout macros
        into full CSS blocks. These are the 13 built-in macros from the layout-macros system:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Instead of writing 8+ properties for a card:
chain()
  .raw('macro', 'card')
  .$el('product-card')

// Expands to:
// display: flex;
// flex-direction: column;
// border-radius: 12px;
// background-color: var(--card-bg, white);
// box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
// transition: box-shadow 0.2s ease, transform 0.2s ease;
// overflow: hidden;
// + hover: box-shadow + translateY(-2px)`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Macro</th>
            <th className={docTh}>Description</th>
            <th className={docTh}>Properties Generated</th>
          </tr></thead>
          <tbody>{[
            ['stickyHeader', 'Sticky header with blur', 'position:sticky + backdrop-filter + border-bottom + scroll shadow'],
            ['card', 'Standard card with hover', 'flex column + border-radius + shadow + transition + hover lift'],
            ['hero', 'Full-width hero section', 'flex centering + min-height:60vh + text-align:center'],
            ['container', 'Responsive container', 'width:100% + max-width + margin:auto + responsive padding'],
            ['center', 'Flexbox centering', 'display:flex + justify-content:center + align-items:center'],
            ['glass', 'Frosted glass effect', 'backdrop-filter:blur + semi-transparent bg + border'],
            ['pill', 'Pill-shaped element', 'border-radius:9999px + inline-flex centering + padding'],
            ['truncate', 'Text truncation', 'overflow:hidden + text-overflow:ellipsis + white-space:nowrap'],
          ].map(([macro, desc, props], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{macro}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{props}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Healing Modes</h2>
      <p className={paragraph}>
        The intent engine supports three healing modes for different contexts:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Mode</th>
            <th className={docTh}>Behavior</th>
            <th className={docTh}>Use Case</th>
          </tr></thead>
          <tbody>{[
            ['smart (default)', 'Auto-fixes high-confidence corrections, warns on low-confidence', 'Development and production builds'],
            ['dev', 'Applies all corrections silently, logs every change', 'Development — see what the engine is doing'],
            ['strict', 'Never auto-fixes — only reports suggestions as warnings', 'CI/CD — review changes before applying'],
          ].map(([mode, behavior, useCase], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{mode}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{behavior}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{useCase}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 First pass in the pipeline:</strong> The intent normalizer runs before
        validation, analysis, and optimization. Every subsequent pass operates on clean,
        corrected data. Corrections are recorded in the declaration history for full
        audit trail. Custom shorthands and macros registered in your config are
        automatically recognized and excluded from correction.
        See <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros (100+)</a> for the
        full catalog and <a href="/docs/tokens/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for
        higher-level design abstractions.
      </div>
    </>
  );
}