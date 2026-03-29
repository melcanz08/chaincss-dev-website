import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Selectors() {
  const [activeTab, setActiveTab] = useState('single');
  
  const examples = {
    single: {
      code: `const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn');  // Single class selector`,
      css: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    multiple: {
      code: `// Multiple selectors - all get the same styles
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn', '.button', '[type="button"]');  // Multiple selectors!`,
      css: `.btn, .button, [type="button"] {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    element: {
      code: `// Element selectors
const headings = $()
  .fontSize('24px')
  .fontWeight('bold')
  .color('#1e293b')
  .marginBottom('16px')
  .block('h1', 'h2', 'h3');  // All headings`,
      css: `h1, h2, h3 {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
}`
    },
    id: {
      code: `// ID selectors
const header = $()
  .backgroundColor('#f8fafc')
  .borderBottom('1px solid #e2e8f0')
  .padding('20px')
  .block('#main-header');  // ID selector`,
      css: `#main-header {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px;
}`
    },
    attribute: {
      code: `// Attribute selectors
const inputs = $()
  .border('1px solid #e2e8f0')
  .borderRadius('6px')
  .padding('8px 12px')
  .focus()
    .borderColor('#3b82f6')
    .outline('none')
    .end()
  .block('input[type="text"]', 'input[type="email"]', 'input[type="password"]');`,
      css: `input[type="text"], input[type="email"], input[type="password"] {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
}
input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
  border-color: #3b82f6;
  outline: none;
}`
    },
    combination: {
      code: `// Combining different selector types
const special = $()
  .backgroundColor('#fef3c7')
  .color('#b45309')
  .padding('8px 16px')
  .borderRadius('8px')
  .block('.warning', '#alert-box', 'div[role="alert"]');  // Mixed selectors!`,
      css: `.warning, #alert-box, div[role="alert"] {
  background-color: #fef3c7;
  color: #b45309;
  padding: 8px 16px;
  border-radius: 8px;
}`
    }
  };
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Selectors</h1>
        <p className="docs-description">
          Target elements with precision using ChainCSS selectors. Combine classes, IDs, elements, and attributes.
        </p>
      </div>
      
      {/* Basic Usage */}
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.block()</code> method to attach your styles to selectors.
        You can pass one or multiple selectors as arguments:
      </p>
      <CodeBlock language="javascript" code={`// Single selector
.block('.btn')

// Multiple selectors
.block('.btn', '.button', 'button')`} />
      
      {/* Interactive Examples */}
      <h2>Selector Types</h2>
      <p>Choose a selector type to see an example:</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('single')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'single' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'single' ? '#eef2ff' : 'white',
            color: activeTab === 'single' ? '#667eea' : '#475569',
            cursor: 'pointer',
            fontWeight: activeTab === 'single' ? '500' : 'normal'
          }}
        >
          Class Selector
        </button>
        <button
          onClick={() => setActiveTab('multiple')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'multiple' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'multiple' ? '#eef2ff' : 'white',
            color: activeTab === 'multiple' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Multiple Selectors
        </button>
        <button
          onClick={() => setActiveTab('element')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'element' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'element' ? '#eef2ff' : 'white',
            color: activeTab === 'element' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Element Selector
        </button>
        <button
          onClick={() => setActiveTab('id')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'id' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'id' ? '#eef2ff' : 'white',
            color: activeTab === 'id' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          ID Selector
        </button>
        <button
          onClick={() => setActiveTab('attribute')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'attribute' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'attribute' ? '#eef2ff' : 'white',
            color: activeTab === 'attribute' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Attribute Selector
        </button>
        <button
          onClick={() => setActiveTab('combination')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'combination' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'combination' ? '#eef2ff' : 'white',
            color: activeTab === 'combination' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Mixed Selectors
        </button>
      </div>
      
      <CodeBlock language="javascript" code={examples[activeTab].code} />
      <div className="tip">
        <strong>Generated CSS:</strong>
        <CodeBlock language="css" code={examples[activeTab].css} />
      </div>
      
      {/* Practical Examples */}
      <h2>Practical Examples</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Button Example */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
             Button Component
          </h3>
          <CodeBlock language="javascript" code={`const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .block('.btn', 'button[type="button"]');`} />
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}>
              Styled Button
            </button>
          </div>
        </div>
        
        {/* Card Example */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Card Component
          </h3>
          <CodeBlock language="javascript" code={`const card = $()
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('20px')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .hover()
    .transform('translateY(-4px)')
    .boxShadow('0 12px 24px -12px rgba(0,0,0,0.2)')
    .end()
  .block('.card', '.card-component');`} />
          <div style={{ 
            marginTop: '16px', 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <p>Hover over me!</p>
          </div>
        </div>
        
        {/* Form Example */}
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
             Form Inputs
          </h3>
          <CodeBlock language="javascript" code={`const inputs = $()
  .border('1px solid #e2e8f0')
  .borderRadius('6px')
  .padding('8px 12px')
  .focus()
    .borderColor('#3b82f6')
    .outline('none')
    .boxShadow('0 0 0 3px rgba(59,130,246,0.1)')
    .end()
  .block('input[type="text"]', 'input[type="email"]', 'textarea');`} />
          <div style={{ marginTop: '16px' }}>
            <input 
              type="text" 
              placeholder="Type something..." 
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Selector Combinations Table */}
      <h2> Selector Reference</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Selector Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Syntax</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Class Selector</td>
              <td style={{ padding: '12px' }}><code className="inline-code">.className</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">.block('.btn')</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>ID Selector</td>
              <td style={{ padding: '12px' }}><code className="inline-code">#idName</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">.block('#header')</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Element Selector</td>
              <td style={{ padding: '12px' }}><code className="inline-code">element</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">.block('button', 'div')</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Attribute Selector</td>
              <td style={{ padding: '12px' }}><code className="inline-code">[attr="value"]</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">.block('input[type="text"]')</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Multiple Selectors</td>
              <td style={{ padding: '12px' }}><code className="inline-code">.class, #id, element</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">.block('.btn', '#submit', 'button')</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Best Practices */}
      <div className="tip">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use class selectors (<code className="inline-code">.btn</code>) for reusable styles</li>
          <li>Use ID selectors (<code className="inline-code">#header</code>) for unique elements</li>
          <li>Use attribute selectors for styling inputs and interactive elements</li>
          <li>Combine selectors when elements share the same styles</li>
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
        <a href="/docs/hover-states" style={{ color: '#667eea', textDecoration: 'none' }}>
          Hover & Interactive States →
        </a>
      </div>*/}
    </>
  );
}