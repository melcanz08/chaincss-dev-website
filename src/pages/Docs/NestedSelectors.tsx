import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';
import './styles/nestedselectors.class.js';
import './styles/nestedselectors.css';

export default function NestedSelectors() {
  const [activeDemo, setActiveDemo] = useState('descendant');
  
  const demos = {
    descendant: {
      title: 'Descendant Selector',
      description: 'Style elements that are descendants of a parent',
      code: `export const navStyles = $
  .select('.demo-nav')
    .bg('#1e293b')
    .p('16px')
    .select('a')
      .c('white')
      .textDecoration('none')
      .p('8px 16px')
      .display('inline-block')
      .hover()
        .bg('#3b82f6')
        .rounded('4px')
      .end()
      .$el()
    .$el()
  .$el('.demo-nav');`,
      css: `.demo-nav {
  background-color: #1e293b;
  padding: 16px;
}
.demo-nav a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  display: inline-block;
}
.demo-nav a:hover {
  background-color: #3b82f6;
  border-radius: 4px;
}`
    },
    child: {
      title: 'Child Selector (>)',
      description: 'Style direct children only (not nested descendants)',
      code: `export const menuStyles = $
  .select('.demo-menu')
    .bg('#f8fafc')
    .border('1px solid #e2e8f0')
    .rounded('8px')
    .select('> li')
      .p('12px 16px')
      .borderBottom('1px solid #e2e8f0')
      .hover()
        .bg('#f1f5f9')
      .end()
      .select('> a')
        .c('#1e293b')
        .textDecoration('none')
        .$el()
      .$el()
    .$el()
  .$el('.demo-menu');`,
      css: `.demo-menu {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.demo-menu > li {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}
.demo-menu > li:hover {
  background-color: #f1f5f9;
}
.demo-menu > li > a {
  color: #1e293b;
  text-decoration: none;
}`
    },
    adjacent: {
      title: 'Adjacent Sibling (+)',
      description: 'Style an element that comes immediately after another',
      code: `export const formStyles = $
  .select('.demo-label')
    .weight('600')
    .mb('4px')
    .display('block')
    .select('+ .demo-input')
      .mt('0')
      .$el()
    .$el()
  .select('.demo-input')
    .border('1px solid #e2e8f0')
    .rounded('6px')
    .p('8px 12px')
    .mb('16px')
    .w('100%')
    .focus()
      .borderC('#3b82f6')
      .outline('none')
      .shadow('0 0 0 3px rgba(59,130,246,0.1)')
    .end()
    .select('+ .demo-input')
      .mt('8px')
      .$el()
    .$el()
  .$el();`,
      css: `.demo-label {
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
}
.demo-label + .demo-input {
  margin-top: 0;
}
.demo-input {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 16px;
  width: 100%;
}
.demo-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
.demo-input + .demo-input {
  margin-top: 8px;
}`
    },
    general: {
      title: 'General Sibling (~)',
      description: 'Style all siblings that come after an element',
      code: `export const sectionStyles = $
  .select('.demo-title')
    .textSize('24px')
    .weight('bold')
    .mb('16px')
    .select('~ .demo-paragraph')
      .ml('20px')
      .c('#475569')
      .$el()
    .$el()
  .$el();`,
      css: `.demo-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
.demo-title ~ .demo-paragraph {
  margin-left: 20px;
  color: #475569;
}`
    },
    pseudo: {
      title: 'Pseudo-classes with Nesting',
      description: 'Combine pseudo-classes with nested selectors',
      code: `export const cardStyles = $
  .select('.demo-card')
    .bg('white')
    .rounded('12px')
    .p('20px')
    .shadow('0 1px 3px rgba(0,0,0,0.1)')
    .hover()
      .transform('translateY(-4px)')
      .shadow('0 12px 24px -12px rgba(0,0,0,0.2)')
    .end()
    .select('.demo-card-title')
      .textSize('18px')
      .weight('600')
      .mb('8px')
      .select('&:hover')
        .c('#3b82f6')
        .$el()
      .$el()
    .$el()
  .$el('.demo-card');`,
      css: `.demo-card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -12px rgba(0,0,0,0.2);
}
.demo-card .demo-card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}
.demo-card .demo-card-title:hover {
  color: #3b82f6;
}`
    }
  };
  
  const currentDemo = demos[activeDemo];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Nested Selectors</h1>
        <p className="docs-description">
          Create complex CSS selectors with ChainCSS's nesting capabilities. Style elements based on their position,
          relationships, and hierarchy.
        </p>
      </div>
      
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.select()</code> method to create nested selectors.
        Each <code className="inline-code">.select()</code> creates a new level in the selector chain.
        Use <code className="inline-code">.$el()</code> to close each nesting level:
      </p>
      <CodeBlock language="javascript" code={`export const styles = $
  .select('.parent')
    .bg('#f8fafc')
    .select('.child')
      .c('#1e293b')
      .p('8px')
      .$el()
    .$el()
  .$el();`} />
      
      <div className="tip">
        <strong>Tip:</strong> Each <code className="inline-code">.select()</code> must be paired with a <code className="inline-code">.$el()</code> to close the nesting level.
        Think of it like opening and closing braces in CSS.
      </div>
      
      <h2>Selector Types</h2>
      <p>Choose a selector type to see an example:</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveDemo('descendant')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'descendant' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'descendant' ? '#eef2ff' : 'white',
            color: activeDemo === 'descendant' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Descendant (space)
        </button>
        <button
          onClick={() => setActiveDemo('child')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'child' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'child' ? '#eef2ff' : 'white',
            color: activeDemo === 'child' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Child ({'>'})
        </button>
        <button
          onClick={() => setActiveDemo('adjacent')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'adjacent' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'adjacent' ? '#eef2ff' : 'white',
            color: activeDemo === 'adjacent' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Adjacent Sibling (+)
        </button>
        <button
          onClick={() => setActiveDemo('general')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'general' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'general' ? '#eef2ff' : 'white',
            color: activeDemo === 'general' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          General Sibling (~)
        </button>
        <button
          onClick={() => setActiveDemo('pseudo')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeDemo === 'pseudo' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeDemo === 'pseudo' ? '#eef2ff' : 'white',
            color: activeDemo === 'pseudo' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Pseudo-classes
        </button>
      </div>
      
      <CodeBlock language="javascript" code={currentDemo.code} />
      
      <div className="tip">
        <strong>Generated CSS:</strong>
        <CodeBlock language="css" code={currentDemo.css} />
      </div>
      
      <div style={{ 
        marginTop: '24px',
        padding: '24px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Live Preview
        </h3>
        
        {activeDemo === 'descendant' && (
          <nav className="demo-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        )}
        
        {activeDemo === 'child' && (
          <ul className="demo-menu">
            <li><a href="#">Home</a></li>
            <li>
              <a href="#">About</a>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li><a href="#">Team</a></li>
              </ul>
            </li>
          </ul>
        )}
        
        {activeDemo === 'adjacent' && (
          <div>
            <label className="demo-label">Name</label>
            <input type="text" placeholder="Your name" className="demo-input" />
            <label className="demo-label">Email</label>
            <input type="email" placeholder="Your email" className="demo-input" />
          </div>
        )}
        
        {activeDemo === 'general' && (
          <div>
            <h2 className="demo-title">Title</h2>
            <p className="demo-paragraph">This paragraph will be indented</p>
            <div>Some content</div>
            <p className="demo-paragraph">This paragraph will also be indented</p>
          </div>
        )}
        
        {activeDemo === 'pseudo' && (
          <div className="demo-card">
            <h3 className="demo-card-title">Card Title</h3>
            <p>Card content goes here. Hover over the title to see the effect</p>
          </div>
        )}
      </div>
      
      <h2>Complex Nesting Example</h2>
      <p>ChainCSS supports deeply nested selectors for complex component structures:</p>
      <CodeBlock language="javascript" code={`export const component = $
  .select('.component')
    .border('1px solid #e2e8f0')
    .rounded('8px')
    .p('20px')
    .select('> .header')
      .borderBottom('1px solid #e2e8f0')
      .pb('12px')
      .mb('16px')
      .select('h2')
        .textSize('20px')
        .weight('600')
        .select('&:hover')
          .c('#3b82f6')
          .$el()
        .$el()
      .$el()
    .select('> .content')
      .select('p')
        .mb('12px')
        .lineHeight('1.6')
        .select('&:last-child')
          .mb('0')
          .$el()
        .$el()
      .$el()
    .$el()
  .$el();`} />
      
      <div className="tip">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">.select()</code> and <code className="inline-code">.$el()</code> like opening and closing braces</li>
          <li>Indent your code to visualize the nesting level</li>
          <li>Use <code className="inline-code">&</code> to reference the parent selector inside pseudo-classes</li>
          <li>Keep nesting depth under 4 levels for maintainability</li>
        </ul>
      </div>
    </>
  );
}