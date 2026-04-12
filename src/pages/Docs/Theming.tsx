import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Theming() {
  const [activeExample, setActiveExample] = useState('basic');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [customColor, setCustomColor] = useState('#3b82f6');
  
  const themes = {
    light: {
      name: 'Light',
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        textMuted: '#64748b',
        border: '#e2e8f0',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b'
      }
    },
    dark: {
      name: 'Dark',
      colors: {
        primary: '#60a5fa',
        secondary: '#9ca3af',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
        textMuted: '#94a3b8',
        border: '#334155',
        success: '#34d399',
        danger: '#f87171',
        warning: '#fbbf24'
      }
    },
    forest: {
      name: 'Forest',
      colors: {
        primary: '#10b981',
        secondary: '#34d399',
        background: '#ecfdf5',
        surface: '#ffffff',
        text: '#064e3b',
        textMuted: '#047857',
        border: '#d1fae5',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b'
      }
    },
    sunset: {
      name: 'Sunset',
      colors: {
        primary: '#f97316',
        secondary: '#ef4444',
        background: '#fff7ed',
        surface: '#ffffff',
        text: '#7c2d12',
        textMuted: '#9a3412',
        border: '#fed7aa',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b'
      }
    }
  };
  
  const examples = {
    basic: {
      title: 'Basic Theming',
      description: 'Create a theme-aware component using design tokens',
      code: `import { createTokens } from 'chaincss';

const lightTheme = createTokens({
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b',
    surface: '#f8fafc',
    border: '#e2e8f0'
  }
});

const darkTheme = createTokens({
  colors: {
    primary: '#60a5fa',
    background: '#0f172a',
    text: '#f1f5f9',
    surface: '#1e293b',
    border: '#334155'
  }
});

export const card = $
  .bg('$colors.surface')
  .c('$colors.text')
  .border(\`1px solid $colors.border\`)
  .rounded('12px')
  .p('24px')
  .$el('.card');`,
      preview: () => {
        const theme = themes[currentTheme];
        
        return (
          <div style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            padding: '24px',
            borderRadius: '12px',
            transition: 'all 0.3s',
            border: `1px solid ${theme.colors.border}`
          }}>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['light', 'dark', 'forest', 'sunset'].map((themeName) => (
                <button 
                  key={themeName}
                  onClick={() => setCurrentTheme(themeName)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: currentTheme === themeName ? theme.colors.primary : 'transparent',
                    color: currentTheme === themeName ? 'white' : theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
            <div style={{
              backgroundColor: theme.colors.surface,
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${theme.colors.border}`
            }}>
              <h3 style={{ color: theme.colors.primary, marginBottom: '8px' }}>
                {theme.name} Theme
              </h3>
              <p>This card adapts to the selected theme using design tokens.</p>
              <button style={{
                backgroundColor: theme.colors.primary,
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '12px'
              }}>
                Themed Button
              </button>
            </div>
          </div>
        );
      }
    },
    tokens: {
      title: 'Design Tokens',
      description: 'Create reusable design tokens for consistent theming',
      code: `import { createTokens } from 'chaincss';

const tokens = createTokens({
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px'
  }
});

export const button = $
  .bg('$colors.primary.500')
  .c('white')
  .p('$spacing.md $spacing.lg')
  .rounded('$borderRadius.md')
  .textSize('$typography.fontSize.base')
  .$el('.btn');`,
      preview: () => {
        const theme = themes[currentTheme];
        
        return (
          <div style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            padding: '24px',
            borderRadius: '12px',
            transition: 'all 0.3s',
            border: `1px solid ${theme.colors.border}`
          }}>
            <h3 style={{ marginBottom: '16px' }}>Design Tokens Preview</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['500', '600', '700'].map((shade) => (
                <div key={shade}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: `#${shade === '500' ? '3b82f6' : shade === '600' ? '2563eb' : '1d4ed8'}`,
                    borderRadius: '8px',
                    marginBottom: '4px'
                  }} />
                  <span style={{ fontSize: '12px' }}>Primary {shade}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ padding: '8px 16px', backgroundColor: theme.colors.surface, borderRadius: '8px', border: `1px solid ${theme.colors.border}` }}>
                <span style={{ fontSize: '12px' }}>xs (4px)</span>
              </div>
              <div style={{ padding: '12px 20px', backgroundColor: theme.colors.surface, borderRadius: '8px', border: `1px solid ${theme.colors.border}` }}>
                <span style={{ fontSize: '12px' }}>md (16px)</span>
              </div>
              <div style={{ padding: '16px 24px', backgroundColor: theme.colors.surface, borderRadius: '8px', border: `1px solid ${theme.colors.border}` }}>
                <span style={{ fontSize: '12px' }}>xl (32px)</span>
              </div>
            </div>
          </div>
        );
      }
    },
    runtime: {
      title: 'Runtime Theme Switching',
      description: 'Switch themes dynamically without rebuilding',
      code: `import { createTokens } from 'chaincss';

const themes = {
  light: createTokens({
    colors: { primary: '#3b82f6', background: '#ffffff', text: '#1e293b' }
  }),
  dark: createTokens({
    colors: { primary: '#60a5fa', background: '#0f172a', text: '#f1f5f9' }
  })
};

function switchTheme(themeName) {
  const theme = themes[themeName];
  const vars = theme.toCSSVariables();
  const style = document.getElementById('theme-vars') || document.createElement('style');
  style.id = 'theme-vars';
  style.textContent = vars;
  document.head.appendChild(style);
}

export const card = $
  .bg('var(--colors-background)')
  .c('var(--colors-text)')
  .$el('.card');`,
      preview: () => {
        const theme = themes[currentTheme];
        const isDark = currentTheme === 'dark';
        
        return (
          <div style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            padding: '24px',
            borderRadius: '12px',
            transition: 'all 0.3s',
            border: `1px solid ${theme.colors.border}`
          }}>
            <div style={{ marginBottom: '20px' }}>
              <button 
                onClick={() => setCurrentTheme(isDark ? 'light' : 'dark')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Switch to {isDark ? 'Light' : 'Dark'} Mode
              </button>
            </div>
            <p>Theme is now: <strong>{theme.name}</strong></p>
            <p>No rebuild needed. Theme switches at runtime.</p>
          </div>
        );
      }
    },
    custom: {
      title: 'Custom Theme Builder',
      description: 'Let users build their own custom themes',
      code: `import { useState } from 'react';
import { createTokens } from 'chaincss';

function CustomThemeBuilder() {
  const [customTheme, setCustomTheme] = useState({
    primary: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b'
  });
  
  const tokens = createTokens({ colors: customTheme });
  
  const styles = $
    .bg('$colors.background')
    .c('$colors.text')
    .$el('.app');
  
  return (
    <div className={styles.app}>
      <input 
        type="color" 
        value={customTheme.primary}
        onChange={(e) => setCustomTheme({
          ...customTheme,
          primary: e.target.value
        })}
      />
      <button style={{ backgroundColor: customTheme.primary }}>
        Themed Button
      </button>
    </div>
  );
}`,
      preview: () => {
        const theme = themes[currentTheme];
        
        return (
          <div style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            padding: '24px',
            borderRadius: '12px',
            transition: 'all 0.3s',
            border: `1px solid ${theme.colors.border}`
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                Primary Color:
              </label>
              <input 
                type="color" 
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.border}`,
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              />
              <button style={{
                backgroundColor: customColor,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%'
              }}>
                Custom Themed Button
              </button>
            </div>
            <p style={{ fontSize: '12px', color: theme.colors.textMuted, marginTop: '12px' }}>
              Pick any color to create your own theme
            </p>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Dynamic Theming</h1>
        <p className="docs-description">
          Create powerful, dynamic themes with ChainCSS design tokens.
          Switch themes at runtime, build custom theme editors, and more.
        </p>
      </div>
      
      <h2>What is Dynamic Theming?</h2>
      <p>
        Dynamic theming allows you to change the look of your entire application
        at runtime. ChainCSS makes this easy with design tokens and CSS variables.
      </p>
      
      <div className="tip">
        <strong>Key Concepts:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Design Tokens:</strong> Reusable values for colors, spacing, typography</li>
          <li><strong>Theme Switching:</strong> Change tokens at runtime without rebuilding</li>
          <li><strong>CSS Variables:</strong> Output tokens as CSS custom properties</li>
          <li><strong>User Preferences:</strong> Respect system theme settings</li>
        </ul>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('basic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white',
            color: activeExample === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Basic Theming
        </button>
        <button
          onClick={() => setActiveExample('tokens')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'tokens' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'tokens' ? '#eef2ff' : 'white',
            color: activeExample === 'tokens' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Design Tokens
        </button>
        <button
          onClick={() => setActiveExample('runtime')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'runtime' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'runtime' ? '#eef2ff' : 'white',
            color: activeExample === 'runtime' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Runtime Switching
        </button>
        <button
          onClick={() => setActiveExample('custom')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'custom' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'custom' ? '#eef2ff' : 'white',
            color: activeExample === 'custom' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Custom Theme Builder
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      <h2>System Theme Detection</h2>
      <CodeBlock language="javascript" code={`const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = prefersDark ? 'dark' : 'light';

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  applyTheme(newTheme);
});`} />
      
      <h2>CSS Variables Output</h2>
      <p>ChainCSS can output your design tokens as CSS variables for runtime theming:</p>
      <CodeBlock language="javascript" code={`const tokens = createTokens({
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b'
  }
});

const cssVariables = tokens.toCSSVariables();
// Output:
// :root {
//   --colors-primary: #3b82f6;
//   --colors-background: #ffffff;
//   --colors-text: #1e293b;
// }`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use semantic token names (<code className="inline-code">colors.primary</code> not <code className="inline-code">colors.blue</code>)</li>
          <li>Store user theme preferences in localStorage for persistence</li>
          <li>Respect system preferences by default (<code className="inline-code">prefers-color-scheme</code>)</li>
          <li>Use CSS variables for runtime theme switching</li>
          <li>Test themes for accessibility (contrast ratios)</li>
        </ul>
      </div>
    </>
  );
}