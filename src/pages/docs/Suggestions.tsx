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
        Fuzzy-matched "did you mean?" suggestions across 200+ known macros, shorthands,
        CSS properties, animations, and breakpoints. Powers IDE autocomplete and CLI
        error messages with context-aware narrowing and typo-tolerant matching.
      </p>

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

      <pre className={codeBlock}><code className="language-ts">{`// What happens when you write "flx" instead of "flex"
import { getSuggestion } from 'chaincss'

getSuggestion('flx')
// → { name: 'flex', distance: 1, type: 'macro' }

// Context-aware narrowing
getPropertySuggestion('bgc', 'color')
// → 'background-color'  (narrowed to color-related properties)

// Value-level suggestions
getValueSuggestion('display', 'flexbox')
// → { suggested: 'flex', confidence: 0.95 }`}</code></pre>

      <h2 className={sectionHeading}>Shorthand Explanations</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { getShorthandSuggestion } from 'chaincss'

getShorthandSuggestion('m')
// → { suggestion: 'margin', explanation: 'Sets margin on all sides' }

getShorthandSuggestion('br')
// → { suggestion: 'border-radius', explanation: 'Sets border radius' }

getShorthandSuggestion('fs')
// → { suggestion: 'font-size', explanation: 'Sets font size' }

getShorthandSuggestion('ai')
// → { suggestion: 'align-items', explanation: 'Sets align-items property' }`}</code></pre>

      <h2 className={sectionHeading}>Autocomplete</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { getAutocompleteSuggestions } from 'chaincss'

// Prefix-based matching
getAutocompleteSuggestions('flex')
// → [
//   { name: 'flex', type: 'macro' },
//   { name: 'flexCenter', type: 'macro' },
//   { name: 'flex-direction', type: 'css-property' },
// ]

// Empty prefix — returns top results from all categories
getAutocompleteSuggestions('', 10)
// → Top 10 suggestions across all knowledge bases`}</code></pre>

      <h2 className={sectionHeading}>Detailed Suggestions</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { getDetailedSuggestion } from 'chaincss'

getDetailedSuggestion('flexbox')
// → {
//   suggestion: 'flex',
//   alternatives: [
//     { name: 'flex', distance: 1, type: 'macro' },
//     { name: 'flexCenter', distance: 3, type: 'macro' },
//     { name: 'flex-direction', distance: 5, type: 'css-property' },
//   ],
//   type: 'macro',
//   confidence: 0.94
// }`}</code></pre>

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
              <td className={docTd} style={{ fontSize: 13, color: '#f87171' }}>{wrong}</td>
              <td className={docTd} style={{ fontSize: 13, color: '#4ade80' }}>{correct}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{confidence}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Animation Suggestions</h2>
      <p className={paragraph}>
        The animation registry has its own typo-tolerant suggestion system:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { getAnimationSuggestion, isValidAnimation } from 'chaincss'

isValidAnimation('fadeIn')    // → true
isValidAnimation('fadein')    // → false (case-sensitive)

getAnimationSuggestion('fadein')
// → 'fadeIn'  (auto-corrected via Levenshtein)

getAnimationSuggestion('slidLeft')
// → 'slideLeft'  (caught the missing 'e')`}</code></pre>

      <div className={note}>
        <strong>💡 Used everywhere:</strong> The suggestions engine powers the intent normalizer
        (auto-correcting typos during compilation), the CLI error messages, and IDE autocomplete
        integrations. All five knowledge bases are indexed in O(1) Sets for instant category
        lookups, with fuzzy matching only performed on the subset of candidates that pass
        the length-difference filter.
      </div>
    </>
  );
}