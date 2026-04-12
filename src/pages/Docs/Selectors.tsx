import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import { buttonExample, cardExample, inputExample } from './styles/selectors.class.js';
import './styles/selectors.css';

export default function Selectors() {
  const [activeTab, setActiveTab] = useState('single');
  
  const examples = {
    single: {
      code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .$el('.btn');`,
      css: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    multiple: {
      code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .$el('.btn', '.button', '[type="button"]');`,
      css: `.btn, .button, [type="button"] {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    element: {
      code: `export const headings = $
  .textSize('24px')
  .weight('bold')
  .c('#1e293b')
  .mb('16px')
  .$el('h1', 'h2', 'h3');`,
      css: `h1, h2, h3 {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16px;
}`
    },
    id: {
      code: `export const header = $
  .bg('#f8fafc')
  .borderBottom('1px solid #e2e8f0')
  .p('20px')
  .$el('#main-header');`,
      css: `#main-header {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 20px;
}`
    },
    attribute: {
      code: `export const inputs = $
  .border('1px solid #e2e8f0')
  .rounded('6px')
  .p('8px 12px')
  .focus()
    .borderC('#3b82f6')
    .outline('none')
  .end()
  .$el('input[type="text"]', 'input[type="email"]', 'input[type="password"]');`,
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
      code: `export const special = $
  .bg('#fef3c7')
  .c('#b45309')
  .p('8px 16px')
  .rounded('8px')
  .$el('.warning', '#alert-box', 'div[role="alert"]');`,
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
          Target elements with precision using ChainCSS v2 selectors. Combine classes, IDs, elements, and attributes.
        </p>
      </div>

      <div className="tip" style={{ marginBottom: '24px' }}>
        <strong>v2 Update:</strong> <code className="inline-code">.block()</code> is now <code className="inline-code">.$el()</code>. The functionality remains the same.
      </div>
      
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.$el()</code> method to attach your styles to selectors.
        You can pass one or multiple selectors as arguments:
      </p>
      <CodeBlock language="javascript" code={`export const styles = $
  .c('red')
  .$el('.btn')

export const styles = $
  .c('red')
  .$el('.btn', '.button', 'button')`} />
      
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
      
      <h2>Practical Examples</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Button Component
          </h3>
          <CodeBlock language="javascript" code={`export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .hover()
    .bg('#2563eb')
  .end()
  .$el('.demo-btn');`} />
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button className="demo-btn">
              Styled Button
            </button>
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Card Component
          </h3>
          <CodeBlock language="javascript" code={`export const card = $
  .bg('white')
  .rounded('12px')
  .p('20px')
  .shadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .hover()
    .transform('translateY(-4px)')
    .shadow('0 12px 24px -12px rgba(0,0,0,0.2)')
  .end()
  .$el('.demo-card');`} />
          <div className="demo-card" style={{ transition: 'all 0.2s' }}>
            <p>Hover over me</p>
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
            Form Inputs
          </h3>
          <CodeBlock language="javascript" code={`export const inputs = $
  .border('1px solid #e2e8f0')
  .rounded('6px')
  .p('8px 12px')
  .focus()
    .borderC('#3b82f6')
    .outline('none')
    .shadow('0 0 0 3px rgba(59,130,246,0.1)')
  .end()
  .$el('.demo-input');`} />
          <div style={{ marginTop: '16px' }}>
            <input 
              type="text" 
              placeholder="Type something" 
              className="demo-input"
            />
          </div>
        </div>
      </div>
      
      <h2>Selector Reference</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Selector Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Syntax</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Class Selector</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.className</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.$el('.btn')</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>ID Selector</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">#idName</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.$el('#header')</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Element Selector</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">element</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.$el('button', 'div')</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Attribute Selector</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">[attr="value"]</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.$el('input[type="text"]')</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Multiple Selectors</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.class, #id, element</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.$el('.btn', '#submit', 'button')</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="tip">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use class selectors (<code className="inline-code">.btn</code>) for reusable styles</li>
          <li>Use ID selectors (<code className="inline-code">#header</code>) for unique elements</li>
          <li>Use attribute selectors for styling inputs and interactive elements</li>
          <li>Combine selectors when elements share the same styles</li>
        </ul>
      </div>

      <div className="note">
        <strong>v2 Migration Notes:</strong>
        <ul>
          <li><code>.block()</code> → <code>.$el()</code></li>
          <li><code>.focus()</code> works the same as <code>.hover()</code> for focus states</li>
          <li>All selector types work exactly the same in v2</li>
        </ul>
      </div>
    </>
  );
}