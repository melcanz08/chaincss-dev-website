import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function WebpackPlugin() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Setup',
      description: 'Configure ChainCSS Webpack plugin in your project',
      code: `// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');

module.exports = {
  // ... other config
  plugins: [
    new ChainCSSPlugin({
      atomic: process.env.NODE_ENV === 'production',
      input: './src/styles/main.jcss',
      output: './dist'
    })
  ]
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

ChainCSS: Processing ./src/styles/main.jcss
CSS generated: ./dist/global.css
Source map: ./dist/global.css.map

webpack 5.88.0 compiled successfully in 2345 ms`}
          </pre>
        </div>
      )
    },
    atomic: {
      title: 'Atomic CSS Optimization',
      description: 'Enable atomic CSS for smaller bundles',
      code: `// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');

module.exports = {
  plugins: [
    new ChainCSSPlugin({
      atomic: true,  // Enable atomic CSS optimization
      input: './src/styles/main.jcss',
      output: './dist'
    })
  ]
};

// With atomic CSS enabled, ChainCSS will:
// - Generate atomic utility classes
// - Remove duplicate CSS properties
// - Reduce bundle size by up to 75%`,
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
├── .btn-primary { background: #3b82f6; color: white; padding: 12px 24px; }
├── .btn-secondary { background: #3b82f6; color: white; padding: 12px 24px; }
└── .btn-danger { background: #3b82f6; color: white; padding: 12px 24px; }

Atomic classes created:
├── .c_3b82f6 { background: #3b82f6; }
├── .c_ffffff { color: white; }
└── .c_1224 { padding: 12px 24px; }

Total styles after: 12KB
Bundle size reduced by 73.3%!`}
            </pre>
          </div>
        );
      }
    },
    custom: {
      title: 'Custom Input/Output',
      description: 'Specify custom file locations',
      code: `// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new ChainCSSPlugin({
      input: path.resolve(__dirname, 'src/styles/theme.jcss'),
      output: path.resolve(__dirname, 'public/assets'),
      atomic: true
    })
  ]
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
{`Project Structure:
├── src/
│   └── styles/
│       └── theme.jcss          ← Input file
├── public/
│   └── assets/
│       ├── global.css          ← Output CSS
│       └── global.css.map      ← Source map
└── webpack.config.js

ChainCSS: Processing custom theme.jcss
Output written to public/assets/`}
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
      
      {/* Features Overview */}
      <h2>Features</h2>
      <div className="feature-grid" style={{ marginBottom: '32px' }}>
        <div className="feature-card">
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3>Build-Time Compilation</h3>
          <p>Compile ChainCSS styles during Webpack build process</p>
        </div>
        <div className="feature-card">
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3>Atomic CSS</h3>
          <p>Enable automatic atomic CSS optimization</p>
        </div>
        <div className="feature-card">
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3>Custom Paths</h3>
          <p>Specify custom input and output locations</p>
        </div>
        <div className="feature-card">
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3>Production Ready</h3>
          <p>Automatic minification and source maps in production</p>
        </div>
      </div>
      
      {/* Installation */}
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install -D chaincss
# or
yarn add -D chaincss
# or
pnpm add -D chaincss`} />
      
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
          onClick={() => setActiveExample('custom')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'custom' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'custom' ? '#eef2ff' : 'white',
            color: activeExample === 'custom' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Custom Paths
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
              <td style={{ padding: '12px' }}><code className="inline-code">atomic</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true (production)</td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">input</code></td>
              <td style={{ padding: '12px' }}>string</td>
              <td style={{ padding: '12px' }}>'./src/styles/main.jcss'</td>
              <td style={{ padding: '12px' }}>Path to main .jcss file</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">output</code></td>
              <td style={{ padding: '12px' }}>string</td>
              <td style={{ padding: '12px' }}>'./dist'</td>
              <td style={{ padding: '12px' }}>Output directory for CSS files</td>
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
{`my-webpack-project/
├── src/
│   ├── styles/
│   │   └── main.jcss          # Your ChainCSS styles
│   ├── index.js
│   └── App.js
├── dist/                       # Output directory (configured)
├── webpack.config.js           # ChainCSS plugin configured here
└── package.json`}
        </pre>
      </div>
      
      {/* Usage Example */}
      <h2>Usage Example</h2>
      <CodeBlock language="javascript" code={`// src/styles/main.jcss
<@
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .transition('all 0.2s')
  .block('.btn');

run(button);
@>

// src/index.js
import './styles/main.jcss';  // Import the generated CSS

const button = document.createElement('button');
button.className = 'btn';
button.textContent = 'Click Me';
document.body.appendChild(button);`} />
      
      {/* NPM Scripts */}
      <h2>NPM Scripts</h2>
      <CodeBlock language="json" code={`{
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development"
  }
}`} />
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Enable <code className="inline-code">atomic: true</code> in production for smaller bundles</li>
          <li>Use absolute paths with <code className="inline-code">path.resolve()</code> for reliable builds</li>
          <li>Keep ChainCSS in <code className="inline-code">devDependencies</code> since it's a build tool</li>
          <li>Configure <code className="inline-code">output</code> to match your static file serving path</li>
        </ul>
      </div>
      
      {/* Troubleshooting */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>ChainCSS not running?</strong> Check that the plugin is added to the <code className="inline-code">plugins</code> array</li>
          <li><strong>CSS not found?</strong> Verify the <code className="inline-code">input</code> path is correct</li>
          <li><strong>Build errors?</strong> Check the console for ChainCSS compilation errors</li>
          <li><strong>Atomic CSS not working?</strong> Make sure <code className="inline-code">atomic: true</code> is set</li>
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
        <a href="/docs/vite-plugin" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Vite Plugin
        </a>
        <a href="/docs/custom-plugins" style={{ color: '#667eea', textDecoration: 'none' }}>
          Custom Plugins →
        </a>
      </div>*/}
    </>
  );
}