import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function ThemeContracts() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Theme Contracts</h1>
      <p className={contentDesc}>
        Type-safe, runtime-validated design tokens. Define the shape of your theme once,
        create multiple theme instances (light, dark, brand variants), validate them at
        build time, and generate CSS custom properties scoped to any selector.
      </p>

      <h2 className={sectionHeading}>The Problem: Ad-Hoc Theme Objects</h2>
      <p className={paragraph}>
        Most theming systems use plain JavaScript objects. Nothing stops a developer from
        accidentally writing <code className={inlineCode}>colours</code> instead of{' '}
        <code className={inlineCode}>colors</code>, or using a string where a nested object
        is expected. Errors surface at runtime — often as silently broken styles.
      </p>
      <p className={paragraph}>
        ChainCSS theme contracts define the <strong>shape</strong> of your theme separately
        from its <strong>values</strong>. The contract validates every theme instance at
        build time. Missing tokens throw errors. Extra tokens raise warnings (or errors in
        strict mode). Type mismatches are caught before any CSS is generated.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { createThemeContract, createTheme } from 'chaincss'

// Step 1: Define the shape (contract)
const designContract = createThemeContract({
  colors: {
    background: 'string',
    text: 'string',
    primary: {
      500: 'string',
      100: 'string',
    }
  },
  spacing: {
    sm: 'string',
    md: 'string',
    lg: 'string',
  },
  typography: {
    fontFamily: {
      sans: 'string',
      mono: 'string',
    },
    fontSize: {
      base: 'string',
      lg: 'string',
    }
  }
})

// Step 2: Create theme instances (values)
const lightTheme = createTheme(designContract, {
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: {
      500: '#6366f1',
      100: '#e0e7ff',
    }
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, sans-serif',
      mono: 'SFMono-Regular, monospace',
    },
    fontSize: {
      base: '1rem',
      lg: '1.125rem',
    }
  }
})

// Step 3: Generate CSS custom properties
console.log(lightTheme.toCSSVariables('theme'))
// :root {
//   --theme-colors-background: #ffffff;
//   --theme-colors-text: #111111;
//   --theme-colors-primary-500: #6366f1;
//   --theme-colors-primary-100: #e0e7ff;
//   --theme-spacing-sm: 0.5rem;
//   --theme-spacing-md: 1rem;
//   ...`}</code></pre>

      <h2 className={sectionHeading}>Scoped Theme Generation</h2>
      <p className={paragraph}>
        Themes can be scoped to any CSS selector — perfect for dark mode,
        branded sections, or multi-tenant applications:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`const darkTheme = createTheme(designContract, {
  colors: {
    background: '#111111',
    text: '#f9f9f9',
    primary: {
      500: '#818cf8',
      100: '#312e81',
    }
  },
  // ... same structure, different values
})

// Light theme on :root (default)
console.log(lightTheme.toCSSVariables('theme'))
// :root { --theme-colors-background: #ffffff; ... }

// Dark theme scoped to a data attribute
console.log(darkTheme.toCSSVariables('theme', { selector: '[data-theme="dark"]' }))
// [data-theme="dark"] { --theme-colors-background: #111111; ... }

// Brand-specific theme
console.log(acmeTheme.toCSSVariables('theme', { selector: '[data-brand="acme"]' }))
// [data-brand="acme"] { --theme-colors-background: #faf5ff; ... }

// Usage in HTML
// <html data-theme="dark">  →  dark theme applies
// <div data-brand="acme">   →  brand theme applies to this section`}</code></pre>

      <h2 className={sectionHeading}>Contract Validation</h2>
      <p className={paragraph}>
        The contract validates themes at creation time. Errors are thrown immediately —
        no silent failures, no debugging missing CSS variables at runtime.
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// This throws at build time:
const brokenTheme = createTheme(designContract, {
  colors: {
    background: '#ffffff',
    // text: missing!     ← Error: Missing required token "colors.text"
    primary: {
      500: '#6366f1',
      // 100: missing!    ← Error: Missing required token "colors.primary.100"
    }
  },
  spacing: {
    sm: 16,              // ← Error: Token "spacing.sm" must be string, got number
  }
})

// Error output:
// Theme Contract Validation Failed (3 errors):
//   ✗ Missing required token: "colors.text"
//   ✗ Missing required token: "colors.primary.100"
//   ✗ Token "spacing.sm" must be string|number, got number`}</code></pre>

      <h2 className={sectionHeading}>Strict Mode</h2>
      <p className={paragraph}>
        Strict mode treats extra tokens (ones not in the contract) as errors
        instead of warnings. This prevents accidental additions and keeps
        themes exactly aligned with the contract:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`const strictTheme = createTheme(designContract, {
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: { 500: '#6366f1', 100: '#e0e7ff' },
    accent: '#f59e0b',    // ← Error in strict mode: not in contract
  },
  // ...
}, { strict: true })`}</code></pre>

      <h2 className={sectionHeading}>Token Access & Cross-References</h2>
      <p className={paragraph}>
        Themes support path-based token access and cross-token references
        using the <code className={inlineCode}>$</code> prefix:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Direct access
