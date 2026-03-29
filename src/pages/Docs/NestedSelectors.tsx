import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function NestedSelectors() {
  const [activeDemo, setActiveDemo] = useState('descendant');
  
  const demos = {
    descendant: {
      title: 'Descendant Selector',
      description: 'Style elements that are descendants of a parent',
      code: `const nav = $()
  .select('.nav')
    .backgroundColor('#1e293b')
    .padding('16px')
    .select('a')
      .color('white')
      .textDecoration('none')
      .padding('8px 16px')
      .hover()
        .backgroundColor('#3b82f6')
        .borderRadius('4px')
        .end()
      .block()
    .block()
  .block('.nav');`,
      css: `.nav {
  background-color: #1e293b;
  padding: 16px;
}
.nav a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
}
.nav a:hover {
  background-color: #3b82f6;
  border-radius: 4px;
}`,
      html: `<nav class="nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>`
    },
    child: {
      title: 'Child Selector (>)',
      description: 'Style direct children only (not nested descendants)',
      code: `const menu = $()
  .select('.menu')
    .backgroundColor('#f8fafc')
    .border('1px solid #e2e8f0')
    .borderRadius('8px')
    .select('> li')
      .padding('12px 16px')
      .borderBottom('1px solid #e2e8f0')
      .hover()
        .backgroundColor('#f1f5f9')
        .end()
      .select('> a')
        .color('#1e293b')
        .textDecoration('none')
        .block()
      .block()
    .block()
  .block('.menu');`,
      css: `.menu {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.menu > li {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}
.menu > li:hover {
  background-color: #f1f5f9;
}
.menu > li > a {
  color: #1e293b;
  text-decoration: none;
}`,
      html: `<ul class="menu">
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a>
    <ul>
      <li><a href="#">Team</a></li>
    </ul>
  </li>
</ul>`
    },
    adjacent: {
      title: 'Adjacent Sibling (+)',
      description: 'Style an element that comes immediately after another',
      code: `const form = $()
  .select('label')
    .fontWeight('600')
    .marginBottom('4px')
    .display('block')
    .select('+ input')
      .marginTop('0')
      .block()
    .block()
  .select('input')
    .border('1px solid #e2e8f0')
    .borderRadius('6px')
    .padding('8px 12px')
    .marginBottom('16px')
    .width('100%')
    .focus()
      .borderColor('#3b82f6')
      .outline('none')
      .boxShadow('0 0 0 3px rgba(59,130,246,0.1)')
      .end()
    .select('+ input')
      .marginTop('8px')
      .block()
    .block()
  .block();`,
      css: `label {
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
}
label + input {
  margin-top: 0;
}
input {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 16px;
  width: 100%;
}
input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
input + input {
  margin-top: 8px;
}`,
      html: `<label>Name</label>
<input type="text" placeholder="Your name">
<label>Email</label>
<input type="email" placeholder="Your email">`
    },
    general: {
      title: 'General Sibling (~)',
      description: 'Style all siblings that come after an element',
      code: `const section = $()
  .select('h2')
    .fontSize('24px')
    .fontWeight('bold')
    .marginBottom('16px')
    .select('~ p')
      .marginLeft('20px')
      .color('#475569')
      .block()
    .block()
  .block();`,
      css: `h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}
h2 ~ p {
  margin-left: 20px;
  color: #475569;
}`,
      html: `<h2>Title</h2>
<p>This paragraph will be indented</p>
<div>Some content</div>
<p>This paragraph will also be indented</p>`
    },
    pseudo: {
      title: 'Pseudo-classes with Nesting',
      description: 'Combine pseudo-classes with nested selectors',
      code: `const card = $()
  .select('.card')
    .backgroundColor('white')
    .borderRadius('12px')
    .padding('20px')
    .boxShadow('0 1px 3px rgba(0,0,0,0.1)')
    .hover()
      .transform('translateY(-4px)')
      .boxShadow('0 12px 24px -12px rgba(0,0,0,0.2)')
      .end()
    .select('.card-title')
      .fontSize('18px')
      .fontWeight('600')
      .marginBottom('8px')
      .select('&:hover')
        .color('#3b82f6')
        .block()
      .block()
    .block()
  .block();`,
      css: `.card {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -12px rgba(0,0,0,0.2);
}
.card .card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}
.card .card-title:hover {
  color: #3b82f6;
}`,
      html: `<div class="card">
  <h3 class="card-title">Card Title</h3>
  <p>Card content goes here</p>
</div>`
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
      
      {/* Basic Usage */}
      <h2>Basic Usage</h2>
      <p>
        Use the <code className="inline-code">.select()</code> method to create nested selectors.
        Each <code className="inline-code">.select()</code> creates a new level in the selector chain:
      </p>
      <CodeBlock language="javascript" code={`const styles = $()
  .select('.parent')
    .backgroundColor('#f8fafc')
    .select('.child')
      .color('#1e293b')
      .padding('8px')
      .block()
    .block()
  .block();`} />
      
      <div className="tip">
        <strong>Tip:</strong> Each <code className="inline-code">.select()</code> must be paired with a <code className="inline-code">.block()</code> to close the nesting level.
        Think of it like opening and closing braces in CSS.
      </div>
      
      {/* Interactive Examples */}
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
      
      {/* Live Preview */}
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
        <div dangerouslySetInnerHTML={{ __html: currentDemo.html }} />
        
        {activeDemo === 'descendant' && (
          <nav style={{
            backgroundColor: '#1e293b',
            padding: '16px',
            borderRadius: '8px'
          }}>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              display: 'inline-block'
            }}>Home</a>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              display: 'inline-block'
            }}>About</a>
            <a href="#" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              display: 'inline-block'
            }}>Contact</a>
          </nav>
        )}
        
        {activeDemo === 'child' && (
          <ul style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: 0,
            margin: 0,
            listStyle: 'none'
          }}>
            <li style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <a href="#" style={{ color: '#1e293b', textDecoration: 'none' }}>Home</a>
            </li>
            <li style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <a href="#" style={{ color: '#1e293b', textDecoration: 'none' }}>About</a>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                <li><a href="#">Team</a></li>
              </ul>
            </li>
          </ul>
        )}
        
        {activeDemo === 'adjacent' && (
          <div>
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Name</label>
            <input type="text" placeholder="Your name" style={{
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              marginBottom: '16px',
              width: '100%'
            }} />
            <label style={{ fontWeight: '600', display: 'block', marginBottom: '4px' }}>Email</label>
            <input type="email" placeholder="Your email" style={{
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              marginBottom: '16px',
              width: '100%'
            }} />
          </div>
        )}
        
        {activeDemo === 'general' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Title</h2>
            <p style={{ marginLeft: '20px', color: '#475569' }}>This paragraph will be indented</p>
            <div>Some content</div>
            <p style={{ marginLeft: '20px', color: '#475569' }}>This paragraph will also be indented</p>
          </div>
        )}
        
        {activeDemo === 'pseudo' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '8px',
              transition: 'color 0.2s'
            }}>Card Title</h3>
            <p>Card content goes here. Hover over the title to see the effect!</p>
          </div>
        )}
      </div>
      
      {/* Complex Example */}
      <h2>Complex Nesting Example</h2>
      <p>ChainCSS supports deeply nested selectors for complex component structures:</p>
      <CodeBlock language="javascript" code={`const component = $()
  .select('.component')
    .border('1px solid #e2e8f0')
    .borderRadius('8px')
    .padding('20px')
    .select('> .header')
      .borderBottom('1px solid #e2e8f0')
      .paddingBottom('12px')
      .marginBottom('16px')
      .select('h2')
        .fontSize('20px')
        .fontWeight('600')
        .select('&:hover')
          .color('#3b82f6')
          .block()
        .block()
      .block()
    .select('> .content')
      .select('p')
        .marginBottom('12px')
        .lineHeight('1.6')
        .select('&:last-child')
          .marginBottom('0')
          .block()
        .block()
      .block()
    .block()
  .block();`} />
      
      <div className="tip">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">.select()</code> and <code className="inline-code">.block()</code> like opening and closing braces</li>
          <li>Indent your code to visualize the nesting level</li>
          <li>Use <code className="inline-code">&</code> to reference the parent selector inside pseudo-classes</li>
          <li>Keep nesting depth under 4 levels for maintainability</li>
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
        <a href="/docs/hover-states" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Hover & Interactive States
        </a>
        <a href="/docs/at-rules" style={{ color: '#667eea', textDecoration: 'none' }}>
          At-Rules →
        </a>
      </div>*/}
    </>
  );
}