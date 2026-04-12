import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function CLITool() {
  const [selectedMode, setSelectedMode] = useState('basic');
  
  const modes = {
    basic: {
      name: 'Basic Mode',
      command: 'npx chaincss build',
      description: 'Default mode - generates CSS files in the styles folder next to your components',
      files: [
        { name: 'component.css', description: 'Individual CSS files for each component', always: true },
        { name: 'component.class.js', description: 'Class name exports for each component', always: true },
        { name: 'global.css', description: 'Combined minified CSS for production', always: true }
      ],
      totalFiles: '2 per component + 1 global'
    },
    atomic: {
      name: 'Atomic Mode',
      command: 'npx chaincss build --atomic',
      description: 'Enables atomic CSS optimization - generates additional utility classes',
      files: [
        { name: 'component.css', description: 'Component CSS with atomic utilities', always: true },
        { name: 'component.class.js', description: 'Class name exports', always: true },
        { name: 'global.css', description: 'Combined minified CSS', always: true },
        { name: 'atomic-stats.json', description: 'Atomic CSS optimization statistics', always: true }
      ],
      totalFiles: '2 per component + 2 global'
    },
    react: {
      name: 'React Mode',
      command: 'npx chaincss build',
      description: 'Build mode works with any framework - imports generated class names',
      config: `// chaincss.config.js
export default {
  inputs: ['src/**/*.chain.js'],
  output: 'src',
  verbose: true
};`,
      files: [
        { name: 'component.css', description: 'Component CSS', always: true },
        { name: 'component.class.js', description: 'Class name exports for React', always: true },
        { name: 'global.css', description: 'Combined minified CSS', always: true }
      ],
      totalFiles: '2 per component + 1 global'
    },
    vue: {
      name: 'Vue Mode',
      command: 'npx chaincss build',
      description: 'Build mode works with any framework - imports generated class names',
      config: `// chaincss.config.js
export default {
  inputs: ['src/**/*.chain.js'],
  output: 'src',
  verbose: true
};`,
      files: [
        { name: 'component.css', description: 'Component CSS', always: true },
        { name: 'component.class.js', description: 'Class name exports for Vue', always: true },
        { name: 'global.css', description: 'Combined minified CSS', always: true }
      ],
      totalFiles: '2 per component + 1 global'
    },
    both: {
      name: 'Full Mode',
      command: 'npx chaincss build --timeline',
      description: 'Build with timeline tracking for style debugging',
      config: `// chaincss.config.js
export default {
  inputs: ['src/**/*.chain.js'],
  output: 'src',
  timeline: true,
  verbose: true
};`,
      files: [
        { name: 'component.css', description: 'Component CSS', always: true },
        { name: 'component.class.js', description: 'Class name exports', always: true },
        { name: 'global.css', description: 'Combined minified CSS', always: true },
        { name: '.chaincss-timeline.json', description: 'Style change timeline data', always: true }
      ],
      totalFiles: '2 per component + 2 global'
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
      
      <h2>Basic Usage</h2>
      <CodeBlock language="bash" code={`# Initialize a configuration file
npx chaincss init

# Initialize with full configuration
npx chaincss init --full

# Build all styles from config
npx chaincss build

# Build with specific pattern
npx chaincss build -c "src/**/*.chain.js"

# Watch mode - rebuild on file changes
npx chaincss watch

# Clean generated files
npx chaincss clean

# Build with timeline tracking
npx chaincss build --timeline`} />
      
      <h2>File Generation Explorer</h2>
      <p>
        ChainCSS v2 generates files in the styles folder next to each component.
        Select a mode below to see what files are generated:
      </p>
      
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
          Basic Mode
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
          Atomic Mode
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
          React Mode
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
          Vue Mode
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
          Full Mode (Timeline)
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
            <span style={{ fontWeight: '600' }}>{currentMode.name}</span>
            <span style={{ 
              backgroundColor: '#eef2ff', 
              color: '#667eea', 
              padding: '2px 8px', 
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {currentMode.totalFiles}
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
      
      <h2>File Structure</h2>
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
{`src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── styles/
│           ├── button.chain.js    # Source styles
│           ├── button.class.js    # Generated class names
│           └── button.css         # Generated CSS
├── global-style/
│   ├── global.chain.js             # Global styles source
│   └── global.css                  # Combined minified CSS
└── chaincss.config.js              # Configuration file`}
        </pre>
      </div>
      
      <h2>CLI Options Reference</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Command</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">init</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Create configuration file</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss init --full</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">build</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Build all styles from configuration</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss build</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">watch</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Watch for file changes and rebuild</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss watch</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">clean</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Remove generated files</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss clean</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">-c, --components</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Components pattern (glob)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">-c "src/**/*.chain.js"</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">-t, --timeline</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Enable style timeline tracking</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss build --timeline</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">-v, --verbose</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Verbose output</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">npx chaincss build --verbose</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="note">
        <strong>Quick Summary</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Basic:</strong> <code className="inline-code">npx chaincss build</code> → Generates CSS files next to each component</li>
          <li><strong>Watch:</strong> <code className="inline-code">npx chaincss watch</code> → Auto-rebuild on changes</li>
          <li><strong>Timeline:</strong> <code className="inline-code">npx chaincss build --timeline</code> → Track style changes</li>
          <li><strong>Clean:</strong> <code className="inline-code">npx chaincss clean</code> → Remove generated files</li>
        </ul>
      </div>
      
      <div className="tip">
        <strong>Pro tip:</strong> Use <code className="inline-code">npx chaincss init --full</code> to generate a configuration file with all available options documented.
      </div>
    </>
  );
}