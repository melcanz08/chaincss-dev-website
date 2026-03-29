import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function HoverStates() {
  const [activeDemo, setActiveDemo] = useState('hover');
  
  const demos = {
    hover: {
      title: 'Hover State',
      description: 'Change styles when the user hovers over an element',
      code: `const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .transition('all 0.2s')
  .hover()
    .backgroundColor('#2563eb')
    .transform('scale(1.05)')
    .end()
  .block('.btn');`,
      css: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.2s;
}
.btn:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}`,
      demoElement: (hovered: boolean) => ({
        backgroundColor: hovered ? '#2563eb' : '#3b82f6',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        transition: 'all 0.2s',
        cursor: 'pointer'
      })
    },
    focus: {
      title: 'Focus State',
      description: 'Style elements when they receive keyboard focus',
      code: `const input = $()
  .border('1px solid #e2e8f0')
  .borderRadius('8px')
  .padding('12px 16px')
  .fontSize('16px')
  .transition('all 0.2s')
  .focus()
    .borderColor('#3b82f6')
    .outline('none')
    .boxShadow('0 0 0 3px rgba(59,130,246,0.2)')
    .end()
  .block('.input');`,
      css: `.input {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s;
}
.input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}`,
      demoElement: (focused: boolean) => ({
        border: focused ? '1px solid #3b82f6' : '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px 16px',
        fontSize: '16px',
        transition: 'all 0.2s',
        outline: focused ? 'none' : 'none',
        boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.2)' : 'none'
      })
    },
    active: {
      title: 'Active State',
      description: 'Styles applied while the element is being clicked',
      code: `const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .transition('all 0.1s')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .active()
    .transform('scale(0.98)')
    .backgroundColor('#1e40af')
    .end()
  .block('.btn');`,
      css: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: all 0.1s;
}
.btn:hover {
  background-color: #2563eb;
}
.btn:active {
  transform: scale(0.98);
  background-color: #1e40af;
}`,
      demoElement: (active: boolean) => ({
        backgroundColor: active ? '#1e40af' : '#3b82f6',
        transform: active ? 'scale(0.98)' : 'scale(1)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        transition: 'all 0.1s',
        cursor: 'pointer'
      })
    },
    multiple: {
      title: 'Multiple States',
      description: 'Combine hover, focus, and active states together',
      code: `const card = $()
  .backgroundColor('white')
  .border('1px solid #e2e8f0')
  .borderRadius('12px')
  .padding('24px')
  .transition('all 0.2s')
  .hover()
    .transform('translateY(-4px)')
    .boxShadow('0 12px 24px -12px rgba(0,0,0,0.2)')
    .borderColor('#cbd5e1')
    .end()
  .focus()
    .outline('none')
    .borderColor('#3b82f6')
    .boxShadow('0 0 0 3px rgba(59,130,246,0.2)')
    .end()
  .active()
    .transform('translateY(0)')
    .end()
  .block('.card');`,
      css: `.card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -12px rgba(0,0,0,0.2);
  border-color: #cbd5e1;
}
.card:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.2);
}
.card:active {
  transform: translateY(0);
}`,
      demoElement: (state: { hover: boolean; focus: boolean; active: boolean }) => ({
        backgroundColor: 'white',
        border: state.focus ? '1px solid #3b82f6' : (state.hover ? '1px solid #cbd5e1' : '1px solid #e2e8f0'),
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.2s',
        transform: state.active ? 'translateY(0)' : (state.hover ? 'translateY(-4px)' : 'translateY(0)'),
        boxShadow: state.focus ? '0 0 0 3px rgba(59,130,246,0.2)' : (state.hover ? '0 12px 24px -12px rgba(0,0,0,0.2)' : 'none'),
        outline: 'none'
      })
    }
  };
  
  const [hoverState, setHoverState] = useState(false);
  const [focusState, setFocusState] = useState(false);
  const [activeState, setActiveState] = useState(false);
  const [cardState, setCardState] = useState({ hover: false, focus: false, active: false });
  
  const currentDemo = demos[activeDemo];
  
  const getDemoStyles = () => {
    if (activeDemo === 'hover') return currentDemo.demoElement(hoverState);
    if (activeDemo === 'focus') return currentDemo.demoElement(focusState);
    if (activeDemo === 'active') return currentDemo.demoElement(activeState);
    if (activeDemo === 'multiple') return currentDemo.demoElement(cardState);
    return {};
  };
  
  const demoStyles = getDemoStyles();
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Hover & Interactive States</h1>
        <p className="docs-description">
          Make your components come alive with hover effects, focus states, and active interactions.
        </p>
      </div>
      
      {/* Basic Usage */}
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.hover()</code> method to start a hover block,
        then chain your hover-specific styles, and finish with <code className="inline-code">.end()</code>:
      </p>
      <CodeBlock language="javascript" code={`const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .hover()           // Start hover block
    .backgroundColor('#2563eb')
    .transform('scale(1.05)')
    .end()           // End hover block
  .transition('all 0.2s')
  .block('.btn');`} />
      
      <div className="tip">
        <strong>Tip:</strong> Always call <code className="inline-code">.end()</code> to exit the hover block.
        ChainCSS needs to know where the hover styles end.
      </div>
      
      {/* Interactive Examples */}
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
      
      {/* Live Demo */}
      <div style={{ 
        marginTop: '24px',
        padding: '32px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Live Demo - Try it yourself!
        </h3>
        
        {activeDemo === 'hover' && (
          <button
            style={demoStyles}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            Hover over me!
          </button>
        )}
        
        {activeDemo === 'focus' && (
          <input
            type="text"
            placeholder="Click or tab to focus..."
            style={demoStyles}
            onFocus={() => setFocusState(true)}
            onBlur={() => setFocusState(false)}
          />
        )}
        
        {activeDemo === 'active' && (
          <button
            style={demoStyles}
            onMouseDown={() => setActiveState(true)}
            onMouseUp={() => setActiveState(false)}
            onMouseLeave={() => setActiveState(false)}
          >
            Click and hold!
          </button>
        )}
        
        {activeDemo === 'multiple' && (
          <div
            tabIndex={0}
            style={demoStyles}
            onMouseEnter={() => setCardState(prev => ({ ...prev, hover: true }))}
            onMouseLeave={() => setCardState(prev => ({ ...prev, hover: false, active: false }))}
            onFocus={() => setCardState(prev => ({ ...prev, focus: true }))}
            onBlur={() => setCardState(prev => ({ ...prev, focus: false }))}
            onMouseDown={() => setCardState(prev => ({ ...prev, active: true }))}
            onMouseUp={() => setCardState(prev => ({ ...prev, active: false }))}
          >
            <p style={{ margin: 0 }}>Hover, focus, or click me!</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#64748b' }}>
              Try all three interactions
            </p>
          </div>
        )}
      </div>
      
      {/* More Pseudo-classes */}
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
            Styles checked checkboxes/radios
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
      
      {/* Example: Multiple States */}
      <h2>Combining Multiple States</h2>
      <p>You can chain multiple interactive states together:</p>
      <CodeBlock language="javascript" code={`const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .transition('all 0.2s')
  .hover()
    .backgroundColor('#2563eb')
    .transform('scale(1.05)')
    .end()
  .focus()
    .outline('none')
    .boxShadow('0 0 0 3px rgba(59,130,246,0.2)')
    .end()
  .active()
    .transform('scale(0.98)')
    .end()
  .block('.btn');`} />
      
      {/* Performance Tips */}
      <div className="note">
        <strong>Performance Tips</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Add <code className="inline-code">.transition()</code> for smooth animations</li>
          <li>Use <code className="inline-code">.transform()</code> for hardware-accelerated animations</li>
          <li>Keep hover states simple for better performance</li>
          <li>Test focus states for accessibility</li>
        </ul>
      </div>
      
      {/* Accessibility */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6' }}>
        <strong>Accessibility Tip</strong>
        <p style={{ marginTop: '8px', marginBottom: 0 }}>
          Always style <code className="inline-code">:focus</code> states! Users navigating with keyboards
          need to see which element is focused. A visible focus ring is essential for accessibility.
        </p>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/selectors" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Selectors
        </a>
        <a href="/docs/at-rules" style={{ color: '#667eea', textDecoration: 'none' }}>
          At-Rules →
        </a>
      </div>*/}
    </>
  );
}