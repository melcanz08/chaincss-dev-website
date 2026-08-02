import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const wcagChecks = [
  {
    check: 'Contrast Ratio',
    severity: 'Error',
    criterion: '1.4.3 Contrast (Minimum) — AA',
    threshold: '4.5:1 (normal), 3:1 (large text)',
    autoFix: 'Binary search in OKLCH — preserves hue/saturation, adjusts only lightness',
    detail: 'Scans every rule for color + background-color pairs. Skips var() references, currentColor, and gradients (cannot be statically analyzed). Inherits from :root/body/html as fallback context.'
  },
  {
    check: 'Font Size Minimum',
    severity: 'Warning',
    criterion: '1.4.4 Resize Text — AA',
    threshold: '12px minimum',
    autoFix: 'max(12px, original-value) — preserves the original value when larger',
    detail: 'Converts rem/em to px for comparison. Flags any font-size below 12px. Auto-fix wraps in max() so larger values are unchanged.'
  },
  {
    check: 'Touch Target Size',
    severity: 'Warning',
    criterion: '2.5.8 Target Size — AA',
    threshold: '44×44px minimum',
    autoFix: 'min-width/min-height for normal elements, ::after pseudo-element for small elements (icons, badges)',
    detail: 'Detects interactive elements by cursor:pointer or semantic selectors (button, btn, a, input, select, textarea). Small elements under 30px get a centered ::after with 44px touch area. Larger elements get min-width/min-height declarations.'
  },
  {
    check: 'Focus Visible',
    severity: 'Error',
    criterion: '2.4.7 Focus Visible — AA',
    threshold: 'Must have :focus-visible style if outline is removed',
    autoFix: 'Auto-injects :focus-visible { outline: 2px dashed currentColor; outline-offset: 2px }',
    detail: 'Detects outline:none or outline:0 without a corresponding :focus-visible or :focus style. The auto-fix uses currentColor so it adapts to the element\'s text color.'
  },
  {
    check: 'Reduced Motion',
    severity: 'Warning',
    criterion: '2.3.3 Animation from Interactions — AAA',
    threshold: 'Animations/transitions must be wrapped in prefers-reduced-motion',
    autoFix: 'Suggests wrapping in @media (prefers-reduced-motion: no-preference)',
    detail: 'Scans declarations and pseudo-classes for animation, transition, animation-name, and transition-property. Flags any that don\'t have a corresponding prefers-reduced-motion media query.'
  },
  {
    check: 'Hover Without Focus',
    severity: 'Warning',
    criterion: '1.4.13 Content on Hover or Focus — AA',
    threshold: ':hover must have equivalent :focus-visible',
    autoFix: 'Suggests mirroring hover styles to :focus-visible for keyboard users',
    detail: 'Detects rules with :hover but no :focus-visible. Keyboard-only users need the same affordances as mouse users.'
  },
];

export default function Accessibility() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Accessibility Audit</h1>
      <p className={contentDesc}>
        Six WCAG 2.2 checks run during compilation — not in CI, not in the browser.
        Milliseconds, not seconds. The compiler can automatically repair issues
        while preserving visual intent. No other CSS tool does this.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-bash">{`# Run audit — fails build on errors (CI-ready)
chaincss check --strict

# Run audit with auto-fix
chaincss check --fix

# Run audit and write fixes to token files
chaincss audit --fix --write

# Target specific WCAG level
chaincss audit --fail-on AA     # AA compliance (default)
chaincss audit --fail-on AAA    # AAA compliance (strict)

# Export JSON report
chaincss audit --json ./reports/a11y.json

# Verbose output with per-file details
chaincss check --verbose`}</code></pre>

      <h2 className={sectionHeading}>The Six WCAG Checks</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Check</th>
            <th className={docTh}>Severity</th>
            <th className={docTh}>WCAG Criterion</th>
            <th className={docTh}>Threshold</th>
            <th className={docTh}>Auto-Fix Method</th>
          </tr></thead>
          <tbody>
            {wcagChecks.map((c, i) => (
              <tr key={i}>
                <td className={docTd}><strong>{c.check}</strong></td>
                <td className={docTd}>
                  <span style={{ 
                    color: c.severity === 'Error' ? '#f87171' : '#fbbf24',
                    fontWeight: 600
                  }}>{c.severity}</span>
                </td>
                <td className={docTd} style={{ fontSize: 12 }}>{c.criterion}</td>
                <td className={docTd} style={{ fontSize: 13 }}>{c.threshold}</td>
                <td className={docTd} style={{ fontSize: 12 }}>{c.autoFix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>How Each Check Works</h2>

      {wcagChecks.map((c, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h3 style={{ color: '#e2e8f0', fontSize: 16, marginBottom: 8 }}>
            {c.check}
            <span style={{ 
              marginLeft: 8,
              fontSize: 12,
              color: c.severity === 'Error' ? '#f87171' : '#fbbf24',
              fontWeight: 600
            }}>{c.severity}</span>
          </h3>
          <p className={paragraph}>{c.detail}</p>
        </div>
      ))}

      <h2 className={sectionHeading}>Contrast Auto-Fix: How It Works</h2>
      <p className={paragraph}>
        The contrast auto-fix uses binary search in the OKLCH color space to find
        the closest passing color while preserving the designer's intent:
      </p>

      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li>Parse foreground and background colors to sRGB</li>
        <li>Convert to OKLCH (perceptually uniform color space)</li>
        <li>Determine direction: lighten or darken based on background luminance</li>
        <li>Binary search on the lightness channel (24 iterations = sub-pixel precision)</li>
        <li>Return the closest passing color — same hue, same saturation, only lightness adjusted</li>
      </ol>

      <pre className={codeBlock}><code className="language-text">{`# Before auto-fix
