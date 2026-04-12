import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function SourceMaps() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Source Map',
      description: 'Generate source maps for debugging',
      code: `# chaincss.config.js
export default {
  prefixer: {
    sourceMap: true
  }
};

# Run ChainCSS build
npx chaincss build`,
      output: `/*# sourceMappingURL=global.css.map */`,
      map: `{
  "version": 3,
  "sources": ["src/components/Button/styles/button.chain.js"],
  "names": [],
  "mappings": "AAAA;EACE,gBAAgB;EAChB,UAAU;EACV,aAAa;AACf",
  "file": "global.css",
  "sourcesContent": ["export const btn = $\\n  .bg('blue')\\n  .$el('.btn');"]
}`
    },
    inline: {
      title: 'Inline Source Maps',
      description: 'Embed source map directly in CSS file',
      code: `# chaincss.config.js
export default {
  prefixer: {
    sourceMap: true,
    sourceMapInline: true
  }
};

npx chaincss build`,
      output: `/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL0J1dHRvbi9zdHlsZXMvYnV0dG9uLmNoYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixhQUFhO0FBQ2YiLCJmaWxlIjoiZ2xvYmFsLmNzcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBidG4gPSAkXFxuICAuYmcoJ2JsdWUnKVxcbiAgLiRlbCgnLmJ0bicpOyJdfQ== */`
    },
    disabled: {
      title: 'Disable Source Maps',
      description: 'Skip source map generation for production',
      code: `# chaincss.config.js
export default {
  prefixer: {
    sourceMap: false
  }
};

npx chaincss build`,
      output: `.btn { background-color: blue; }`
    },
    config: {
      title: 'Configure via Config File',
      description: 'Set source map options in chaincss.config.js',
      code: `// chaincss.config.js
export default {
  prefixer: {
    sourceMap: true,
    sourceMapInline: false
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
          Debug your styles with source maps. Trace generated CSS back to your original .chain.js files.
        </p>
      </div>
      
      <h2>What are Source Maps?</h2>
      <p>
        Source maps are files that map the generated CSS back to your original source code.
        When you open browser DevTools, you'll see your original <code className="inline-code">.chain.js</code> files
        instead of the minified CSS.
      </p>
      
      <div className="tip">
        <strong>Why use source maps?</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Debug styles in your original source code</li>
          <li>See line numbers from your .chain.js files in DevTools</li>
          <li>Easier to trace where styles come from</li>
          <li>Essential for development, optional for production</li>
        </ul>
      </div>
      
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
{`┌─────────────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   button.chain.js       │────▶│   chaincss      │────▶│   button.css    │
│                         │     │                 │     │                 │
│ export const btn = $    │     │   Build         │     │ .btn {          │
│   .bg('blue')           │     │   Generate      │     │   background:   │
│   .$el('.btn')          │     │   Source Map    │     │   blue;         │
└─────────────────────────┘     └─────────────────┘     │ }               │
               │                        │               └─────────────────┘
               │                        │                        │
               ▼                        ▼                        ▼
        ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
        │ button.chain.js │     │ button.css.map  │◀───│/*# sourceMapping│
        │ (source)        │     │                 │     │   URL=... */   │
        └─────────────────┘     │ { version: 3,   │     └─────────────────┘
                                │   sources: [...],│
                                │   mappings: ... }│
                                └─────────────────┘`}
        </pre>
      </div>
      
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
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Output (global.css):</strong>
            <CodeBlock language="css" code={currentExample.output} />
          </div>
        )}
        
        {currentExample.map && (
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Output (global.css.map):</strong>
            <CodeBlock language="json" code={currentExample.map} />
          </div>
        )}
      </div>
      
      <h2>CLI Options</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Config Option</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">sourceMap</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Generate source map file</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>true</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">sourceMapInline</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Embed source map in CSS file</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>false</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Config File Options</h2>
      <CodeBlock language="javascript" code={`// chaincss.config.js
export default {
  prefixer: {
    sourceMap: true,
    sourceMapInline: false
  }
};`} />
      
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
            <li>Find your .chain.js files under "webpack://"</li>
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
            <li>Look for .chain.js files in the sources list</li>
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
            <li>Find .chain.js files in the file tree</li>
          </ol>
        </div>
      </div>
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Development:</strong> Keep source maps enabled for easier debugging</li>
          <li><strong>Production:</strong> Consider disabling source maps for smaller builds</li>
          <li><strong>CI/CD:</strong> Set <code className="inline-code">sourceMap: false</code> in production pipelines</li>
          <li><strong>Security:</strong> Source maps expose your original source - consider not deploying them to production</li>
        </ul>
      </div>
      
      <h2>Troubleshooting</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
          <strong>Source maps not working in DevTools?</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Make sure source maps are enabled: <code className="inline-code">sourceMap: true</code></li>
            <li>Check that the .map file is accessible (same directory as CSS)</li>
            <li>Verify the sourceMappingURL comment is present in the CSS file</li>
            <li>In Chrome: Settings → Preferences → Enable JavaScript source maps</li>
          </ul>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
          <strong>Map file not being generated?</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li>Check that you have write permissions to the output directory</li>
            <li>Verify you're not using <code className="inline-code">sourceMap: false</code></li>
            <li>Check if there are any errors in the terminal output</li>
          </ul>
        </div>
      </div>
    </>
  );
}