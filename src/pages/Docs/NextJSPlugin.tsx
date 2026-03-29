import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

// Extract preview components to avoid conditional hook calls
const BasicSetupPreview = () => {
  return (
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

✓ ChainCSS: Plugin loaded
✓ ChainCSS: .jcss loader configured
✓ ChainCSS: RSC support enabled

✓ Ready in 2.3s`}
      </pre>
    </div>
  );
};

const AppRouterPreview = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        style={{
          backgroundColor: hovered ? '#2563eb' : '#3b82f6',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        App Router Button
      </button>
      <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
        RSC + Client Component = Best of both worlds!
      </p>
    </div>
  );
};

const PagesRouterPreview = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Welcome to Next.js + ChainCSS
      </h1>
      <p style={{ color: '#64748b', marginTop: '16px' }}>
        Pages Router with ChainCSS styles
      </p>
    </div>
  );
};

const SsrPreview = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{
        fontSize: '36px',
        fontWeight: '700',
        marginBottom: '24px'
      }}>
        SSR/SSG with ChainCSS
      </h1>
      <div style={{
        fontSize: '18px',
        lineHeight: '1.7',
        color: '#334155'
      }}>
        <p>This content is generated at build time (SSG) or on the server (SSR).</p>
        <p>ChainCSS styles are included in the initial HTML, no FOUC!</p>
        <div className="tip" style={{ marginTop: '16px', padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
          Perfect for SEO<br />
          No layout shift<br />
          Fast initial load
        </div>
      </div>
    </div>
  );
};

const TurbopackPreview = () => {
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      padding: '20px', 
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '13px'
    }}>
      <pre style={{ margin: 0, color: '#1e293b' }}>
{`$ next dev --turbo

▲ Next.js 14.0.0 (Turbopack)
- Local:        http://localhost:3000

✓ ChainCSS: Turbopack rules configured
✓ ChainCSS: .jcss files processed at lightning speed

Turbopack + ChainCSS = Instant HMR for styles!
✓ Ready in 645ms`}
      </pre>
    </div>
  );
};

export default function NextJSPlugin() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Setup',
      description: 'Configure ChainCSS Next.js plugin in your project',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true,
  
  // ChainCSS options
  chaincss: {
    atomic: process.env.NODE_ENV === 'production',
    mode: 'build',  // 'build' for SSR/SSG, 'runtime' for client-side
  }
});`,
      previewComponent: BasicSetupPreview
    },
    appRouter: {
      title: 'App Router (RSC)',
      description: 'Use ChainCSS with React Server Components',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  // App Router automatically supported
  experimental: {
    appDir: true
  }
});

// app/layout.tsx
import './styles/main.jcss';  // Import ChainCSS styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/components/Button.tsx (Client Component)
'use client';

import { useChainStyles } from 'chaincss/react';

export function Button({ children }) {
  const styles = useChainStyles({
    btn: $()
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
  
  return <button className={styles.btn}>{children}</button>;
}`,
      previewComponent: AppRouterPreview
    },
    pagesRouter: {
      title: 'Pages Router',
      description: 'Use ChainCSS with traditional Pages Router',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  // Pages Router works out of the box
});

// pages/_app.js
import '../styles/main.jcss';  // Import ChainCSS styles

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// pages/index.js
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
      .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      .backgroundClip('text')
      .color('transparent')
      .block()
  });
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Next.js + ChainCSS</h1>
    </div>
  );
}`,
      previewComponent: PagesRouterPreview
    },
    ssr: {
      title: 'SSR & Static Generation',
      description: 'Optimize for server-side rendering and static sites',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  chaincss: {
    atomic: true,  // Atomic CSS for smaller bundles
    mode: 'build'  // Build mode extracts CSS at compile time
  }
});

// pages/blog/[slug].js
import { useChainStyles } from 'chaincss/react';

export default function BlogPost({ post }) {
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
      .block()
  });
  
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.content}>{post.content}</div>
    </article>
  );
}

