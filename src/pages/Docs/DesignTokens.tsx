import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';
export default function DesignTokens() {
  usePrism([]);
  return (
    <>
      <h1 className={contentTitle}>Design Tokens</h1>
      <p className={contentDesc}>
        Define colors, spacing, and typography once. Reference them everywhere. 
        ChainCSS treats tokens as a <strong>connected graph</strong> — change one value 
        and every derived shade updates automatically.
      </p>

      <h2 className={sectionHeading}>Defining Tokens</h2>
      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.js
export default {
  tokens: {
    tokens: {
      colors: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        surface: '#1A1A2E',
        text: '#E2E8F0',
      },
      spacing: { sm: '8px', md: '16px', lg: '24px' },
      typography: {
        fontFamily: "'Inter', sans-serif",
        fontSizeBase: '14px',
      },
    },
  },
}`}</code></pre>

      <h2 className={sectionHeading}>Using Tokens</h2>
      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

export const card = chain()
  .background({ color: '$colors.surface' })
  .typography({ 
    color: '$colors.text',
    fontFamily: '$typography.fontFamily',
    fontSize: '$typography.fontSizeBase',
  })
  .box({ padding: '$spacing.lg', borderRadius: 8 })
  .$el('card')`}</code></pre>

      <h2 className={sectionHeading}>Token Entanglement — The Graph</h2>
      <p className={paragraph}>
        Tokens aren't flat variables. Define relationships between them:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`// chaincss.config.js
export default {
  tokens: {
    tokens: {
      colors: { primary: { 500: '#6366f1' } },
      text: { onPrimary: '#ffffff' },
    },
    relationships: [
      // Derived — auto-computed when primary.500 changes
      { type: 'derived', source: 'primary.500', target: 'primary.100', method: 'mix-white 80%' },
      { type: 'derived', source: 'primary.500', target: 'primary.600', method: 'shade 20%' },
      // Contrast — auto-fixes text to keep 4.5:1 ratio
      { type: 'contrast', foreground: 'text.onPrimary', background: 'primary.500', target: 4.5 },
    ],
  },
}`}</code></pre>
      <p className={paragraph}>
        Change <code className={inlineCode}>primary.500</code> and every derived shade, hover state, 
        and text contrast propagates automatically via topological sort.
      </p>

      <h2 className={sectionHeading}>Theme Contracts</h2>
      <pre className={codeBlock}><code className="language-ts">{`import { createThemeContract, createTheme } from 'chaincss'

const contract = createThemeContract({
  colors: { primary: '', background: '', text: '' },
})

export const lightTheme = createTheme(contract, {
  colors: { primary: '#6366f1', background: '#ffffff', text: '#1e293b' },
})

export const darkTheme = createTheme(contract, {
  colors: { primary: '#818cf8', background: '#0f172a', text: '#e2e8f0' },
})`}</code></pre>

      <div className={note}>
        <strong>🔒 Build-time validation:</strong> Missing tokens in a theme contract throw compile errors — 
        catch mismatches before production. For automated contrast fixing, run{' '}
        <code className={inlineCode}>npx chaincss audit --fix --write</code>.
      </div>
    </>
  );
}