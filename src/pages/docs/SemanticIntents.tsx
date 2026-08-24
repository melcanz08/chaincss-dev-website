import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function SemanticIntents() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Semantic Intents</h1>
      <p className={contentDesc}>
        Named design patterns that expand to complete CSS with theme-aware token resolution.
        Write <code className={inlineCode}>.describe("A frosted glass card")</code> or{' '}
        <code className={inlineCode}>.intents(['card', 'glass'])</code> — the compiler
        expands them to 10+ CSS properties with dark mode support built in.
      </p>

      {/* ============================================================ */}
      {/* Quick Example */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// Without intents — 8+ properties every time
export const manualCard = chain()
  .box({ borderRadius: 12, overflow: 'hidden', padding: 16 })
  .flex({ direction: 'column' })
  .background({ color: '$colors.gray.100' })
  .typography({ color: '$colors.gray.900' })
  .box({ border: '1px solid $colors.gray.200' })
  .transition({ tr: 'box-shadow 0.2s ease' })
  .pseudo({
    hover: { boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }
  })
  .$el('manual-card')

// With intents — one line!
export const intentCard = chain()
  .intents(['card'])
  .$el('intent-card')

// With natural language — even shorter!
export const magicCard = chain()
  .describe("A frosted glass card with centered content")
  .$el('magic-card')`}</code></pre>

      <p className={paragraph}>
        All three produce similar CSS. The intent versions also:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>✅ Resolve token references from your theme (light/dark/high-contrast)</li>
        <li>✅ Add responsive padding adjustments on mobile</li>
        <li>✅ Tag the rule with a11y requirements for the accessibility validator</li>
        <li>✅ Auto-generate dark mode theme overrides</li>
      </ul>

      {/* ============================================================ */}
      {/* Three Ways to Write Intents */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Three Ways to Use Intents</h2>

      <h3 style={{ color: '#818cf8', marginTop: 24 }}>1. Natural Language (`.describe()`)</h3>
      <p className={paragraph}>
        Describe what you want in plain English. The semantic intent parser maps
        words and phrases to registered intents:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .describe("A frosted glass card with centered content and hover lift")
  .$el('card')`}</code></pre>
      <pre className={codeBlock}><code className="language-css">{`/* Generated CSS */
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

      <h3 style={{ color: '#818cf8', marginTop: 24 }}>2. Explicit Intents (`.intents()`)</h3>
      <p className={paragraph}>
        Use exact intent names for precise control:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .intents(['card', 'glass', 'hover-lift'])
  .$el('card')`}</code></pre>

      <h3 style={{ color: '#818cf8', marginTop: 24 }}>3. Intent Suggestions (Automatic)</h3>
      <p className={paragraph}>
        The <strong>Intent Suggestion Validator</strong> detects when you're writing properties
        manually and suggests the equivalent intent:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`// You write this:
chain()
  .box({ borderRadius: 12, padding: 16, overflow: 'hidden' })
  .flex({ direction: 'column' })
  .$el('card')

// The compiler suggests:
// [HINT] ".card" uses 3/4 properties from the "card" intent (priority: 10).
// Use .intents(['card']) instead of writing 3 properties manually.`}</code></pre>

      {/* ============================================================ */}
      {/* Built-in Intent Catalog */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>Built-in Intent Catalog</h2>
      <p className={paragraph}>
        30+ intents across 6 categories. Each intent has relationships
        (requires, conflicts, enhances) that the validator checks.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Layout Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Key Properties</th></tr></thead>
          <tbody>{[
            ['center-content', 'Center content horizontally + vertically', 'display:flex; justify-content:center; align-items:center'],
            ['stack', 'Vertical stack with consistent spacing', 'display:flex; flex-direction:column; gap'],
            ['flex-row', 'Simple horizontal flex', 'display:flex; flex-direction:row'],
            ['flex-col', 'Simple vertical flex', 'display:flex; flex-direction:column'],
            ['grid-list', 'Responsive auto-fit grid', 'display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr))'],
            ['container', 'Centered container with max-width', 'max-width; margin-inline:auto; padding'],
          ].map(([name, desc, props], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{props}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Component Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Requires</th><th className={docTh}>Enhances</th></tr></thead>
          <tbody>{[
            ['card', 'Content card with shadow, radius, hover lift', 'rounded', 'elevated, glass, hover-lift, bordered'],
            ['button-primary', 'Primary CTA button', 'focus-ring', 'hover-lift, compact, elevated'],
            ['modal', 'Modal dialog with overlay', 'elevated, rounded', 'glass, center-content'],
            ['badge', 'Small label/badge', 'rounded', 'compact, bold'],
            ['tooltip', 'Hover tooltip', 'elevated, rounded', 'compact, muted'],
            ['toast', 'Toast notification', 'elevated, rounded', 'glass, compact'],
          ].map(([name, desc, req, enh], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{req}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{enh}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Visual Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Conflicts With</th></tr></thead>
          <tbody>{[
            ['glass', 'Frosted glass effect with backdrop-filter', 'flat, transparent'],
            ['elevated', 'Raised surface with shadow', 'flat'],
            ['bordered', 'Border outline', 'flat'],
            ['rounded', 'Rounded corners', 'flat'],
            ['gradient', 'Gradient background', 'transparent, flat'],
          ].map(([name, desc, conflict], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{conflict}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Interaction Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Conflicts With</th></tr></thead>
          <tbody>{[
            ['hover-lift', 'Subtle lift on hover', 'disabled'],
            ['focus-ring', 'Accessible focus indicator', 'disabled'],
            ['clickable', 'Clickable element', 'disabled'],
            ['disabled', 'Disabled state', 'clickable, hover-lift, focus-ring'],
            ['selected', 'Selected/active state', 'disabled, muted'],
          ].map(([name, desc, conflict], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{conflict}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* How Intent Resolution Works */}
      {/* ============================================================ */}
      <h2 className={sectionHeading}>How Intent Resolution Works</h2>
      <p className={paragraph}>
        Intents resolve during the <strong>lowering phase</strong> of the pipeline.
        The resolution order is:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Parse</strong> — Intent names are extracted from <code className={inlineCode}>.intents()</code> or <code className={inlineCode}>.describe()</code></li>
        <li><strong>Validate</strong> — Conflict/requirement/enhancement checks run</li>
        <li><strong>Compose</strong> — Composite intents (like <code className={inlineCode}>glass-card</code>) expand to their sub-intents</li>
        <li><strong>Resolve</strong> — Each intent expands to its CSS properties</li>
        <li><strong>Theme</strong> — Dark/high-contrast overrides are applied</li>
        <li><strong>Token</strong> — Token references (<code className={inlineCode}>$colors.primary</code>) resolve to CSS variables</li>
      </ol>

      <h2 className={sectionHeading}>Registering Custom Intents</h2>
      <pre className={codeBlock}><code className="language-ts">{`import { registerSemanticIntent } from 'chaincss'

registerSemanticIntent({
  name: 'brand-hero',
  category: 'semantic',
  description: 'Brand-specific hero with gradient',
  resolve: () => ({
    properties: {
      background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
      color: '#ffffff',
      padding: '80px 24px',
      textAlign: 'center',
      minHeight: '60vh'
    },
    states: {
      hover: { opacity: 0.9 }
    },
    responsive: {
      mobile: { padding: '40px 16px', minHeight: '40vh' }
    },
    a11y: ['contrast']
  })
})

// Now use it:
chain()
  .intents(['brand-hero'])
  .$el('hero')`}</code></pre>

      <div className={note}>
        <strong>💡 Best practice:</strong> Register intents for your 5-10 most repeated component patterns.
        The intent suggestion validator will automatically suggest them when it detects matching
        manual properties. Combined with <a href="/docs/tokens" style={{ color: '#818cf8' }}>Design Tokens</a>,
        changing a token automatically updates every component that uses these intents.
      </div>
    </>
  );
}