lightTheme.get('colors.primary.500')   // → '#6366f1'
lightTheme.get('spacing.md')           // → '1rem'
lightTheme.get('colors.nonexistent')   // → undefined

// Cross-token references
const theme = createTheme(designContract, {
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: {
      500: '#6366f1',
      100: '$colors.primary.500',  // ← references another token (will be resolved)
    }
  },
  // ...
})

theme.get('colors.primary.100')  // → '#6366f1' (resolved from reference)`}</code></pre>

      <h2 className={sectionHeading}>Built-in Contrast Auditing</h2>
      <p className={paragraph}>
        Every theme instance has a built-in contrast checker. Pass token paths
        and get WCAG compliance results back:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`const results = lightTheme.auditContrast([
  { fg: 'colors.text', bg: 'colors.background', label: 'Body text' },
  { fg: 'colors.text', bg: 'colors.primary.500', label: 'Text on primary' },
])

// Returns:
// [
//   {
//     label: 'Body text',
//     fg: '#111111',
//     bg: '#ffffff',
//     ratio: 17.3,
//     passes: { AA: true, AALarge: true, AAA: true, AAALarge: true }
//   },
//   {
//     label: 'Text on primary',
//     fg: '#111111',
//     bg: '#6366f1',
//     ratio: 3.8,
//     passes: { AA: false, AALarge: true, AAA: false, AAALarge: true },
//     suggestion: 'Contrast 3.80 fails AA. Darken/lighten by ~18%'
//   }
// ]`}</code></pre>

      <h2 className={sectionHeading}>Figma Import</h2>
      <p className={paragraph}>
        Import tokens directly from Figma's JSON export format.
        The importer handles the Figma-specific structure (objects with{' '}
        <code className={inlineCode}>value</code> and <code className={inlineCode}>type</code> keys)
        and converts them to flat token values:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`import { createThemeFromFigma } from 'chaincss'

// Figma exports tokens as: { "primary": { "500": { "value": "#6366f1", "type": "color" } } }
const figmaJson = await fetch('https://api.figma.com/...').then(r => r.json())

// Import and validate against your contract
const figmaTheme = createThemeFromFigma(designContract, figmaJson)

// Now use like any other theme
figmaTheme.toCSSVariables('theme')
figmaTheme.auditContrast([...])`}</code></pre>

      <h2 className={sectionHeading}>Full Example: Light + Dark + High Contrast</h2>

      <pre className={codeBlock}><code className="language-ts">{`// theme-contract.ts
import { createThemeContract, createTheme } from 'chaincss'

export const designContract = createThemeContract({
  colors: {
    background: 'string',
    surface: 'string',
    text: 'string',
    textMuted: 'string',
    primary: { 500: 'string', 100: 'string' },
    border: 'string',
  },
  spacing: { sm: 'string', md: 'string', lg: 'string' },
  shadows: { sm: 'string', md: 'string', lg: 'string' },
})

export const lightTheme = createTheme(designContract, {
  colors: {
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textMuted: '#94a3b8',
    primary: { 500: '#6366f1', 100: '#e0e7ff' },
    border: '#e2e8f0',
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '2rem' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
})

export const darkTheme = createTheme(designContract, {
  colors: {
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#64748b',
    primary: { 500: '#818cf8', 100: '#312e81' },
    border: '#334155',
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '2rem' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.3)',
    md: '0 4px 6px rgba(0,0,0,0.4)',
    lg: '0 10px 15px rgba(0,0,0,0.5)',
  },
})

export const highContrastTheme = createTheme(designContract, {
  colors: {
    background: '#000000',
    surface: '#ffffff',
    text: '#ffffff',
    textMuted: '#cccccc',
    primary: { 500: '#ffff00', 100: '#333300' },
    border: '#ffffff',
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '2rem' },
  shadows: { sm: 'none', md: 'none', lg: 'none' },
})

// Generate CSS
const css = [
  lightTheme.toCSSVariables('theme'),
  darkTheme.toCSSVariables('theme', { selector: '[data-theme="dark"]' }),
  highContrastTheme.toCSSVariables('theme', { selector: '[data-theme="high-contrast"]' }),
].join('\\n')`}</code></pre>

      <div className={note}>
        <strong>💡 Best practice:</strong> Define your contract once in a shared file.
        Create theme instances for every mode your app supports. Generate CSS variables
        at build time. At runtime, switch themes by changing a data attribute — the
        browser handles the rest via CSS custom property resolution.
        Combine with <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a> to auto-derive
        shades, contrast colors, and harmony palettes from your source tokens.
      </div>
    </>
  );
}