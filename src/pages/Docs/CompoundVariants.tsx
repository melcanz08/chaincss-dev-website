import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function CompoundVariants() {
  const [activeExample, setActiveExample] = useState('basic');
  const [variant1, setVariant1] = useState('primary');
  const [variant2, setVariant2] = useState('medium');
  const [variant3, setVariant3] = useState('default');
  
  const examples = {
    basic: {
      title: 'Basic Compound Variants',
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
        const isOutline = variant1 === 'outline';
        const isLarge = variant2 === 'large';
        
        const colors = {
          primary: { bg: '#3b82f6', hover: '#2563eb', text: 'white' },
          secondary: { bg: '#6b7280', hover: '#4b5563', text: 'white' },
          outline: { bg: 'transparent', hover: '#3b82f6', text: '#3b82f6' }
        };
        
        const color = colors[variant1];
        const borderWidth = isLarge ? '2px' : '1px';
        const border = isOutline ? `${borderWidth} solid #3b82f6` : 'none';
        const padding = variant2 === 'large' ? '16px 32px' : '8px 16px';
        const fontSize = variant2 === 'large' ? '18px' : '14px';
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={variant1} onChange={(e) => setVariant1(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
              <select value={variant2} onChange={(e) => setVariant2(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="small">Small</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button style={{
              backgroundColor: color.bg,
              color: color.text,
              padding: padding,
              fontSize: fontSize,
              borderRadius: '8px',
              border: border,
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (isOutline) {
                e.currentTarget.style.backgroundColor = color.hover;
                e.currentTarget.style.color = 'white';
              } else {
                e.currentTarget.style.backgroundColor = color.hover;
              }
            }}
            onMouseLeave={(e) => {
              if (isOutline) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
              } else {
                e.currentTarget.style.backgroundColor = color.bg;
              }
            }}>
              {variant1} {variant2} Button
            </button>
            {isOutline && (
              <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
                ✨ Compound variant active: Outline + {variant2} = special border and hover effects
              </p>
            )}
          </div>
        );
      }
    },
    multiple: {
      title: 'Multiple Compound Variants',
      description: 'Combine three or more variants for complex interactions',
      code: `import { recipe } from 'chaincss';

const card = recipe({
  base: $()
    .padding('24px')
    .borderRadius('12px')
    .transition('all 0.2s')
    .block(),
  
  variants: {
    variant: {
      default: $()
        .backgroundColor('white')
        .border('1px solid #e2e8f0')
        .block(),
      elevated: $()
        .backgroundColor('white')
        .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
        .block(),
      outlined: $()
        .backgroundColor('transparent')
        .border('2px solid #3b82f6')
        .block()
    },
    interactive: {
      true: $()
        .cursor('pointer')
        .block(),
      false: $()
        .cursor('default')
        .block()
    },
    size: {
      compact: $().padding('16px').block(),
      normal: $().padding('24px').block(),
      large: $().padding('32px').block()
    }
  },
  
  compoundVariants: [
    {
      variants: { variant: 'elevated', interactive: true },
      style: $()
        .hover()
          .transform('translateY(-4px)')
          .boxShadow('0 12px 24px -12px rgba(0,0,0,0.2)')
          .end()
        .block()
    },
    {
      variants: { variant: 'outlined', interactive: true },
      style: $()
        .hover()
          .backgroundColor('#3b82f6')
          .color('white')
          .borderColor('#3b82f6')
          .end()
        .block()
    },
    {
      variants: { variant: 'default', size: 'large', interactive: true },
      style: $()
        .hover()
          .backgroundColor('#f8fafc')
          .end()
        .block()
    }
  ],
  
  defaultVariants: {
    variant: 'default',
    interactive: false,
    size: 'normal'
  }
});`,
      preview: () => {
        const getStyles = () => {
          const isElevated = variant1 === 'elevated';
          const isOutlined = variant1 === 'outlined';
          const isDefault = variant1 === 'default';
          const isInteractive = variant3 === 'true';
          const isLarge = variant2 === 'large';
          
          let bgColor = variant1 === 'outlined' ? 'transparent' : 'white';
          let textColor = isOutlined ? '#3b82f6' : '#1e293b';
          let border = variant1 === 'outlined' ? '2px solid #3b82f6' : 
                       variant1 === 'default' ? '1px solid #e2e8f0' : 'none';
          let boxShadow = isElevated ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none';
          let padding = variant2 === 'compact' ? '16px' : 
                        variant2 === 'large' ? '32px' : '24px';
          let cursor = isInteractive ? 'pointer' : 'default';
          
          return { bgColor, textColor, border, boxShadow, padding, cursor, isInteractive, isOutlined, isElevated };
        };
        
        const styles = getStyles();
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={variant1} onChange={(e) => setVariant1(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="default">Default</option>
                <option value="elevated">Elevated</option>
                <option value="outlined">Outlined</option>
              </select>
              <select value={variant2} onChange={(e) => setVariant2(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="compact">Compact</option>
                <option value="normal">Normal</option>
                <option value="large">Large</option>
              </select>
              <select value={variant3} onChange={(e) => setVariant3(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="false">Not Interactive</option>
                <option value="true">Interactive</option>
              </select>
            </div>
            <div style={{
              backgroundColor: styles.bgColor,
              color: styles.textColor,
              padding: styles.padding,
              borderRadius: '12px',
              border: styles.border,
              boxShadow: styles.boxShadow,
              cursor: styles.cursor,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!styles.isInteractive) return;
              if (styles.isOutlined) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.color = 'white';
              } else if (styles.isElevated) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(0,0,0,0.2)';
              } else {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (!styles.isInteractive) return;
              e.currentTarget.style.backgroundColor = styles.bgColor;
              e.currentTarget.style.color = styles.textColor;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = styles.boxShadow;
            }}>
              <h3 style={{ marginBottom: '8px' }}>Compound Variant Card</h3>
              <p>Variant: {variant1} | Size: {variant2} | Interactive: {variant3 === 'true' ? 'Yes' : 'No'}</p>
              {styles.isInteractive && (
                <p style={{ fontSize: '12px', marginTop: '8px' }}>✨ Hover to see compound effect!</p>
              )}
            </div>
          </div>
        );
      }
    },
    priority: {
      title: 'Variant Priority',
      description: 'Understanding how compound variants interact with regular variants',
      code: `import { recipe } from 'chaincss';

const button = recipe({
  base: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .block(),
  
  variants: {
    color: {
      primary: $()
        .backgroundColor('#3b82f6')
        .color('white')
        .block(),
      danger: $()
        .backgroundColor('#ef4444')
        .color('white')
        .block()
    },
    size: {
      small: $().padding('8px 16px').block(),
      large: $().padding('16px 32px').block()
    }
  },
  
  compoundVariants: [
    {
      variants: { color: 'primary', size: 'large' },
      style: $()
        .backgroundColor('#2563eb')
        .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
        .block()
    },
    {
      variants: { color: 'danger', size: 'large' },
      style: $()
        .backgroundColor('#dc2626')
        .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
        .block()
    }
  ],
  
  defaultVariants: {
    color: 'primary',
    size: 'small'
  }
});`,
      preview: () => {
        const colors = {
          primary: { regular: '#3b82f6', compound: '#2563eb' },
          danger: { regular: '#ef4444', compound: '#dc2626' }
        };
        
        const isLarge = variant2 === 'large';
        const colorKey = variant1;
        const bgColor = isLarge ? colors[colorKey]?.compound : colors[colorKey]?.regular;
        const padding = variant2 === 'large' ? '16px 32px' : '8px 16px';
        const fontSize = variant2 === 'large' ? '18px' : '14px';
        const boxShadow = isLarge ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none';
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <select value={variant1} onChange={(e) => setVariant1(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="primary">Primary</option>
                <option value="danger">Danger</option>
              </select>
              <select value={variant2} onChange={(e) => setVariant2(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
                <option value="small">Small</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button style={{
              backgroundColor: bgColor,
              color: 'white',
              padding: padding,
              fontSize: fontSize,
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: boxShadow,
              transition: 'all 0.2s'
            }}>
              {variant1} {variant2} Button
            </button>
            {variant2 === 'large' && (
              <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
                Compound variant active: {variant1} + large = darker color + shadow
              </p>
            )}
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Compound Variants</h1>
        <p className="docs-description">
          Create powerful component styles that respond to multiple variant combinations.
          Perfect for edge cases and special interactions.
        </p>
      </div>
      
      <h2>What are Compound Variants?</h2>
      <p>
        Compound variants allow you to apply styles when <strong>multiple variant conditions are met simultaneously</strong>.
        They're perfect for handling edge cases that require special styling.
      </p><br />
      
      <div className="tip">
        <strong>When to use Compound Variants:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Special interactions when multiple variants combine (e.g., outline + large)</li>
          <li>Edge cases that don't fit neatly into single variant dimensions</li>
          <li>Creating unique styles for specific combinations</li>
          <li>Overriding base variant styles for specific scenarios</li>
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
          Basic Compound
        </button>
        <button
          onClick={() => setActiveExample('multiple')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'multiple' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'multiple' ? '#eef2ff' : 'white',
            color: activeExample === 'multiple' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Multiple Variants
        </button>
        <button
          onClick={() => setActiveExample('priority')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'priority' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'priority' ? '#eef2ff' : 'white',
            color: activeExample === 'priority' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Variant Priority
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
      
      <h2>Compound Variant Syntax</h2>
      <CodeBlock language="javascript" code={`compoundVariants: [
  {
    variants: { 
      color: 'primary',
      size: 'large',
      state: 'active'
    },
    style: $()
      .backgroundColor('#2563eb')
      .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
      .transform('scale(1.02)')
      .block()
  },
  {
    variants: { color: 'outline', size: 'small' },
    style: $()
      .border('1px solid #3b82f6')
      .block()
  }
]`} />
      
      <div className="note">
        <strong>Important: Order Matters</strong>
        <p style={{ marginTop: '8px', marginBottom: 0 }}>
          Compound variants are applied in the order they appear in the array.
          Later compound variants can override styles from earlier ones.
          Place more specific combinations after general ones.
        </p>
      </div>
      
      <div className="note" style={{ backgroundColor: '#eff6ff', borderLeftColor: '#3b82f6' }}>
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use compound variants for edge cases, not every combination</li>
          <li>Keep compound variants focused on specific interactions</li>
          <li>Document complex compound variants with comments</li>
          <li>Test all variant combinations to ensure expected behavior</li>
          <li>Consider using TypeScript to enforce valid variant combinations</li>
        </ul>
      </div>
      
      {/*
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/variants" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Variants
        </a>
        <a href="/docs/default-variants" style={{ color: '#667eea', textDecoration: 'none' }}>
          Default Variants →
        </a>
      </div>*/}
    </>
  );
}