// Static generation at build time
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  return {
    props: { post },
    revalidate: 3600  // ISR: regenerate every hour
  };
}`,
      previewComponent: SsrPreview
    },
    turbopack: {
      title: 'Turbopack Support',
      description: 'Fast development with Next.js Turbopack',
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  // Turbopack automatically configured
  experimental: {
    turbo: {
      rules: {
        '*.jcss': {
          loaders: ['chaincss/loader'],
          as: '*.css'
        }
      }
    }
  }
});

// Run with Turbopack
// next dev --turbo`,
      previewComponent: TurbopackPreview
    }
  };
  
  const currentExample = examples[activeExample];
  const PreviewComponent = currentExample.previewComponent;
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Next.js Plugin</h1>
        <p className="docs-description">
          Seamless integration with Next.js for optimal SSR, SSG, and React Server Components.
        </p>
      </div>
      
      {/* Features Overview */}
      <h2>Features</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>React Server Components</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Full support for App Router and RSC</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>SSR & SSG</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Optimized for server-side rendering and static generation</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>Turbopack</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Lightning fast development with Turbopack support</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>Atomic CSS</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Automatic CSS optimization for smaller bundles</p>
        </div>
      </div>
      
      {/* Installation */}
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss
# or
yarn add chaincss
# or
pnpm add chaincss`} />
      
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
          Basic Setup
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
          App Router (RSC)
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
          onClick={() => setActiveExample('turbopack')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'turbopack' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'turbopack' ? '#eef2ff' : 'white',
            color: activeExample === 'turbopack' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Turbopack
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
        
        {PreviewComponent && (
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Live Preview:</strong>
            <div style={{ marginTop: '12px' }}>
              <PreviewComponent />
            </div>
          </div>
        )}
      </div>
      
      {/* Configuration Options */}
      <h2>Configuration Options</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                    </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">atomic</code>               </td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true (production)</td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px' }}>'build' | 'runtime'</td>
              <td style={{ padding: '12px' }}>'build'</td>
              <td style={{ padding: '12px' }}>Build mode for SSR/SSG, runtime for client-side</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Project Structure */}
      <h2>Project Structure</h2>
      <div style={{ 
        backgroundColor: '#1e293b',
        color: '#e2e8f0',
        padding: '20px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '13px',
        marginBottom: '24px'
      }}>
        <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`my-nextjs-app/
├── app/                         # App Router
│   ├── layout.tsx
│   └── page.tsx
├── pages/                       # Pages Router
│   ├── _app.tsx
│   └── index.tsx
├── styles/
│   └── main.jcss                # Your ChainCSS styles
├── next.config.js               # ChainCSS plugin configured here
└── package.json`}
        </pre>
      </div>
      
      {/* Best Practices */}
      <div className="note" style={{ marginBottom: '24px' }}>
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">mode: 'build'</code> for SSR/SSG to extract CSS at compile time</li>
          <li>Enable <code className="inline-code">atomic: true</code> in production for smaller bundles</li>
          <li>Use <code className="inline-code">'use client'</code> for interactive components that need runtime styles</li>
          <li>Import ChainCSS styles in <code className="inline-code">layout.tsx</code> or <code className="inline-code">_app.tsx</code></li>
          <li>Use Turbopack for faster development (<code className="inline-code">next dev --turbo</code>)</li>
        </ul>
      </div>
      
      {/* Troubleshooting */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>CSS not loading?</strong> Make sure you're importing the .jcss file in your layout or _app</li>
          <li><strong>FOUC (Flash of Unstyled Content)?</strong> Use build mode (<code className="inline-code">mode: 'build'</code>)</li>
          <li><strong>Hydration mismatch?</strong> Ensure consistent styles between server and client</li>
          <li><strong>Turbopack not processing .jcss?</strong> Check your next.config.js turbo rules</li>
          <li><strong>RSC errors?</strong> Mark interactive components with <code className="inline-code">'use client'</code></li>
        </ul>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/webpack-plugin" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Webpack Plugin
        </a>
        <a href="/docs/custom-plugins" style={{ color: '#667eea', textDecoration: 'none' }}>
          Custom Plugins →
        </a>
      </div>*/}
    </>
  );
}