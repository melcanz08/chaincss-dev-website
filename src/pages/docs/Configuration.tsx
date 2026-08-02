import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Configuration() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Configuration</h1>
      <p className={contentDesc}>
        ChainCSS is configured through a single <code className={inlineCode}>chaincss.config.ts</code> file
        at the root of your project. Use the <code className={inlineCode}>defineConfig</code> helper
        for full TypeScript autocomplete and validation.
      </p>

      <h2 className={sectionHeading}>Quick Start</h2>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts
import { defineConfig } from 'chaincss'

export default defineConfig({
  inputs: ['src/**/*.chain.{ts,tsx}'],
  output: {
    cssFile: 'dist/styles.css',
    minify: false,
  },
  atomic: {
    enabled: true,
    threshold: 3,
    naming: 'readable',
  },
})`}</code></pre>

      <h2 className={sectionHeading}>Full Configuration Reference</h2>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Inputs & Output</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['inputs', 'string[]', "['src/**/*.chain.{ts,tsx}']", 'Glob patterns for .chain.ts files to compile'],
            ['output.cssFile', 'string', "'dist/styles.css'", 'Path for the combined CSS output'],
            ['output.minify', 'boolean', 'false', 'Minify CSS output (auto-enabled in production)'],
            ['output.generateGlobalCSS', 'boolean', 'true', 'Generate a global CSS file'],
            ['output.targets', 'string[]', "['css']", 'Emission targets: css, atomic-css, tailwind, design-tokens, figma, graph-json'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Atomic CSS</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['atomic.enabled', 'boolean', 'false', 'Enable atomic CSS extraction'],
            ['atomic.threshold', 'number', '3', 'Minimum usages before a declaration is extracted to a utility class'],
            ['atomic.naming', "'readable' | 'hash'", "'readable'", 'Class name style: readable (.bg-6366f1) or hash (.a1b2c3)'],
            ['atomic.mode', "'hybrid' | 'atomic-only'", "'hybrid'", 'Keep original classes alongside atomic, or only atomic'],
            ['atomic.minify', 'boolean', 'false', 'Use shorter hash names in production'],
            ['atomic.verbose', 'boolean', 'false', 'Log extraction statistics during build'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Design Tokens</h3>

      <pre className={codeBlock}><code className="language-ts">{`tokens: {
  // Custom token values (merged with ChainCSS defaults)
  tokens: {
    colors: {
      primary: { 500: '#6366f1' },
      brand: { main: '#ff6b6b' }
    },
    spacing: { xs: '4px', xl: '32px' }
  },
  
  // Token relationships (entanglement)
  relationships: [
    {
      type: 'derived',           // 'derived' | 'contrast' | 'harmony'
      source: 'colors.primary.500',
      target: 'colors.primary.100',
      method: 'mix-white 80%',   // mix-white, mix-black, lighten, darken, saturate, desaturate, alpha, tint, shade
    },
    {
      type: 'contrast',
      foreground: 'colors.text.onPrimary',
      background: 'colors.primary.500',
      target: 4.5,               // WCAG ratio target
      autoFix: 'auto',           // 'auto' | 'darken' | 'lighten'
      priority: 10,              // Higher = fixed first
    },
    {
      type: 'harmony',
      source: 'colors.primary.500',
      targets: ['colors.accent.500', 'colors.accent.300'],
      rule: 'complementary',     // 'complementary' | 'analogous' | 'triadic' | 'same-lightness'
    }
  ]
}`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Breakpoints</h3>

      <pre className={codeBlock}><code className="language-ts">{`breakpoints: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  // Custom breakpoints merged with defaults
  sidebar: '(min-width: 1024px)',
  'ultra-wide': '2560px',
}`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Prefixer</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['prefixer.enabled', 'boolean', 'true', 'Enable vendor prefixing'],
            ['prefixer.mode', "'lightweight' | 'full'", "'lightweight'", 'Lightweight (zero deps) or full (PostCSS + Autoprefixer)'],
            ['prefixer.browsers', 'string[]', "['> 0.5%', 'last 2 versions', 'not dead']", 'Browserslist query (full mode only)'],
            ['prefixer.flexbox', 'boolean | "no-2009"', 'true', 'Add flexbox prefixes (full mode only)'],
            ['prefixer.grid', "'autoplace' | 'no-autoplace' | false", "'autoplace'", 'Add grid prefixes (full mode only)'],
            ['prefixer.remove', 'boolean', 'true', 'Remove unnecessary prefixes'],
            ['prefixer.add', 'boolean', 'true', 'Add missing prefixes'],
            ['prefixer.sourceMap', 'boolean', 'true', 'Generate source maps'],
            ['prefixer.verbose', 'boolean', 'false', 'Log prefixing activity'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Accessibility</h3>

      <pre className={codeBlock}><code className="language-ts">{`a11y: {
  // Manual contrast pairs for audit
  pairs: [
    {
      foreground: 'colors.text.primary',
      background: 'colors.surface',
      label: 'Body text on background'
    },
    {
      foreground: 'colors.text.onPrimary',
      background: 'colors.primary.500',
      label: 'Button text'
    }
  ]
}`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Cache</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['cache.enabled', 'boolean', 'true', 'Enable compilation caching'],
            ['cache.maxAgeDays', 'number', '30', 'Max age for cache entries (persistent cache)'],
            ['cache.maxSizeMB', 'number', '500', 'Max cache size (persistent cache)'],
            ['cache.path', 'string', "'.chaincss-cache'", 'Cache directory path'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Custom Extensions</h3>

      <pre className={codeBlock}><code className="language-ts">{`// Register custom shorthands, macros, and intents
