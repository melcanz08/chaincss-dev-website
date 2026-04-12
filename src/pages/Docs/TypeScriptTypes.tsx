import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function TypeScriptTypes() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Types',
      description: 'TypeScript definitions for ChainCSS core API',
      code: `// Types are automatically available with ChainCSS
import { $ } from 'chaincss';

// Style definition with shorthands
export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .$el('.btn');

// Chain builder - all CSS properties as methods
export const container = $
  .maxW('1200px')
  .m('0 auto')
  .p('20px')
  .$el('.container');

// Recipe with typed variants
import { recipe } from 'chaincss';

type ButtonVariants = {
  color: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
};

const buttonRecipe = recipe<ButtonVariants>({
  base: $.p('12px 24px').rounded('8px').$el(),
  variants: {
    color: {
      primary: $.bg('#3b82f6').c('white').$el(),
      secondary: $.bg('#6b7280').c('white').$el(),
      danger: $.bg('#ef4444').c('white').$el()
    },
    size: {
      small: $.p('8px 16px').textSize('14px').$el(),
      medium: $.p('12px 24px').textSize('16px').$el(),
      large: $.p('16px 32px').textSize('18px').$el()
    }
  }
});

// Type-safe usage
const primaryBtn = buttonRecipe({ color: 'primary', size: 'large' });
// const invalid = buttonRecipe({ color: 'invalid' }); // TypeScript error!`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#1e293b', 
          color: '#e2e8f0', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`// TypeScript error when using invalid variant
const invalid = buttonRecipe({ color: 'invalid' });
// Argument of type '{ color: string; }' is not assignable
// to parameter of type 'Partial<ButtonVariants>'.
//   Types of property 'color' are incompatible.
//     Type 'string' is not assignable to type '"primary" | "secondary" | "danger"'.

TypeScript catches errors at compile time!`}
          </pre>
        </div>
      )
    },
    tokens: {
      title: 'Design Token Types',
      description: 'Type-safe design tokens with TypeScript',
      code: `import { createTokens } from 'chaincss';

interface AppTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
}

const tokens = createTokens<AppTokens>({
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#1e293b'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});

// Type-safe token access
const primaryColor = tokens.get('colors.primary'); // string
const spacing = tokens.get('spacing.md'); // string
// const invalid = tokens.get('colors.invalid'); // TypeScript error!`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#1e293b', 
            color: '#e2e8f0', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`// Token access with type safety
const primary = tokens.get('colors.primary');     // string
const spacing = tokens.get('spacing.md');          // string
const invalid = tokens.get('colors.invalid');      // TypeScript error

// TypeScript knows the shape of your tokens
// Autocomplete works for all token paths`}
            </pre>
          </div>
        );
      }
    },
    recipe: {
      title: 'Recipe Types',
      description: 'Type-safe recipe variants with TypeScript',
      code: `import { recipe } from 'chaincss';

type ButtonVariants = {
  color: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  rounded: boolean;
};

const button = recipe<ButtonVariants>({
  base: $
    .p('12px 24px')
    .rounded('8px')
    .weight('600')
    .$el(),
  
  variants: {
    color: {
      primary: $.bg('#3b82f6').c('white').$el(),
      secondary: $.bg('#6b7280').c('white').$el(),
      danger: $.bg('#ef4444').c('white').$el()
    },
    size: {
      small: $.p('8px 16px').textSize('14px').$el(),
      medium: $.p('12px 24px').textSize('16px').$el(),
      large: $.p('16px 32px').textSize('18px').$el()
    },
    rounded: {
      true: $.rounded('9999px').$el(),
      false: $.rounded('8px').$el()
    }
  },
  
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    rounded: false
  }
});

// Type-safe usage
const btn = button({ color: 'primary', size: 'large', rounded: true });`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#1e293b', 
            color: '#e2e8f0', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`// TypeScript provides autocomplete for variants
button({
  color: 'primary',    // "primary" | "secondary" | "danger"
  size: 'medium',      // "small" | "medium" | "large"
  rounded: true        // boolean
});

// Invalid variant causes error
button({ color: 'invalid' });
// Type '"invalid"' is not assignable to type '"primary" | "secondary" | "danger"'`}
            </pre>
          </div>
        );
      }
    },
    hooks: {
      title: 'React Hook Types',
      description: 'Type-safe React hooks with ChainCSS',
      code: `import { useChainStyles } from 'chaincss/runtime';

interface ButtonStyles {
  button: string;
  icon: string;
  label: string;
}

function Button({ variant }: { variant: 'primary' | 'secondary' }) {
  const styles = useChainStyles<ButtonStyles>({
    button: {
      backgroundColor: variant === 'primary' ? '#3b82f6' : '#6b7280',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
      border: 'none',
      hover: {
        backgroundColor: variant === 'primary' ? '#2563eb' : '#4b5563'
      }
    },
    icon: {
      marginRight: '8px'
    },
    label: {
      fontWeight: '600'
    }
  });
  
  return (
    <button className={styles.button}>
      <span className={styles.icon}>✓</span>
      <span className={styles.label}>Click</span>
    </button>
  );
}`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#1e293b', 
            color: '#e2e8f0', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`// TypeScript knows all class names
const styles = useChainStyles<ButtonStyles>({...});

styles.button  // string
styles.icon    // string
styles.label   // string
// styles.invalid // Property 'invalid' does not exist on type 'ButtonStyles'`}
            </pre>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">TypeScript Types</h1>
        <p className="docs-description">
          ChainCSS comes with full TypeScript support. Get autocomplete, type checking,
          and IntelliSense for all APIs.
        </p>
      </div>
      
      <h2>Installation</h2>
      <p>TypeScript types are included automatically with ChainCSS. No additional packages needed.</p>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <h2>TypeScript Configuration</h2>
      <p>Make sure your <code className="inline-code">tsconfig.json</code> has these settings:</p>
      <CodeBlock language="json" code={`{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx",
    "strict": true
  }
}`} />
      
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
          Basic Types
        </button>
        <button
          onClick={() => setActiveExample('tokens')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'tokens' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'tokens' ? '#eef2ff' : 'white',
            color: activeExample === 'tokens' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Design Tokens
        </button>
        <button
          onClick={() => setActiveExample('recipe')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'recipe' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'recipe' ? '#eef2ff' : 'white',
            color: activeExample === 'recipe' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Recipe Types
        </button>
        <button
          onClick={() => setActiveExample('hooks')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'hooks' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'hooks' ? '#eef2ff' : 'white',
            color: activeExample === 'hooks' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          React Hooks
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="typescript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      <h2>Type Definitions Reference</h2>
      
      <h3>Core Types</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">StyleDefinition</code></div>
            <div style={{ padding: '12px' }}>Object returned by <code className="inline-code">.$el()</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">Recipe&lt;T&gt;</code></div>
            <div style={{ padding: '12px' }}>Type-safe recipe with variants</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">DesignTokens&lt;T&gt;</code></div>
            <div style={{ padding: '12px' }}>Type-safe design tokens</div>
          </div>
        </div>
      </div>
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Define interfaces for your design tokens</li>
          <li>Use generic types with <code className="inline-code">recipe&lt;T&gt;</code> for variant type safety</li>
          <li>Type your <code className="inline-code">useChainStyles</code> calls for better IntelliSense</li>
          <li>Enable <code className="inline-code">strict</code> mode in tsconfig.json for maximum type safety</li>
        </ul>
      </div>
    </>
  );
}