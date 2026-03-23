export default function Theming() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Dynamic Theming</h1>
        <p className="docs-description">
          Create and manage design tokens for consistent theming
        </p>
      </div>
      
      <h2>Design Tokens</h2>
      <pre className="code-block">
        <code>{`import { createTokens, $ } from 'chaincss/react';

const tokens = createTokens({
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    gray: {
      100: '#f7fafc',
      900: '#1a202c'
    }
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  }
});

// Use tokens
const styles = $()
  .backgroundColor(tokens.colors.primary)
  .padding(tokens.spacing.md)
  .block();`}</code>
      </pre>
      
      <h2>Responsive Design</h2>
      <pre className="code-block">
        <code>{`import { responsive } from 'chaincss/react';

const styles = $()
  .fontSize(responsive({
    base: '16px',
    md: '18px',
    lg: '20px'
  }))
  .block();`}</code>
      </pre>
      
      <h2>CSS Variables</h2>
      <pre className="code-block">
        <code>{`// Generate CSS variables from tokens
const cssVars = tokens.toCSSVariables();
// Outputs: :root { --chain-colors-primary: #667eea; ... }`}</code>
      </pre>
    </>
  );
}