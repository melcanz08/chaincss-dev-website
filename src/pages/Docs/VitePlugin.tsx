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

  VITE v5.0.0  ready in 256 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  ChainCSS: HMR enabled for .jcss files`}
      </pre>
    </div>
  );
};

const HMRPreview = () => {
  const [color, setColor] = useState('#3b82f6');
  
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        style={{
          backgroundColor: color,
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = color}
      >
        Hover Me!
      </button>
      <div style={{ marginTop: '16px' }}>
        <label style={{ fontSize: '14px', color: '#64748b' }}>
          Try changing the color in the code editor →
        </label>
      </div>
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
        With HMR, the button updates instantly without page refresh
      </p>
    </div>
  );
};

const DebugPreview = () => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: '#f1f5f9',
          padding: '20px',
          borderRadius: '8px',
          border: `2px solid ${hovered ? '#667eea' : '#e2e8f0'}`,
          transition: 'all 0.2s',
          cursor: 'pointer',
          position: 'relative'
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ fontWeight: '500', marginBottom: '8px' }}>
          Hover over this element
        </div>
        {hovered && (
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#667eea',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap'
          }}>
            data-chaincss-class="c_3b82f6 c_ffffff c_1224"
          </div>
        )}
        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
          {hovered ? 'Showing ChainCSS classes!' : 'Hover to see atomic classes'}
        </p>
      </div>
      <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
        Debug mode adds hover inspector and console logs
      </p>
    </div>
  );
};

const TreeShakePreview = () => {
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
{`Analyzing bundle for unused CSS...

Total styles found: 156
  ├── .btn-primary (used ✓)
  ├── .btn-secondary (used ✓)
  ├── .card (used ✓)
  ├── .old-component (unused ✗)
  ├── .deprecated (unused ✗)
  └── ... (111 unused styles)

Removing unused CSS...
Bundle size reduced from 45KB to 14KB (68.9% savings)

ChainCSS Tree Shaking Complete!`}
      </pre>
    </div>
  );
};

export default function VitePlugin() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Setup',
      description: 'Configure ChainCSS Vite plugin in your project',
      code: `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import chaincss from 'chaincss/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    chaincss({
      extension: '.jcss',      // File extension to process (default: .jcss)
      minify: true,            // Minify CSS in production (default: true)
      prefix: true,            // Add vendor prefixes (default: true)
      hmr: true,               // Enable Hot Module Replacement (default: true)
      debug: false,            // Enable debug mode with element inspector (default: false)
      treeShake: true          // Remove unused CSS (default: true in production)
    })
  ]
});`,
      previewComponent: BasicSetupPreview
    },
    hmr: {
      title: 'Hot Module Replacement (HMR)',
      description: 'Live reload your styles as you edit .jcss files',
      code: `// styles.jcss
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

