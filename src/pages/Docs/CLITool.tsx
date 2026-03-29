import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function CLITool() {
  const [selectedMode, setSelectedMode] = useState('basic');
  
  const modes = {
    basic: {
      name: 'Basic Mode',
      command: 'npx chaincss ./styles.jcss ./dist',
      description: 'Default mode - generates only the essential CSS files',
      files: [
        { name: 'global.css', description: 'Main CSS file with all your styles', always: true },
        { name: 'global.css.map', description: 'Source map for debugging', always: true }
      ],
      totalFiles: '1-2',
      icon: ''
    },
    atomic: {
      name: 'Atomic Mode',
      command: 'npx chaincss ./styles.jcss ./dist --atomic',
      description: 'Enables atomic CSS optimization - generates additional utility files',
      files: [
        { name: 'global.css', description: 'Main CSS file with atomic utilities + component styles', always: true },
        { name: 'global.css.map', description: 'Source map for debugging', always: true },
        { name: 'global.map.json', description: 'Complete atomic class mapping data', always: true },
        { name: 'global.classes.js', description: 'JS module with class maps and helpers', always: true },
        { name: 'global.classes.d.ts', description: 'TypeScript definitions', always: true },
        { name: 'chaincss-manifest.json', description: 'Build manifest with metadata', always: true }
      ],
      totalFiles: '5-6',
      icon: ''
    },
    react: {
      name: 'Atomic + React',
      command: 'npx chaincss ./styles.jcss ./dist --atomic',
      description: 'Atomic mode with React framework output',
      config: `// chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    frameworkOutput: {
      react: true,
      vue: false,
      vanilla: true
    }
  }
};`,
      files: [
        { name: 'global.css', description: 'Main CSS file', always: true },
        { name: 'global.css.map', description: 'Source map', always: true },
        { name: 'global.map.json', description: 'Atomic mapping data', always: true },
        { name: 'global.classes.js', description: 'JS module with React helpers', always: true },
        { name: 'global.classes.d.ts', description: 'TypeScript definitions', always: true },
        { name: 'atomic.react.js', description: 'React hooks and components', always: true },
        { name: 'chaincss-manifest.json', description: 'Build manifest', always: true }
      ],
      totalFiles: '6-7',
      icon: ''
    },
    vue: {
      name: 'Atomic + Vue',
      command: 'npx chaincss ./styles.jcss ./dist --atomic',
      description: 'Atomic mode with Vue framework output',
      config: `// chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    frameworkOutput: {
      react: false,
      vue: true,
      vanilla: true
    }
  }
};`,
      files: [
        { name: 'global.css', description: 'Main CSS file', always: true },
        { name: 'global.css.map', description: 'Source map', always: true },
        { name: 'global.map.json', description: 'Atomic mapping data', always: true },
        { name: 'global.classes.js', description: 'JS module with Vue helpers', always: true },
        { name: 'global.classes.d.ts', description: 'TypeScript definitions', always: true },
        { name: 'atomic.vue.js', description: 'Vue composables', always: true },
        { name: 'chaincss-manifest.json', description: 'Build manifest', always: true }
      ],
      totalFiles: '6-7',
      icon: ''
    },
    both: {
      name: 'Atomic + React + Vue',
      command: 'npx chaincss ./styles.jcss ./dist --atomic',
      description: 'Full atomic mode with both React and Vue outputs',
      config: `// chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    frameworkOutput: {
      react: true,
      vue: true,
      vanilla: true
    }
  }
};`,
      files: [
        { name: 'global.css', description: 'Main CSS file', always: true },
        { name: 'global.css.map', description: 'Source map', always: true },
        { name: 'global.map.json', description: 'Atomic mapping data', always: true },
        { name: 'global.classes.js', description: 'JS module with unified helpers', always: true },
        { name: 'global.classes.d.ts', description: 'TypeScript definitions', always: true },
        { name: 'atomic.react.js', description: 'React hooks and components', always: true },
        { name: 'atomic.vue.js', description: 'Vue composables', always: true },
        { name: 'chaincss-manifest.json', description: 'Build manifest', always: true }
      ],
      totalFiles: '7-8',
      icon: ''
    }
  };
  
  const currentMode = modes[selectedMode];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">CLI Tool</h1>
        <p className="docs-description">
          The ChainCSS CLI is the primary way to compile your styles. It's fast, configurable, and works with any project.
        </p>
      </div>
      
      {/* Basic Usage */}
      <h2>Basic Usage</h2>
      <CodeBlock language="bash" code={`# Compile styles.jcss to CSS
npx chaincss ./styles.jcss ./dist

# Watch mode - rebuild on file changes
npx chaincss ./styles.jcss ./dist --watch

# Enable atomic CSS optimization
npx chaincss ./styles.jcss ./dist --atomic --watch`} />
      
      {/* File Generation Explorer */}
      <h2>File Generation Explorer</h2>
      <p>
        The number of output files depends on which CLI flags and config options you enable.
        Select a mode below to see what files are generated:
      </p><br />
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setSelectedMode('basic')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: selectedMode === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: selectedMode === 'basic' ? '#eef2ff' : 'white',
            color: selectedMode === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer',
            fontWeight: selectedMode === 'basic' ? '500' : 'normal'
          }}
        >
          Basic Mode (1-2 files)
        </button>
        <button
          onClick={() => setSelectedMode('atomic')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: selectedMode === 'atomic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: selectedMode === 'atomic' ? '#eef2ff' : 'white',
            color: selectedMode === 'atomic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Atomic Mode (5-6 files)
        </button>
        <button
          onClick={() => setSelectedMode('react')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: selectedMode === 'react' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: selectedMode === 'react' ? '#eef2ff' : 'white',
            color: selectedMode === 'react' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          React (6-7 files)
        </button>
        <button
          onClick={() => setSelectedMode('vue')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: selectedMode === 'vue' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: selectedMode === 'vue' ? '#eef2ff' : 'white',
            color: selectedMode === 'vue' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
           Vue (6-7 files)
        </button>
        <button
          onClick={() => setSelectedMode('both')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: selectedMode === 'both' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: selectedMode === 'both' ? '#eef2ff' : 'white',
            color: selectedMode === 'both' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          React + Vue (7-8 files)
        </button>
      </div>
      
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '16px 20px',
          color: 'white',
          fontFamily: 'monospace'
        }}>
          <span style={{ color: '#94a3b8' }}>$</span> {currentMode.command}
        </div>
        
        {currentMode.config && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>With config:</div>
            <CodeBlock language="javascript" code={currentMode.config} />
          </div>
        )}
        
        <div style={{ padding: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '24px' }}>{currentMode.icon}</span>
            <span style={{ fontWeight: '600' }}>{currentMode.name}</span>
            <span style={{ 
              backgroundColor: '#eef2ff', 
              color: '#667eea', 
              padding: '2px 8px', 
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {currentMode.totalFiles} files
            </span>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div className="tip" style={{ marginBottom: '16px' }}>
              <strong>Generated Files:</strong>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '8px'
            }}>
              {currentMode.files.map(file => (
                <div key={file.name} style={{
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '20px' }}></span>
                  <div>
                    <div style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '13px' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {file.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* File Generation Flowchart */}
      <h2>File Generation Flowchart</h2>
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '32px',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowX: 'auto'
      }}>
        <pre style={{ margin: 0, whiteSpace: 'pre' }}>
{`npx chaincss input.jcss ./output
                │
                ▼
         ┌─────────────┐
         │ Base Files  │ ← ALWAYS generated (1-2 files)
         └─────────────┘
                │
                ▼
         Is --atomic flag present?
                │
        ┌───────┴───────┐
        ▼               ▼
       YES             NO
        │               │
        ▼               ▼
  Atomic Files     STOP (only base files)
  (4+ files)
        │
        ▼
  Are framework outputs enabled?
        │
    ┌───┴───┐
    ▼       ▼
   YES     NO
    │       │
    ▼       ▼
Framework  STOP
Files     (atomic files only)`}
        </pre>
      </div>
      
      {/* Complete File Generation Table */}
      <h2>Complete File Generation Table</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>CLI Command</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Files Generated</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">npx chaincss input.jcss ./output</code></td>
              <td style={{ padding: '12px' }}><code className="inline-code">global.css</code> + <code className="inline-code">global.css.map</code></td>
              <td style={{ padding: '12px' }}>1-2</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">npx chaincss input.jcss ./output --atomic</code></td>
              <td style={{ padding: '12px' }}>Base files + Atomic files (map.json, classes.js, classes.d.ts, manifest)</td>
              <td style={{ padding: '12px' }}>5-6</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic + React config</code></td>
              <td style={{ padding: '12px' }}>Atomic files + <code className="inline-code">atomic.react.js</code></td>
              <td style={{ padding: '12px' }}>6-7</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic + Vue config</code></td>
              <td style={{ padding: '12px' }}>Atomic files + <code className="inline-code">atomic.vue.js</code></td>
              <td style={{ padding: '12px' }}>6-7</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic + React + Vue config</code></td>
              <td style={{ padding: '12px' }}>Atomic files + <code className="inline-code">atomic.react.js</code> + <code className="inline-code">atomic.vue.js</code></td>
              <td style={{ padding: '12px' }}>7-8</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* CLI Options Reference */}
      <h2>CLI Options Reference</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Flag</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--watch</code></td>
              <td style={{ padding: '12px' }}>Watch for file changes and rebuild automatically</td>
              <td style={{ padding: '12px' }}><code className="inline-code">npx chaincss input.jcss output/ --watch</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic</code></td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
              <td style={{ padding: '12px' }}><code className="inline-code">npx chaincss input.jcss output/ --atomic</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-mode</code></td>
              <td style={{ padding: '12px' }}>Atomic mode: 'atomic', 'standard', or 'hybrid'</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-mode atomic</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-naming</code></td>
              <td style={{ padding: '12px' }}>Class naming: 'hash' or 'readable'</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-naming readable</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-verbose</code></td>
              <td style={{ padding: '12px' }}>Show detailed atomic optimization stats</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-verbose</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--preserve-selectors</code></td>
              <td style={{ padding: '12px' }}>Keep original selector names in comments for debugging</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--preserve-selectors</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
              <td style={{ padding: '12px' }}>Disable source map generation</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-prefix</code></td>
              <td style={{ padding: '12px' }}>Disable autoprefixer</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-prefix</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Quick Summary */}
      <div className="note">
        <strong>Quick Summary</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Basic:</strong> <code className="inline-code">chaincss input output</code> → 1-2 files</li>
          <li><strong>Atomic:</strong> <code className="inline-code">chaincss input output --atomic</code> → 5-6 files</li>
          <li><strong>Atomic + React:</strong> <code className="inline-code">--atomic</code> + React config → 6-7 files</li>
          <li><strong>Atomic + Vue:</strong> <code className="inline-code">--atomic</code> + Vue config → 6-7 files</li>
          <li><strong>Atomic + Both:</strong> <code className="inline-code">--atomic</code> + React + Vue config → 7-8 files</li>
        </ul>
      </div>
      
      <div className="tip">
        <strong>Pro tip:</strong> The <code className="inline-code">--atomic</code> flag is the main trigger for generating atomic files.
        Framework files are optional extras that only appear when explicitly enabled in the config.
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