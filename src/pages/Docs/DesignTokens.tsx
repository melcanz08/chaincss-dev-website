import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note
} from '../../styles/docs.chain.ts';

export default function DesignTokens() {
  return (
    <>
      <h1 className={contentTitle}>Design Tokens</h1>
      <p className={contentDesc}>
        Define design tokens once, use them everywhere. ChainCSS resolves tokens at build time.
      </p>

      <h2 className={sectionHeading}>Creating Tokens</h2>
      <pre className={codeBlock}>{`import { createTokens } from 'chaincss'

const tokens = createTokens({
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    surface: '#ffffff',
    text: '#1a1a2e'
  },
  typography: {
    heading: '32px',
    body: '16px',
    small: '14px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
})`}</pre>

      <h2 className={sectionHeading}>Using Tokens</h2>
      <pre className={codeBlock}>{`chain()
  .bg('$colors.primary')
  .color('$colors.text')
  .fontSize('$typography.body')
  .padding('$spacing.lg')
  .$el('card')`}</pre>

      <h2 className={sectionHeading}>Theme Contracts</h2>
      <pre className={codeBlock}>{`import { createThemeContract, createTheme, validateTheme } from 'chaincss'

const contract = createThemeContract({
  colors: { primary: '', surface: '', text: '' }
})

const lightTheme = createTheme(contract, {
  colors: {
    primary: '#6366f1',
    surface: '#ffffff',
    text: '#1a1a2e'
  }
})

const darkTheme = createTheme(contract, {
  colors: {
    primary: '#818cf8',
    surface: '#0a0a0f',
    text: '#e4e4e7'
  }
})

validateTheme(darkTheme, contract) // ✅ valid`}</pre>

      <div className={note}>
        <strong>Tokens resolve at build time.</strong> No runtime token resolution — 
        all token references are replaced with their values during compilation.
      </div>
    </>
  );
}