// Edit the color to #ef4444 and watch it update instantly!
// No page reload needed!`,
      previewComponent: HMRPreview
    },
    debug: {
      title: 'Debug Mode',
      description: 'Inspect atomic classes directly in your browser',
      code: `// vite.config.js
export default defineConfig({
  plugins: [
    chaincss({
      debug: true  // Enable debug mode
    })
  ]
});

// In development, hover over any element to see its ChainCSS classes
// The console will also show class maps and atomic utilities`,
      previewComponent: DebugPreview
    },
    treeShake: {
      title: 'Tree Shaking',
      description: 'Automatically remove unused CSS from production bundles',
      code: `// vite.config.js
export default defineConfig({
  plugins: [
    chaincss({
      treeShake: true  // Enabled by default in production
    })
  ]
});

// Build output:
// $ npm run build
// 
// ChainCSS Tree Shaking Results:
// Total styles: 156
// Used styles: 42
// Dead code eliminated: 114 (73.1% savings)
// CSS size reduced by 68.2%`,
      previewComponent: TreeShakePreview
    }
  };
  
  const currentExample = examples[activeExample];
  const PreviewComponent = currentExample.previewComponent;
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Vite Plugin</h1>
        <p className="docs-description">
          Seamless integration with Vite for fast development and optimized production builds.
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
          <h3 style={{ marginBottom: '8px' }}>Hot Module Replacement</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Edit .jcss files and see changes instantly without page refresh</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>Debug Mode</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Hover over elements to see their atomic classes and inspect styles</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>Tree Shaking</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Automatically remove unused CSS from production bundles</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}></div>
          <h3 style={{ marginBottom: '8px' }}>Atomic CSS</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Automatic atomic CSS optimization with --atomic flag</p>
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
          onClick={() => setActiveExample('hmr')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'hmr' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'hmr' ? '#eef2ff' : 'white',
            color: activeExample === 'hmr' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Hot Module Replacement
        </button>
        <button
          onClick={() => setActiveExample('debug')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'debug' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'debug' ? '#eef2ff' : 'white',
            color: activeExample === 'debug' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Debug Mode
        </button>
        <button
          onClick={() => setActiveExample('treeShake')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'treeShake' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'treeShake' ? '#eef2ff' : 'white',
            color: activeExample === 'treeShake' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Tree Shaking
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
              <td style={{ padding: '12px' }}><code className="inline-code">extension</code>              </td>
              <td style={{ padding: '12px' }}>string</td>
              <td style={{ padding: '12px' }}>'.jcss'</td>
              <td style={{ padding: '12px' }}>File extension to process</td>
             </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">minify</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true (production)</td>
              <td style={{ padding: '12px' }}>Minify CSS output</td>
             </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">prefix</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Add vendor prefixes via autoprefixer</td>
             </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">hmr</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Enable Hot Module Replacement</td>
             </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">debug</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Enable debug mode with element inspector</td>
             </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">treeShake</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true (production)</td>
              <td style={{ padding: '12px' }}>Remove unused CSS from production builds</td>
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
{`my-vite-project/
├── src/
│   ├── styles/
│   │   └── main.jcss          # Your ChainCSS styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js             # ChainCSS plugin configured here
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

const card = $()
  .backgroundColor('white')
  .borderRadius('12px')
  .padding('24px')
  .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
  .block('.card');

run(button, card);
@>`} />
      <h4>HTML</h4>
      <CodeBlock language="html" code={`<!-- my-vite-project/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/styles/global.css">
    <title>ChainCSS - Button & Card Demo</title>
</head>
<body>
    <div class="container">
        <!-- Card Component -->
        <div class="card">
            <h3>Card Title</h3>
            <p>This is a card with padding, border-radius, and shadow</p>
        </div>
        
        <!-- Button Component -->
        <button class="btn">Click Me</button>
    </div>
</body>
</html>`} />
<h4>Bash</h4>
<CodeBlock language="bash" code={`cd ~/my-vite-project`} />
<CodeBlock language="bash" code={`npx chaincss ./src/styles.main.jcss ./src/styles`} />

      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <p>Link the style first to your index.html &lt;link rel="stylesheet" href="./src/styles/global.css"&gt;</p>
        <p>Check your webpage open index.html in any browser</p>
      </div>

      {/* Best Practices */}
      <div className="note" style={{ marginBottom: '24px' }}>
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Enable <code className="inline-code">debug: true</code> during development for easier debugging</li>
          <li>Use <code className="inline-code">treeShake: true</code> in production to reduce bundle size</li>
          <li>Keep <code className="inline-code">hmr: true</code> for faster development iteration</li>
          <li>Use <code className="inline-code">--atomic</code> flag in production for optimal CSS size</li>
        </ul>
      </div>
      
      {/* Troubleshooting */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Styles not updating?</strong> Check that HMR is enabled and you're editing .jcss files</li>
          <li><strong>Debug mode not working?</strong> Make sure <code className="inline-code">debug: true</code> is set in config</li>
          <li><strong>Tree shaking not removing CSS?</strong> Verify your components are importing the .jcss files correctly</li>
          <li><strong>Build errors?</strong> Check the console for ChainCSS compilation errors</li>
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
        <a href="/docs/vue" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Vue Composables
        </a>
        <a href="/docs/webpack-plugin" style={{ color: '#667eea', textDecoration: 'none' }}>
          Webpack Plugin →
        </a>
      </div>*/}
    </>
  );
}