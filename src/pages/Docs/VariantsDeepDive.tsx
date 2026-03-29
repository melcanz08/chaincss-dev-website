import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function VariantsDeepDive() {
  const [activeExample, setActiveExample] = useState('basic');
  const [selectedVariant, setSelectedVariant] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('md'); // Changed from 'medium' to 'md'
  const [selectedState, setSelectedState] = useState('default');
  
  // For polymorphic example
  const [polymorphicAs, setPolymorphicAs] = useState('p');
  const [polymorphicAlign, setPolymorphicAlign] = useState('left');
  const [polymorphicWeight, setPolymorphicWeight] = useState('normal');
  
  // For responsive example
  const [responsiveLayout, setResponsiveLayout] = useState('auto');
  const [responsivePosition, setResponsivePosition] = useState('center');
  
  // For compound example
  const [compoundVariant, setCompoundVariant] = useState('primary');
  const [compoundSize, setCompoundSize] = useState('md');
  const [compoundState, setCompoundState] = useState('default');
  
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
        .block(),
      success: $()
        .backgroundColor('#10b981')
        .color('white')
        .hover()
          .backgroundColor('#059669')
          .end()
        .block()
    },
    size: {
      sm: $().padding('6px 12px').fontSize('12px').block(),
      md: $().padding('10px 20px').fontSize('14px').block(),
      lg: $().padding('14px 28px').fontSize('16px').block(),
      xl: $().padding('18px 36px').fontSize('18px').block()
    }
  },
  
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});`,
      preview: () => {
        const colors = {
          primary: { bg: '#3b82f6', hover: '#2563eb' },
          secondary: { bg: '#6b7280', hover: '#4b5563' },
          danger: { bg: '#ef4444', hover: '#dc2626' },
          success: { bg: '#10b981', hover: '#059669' }
        };
        const sizes = {
          sm: { padding: '6px 12px', fontSize: '12px' },
          md: { padding: '10px 20px', fontSize: '14px' },
          lg: { padding: '14px 28px', fontSize: '16px' },
          xl: { padding: '18px 36px', fontSize: '18px' }
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
                <option value="success">Success</option>
              </select>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
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
              {selectedVariant} Button ({selectedSize.toUpperCase()})
            </button>
          </div>
        );
      }
    },
    compound: {
      title: 'Compound Variants',
      description: 'Special styles when multiple variants combine',
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
      primary: $().backgroundColor('#3b82f6').color('white').block(),
      secondary: $().backgroundColor('#6b7280').color('white').block(),
      outline: $().backgroundColor('transparent').color('#3b82f6').block()
    },
    size: {
      sm: $().padding('8px 16px').fontSize('14px').block(),
      lg: $().padding('16px 32px').fontSize('18px').block()
    },
    state: {
      default: $().block(),
      loading: $().opacity('0.7').cursor('wait').block(),
      disabled: $().opacity('0.5').cursor('not-allowed').block()
    }
  },
  
  compoundVariants: [
    {
      variants: { color: 'outline', size: 'lg' },
      style: $()
        .border('2px solid #3b82f6')
        .hover()
          .backgroundColor('#3b82f6')
          .color('white')
          .end()
        .block()
    },
    {
      variants: { color: 'outline', size: 'sm' },
      style: $()
        .border('1px solid #3b82f6')
        .hover()
          .backgroundColor('#3b82f6')
          .color('white')
          .end()
        .block()
    },
    {
      variants: { color: 'primary', state: 'loading' },
      style: $()
        .position('relative')
        .block()
    }
  ],
  
  defaultVariants: {
    color: 'primary',
    size: 'md',
    state: 'default'
  }
});`,
      preview: () => {
        const isOutline = compoundVariant === 'outline';
        const isLarge = compoundSize === 'lg';
        const isDisabled = compoundState === 'disabled';
        const isLoading = compoundState === 'loading';
        
        const colors = {
          primary: { bg: '#3b82f6', hover: '#2563eb', text: 'white' },
          secondary: { bg: '#6b7280', hover: '#4b5563', text: 'white' },
          outline: { bg: 'transparent', hover: '#3b82f6', text: '#3b82f6' }
        };
        
        const color = colors[compoundVariant];
        const borderWidth = isLarge ? '2px' : '1px';
        const border = isOutline ? `${borderWidth} solid #3b82f6` : 'none';
        const opacity = isDisabled ? '0.5' : isLoading ? '0.7' : '1';
        const cursor = isDisabled ? 'not-allowed' : isLoading ? 'wait' : 'pointer';
        const padding = compoundSize === 'lg' ? '16px 32px' : '8px 16px';
        const fontSize = compoundSize === 'lg' ? '18px' : '14px';
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={compoundVariant} onChange={(e) => setCompoundVariant(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
              <select value={compoundSize} onChange={(e) => setCompoundSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="sm">Small</option>
                <option value="lg">Large</option>
              </select>
              <select value={compoundState} onChange={(e) => setCompoundState(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="default">Default</option>
                <option value="loading">Loading</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
            <button style={{
              backgroundColor: color.bg,
              color: color.text,
              padding: padding,
              fontSize: fontSize,
              borderRadius: '8px',
              border: border,
              cursor: cursor,
              fontWeight: '600',
              transition: 'all 0.2s',
              opacity: opacity
            }}
            onMouseEnter={(e) => {
              if (compoundVariant === 'outline') {
                e.currentTarget.style.backgroundColor = color.hover;
                e.currentTarget.style.color = 'white';
              } else if (compoundState === 'default') {
                e.currentTarget.style.backgroundColor = color.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (compoundVariant === 'outline') {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
              } else if (compoundState === 'default') {
                e.currentTarget.style.backgroundColor = color.bg;
              }
            }}
            disabled={compoundState === 'disabled'}>
              {compoundState === 'loading' ? '⏳ Loading...' : `${compoundVariant} ${compoundSize === 'lg' ? 'Large' : 'Small'} ${compoundState === 'disabled' ? '(Disabled)' : ''}`}
            </button>
          </div>
        );
      }
    },
    polymorphic: {
      title: 'Polymorphic Variants',
      description: 'Create variants that change the rendered element',
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
    },
    weight: {
      normal: $().fontWeight('400').block(),
      medium: $().fontWeight('500').block(),
      semibold: $().fontWeight('600').block(),
      bold: $().fontWeight('700').block()
    }
  },
  
  defaultVariants: {
    as: 'p',
    align: 'left',
    weight: 'normal'
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
        
        const weights = {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700'
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
              <select value={polymorphicWeight} onChange={(e) => setPolymorphicWeight(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
              </select>
            </div>
            <div style={{
              ...styles[polymorphicAs],
              textAlign: polymorphicAlign,
              fontWeight: weights[polymorphicWeight],
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              {polymorphicAs === 'h1' && 'Heading 1 with variants'}
              {polymorphicAs === 'h2' && 'Heading 2 with variants'}
              {polymorphicAs === 'h3' && 'Heading 3 with variants'}
              {polymorphicAs === 'p' && 'This is a paragraph with customizable alignment and weight. You can change how it looks using the controls above.'}
              {polymorphicAs === 'small' && 'Small text with variants'}
            </div>
          </div>
        );
      }
    },
    responsive: {
      title: 'Responsive Variants',
      description: 'Variants that change based on screen size',
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
    },
    position: {
      left: $()
        .marginRight('auto')
        .block(),
      center: $()
        .marginLeft('auto')
        .marginRight('auto')
        .block(),
      right: $()
        .marginLeft('auto')
        .block()
    }
  },
  
  defaultVariants: {
    layout: 'auto',
    position: 'center'
  }
});`,
      preview: () => {
        const getStyles = () => {
          const width = responsiveLayout === 'full' ? '100%' : 'auto';
          const margin = responsivePosition === 'left' ? '0 auto 0 0' : 
                        responsivePosition === 'right' ? '0 0 0 auto' : 
                        '0 auto';
          
          return { width, margin };
        };
        
        const styles = getStyles();
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={responsiveLayout} onChange={(e) => setResponsiveLayout(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="auto">Auto Width</option>
                <option value="full">Full Width</option>
              </select>
              <select value={responsivePosition} onChange={(e) => setResponsivePosition(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="left">Left Aligned</option>
                <option value="center">Center Aligned</option>
                <option value="right">Right Aligned</option>
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
                margin: styles.margin,
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
        <h1 className="docs-title">Advanced Variants</h1>
        <p className="docs-description">
          Create powerful, flexible components with ChainCSS variant system.
          From simple variants to complex compound and responsive patterns.
        </p>
      </div>
      
      <h2>What are Variants?</h2>
      <p>
        Variants allow you to create multiple visual styles for a component
        without duplicating code. ChainCSS provides a powerful variant system
        through the <code className="inline-code">recipe()</code> function.
      </p>
      
      <div className="tip">
        <strong>Variant Features:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Multiple variant dimensions (color, size, state)</li>
          <li>Compound variants for special combinations</li>
          <li>Responsive variants that adapt to screen size</li>
          <li>Polymorphic variants that change rendered element</li>
          <li>Default variants for consistent behavior</li>
        </ul>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('basic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white',
            color: activeExample === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Basic Variants
        </button>
        <button
          onClick={() => setActiveExample('compound')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'compound' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'compound' ? '#eef2ff' : 'white',
            color: activeExample === 'compound' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Compound Variants
        </button>
        <button
          onClick={() => setActiveExample('polymorphic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'polymorphic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'polymorphic' ? '#eef2ff' : 'white',
            color: activeExample === 'polymorphic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Polymorphic Variants
        </button>
        <button
          onClick={() => setActiveExample('responsive')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'responsive' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'responsive' ? '#eef2ff' : 'white',
            color: activeExample === 'responsive' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
         Responsive Variants
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      <h2>Variant Composition</h2>
      <p>Combine multiple variants to create complex component APIs:</p>
      <CodeBlock language="javascript" code={`// Combined variant system
const button = recipe({
  base: $().padding('12px 24px').block(),
  
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').block(),
      secondary: $().backgroundColor('#6b7280').block()
    },
    size: {
      sm: $().padding('8px 16px').fontSize('14px').block(),
      lg: $().padding('16px 32px').fontSize('18px').block()
    },
    rounded: {
      true: $().borderRadius('9999px').block(),
      false: $().borderRadius('8px').block()
    },
    fullWidth: {
      true: $().width('100%').block(),
      false: $().width('auto').block()
    }
  },
  
  compoundVariants: [
    {
      variants: { color: 'primary', rounded: true },
      style: $().backgroundColor('#2563eb').block()
    }
  ],
  
  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: false,
    fullWidth: false
  }
});`} />
      
      <h2>TypeScript Support</h2>
      <CodeBlock language="typescript" code={`import { recipe } from 'chaincss';

