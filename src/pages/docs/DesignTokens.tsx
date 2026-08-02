import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function DesignTokens() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Design Tokens</h1>
      <p className={contentDesc}>
        Tokens are relationships — not just flat variables. Define colors, spacing,
        typography, shadows, and breakpoints once. Reference them everywhere with{' '}
        <code className={inlineCode}>$token.path</code> syntax. ChainCSS treats tokens
        as a connected graph — change one value and every derived shade, contrast color,
        and harmony palette propagates automatically.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
export default defineConfig({
  tokens: {
    colors: {
      primary: { 500: '#6366f1' },
      gray: {
        50: '#f9fafb',
        100: '#f7fafc',
        500: '#a0aec0',
        900: '#1a202c'
      },
      text: { onPrimary: '#ffffff' }
    },
    spacing: { sm: '0.5rem', md: '1rem', lg: '2rem' },
    typography: {
      fontFamily: { sans: 'system-ui, sans-serif', mono: 'SFMono-Regular, monospace' },
      fontSize: { base: '1rem', lg: '1.125rem', xl: '1.25rem' },
      fontWeight: { normal: '400', medium: '500', bold: '700' }
    },
    shadows: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.1)',
      lg: '0 10px 15px rgba(0,0,0,0.1)'
    },
    borderRadius: { sm: '0.125rem', md: '0.375rem', lg: '0.5rem', full: '9999px' }
  }
})`}</code></pre>

      <h2 className={sectionHeading}>Using Tokens in Styles</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const card = chain()
  .background({ color: '$colors.gray.100' })
  .typography({ 
    color: '$colors.gray.900',
    fontFamily: '$typography.fontFamily.sans',
    fontSize: '$typography.fontSize.base',
    fontWeight: '$typography.fontWeight.medium'
  })
  .box({ 
    padding: '$spacing.lg', 
    borderRadius: '$borderRadius.lg',
    maxWidth: 400
  })
  .shadow({ box: '$shadows.md' })
  .hover()
    .shadow({ box: '$shadows.lg' })
    .transform({ custom: 'translateY(-2px)' })
  .end()
  .$el('card')`}</code></pre>

      <h2 className={sectionHeading}>The Default Token System</h2>
      <p className={paragraph}>
        ChainCSS ships with a comprehensive set of default tokens — no config required.
        Custom tokens merge with and override defaults.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Category</th>
            <th className={docTh}>Coverage</th>
            <th className={docTh}>Examples</th>
          </tr></thead>
          <tbody>{[
            ['colors', '5 color families with 9 shades each', 'gray.50-900, blue.50-900, green.50-900, red.50-900, yellow.50-900'],
            ['spacing', '40 values from 0 to 96 + named aliases', '0, 0.5, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, xs, sm, md, lg, xl'],
            ['typography', 'Font families, 12 font sizes, 9 weights, 12 line heights', 'sans, serif, mono, xs-9xl, hairline-black, none-loose'],
            ['breakpoints', '10 device + 6 feature queries', 'sm-md-lg-xl-2xl, mobile-tablet-desktop, dark, light, reducedMotion, print'],
            ['shadows', '13 shadow presets + glow variants', 'xs, sm, md, lg, xl, 2xl, inner, glow-sm, glow-md, glow-lg'],
            ['borderRadius', '10 values from none to full', 'none, sm, base, md, lg, xl, 2xl, 3xl, 4xl, full'],
            ['zIndex', '17 values including semantic names', '0-50, auto, dropdown, sticky, fixed, modal, popover, tooltip, toast'],
            ['animations', '10 keyframe presets', 'fade, slideUp, slideDown, scale, bounce, pulse, spin, shimmer'],
          ].map(([cat, coverage, examples], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{cat}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{coverage}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{examples}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Token Reference Syntax</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Syntax</th>
            <th className={docTh}>Example</th>
            <th className={docTh}>Resolves To</th>
          </tr></thead>
          <tbody>{[
            ['$colors.path', '$colors.primary.500', '#6366f1'],
            ['$spacing.path', '$spacing.md', '1rem'],
            ['$typography.fontSize.path', '$typography.fontSize.base', '1rem'],
            ['$typography.fontWeight.path', '$typography.fontWeight.bold', '700'],
            ['$typography.lineHeight.path', '$typography.lineHeight.normal', '1.5'],
            ['$typography.fontFamily.path', '$typography.fontFamily.sans', 'system-ui, -apple-system, sans-serif'],
            ['$shadows.path', '$shadows.md', '0 4px 6px -1px rgba(0,0,0,0.1)'],
            ['$borderRadius.path', '$borderRadius.lg', '0.5rem'],
            ['$breakpoints.path', '$breakpoints.md', '768px'],
            ['$zIndex.path', '$zIndex.modal', '1040'],
          ].map(([syntax, example, resolves], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{syntax}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{example}</td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace', color: '#4ade80' }}>{resolves}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Token Resolution</h2>
      <p className={paragraph}>
        Tokens resolve at build time via the token lowering pass. The resolver:
      </p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>Checks custom tokens first, then falls back to default tokens</li>
        <li>Resolves cross-token references (<code className={inlineCode}>$colors.primary.100</code> pointing to another token)</li>
        <li>With <code className={inlineCode}>inlineLiterals: true</code>, resolves to actual values in CSS</li>
        <li>Without inlining, resolves to <code className={inlineCode}>var(--colors-primary-500)</code> CSS custom properties</li>
        <li>Unresolved tokens emit warnings but don't fail — they become CSS variables for runtime resolution</li>
      </ol>

      <h2 className={sectionHeading}>CSS Variable Generation</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { DesignTokens } from 'chaincss'

const tokens = new DesignTokens({
  colors: { primary: { 500: '#6366f1' } },
  spacing: { md: '1rem' }
})

// Generate CSS custom properties
console.log(tokens.toCSSVariables('theme'))
// :root {
//   --theme-colors-primary-500: #6366f1;
//   --theme-spacing-md: 1rem;
//   ...
// }`}</code></pre>

      <h2 className={sectionHeading}>Token Entanglement</h2>
      <p className={paragraph}>
        Define relationships between tokens — derivations, contrast requirements,
        and harmony rules. When a source token changes, everything propagates:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`tokens: {
  relationships: [
    // Derived shades — auto-computed in OKLCH color space
    { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.100', method: 'mix-white 80%' },
    { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.600', method: 'shade 20%' },
    
    // Contrast — auto-fix text to meet WCAG AA (4.5:1)
    { type: 'contrast', foreground: 'colors.text.onPrimary', background: 'colors.primary.500', target: 4.5, autoFix: 'auto' },
    
    // Harmony — generate complementary palette
    { type: 'harmony', source: 'colors.primary.500', targets: ['colors.accent.500'], rule: 'complementary' }
  ]
}`}</code></pre>

      <pre className={codeBlock}><code className="language-bash">{`# Propagate changes
$ chaincss entanglement --input tokens.json --fix

[entanglement] Detected change in colors.primary.500
  colors.primary.100: #e0e7ff → #ede9fe (mix-white 80%)
  colors.primary.600: #4f46e5 → #6d28d9 (shade 20%)
  colors.text.onPrimary: auto-fixed contrast (3.8 → 4.6)
  colors.accent.500: generated complementary palette`}</code></pre>

      <div className={note}>
        <strong>🔗 Dive deeper:</strong> Token relationships are the foundation of ChainCSS's
        design system infrastructure.{' '}
        <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a> covers
        all relationship types, OKLCH color math, and the propagation engine.{' '}
        <a href="/docs/tokens/theme-contracts" style={{ color: '#818cf8' }}>Theme Contracts</a> covers
        type-safe theme creation with build-time validation.{' '}
        <a href="/docs/tokens/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> covers
        how design intents resolve to theme-aware token values.
      </div>
    </>
  );
}