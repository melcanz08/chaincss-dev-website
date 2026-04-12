import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function CSSVariables() {
  const [activeTheme, setActiveTheme] = useState('light');
  const [showVariables, setShowVariables] = useState(true);
  
  const themes = {
    light: {
      name: 'Light Theme',
      variables: {
        '--color-primary': '#3b82f6',
        '--color-primary-dark': '#2563eb',
        '--color-secondary': '#6b7280',
        '--color-success': '#10b981',
        '--color-danger': '#ef4444',
        '--color-warning': '#f59e0b',
        '--color-background': '#ffffff',
        '--color-surface': '#f8fafc',
        '--color-text': '#1e293b',
        '--color-text-muted': '#64748b',
        '--color-border': '#e2e8f0',
        '--spacing-xs': '4px',
        '--spacing-sm': '8px',
        '--spacing-md': '16px',
        '--spacing-lg': '24px',
        '--spacing-xl': '32px',
        '--font-family-sans': 'system-ui, -apple-system, sans-serif',
        '--font-size-sm': '0.875rem',
        '--font-size-base': '1rem',
        '--font-size-lg': '1.125rem',
        '--font-size-xl': '1.25rem',
        '--font-size-2xl': '1.5rem',
        '--border-radius-sm': '4px',
        '--border-radius-md': '8px',
        '--border-radius-lg': '12px',
        '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }
    },
    dark: {
      name: 'Dark Theme',
      variables: {
        '--color-primary': '#60a5fa',
        '--color-primary-dark': '#3b82f6',
        '--color-secondary': '#9ca3af',
        '--color-success': '#34d399',
        '--color-danger': '#f87171',
        '--color-warning': '#fbbf24',
        '--color-background': '#0f172a',
        '--color-surface': '#1e293b',
        '--color-text': '#f1f5f9',
        '--color-text-muted': '#94a3b8',
        '--color-border': '#334155',
        '--spacing-xs': '4px',
        '--spacing-sm': '8px',
        '--spacing-md': '16px',
        '--spacing-lg': '24px',
        '--spacing-xl': '32px',
        '--font-family-sans': 'system-ui, -apple-system, sans-serif',
        '--font-size-sm': '0.875rem',
        '--font-size-base': '1rem',
        '--font-size-lg': '1.125rem',
        '--font-size-xl': '1.25rem',
        '--font-size-2xl': '1.5rem',
        '--border-radius-sm': '4px',
        '--border-radius-md': '8px',
        '--border-radius-lg': '12px',
        '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
      }
    }
  };
  
  const currentTheme = themes[activeTheme];
  
  const examples = {
    basic: {
      title: 'Basic CSS Variables Output',
      description: 'Generate CSS variables from your design tokens',
      code: `import { createTokens } from 'chaincss';

const tokens = createTokens({
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
  },
  typography: {
    fontFamily: 'system-ui',
    fontSize: {
      base: '1rem',
      lg: '1.125rem'
    }
  }
});

const cssVariables = tokens.toCSSVariables();

// Output:
// :root {
//   --colors-primary: #3b82f6;
//   --colors-secondary: #6b7280;
//   --colors-background: #ffffff;
//   --colors-text: #1e293b;
//   --spacing-sm: 8px;
//   --spacing-md: 16px;
//   --spacing-lg: 24px;
//   --typography-fontFamily: system-ui;
//   --typography-fontSize-base: 1rem;
//   --typography-fontSize-lg: 1.125rem;
// }`
    },
    usage: {
      title: 'Using CSS Variables in Styles',
      description: 'Reference CSS variables in your ChainCSS styles',
      code: `export const button = $
  .bg('var(--colors-primary)')
  .c('white')
  .p('var(--spacing-md) var(--spacing-lg)')
  .rounded('8px')
  .textSize('var(--typography-fontSize-base)')
  .hover()
    .bg('var(--colors-primary-dark)')
  .end()
  .transition('all 0.2s')
  .$el('.btn');`
    },
    runtime: {
      title: 'Runtime Theme Switching',
      description: 'Swap themes dynamically by changing CSS variables',
      code: `document.documentElement.style.setProperty('--colors-primary', '#3b82f6');
document.documentElement.style.setProperty('--colors-background', '#ffffff');
document.documentElement.style.setProperty('--colors-text', '#1e293b');

document.documentElement.style.setProperty('--colors-primary', '#60a5fa');
document.documentElement.style.setProperty('--colors-background', '#0f172a');
document.documentElement.style.setProperty('--colors-text', '#f1f5f9');`
    }
  };
  
  const [activeTab, setActiveTab] = useState('basic');
  const currentExample = examples[activeTab];
  
  const demoStyle = {
    backgroundColor: `var(--color-background)`,
    color: `var(--color-text)`,
    borderColor: `var(--color-border)`,
    fontFamily: `var(--font-family-sans)`
  };
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">CSS Variables</h1>
        <p className="docs-description">
          Generate CSS variables from your design tokens and use them for runtime theming.
        </p>
      </div>
      
      <h2>What are CSS Variables?</h2>
      <p>
        CSS variables (custom properties) allow you to store values that can be reused throughout your styles.
        ChainCSS can automatically convert your design tokens into CSS variables for runtime theming.
      </p>
      
      <div className="tip">
        <strong>Why use CSS variables?</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Runtime theming:</strong> Switch themes without rebuilding</li>
          <li><strong>Dynamic updates:</strong> Change values with JavaScript</li>
          <li><strong>Better performance:</strong> CSS variables are native to the browser</li>
          <li><strong>Scoped variables:</strong> Can be scoped to specific components</li>
        </ul>
      </div>
      
      <h2>Live Theme Demo</h2>
      <p>Toggle between light and dark mode to see CSS variables in action:</p>
      
      <div style={{ marginBottom: '24px' }}>
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
            Light Theme
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
            Dark Theme
          </button>
          <button
            onClick={() => setShowVariables(!showVariables)}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              color: '#475569',
              cursor: 'pointer'
            }}
          >
            {showVariables ? 'Hide Variables' : 'Show Variables'}
          </button>
        </div>
        
        <style>
          {Object.entries(currentTheme.variables).map(([key, value]) => `
            .theme-demo {
              ${key}: ${value};
            }
          `).join('\n')}
        </style>
        
        <div 
          className="theme-demo"
          style={{
            ...demoStyle,
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid',
            transition: 'all 0.3s'
          }}
        >
          <h2 style={{ 
            fontSize: 'var(--font-size-2xl)', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            color: 'var(--color-text)'
          }}>
            {currentTheme.name} Example
          </h2>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              cursor: 'pointer'
            }}>
              Primary Button
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: 'var(--color-primary)',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius-md)',
              border: `1px solid var(--color-primary)`,
              cursor: 'pointer'
            }}>
              Outline Button
            </button>
            <button style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'white',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              cursor: 'pointer'
            }}>
              Secondary Button
            </button>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--border-radius-lg)',
            marginBottom: '24px'
          }}>
            <p style={{ marginBottom: '8px' }}>
              This card uses <code className="inline-code">--color-surface</code> background.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Muted text using <code className="inline-code">--color-text-muted</code>
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
            gap: 'var(--spacing-sm)'
          }}>
            <div style={{ backgroundColor: 'var(--color-primary)', padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)', color: 'white', textAlign: 'center' }}>Primary</div>
            <div style={{ backgroundColor: 'var(--color-secondary)', padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)', color: 'white', textAlign: 'center' }}>Secondary</div>
            <div style={{ backgroundColor: 'var(--color-success)', padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)', color: 'white', textAlign: 'center' }}>Success</div>
            <div style={{ backgroundColor: 'var(--color-danger)', padding: 'var(--spacing-sm)', borderRadius: 'var(--border-radius-sm)', color: 'white', textAlign: 'center' }}>Danger</div>
          </div>
        </div>
      </div>
      
      {showVariables && (
        <div style={{ marginBottom: '32px' }}>
          <h3>Current CSS Variables</h3>
          <div style={{
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px',
            maxHeight: '300px'
          }}>
            {Object.entries(currentTheme.variables).map(([key, value]) => (
              <div key={key} style={{ padding: '4px 0' }}>
                <span style={{ color: '#60a5fa' }}>{key}</span>: <span style={{ color: '#34d399' }}>{value}</span>;
              </div>
            ))}
          </div>
        </div>
      )}
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('basic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'basic' ? '#eef2ff' : 'white',
            color: activeTab === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Generating Variables
        </button>
        <button
          onClick={() => setActiveTab('usage')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'usage' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'usage' ? '#eef2ff' : 'white',
            color: activeTab === 'usage' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Using Variables
        </button>
        <button
          onClick={() => setActiveTab('runtime')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'runtime' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'runtime' ? '#eef2ff' : 'white',
            color: activeTab === 'runtime' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Runtime Switching
        </button>
      </div>
      
      <CodeBlock language="javascript" code={currentExample.code} />
      
      <div className="tip">
        <strong>How it works:</strong>
        <p style={{ marginTop: '8px', marginBottom: 0 }}>
          <code className="inline-code">tokens.toCSSVariables()</code> converts nested token objects into flattened CSS variables.
          <br />
          Example: <code className="inline-code">colors.primary</code> → <code className="inline-code">--colors-primary</code>
        </p>
      </div>
      
      <h2>Scoped CSS Variables</h2>
      <p>You can scope CSS variables to specific components for better encapsulation:</p>
      <CodeBlock language="javascript" code={`export const cardStyles = $
  .select('.card')
    .setProperty('--card-padding', '20px')
    .setProperty('--card-bg', 'white')
    .p('var(--card-padding)')
    .bg('var(--card-bg)')
    .rounded('12px')
    .select('.card-title')
      .textSize('18px')
      .mb('8px')
      .$el()
    .$el()
  .$el();`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Naming Convention:</strong> Use <code className="inline-code">--category-property</code> (e.g., <code className="inline-code">--color-primary</code>)</li>
          <li><strong>Fallback Values:</strong> Always provide fallback values: <code className="inline-code">var(--color-primary, #3b82f6)</code></li>
          <li><strong>Scope Appropriately:</strong> Use <code className="inline-code">:root</code> for global variables, component classes for scoped variables</li>
          <li><strong>Performance:</strong> CSS variables are lightweight and performant - use them freely</li>
          <li><strong>Browser Support:</strong> CSS variables work in all modern browsers</li>
        </ul>
      </div>
      
      <h2>CSS Variables vs Design Tokens</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Design Tokens (Build Time)</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Used during build to generate CSS. Cannot be changed at runtime.
          </p>
          <code className="inline-code">$colors.primary</code>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>CSS Variables (Runtime)</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Generated from tokens. Can be changed at runtime with JavaScript.
          </p>
          <code className="inline-code">var(--colors-primary)</code>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Best of Both</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Use tokens at build time, output CSS variables for runtime theming.
          </p>
          <code className="inline-code">tokens.toCSSVariables()</code>
        </div>
      </div>
    </>
  );
}