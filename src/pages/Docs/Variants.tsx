import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Variants() {
  const [activeExample, setActiveExample] = useState('basic');
  const [selectedVariant, setSelectedVariant] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('medium');
  
  // State for polymorphic example
  const [polymorphicAs, setPolymorphicAs] = useState('p');
  const [polymorphicAlign, setPolymorphicAlign] = useState('left');
  
  // State for responsive example
  const [responsiveLayout, setResponsiveLayout] = useState('auto');
  
  const examples = {
    basic: {
      title: 'Basic Variants',
      description: 'Create simple variant-based components with recipe()',
      code: `import { recipe } from 'chaincss';

const button = recipe({
  base: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .fontWeight('600')
    .cursor('pointer')
    .transition('all 0.2s')
    .block(),
  
  variants: {
    color: {
      primary: $()
        .backgroundColor('#3b82f6')
        .color('white')
        .hover()
          .backgroundColor('#2563eb')
          .end()
        .block(),
      secondary: $()
        .backgroundColor('#6b7280')
        .color('white')
        .hover()
          .backgroundColor('#4b5563')
          .end()
        .block(),
      danger: $()
        .backgroundColor('#ef4444')
        .color('white')
        .hover()
          .backgroundColor('#dc2626')
          .end()
        .block()
    },
    size: {
      small: $().padding('8px 16px').fontSize('14px').block(),
      medium: $().padding('12px 24px').fontSize('16px').block(),
      large: $().padding('16px 32px').fontSize('18px').block()
    }
  },
  
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
});`,
      preview: () => {
        const colors = {
          primary: { bg: '#3b82f6', hover: '#2563eb' },
          secondary: { bg: '#6b7280', hover: '#4b5563' },
          danger: { bg: '#ef4444', hover: '#dc2626' }
        };
        const sizes = {
          small: { padding: '8px 16px', fontSize: '14px' },
          medium: { padding: '12px 24px', fontSize: '16px' },
          large: { padding: '16px 32px', fontSize: '18px' }
        };
        
        const color = colors[selectedVariant];
        const size = sizes[selectedSize];
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
              </select>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button style={{
              backgroundColor: color.bg,
              color: 'white',
              padding: size.padding,
              fontSize: size.fontSize,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = color.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = color.bg}>
              {selectedVariant} Button ({selectedSize})
            </button>
          </div>
        );
      }
    },
    polymorphic: {
      title: 'Polymorphic Variants',
      description: 'Variants that change the rendered HTML element',
      code: `import { recipe } from 'chaincss';

const typography = recipe({
  base: $()
    .margin('0')
    .block(),
  
  variants: {
    as: {
      h1: $()
        .fontSize('2.5rem')
        .fontWeight('700')
        .lineHeight('1.2')
        .block(),
      h2: $()
        .fontSize('2rem')
        .fontWeight('600')
        .lineHeight('1.3')
        .block(),
      h3: $()
        .fontSize('1.5rem')
        .fontWeight('600')
        .lineHeight('1.4')
        .block(),
      p: $()
        .fontSize('1rem')
        .lineHeight('1.5')
        .marginBottom('1rem')
        .block(),
      small: $()
        .fontSize('0.875rem')
        .color('#64748b')
        .block()
    },
    align: {
      left: $().textAlign('left').block(),
      center: $().textAlign('center').block(),
      right: $().textAlign('right').block()
    }
  },
  
  defaultVariants: {
    as: 'p',
    align: 'left'
  }
});`,
      preview: () => {
        const styles = {
          h1: { fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' },
          h2: { fontSize: '2rem', fontWeight: '600', lineHeight: '1.3' },
          h3: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.4' },
          p: { fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem' },
          small: { fontSize: '0.875rem', color: '#64748b' }
        };
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={polymorphicAs} onChange={(e) => setPolymorphicAs(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="p">Paragraph</option>
                <option value="small">Small Text</option>
              </select>
              <select value={polymorphicAlign} onChange={(e) => setPolymorphicAlign(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div style={{
              ...styles[polymorphicAs],
              textAlign: polymorphicAlign,
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              {polymorphicAs === 'h1' && 'Heading 1 with variants'}
              {polymorphicAs === 'h2' && 'Heading 2 with variants'}
              {polymorphicAs === 'h3' && 'Heading 3 with variants'}
              {polymorphicAs === 'p' && 'This paragraph can be customized with different text alignments.'}
              {polymorphicAs === 'small' && 'Small text with variants'}
            </div>
          </div>
        );
      }
    },
    responsive: {
      title: 'Responsive Variants',
      description: 'Variants that adapt to screen size',
      code: `import { recipe, responsive } from 'chaincss';

const responsiveButton = recipe({
  base: $()
    .padding(responsive({
      base: '8px 16px',
      md: '12px 24px',
      lg: '16px 32px'
    }))
    .fontSize(responsive({
      base: '14px',
      md: '16px',
      lg: '18px'
    }))
    .borderRadius('8px')
    .fontWeight('600')
    .cursor('pointer')
    .transition('all 0.2s')
    .block(),
  
  variants: {
    layout: {
      full: $()
        .width('100%')
        .block(),
      auto: $()
        .width('auto')
        .block()
    }
  },
  
  defaultVariants: {
    layout: 'auto'
  }
});`,
      preview: () => {
        const getStyles = () => {
          const width = responsiveLayout === 'full' ? '100%' : 'auto';
          return { width };
        };
        
        const styles = getStyles();
        
        return (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <select value={responsiveLayout} onChange={(e) => setResponsiveLayout(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="auto">Auto Width</option>
                <option value="full">Full Width</option>
              </select>
            </div>
            <div style={{ border: '1px dashed #e2e8f0', padding: '20px', borderRadius: '8px' }}>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                width: styles.width,
                display: 'block'
              }}>
                Responsive Button
              </button>
            </div>
            <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
              Try resizing your browser window to see responsive padding and font size!
            </p>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Variants</h1>
        <p className="docs-description">
          Create flexible components with variant systems. From simple color variants to complex responsive patterns.
        </p>
      </div>
      
      <h2>What are Variants?</h2>
      <p>
        Variants allow you to create multiple visual styles for a component without duplicating code.
        ChainCSS provides a powerful variant system through the <code className="inline-code">recipe()</code> function.
      </p>
      
      <div className="tip">
        <strong>Key Features:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Base styles shared across all variants</li>
          <li>Multiple variant dimensions (color, size, state)</li>
          <li>Compound variants for special combinations</li>
          <li>Default variants for convenience</li>
          <li>TypeScript support for variant props</li>
        </ul>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveExample('basic')} style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
          backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white',
          color: activeExample === 'basic' ? '#667eea' : '#475569',
          cursor: 'pointer'
        }}>Basic Variants</button>
        <button onClick={() => setActiveExample('polymorphic')} style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: activeExample === 'polymorphic' ? '2px solid #667eea' : '1px solid #e2e8f0',
          backgroundColor: activeExample === 'polymorphic' ? '#eef2ff' : 'white',
          color: activeExample === 'polymorphic' ? '#667eea' : '#475569',
          cursor: 'pointer'
        }}>Polymorphic Variants</button>
        <button onClick={() => setActiveExample('responsive')} style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: activeExample === 'responsive' ? '2px solid #667eea' : '1px solid #e2e8f0',
          backgroundColor: activeExample === 'responsive' ? '#eef2ff' : 'white',
          color: activeExample === 'responsive' ? '#667eea' : '#475569',
          cursor: 'pointer'
        }}>Responsive Variants</button>
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
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use semantic variant names (primary, secondary, danger)</li>
          <li>Keep variant dimensions focused (color, size, state)</li>
          <li>Provide sensible default variants</li>
          <li>Use responsive variants for mobile-first design</li>
        </ul>
      </div>
    </>
  );
}