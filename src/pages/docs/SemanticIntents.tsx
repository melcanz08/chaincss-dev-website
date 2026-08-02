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
        Instead of writing 8+ properties for a card, write <code className={inlineCode}>intent: 'card'</code>.
        12 built-in intents across 4 categories. Register your own for your design system.
      </p>

      <h2 className={sectionHeading}>The Problem: Repetitive Component Styles</h2>
      <p className={paragraph}>
        Every design system has patterns that repeat across components. Cards need the same
        border-radius, shadow, hover lift, and padding. Buttons need the same focus ring,
        cursor, and transition. Inputs need the same border, focus state, and disabled state.
      </p>
      <p className={paragraph}>
        Without intents, you either copy-paste these 8+ property blocks everywhere, or you create
        a brittle abstraction that doesn't compose well with other styles. ChainCSS intents
        solve this by letting you reference design patterns by name — the compiler expands them
        to the correct CSS with the correct tokens for your active theme.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// Without intents — 8+ properties every time
export const card = chain()
  .box({ borderRadius: 12, overflow: 'hidden' })
  .flex({ direction: 'column' })
  .background({ color: '$colors.gray.100' })
  .typography({ color: '$colors.gray.900' })
  .box({ border: '1px solid $colors.gray.200' })
  .transition({ tr: 'box-shadow 0.2s ease, transform 0.2s ease' })
  .hover()
    .shadow({ box: '0 10px 30px rgba(0,0,0,0.15)' })
    .transform({ custom: 'translateY(-2px)' })
  .end()
  .$el('product-card')

// With intents — one line
export const card = chain()
  .raw({ intent: 'card' })
  .$el('product-card')

