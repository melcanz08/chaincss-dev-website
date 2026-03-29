import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

// Extract preview components to avoid conditional hook calls
const RSCBasicsPreview = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '700',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        React Server Components
      </h1>
      <p>This page is rendered on the server. No client-side JavaScript needed!</p>
      <div className="tip" style={{ marginTop: '16px', textAlign: 'left' }}>
        No JavaScript bundle for these styles
      </div>
    </div>
  );
};

const ClientBoundaryPreview = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ marginBottom: '20px' }}>Server Component</h1>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
      >
        Clicked {count} times
      </button>
      <p style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
        Interactive client component inside server component
      </p>
    </div>
  );
};

const StaticExtractionPreview = () => {
  return (
    <div style={{
      fontFamily: 'system-ui',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <h2 style={{ marginBottom: '16px' }}>Static Style Extraction</h2>
        <p>These styles are extracted at build time:</p>
        <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
          <li>No runtime JavaScript for styles</li>
          <li>Styles are in the HTML from the start</li>
          <li>Perfect for SEO and performance</li>
          <li>Zero layout shift</li>
        </ul>
        <pre style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px',
          fontSize: '12px',
          overflowX: 'auto'
        }}>
          {`$ npx chaincss app/styles/layout.jcss app/styles/ --atomic
CSS generated at build time
No runtime overhead`}
        </pre>
      </div>
    </div>
  );
};

