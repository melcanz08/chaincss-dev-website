import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Security() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Security</h1>
      <p className={contentDesc}>
        ChainCSS sanitizes all CSS output to prevent injection attacks. Static values
        are validated at build time. Dynamic values use CSS custom properties —
        inherently safe against CSS injection. No eval(), no string concatenation
        of user input into stylesheets.
      </p>

      <h2 className={sectionHeading}>CSS Injection Prevention</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>sanitizeCSSValue()</code> function runs on every static
        CSS value during compilation. It blocks dangerous characters before they reach
        the stylesheet:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// The sanitizer blocks these patterns:
sanitizeCSSValue(value) {
  // Blocks: { } — prevents rule injection
  if (/[{}]/.test(value)) throw new Error('Invalid CSS value')
  
  // Blocks: </style — prevents stylesheet breakout
  if (/<\\/style/i.test(value)) throw new Error('Invalid CSS value')
  
  // Strips: \\r \\n — prevents line break injection
  return value.replace(/[\\r\\n]+/g, ' ').trim()
}`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Attack Vector</th>
            <th className={docTh}>Example Payload</th>
            <th className={docTh}>Blocked By</th>
          </tr></thead>
          <tbody>{[
            ['Rule injection', 'red; } .evil { display: none } /*', '{ and } characters blocked'],
            ['Stylesheet breakout', 'red</style><script>alert(1)</script>', '</style pattern blocked'],
            ['Line break injection', 'red;\\n@import url(evil.css);', '\\r and \\n stripped'],
            ['Property name injection', 'color: red; background-image: url(...)', 'Known property validation'],
          ].map(([attack, payload, blocked], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{attack}</strong></td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{payload}</td>
              <td className={docTd} style={{ fontSize: 12 }}>{blocked}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>CSS Custom Properties: Safe by Design</h2>
      <p className={paragraph}>
        Dynamic values from <code className={inlineCode}>chain.dynamic()</code> are applied via
        CSS custom properties using the browser's CSSOM — not string concatenation.
        This is inherently safe:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// At build time — CSS file contains a var() placeholder:
.chain-btn {
  background-color: var(--chain-btn-bg);
}

// At runtime — value set via CSSOM, not string concatenation:
element.style.setProperty('--chain-btn-bg', dynamicValue)
// Characters like ; } { </ have NO special meaning in custom property values
// The browser treats them as literal characters in the property value`}</code></pre>

      <p className={paragraph}>
        This means even if a dynamic value contains <code className={inlineCode}>{';}}'}</code> or{' '}
        <code className={inlineCode}>{"</style>"}</code>, it cannot break out of the custom
        property context. The browser's CSS parser treats the entire value as a string.
      </p>

      <h2 className={sectionHeading}>Token Path Validation</h2>
      <p className={paragraph}>
        Token references (<code className={inlineCode}>$colors.primary.500</code>) are validated
        against a strict pattern. Only alphanumeric characters, dots, hyphens, and
        underscores are allowed:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Valid token paths
$colors.primary.500     // ✅
$spacing.md             // ✅
$typography.fontSize    // ✅

// Blocked token paths
$colors); drop-table;   // ❌ ) and ; blocked
$../etc/passwd          // ❌ / blocked
$<script>alert(1)</script> // ❌ < > blocked

// Validated by:
function toSafeTokenPath(path: string): string {
  if (!/^[a-zA-Z0-9._-]+$/.test(path)) 
    throw new Error(\`Invalid token: \${path}\`)
  return path
}`}</code></pre>

      <h2 className={sectionHeading}>Selector Validation</h2>
      <p className={paragraph}>
        Custom selectors passed to the entanglement system are validated against
        a safe pattern. Only standard CSS selector characters are allowed:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Valid selectors
'.card'                 // ✅
'#main'                 // ✅
'[data-active="true"]'  // ✅
'.group:has(> :hover) > &:not(:hover)' // ✅

// Blocked selectors
'.card } .evil { ...'   // ❌ } blocked
'.card;'                // ❌ ; blocked
'.card{display:none}'   // ❌ { blocked

// Validated by:
function toSafeSelector(sel: string, fallback: string): string {
  return /^[a-zA-Z0-9_.#:\\s>+~*[\\]="'\\-()]+$/.test(sel) && !/[{};]/.test(sel)
    ? sel : fallback
}`}</code></pre>

      <h2 className={sectionHeading}>Known Property Validation</h2>
      <p className={paragraph}>
        The compiler maintains a list of 120+ known CSS properties. Unknown properties
        trigger suggestions rather than being silently passed through. Custom properties
        (shorthands and macros) are automatically registered:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Known properties — anything else gets flagged:
const KNOWN_PROPERTIES = [
  'display', 'position', 'margin', 'padding', 'color', 'background',
  'border', 'width', 'height', 'font-size', 'font-weight',
  'flex', 'grid', 'transition', 'transform', 'animation',
  // ... 120+ more
]

// Unknown properties generate suggestions:
chain().raw('backgroud-color', '#fff')  
// → "Unknown property 'backgroud-color'. Did you mean 'background-color'?"`}</code></pre>

      <h2 className={sectionHeading}>Error Boundaries</h2>
      <p className={paragraph}>
        Every compilation path is wrapped in try/catch with contextual error messages.
        A single broken file doesn't crash the entire build:
      </p>

      <pre className={codeBlock}><code className="language-text">{`// Instead of a stack trace, you get:
[ChainCSS] Failed to compile button.chain.ts:
  Invalid CSS value: "red } .evil { display: none" 
  → blocked by sanitizeCSSValue()

// The rest of your styles compile normally.
// The broken file is skipped with a clear error message.`}</code></pre>

      <h2 className={sectionHeading}>No eval() — Opt-in Dynamic Code</h2>
      <p className={paragraph}>
        Dynamic functions are explicitly authored by the developer using{' '}
        <code className={inlineCode}>chain.dynamic()</code>. There is no mechanism for
        user input to become executable code. The compiler never calls{' '}
        <code className={inlineCode}>eval()</code> or <code className={inlineCode}>new Function()</code>.
      </p>

      <div className={note}>
        <strong>🔒 Defense in depth:</strong> Static values are sanitized at build time
        (blocking {'{}'} and <code className={inlineCode}>&lt;/style</code>). Dynamic values are
        inherently safe via CSS custom properties (no special characters). Token paths
        are validated against strict patterns. Selectors are validated against safe
        character sets. Unknown properties are flagged. Every compilation path has
        error boundaries. No user input ever becomes executable code.
      </div>
    </>
  );
}