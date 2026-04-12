import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Configuration() {
  const [activeTab, setActiveTab] = useState('atomic');
  
  const configExamples = {
    atomic: {
      title: 'Atomic CSS Configuration',
      description: 'Configure atomic CSS optimization behavior',
      code: `// chaincss.config.js
export default {
  atomic: {
    enabled: true,
    threshold: 3,
    naming: 'hash',
    cache: true,
    cachePath: './.chaincss-cache',
    minify: true,
    mode: 'hybrid',
    outputStrategy: 'component-first',
    verbose: false
  }
};`
    },
    prefixer: {
      title: 'Autoprefixer Configuration',
      description: 'Configure CSS vendor prefixing',
      code: `// chaincss.config.js
export default {
  prefixer: {
    enabled: true,
    mode: 'auto',
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    sourceMap: true
  }
};`
    },
    breakpoints: {
      title: 'Responsive Breakpoints',
      description: 'Configure custom responsive breakpoints',
      code: `// chaincss.config.js
export default {
  breakpoints: {
    sm: '(max-width: 640px)',
    md: '(min-width: 641px) and (max-width: 768px)',
    lg: '(min-width: 769px) and (max-width: 1024px)',
    xl: '(min-width: 1025px)',
    '2xl': '(min-width: 1280px)',
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  }
};`
    },
    full: {
      title: 'Complete Configuration',
      description: 'All configuration options together',
      code: `// chaincss.config.js
export default {
  inputs: ['src/**/*.chain.js', 'src/**/*.chain.ts'],
  output: 'dist/styles',
  
  tokens: {
    enabled: true,
    prefix: 'chain'
  },
  
  atomic: {
    enabled: false,
    threshold: 3,
    naming: 'hash',
    cache: true,
    cachePath: './.chaincss-cache',
    minify: true,
    mode: 'hybrid',
    outputStrategy: 'component-first',
    verbose: false
  },
  
  prefixer: {
    enabled: true,
    mode: 'auto',
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    sourceMap: true
  },
  
  output: {
    cssFile: 'styles.css',
    classMapFile: 'class-map.json',
    typesFile: 'classes.d.ts',
    minify: true,
    generateGlobalCSS: true
  },
  
  breakpoints: {
    sm: '(max-width: 640px)',
    md: '(min-width: 641px) and (max-width: 768px)',
    lg: '(min-width: 769px) and (max-width: 1024px)',
    xl: '(min-width: 1025px)',
    '2xl': '(min-width: 1280px)',
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  },
  
  debug: false,
  sourceComments: true,
  timeline: false,
  framework: 'auto',
  namespace: 'chain',
  watch: false,
  verbose: false
};`
    }
  };
  
  const currentConfig = configExamples[activeTab];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Configuration</h1>
        <p className="docs-description">
          Customize ChainCSS behavior with a simple configuration file. The config is optional - sensible defaults work out of the box.
        </p>
      </div>
      
      <h2>Configuration File Location</h2>
      <p>
        ChainCSS looks for <code className="inline-code">chaincss.config.js</code> in your project root.
        You can create it manually or run:
      </p>
      <CodeBlock language="bash" code={`# Create basic config file
npx chaincss init

# Create full config with all options
npx chaincss init --full`} />
      
      <h2>Configuration Options</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('atomic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'atomic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'atomic' ? '#eef2ff' : 'white',
            color: activeTab === 'atomic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Atomic CSS
        </button>
        <button
          onClick={() => setActiveTab('prefixer')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'prefixer' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'prefixer' ? '#eef2ff' : 'white',
            color: activeTab === 'prefixer' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Autoprefixer
        </button>
        <button
          onClick={() => setActiveTab('breakpoints')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'breakpoints' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'breakpoints' ? '#eef2ff' : 'white',
            color: activeTab === 'breakpoints' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Breakpoints
        </button>
        <button
          onClick={() => setActiveTab('full')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'full' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'full' ? '#eef2ff' : 'white',
            color: activeTab === 'full' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Full Config
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentConfig.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentConfig.description}
        </p>
        <CodeBlock language="javascript" code={currentConfig.code} />
      </div>
      
      <h2>Configuration Reference</h2>
      
      <h3>Atomic CSS Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">enabled</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>false</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Enable atomic CSS optimization</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">threshold</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>number</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>3</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Minimum usage count for atomic conversion</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">naming</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'hash' | 'readable'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'hash'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Class naming scheme</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'hybrid' | 'atomic' | 'standard'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'hybrid'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Atomic mode behavior</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">outputStrategy</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'component-first' | 'utility-first'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'component-first'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>CSS output strategy</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Prefixer Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">enabled</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>true</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Enable autoprefixer</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'auto' | 'full' | 'lightweight'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>'auto'</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Prefixer mode</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">browsers</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>array</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>[&gt; 0.5%, last 2 versions, not dead]</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Browser targets</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">sourceMap</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>boolean</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>true</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Generate source maps</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Breakpoint Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Breakpoint</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Default Query</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', backgroundColor: '#f8fafc' }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">sm</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(max-width: 640px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.sm((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">md</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(min-width: 641px) and (max-width: 768px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.md((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">lg</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(min-width: 769px) and (max-width: 1024px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.lg((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">xl</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(min-width: 1025px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.xl((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">mobile</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(max-width: 768px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.mobile((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">tablet</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(min-width: 769px) and (max-width: 1024px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.tablet((css) ={'>'} css...)</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">desktop</code></td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>(min-width: 1025px)</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code className="inline-code">.desktop((css) ={'>'} css...)</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="tip">
        <strong>Pro tip:</strong> Use <code className="inline-code">npx chaincss init --full</code> to generate a configuration file with all available options documented.
      </div>
    </>
  );
}