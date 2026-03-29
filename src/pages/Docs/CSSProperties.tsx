import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

// All CSS properties supported by ChainCSS
const cssProperties = {
  layout: [
    { name: 'display', values: ['block', 'flex', 'grid', 'inline', 'none'], example: 'flex' },
    { name: 'position', values: ['static', 'relative', 'absolute', 'fixed', 'sticky'], example: 'relative' },
    { name: 'top', values: ['auto', '0', '50%', '100%'], example: '20px' },
    { name: 'right', values: ['auto', '0', '50%', '100%'], example: '20px' },
    { name: 'bottom', values: ['auto', '0', '50%', '100%'], example: '20px' },
    { name: 'left', values: ['auto', '0', '50%', '100%'], example: '20px' },
    { name: 'zIndex', values: ['auto', '1', '10', '100'], example: '10' },
    { name: 'overflow', values: ['visible', 'hidden', 'scroll', 'auto'], example: 'hidden' },
  ],
  flexbox: [
    { name: 'flexDirection', values: ['row', 'row-reverse', 'column', 'column-reverse'], example: 'column' },
    { name: 'flexWrap', values: ['wrap', 'nowrap', 'wrap-reverse'], example: 'wrap' },
    { name: 'justifyContent', values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'], example: 'center' },
    { name: 'alignItems', values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], example: 'center' },
    { name: 'gap', values: ['0', '8px', '16px', '24px'], example: '16px' },
    { name: 'flex', values: ['0 1 auto', '1 0 0', 'auto'], example: '1' },
  ],
  spacing: [
    { name: 'margin', values: ['0', '8px', '16px', 'auto'], example: '16px' },
    { name: 'marginTop', values: ['0', '8px', '16px', 'auto'], example: '8px' },
    { name: 'marginBottom', values: ['0', '8px', '16px', 'auto'], example: '8px' },
    { name: 'padding', values: ['0', '8px', '16px', '24px'], example: '16px' },
    { name: 'paddingTop', values: ['0', '8px', '16px', '24px'], example: '8px' },
    { name: 'paddingBottom', values: ['0', '8px', '16px', '24px'], example: '8px' },
  ],
  colors: [
    { name: 'color', values: ['#000', 'rgb(0,0,0)', 'red', 'var(--primary)'], example: '#3b82f6' },
    { name: 'backgroundColor', values: ['#fff', 'transparent', 'blue'], example: '#3b82f6' },
    { name: 'borderColor', values: ['#000', 'currentColor', 'transparent'], example: '#e2e8f0' },
  ],
  typography: [
    { name: 'fontFamily', values: ['Arial', 'sans-serif', 'monospace'], example: 'system-ui' },
    { name: 'fontSize', values: ['12px', '1rem', '1.5em', '16px'], example: '16px' },
    { name: 'fontWeight', values: ['normal', 'bold', '600', '500'], example: '600' },
    { name: 'lineHeight', values: ['1.2', '1.5', '2', 'normal'], example: '1.5' },
    { name: 'textAlign', values: ['left', 'center', 'right', 'justify'], example: 'center' },
  ],
  borders: [
    { name: 'border', values: ['1px solid #000', 'none', '2px dashed red'], example: '1px solid #e2e8f0' },
    { name: 'borderRadius', values: ['4px', '8px', '50%', '9999px'], example: '8px' },
    { name: 'borderWidth', values: ['1px', '2px', 'thin', 'medium'], example: '1px' },
  ],
  effects: [
    { name: 'boxShadow', values: ['0 1px 3px rgba(0,0,0,0.1)', 'none'], example: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    { name: 'opacity', values: ['0', '0.5', '0.8', '1'], example: '0.8' },
    { name: 'transform', values: ['scale(1.05)', 'rotate(10deg)', 'translateX(10px)'], example: 'scale(1.05)' },
    { name: 'transition', values: ['all 0.2s', 'opacity 0.3s ease'], example: 'all 0.2s' },
  ],
};

export default function CSSProperties() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Properties', icon: '' },
    { id: 'layout', name: 'Layout', icon: '' },
    { id: 'flexbox', name: 'Flexbox', icon: '' },
    { id: 'spacing', name: 'Spacing', icon: '' },
    { id: 'colors', name: 'Colors', icon: '' },
    { id: 'typography', name: 'Typography', icon: '' },
    { id: 'borders', name: 'Borders', icon: '' },
    { id: 'effects', name: 'Effects', icon: '' },
  ];
  
  const getFilteredProperties = () => {
    let properties = [];
    if (selectedCategory === 'all') {
      Object.values(cssProperties).forEach(category => {
        properties = [...properties, ...category];
      });
    } else {
      properties = cssProperties[selectedCategory] || [];
    }
    
    if (searchTerm) {
      properties = properties.filter(prop => 
        prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.values.some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return properties;
  };
  
  const filteredProperties = getFilteredProperties();
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">CSS Properties</h1>
        <p className="docs-description">
          ChainCSS supports all standard CSS properties. Write them in camelCase and chain them together.
        </p>
      </div>
      
      {/* Quick Reference */}
      <h2>Quick Reference</h2>
      <CodeBlock language="javascript" code={`// CSS property names become camelCase methods
const button = $()
  .backgroundColor('#3b82f6')    // background-color
  .borderRadius('8px')            // border-radius
  .fontSize('16px')               // font-size
  .fontWeight('600')              // font-weight
  .boxShadow('0 1px 3px rgba(0,0,0,0.1)')  // box-shadow
  .block('.btn');`} />
      
      {/* Property Name Conversion */}
      <div className="note">
        <strong>CSS Property Conversion</strong>
        <p>
          CSS properties with hyphens become camelCase in ChainCSS:<br />
          <code className="inline-code">background-color</code> → <code className="inline-code">.backgroundColor()</code><br />
          <code className="inline-code">border-radius</code> → <code className="inline-code">.borderRadius()</code><br />
          <code className="inline-code">font-size</code> → <code className="inline-code">.fontSize()</code><br />
          <code className="inline-code">z-index</code> → <code className="inline-code">.zIndex()</code>
        </p>
      </div>
      
      {/* Search and Filter */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="🔍 Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            marginBottom: '16px',
            outline: 'none'
          }}
        />
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedCategory === cat.id ? '2px solid #667eea' : '1px solid #e2e8f0',
                backgroundColor: selectedCategory === cat.id ? '#eef2ff' : 'white',
                color: selectedCategory === cat.id ? '#667eea' : '#475569',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: selectedCategory === cat.id ? '500' : 'normal',
              }}
            >
               {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Properties Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        {filteredProperties.map(prop => (
          <div 
            key={prop.name}
            style={{
              padding: '16px',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              backgroundColor: 'white'
            }}
          >
            <div style={{ marginBottom: '8px' }}>
              <code style={{ 
                backgroundColor: '#eef2ff', 
                padding: '4px 8px', 
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#667eea'
              }}>
                .{prop.name}()
              </code>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
              CSS: <code className="inline-code">{prop.name.replace(/([A-Z])/g, '-$1').toLowerCase()}</code>
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
              Example: <code className="inline-code">{prop.example}</code>
            </div>
          </div>
        ))}
      </div>
      
      {/* Interactive Example */}
      <h2> Try It Yourself</h2>
      <CodeBlock language="javascript" code={`const card = $()
  .backgroundColor('white')
  .border('1px solid #e2e8f0')
  .borderRadius('12px')
  .padding('20px')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .hover()
    .transform('translateY(-4px)')
    .boxShadow('0 12px 24px -12px rgba(0,0,0,0.2)')
    .end()
  .transition('all 0.2s')
  .block('.card');`} />
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s',
        cursor: 'pointer',
        marginBottom: '32px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          Interactive Card
        </h3>
        <p style={{ color: '#64748b' }}>
          Hover over this card to see the transition effects!
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
        <a href="/docs/chainable-api" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Chainable API
        </a>
        <a href="/docs/selectors" style={{ color: '#667eea', textDecoration: 'none' }}>
          Selectors →
        </a>
      </div>*/}
    </>
  );
}