shorthands: {
  // Custom CSS property aliases
  'brand-bg': 'backgroundColor',
  'brand-text': 'color',
},

macros: {
  // Custom chainable macros
  brandCard(value, styles) {
    styles.borderRadius = '16px'
    styles.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'
    styles.backgroundColor = value || '#ffffff'
  }
},

intents: {
  // Custom design intents
  'brand-hero': {
    name: 'brand-hero',
    category: 'semantic',
    properties: {
      background: 'linear-gradient(135deg, $colors.primary.500, $colors.primary.700)',
      minHeight: '60vh',
    },
    a11y: ['contrast'],
  }
},

// Allow overriding built-in macros/shorthands
allowOverride: false,`}</code></pre>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Miscellaneous</h3>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Option</th>
            <th className={docTh}>Type</th>
            <th className={docTh}>Default</th>
            <th className={docTh}>Description</th>
          </tr></thead>
          <tbody>{[
            ['verbose', 'boolean', 'false', 'Enable verbose build output'],
            ['silent', 'boolean', 'false', 'Suppress all console output'],
            ['debug', 'boolean', 'false', 'Enable debug mode'],
            ['timeline', 'boolean', 'false', 'Record compilation timeline for snapshots'],
            ['sourceComments', 'boolean', 'false', 'Add source file comments in CSS output'],
            ['experimental.enablePipeline', 'boolean', 'true', 'Enable the compiler pipeline (disable for direct mode)'],
          ].map(([opt, type, def, desc], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{opt}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{type}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{def}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{desc}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Complete Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.ts — Full configuration
import { defineConfig } from 'chaincss'

export default defineConfig({
  // Input files
  inputs: ['src/**/*.chain.{ts,tsx}'],
  
  // Output
  output: {
    cssFile: 'dist/styles.css',
    minify: process.env.NODE_ENV === 'production',
    targets: ['css', 'design-tokens'],
  },
  
  // Atomic CSS
  atomic: {
    enabled: true,
    threshold: 3,
    naming: 'readable',
  },
  
  // Design tokens
  tokens: {
    tokens: {
      colors: {
        primary: { 500: '#6366f1' },
        brand: { main: '#ff6b6b' },
      },
      spacing: { xs: '4px', xl: '32px' },
    },
    relationships: [
      {
        type: 'derived',
        source: 'colors.primary.500',
        target: 'colors.primary.100',
        method: 'mix-white 80%',
      },
      {
        type: 'contrast',
        foreground: 'colors.text.onPrimary',
        background: 'colors.primary.500',
        target: 4.5,
        autoFix: 'auto',
      },
    ],
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
  
  // Vendor prefixing
  prefixer: {
    enabled: true,
    mode: 'lightweight',
  },
  
  // Accessibility
  a11y: {
    pairs: [
      { foreground: 'colors.text', background: 'colors.background', label: 'Body' },
    ],
  },
  
  // Logging
  verbose: false,
  silent: false,
})
`}</code></pre>

      <div className={note}>
        <strong>💡 Type-safe configuration:</strong> Use <code className={inlineCode}>defineConfig()</code> for
        full TypeScript autocomplete and validation. The helper provides type inference for all options.
        See <a href="/docs/tokens/entanglement" style={{ color: '#818cf8' }}>Token Entanglement</a> for
        relationship types and <a href="/docs/atomic" style={{ color: '#818cf8' }}>Atomic CSS</a> for
        extraction options.
      </div>
    </>
  );
}