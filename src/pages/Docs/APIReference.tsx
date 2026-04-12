import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function APIReference() {
  const [activeSection, setActiveSection] = useState('chain');
  
  const sections = {
    chain: {
      title: '$ - Chainable API',
      description: 'Creates a chainable style object',
      signature: '$ => ChainBuilder',
      examples: [
        {
          title: 'Basic Usage with Shorthands',
          code: `import { $ } from 'chaincss';

export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .$el('.btn');`,
          output: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
        },
        {
          title: 'With Hover',
          code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .hover()
    .bg('#2563eb')
  .end()
  .$el('.btn');`,
          output: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
.btn:hover {
  background-color: #2563eb;
}`
        },
        {
          title: 'With Responsive Breakpoints',
          code: `export const title = $
  .textSize('3rem')
  .mobile((css) => css.textSize('1.5rem'))
  .tablet((css) => css.textSize('2rem'))
  .desktop((css) => css.textSize('2.5rem'))
  .$el('.title');`,
          output: `.title {
  font-size: 3rem;
}
@media (max-width: 768px) {
  .title { font-size: 1.5rem; }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .title { font-size: 2rem; }
}
@media (min-width: 1025px) {
  .title { font-size: 2.5rem; }
}`
        }
      ]
    },
    el: {
      title: '.$el()',
      description: 'Terminates the chain and assigns styles to selectors',
      signature: '.$el(...selectors: string[]) => StyleDefinition',
      examples: [
        {
          title: 'Single Selector',
          code: `export const button = $
  .bg('#3b82f6')
  .c('white')
  .$el('.btn');`,
          output: `.btn { background-color: #3b82f6; color: white; }`
        },
        {
          title: 'Multiple Selectors',
          code: `export const element = $
  .c('red')
  .$el('.btn', '.button', '[type="button"]');`,
          output: `.btn, .button, [type="button"] { color: red; }`
        }
      ]
    },
    hover: {
      title: '.hover()',
      description: 'Creates hover state styles',
      signature: '.hover() => HoverBuilder',
      examples: [
        {
          title: 'Basic Hover',
          code: `export const button = $
  .bg('#3b82f6')
  .hover()
    .bg('#2563eb')
  .end()
  .$el('.btn');`,
          output: `.btn { background-color: #3b82f6; }
.btn:hover { background-color: #2563eb; }`
        }
      ]
    },
    media: {
      title: '.media()',
      description: 'Creates media query styles',
      signature: '.media(query: string, callback: (css: ChainBuilder) => void) => ChainBuilder',
      examples: [
        {
          title: 'Responsive Design',
          code: `export const container = $
  .w('100%')
  .media('(min-width: 768px)', (css) => {
    css.w('50%')
  })
  .media('(min-width: 1024px)', (css) => {
    css.w('33.333%')
  })
  .$el('.container');`,
          output: `.container { width: 100%; }
@media (min-width: 768px) {
  .container { width: 50%; }
}
@media (min-width: 1024px) {
  .container { width: 33.333%; }
}`
        }
      ]
    },
    keyframes: {
      title: '.keyframes()',
      description: 'Defines CSS keyframe animations',
      signature: '.keyframes(name: string, frames: Record<string, StyleDefinition>) => ChainBuilder',
      examples: [
        {
          title: 'Basic Animation',
          code: `export const slideIn = $
  .keyframes('slideIn', {
    '0%': { opacity: 0, transform: 'translateX(-50px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' }
  })
  .$el();

export const animated = $
  .animation('slideIn 0.5s ease-out')
  .$el('.animated');`,
          output: `@keyframes slideIn {
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
}
.animated { animation: slideIn 0.5s ease-out; }`
        }
      ]
    },
    recipe: {
      title: 'recipe()',
      description: 'Creates variant-based components',
      signature: 'recipe<T>(options: RecipeOptions<T>) => Recipe<T>',
      examples: [
        {
          title: 'Basic Recipe with Shorthands',
          code: `import { recipe } from 'chaincss';

type ButtonVariants = {
  color: 'primary' | 'secondary';
  size: 'small' | 'large';
};

export const button = recipe<ButtonVariants>({
  base: $
    .p('12px 24px')
    .rounded('8px')
    .weight('600')
    .$el(),
  variants: {
    color: {
      primary: $.bg('#3b82f6').c('white').$el(),
      secondary: $.bg('#6b7280').c('white').$el()
    },
    size: {
      small: $.p('8px 16px').textSize('14px').$el(),
      large: $.p('16px 32px').textSize('18px').$el()
    }
  },
  defaultVariants: { color: 'primary', size: 'small' }
});

const primaryBtn = button({ color: 'primary', size: 'large' });`,
          output: `.btn { padding: 12px 24px; border-radius: 8px; font-weight: 600; }
.btn-primary { background-color: #3b82f6; color: white; }
.btn-large { padding: 16px 32px; font-size: 18px; }`
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
          code: `import { createTokens } from 'chaincss';

export const tokens = createTokens({
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

export const card = $
  .bg('$colors.background')
  .c('$colors.text')
  .p('$spacing.md')
  .$el('.card');`,
          output: `.card {
  background-color: #ffffff;
  color: #1e293b;
  padding: 16px;
}`
        }
      ]
    },
    react: {
      title: 'React Hooks',
      description: 'React integration hooks',
      signature: 'useChainStyles(styles, deps?, options?) => Record<string, string>',
      examples: [
        {
          title: 'useChainStyles',
          code: `import { useChainStyles } from 'chaincss/runtime';

function Button({ variant = 'primary' }) {
  const styles = useChainStyles({
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
    }
  });
  
  return <button className={styles.button}>Click Me</button>;
}`,
          output: `// Returns { button: "chain-button-abc123" }`
        }
      ]
    },
    cx: {
      title: 'cx()',
      description: 'Utility for conditional class names',
      signature: 'cx(...classes: (string | undefined | null | false)[]) => string',
      examples: [
        {
          title: 'Conditional Classes',
          code: `import { cx } from 'chaincss/runtime';

const isActive = true;
const isDisabled = false;

const className = cx(
  'btn',
  isActive && 'btn-active',
  isDisabled && 'btn-disabled'
);

console.log(className); // "btn btn-active"`,
          output: `btn btn-active`
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
      
      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '12px' }}>Core Functions</div>
              <button onClick={() => setActiveSection('chain')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'chain' ? '#667eea' : '#475569', fontWeight: activeSection === 'chain' ? '500' : 'normal', borderRadius: '6px' }}>$ - Chainable API</button>
              <button onClick={() => setActiveSection('el')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'el' ? '#667eea' : '#475569', borderRadius: '6px' }}>.$el()</button>
              <button onClick={() => setActiveSection('hover')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'hover' ? '#667eea' : '#475569', borderRadius: '6px' }}>.hover()</button>
              <button onClick={() => setActiveSection('media')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'media' ? '#667eea' : '#475569', borderRadius: '6px' }}>.media()</button>
              <button onClick={() => setActiveSection('keyframes')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'keyframes' ? '#667eea' : '#475569', borderRadius: '6px' }}>.keyframes()</button>
              <button onClick={() => setActiveSection('recipe')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'recipe' ? '#667eea' : '#475569', borderRadius: '6px' }}>recipe()</button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '12px' }}>Design System</div>
              <button onClick={() => setActiveSection('tokens')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'tokens' ? '#667eea' : '#475569', borderRadius: '6px' }}>createTokens()</button>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', marginBottom: '12px' }}>React Integration</div>
              <button onClick={() => setActiveSection('react')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'react' ? '#667eea' : '#475569', borderRadius: '6px' }}>useChainStyles()</button>
              <button onClick={() => setActiveSection('cx')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeSection === 'cx' ? '#667eea' : '#475569', borderRadius: '6px' }}>cx()</button>
            </div>
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
    </>
  );
}