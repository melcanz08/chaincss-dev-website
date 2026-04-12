import CodeBlock from '../../components/CodeBlock';

export default function GettingStarted() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Introduction</h1>

        <p className="docs-description">
          ChainCSS is a JavaScript-native styling engine for the modern web.
          Write styles with the full power of JavaScript. Execute them at build time or runtime.
          Its not just another CSS-in-JS library. It's a complete styling platform that
        treats styles as first-class JavaScript citizens. Instead of writing static CSS or
        template literals, you write JavaScript that describes your styles. ChainCSS makes styling programmable and dynamic.
        </p>
        
      </div>
  
      {/* The Core Idea */}
      <h2>The Core Idea</h2>
      <CodeBlock language="javascript" code={`// This IS JavaScript - not a template literal, not a preprocessor
import {$} from 'chaincss';
const theme = getSystemTheme();
const button = $
  .bg(theme === 'dark' ? '#0f172a' : '#ffffff') //backgroundColor
  .c(theme === 'dark' ? '#f1f5f9' : '#1e293b')  //color
  .p(theme === 'mobile' ? '8px' : '16px')       //padding
  .hover()
    .transform('scale(1.05)')
    .end()
  .$el('.btn');`} />
      <p>
        This code <strong>executes</strong> at build time or runtime. The JavaScript runs,
        computes values, and generates the final CSS. No static analysis. No limitations.
        Just pure JavaScript power.
      </p><br />
      
      {/* What Makes ChainCSS Different */}
      <h2>What Makes ChainCSS Different?</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Dual Mode</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            <strong>Build-time</strong> compilation for zero-runtime CSS.<br />
            <strong>Runtime</strong> execution for dynamic styles.<br />
            Choose what fits your project.
          </p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Chainable API</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Fluent, intuitive syntax. Each method is a CSS property. 
            Chain them together, add hover states, nest selectors.
          </p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Atomic CSS</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Automatic optimization. Properties used multiple times become 
            reusable atomic utilities. Up to 75% CSS reduction.
          </p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Design Tokens</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Create reusable design tokens with <code className="inline-code">createTokens()</code>. 
            Theme switching, built-in tokens, CSS variables.
          </p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Component System</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            <code className="inline-code">recipe()</code> system for variants, compound variants, 
            and component libraries. Build anything from buttons to complex design systems.
          </p>
        </div>
        
        <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px' }}></div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Framework Agnostic</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            React hooks, Vue composables, Vanilla JS. Works with Next.js, Vite, Webpack.
            Plugins for every major build tool.
          </p>
        </div>
      </div>
      
      {/* How It Works */}
      <h2>How It Works</h2>
      
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '32px',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre' }}>
{`
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│                    ┌─────────────────────────────┐                         │
│                    │     SAME CHAIN API          │                         │                                                                         
│                    └─────────────┬───────────────┘                         │
│                                  │                                         │
│                ┌─────────────────┴─────────────────┐                       │
│                │                                   │                       │
│                ▼                                   ▼                       │
│    ┌───────────────────────┐           ┌───────────────────────┐           │
│    │      BUILD MODE       │           │     RUNTIME MODE      │           │
│    │      (Static)         │           │      (Dynamic)        │           │
│    └───────────┬───────────┘           └───────────┬───────────┘           │
│                │                                   │                       │
│                ▼                                   ▼                       │
│    ┌───────────────────────┐           ┌───────────────────────┐           │
│    │     global.css        │           │     <style> tag       │           │
│    │    (File on disk)     │           │   (Injected to DOM)   │           │
│    ├───────────────────────┤           ├───────────────────────┤           │
│    │                       │           │                       │           │
│    │  • Loads once         │           │  • Can change anytime │           │
│    │  • No runtime cost    │           │  • Hot reload works   │           │
│    │  • Static styles      │           │  • Dynamic styles     │           │
│    │  • nav, container,    │           │  • links, buttons,    │           │
│    │    logo               │           │    active states      │           │
│    │                       │           │                       │           │
│    └───────────────────────┘           └───────────────────────┘           │
│                │                                   │                       │
│                └─────────────────┬─────────────────┘                       │
│                                  │                                         │
│                                  ▼                                         │
│                    ┌─────────────────────────────┐                         │
│                    │      BROWSER RENDERS        │                         │
│                    │   Both CSS sources apply    │                         │
│                    └─────────────────────────────┘                         │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>
      
      {/* What You Can Build */}
      <h2>What You Can Build</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Dynamic Theming</div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Switch themes at runtime. Respect user preferences.</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Design Systems</div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Programmatic design tokens that compute themselves.</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Component Libraries</div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Build Chain-UI-React or your own component library.</p>
        </div>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>CSS Animations</div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Programmatic keyframes and animations.</p>
        </div>
      </div>
      
      {/* Quick Comparison */}
      <h2>ChainCSS vs Traditional CSS-in-JS</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Traditional CSS-in-JS</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ChainCSS</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Execution</td>
              <td style={{ padding: '12px' }}>Parsed at runtime</td>
              <td style={{ padding: '12px' }}><strong>Executes at build or runtime</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Dynamic Logic</td>
              <td style={{ padding: '12px' }}>Limited to props</td>
              <td style={{ padding: '12px' }}><strong>Full JavaScript power</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Bundle Size</td>
              <td style={{ padding: '12px' }}>Runtime + CSS</td>
              <td style={{ padding: '12px' }}><strong>Zero-runtime option</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Atomic CSS</td>
              <td style={{ padding: '12px' }}>Manual or not available</td>
              <td style={{ padding: '12px' }}><strong>Automatic optimization</strong></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Framework Support</td>
              <td style={{ padding: '12px' }}>React-focused</td>
              <td style={{ padding: '12px' }}><strong>React, Vue, Vanilla, Next.js</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Get Started */}
      <div className="note" style={{ backgroundColor: '#eff6ff', borderLeftColor: '#3b82f6' }}>
        <strong>Ready to start?</strong>
        <p style={{ marginTop: '8px', marginBottom: 0 }}>
          Head to <a href="/docs/installation">Installation</a> to get ChainCSS in your project,
          or jump to the <a href="/docs/quick-start">Quick Start</a> for a 5-minute tutorial.
        </p>
      </div>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <span></span>
        <a href="/docs/installation" style={{ color: '#667eea', textDecoration: 'none' }}>Installation →</a>
      </div>*/}
    </>
  );
}