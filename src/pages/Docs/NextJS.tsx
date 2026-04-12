import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

const AppRouterPreview = () => {
  const [variant, setVariant] = useState('primary');
  
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <select 
          value={variant} 
          onChange={(e) => setVariant(e.target.value)}
          style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
        >
          <option value="primary">Primary Button</option>
          <option value="secondary">Secondary Button</option>
        </select>
      </div>
      <button style={{
        backgroundColor: variant === 'primary' ? '#3b82f6' : '#6b7280',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = variant === 'primary' ? '#2563eb' : '#4b5563';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = variant === 'primary' ? '#3b82f6' : '#6b7280';
      }}>
        {variant === 'primary' ? 'Primary' : 'Secondary'} Button
      </button>
      <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
        Uses React hooks from chaincss/runtime with 'use client' directive
      </p>
    </div>
  );
};

export default function NextJS() {
  const [activeExample, setActiveExample] = useState('setup');
  
  const examples = {
    setup: {
      title: 'Next.js Setup',
      description: 'Configure ChainCSS with Next.js',
      code: `// Install ChainCSS
npm install chaincss

// Use React hooks from chaincss/runtime
import { useChainStyles } from 'chaincss/runtime';

// Build your styles (compile-time)
npx chaincss build`,
      steps: [
        'Install ChainCSS: npm install chaincss',
        'Use React hooks from chaincss/runtime in your components',
        'Run npx chaincss build to generate CSS'
      ]
    },
    appRouter: {
      title: 'App Router (React Server Components)',
      description: 'Use ChainCSS with Next.js App Router',
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
}`,
      note: 'Uses React hooks from chaincss/runtime with "use client" directive'
    },
    buildTime: {
      title: 'Build-Time Compilation',
      description: 'Extract styles at build time for optimal performance',
      code: `// src/components/Button/styles/button.chain.js
import { $ } from 'chaincss';

export const button = $
  .p('12px 24px')
  .rounded('8px')
  .bg('#3b82f6')
  .c('white')
  .hover()
    .bg('#2563eb')
  .end()
  .$el('.btn');

// app/components/Button.tsx
import { button } from '@/components/Button/styles/button.class.js';
import '@/components/Button/styles/button.css';

export function Button({ children }) {
  return <button className={button}>{children}</button>;
}`,
      benefits: [
        'Zero runtime CSS - styles extracted during build',
        'Perfect for Server Components',
        'Smaller bundle size',
        'No FOUC (Flash of Unstyled Content)'
      ]
    },
    pagesRouter: {
      title: 'Pages Router',
      description: 'Use ChainCSS with Next.js Pages Router',
      code: `// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useChainStyles } from 'chaincss/runtime';
import '../styles/global.css';

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
      padding: '40px 20px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '700',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      color: 'transparent'
    }
  });
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js with ChainCSS</h1>
    </div>
  );
}`
    },
    middleware: {
      title: 'Middleware & Theme Detection',
      description: 'Detect user preferences in middleware for server-side theming',
      code: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme')?.value || 'light';
  
  const response = NextResponse.next();
  response.headers.set('x-theme', theme);
  
  return response;
}

// app/layout.tsx
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const theme = headers().get('x-theme') || 'light';
  
  const styles = {
    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
    color: theme === 'dark' ? '#f1f5f9' : '#1e293b'
  };
  
  return (
    <html lang="en" style={styles}>
      <body>{children}</body>
    </html>
  );
}`
    },
    ssr: {
      title: 'SSR & SSG',
      description: 'Server-side rendering and static generation with ChainCSS',
      code: `// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) notFound();
  
  const styles = {
    article: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    title: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '24px'
    },
    content: {
      fontSize: '18px',
      lineHeight: '1.7',
      color: '#334155'
    }
  };
  
  return (
    <article style={styles.article}>
      <h1 style={styles.title}>{post.title}</h1>
      <div style={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Next.js Integration</h1>
        <p className="docs-description">
          Use ChainCSS with Next.js for optimal performance, SSR, and static generation.
          ChainCSS provides both runtime (via hooks) and build-time compilation options.
        </p>
      </div>

      <h2>Why Next.js + ChainCSS?</h2>
      <div className="tip" style={{ marginBottom: '24px' }}>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Zero Runtime CSS:</strong> ChainCSS compiles styles at build time</li>
          <li><strong>Perfect for SSR/SSG:</strong> Styles are included in initial HTML</li>
          <li><strong>No FOUC:</strong> No flash of unstyled content</li>
          <li><strong>Automatic Atomic CSS:</strong> Optimize your CSS bundle size</li>
          <li><strong>React Server Components:</strong> Works with both client and server components</li>
        </ul>
      </div>
      
      <h2>Architecture Overview</h2>
      <div className="note" style={{ marginBottom: '24px', backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6' }}>
        <div style={{ marginTop: '12px' }}>
          <p><strong>Runtime Mode:</strong> Use <code className="inline-code">useChainStyles</code> from <code className="inline-code">chaincss/runtime</code> for dynamic styles</p>
          <p><strong>Build Mode:</strong> Write <code className="inline-code">.chain.js</code> files, run <code className="inline-code">npx chaincss build</code> for zero-runtime CSS</p>
          <p><strong>React hooks</strong> from <code className="inline-code">chaincss/runtime</code> work perfectly in Next.js</p>
        </div>
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('setup')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'setup' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'setup' ? '#eef2ff' : 'white',
            color: activeExample === 'setup' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Setup
        </button>
        <button
          onClick={() => setActiveExample('appRouter')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'appRouter' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'appRouter' ? '#eef2ff' : 'white',
            color: activeExample === 'appRouter' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          App Router
        </button>
        <button
          onClick={() => setActiveExample('buildTime')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'buildTime' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'buildTime' ? '#eef2ff' : 'white',
            color: activeExample === 'buildTime' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Build-Time Compilation
        </button>
        <button
          onClick={() => setActiveExample('pagesRouter')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'pagesRouter' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'pagesRouter' ? '#eef2ff' : 'white',
            color: activeExample === 'pagesRouter' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Pages Router
        </button>
        <button
          onClick={() => setActiveExample('ssr')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'ssr' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'ssr' ? '#eef2ff' : 'white',
            color: activeExample === 'ssr' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          SSR & SSG
        </button>
        <button
          onClick={() => setActiveExample('middleware')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'middleware' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'middleware' ? '#eef2ff' : 'white',
            color: activeExample === 'middleware' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Middleware Theming
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
        
        {'steps' in currentExample && currentExample.steps && (
          <div className="tip" style={{ marginTop: '16px', backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6' }}>
            <strong>Setup Steps:</strong>
            <ol style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              {currentExample.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
        
        {'benefits' in currentExample && currentExample.benefits && (
          <div className="tip" style={{ marginTop: '16px', backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6' }}>
            <strong>Benefits:</strong>
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              {currentExample.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        
        {'note' in currentExample && (
          <div className="tip" style={{ marginTop: '16px', backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b' }}>
            <strong>Note:</strong> {currentExample.note}
          </div>
        )}
      </div>

      <h2>Performance Optimization</h2>
      <div className="note">
        <strong>Best Practices for Next.js</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Enable atomic CSS in config for smaller bundle sizes</li>
          <li>Use build-time compilation for static styles</li>
          <li>Use <code className="inline-code">'use client'</code> only for interactive components</li>
          <li>Extract static styles to <code className="inline-code">.chain.js</code> files for build-time compilation</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>CSS not loading?</strong> Make sure to import generated CSS files</li>
          <li><strong>FOUC?</strong> Use build-time compilation instead of runtime</li>
          <li><strong>Hydration mismatch?</strong> Ensure consistent styles between server and client</li>
        </ul>
      </div>
      
      <h2>Framework Comparison</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 200px 200px 250px', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Framework</div>
            <div style={{ padding: '12px' }}>Runtime API</div>
            <div style={{ padding: '12px' }}>Build Plugin</div>
            <div style={{ padding: '12px' }}>Import Path</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 200px 200px 250px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><strong>React</strong></div>
            <div style={{ padding: '12px' }}>useChainStyles</div>
            <div style={{ padding: '12px' }}>Optional (Vite)</div>
            <div style={{ padding: '12px' }}><code>chaincss/runtime</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 200px 200px 250px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><strong>Next.js</strong></div>
            <div style={{ padding: '12px' }}>useChainStyles</div>
            <div style={{ padding: '12px' }}>Optional</div>
            <div style={{ padding: '12px' }}><code>chaincss/runtime</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 200px 200px 250px', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><strong>Vue</strong></div>
            <div style={{ padding: '12px' }}>useAtomicClasses</div>
            <div style={{ padding: '12px' }}>Optional (Vite)</div>
            <div style={{ padding: '12px' }}><code>chaincss/runtime/vue</code></div>
          </div>
        </div>
      </div>
    </>
  );
}