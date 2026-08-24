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
        ChainCSS's first pipeline pass doesn't just validate — it actively fixes mistakes,
        suggests intents based on your manual properties, and teaches you the most expressive
        way to write styles. Auto-corrects typos via Levenshtein distance, maps semantic values
        to correct CSS, injects smart defaults, and suggests the closest match for every
        unrecognized property.
      </p>

      {/* ============================================================ */}
      {/* NEW: Intent Suggestion Validator */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Intent Suggestions (NEW)</h2>
      <p className={paragraph}>
        The <strong>Intent Suggestion Validator</strong> detects when you're writing properties
        manually that match a known intent. It suggests the shorter, more expressive way:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// You write this:
chain()
  .flex({ direction: 'row', gap: 16 })
  .box({ borderRadius: 12, padding: 16 })
  .$el('card')

// The compiler suggests:
// [HINT] ".card" uses 3/4 properties from the "flex-row" intent (priority: 5).
// Use .intents(['flex-row']) instead of writing 3 properties manually.
// [HINT] ".card" uses 2/4 properties from the "card" intent (priority: 10).
// Use .intents(['card']) instead of writing 2 properties manually.`}</code></pre>

      <p className={paragraph}>
        The validator uses the <strong>Intent Catalog</strong> and <strong>Intent Relationships</strong>{' '}
        to provide context-aware suggestions:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>✅ <strong>Priority-aware</strong> — Higher-priority intents are suggested first</li>
        <li>✅ <strong>Conflict-aware</strong> — Warns when a suggestion conflicts with your current intents</li>
        <li>✅ <strong>Requirement-aware</strong> — Tells you about missing dependencies</li>
        <li>✅ <strong>Enhancement-aware</strong> — Suggests complementary intents</li>
      </ul>

      {/* ============================================================ */}
      {/* Three Kinds of Corrections */}
      {/* ============================================================ */}
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
            ['Intent Suggestion', 'Manual properties matching an intent', 'borderRadius + padding + shadow', '.intents(["card"])'],
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

      {/* ============================================================ */}
      {/* Property Correction */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Property Correction: Levenshtein Distance</h2>
      <pre className={codeBlock}><code className="language-ts">{`// These all auto-correct during compilation:
chain()
  .raw('flx-direction', 'column')   // → flex-direction (distance: 1, missing 'e')
  .raw('align-itesm', 'center')     // → align-items (distance: 1, transposition)
  .raw('bordr-radius', '8px')       // → border-radius (distance: 1, missing 'e')
  .raw('backgroud-color', '#fff')   // → background-color (distance: 1, missing 'n')
  .$el('auto-corrected')`}</code></pre>

      {/* ============================================================ */}
      {/* Value Correction */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Value Correction: Known Mistakes</h2>
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
            ['position', 'abs', 'absolute', '0.90'],
            ['text-align', 'centered', 'center', '0.85'],
            ['cursor', 'hand', 'pointer', '0.90'],
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

      {/* ============================================================ */}
      {/* Natural Language */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Natural Language: .describe()</h2>
      <p className={paragraph}>
        The most powerful self-healing feature — describe what you want in plain English.
        The semantic intent parser maps words to registered intents:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Instead of writing 8+ properties:
chain()
  .describe("A frosted glass card with centered content and hover lift")
  .$el('card')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Automatically generated */
.chain-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.chain-card:hover {
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}
[data-theme="dark"] .chain-card {
  background: rgba(0,0,0,0.3);
}`}</code></pre>

      {/* ============================================================ */}
      {/* Healing Modes */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Healing Modes</h2>
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
        validation, analysis, and optimization. The intent suggestion validator runs during
        the validation phase and provides hints without modifying your code.
        Corrections are recorded in the declaration history for full audit trail.
        See <a href="/docs/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for
        the full intent catalog and <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros (100+)</a> for
        layout primitives.
      </div>
    </>
  );
}