// Define your variant types
type ButtonVariants = {
  color: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  fullWidth?: boolean;
};

// Create type-safe recipe
const button = recipe<ButtonVariants>({
  base: $().padding('12px 24px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').block(),
      secondary: $().backgroundColor('#6b7280').block(),
      danger: $().backgroundColor('#ef4444').block()
    },
    size: {
      sm: $().padding('8px 16px').block(),
      md: $().padding('12px 24px').block(),
      lg: $().padding('16px 32px').block()
    },
    rounded: {
      true: $().borderRadius('9999px').block(),
      false: $().borderRadius('8px').block()
    },
    fullWidth: {
      true: $().width('100%').block(),
      false: $().width('auto').block()
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
    rounded: false,
    fullWidth: false
  }
});

// Type-safe usage
const primaryButton = button({ color: 'primary', size: 'lg' }); // 
const invalidButton = button({ color: 'invalid' }); //  TypeScript error`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Keep variant names semantic and consistent across components</li>
          <li>Use compound variants for edge cases, not for every combination</li>
          <li>Provide sensible default variants for a good developer experience</li>
          <li>Extract shared variant definitions to maintain consistency</li>
          <li>Use responsive variants for mobile-first design</li>
          <li>Type your variants with TypeScript for better DX</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Performance Tips</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">compileAll()</code> to pre-generate all variant combinations at build time</li>
          <li>Enable atomic CSS to deduplicate styles across variants</li>
          <li>Limit the number of variant dimensions to avoid CSS bloat</li>
          <li>Consider using CSS variables for frequently changing variants</li>
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
        <a href="/docs/recipes" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Recipe System
        </a>
        <a href="/docs/compound-variants" style={{ color: '#667eea', textDecoration: 'none' }}>
          Compound Variants →
        </a>
      </div>*/}
    </>
  );
}