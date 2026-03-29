// NextJS.tsx - Corrected version showing React hooks usage
import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

// Preview components using React hooks from chaincss/react
const AppRouterPreview = () => {
  const [variant, setVariant] = useState('primary');
  
  // In real usage, this would be:
  // import { useChainStyles } from 'chaincss/react';
  // const styles = useChainStyles({...});
  
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
        Uses React hooks from chaincss/react with 'use client' directive
      </p>
    </div>
  );
};

export default function NextJS() {
  const [activeExample, setActiveExample] = useState('setup');
  
  const examples = {
    setup: {
      title: 'Next.js Setup',
      description: 'Configure ChainCSS with Next.js for SSR and SSG',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true,
  
  // ChainCSS options
  chaincss: {
    atomic: true,
    atomicThreshold: 3,
    sourceMap: process.env.NODE_ENV !== 'production',
    minify: process.env.NODE_ENV === 'production'
  }
});`,
      steps: [
        'Install ChainCSS: npm install chaincss',
        'Add the Next.js plugin to next.config.js',
        'Use React hooks from chaincss/react in your components'
      ]
    },
    appRouter: {
      title: 'App Router (React Server Components)',
      description: 'Use ChainCSS with Next.js App Router and RSC',
      code: `// app/layout.tsx
import { ChainCSSGlobal } from 'chaincss/react';
import './styles/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChainCSSGlobal styles={{
          body: $()
            .margin('0')
            .padding('0')
            .fontFamily('system-ui')
            .backgroundColor('#f8fafc')
            .color('#1e293b')
            .block()
        }} />
        {children}
      </body>
    </html>
  );
}

// app/components/Button.tsx (Client Component)
'use client';

import { useChainStyles } from 'chaincss/react';

export function Button({ children, variant = 'primary' }) {
  const styles = useChainStyles({
    button: $()
      .backgroundColor(variant === 'primary' ? '#3b82f6' : '#6b7280')
      .color('white')
      .padding('12px 24px')
      .borderRadius('8px')
      .hover()
        .backgroundColor(variant === 'primary' ? '#2563eb' : '#4b5563')
        .end()
      .transition('all 0.2s')
      .block()
  });
  
  return <button className={styles.button}>{children}</button>;
}`,
      note: 'Uses React hooks from chaincss/react with "use client" directive for interactivity'
    },
    buildTime: {
      title: 'Build-Time Compilation',
      description: 'Extract styles at build time for optimal performance',
      code: `// styles/button.jcss
import { $ } from 'chaincss';

export const button = $()
  .padding('12px 24px')
  .borderRadius('8px')
  .backgroundColor('#3b82f6')
  .color('white')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .block();

// app/components/Button.tsx
import { button } from '@/styles/button.jcss';

export function Button({ children }) {
  // Styles are already compiled at build time!
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
import { useChainStyles } from 'chaincss/react';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const styles = useChainStyles({
    app: $()
      .minHeight('100vh')
      .block()
  });
  
  return (
    <div className={styles.app}>
      <Component {...pageProps} />
    </div>
  );
}

// pages/index.tsx
import { useChainStyles } from 'chaincss/react';

export default function Home() {
  const styles = useChainStyles({
    container: $()
      .maxWidth('1200px')
      .margin('0 auto')
      .padding('40px 20px')
      .block(),
    title: $()
      .fontSize('48px')
      .fontWeight('700')
      .marginBottom('16px')
      .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      .backgroundClip('text')
      .color('transparent')
      .block()
  });
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js with ChainCSS</h1>
    </div>
  );
}`,
    },
    middleware: {
      title: 'Middleware & Theme Detection',
      description: 'Detect user preferences in middleware for server-side theming',
      code: `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get theme preference from cookie or accept header
  const theme = request.cookies.get('theme')?.value || 
                request.headers.get('accept-header')?.includes('dark') ? 'dark' : 'light';
  
  // Add theme to headers for server components
  const response = NextResponse.next();
  response.headers.set('x-theme', theme);
  
  return response;
}

// app/layout.tsx
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const theme = headers().get('x-theme') || 'light';
  
  const styles = $()
    .backgroundColor(theme === 'dark' ? '#0f172a' : '#ffffff')
    .color(theme === 'dark' ? '#f1f5f9' : '#1e293b')
    .block();
  
  return (
    <html lang="en" className={styles}>
      <body>{children}</body>
    </html>
  );
}`
    },
    ssr: {
      title: 'SSR & SSG',
      description: 'Server-side rendering and static generation with ChainCSS',
      code: `// pages/blog/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useChainStyles } from 'chaincss/react';

