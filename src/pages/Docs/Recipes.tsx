import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Recipes() {
  const [activeExample, setActiveExample] = useState('basic');
  const [selectedVariant, setSelectedVariant] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [compoundColor, setCompoundColor] = useState('primary');
  const [compoundSize, setCompoundSize] = useState('medium');
  const [compositionType, setCompositionType] = useState('text');
  const [compositionSize, setCompositionSize] = useState('medium');
  
  const examples = {
    basic: {
      title: 'Basic Recipe',
      description: 'Create a simple button component with variants',
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
    compound: {
      title: 'Compound Variants',
      description: 'Apply styles when multiple variants are combined',
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
      small: $().padding('8px 16px').fontSize('14px').block(),
      large: $().padding('16px 32px').fontSize('18px').block()
    }
  },
  
  compoundVariants: [
    {
      variants: { color: 'outline', size: 'large' },
      style: $()
        .border('2px solid #3b82f6')
        .hover()
          .backgroundColor('#3b82f6')
          .color('white')
          .end()
        .block()
    },
    {
      variants: { color: 'outline', size: 'small' },
      style: $()
        .border('1px solid #3b82f6')
        .hover()
          .backgroundColor('#3b82f6')
          .color('white')
          .end()
        .block()
    }
  ],
  
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
});`,
      preview: () => {
        const isOutline = compoundColor === 'outline';
        
        const colors = {
          primary: { bg: '#3b82f6', hover: '#2563eb', text: 'white' },
          secondary: { bg: '#6b7280', hover: '#4b5563', text: 'white' },
          outline: { bg: 'transparent', hover: '#3b82f6', text: '#3b82f6' }
        };
        const sizes = {
          small: { padding: '8px 16px', fontSize: '14px' },
          medium: { padding: '12px 24px', fontSize: '16px' },
          large: { padding: '16px 32px', fontSize: '18px' }
        };
        const colorStyle = colors[compoundColor];
        const sizeStyle = sizes[compoundSize];
        
        const borderWidth = compoundSize === 'small' ? '1px' : '2px';
        const border = isOutline ? `${borderWidth} solid #3b82f6` : 'none';
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={compoundColor} onChange={(e) => setCompoundColor(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
              <select value={compoundSize} onChange={(e) => setCompoundSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button style={{
              backgroundColor: colorStyle.bg,
              color: colorStyle.text,
              padding: sizeStyle.padding,
              fontSize: sizeStyle.fontSize,
              borderRadius: '8px',
              border: border,
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (isOutline) {
                e.currentTarget.style.backgroundColor = colorStyle.hover;
                e.currentTarget.style.color = 'white';
              } else {
                e.currentTarget.style.backgroundColor = colorStyle.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (isOutline) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
              } else {
                e.currentTarget.style.backgroundColor = colorStyle.bg;
              }
            }}>
              {compoundColor} Button ({compoundSize})
            </button>
            {isOutline && (
              <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
                Compound variant: Outline buttons have special hover effects
              </p>
            )}
          </div>
        );
      }
    },
    composition: {
      title: 'Style Composition',
      description: 'Compose recipes for complex components',
      code: `import { recipe } from 'chaincss';

// Base button recipe
const buttonBase = recipe({
  base: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .fontWeight('600')
    .cursor('pointer')
    .transition('all 0.2s')
    .block(),
  
  variants: {
    size: {
      small: $().padding('8px 16px').fontSize('14px').block(),
      large: $().padding('16px 32px').fontSize('18px').block()
    }
  }
});

// Icon button recipe (composes base)
const iconButton = recipe({
  base: $()
    .display('inline-flex')
    .alignItems('center')
    .gap('8px')
    .block(),
  
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').color('white').block(),
      secondary: $().backgroundColor('#6b7280').color('white').block()
    },
    size: {
      small: $().padding('8px 12px').block(),
      large: $().padding('12px 16px').block()
    }
  }
});`,
      preview: () => {
        const sizes = {
          small: { padding: '8px 16px', fontSize: '14px', gap: '4px' },
          medium: { padding: '12px 24px', fontSize: '16px', gap: '8px' },
          large: { padding: '16px 32px', fontSize: '18px', gap: '12px' }
        };
        
        const sizeStyle = sizes[compositionSize];
        const isIcon = compositionType === 'icon';
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={compositionType} onChange={(e) => setCompositionType(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="text">Text Button</option>
                <option value="icon">Icon Button</option>
              </select>
              <select value={compositionSize} onChange={(e) => setCompositionSize(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: sizeStyle.padding,
              fontSize: sizeStyle.fontSize,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: isIcon ? 'inline-flex' : 'inline-block',
              alignItems: isIcon ? 'center' : undefined,
              gap: isIcon ? sizeStyle.gap : undefined
            }}>
              {compositionType === 'icon' ? '✓ ' : ''}{compositionType === 'icon' ? 'Icon Button' : 'Text Button'} ({compositionSize})
            </button>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Recipe System</h1>
        <p className="docs-description">
          Create reusable, variant-based components with the <code className="inline-code">recipe()</code> system.
        </p>
      </div>
      
      <h2>What is recipe()?</h2>
      <p>
        The <code className="inline-code">recipe()</code> system allows you to create component styles with variants.
        It's like a type-safe CSS-in-JS variant system that generates atomic CSS at build time.
      </p><br />
      
      <div className="tip">
        <strong>Key Features:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Base styles shared across all variants</li>
          <li>Multiple variant dimensions (color, size, etc.)</li>
          <li>Compound variants for special combinations</li>
          <li>Default variants for convenience</li>
          <li>TypeScript support for variant props</li>
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
          Basic Recipe
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
          onClick={() => setActiveExample('composition')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'composition' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'composition' ? '#eef2ff' : 'white',
            color: activeExample === 'composition' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Style Composition
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
          <strong>🎬 Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      <h2>API Reference</h2>
      
      <h3>recipe(options)</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
             </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">base</code></td>
              <td style={{ padding: '12px' }}>StyleObject | Function</td>
              <td style={{ padding: '12px' }}>Base styles applied to all variants</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">variants</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Variant definitions (color, size, etc.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">compoundVariants</code></td>
              <td style={{ padding: '12px' }}>Array</td>
              <td style={{ padding: '12px' }}>Styles applied when multiple variants match</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">defaultVariants</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Default variant values</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>TypeScript Support</h2>
      <CodeBlock language="typescript" code={`import { recipe } from 'chaincss';

type ButtonVariants = {
  color: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
};

const button = recipe<ButtonVariants>({
  base: $().padding('12px 24px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').color('white').block(),
      secondary: $().backgroundColor('#6b7280').color('white').block(),
      danger: $().backgroundColor('#ef4444').color('white').block()
    },
    size: {
      small: $().padding('8px 16px').block(),
      medium: $().padding('12px 24px').block(),
      large: $().padding('16px 32px').block()
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium'
  }
});

// Type-safe usage
const btn = button({ color: 'primary', size: 'large' }); // 
const invalid = button({ color: 'invalid' }); //  TypeScript error`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Keep base styles for shared properties (padding, border-radius, transitions)</li>
          <li>Use variants for dimensions that change (color, size, state)</li>
          <li>Use compound variants for special combinations (e.g., outline + large)</li>
          <li>Always provide default variants for consistent behavior</li>
          <li>Extract complex recipes into separate files for reusability</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Performance Tips</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">compileAll()</code> to pre-generate all variant combinations at build time</li>
          <li>Enable atomic CSS to deduplicate styles across variants</li>
          <li>Cache recipe results when used with dynamic props</li>
        </ul>
      </div>
    </>
  );
}