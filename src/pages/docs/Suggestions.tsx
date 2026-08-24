import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Suggestions() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Suggestions Engine</h1>
      <p className={contentDesc}>
        Two layers of intelligence: (1) fuzzy-matched "did you mean?" suggestions across
        200+ known macros, shorthands, CSS properties, animations, and breakpoints;
        (2) intent-level suggestions that teach you the most expressive way to write styles.
      </p>

      {/* ============================================================ */}
      {/* NEW: Intent Suggestion Validator */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Intent Suggestions (NEW)</h2>
      <p className={paragraph}>
        The <strong>Intent Suggestion Validator</strong> runs during the validation phase
        and detects when you're writing properties manually that match a known intent.
        It suggests the shorter, more expressive way:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// You write this:
chain()
  .flex({ direction: 'row', gap: 16 })
  .box({ borderRadius: 12, padding: 16, overflow: 'hidden' })
  .$el('card')

// The compiler suggests:
// [HINT] ".card" uses 3/4 properties from the "flex-row" intent (priority: 5).
// Use .intents(['flex-row']) instead of writing 3 properties manually.
// [HINT] ".card" uses 3/4 properties from the "card" intent (priority: 10).
// Use .intents(['card']) instead of writing 3 properties manually.`}</code></pre>

      <p className={paragraph}>
        The validator uses the <strong>Intent Catalog</strong> (30+ intents) and{' '}
        <strong>Intent Relationships</strong> to provide context-aware suggestions:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>✅ <strong>Priority-aware</strong> — Higher-priority intents (card=10, button=10) are suggested first</li>
        <li>✅ <strong>Conflict-aware</strong> — Warns when a suggestion conflicts with intents you already use</li>
        <li>✅ <strong>Requirement-aware</strong> — Tells you about missing dependencies (e.g., card requires rounded)</li>
        <li>✅ <strong>Enhancement-aware</strong> — Suggests complementary intents (e.g., card enhances hover-lift)</li>
        <li>✅ <strong>Already-used aware</strong> — Skips intents you already have</li>
      </ul>

      <h2 className={sectionHeading}>Knowledge Bases</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Category</th>
            <th className={docTh}>Count</th>
            <th className={docTh}>Examples</th>
          </tr></thead>
          <tbody>{[
            ['Macros', '90+', 'stickyHeader, card, glass, flexCenter, bento, pressable'],
            ['Shorthands', '60+', 'm, p, w, h, bg, br, fs, fw, d, ai, jc, g'],
            ['CSS Properties', '50+', 'display, position, margin, padding, font-size, color, background-color'],
            ['Animations', '40+', 'fadeIn, slideInLeft, zoomInUp, bounce, pulse, shimmer'],
            ['Breakpoints', '26', 'sm, md, lg, xl, mobile, tablet, dark, reducedMotion'],
            ['Intents', '30+', 'card, glass, flex-row, button-primary, modal, hover-lift'],
          ].map(([cat, count, examples], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{cat}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{count}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{examples}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>How Matching Works</h2>
      <p className={paragraph}>
        The engine uses Levenshtein distance with a two-row <code className={inlineCode}>Int32Array</code> buffer
        — zero heap allocations, zero GC pressure. Results are ranked by distance
        and limited to the closest 3 matches:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { getSuggestion } from 'chaincss'

getSuggestion('flx')
// → { name: 'flex', distance: 1, type: 'macro' }

getPropertySuggestion('bgc', 'color')
// → 'background-color'  (narrowed to color-related properties)

getValueSuggestion('display', 'flexbox')
// → { suggested: 'flex', confidence: 0.95 }`}</code></pre>

      <h2 className={sectionHeading}>Shorthand Explanations</h2>
      <pre className={codeBlock}><code className="language-ts">{`import { getShorthandSuggestion } from 'chaincss'

getShorthandSuggestion('m')   // → 'margin'
getShorthandSuggestion('br')  // → 'border-radius'
getShorthandSuggestion('fs')  // → 'font-size'
getShorthandSuggestion('ai')  // → 'align-items'`}</code></pre>

      <h2 className={sectionHeading}>Autocomplete</h2>
      <pre className={codeBlock}><code className="language-ts">{`import { getAutocompleteSuggestions } from 'chaincss'

getAutocompleteSuggestions('flex')
// → [
//   { name: 'flex', type: 'macro' },
//   { name: 'flexCenter', type: 'macro' },
//   { name: 'flex-direction', type: 'css-property' },
// ]`}</code></pre>

      <h2 className={sectionHeading}>Value Corrections</h2>
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
            ['user-select', 'unselectable', 'none', '0.85'],
          ].map(([prop, wrong, correct, confidence], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{prop}</code></td>
              <td className={docTd} style={{ fontSize: 13, color: '#f87171' }}>{wrong}</td>
              <td className={docTd} style={{ fontSize: 13, color: '#4ade80' }}>{correct}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{confidence}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Two layers of intelligence:</strong> The low-level suggestions engine
        (Levenshtein matching) auto-corrects typos during compilation. The high-level
        Intent Suggestion Validator teaches you the most expressive way to write styles
        by suggesting <code className={inlineCode}>.intents()</code> and{' '}
        <code className={inlineCode}>.describe()</code> when it detects manual properties
        that match a known pattern.
        See <a href="/docs/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for
        the full intent catalog.
      </div>
    </>
  );
}