const DynamicImportsPreview = () => {
  const [show, setShow] = useState(false);
  
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ marginBottom: '20px' }}>Dynamic Imports</h1>
      <button
        onClick={() => setShow(true)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
      >
        Load Heavy Component
      </button>
      {show && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          <h3>Heavy Component</h3>
          <p>This component and its styles are lazy loaded</p>
        </div>
      )}
      <p style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
        Styles are only loaded when the component is needed
      </p>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default function RSCSupport() {
  const [activeExample, setActiveExample] = useState('basics');
  
  const examples = {
    basics: {
      title: 'RSC Basics',
      description: 'Understanding how ChainCSS works with React Server Components',
      code: `// app/layout.tsx - Server Component
import { $ } from 'chaincss';
import './styles/global.css';

// Server Component - styles are compiled at build time
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This runs on the server only
  // Styles are extracted and included in the HTML
  const layoutStyles = $()
    .fontFamily('system-ui')
    .backgroundColor('#f8fafc')
    .color('#1e293b')
    .minHeight('100vh')
    .block();
  
  return (
    <html lang="en" className={layoutStyles}>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx - Server Component
export default function HomePage() {
  // Server-only styles - no JavaScript sent to client
  const containerStyles = $()
    .maxWidth('1200px')
    .margin('0 auto')
    .padding('40px 20px')
    .block();
  
  const titleStyles = $()
    .fontSize('48px')
    .fontWeight('700')
    .marginBottom('16px')
    .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
    .backgroundClip('text')
    .color('transparent')
    .block();
  
  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>React Server Components</h1>
      <p>This page is rendered on the server. No client-side JavaScript needed!</p>
    </div>
  );
}`,
      previewComponent: RSCBasicsPreview
    },
    clientBoundary: {
      title: 'Client Boundaries',
      description: 'Using "use client" for interactive components',
      code: `// app/components/InteractiveButton.tsx
'use client';

import { useChainStyles } from 'chaincss/react';
import { useState } from 'react';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  const styles = useChainStyles({
    button: $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('12px 24px')
      .borderRadius('8px')
      .hover()
        .backgroundColor('#2563eb')
        .end()
      .transition('all 0.2s')
      .block()
  });
  
  return (
    <button className={styles.button} onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}

// app/page.tsx - Server Component
import { InteractiveButton } from './components/InteractiveButton';

export default function Page() {
  // Server-only styles
  const containerStyles = $()
    .textAlign('center')
    .padding('40px')
    .block();
  
  return (
    <div className={containerStyles}>
      <h1>Server Component</h1>
      <InteractiveButton /> {/* Client Component */}
    </div>
  );
}`,
      previewComponent: ClientBoundaryPreview
    },
    staticExtraction: {
      title: 'Static Style Extraction',
      description: 'Extract styles at build time for optimal performance',
      code: `// app/styles/layout.jcss
<@
// These styles are extracted at build time
const layoutStyles = $()
  .fontFamily('system-ui')
  .backgroundColor('#f8fafc')
  .color('#1e293b')
  .minHeight('100vh')
  .block();

const containerStyles = $()
  .maxWidth('1200px')
  .margin('0 auto')
  .padding('40px 20px')
  .block();

compile({ layoutStyles, containerStyles });
@>

// app/layout.tsx - Import compiled CSS
import './styles/layout.css'; // Generated by ChainCSS build

export default function RootLayout({ children }) {
  // No runtime style generation!
  return (
    <html lang="en">
      <body className="layoutStyles">
        <div className="containerStyles">
          {children}
        </div>
      </body>
    </html>
  );
}`,
      previewComponent: StaticExtractionPreview
    },
    dynamicImports: {
      title: 'Dynamic Imports',
      description: 'Lazy load client components with their styles',
      code: `// app/components/HeavyComponent.tsx
'use client';

import { useChainStyles } from 'chaincss/react';

export function HeavyComponent() {
  const styles = useChainStyles({
    container: $()
      .padding('20px')
      .backgroundColor('#f1f5f9')
      .borderRadius('12px')
      .block()
  });
  
  return (
    <div className={styles.container}>
      <h3>Heavy Component</h3>
      <p>This component and its styles are lazy loaded</p>
    </div>
  );
}

// app/page.tsx
import dynamic from 'next/dynamic';
import { useState } from 'react';

// Lazy load the component - its styles are loaded with it
const HeavyComponent = dynamic(
  () => import('./components/HeavyComponent').then(mod => mod.HeavyComponent),
  { 
    loading: () => <div>Loading...</div>,
    ssr: false // Optional: disable SSR for this component
  }
);

export default function Page() {
  const [show, setShow] = useState(false);
  
  const styles = $()
    .textAlign('center')
    .padding('40px')
    .block();
  
  return (
    <div className={styles}>
      <h1>Dynamic Imports</h1>
      <button onClick={() => setShow(true)}>
        Load Heavy Component
      </button>
      {show && <HeavyComponent />}
    </div>
  );
}`,
      previewComponent: DynamicImportsPreview
    }
  };
  
  const currentExample = examples[activeExample];
  const PreviewComponent = currentExample.previewComponent;
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">React Server Components</h1>
        <p className="docs-description">
          Use ChainCSS with React Server Components for optimal performance and zero-runtime styling.
        </p>
      </div>
      
      {/* What are RSC */}
      <h2>What are React Server Components?</h2>
      <p>
        React Server Components (RSC) allow you to render components on the server with zero client-side JavaScript.
        ChainCSS is the perfect companion for RSC because styles can be compiled at build time or rendered on the server.
      </p><br />
      
      <div className="tip">
        <strong>Key Benefits with ChainCSS:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Zero runtime CSS in server components</li>
          <li>Styles included in initial HTML (no FOUC)</li>
          <li>Perfect for static sites and SEO</li>
          <li>Seamless integration with client boundaries</li>
        </ul>
      </div>
      
      {/* Examples */}
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('basics')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'basics' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'basics' ? '#eef2ff' : 'white',
            color: activeExample === 'basics' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          RSC Basics
        </button>
        <button
          onClick={() => setActiveExample('clientBoundary')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'clientBoundary' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'clientBoundary' ? '#eef2ff' : 'white',
            color: activeExample === 'clientBoundary' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Client Boundaries
        </button>
        <button
          onClick={() => setActiveExample('staticExtraction')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'staticExtraction' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'staticExtraction' ? '#eef2ff' : 'white',
            color: activeExample === 'staticExtraction' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Static Extraction
        </button>
        <button
          onClick={() => setActiveExample('dynamicImports')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'dynamicImports' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'dynamicImports' ? '#eef2ff' : 'white',
            color: activeExample === 'dynamicImports' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Dynamic Imports
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
        
        {PreviewComponent && (
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Live Preview:</strong>
            <div style={{ marginTop: '12px' }}>
              <PreviewComponent />
            </div>
          </div>
        )}
      </div>
      
      {/* Architecture Diagram */}
      <h2>RSC + ChainCSS Architecture</h2>
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
┌─────────────────────────────────────────────────────────────────┐
│                    React Server Component                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Server Component (No JavaScript sent to client)            ││
│  │  • Styles generated at build time                           ││
│  │  • CSS in HTML response                                     ││
│  │  • Zero client JS                                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Client Boundary ('use client')                             ││
│  │  ┌───────────────────────────────────────────────────────┐  ││
│  │  │  Client Component                                     │  ││
│  │  │  • useChainStyles for dynamic styles                  │  ││
│  │  │  • Interactive features                               │  ││
│  │  │  • State and effects                                  │  ││
│  │  └───────────────────────────────────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Build-Time Compilation                                     ││
│  │  • npx chaincss src/styles/ dist/ --atomic                  ││
│  │  • Static CSS extracted                                     ││
│  │  • Optimized bundles                                        ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices for RSC + ChainCSS</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <strong>build-time compilation</strong> for server components</li>
          <li>Mark interactive components with <code className="inline-code">'use client'</code></li>
          <li>Extract static styles to <code className="inline-code">.jcss</code> files</li>
          <li>Use <code className="inline-code">dynamic()</code> for lazy loading heavy components</li>
          <li>Enable <code className="inline-code">--atomic</code> for optimal bundle size</li>
        </ul>
      </div>
      
      {/* Performance Comparison */}
      <h2>Performance Comparison</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Metric</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Runtime CSS-in-JS</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ChainCSS + RSC</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>Initial HTML Size</td>
              <td style={{ padding: '12px' }}>Contains only markup</td>
              <td style={{ padding: '12px' }}><strong>Includes CSS</strong> </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>JavaScript Bundle</td>
              <td style={{ padding: '12px' }}>Includes style injection code</td>
              <td style={{ padding: '12px' }}><strong>Zero runtime JS</strong> </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>FOUC (Flash of Unstyled Content)</td>
              <td style={{ padding: '12px' }}>Common issue</td>
              <td style={{ padding: '12px' }}><strong>No FOUC</strong> </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>SEO Impact</td>
              <td style={{ padding: '12px' }}>Lower (styles load after)</td>
              <td style={{ padding: '12px' }}><strong>Optimal</strong> </td>
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
        <a href="/docs/nextjs" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Next.js
        </a>
        <a href="/docs/headless" style={{ color: '#667eea', textDecoration: 'none' }}>
          Headless Components →
        </a>
      </div>*/}
    </>
  );
}