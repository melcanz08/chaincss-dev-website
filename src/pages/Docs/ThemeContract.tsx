import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function ThemeContracts() {
  const [activeExample, setActiveExample] = useState('contract');
  
  // Move ALL hooks to the top level (outside the examples object)
  const [theme, setTheme] = useState('light');
  const [testTheme, setTestTheme] = useState('valid');
  
  const examples = {
    contract: {
      title: 'Defining a Theme Contract',
      description: 'Create a contract that defines the structure of your themes',
      code: `import { defineThemeContract } from 'chaincss';

const themeContract = defineThemeContract({
  colors: {
    primary: '',
    secondary: '',
    background: '',
    text: '',
    border: ''
  },
  spacing: {
    sm: '',
    md: '',
    lg: ''
  },
  typography: {
    fontFamily: '',
    fontSize: {
      small: '',
      base: '',
      large: ''
    }
  }
});`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`// theme-contract.js
export const themeContract = {
  colors: {
    primary: 'string',
    secondary: 'string',
    background: 'string',
    text: 'string',
    border: 'string'
  },
  spacing: {
    sm: 'string',
    md: 'string',
    lg: 'string'
  }
}

Contract defined - all themes must match this shape`}
          </pre>
        </div>
      )
    },
    create: {
      title: 'Creating a Theme',
      description: 'Create a theme that conforms to your contract',
      code: `import { defineThemeContract, createTheme } from 'chaincss';

const contract = defineThemeContract({
  colors: {
    primary: '',
    secondary: '',
    background: '',
    text: '',
    border: ''
  },
  spacing: {
    sm: '',
    md: '',
    lg: ''
  }
});

const lightTheme = createTheme(contract, {
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
});

const darkTheme = createTheme(contract, {
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
});`,
      preview: () => {
        const isDark = theme === 'dark';
        
        const lightStyles = {
          bg: '#ffffff',
          text: '#1e293b',
          primary: '#3b82f6',
          border: '#e2e8f0'
        };
        
        const darkStyles = {
          bg: '#0f172a',
          text: '#f1f5f9',
          primary: '#60a5fa',
          border: '#334155'
        };
        
        const styles = isDark ? darkStyles : lightStyles;
        
        return (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <button 
                onClick={() => setTheme('light')}
                style={{
                  padding: '8px 16px',
                  marginRight: '8px',
                  backgroundColor: !isDark ? styles.primary : '#e2e8f0',
                  color: !isDark ? 'white' : '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isDark ? styles.primary : '#e2e8f0',
                  color: isDark ? 'white' : '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Dark
              </button>
            </div>
            <div style={{
              backgroundColor: styles.bg,
              color: styles.text,
              padding: '20px',
              borderRadius: '12px',
              border: `1px solid ${styles.border}`,
              transition: 'all 0.3s'
            }}>
              <h3 style={{ color: styles.primary, marginBottom: '8px' }}>
                {theme === 'light' ? 'Light Theme' : 'Dark Theme'}
              </h3>
              <p>Both themes follow the same contract structure</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <span style={{ padding: '4px 8px', backgroundColor: styles.primary, color: 'white', borderRadius: '4px' }}>
                  Primary
                </span>
                <span style={{ padding: '4px 8px', backgroundColor: styles.border, borderRadius: '4px' }}>
                  Secondary
                </span>
              </div>
            </div>
          </div>
        );
      }
    },
    validate: {
      title: 'Theme Validation',
      description: 'Automatically validate themes against your contract',
      code: `import { defineThemeContract, createTheme, validateTheme } from 'chaincss';

const contract = defineThemeContract({
  colors: {
    primary: '',
    background: ''
  }
});

const validTheme = createTheme(contract, {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff'
  }
});

try {
  const invalidTheme = createTheme(contract, {
    colors: {
      primary: '#3b82f6'
    }
  });
} catch (err) {
  console.error('Validation failed:', err.message);
}

const isValid = validateTheme(contract, {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff'
  }
});`,
      preview: () => {
        const validThemeData = {
          colors: { primary: '#3b82f6', background: '#ffffff' }
        };
        
        const invalidThemeData = {
          colors: { primary: '#3b82f6' }
        };
        
        const themeData = testTheme === 'valid' ? validThemeData : invalidThemeData;
        const isValid = testTheme === 'valid';
        
        return (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <button 
                onClick={() => setTestTheme('valid')}
                style={{
                  padding: '8px 16px',
                  marginRight: '8px',
                  backgroundColor: testTheme === 'valid' ? '#10b981' : '#e2e8f0',
                  color: testTheme === 'valid' ? 'white' : '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Valid Theme
              </button>
              <button 
                onClick={() => setTestTheme('invalid')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: testTheme === 'invalid' ? '#ef4444' : '#e2e8f0',
                  color: testTheme === 'invalid' ? 'white' : '#1e293b',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Invalid Theme
              </button>
            </div>
            <div style={{
              backgroundColor: isValid ? '#ecfdf5' : '#fee2e2',
              border: `1px solid ${isValid ? '#10b981' : '#ef4444'}`,
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>
                {isValid ? '✓ Theme is valid' : '✗ Theme validation failed'}
              </div>
              <pre style={{ fontSize: '12px', margin: 0 }}>
                {JSON.stringify(themeData, null, 2)}
              </pre>
              {!isValid && (
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#991b1b' }}>
                  Missing required token: "colors.background"
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Theme Contracts</h1>
        <p className="docs-description">
          Ensure type safety and consistency across your themes with ChainCSS theme contracts.
          Define what a valid theme must contain and validate themes at creation time.
        </p>
      </div>
      
      <h2>What are Theme Contracts?</h2>
      <p>
        Theme contracts define the expected structure of your themes. They act as a blueprint,
        ensuring all your themes have the same shape and contain all required tokens.
      </p>
      
      <div className="tip">
        <strong>Why use theme contracts?</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Ensure all themes have the same structure</li>
          <li>Catch missing tokens early</li>
          <li>Improve maintainability across multiple themes</li>
          <li>Provide type safety when using themes</li>
        </ul>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('contract')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'contract' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'contract' ? '#eef2ff' : 'white',
            color: activeExample === 'contract' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Define Contract
        </button>
        <button
          onClick={() => setActiveExample('create')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'create' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'create' ? '#eef2ff' : 'white',
            color: activeExample === 'create' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Create Theme
        </button>
        <button
          onClick={() => setActiveExample('validate')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'validate' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'validate' ? '#eef2ff' : 'white',
            color: activeExample === 'validate' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Validate Themes
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
      
      <h2>API Reference</h2>
      
      <h3>defineThemeContract(contract)</h3>
      <p>Creates a theme contract that defines the required structure of your themes.</p>
      <CodeBlock language="javascript" code={`const contract = defineThemeContract({
  colors: {
    primary: '',
    secondary: '',
    background: ''
  },
  spacing: {
    sm: '',
    md: '',
    lg: ''
  }
});`} />
      
      <h3>createTheme(contract, values)</h3>
      <p>Creates a theme that conforms to the contract. Validates automatically.</p>
      <CodeBlock language="javascript" code={`const lightTheme = createTheme(contract, {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});`} />
      
      <h3>validateTheme(contract, theme)</h3>
      <p>Validates a theme against a contract without creating a token object.</p>
      <CodeBlock language="javascript" code={`const isValid = validateTheme(contract, themeValues);`} />
      
      <h3>Theme Contract with Design Tokens</h3>
      <p>Combine theme contracts with design tokens for complete type safety:</p>
      <CodeBlock language="javascript" code={`import { defineThemeContract, createTheme, createTokens } from 'chaincss';

const contract = defineThemeContract({
  colors: {
    primary: '',
    background: ''
  }
});

const lightTheme = createTheme(contract, {
  colors: { primary: '#3b82f6', background: '#ffffff' }
});

const tokens = createTokens(lightTheme);

export const styles = $
  .bg('$colors.background')
  .c('$colors.primary')
  .$el();`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Define contracts before creating themes</li>
          <li>Keep contracts in a shared location for consistency</li>
          <li>Use contracts to enforce design system rules</li>
          <li>Validate themes in CI/CD pipelines</li>
          <li>Combine contracts with TypeScript for even better type safety</li>
        </ul>
      </div>
    </>
  );
}