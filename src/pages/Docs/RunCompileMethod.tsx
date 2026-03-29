import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function RunCompileMethod() {
  const [activeExample, setActiveExample] = useState('run');
  
  const examples = {
    run: {
      title: 'run() - Direct Styles',
      description: 'Use run() when you have style objects ready to inject',
      code: `// Single style
const button = $()
  .color('white')
  .backgroundColor('#3b82f6')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn');

run(button);

// Multiple styles (separate variables)
const button = $().color('white').bg('blue').block('.btn');
const card = $().border('1px solid').padding('20px').block('.card');
run(button, card);

// Dynamic styles (React/JSX)
function Button({ variant }) {
  const styles = useMemo(() => {
    const base = $().padding('10px').block('.btn');
    if (variant === 'primary') {
      base.backgroundColor('blue').color('white');
    }
    return base;
  }, [variant]);
  
  run(styles); // ← Use run() for dynamic
}

// Conditional styles
let styles = [];
if (isMobile) {
  styles.push($().padding('8px').block('.btn'));
}
if (isPrimary) {
  styles.push($().backgroundColor('blue').block('.btn'));
}
run(...styles);`,
      output: `.btn {
  color: white;
  background-color: #3b82f6;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    compile: {
      title: 'compile() - Named Collections',
      description: 'Use compile() when you have organized collections of styles',
      code: `// Named style collection
const styles = {
  primary: $()
    .color('white')
    .backgroundColor('#3b82f6')
    .padding('12px 24px')
    .borderRadius('8px')
    .block('.btn-primary'),
    
  secondary: $()
    .color('white')
    .backgroundColor('#6b7280')
    .padding('12px 24px')
    .borderRadius('8px')
    .block('.btn-secondary'),
    
  danger: $()
    .color('white')
    .backgroundColor('#ef4444')
    .padding('12px 24px')
    .borderRadius('8px')
    .block('.btn-danger')
};

compile(styles);

// Component library export
// button-styles.js
export const buttonStyles = {
  base: $().padding('8px 16px').borderRadius('4px').block(),
  primary: $().backgroundColor('blue').color('white').block(),
  secondary: $().backgroundColor('gray').color('black').block()
};

// In your app
import { buttonStyles } from './button-styles';
compile(buttonStyles);

// Design system tokens
const designSystem = {
  heading: $()
    .fontSize('24px')
    .fontWeight('bold')
    .marginBottom('16px')
    .block('h1', 'h2', '.heading'),
    
  body: $()
    .fontSize('16px')
    .lineHeight('1.5')
    .color('#475569')
    .block('p', '.text'),
    
  button: $()
    .padding('8px 16px')
    .borderRadius('4px')
    .block('.btn')
};

compile(designSystem);`,
      output: `.btn-primary {
  color: white;
  background-color: #3b82f6;
  padding: 12px 24px;
  border-radius: 8px;
}
.btn-secondary {
  color: white;
  background-color: #6b7280;
  padding: 12px 24px;
  border-radius: 8px;
}
.btn-danger {
  color: white;
  background-color: #ef4444;
  padding: 12px 24px;
  border-radius: 8px;
}`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">run() & compile() Method</h1>
        <p className="docs-description">
          Choose the right method for your use case. Both generate CSS, but they're optimized for different scenarios.
        </p>
      </div>
      
      {/* Quick Decision Guide */}
      <h2>Quick Decision Guide</h2>
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '32px',
        fontFamily: 'monospace',
        fontSize: '13px',
        textAlign: 'center'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre', display: 'inline-block' }}>
{`Is your style object already built with .block()?
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
       YES                      NO
        │                       │
        ▼                       ▼
    Use run()              Use compile()`}
        </pre>
      </div>
      
      {/* Interactive Examples */}
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('run')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: activeExample === 'run' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'run' ? '#eef2ff' : 'white',
            color: activeExample === 'run' ? '#667eea' : '#475569',
            cursor: 'pointer',
            fontWeight: activeExample === 'run' ? '500' : 'normal'
          }}
        >
          run() - Direct Styles
        </button>
        <button
          onClick={() => setActiveExample('compile')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: activeExample === 'compile' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'compile' ? '#eef2ff' : 'white',
            color: activeExample === 'compile' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          compile() - Named Collections
        </button>
      </div>
      
      <CodeBlock language="javascript" code={currentExample.code} />
      
      <div className="tip">
        <strong>Generated CSS:</strong>
        <CodeBlock language="css" code={currentExample.output} />
      </div>
      
      {/* Comparison Table */}
      <h2>Comparison Table</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Aspect</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>run()</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>compile()</th>
             </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Input</td>
              <td style={{ padding: '12px' }}>Style object(s)</td>
              <td style={{ padding: '12px' }}>Object with named styles</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Output</td>
              <td style={{ padding: '12px' }}>CSS + class map</td>
              <td style={{ padding: '12px' }}>CSS + class map</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Use Case</td>
              <td style={{ padding: '12px' }}>Ad-hoc, dynamic styles</td>
              <td style={{ padding: '12px' }}>Collections, design systems</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Organization</td>
              <td style={{ padding: '12px' }}>Loose</td>
              <td style={{ padding: '12px' }}>Structured by name</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Reusability</td>
              <td style={{ padding: '12px' }}>Lower</td>
              <td style={{ padding: '12px' }}>Higher</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Memory Usage</td>
              <td style={{ padding: '12px' }}>Slightly lower</td>
              <td style={{ padding: '12px' }}>Slightly higher</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Cache Efficiency</td>
              <td style={{ padding: '12px' }}>Good for single styles</td>
              <td style={{ padding: '12px' }}>Better for collections</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* When to Use Each */}
      <h2>When to Use run()</h2>
      <div style={{
        backgroundColor: '#ecfdf5',
        borderLeft: '4px solid #10b981',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>You have a <strong>single style object</strong> built with <code className="inline-code">.block()</code></li>
          <li>You have <strong>multiple style objects as separate variables</strong></li>
          <li>You want to <strong>inject styles immediately</strong> without naming them</li>
          <li>You're working with <strong>dynamic/conditional styles</strong></li>
        </ul>
      </div>
      
      <h2>When to Use compile()</h2>
      <div style={{
        backgroundColor: '#eff6ff',
        borderLeft: '4px solid #3b82f6',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '32px'
      }}>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>You have <strong>multiple named styles in an object</strong></li>
          <li>You want to <strong>organize styles by component/variant</strong></li>
          <li>You're <strong>building a design system or component library</strong></li>
          <li>You need to <strong>export styles for reuse</strong></li>
        </ul>
      </div>
      
      {/* Real-World Scenarios */}
      <h2>Real-World Scenarios</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Scenario 1 */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Single Page Component
          </h3>
          <CodeBlock language="javascript" code={`// Use run() - simpler
const header = $()
  .color('white')
  .backgroundColor('blue')
  .padding('20px')
  .block('.header');

run(header);`} />
        </div>
        
        {/* Scenario 2 */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Component Library
          </h3>
          <CodeBlock language="javascript" code={`// Use compile() - more organized
const components = {
  Alert: $().bg('yellow').border('1px solid').padding('10px').block('.alert'),
  Badge: $().bg('red').color('white').padding('2px 8px').block('.badge'),
  Card: $().border('1px solid').padding('20px').block('.card')
};

compile(components);`} />
        </div>
        
        {/* Scenario 3 */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Theme Variants
          </h3>
          <CodeBlock language="javascript" code={`// Use compile() - perfect for variants
const buttonVariants = {
  primary: $().bg('blue').color('white').block('.btn-primary'),
  secondary: $().bg('gray').color('black').block('.btn-secondary'),
  outline: $().bg('transparent').border('1px solid blue').color('blue').block('.btn-outline')
};

compile(buttonVariants);`} />
        </div>
        
        {/* Scenario 4 */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Dynamic Theme Switching
          </h3>
          <CodeBlock language="javascript" code={`// Use run() - better for runtime changes
function applyTheme(theme) {
  const styles = [];
  if (theme === 'dark') {
    styles.push($().bg('black').color('white').block('body'));
  } else {
    styles.push($().bg('white').color('black').block('body'));
  }
  run(...styles);
}`} />
        </div>
      </div>
      
      {/* Decision Flowchart */}
      <h2>Decision Flowchart</h2>
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '32px',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre' }}>
{`Start: Do you need to organize styles?
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
       YES                      NO
        │                       │
        ▼                       ▼
   Use compile()           Are there multiple styles?
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
                   YES                      NO
                    │                       │
                    ▼                       ▼
               Use run()               Use run()
           (with multiple args)    (with single arg)`}
        </pre>
      </div>
      
      {/* Summary */}
      <div className="note">
        <strong>Quick Summary</strong>
        <table style={{ width: '100%', marginTop: '12px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Your Goal</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Recommended Method</th>
             </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: '8px' }}>Quick, one-off style</td><td style={{ padding: '8px' }}><code className="inline-code">run()</code></td></tr>
            <tr><td style={{ padding: '8px' }}>Multiple independent styles</td><td style={{ padding: '8px' }}><code className="inline-code">run()</code> with multiple args</td></tr>
            <tr><td style={{ padding: '8px' }}>Component library</td><td style={{ padding: '8px' }}><code className="inline-code">compile()</code></td></tr>
            <tr><td style={{ padding: '8px' }}>Design system</td><td style={{ padding: '8px' }}><code className="inline-code">compile()</code></td></tr>
            <tr><td style={{ padding: '8px' }}>Theme variants</td><td style={{ padding: '8px' }}><code className="inline-code">compile()</code></td></tr>
            <tr><td style={{ padding: '8px' }}>Dynamic/runtime styles</td><td style={{ padding: '8px' }}><code className="inline-code">run()</code></td></tr>
            <tr><td style={{ padding: '8px' }}>Conditional styles</td><td style={{ padding: '8px' }}><code className="inline-code">run()</code></td></tr>
          </tbody>
        </table>
      </div>
      
      <div className="tip">
        <strong>Simple Rule of Thumb:</strong><br />
        • If your styles have <strong>names</strong> (like <code className="inline-code">primary</code>, <code className="inline-code">secondary</code>) → Use <code className="inline-code">compile()</code><br />
        • If your styles are <strong>just styles without names</strong> → Use <code className="inline-code">run()</code><br /><br />
        Both work for atomic CSS! The choice is about code organization, not functionality. 
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/recipe" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Recipe System
        </a>
        <a href="/docs/atomic-css" style={{ color: '#667eea', textDecoration: 'none' }}>
          Atomic CSS →
        </a>
      </div>*/}
    </>
  );
}