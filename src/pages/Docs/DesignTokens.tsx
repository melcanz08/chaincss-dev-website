import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function DesignTokens() {
  return (
    <>
      <h1 className={contentTitle}>Design Tokens</h1>
      <p className={contentDesc}>
        Define colors, spacing, typography, and effects once.
        Reference them with <code className={inlineCode}>$token.path</code> syntax.
        Resolved at build time to static values.
      </p>

      <h2 className={sectionHeading}>Defining Tokens</h2>
      <p className={paragraph}>
        Create a <code className={inlineCode}>chaincss.config.js</code> in your project root:
      </p>
      <pre className={codeBlock}>{`// chaincss.config.js
export default {
  tokens: {
    tokens: {
      colors: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        surface: '#1A1A2E',
        text: '#E2E8F0',
        textMuted: '#94A3B8',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      typography: {
        fontFamily: "'Inter', sans-serif",
        fontSizeSm: '12px',
        fontSizeBase: '14px',
        fontSizeLg: '18px',
        fontWeightNormal: '400',
        fontWeightBold: '700',
      },
      effects: {
        radius: '8px',
        shadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease',
      },
    },
  },
}`}</pre>

      <h2 className={sectionHeading}>Using Tokens in Styles</h2>
      <p className={paragraph}>
        Reference any token with <code className={inlineCode}>$category.key</code>:
      </p>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

export const card = chain()
  .bg('$colors.surface')                          // → background: #1A1A2E
  .color('$colors.text')                           // → color: #E2E8F0
  .fontFamily("$typography.fontFamily")            // → font-family: 'Inter', sans-serif
  .fontSize('$typography.fontSizeBase')            // → font-size: 14px
  .padding('$spacing.lg')                          // → padding: 24px
  .rounded('$effects.radius')                      // → border-radius: 8px
  .boxShadow('$effects.shadow')                    // → box-shadow: 0 4px 12px rgba(0,0,0,0.3)
  .$el('card')`}</pre>

      <h2 className={sectionHeading}>Compound Token Values</h2>
      <p className={paragraph}>
        Mix tokens with static values in the same property:
      </p>
      <pre className={codeBlock}>{`chain()
  .padding('$spacing.sm $spacing.md')    // → padding: 8px 16px
  .border('1px solid $colors.primary')   // → border: 1px solid #6366f1
  .margin('$spacing.xs $spacing.sm $spacing.xs $spacing.sm')
  .$el('input')`}</pre>

      <h2 className={sectionHeading}>Tokens in Pseudo-Classes</h2>
      <p className={paragraph}>
        Tokens work inside hover, focus, and other pseudo-classes:
      </p>
      <pre className={codeBlock}>{`chain()
  .bg('$colors.primary')
  .hover()
    .bg('$colors.primaryHover')     // token inside hover!
  .end()
  .focus()
    .outline('2px solid $colors.primary')
  .end()
  .$el('btn')`}</pre>

      <h2 className={sectionHeading}>Theme Contracts</h2>
      <p className={paragraph}>
        Define a contract that themes must fulfill. ChainCSS validates themes at build time:
      </p>
      <pre className={codeBlock}>{`import { createThemeContract, createTheme } from 'chaincss'

// 1. Define the contract (what every theme must provide)
const contract = createThemeContract({
  colors: {
    primary: '',
    background: '',
    text: '',
  },
  spacing: {
    sm: '',
    md: '',
    lg: '',
  },
})

// 2. Create themes that satisfy the contract
export const lightTheme = createTheme(contract, {
  colors: {
    primary: '#6366f1',
    background: '#ffffff',
    text: '#1e293b',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
})

export const darkTheme = createTheme(contract, {
  colors: {
    primary: '#818cf8',
    background: '#0f172a',
    text: '#e2e8f0',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
  },
})`}</pre>

      <div className={note}>
        <strong>🔒 Build-time validation:</strong> If a theme is missing a token defined in the contract,
        ChainCSS throws a compile error — catch theme mismatches before they reach production.
      </div>

      <h2 className={sectionHeading}>Dynamic Theme Switching</h2>
      <p className={paragraph}>
        For runtime theme switching (dark/light mode), use <code className={inlineCode}>useCSSVariables</code> mode
        which emits <code className={inlineCode}>var(--theme-*)</code> instead of hardcoded values:
      </p>
      <pre className={codeBlock}>{`import { resolveToken } from 'chaincss/tokens'

// Static mode: $colors.primary → #6366f1 (hardcoded)
resolveToken('$colors.primary')

// Dynamic mode: $colors.primary → var(--theme-colors-primary)
resolveToken('$colors.primary', true, tokens, true)
//                                              ^^^^ useCSSVariables = true`}</pre>
    </>
  );
}
