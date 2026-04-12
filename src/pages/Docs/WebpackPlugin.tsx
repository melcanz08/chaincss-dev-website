import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function WebpackPlugin() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Setup',
      description: 'Configure ChainCSS Webpack loader in your project',
      code: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.chain\\.js$/,
        use: [
          {
            loader: 'chaincss/plugin/webpack',
            options: {
              mode: 'build',        // 'build' for production, 'runtime' for development
              atomic: true,         // Enable atomic CSS optimization
              minify: true,         // Minify CSS in production
              verbose: false        // Enable verbose logging
            }
          }
        ]
      }
    ]
  }
};`,
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

> webpack --mode production

ChainCSS: Processing ./src/components/Button/styles/button.chain.js
CSS generated: .chaincss-cache/button.css
Class map generated: .chaincss-cache/button.js

webpack 5.88.0 compiled successfully in 2345 ms`}
          </pre>
        </div>
      )
    },
    atomic: {
      title: 'Atomic CSS Optimization',
      description: 'Enable atomic CSS for smaller bundles',
      code: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.chain\\.js$/,
        use: [
          {
            loader: 'chaincss/plugin/webpack',
            options: {
              mode: 'build',
              atomic: true,   // Enable atomic CSS optimization
              minify: true,
              verbose: true
            }
          }
        ]
      }
    ]
  }
};`,
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
{`Atomic CSS Optimization Results:

Total styles before: 45KB

Atomic classes created:
├── .c_3b82f6 { background-color: #3b82f6; }
├── .c_ffffff { color: white; }
└── .c_1224 { padding: 12px 24px; }

Total styles after: 12KB
Bundle size reduced by 73.3%`}
            </pre>
          </div>
        );
      }
    },
    runtime: {
      title: 'Runtime Mode (Development)',
      description: 'Use runtime mode for faster development iteration',
      code: `// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.chain\\.js$/,
        use: [
          {
            loader: 'chaincss/plugin/webpack',
            options: {
              mode: 'runtime',  // Runtime mode for development
              verbose: true
            }
          }
        ]
      }
    ]
  }
};`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`[chaincss-loader] Runtime mode for ./src/components/Button/styles/button.chain.js
Styles injected dynamically via JavaScript
No build step needed for CSS changes`}
          </pre>
        </div>
      )
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Webpack Plugin</h1>
        <p className="docs-description">
          Integrate ChainCSS with Webpack for seamless build-time CSS compilation.
        </p>
      </div>
      
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
          <h3 style={{ marginBottom: '8px' }}>Build-Time Compilation</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Compile ChainCSS styles during Webpack build process</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ marginBottom: '8px' }}>Atomic CSS</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Enable automatic atomic CSS optimization</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ marginBottom: '8px' }}>Dual Mode</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Switch between build (zero-runtime) and runtime modes</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ marginBottom: '8px' }}>Production Ready</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Automatic minification and source maps in production</p>
        </div>
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install -D chaincss`} />
      
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
          onClick={() => setActiveExample('atomic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'atomic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'atomic' ? '#eef2ff' : 'white',
            color: activeExample === 'atomic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Atomic CSS
        </button>
        <button
          onClick={() => setActiveExample('runtime')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'runtime' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'runtime' ? '#eef2ff' : 'white',
            color: activeExample === 'runtime' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Runtime Mode
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
      
      <h2>Configuration Options</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">mode</code></div>
            <div style={{ padding: '12px' }}>'build' | 'runtime'</div>
            <div style={{ padding: '12px' }}>'build' (production)</div>
            <div style={{ padding: '12px' }}>Build mode (zero-runtime) or runtime mode</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">atomic</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Enable atomic CSS optimization</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">minify</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>true (production)</div>
            <div style={{ padding: '12px' }}>Minify CSS output</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">sourceMap</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Generate source maps</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">verbose</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Enable verbose logging</div>
          </div>
        </div>
      </div>
      
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
{`my-webpack-project/
├── src/
│   ├── components/
│   │   └── Button/
│   │       └── styles/
│   │           └── button.chain.js
│   ├── global-style/
│   │   └── global.chain.js
│   └── index.js
├── .chaincss-cache/            # Generated CSS cache
├── webpack.config.js
└── package.json`}
        </pre>
      </div>
      
      <h2>Usage Example</h2>
      <CodeBlock language="javascript" code={`// src/components/Button/styles/button.chain.js
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

// src/index.js
import { button } from './components/Button/styles/button.class.js';
import './components/Button/styles/button.css';

const btn = document.createElement('button');
btn.className = button;
btn.textContent = 'Click Me';
document.body.appendChild(btn);`} />
      
      <h2>NPM Scripts</h2>
      <CodeBlock language="json" code={`{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development"
  }
}`} />
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Enable <code className="inline-code">atomic: true</code> in production for smaller bundles</li>
          <li>Use <code className="inline-code">mode: 'runtime'</code> during development for faster iteration</li>
          <li>Keep ChainCSS in <code className="inline-code">devDependencies</code> since it's a build tool</li>
          <li>Add <code className="inline-code">.chaincss-cache/</code> to your .gitignore</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>ChainCSS not running?</strong> Check that the loader is added to the <code className="inline-code">module.rules</code> array</li>
          <li><strong>CSS not found?</strong> Verify the <code className="inline-code">test</code> regex matches your .chain.js files</li>
          <li><strong>Build errors?</strong> Check the console for ChainCSS compilation errors</li>
          <li><strong>Atomic CSS not working?</strong> Make sure <code className="inline-code">atomic: true</code> is set</li>
        </ul>
      </div>
    </>
  );
}