interface BlogProps {
  post: {
    title: string;
    content: string;
  };
}

export default function BlogPost({ post }: BlogProps) {
  const styles = useChainStyles({
    article: $()
      .maxWidth('800px')
      .margin('0 auto')
      .padding('40px 20px')
      .block(),
    title: $()
      .fontSize('36px')
      .fontWeight('700')
      .marginBottom('24px')
      .block(),
    content: $()
      .fontSize('18px')
      .lineHeight('1.7')
      .color('#334155')
      .select('p')
        .marginBottom('1.5rem')
        .block()
      .block()
  });
  
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Static generation at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string);
  return {
    props: { post },
    revalidate: 3600 // ISR: regenerate every hour
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
};`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Next.js Integration</h1>
        <p className="docs-description">
          Use ChainCSS with Next.js for optimal performance, SSR, and static generation.
          ChainCSS provides build-time compilation for Next.js with React hooks support.
          <br />
          <strong>Note:</strong> Next.js uses React, so you'll use the <code className="inline-code">chaincss/react</code> hooks in your components.
        </p>
      </div>

      {/* Why Next.js + ChainCSS */}
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
      
      {/* Architecture Explanation */}
      <h2>Architecture Overview</h2>
      <div className="note" style={{ marginBottom: '24px', backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6' }}>
        <div style={{ marginTop: '12px' }}>
          <p><strong>Next.js Plugin</strong> → Handles build-time compilation and CSS extraction</p>
          <p><strong>React Hooks</strong> → Used in components via <code className="inline-code">chaincss/react</code></p>
          <p><strong>Why not separate Next.js hooks?</strong> Next.js uses React, so the existing React hooks work perfectly!</p>
        </div>
      </div>
      
      {/* Examples */}
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

      {/* Performance Tips */}
      <h2>Performance Optimization</h2>
      <div className="note">
        <strong>Best Practices for Next.js</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">--atomic</code> flag to optimize CSS bundle size</li>
          <li>Enable <code className="inline-code">sourceMap: false</code> in production builds</li>
          <li>Use <code className="inline-code">'use client'</code> only for interactive components</li>
          <li>Extract static styles to <code className="inline-code">.jcss</code> files for build-time compilation</li>
          <li>Use <code className="inline-code">next build --debug</code> to analyze bundle size</li>
        </ul>
      </div>
      
      {/* Troubleshooting */}
      <div className="tip" style={{ backgroundColor: '#fef3c7', borderLeftColor: '#f59e0b', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>CSS not loading?</strong> Make sure <code className="inline-code">./styles/global.css</code> is imported in <code className="inline-code">_app.tsx</code> or layout</li>
          <li><strong>FOUC (Flash of Unstyled Content)?</strong> Use build-time compilation instead of runtime</li>
          <li><strong>Hydration mismatch?</strong> Ensure consistent styles between server and client</li>
          <li><strong>Slow builds?</strong> Increase <code className="inline-code">atomicThreshold</code> to reduce atomic classes</li>
        </ul>
      </div>
      
      {/* Comparison Table */}
      <h2>Framework Comparison</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Framework</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Runtime API</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Build Plugin</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Import Path</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><strong>React</strong></td>
              <td style={{ padding: '12px' }}>useChainStyles, ChainCSSGlobal</td>
              <td style={{ padding: '12px' }}>Optional (Vite/Webpack)</td>
              <td style={{ padding: '12px' }}><code>chaincss/react</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><strong>Next.js</strong></td>
              <td style={{ padding: '12px' }}>Same React hooks</td>
              <td style={{ padding: '12px' }}><strong>Required:</strong> next-plugin</td>
              <td style={{ padding: '12px' }}><code>chaincss/react</code> + plugin</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><strong>Vue</strong></td>
              <td style={{ padding: '12px' }}>useAtomicClasses, ChainCSSGlobal</td>
              <td style={{ padding: '12px' }}>Optional (Vite plugin)</td>
              <td style={{ padding: '12px' }}><code>chaincss/vue</code></td>
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
        <a href="/docs/vue" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Vue Composables
        </a>
        <a href="/docs/rsc" style={{ color: '#667eea', textDecoration: 'none' }}>
          React Server Components →
        </a>
      </div>*/}
    </>
  );
}