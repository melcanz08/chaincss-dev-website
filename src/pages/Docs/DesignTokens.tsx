import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function DesignTokens() {
  const [activeMode, setActiveMode] = useState<'build' | 'runtime'>('build');
  const [activeTheme, setActiveTheme] = useState('light');
  
  const themes = {
    light: {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        background: '#ffffff',
        text: '#1e293b',
        border: '#e2e8f0'
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px'
      }
    },
    dark: {
      colors: {
        primary: '#60a5fa',
        secondary: '#9ca3af',
        background: '#0f172a',
        text: '#f1f5f9',
        border: '#334155'
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px'
      }
    }
  };
  
  const currentTheme = themes[activeTheme];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Design Tokens</h1>
        <p className="docs-description">
          Create a consistent design system with tokens for colors, spacing, typography, and more.
          Use them in build-time with the <code>:token.path</code> syntax or at runtime with CSS variables.
        </p>
      </div>
      
      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveMode('build')}
          style={{
            padding: '8px 24px',
            borderRadius: '8px',
            border: activeMode === 'build' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeMode === 'build' ? '#eef2ff' : 'white',
            color: activeMode === 'build' ? '#667eea' : '#475569',
            cursor: 'pointer',
            fontWeight: activeMode === 'build' ? '500' : 'normal'
          }}
        >
          Build-Time Mode
        </button>
        <button
          onClick={() => setActiveMode('runtime')}
          style={{
            padding: '8px 24px',
            borderRadius: '8px',
            border: activeMode === 'runtime' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeMode === 'runtime' ? '#eef2ff' : 'white',
            color: activeMode === 'runtime' ? '#667eea' : '#475569',
            cursor: 'pointer',
            fontWeight: activeMode === 'runtime' ? '500' : 'normal'
          }}
        >
          Runtime Mode (CSS Variables)
        </button>
      </div>
      
      {/* Build-Time Mode */}
      {activeMode === 'build' && (
        <>
          <h2>Creating Tokens (Build-Time)</h2>
          <CodeBlock language="javascript" code={`<@
createTokens({
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#1e293b'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});
@>`} />

          <h2>Using Tokens with <code>:token.path</code></h2>
          <p>Use the <code>$token.path</code> syntax anywhere in your CSS values:</p>
          <CodeBlock language="javascript" code={`<@
createTokens({
  colors: { primary: '#3b82f6', secondary: '#6b7280' },
  spacing: { sm: '8px', md: '16px', lg: '24px' }
});

const card = $()
  .backgroundColor('$colors.background')
  .color('$:colors.text')
  .border(\`1px solid $colors.primary\`)
  .margin(\`$spacing.md $spacing.lg\`)
  .padding(\`$spacing.sm $spacing.md $spacing.lg\`)
  .boxShadow(\`0 0 0 3px $colors.primary\`)
  .background(\`linear-gradient(135deg, $colors.primary, $colors.secondary)\`)
  .block('.card');

run(card);
@>`} />

          <div className="tip">
            <strong>Works everywhere!</strong> Tokens work in:
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              <li>Simple values: <code>$colors.primary</code></li>
              <li>Mixed with static text: <code>1px solid $colors.primary</code></li>
              <li>Multiple tokens: <code>:spacing.sm $spacing.md $spacing.lg</code></li>
              <li>Complex functions: <code>linear-gradient(135deg, $colors.primary, $colors.secondary)</code></li>
            </ul>
          </div>

          <h2>Output CSS</h2>
          <CodeBlock language="css" code={`.card {
  background-color: #ffffff;
  color: #1e293b;
  border: 1px solid #3b82f6;
  margin: 16px 24px;
  padding: 8px 16px 24px;
  box-shadow: 0 0 0 3px #3b82f6;
  background: linear-gradient(135deg, #3b82f6, #6b7280);
}`} />

          <h2>Alternative: tokens.get()</h2>
          <p>You can also use the explicit <code>tokens.get()</code> method when you need the value in JavaScript logic:</p>
          <CodeBlock language="javascript" code={`<@
const myTokens = createTokens({
  colors: { primary: '#3b82f6' }
});

const card = $()
  .backgroundColor(myTokens.get('colors.primary'))
  .block('.card');
@>`} />

          <div className="note">
            <strong>Tip:</strong> The <code>$token.path</code> syntax is cleaner for CSS values,
            while <code>tokens.get()</code> is useful when you need the value in JavaScript logic.
          </div>
        </>
      )}
      
      {/* Runtime Mode */}
      {activeMode === 'runtime' && (
        <>
          <h2>Creating Tokens (Runtime)</h2>
          <CodeBlock language="javascript" code={`import { createTokens } from 'chaincss';

const tokens = createTokens({
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b'
  },
  spacing: {
    md: '16px',
    lg: '24px'
  }
});`} />

          <h2>Using Tokens in Styles</h2>
          <CodeBlock language="javascript" code={`const card = $()
  .backgroundColor(tokens.get('colors.background'))
  .color(tokens.get('colors.text'))
  .padding(tokens.get('spacing.md'))
  .block('.card');

run(card);`} />

          <h2>CSS Variables for Runtime Theming</h2>
          <p>Generate CSS variables from your tokens for dynamic theme switching:</p>
          <CodeBlock language="javascript" code={`const tokens = createTokens({
  colors: {
    primary: '#3b82f6',
    background: '#ffffff'
  }
});

// Generate CSS variables
const cssVariables = tokens.toCSSVariables();

// Output:
// :root {
//   --colors-primary: #3b82f6;
//   --colors-background: #ffffff;
// }

// Inject into document
const style = document.createElement('style');
style.textContent = cssVariables;
document.head.appendChild(style);`} />

          <h2>Runtime Theme Switching</h2>
          <p>Switch themes dynamically using CSS variables:</p>
          <CodeBlock language="javascript" code={`// Define themes
const lightTheme = createTokens({
  colors: { primary: '#3b82f6', background: '#ffffff', text: '#1e293b' }
});

const darkTheme = createTokens({
  colors: { primary: '#60a5fa', background: '#0f172a', text: '#f1f5f9' }
});

// Theme switcher
function switchTheme(theme) {
  const vars = theme.toCSSVariables();
  const style = document.getElementById('theme-vars') || document.createElement('style');
  style.id = 'theme-vars';
  style.textContent = vars;
  document.head.appendChild(style);
}

// Use CSS variables in your styles
const card = $()
  .backgroundColor('var(--colors-background)')
  .color('var(--colors-text)')
  .block('.card');`} />

          <div className="tip">
            <strong>Live Theme Demo:</strong> Click the buttons below to see runtime theming in action!
          </div>
          
          {/* Live Theme Demo */}
          <div style={{ marginTop: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => setActiveTheme('light')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: activeTheme === 'light' ? '2px solid #667eea' : '1px solid #e2e8f0',
                  backgroundColor: activeTheme === 'light' ? '#eef2ff' : 'white',
                  color: activeTheme === 'light' ? '#667eea' : '#475569',
                  cursor: 'pointer'
                }}
              >
                Light Mode
              </button>
              <button
                onClick={() => setActiveTheme('dark')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  border: activeTheme === 'dark' ? '2px solid #667eea' : '1px solid #e2e8f0',
                  backgroundColor: activeTheme === 'dark' ? '#eef2ff' : 'white',
                  color: activeTheme === 'dark' ? '#667eea' : '#475569',
                  cursor: 'pointer'
                }}
              >
                Dark Mode
              </button>
            </div>
            
            <div style={{
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text,
              borderRadius: '12px',
              padding: '24px',
              border: `1px solid ${currentTheme.colors.border}`,
              transition: 'all 0.3s'
            }}>
              <h3 style={{ color: currentTheme.colors.primary, marginBottom: '12px' }}>
                Theme Preview
              </h3>
              <p>This card uses CSS variables for colors and spacing.</p>
              <button style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white',
                padding: `${currentTheme.spacing.sm} ${currentTheme.spacing.lg}`,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '12px'
              }}>
                Themed Button
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Token Structure Example */}
      <h2>Recommended Token Structure</h2>
      <CodeBlock language="javascript" code={`// tokens/index.js
import { createTokens } from 'chaincss';

export const tokens = createTokens({
  // Colors
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    accent: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8'
    },
    border: '#e2e8f0'
  },
  
  // Spacing scale
  spacing: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    8: '48px',
    10: '64px',
    12: '96px'
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      mono: 'monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  }
});`} />
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use semantic names (<code className="inline-code">colors.primary</code>) not literal names (<code className="inline-code">colors.blue</code>)</li>
          <li>Create a spacing scale with consistent increments</li>
          <li>Define typography with a modular scale</li>
          <li>Export tokens to CSS variables for runtime theming</li>
          <li>Keep tokens in a single source of truth file</li>
        </ul>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/css-properties" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← CSS Properties
        </a>
        <a href="/docs/recipe" style={{ color: '#667eea', textDecoration: 'none' }}>
          Recipe System →
        </a>
      </div>*/}
    </>
  );
}