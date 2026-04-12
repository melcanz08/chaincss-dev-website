import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import { demoBtn, demoInput, demoCard } from './styles/hoverStates.class.js';


export default function HoverStates() {
  const [activeDemo, setActiveDemo] = useState('hover');
  
  const demos = {
    hover: {
      title: 'Hover State',
      description: 'Change styles when the user hovers over an element',
      code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .transition('all 0.2s')
  .hover()
    .bg('#2563eb')
    .transform('scale(1.05)')
  .end()
  .$el('.demo-hover-btn');`,
      css: `.demo-hover-btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s;
}
.demo-hover-btn:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}`,
      className: 'demo-hover-btn'
    },
    focus: {
      title: 'Focus State',
      description: 'Style elements when they receive keyboard focus',
      code: `export const input = $
  .border('1px solid #e2e8f0')
  .rounded('8px')
  .p('12px 16px')
  .textSize('16px')
  .transition('all 0.2s')
  .focus()
    .borderC('#3b82f6')
    .outline('none')
    .shadow('0 0 0 3px rgba(59,130,246,0.2)')
  .end()
  .$el('.demo-focus-input');`,
      css: `.demo-focus-input {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s;
}
.demo-focus-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}`,
      className: 'demo-focus-input'
    },
    active: {
      title: 'Active State',
      description: 'Styles applied while the element is being clicked',
      code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .transition('all 0.1s')
  .hover()
    .bg('#2563eb')
  .end()
  .active()
    .transform('scale(0.98)')
    .bg('#1e40af')
  .end()
  .$el('.demo-active-btn');`,
      css: `.demo-active-btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.1s;
}
.demo-active-btn:hover {
  background-color: #2563eb;
}
.demo-active-btn:active {
  transform: scale(0.98);
  background-color: #1e40af;
}`,
      className: 'demo-active-btn'
    },
    multiple: {
      title: 'Multiple States',
      description: 'Combine hover, focus, and active states together',
      code: `export const card = $
  .bg('white')
  .border('1px solid #e2e8f0')
  .rounded('12px')
  .p('24px')
  .transition('all 0.2s')
  .hover()
    .transform('translateY(-4px)')
    .shadow('0 12px 24px -12px rgba(0,0,0,0.2)')
    .borderC('#cbd5e1')
  .end()
  .focus()
    .outline('none')
    .borderC('#3b82f6')
    .shadow('0 0 0 3px rgba(59,130,246,0.2)')
  .end()
  .active()
    .transform('translateY(0)')
  .end()
  .$el('.demo-card');`,
      css: `.demo-card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s;
}
.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -12px rgba(0,0,0,0.2);
  border-color: #cbd5e1;
}
.demo-card:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}
.demo-card:active {
  transform: translateY(0);
}`,
      className: 'demo-card'
    }
  };
  
  const currentDemo = demos[activeDemo];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Hover & Interactive States</h1>
        <p className="docs-description">
          Make your components come alive with hover effects, focus states, and active interactions.
        </p>
      </div>
      
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.hover()</code> method to start a hover block,
        then chain your hover-specific styles, and finish with <code className="inline-code">.end()</code>:
      </p>
      <CodeBlock language="javascript" code={`export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .hover()
    .bg('#2563eb')
    .transform('scale(1.05)')
  .end()
  .transition('all 0.2s')
  .$el('.btn');`} />
      
      <div className="tip">
        <strong>Tip:</strong> Always call <code className="inline-code">.end()</code> to exit the hover block.
        ChainCSS needs to know where the hover styles end.
      </div>
      
      <h2>Interactive Examples</h2>
      <p>Choose a state to see it in action:</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {Object.keys(demos).map(key => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: activeDemo === key ? '2px solid #667eea' : '1px solid #e2e8f0',
              backgroundColor: activeDemo === key ? '#eef2ff' : 'white',
              color: activeDemo === key ? '#667eea' : '#475569',
              cursor: 'pointer'
            }}
          >
            {demos[key].title}
          </button>
        ))}
      </div>
      
      <CodeBlock language="javascript" code={currentDemo.code} />
      
      <div className="tip">
        <strong>Generated CSS:</strong>
        <CodeBlock language="css" code={currentDemo.css} />
      </div>
      
      <div style={{ 
        marginTop: '24px',
        padding: '32px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Live Demo
        </h3>
        
        {activeDemo === 'hover' && (
          <button className={currentDemo.className}>
            Hover over me
          </button>
        )}
        
        {activeDemo === 'focus' && (
          <input 
            type="text" 
            className={currentDemo.className}
            placeholder="Click or tab to focus"
          />
        )}
        
        {activeDemo === 'active' && (
          <button className={currentDemo.className}>
            Click and hold
          </button>
        )}
        
        {activeDemo === 'multiple' && (
          <div className={currentDemo.className} tabIndex={0}>
            <p style={{ margin: 0 }}>Hover, focus, or click me</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Try all three interactions
            </p>
          </div>
        )}
      </div>
      
      <h2>More Pseudo-classes</h2>
      <p>ChainCSS supports all standard CSS pseudo-classes. Here are some common ones:</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.firstChild()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Styles the first child element
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.lastChild()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Styles the last child element
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.disabled()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Styles disabled elements
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.checked()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Styles checked checkboxes or radios
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.visited()</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Styles visited links
          </p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <code className="inline-code">.not('.class')</code>
          <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
            Excludes elements matching a selector
          </p>
        </div>
      </div>
      
      <h2>Combining Multiple States</h2>
      <p>You can chain multiple interactive states together:</p>
      <CodeBlock language="javascript" code={`export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .transition('all 0.2s')
  .hover()
    .bg('#2563eb')
    .transform('scale(1.05)')
  .end()
  .focus()
    .outline('none')
    .shadow('0 0 0 3px rgba(59,130,246,0.2)')
  .end()
  .active()
    .transform('scale(0.98)')
  .end()
  .$el('.btn');`} />
      
      <div className="note">
        <strong>Performance Tips</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Add <code className="inline-code">.transition()</code> for smooth animations</li>
          <li>Use <code className="inline-code">.transform()</code> for hardware-accelerated animations</li>
          <li>Keep hover states simple for better performance</li>
          <li>Test focus states for accessibility</li>
        </ul>
      </div>
      
      <div className="tip">
        <strong>Accessibility Tip</strong>
        <p style={{ marginTop: '8px', marginBottom: 0 }}>
          Always style <code className="inline-code">:focus</code> states. Users navigating with keyboards
          need to see which element is focused. A visible focus ring is essential for accessibility.
        </p>
      </div>
    </>
  );
}