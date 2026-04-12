import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function NextJSPlugin() {
  const [activeExample, setActiveExample] = useState('app-router');
  
  const examples = {
    'app-router': {
      title: 'App Router (Next.js 13+)',
      description: 'Use ChainCSS with Next.js App Router and Server Components',
      code: `// app/layout.tsx
import { ChainCSSGlobal } from 'chaincss/runtime';
import './global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChainCSSGlobal styles={{
          body: {
            margin: '0',
            padding: '0',
            fontFamily: 'system-ui',
            backgroundColor: '#f8fafc',
            color: '#1e293b'
          }
        }} />
        {children}
      </body>
    </html>
  );
}

// app/components/Button.tsx (Client Component)
'use client';

import { useChainStyles } from 'chaincss/runtime';

export function Button({ children, variant = 'primary' }) {
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
  
  return <button className={styles.button}>{children}</button>;
}

// app/page.tsx (Server Component)
import { Button } from './components/Button';

export default function Page() {
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center'
  };
  
  return (
    <div style={containerStyles}>
      <h1>Next.js + ChainCSS</h1>
      <Button>Click Me</Button>
    </div>
  );
}`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`$ npm run dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Compiled successfully
 ✓ ChainCSS styles injected
 ✓ Ready in 2.3s`}
          </pre>
        </div>
      )
    },
    'pages-router': {
      title: 'Pages Router (Next.js 12)',
      description: 'Use ChainCSS with Next.js Pages Router',
      code: `// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useChainStyles } from 'chaincss/runtime';
import './styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const styles = useChainStyles({
    app: { minHeight: '100vh' }
  });
  
  return (
    <div className={styles.app}>
      <Component {...pageProps} />
    </div>
  );
}

// pages/index.tsx
import { useChainStyles } from 'chaincss/runtime';

export default function Home() {
  const styles = useChainStyles({
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      textAlign: 'center'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      hover: { backgroundColor: '#2563eb' }
    }
  });
  
  return (
    <div className={styles.container}>
      <h1>Next.js + ChainCSS</h1>
      <button className={styles.button}>Click Me</button>
    </div>
  );
}`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`$ npm run build

  ▲ Next.js 12.3.0
  - Static HTML exported

 ✓ Compiled successfully
 ✓ ChainCSS CSS extracted
 ✓ Ready for production`}
          </pre>
        </div>
      )
    },
    'build-time': {
      title: 'Build-Time Compilation',
      description: 'Zero-runtime CSS for optimal performance',
      code: `// src/components/Button/styles/button.chain.js
import { $ } from 'chaincss';

export const button = $
  .bg('#3b82f6')
  .c('white')
  .p('12px 24px')
  .rounded('8px')
  .hover()
    .bg('#2563eb')
  .end()
  .transition('all 0.2s')
  .$el('.btn');

// app/components/Button.tsx
import { button } from './styles/button.class.js';
import './styles/button.css';

export function Button({ children }) {
  return <button className={button}>{children}</button>;
}

// package.json
{
  "scripts": {
    "build:css": "chaincss build",
    "build": "npm run build:css && next build",
    "dev": "npm run build:css && next dev"
  }
}`,
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
{`$ npm run build

> chaincss build
✓ Generated 1 component CSS file(s)
✓ Generated global.css (minified)

> next build
✓ Compiled successfully
✓ CSS extracted to .next/static/css

Bundle Analysis:
├── First Load JS: 85.2 kB
├── CSS: 12.4 kB (minified)
└── Runtime: 0 kB (zero-runtime CSS!)`}
          </pre>
        </div>
      )
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Next.js Integration</h1>
        <p className="docs-description">
          ChainCSS works seamlessly with Next.js. No special plugin required - just use React runtime mode or build-time compilation.
        </p>
      </div>
      
      <div className="tip" style={{ marginBottom: '24px' }}>
        <strong>Note:</strong> ChainCSS v2 does not include a separate Next.js plugin because it works perfectly with React hooks. For optimal performance, use build-time compilation with <code className="inline-code">npx chaincss build</code>.
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('app-router')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'app-router' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'app-router' ? '#eef2ff' : 'white',
            color: activeExample === 'app-router' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          App Router
        </button>
        <button
          onClick={() => setActiveExample('pages-router')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'pages-router' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'pages-router' ? '#eef2ff' : 'white',
            color: activeExample === 'pages-router' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Pages Router
        </button>
        <button
          onClick={() => setActiveExample('build-time')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'build-time' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'build-time' ? '#eef2ff' : 'white',
            color: activeExample === 'build-time' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Build-Time Compilation
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
      
      <h2>Package.json Scripts</h2>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`{
  "scripts": {
    "dev": "next dev",
    "build": "npm run css:build && next build",
    "start": "next start",
    "css:build": "chaincss build",
    "css:watch": "chaincss watch"
  }
}`}
          </pre>
        </div>
      </div>
      
      <h2>Configuration Options</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">'use client'</code></div>
            <div style={{ padding: '12px' }}>directive</div>
            <div style={{ padding: '12px' }}>Required for components using useChainStyles in App Router</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">npx chaincss build</code></div>
            <div style={{ padding: '12px' }}>command</div>
            <div style={{ padding: '12px' }}>Generate CSS files for zero-runtime styles</div>
          </div>
        </div>
      </div>
      
      <div className="note">
        <strong>Best Practices for Next.js</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">'use client'</code> directive for components with <code className="inline-code">useChainStyles</code></li>
          <li>For static styles, use build-time compilation with <code className="inline-code">.chain.js</code> files</li>
          <li>Add <code className="inline-code">css:build</code> to your build pipeline</li>
          <li>Enable atomic CSS in production for smaller bundles</li>
          <li>Add <code className="inline-code">src/**/*.class.js</code> and <code className="inline-code">src/**/*.css</code> to .gitignore</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Hydration errors?</strong> Ensure consistent styles between server and client</li>
          <li><strong>CSS not loading?</strong> Import generated CSS files in your layout or component</li>
          <li><strong>Styles flickering?</strong> Use build-time compilation instead of runtime</li>
          <li><strong>Fast Refresh not working?</strong> Run <code className="inline-code">chaincss watch</code> alongside next dev</li>
        </ul>
      </div>
    </>
  );
}