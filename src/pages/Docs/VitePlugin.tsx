import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

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
  ➜  ChainCSS: HMR enabled for .chain.js files`}
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
          Try changing the color in the code editor
        </label>
      </div>
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
        With HMR, the button updates instantly without page refresh
      </p>
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
import chaincss from 'chaincss/plugin/vite';

export default defineConfig({
  plugins: [
    react(),
    chaincss({
      atomic: true,           // Enable atomic CSS optimization
      prefix: true,           // Add vendor prefixes
      minify: true,           // Minify CSS in production
      verbose: false          // Enable verbose logging
    })
  ]
});`,
      previewComponent: BasicSetupPreview
    },
    hmr: {
      title: 'Hot Module Replacement (HMR)',
      description: 'Live reload your styles as you edit .chain.js files',
      code: `// vite.config.js
import chaincss from 'chaincss/plugin/vite';

export default defineConfig({
  plugins: [
    chaincss({
      verbose: true  // See HMR updates in console
    })
  ]
});

// Edit your .chain.js file and watch it update instantly
// No page reload needed`,
      previewComponent: HMRPreview
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
          <h3 style={{ marginBottom: '8px' }}>Hot Module Replacement</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Edit .chain.js files and see changes instantly without page refresh</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ marginBottom: '8px' }}>Atomic CSS</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Automatic atomic CSS optimization for smaller bundles</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ marginBottom: '8px' }}>TypeScript Support</h3>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Full TypeScript support with generated .d.ts files</p>
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
            <div style={{ padding: '12px' }}><code className="inline-code">atomic</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Enable atomic CSS optimization</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">prefix</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>true</div>
            <div style={{ padding: '12px' }}>Add vendor prefixes via autoprefixer</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 200px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">minify</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>true (production)</div>
            <div style={{ padding: '12px' }}>Minify CSS output</div>
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
{`my-vite-project/
├── src/
│   ├── components/
│   │   └── Button/
│   │       └── styles/
│   │           └── button.chain.js
│   ├── global-style/
│   │   └── global.chain.js
│   └── main.jsx
├── index.html
├── vite.config.js
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
  .$el('.btn');`} />
      
      <h4>React Component</h4>
      <CodeBlock language="jsx" code={`// src/components/Button/Button.jsx
import { button } from './styles/button.class.js';
import './styles/button.css';

export function Button({ children }) {
  return <button className={button}>{children}</button>;
}`} />

      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <p>The Vite plugin automatically processes .chain.js files and enables HMR during development.</p>
      </div>

      <div className="note" style={{ marginBottom: '24px' }}>
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Enable <code className="inline-code">atomic: true</code> in production for smaller bundle sizes</li>
          <li>Keep <code className="inline-code">verbose: true</code> during development for debugging</li>
          <li>Use build-time compilation via CLI for larger projects</li>
        </ul>
      </div>
      
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Styles not updating?</strong> Check that HMR is enabled and you're editing .chain.js files</li>
          <li><strong>Build errors?</strong> Check the console for ChainCSS compilation errors</li>
          <li><strong>CSS not generating?</strong> Run <code className="inline-code">npx chaincss build</code> to verify your styles compile</li>
        </ul>
      </div>
    </>
  );
}