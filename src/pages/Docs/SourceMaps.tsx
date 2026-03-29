import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function SourceMaps() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Source Map',
      description: 'Generate source maps for debugging',
      code: `// Run ChainCSS with source maps enabled (default)
npx chaincss ./styles.jcss ./dist --source-map

// Output files:
// dist/global.css
// dist/global.css.map`,
      output: `/*# sourceMappingURL=global.css.map */`,
      map: `{
  "version": 3,
  "sources": ["styles.jcss"],
  "names": [],
  "mappings": "AAAA;EACE,gBAAgB;EAChB,UAAU;EACV,aAAa;AACf",
  "file": "global.css",
  "sourcesContent": [".btn { color: blue; }"]
}`
    },
    inline: {
      title: 'Inline Source Maps',
      description: 'Embed source map directly in CSS file',
      code: `// Use inline source maps (no separate .map file)
npx chaincss ./styles.jcss ./dist --source-map-inline

// Output: single global.css file with embedded source map`,
      output: `/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy5qY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixhQUFhO0FBQ2YiLCJmaWxlIjoiZ2xvYmFsLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idG4geyBjb2xvcjogYmx1ZTsgfSJdfQ== */`
    },
    disabled: {
      title: 'Disable Source Maps',
      description: 'Skip source map generation for production',
      code: `// Disable source maps completely
npx chaincss ./styles.jcss ./dist --no-source-map

// Output: only global.css (no .map file)`,
      output: `.btn { color: blue; }`
    },
    config: {
      title: 'Configure via Config File',
      description: 'Set source map options in chaincss.config.cjs',
      code: `// chaincss.config.cjs
module.exports = {
  prefixer: {
    // Enable source maps (default: true)
    sourceMap: true,
    
    // Use inline source maps (default: false)
    sourceMapInline: false
  },
  
  // Or for atomic CSS
  atomic: {
    enabled: true,
    // Source maps are controlled by prefixer settings
  }
};`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Source Maps</h1>
        <p className="docs-description">
          Debug your styles with source maps. Trace generated CSS back to your original .jcss files.
        </p>
      </div>
      
      {/* What are Source Maps */}
      <h2>What are Source Maps?</h2>
      <p>
        Source maps are files that map the generated CSS back to your original source code.
        When you open browser DevTools, you'll see your original <code className="inline-code">.jcss</code> files
        instead of the minified CSS.
      </p>
      
      <div className="tip">
         <strong>Why use source maps?</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Debug styles in your original source code</li>
          <li>See line numbers from your .jcss files in DevTools</li>
          <li>Easier to trace where styles come from</li>
          <li>Essential for development, optional for production</li>
        </ul>
      </div>
      
      {/* Visual Diagram */}
      <h2>How Source Maps Work</h2>
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px' }}>
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   styles.jcss   │────▶│   chaincss      │────▶│   global.css    │
│                 │     │                 │     │                 │
│ const btn = $() │     │   Compile       │     │ .btn {          │
│   .color('blue')│     │   Generate      │     │   color: blue;  │
│   .block('.btn');│     │   Source Map    │     │ }               │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │                        │
                               ▼                        ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │ global.css.map  │◀───│/*# sourceMapping│
                        │                 │     │   URL=... */   │
                        │ { version: 3,   │     └─────────────────┘
                        │   sources: [...],│
                        │   mappings: ... }│
                        └─────────────────┘`}
        </pre>
      </div>
      
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
          Basic Source Map
        </button>
        <button
          onClick={() => setActiveExample('inline')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'inline' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'inline' ? '#eef2ff' : 'white',
            color: activeExample === 'inline' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Inline Source Maps
        </button>
        <button
          onClick={() => setActiveExample('disabled')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'disabled' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'disabled' ? '#eef2ff' : 'white',
            color: activeExample === 'disabled' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Disabled Source Maps
        </button>
        <button
          onClick={() => setActiveExample('config')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'config' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'config' ? '#eef2ff' : 'white',
            color: activeExample === 'config' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Config File
        </button>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="bash" code={currentExample.code} />
        
        {currentExample.output && (
          <>
            <div className="tip" style={{ marginTop: '16px' }}>
              <strong>Output (global.css):</strong>
              <CodeBlock language="css" code={currentExample.output} />
            </div>
          </>
        )}
        
        {currentExample.map && (
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Output (global.css.map):</strong>
            <CodeBlock language="json" code={currentExample.map} />
          </div>
        )}
      </div>
      
      {/* CLI Options */}
      <h2>CLI Options</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Flag</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
              </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map</code></td>
              <td style={{ padding: '12px' }}>Generate external source map file</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
              <td style={{ padding: '12px' }}>Disable source map generation</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map-inline</code></td>
              <td style={{ padding: '12px' }}>Embed source map in CSS file</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map-inline</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Config Options */}
      <h2>Config File Options</h2>
      <CodeBlock language="javascript" code={`// chaincss.config.cjs
module.exports = {
  prefixer: {
    // Enable source map generation
    sourceMap: true,
    
    // Inline source maps (true = embed in CSS, false = separate .map file)
    sourceMapInline: false
  }
};`} />
      
      {/* Browser DevTools */}
      <h2>Using Source Maps in DevTools</h2>
      <p>
        Once source maps are generated, your browser's DevTools will automatically use them to show your original source code.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Chrome/Edge
          </h3>
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
            <li>Open DevTools (F12)</li>
            <li>Go to Sources tab</li>
            <li>Find your .jcss files under "webpack://"</li>
            <li>Click to see original source</li>
          </ol>
        </div>
        
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Firefox
          </h3>
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
            <li>Open DevTools (F12)</li>
            <li>Go to Debugger tab</li>
            <li>Look for .jcss files in the sources list</li>
            <li>Click to see original source</li>
          </ol>
        </div>
        
        <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Safari
          </h3>
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
            <li>Enable Develop menu (Preferences → Advanced)</li>
            <li>Open Web Inspector</li>
            <li>Go to Sources tab</li>
            <li>Find .jcss files in the file tree</li>
          </ol>
        </div>
      </div>
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Development:</strong> Keep source maps enabled for easier debugging</li>
          <li><strong>Production:</strong> Consider disabling source maps or using inline maps for smaller builds</li>
          <li><strong>CI/CD:</strong> Use <code className="inline-code">--no-source-map</code> in production pipelines to reduce build size</li>
          <li><strong>Debugging:</strong> Use <code className="inline-code">--source-map-inline</code> when you need a single file output</li>
          <li><strong>Security:</strong> Source maps expose your original source - consider not deploying them to production</li>
        </ul>
      </div>
      
      {/* Troubleshooting */}
      <h2>Troubleshooting</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
          <strong>Source maps not working in DevTools?</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Make sure source maps are enabled: <code className="inline-code">--source-map</code> flag</li>
            <li>Check that the .map file is accessible (same directory as CSS)</li>
            <li>Verify the sourceMappingURL comment is present in the CSS file</li>
            <li>In Chrome: Settings → Preferences → Enable JavaScript source maps</li>
          </ul>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
          <strong>Map file not being generated?</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Check that you have write permissions to the output directory</li>
            <li>Verify you're not using <code className="inline-code">--no-source-map</code></li>
            <li>Check if there are any errors in the terminal output</li>
          </ul>
        </div>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/configuration" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Configuration
        </a>
        <a href="/docs/atomic-css" style={{ color: '#667eea', textDecoration: 'none' }}>
          Atomic CSS →
        </a>
      </div>*/}
    </>
  );
}