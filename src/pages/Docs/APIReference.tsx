import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function APIReference() {
  const [activeSection, setActiveSection] = useState('chain');
  
  const sections = {
    chain: {
      title: '$() - Chainable API',
      description: 'Creates a chainable style object',
      signature: '$() => ChainBuilder',
      examples: [
        {
          title: 'Basic Usage',
          code: `const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn');`,
          output: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
        },
        {
          title: 'With Hover',
          code: `const button = $()
  .backgroundColor('#3b82f6')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .block('.btn');`,
          output: `.btn {
  background-color: #3b82f6;
}
.btn:hover {
  background-color: #2563eb;
}`
        }
      ]
    },
    run: {
      title: 'run()',
      description: 'Generates CSS from style objects',
      signature: 'run(...styles: StyleDefinition[]) => string',
      examples: [
        {
          title: 'Single Style',
          code: `const button = $().color('blue').block('.btn');
run(button);`,
          output: `.btn { color: blue; }`
        },
        {
          title: 'Multiple Styles',
          code: `const btn = $().color('blue').block('.btn');
const card = $().border('1px solid').block('.card');
run(btn, card);`,
          output: `.btn { color: blue; }
.card { border: 1px solid; }`
        }
      ]
    },
    compile: {
      title: 'compile()',
      description: 'Compiles named style collections',
      signature: 'compile(styles: Record<string, StyleDefinition>) => void',
      examples: [
        {
          title: 'Named Collection',
          code: `const styles = {
  primary: $().backgroundColor('#3b82f6').block('.btn-primary'),
  secondary: $().backgroundColor('#6b7280').block('.btn-secondary')
};
compile(styles);`,
          output: `.btn-primary { background-color: #3b82f6; }
.btn-secondary { background-color: #6b7280; }`
        }
      ]
    },
    recipe: {
      title: 'recipe()',
      description: 'Creates variant-based components',
      signature: 'recipe<T>(options: RecipeOptions<T>) => Recipe<T>',
      examples: [
        {
          title: 'Basic Recipe',
          code: `const button = recipe({
  base: $().padding('12px 24px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('#3b82f6').color('white').block(),
      secondary: $().backgroundColor('#6b7280').color('white').block()
    },
    size: {
      small: $().padding('8px 16px').block(),
      large: $().padding('16px 32px').block()
    }
  },
  defaultVariants: { color: 'primary', size: 'small' }
});

const primaryBtn = button({ color: 'primary', size: 'large' });`,
          output: `.btn-primary { background-color: #3b82f6; color: white; padding: 16px 32px; }`
        }
      ]
    },
    tokens: {
      title: 'createTokens()',
      description: 'Creates design tokens',
      signature: 'createTokens(tokens: Tokens) => DesignTokens',
      examples: [
        {
          title: 'Create Tokens',
          code: `const tokens = createTokens({
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px'
  }
});`,
          output: `// Access with $colors.primary, $spacing.md`
        }
      ]
    },
    responsive: {
      title: 'responsive()',
      description: 'Creates responsive values',
      signature: 'responsive(values: Record<string, string>) => string',
      examples: [
        {
          title: 'Responsive Padding',
          code: `const padding = responsive({
  base: '16px',
  md: '24px',
  lg: '32px'
});

const card = $()
  .padding(padding)
  .block('.card');`,
          output: `.card {
  padding: 16px;
}
@media (min-width: 768px) {
  .card { padding: 24px; }
}
@media (min-width: 1024px) {
  .card { padding: 32px; }
}`
        }
      ]
    },
    theme: {
      title: 'Theme Helpers',
      description: 'Create and validate themes',
      signature: 'defineThemeContract(contract) => ThemeContract\ncreateTheme(contract, values) => DesignTokens\nvalidateTheme(contract, theme) => boolean',
      examples: [
        {
          title: 'Theme Contract',
          code: `const contract = defineThemeContract({
  colors: {
    primary: '',
    background: ''
  }
});

const lightTheme = createTheme(contract, {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff'
  }
});`,
          output: `// Validates that theme matches contract`
        }
      ]
    },
    react: {
      title: 'React Hooks',
      description: 'React integration hooks',
      signature: 'useChainStyles(styles, deps?, options?) => Record<string, string>\nuseDynamicChainStyles(styleFactory, deps?, options?) => Record<string, string>\nuseThemeChainStyles(styles, theme, deps?, options?) => Record<string, string>\ncx(...classes) => string',
      examples: [
        {
          title: 'useChainStyles',
          code: `function Button() {
  const styles = useChainStyles({
    btn: $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('12px 24px')
      .block()
  });
  return <button className={styles.btn}>Click</button>;
}`,
          output: `// Returns { btn: "chain-btn-123" }`
        }
      ]
    }
  };
  
  const currentSection = sections[activeSection];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">API Reference</h1>
        <p className="docs-description">
          Complete API reference for ChainCSS core functions, hooks, and utilities.
        </p>
      </div>
      
      {/* Sidebar Navigation */}
      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div className="docs-sidebar-section" style={{ position: 'sticky', top: '80px' }}>
            <div className="docs-sidebar-title">Core Functions</div>
            <button onClick={() => setActiveSection('chain')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'chain' ? '#667eea' : '#475569', fontWeight: activeSection === 'chain' ? '500' : 'normal' }}>$() - Chainable API</button>
            <button onClick={() => setActiveSection('run')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'run' ? '#667eea' : '#475569' }}>run()</button>
            <button onClick={() => setActiveSection('compile')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'compile' ? '#667eea' : '#475569' }}>compile()</button>
            <button onClick={() => setActiveSection('recipe')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'recipe' ? '#667eea' : '#475569' }}>recipe()</button>
            <div style={{ marginTop: '16px' }} />
            <div className="docs-sidebar-title">Design System</div>
            <button onClick={() => setActiveSection('tokens')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'tokens' ? '#667eea' : '#475569' }}>createTokens()</button>
            <button onClick={() => setActiveSection('responsive')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'responsive' ? '#667eea' : '#475569' }}>responsive()</button>
            <button onClick={() => setActiveSection('theme')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'theme' ? '#667eea' : '#475569' }}>Theme Helpers</button>
            <div style={{ marginTop: '16px' }} />
            <div className="docs-sidebar-title">React Integration</div>
            <button onClick={() => setActiveSection('react')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'react' ? '#667eea' : '#475569' }}>React Hooks</button>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
            {currentSection.title}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>
            {currentSection.description}
          </p>
          <CodeBlock language="javascript" code={`Signature: ${currentSection.signature}`} />
          
          {currentSection.examples.map((example, idx) => (
            <div key={idx} style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                {example.title}
              </h3>
              <CodeBlock language="javascript" code={example.code} />
              <div className="tip" style={{ marginTop: '12px' }}>
                <strong>Output:</strong>
                <CodeBlock language="css" code={example.output} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/typescript" style={{ color: '#667eea', textDecoration: 'none' }}>← TypeScript Types</a>
        <a href="/docs/cli-reference" style={{ color: '#667eea', textDecoration: 'none' }}>CLI Reference →</a>
      </div>*/}
    </>
  );
}