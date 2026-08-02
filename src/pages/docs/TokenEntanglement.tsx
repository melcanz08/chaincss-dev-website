import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function TokenEntanglement() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Token Entanglement</h1>
      <p className={contentDesc}>
        Tokens are relationships — not just flat variables. Change one source token
        and every derived shade, contrast color, and harmony palette updates automatically.
        All computed in the OKLCH color space for perceptual accuracy.
      </p>

      <h2 className={sectionHeading}>The Problem with Flat Tokens</h2>
      <p className={paragraph}>
        In most design token systems, tokens are isolated key-value pairs.
        Change <code className={inlineCode}>primary.500</code> and you must manually update{' '}
        <code className={inlineCode}>primary.100</code>, <code className={inlineCode}>primary.600</code>,{' '}
        <code className={inlineCode}>text.onPrimary</code>, and any accent colors — or ship broken contrast ratios.
      </p>
      <p className={paragraph}>
        ChainCSS treats tokens as a <strong>dependency graph</strong>. Define relationships once.
        Change one value — everything propagates.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>
      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
export default defineConfig({
  tokens: {
    relationships: [
      // Derived — lighter/darker shades computed automatically
      { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.100', method: 'mix-white 80%' },
      { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.600', method: 'shade 20%' },
      
      // Contrast — foreground auto-adjusts to meet WCAG AA
      { type: 'contrast', foreground: 'colors.text.onPrimary', background: 'colors.primary.500', target: 4.5, autoFix: 'auto' },
      
      // Harmony — complementary palette generated from source
      { type: 'harmony', source: 'colors.primary.500', targets: ['colors.accent.500', 'colors.accent.300'], rule: 'complementary' }
    ]
  }
})`}</code></pre>

      <p className={paragraph}>
        Now when a designer changes <code className={inlineCode}>primary.500</code> from{' '}
        <code className={inlineCode}>#6366f1</code> to <code className={inlineCode}>#7c3aed</code>:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`$ chaincss entanglement --input tokens.json --fix

[entanglement] Detected change in colors.primary.500
  colors.primary.100: #e0e7ff → #ede9fe (derived from colors.primary.500 via mix-white 80%)
  colors.primary.600: #4f46e5 → #6d28d9 (derived from colors.primary.500 via shade 20%)
  colors.text.onPrimary: #ffffff → #ffffff (auto fix contrast 3.8 → 4.6 on colors.primary.500)
  colors.accent.500: #f59e0b → #facc15 (harmony complementary from colors.primary.500)
  colors.accent.300: #fcd34d → #fde68a (harmony complementary from colors.primary.500)
  
[entanglement] Propagated 5 changes → tokens.json`}</code></pre>

      <h2 className={sectionHeading}>Relationship Types</h2>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>Derived</h3>
      <p className={paragraph}>
        Automatically compute lighter/darker shades, tints, and opacity variants from a source token.
        All color math uses the OKLCH color space — perceptually uniform, no muddy midpoints.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Syntax</th><th className={docTh}>Example</th><th className={docTh}>Result</th></tr></thead>
          <tbody>{[
            ['mix-white', 'mix-white 80%', '#6366f1 + 80% white', '#e0e7ff (tint)'],
            ['mix-black', 'mix-black 20%', '#6366f1 + 20% black', '#4f46e5 (shade)'],
            ['lighten', 'lighten 0.15', '#6366f1 + lightness', '#818cf8'],
            ['darken', 'darken 0.15', '#6366f1 − lightness', '#4c51bf'],
            ['saturate', 'saturate 0.2', '#6366f1 + saturation', '#7c6cf8'],
            ['desaturate', 'desaturate 0.3', '#6366f1 − saturation', '#8b83c4'],
            ['alpha', 'alpha 0.5', '#6366f1 at 50%', '#6366f180'],
            ['tint', 'tint 40%', '#6366f1 + 40% white', '#a5b4fc'],
            ['shade', 'shade 30%', '#6366f1 + 30% black', '#4551c9'],
          ].map(([method, syntax, example, result], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{method}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{syntax}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{example}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{result}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>Contrast</h3>
      <p className={paragraph}>
        Automatically adjust foreground colors to meet WCAG contrast thresholds against backgrounds.
        Uses binary search in the OKLCH color space — preserves hue and saturation while adjusting
        only lightness. The result maintains the designer's visual intent.
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Auto-fix strategies
{ type: 'contrast', foreground: 'text.onPrimary', background: 'primary.500', target: 4.5, autoFix: 'auto' }
// 'auto' — darken or lighten based on background luminance (default)
// 'darken' — only darken the foreground
// 'lighten' — only lighten the foreground`}</code></pre>

      <p className={paragraph}>
        The algorithm runs 24 iterations of binary search to find the closest passing color.
        If the foreground is <code className={inlineCode}>#a5b4fc</code> on a white background (ratio 2.1:1),
        it finds the minimum lightness shift needed to hit 4.5:1 — preserving the blue hue and saturation
        instead of jumping to black.
      </p>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>Harmony</h3>
      <p className={paragraph}>
        Generate color palettes from a single source using color theory rules.
        All computed in OKLCH for perceptually accurate results.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Rule</th><th className={docTh}>Hue Shift</th><th className={docTh}>Example (source: blue)</th></tr></thead>
          <tbody>{[
            ['complementary', '+180°', 'blue → orange/amber'],
            ['analogous', '±30°', 'blue → blue-green, blue-purple'],
            ['triadic', '+120°, +240°', 'blue → red, yellow'],
            ['same-lightness', '0° (match L)', 'blue → blue (same perceived brightness)'],
          ].map(([rule, shift, example], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{rule}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{shift}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{example}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Topological Propagation</h2>
      <p className={paragraph}>
        When a source token changes, ChainCSS builds a dependency graph and propagates
        changes in the correct order using topological sort. This handles chains of derivations
        correctly:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`tokens: {
  relationships: [
    // Step 1: primary.500 → primary.300 (mix-white 40%)
    { type: 'derived', source: 'colors.primary.500', target: 'colors.primary.300', method: 'mix-white 40%' },
    
    // Step 2: primary.300 → primary.100 (lighten 0.2) — depends on step 1
    { type: 'derived', source: 'colors.primary.300', target: 'colors.primary.100', method: 'lighten 0.2' },
    
    // Step 3: text.onPrimary must contrast against primary.500 — depends on steps 1-2
    { type: 'contrast', foreground: 'colors.text.onPrimary', background: 'colors.primary.500', target: 4.5 },
  ]
}`}</code></pre>

      <p className={paragraph}>
        The engine detects that <code className={inlineCode}>primary.100</code> depends on{' '}
        <code className={inlineCode}>primary.300</code> which depends on{' '}
        <code className={inlineCode}>primary.500</code>. It computes them in order:{' '}
        <code className={inlineCode}>500 → 300 → 100 → contrast check</code>.
        If a cycle is detected, it throws a clear error with the cycle path.
      </p>

      <h2 className={sectionHeading}>CLI Usage</h2>

      <pre className={codeBlock}><code className="language-bash">{`# One-time propagation
chaincss entanglement --input tokens.json --fix

# Watch mode — re-propagates on every file change
chaincss entanglement --input tokens.json --watch --fix

# With verbose output
chaincss entanglement --input tokens.json --watch --fix --verbose

# Figma-compatible output
chaincss entanglement --input tokens.json --figma --fix`}</code></pre>

      <h2 className={sectionHeading}>Figma Integration</h2>
      <p className={paragraph}>
        ChainCSS can watch a Figma Tokens Studio export and propagate changes automatically.
        Combined with the GitHub Actions workflow, this creates a bidirectional sync:
      </p>

      <pre className={codeBlock}><code className="language-bash">{`# Initialize Figma sync
chaincss figma init --repo org/design-tokens --fileId abc123

# This creates:
# tokens/global.json           — your token definitions
# .github/workflows/chaincss-tokens.yml — auto-fix on push
# .tokensstudio/README.md      — setup instructions for designers`}</code></pre>

      <p className={paragraph}>
        The workflow: Designer changes a color in Figma → Tokens Studio pushes to GitHub →
        GitHub Action runs <code className={inlineCode}>chaincss entanglement --fix</code> →
        derived tokens update → contrast auto-fixes apply → changes committed back →
        developers pull updated tokens → <code className={inlineCode}>chaincss watch</code> recompiles →
        browser updates via HMR.
      </p>

      <div className={note}>
        <strong>💡 Pro tip:</strong> Use <code className={inlineCode}>chaincss audit --fix --write</code> in CI
        to guarantee every PR maintains WCAG AA compliance. The contrast auto-fix uses binary search
        in OKLCH — preserving hue and saturation while only adjusting lightness.
      </div>

      <h2 className={sectionHeading}>OKLCH Color Space</h2>
      <p className={paragraph}>
        Why OKLCH instead of HSL or RGB? Because it's perceptually uniform.
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Color Space</th><th className={docTh}>Mixing</th><th className={docTh}>Perceptual Uniformity</th><th className={docTh}>Contrast Prediction</th></tr></thead>
          <tbody>{[
            ['RGB', '❌ Muddy midpoints', '❌ Nonlinear', '❌ Unreliable'],
            ['HSL', '❌ Yellow appears brighter than blue at same L', '❌ Nonlinear', '❌ Unreliable'],
            ['OKLCH', '✅ Smooth, natural gradients', '✅ Perceptually uniform', '✅ Reliable luminance'],
          ].map(([space, mixing, uniformity, contrast], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{space}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{mixing}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{uniformity}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{contrast}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <p className={paragraph}>
        OKLCH is the same color space used in CSS Color Level 4. It's the standard for modern
        color manipulation on the web. ChainCSS implements the full conversion pipeline:{' '}
        <code className={inlineCode}>sRGB → Linear RGB → LMS → OKLab → OKLCH</code> and back.
      </p>

      <h2 className={sectionHeading}>Configuration Reference</h2>

      <pre className={codeBlock}><code className="language-ts">{`interface Relationship {
  type: 'derived' | 'contrast' | 'harmony'
  id?: string                    // Optional identifier
}

// Derived
interface DerivedRelationship extends Relationship {
  type: 'derived'
  source: string                 // Source token path
  target: string                 // Target token path
  method: 'mix-white 80%' | 'mix-black 20%' | 'lighten 0.2' | 'darken 0.15'
         | 'saturate 0.3' | 'desaturate 0.2' | 'alpha 0.5'
         | 'tint 40%' | 'shade 30%'
}

// Contrast
interface ContrastRelationship extends Relationship {
  type: 'contrast'
  foreground: string             // Token path for text/foreground
  background: string | string[]  // Token path(s) for background
  target?: number                // WCAG ratio target (default: 4.5)
  autoFix?: 'auto' | 'darken' | 'lighten'
  priority?: number              // Higher = fixed first
}

// Harmony
interface HarmonyRelationship extends Relationship {
  type: 'harmony'
  source: string                 // Source token path
  targets: string[]              // Target token paths
  rule: 'complementary' | 'analogous' | 'triadic' | 'same-lightness'
}`}</code></pre>
    </>
  );
}