// Both produce identical CSS. The intent version also:
// • Resolves token references from your theme (light/dark/high-contrast)
// • Adds responsive padding adjustments on mobile
// • Tags the rule with a11y requirements for the accessibility validator`}</code></pre>

      <h2 className={sectionHeading}>Built-in Intent Catalog</h2>
      <p className={paragraph}>
        12 intents across 4 categories. Each intent carries semantic meaning
        that the token system uses to resolve theme-specific values.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Layout Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Key Properties</th><th className={docTh}>Responsive</th></tr></thead>
          <tbody>{[
            ['center-content', 'Center content horizontally + vertically', 'display:flex; justify-content:center; align-items:center', 'No'],
            ['stack', 'Vertical stack with consistent spacing', 'display:flex; flex-direction:column; gap', 'No'],
            ['sidebar-layout', 'Two-column layout with mobile collapse', 'display:grid; grid-template-columns:280px 1fr; min-height:100vh', 'Yes — collapses to 1 column'],
            ['grid-list', 'Responsive auto-fit grid', 'display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr))', 'Built-in'],
          ].map(([name, desc, props, responsive], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{props}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{responsive}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Component Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>States</th><th className={docTh}>A11y</th></tr></thead>
          <tbody>{[
            ['card', 'Content card with shadow, radius, hover lift', 'hover: shadow + translateY(-2px)', 'contrast, focus-visible'],
            ['button-primary', 'Primary CTA button', 'hover, focus, active, disabled', 'contrast, touch-target, focus-visible'],
            ['button-secondary', 'Secondary outlined button', 'hover, focus, disabled', 'contrast, touch-target, focus-visible'],
            ['input-field', 'Text input with focus + error states', 'focus, disabled', 'contrast'],
            ['modal', 'Modal dialog with overlay backdrop', 'None (structural)', 'contrast, focus-visible'],
            ['tooltip', 'Hover tooltip', 'None (structural)', 'contrast'],
          ].map(([name, desc, states, a11y], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{states}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{a11y}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Semantic Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>Key Properties</th><th className={docTh}>Responsive</th></tr></thead>
          <tbody>{[
            ['hero-section', 'Full-width hero banner', 'display:flex; flex-direction:column; min-height:60vh; text-align:center', 'Yes — min-height:40vh on mobile'],
            ['sticky-header', 'Sticky header with backdrop blur', 'position:sticky; top:0; backdrop-filter:blur(8px); border-bottom', 'No'],
          ].map(([name, desc, props, responsive], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{props}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{responsive}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Interaction Intents</h3>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Intent</th><th className={docTh}>Description</th><th className={docTh}>States</th><th className={docTh}>A11y</th></tr></thead>
          <tbody>{[
            ['hover-lift', 'Subtle lift on hover', 'hover: translateY(-2px) + box-shadow', 'focus-visible'],
            ['focus-ring', 'Accessible focus indicator', 'focus-visible: outline + outline-offset', 'Built-in'],
          ].map(([name, desc, states, a11y], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{name}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{states}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{a11y}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>How Semantic Resolution Works</h2>
      <p className={paragraph}>
        Intents don't store hardcoded CSS values — they store <strong>semantic references</strong> that the
        token system resolves based on the active theme. This is what makes them theme-aware:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// The 'card' intent declares these semantics:
semantics: [
  { category: 'surface', intent: 'container' },   // → resolves to surface colors
  { category: 'elevation', intent: 'raised' },     // → resolves to shadow values
  { category: 'spacing', intent: 'comfortable' },  // → resolves to padding values
]

// In light theme, 'surface' + 'container' resolves to:
//   background-color: var(--colors-gray-100)
//   color: var(--colors-gray-900)
//   border: 1px solid var(--colors-gray-200)

// In dark theme, the same intent resolves to:
//   background-color: var(--colors-gray-800)
//   color: var(--colors-gray-100)
//   border: 1px solid var(--colors-gray-700)`}</code></pre>

      <p className={paragraph}>
        The semantic token system has 5 categories with 6 variants each — that's 30 possible
        combinations, each resolving to different values in light, dark, and high-contrast modes.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Intents</th></tr></thead>
          <tbody>{[
            ['surface', 'interactive, container, overlay, sheet, tooltip, input'],
            ['text', 'primary, secondary, muted, link, inverse, code'],
            ['elevation', 'flat, raised, floating, sticky, overlay, modal'],
            ['state', 'hover, active, focus, disabled, loading, selected'],
            ['spacing', 'none, tight, compact, comfortable, spacious, generous'],
          ].map(([cat, intents], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{cat}</strong></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{intents}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Composing Intents</h2>
      <p className={paragraph}>
        Intents compose with other styles. Properties set after the intent override
        the intent's defaults. You can also stack multiple intents:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Start with a card, then customize
chain()
  .raw({ intent: 'card' })                    // base card pattern
  .box({ borderRadius: 24 })                  // override border-radius
  .background({ color: '$colors.white' })      // override background
  .raw({ intent: 'hover-lift' })              // add hover interaction
  .$el('featured-card')

// Intents can reference each other via semantics.
// 'button-primary' declares:
//   semantics: [
//     { category: 'surface', intent: 'interactive' },
//     { category: 'spacing', intent: 'compact' },
//     { category: 'state', intent: 'hover' },
//     { category: 'state', intent: 'focus' },
//     { category: 'state', intent: 'active' },
//     { category: 'state', intent: 'disabled' }
//   ]
// Each category+intent pair resolves to theme-aware values.`}</code></pre>

      <h2 className={sectionHeading}>A11y Awareness</h2>
      <p className={paragraph}>
        Intents declare their accessibility requirements. When the accessibility validator runs,
        it checks that every rule using an intent satisfies its declared a11y requirements:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// 'button-primary' declares:
a11y: ['contrast', 'touch-target', 'focus-visible']

// The validator checks:
// 1. contrast — text-on-background ratio ≥ 4.5:1
// 2. touch-target — interactive area ≥ 44×44px
// 3. focus-visible — :focus-visible style exists

// If any check fails, chaincss check --strict fails the build.`}</code></pre>

      <h2 className={sectionHeading}>Registering Custom Intents</h2>
      <p className={paragraph}>
        Extend the catalog with your design system's patterns:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
import { registerIntent } from 'chaincss'

registerIntent('brand-hero', {
  name: 'brand-hero',
  category: 'semantic',
  description: 'Brand-specific hero with gradient overlay',
  semantics: [
    { category: 'surface', intent: 'container' },
    { category: 'spacing', intent: 'generous' }
  ],
  properties: {
    background: 'linear-gradient(135deg, $colors.primary.500, $colors.primary.700)',
    color: '$colors.white',
    position: 'relative',
    overflow: 'hidden'
  },
  states: {
    hover: {
      // Optional hover state
    }
  },
  responsive: {
    mobile: {
      minHeight: '40vh',
      padding: '32px 16px'
    }
  },
  a11y: ['contrast']
})

// Now use it anywhere:
chain()
  .raw({ intent: 'brand-hero' })
  .$el('hero')`}</code></pre>

      <div className={note}>
        <strong>💡 Best practice:</strong> Register intents for your 5-10 most repeated component patterns.
        This ensures visual consistency, reduces copy-paste, and guarantees accessibility compliance
        across every instance. Combined with <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a>,
        changing a design token automatically updates every component that uses these intents.
      </div>

      <h2 className={sectionHeading}>Intent Resolution in the Pipeline</h2>
      <p className={paragraph}>
        Intents are resolved during the <strong>lowering phase</strong> — after normalization, validation,
        analysis, and optimization. This means:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>Tokens are already resolved (so <code className={inlineCode}>$colors.primary.500</code> has a real value)</li>
        <li>Semantic references are resolved via the semantic token system</li>
        <li>Theme overrides (dark/high-contrast) are applied</li>
        <li>Properties expand into declarations on the IR rule</li>
        <li>States (hover/focus/active) create pseudo-class rules</li>
        <li>Responsive overrides create media query rules</li>
        <li>A11y requirements are tagged for the validator</li>
      </ol>
    </>
  );
}