text.onPrimary: #a5b4fc on primary.500 (#6366f1)
  → Contrast ratio: 2.1:1 (FAILS AA 4.5:1)

# Binary search in OKLCH:
#   Iteration 1:  lightness 0.50 → ratio 3.2:1 (too low)
#   Iteration 2:  lightness 0.25 → ratio 4.8:1 (passes, try higher)
#   Iteration 3:  lightness 0.37 → ratio 4.2:1 (too low)
#   ...
#   Iteration 14: lightness 0.31 → ratio 4.52:1 (closest passing)

# After auto-fix
text.onPrimary: #7c6cf8 on primary.500 (#6366f1)
  → Contrast ratio: 4.52:1 (PASSES AA)
  → Hue preserved (blue), saturation preserved, only lightness adjusted`}</code></pre>

      <h2 className={sectionHeading}>Touch Target Auto-Fix: Two Strategies</h2>
      <p className={paragraph}>
        The touch target auto-fix uses different strategies depending on the element type:
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* Strategy 1: Normal interactive elements (buttons, links, inputs) */
.chain-btn {
  min-width: 44px;   /* ← auto-added */
  min-height: 44px;  /* ← auto-added */
}

/* Strategy 2: Small elements (icons, badges, chips, avatars) */
.chain-icon {
  position: relative;  /* ← auto-added if not present */
}
.chain-icon::after {   /* ← auto-generated pseudo-element */
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 44px;
  min-height: 44px;
}`}</code></pre>

      <p className={paragraph}>
        The small element detection uses a heuristic — if the selector contains
        <code className={inlineCode}>icon</code>, <code className={inlineCode}>badge</code>,{' '}
        <code className={inlineCode}>tag</code>, <code className={inlineCode}>chip</code>,{' '}
        <code className={inlineCode}>avatar</code>, <code className={inlineCode}>dot</code>, or if
        dimensions are under 30px, it uses the ::after strategy to avoid breaking the design.
      </p>

      <h2 className={sectionHeading}>Example Audit Output</h2>

      <pre className={codeBlock}><code className="language-text">{`$ chaincss check --strict

🔍 ChainCSS Audit Report
────────────────────────────────────────────────────────────
  Files audited:  47 in 1,247ms

📋 Details
────────────────────────────────────────────────────────────
  src/components/button.chain.ts (2 errors, 1 warning)
    ❌ Contrast ratio 3.2:1 below AA threshold (4.5:1)
        → Darken text or lighten background. Run with --fix to auto-correct.
    ❌ "outline: none" without :focus-visible override
        → Add :focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
    ⚠️  Touch target 32px below 44px minimum
        → Apply min-width: 44px; min-height: 44px;

  src/components/input.chain.ts (1 warning)
    ⚠️  Deploys animations without prefers-reduced-motion
        → Wrap in @media (prefers-reduced-motion: no-preference) { ... }

  src/components/card.chain.ts (1 warning)
    ⚠️  Has :hover but no :focus-visible fallback
        → Mirror hover styles to :focus-visible for keyboard users.

────────────────────────────────────────────────────────────
  🔴 ERRORS — 2
  🟡 WARNINGS — 3

❌ 2 critical issue(s) found.
  Run with --fix to auto-correct what can be fixed.`}</code></pre>

      <h2 className={sectionHeading}>CI Integration</h2>

      <pre className={codeBlock}><code className="language-yaml">{`# .github/workflows/a11y.yml
name: Accessibility Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      
      # Fail the build if any AA violation exists
      - run: npx chaincss check --strict
      
      # Auto-fix and commit (optional)
      - run: npx chaincss audit --fix --write
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: 'chore(a11y): auto-fix WCAG violations'`}</code></pre>

      <div className={note}>
        <strong>💡 Compile-time, not runtime:</strong> Traditional accessibility tools
        (Lighthouse, axe-core) need a running browser and rendered DOM. ChainCSS runs
        during compilation — same speed as your CSS build. Catch contrast failures,
        missing focus indicators, and undersized touch targets before they reach production.
        Combine with <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a> to
        auto-fix contrast across your entire token system when design tokens change.
      </div>
    </>
  );
}