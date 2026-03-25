export default function Theming() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Dynamic Theming</h1>
        <p className="docs-description">
          Create and switch themes with design tokens
        </p>
      </div>

      <h2>Design Tokens</h2>
      <p>
        Tokens are the building blocks of your design system. They centralize colors, spacing, typography, and more.
      </p>
      <div className="code-block">
        <pre>{`import { createTokens } from 'chaincss';

const tokens = createTokens({
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#8b5cf6'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700'
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
});`}</pre>
      </div>

      <h2>Using Tokens in Styles</h2>
      <div className="code-block">
        <pre>{`const button = $()
  .backgroundColor('$colors.primary')
  .padding('$spacing.md')
  .fontSize('$typography.fontSize.base')
  .fontWeight('$typography.fontWeight.medium')
  .block();`}</pre>
      </div>

      <h2>Theme Switching</h2>
      <div className="code-block">
        <pre>{`// Create multiple themes
const lightTheme = createTokens({
  colors: { background: '#ffffff', text: '#1f2937', primary: '#3b82f6' }
});

const darkTheme = createTokens({
  colors: { background: '#1f2937', text: '#f9fafb', primary: '#60a5fa' }
});

// In your component
function App() {
  const [theme, setTheme] = useState(lightTheme);
  
  const styles = useChainStyles(() => ({
    app: $()
      .backgroundColor('$colors.background')
      .color('$colors.text')
      .block()
  }), [theme]);
  
  return (
    <div className={styles.app}>
      <button onClick={() => setTheme(isDark ? lightTheme : darkTheme)}>
        Toggle Theme
      </button>
    </div>
  );
}`}</pre>
      </div>

      <h2>Responsive Values</h2>
      <div className="code-block">
        <pre>{`import { responsive } from 'chaincss';

const fontSize = responsive({
  base: '14px',
  sm: '16px',
  md: '18px',
  lg: '20px',
  xl: '24px'
});

// Generates:
// font-size: 14px;
// @media (min-width: 640px) { font-size: 16px; }
// @media (min-width: 768px) { font-size: 18px; }
// ...`}</pre>
      </div>

      <h2>CSS Variables from Tokens</h2>
      <div className="code-block">
        <pre>{`// Generate CSS variables for runtime theming
const cssVars = tokens.toCSSVariables('chain');

// Output:
// :root {
//   --chain-colors-primary: #3b82f6;
//   --chain-spacing-md: 1rem;
//   --chain-typography-fontSize-base: 1rem;
// }`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Tip:</strong> Use the token system to ensure design consistency across your entire app!
      </div>
    </>
  );
}