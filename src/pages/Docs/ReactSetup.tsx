import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function ReactSetup() {
  const [activeExample, setActiveExample] = useState('basic');
  
  // State for dynamic example
  const [dynamicVariant, setDynamicVariant] = useState('primary');
  const [dynamicSize, setDynamicSize] = useState('medium');
  
  // State for theme example
  const [themeMode, setThemeMode] = useState('light');
  const isDark = themeMode === 'dark';
  
  // State for performance example
  const [perfCount, setPerfCount] = useState(0);
  const [perfVariant, setPerfVariant] = useState('primary');
  
  // Get styles for dynamic example
  const getDynamicStyles = () => {
    const bgColor = dynamicVariant === 'primary' ? '#3b82f6' : 
                   dynamicVariant === 'danger' ? '#ef4444' : '#6b7280';
    const hoverColor = dynamicVariant === 'primary' ? '#2563eb' : 
                      dynamicVariant === 'danger' ? '#dc2626' : '#4b5563';
    const padding = dynamicSize === 'large' ? '16px 32px' : 
                   dynamicSize === 'small' ? '8px 16px' : '12px 24px';
    const fontSize = dynamicSize === 'large' ? '18px' : 
                    dynamicSize === 'small' ? '14px' : '16px';
    
    return { bgColor, hoverColor, padding, fontSize };
  };
  
  const dynamicStyles = getDynamicStyles();
  
  // Get styles for performance example
  const getPerfStyles = () => ({
    bgColor: perfVariant === 'primary' ? '#3b82f6' : '#6b7280',
    hoverColor: perfVariant === 'primary' ? '#2563eb' : '#4b5563'
  });
  
  const perfStyles = getPerfStyles();
  
  const examples = {
    basic: {
      title: 'Basic Usage',
      description: 'Use useChainStyles hook in your React components',
      code: `import { useChainStyles } from 'chaincss/react';

function Button({ children }) {
  const styles = useChainStyles({
    button: $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('12px 24px')
      .borderRadius('8px')
      .hover()
        .backgroundColor('#2563eb')
        .end()
      .transition('all 0.2s')
      .block()
  });

  return <button className={styles.button}>{children}</button>;
}`,
      preview: () => (
        <button style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}>
          Click Me
        </button>
      )
    },
    dynamic: {
      title: 'Dynamic Props',
      description: 'Create styles based on component props',
      code: `import { useChainStyles } from 'chaincss/react';

function Button({ variant = 'primary', size = 'medium', children }) {
  const styles = useChainStyles({
    button: $()
      .padding(size === 'large' ? '16px 32px' : 
               size === 'small' ? '8px 16px' : '12px 24px')
      .fontSize(size === 'large' ? '18px' : 
                size === 'small' ? '14px' : '16px')
      .backgroundColor(variant === 'primary' ? '#3b82f6' : 
                      variant === 'danger' ? '#ef4444' : '#6b7280')
      .color('white')
      .borderRadius('8px')
      .border('none')
      .cursor('pointer')
      .hover()
        .backgroundColor(variant === 'primary' ? '#2563eb' : 
                        variant === 'danger' ? '#dc2626' : '#4b5563')
        .end()
      .transition('all 0.2s')
      .block()
  });

  return <button className={styles.button}>{children}</button>;
}`,
      preview: () => (
        <div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <select value={dynamicVariant} onChange={(e) => setDynamicVariant(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="danger">Danger</option>
            </select>
            <select value={dynamicSize} onChange={(e) => setDynamicSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <button style={{
            backgroundColor: dynamicStyles.bgColor,
            color: 'white',
            padding: dynamicStyles.padding,
            fontSize: dynamicStyles.fontSize,
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = dynamicStyles.hoverColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = dynamicStyles.bgColor}>
            {dynamicVariant} Button ({dynamicSize})
          </button>
        </div>
      )
    },
    theme: {
      title: 'Theme Switching',
      description: 'Use ChainCSS with React Context for theming',
      code: `// ThemeContext.tsx
import { createContext, useContext, useState } from 'react';
import { useChainStyles } from 'chaincss/react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const styles = useChainStyles({
    app: $()
      .backgroundColor(theme === 'light' ? '#ffffff' : '#0f172a')
      .color(theme === 'light' ? '#1e293b' : '#f1f5f9')
      .minHeight('100vh')
      .transition('all 0.3s')
      .block(),
    
    card: $()
      .backgroundColor(theme === 'light' ? '#f8fafc' : '#1e293b')
      .borderRadius('12px')
      .padding('24px')
      .border(theme === 'light' ? '1px solid #e2e8f0' : '1px solid #334155')
      .block()
  });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, styles }}>
      <div className={styles.app}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}`,
      preview: () => (
        <div style={{
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#1e293b',
          padding: '24px',
          borderRadius: '12px',
          transition: 'all 0.3s'
        }}>
          <button 
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            style={{
              padding: '8px 16px',
              backgroundColor: isDark ? '#3b82f6' : '#e2e8f0',
              color: isDark ? 'white' : '#1e293b',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
          <div style={{
            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`
          }}>
            <h3>Themed Card</h3>
            <p>This card adapts to the current theme</p>
          </div>
        </div>
      )
    },
    performance: {
      title: 'Performance Optimization',
      description: 'Use memoization to prevent unnecessary re-renders',
      code: `import { useChainStyles } from 'chaincss/react';
import { useMemo } from 'react';

function OptimizedButton({ variant, size, children }) {
  const styles = useMemo(() => ({
    button: $()
      .padding(size === 'large' ? '16px 32px' : '12px 24px')
      .fontSize(size === 'large' ? '18px' : '16px')
      .backgroundColor(variant === 'primary' ? '#3b82f6' : '#6b7280')
      .color('white')
      .borderRadius('8px')
      .border('none')
      .cursor('pointer')
      .hover()
        .backgroundColor(variant === 'primary' ? '#2563eb' : '#4b5563')
        .end()
      .transition('all 0.2s')
      .block()
  }), [variant, size]);

  const { classes } = useChainStyles(styles);
  
  return <button className={classes.button}>{children}</button>;
}`,
      preview: () => (
        <div>
          <p style={{ marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>
            Re-renders: {perfCount} (button styles are memoized)
          </p>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <select value={perfVariant} onChange={(e) => setPerfVariant(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            <button onClick={() => setPerfCount(c => c + 1)} style={{ padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Re-render
            </button>
          </div>
          <button style={{
            backgroundColor: perfStyles.bgColor,
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = perfStyles.hoverColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = perfStyles.bgColor}>
            Optimized Button
          </button>
        </div>
      )
    }
  };
  
  const currentExample = examples[activeExample as keyof typeof examples];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">React Integration</h1>
        <p className="docs-description">
          Use ChainCSS with React using the powerful <code className="inline-code">useChainStyles</code> hook.
        </p>
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <h2>Basic Setup</h2>
      <p>First, import the <code className="inline-code">useChainStyles</code> hook from ChainCSS:</p>
      <CodeBlock language="javascript" code={`import { useChainStyles } from 'chaincss/react';`} />
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveExample('basic')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Basic Usage</button>
        <button onClick={() => setActiveExample('dynamic')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'dynamic' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'dynamic' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Dynamic Props</button>
        <button onClick={() => setActiveExample('theme')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'theme' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'theme' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Theme Switching</button>
        <button onClick={() => setActiveExample('performance')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'performance' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'performance' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Performance</button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{currentExample.title}</h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>{currentExample.description}</p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>{currentExample.preview()}</div>
        </div>
      </div>
      
      <h2>API Reference</h2>
      
      <h3>useChainStyles(styles, options?)</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
             </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">styles</code></td>
              <td style={{ padding: '12px' }}>Object | Function</td>
              <td style={{ padding: '12px' }}>Style definitions object or function returning styles</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">options</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Optional configuration (cache, namespace, atomic)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>useDynamicChainStyles(styleFactory, deps, options?)</h3>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
             </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">styleFactory</code></td>
              <td style={{ padding: '12px' }}>Function</td>
              <td style={{ padding: '12px' }}>Function that returns style definitions</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">deps</code></td>
              <td style={{ padding: '12px' }}>Array</td>
              <td style={{ padding: '12px' }}>Dependencies array (like useEffect)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>cx(...classes)</h3>
      <p>Utility function to conditionally join class names:</p>
      <CodeBlock language="javascript" code={`import { cx } from 'chaincss/react';

const buttonClass = cx(
  'btn',
  isPrimary && 'btn-primary',
  isLarge && 'btn-large',
  isDisabled && 'btn-disabled'
);`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">useMemo</code> for styles that depend on props to prevent unnecessary re-renders</li>
          <li>Extract static styles outside components when possible</li>
          <li>Use <code className="inline-code">useDynamicChainStyles</code> when styles depend on external values</li>
          <li>Enable atomic CSS in production for smaller bundle sizes</li>
        </ul>
      </div>
      
      {/*
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/vanilla-js" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Vanilla JavaScript
        </a>
        <a href="/docs/vue" style={{ color: '#667eea', textDecoration: 'none' }}>
          Vue Composables →
        </a>
      </div>*/}
    </>
  );
}