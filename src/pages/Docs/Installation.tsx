import { useState } from 'react';

export default function Installation() {
  const [copied, setCopied] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Installation</h1>
        <p className="docs-description">Get started with ChainCSS in your project</p>
      </div>
      
      <h2>Package Managers</h2><br />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ 
          background: '#f1f5f9', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.5rem',
          fontWeight: '500',
          color: '#1e293b'
        }}>
           npm
        </div>
        <div style={{ 
          background: '#f1f5f9', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.5rem',
          fontWeight: '500',
          color: '#1e293b'
        }}>
           yarn
        </div>
        <div style={{ 
          background: '#f1f5f9', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.5rem',
          fontWeight: '500',
          color: '#1e293b'
        }}>
           pnpm
        </div>
      </div>
      
      <div className="code-block" style={{ position: 'relative' }}>
        <pre><code>npm install chaincss</code></pre>
        <button 
          onClick={() => copyToClipboard('npm install chaincss', 'npm')}
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px',
            background: '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {copied === 'npm' ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      
      <div className="code-block" style={{ position: 'relative' }}>
        <pre><code>yarn add chaincss</code></pre>
        <button 
          onClick={() => copyToClipboard('yarn add chaincss', 'yarn')}
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px',
            background: '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {copied === 'yarn' ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      
      <div className="code-block" style={{ position: 'relative' }}>
        <pre><code>pnpm add chaincss</code></pre>
        <button 
          onClick={() => copyToClipboard('pnpm add chaincss', 'pnpm')}
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px',
            background: '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {copied === 'pnpm' ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

            <h2>Next.js Setup</h2>
      <div className="code-block">
        <pre>{`// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true
});`}</pre>
      </div>

      <h2>Vite Setup</h2>
      <div className="code-block">
        <pre>{`// vite.config.js
import chaincss from 'chaincss/vite-plugin';

export default {
  plugins: [chaincss()]
};`}</pre>
      </div>

      <h2>Webpack Setup</h2>
      <div className="code-block">
        <pre>{`// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');

module.exports = {
  plugins: [new ChainCSSPlugin()]
};`}</pre></div>
      
      <h2>Requirements</h2><br />
      <ul>
        <li><strong>React 16.8+</strong> (for Hooks support)</li>
        <li><strong>Node.js 14+</strong> (for build mode)</li>
      </ul><br />
      
      <div className="tip">
        <strong>💡 Pro tip:</strong> ChainCSS works in both runtime and build modes.
        Choose what fits your project best!
      </div>

      <h2>Optional Dependencies</h2>
      <p>For full autoprefixer support, install:</p>
      <div className="code-block" style={{ position: 'relative' }}>
        <pre><code>npm install -D autoprefixer postcss browserslist caniuse-db</code></pre>
        <button 
          onClick={() => copyToClipboard('npm install -D autoprefixer postcss browserslist caniuse-db', 'optional')}
          style={{ 
            position: 'absolute', 
            top: '8px', 
            right: '8px',
            background: '#334155',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {copied === 'optional' ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      <div className="note">
        <strong>📘 Note:</strong> ChainCSS works without these, but autoprefixer is recommended for cross-browser compatibility.
      </div>
    </>
  );
}