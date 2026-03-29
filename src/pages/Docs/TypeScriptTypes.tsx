import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function TypeScriptTypes() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Types',
      description: 'TypeScript definitions for ChainCSS core API',
      code: `// Types are automatically available with ChainCSS
import { $, run, compile, recipe } from 'chaincss';

// StyleDefinition type
const button: StyleDefinition = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .block('.btn');

// ChainBuilder type - all CSS properties as methods
const chain: ChainBuilder = $()
  .color('red')
  .padding('10px')
  .margin('20px');

// Recipe with typed variants
const buttonRecipe = recipe<{
  color: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
}>({
  base: $().padding('12px 24px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').block(),
      secondary: $().backgroundColor('#6b7280').block(),
      danger: $().backgroundColor('#ef4444').block()
    },
    size: {
      small: $().padding('8px 16px').block(),
      medium: $().padding('12px 24px').block(),
      large: $().padding('16px 32px').block()
    }
  }
});

// Type-safe usage
const primaryButton = buttonRecipe({ color: 'primary', size: 'large' });
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
// to parameter of type 'Partial<{ color: "primary" | "secondary" | "danger"; size: "small" | "medium" | "large"; }>'.
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
      code: `import { createTokens, DesignTokens } from 'chaincss';

// Define your token structure with TypeScript
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

// Create tokens with type safety
const tokens: DesignTokens<AppTokens> = createTokens({
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
const primary = tokens.get('colors.primary');     //  string
const spacing = tokens.get('spacing.md');          //  string
const invalid = tokens.get('colors.invalid');      //  TypeScript error

// TypeScript knows the shape of your tokens!
// Autocomplete works for all token paths`}
            </pre>
          </div>
        );
      }
    },
    recipe: {
      title: 'Recipe Types',
      description: 'Type-safe recipe variants with TypeScript',
      code: `import { recipe, Recipe } from 'chaincss';

// Define variant types
type ButtonVariants = {
  color: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  rounded: boolean;
};

// Create type-safe recipe
const button: Recipe<ButtonVariants> = recipe({
  base: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .fontWeight('600')
    .block(),
  
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').color('white').block(),
      secondary: $().backgroundColor('#6b7280').color('white').block(),
      danger: $().backgroundColor('#ef4444').color('white').block()
    },
    size: {
      small: $().padding('8px 16px').fontSize('14px').block(),
      medium: $().padding('12px 24px').fontSize('16px').block(),
      large: $().padding('16px 32px').fontSize('18px').block()
    },
    rounded: {
      true: $().borderRadius('9999px').block(),
      false: $().borderRadius('8px').block()
    }
  },
  
  defaultVariants: {
    color: 'primary',
    size: 'medium',
    rounded: false
  }
});

// Type-safe usage
const btn = button({ color: 'primary', size: 'large', rounded: true });
// All props are type-checked!`,
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
  color: 'primary',    //  "primary" | "secondary" | "danger"
  size: 'medium',      //  "small" | "medium" | "large"
  rounded: true        //  boolean
});

// Invalid variant causes error
button({ color: 'invalid' });
//  Type '"invalid"' is not assignable to type '"primary" | "secondary" | "danger"'`}
            </pre>
          </div>
        );
      }
    },
    hooks: {
      title: 'React Hook Types',
      description: 'Type-safe React hooks with ChainCSS',
      code: `import { useChainStyles } from 'chaincss/react';

// Define your styles with types
interface ButtonStyles {
  button: string;
  icon: string;
  label: string;
}

function Button({ variant }: { variant: 'primary' | 'secondary' }) {
  const styles = useChainStyles<ButtonStyles>({
    button: $()
      .backgroundColor(variant === 'primary' ? '#3b82f6' : '#6b7280')
      .color('white')
      .padding('12px 24px')
      .borderRadius('8px')
      .block(),
    icon: $()
      .marginRight('8px')
      .block(),
    label: $()
      .fontWeight('600')
      .block()
  });
  
  return (
    <button className={styles.button}>
      <span className={styles.icon}>✓</span>
      <span className={styles.label}>Click</span>
    </button>
  );
}

// styles.button, styles.icon, styles.label are all typed as string`,
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

styles.button  //  string
styles.icon    //  string
styles.label   //  string
// styles.invalid //  Property 'invalid' does not exist on type 'ButtonStyles'`}
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
      
      {/* Installation */}
      <h2>Installation</h2>
      <p>TypeScript types are included automatically with ChainCSS. No additional packages needed.</p>
      <CodeBlock language="bash" code={`npm install chaincss
# TypeScript types are automatically available`} />
      
      {/* TypeScript Configuration */}
      <h2>TypeScript Configuration</h2>
      <p>Make sure your <code className="inline-code">tsconfig.json</code> has these settings:</p>
      <CodeBlock language="json" code={`{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-jsx"
  }
}`} />
      
      {/* Examples */}
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
      
      {/* Type Definitions Reference */}
      <h2>Type Definitions Reference</h2>
      
      <h3>Core Types</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                  </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">StyleDefinition</code></td>
              <td style={{ padding: '12px' }}>Object returned by <code className="inline-code">.block()</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">ChainBuilder</code></td>
              <td style={{ padding: '12px' }}>Type for the chainable <code className="inline-code">$()</code> API</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">Recipe&lt;T&gt;</code></td>
              <td style={{ padding: '12px' }}>Type-safe recipe with variants</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">DesignTokens&lt;T&gt;</code></td>
              <td style={{ padding: '12px' }}>Type-safe design tokens</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/theme-contracts" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Theme Contracts
        </a>
        <a href="/docs/api" style={{ color: '#667eea', textDecoration: 'none' }}>
          API Reference →
        </a>
      </div>*/}
    </>
  );
}