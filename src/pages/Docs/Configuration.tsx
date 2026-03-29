import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Configuration() {
  const [activeTab, setActiveTab] = useState('atomic');
  
  const configExamples = {
    atomic: {
      title: 'Atomic CSS Configuration',
      description: 'Configure atomic CSS optimization behavior',
      code: `// chaincss.config.cjs
module.exports = {
  atomic: {
    // Enable/disable atomic CSS optimization
    enabled: true,
    
    // Minimum usage count for atomic conversion
    // Properties used less than this stay as standard CSS
    threshold: 3,
    
    // Class naming scheme
    // 'hash' → c_3b82f6 (short, guaranteed unique)
    // 'readable' → bg-blue-500 (human-readable)
    naming: 'hash',
    
    // Cache atomic classes between builds for faster compilation
    cache: true,
    cachePath: './.chaincss-cache',
    
    // Minify the generated CSS
    minify: true,
    
    // Atomic mode behavior
    // 'atomic' → Only atomic utilities (no fallback CSS)
    // 'standard' → No atomic optimization, just tracking
    // 'hybrid' → Atomic utilities + fallback CSS (recommended)
    mode: 'hybrid',
    
    // Force these properties to ALWAYS be atomic
    alwaysAtomic: ['margin', 'padding', 'color'],
    
    // Never make these properties atomic (keep as standard CSS)
    neverAtomic: [
      'content', 'animation', 'transition', 'keyframes',
      'counterIncrement', 'counterReset'
    ],
    
    // Framework-specific output files
    frameworkOutput: {
      react: false,    // Generate atomic.react.js with React hooks
      vue: false,      // Generate atomic.vue.js with Vue composables
      vanilla: true    // Generate global.classes.js (always useful)
    },
    
    // Keep original selector names in CSS comments (for debugging)
    preserveSelectors: false,
    
    // Show detailed atomic optimization statistics in console
    verbose: false
  }
};`
    },
    prefixer: {
      title: 'Autoprefixer Configuration',
      description: 'Configure CSS vendor prefixing',
      code: `// chaincss.config.cjs
module.exports = {
  prefixer: {
    // Enable/disable autoprefixer
    enabled: true,
    
    // Prefixer mode
    // 'auto' → Only add prefixes when needed
    // 'always' → Always add vendor prefixes
    // 'never' → Never add vendor prefixes
    mode: 'auto',
    
    // Browser targets for autoprefixer
    // See: https://browserslist.dev
    browsers: [
      '> 0.5%',              // Global usage > 0.5%
      'last 2 versions',     // Last 2 versions of each browser
      'not dead'             // Exclude dead browsers
    ],
    
    // Generate source maps
    sourceMap: true,
    
    // Inline source maps in CSS file
    sourceMapInline: false
  }
};`
    },
    security: {
      title: 'Security Configuration',
      description: 'Configure security settings for untrusted code',
      code: `// chaincss.config.cjs
module.exports = {
  security: {
    // Security mode
    // 'auto' → Auto-detect and use safest mode
    // 'static' → Only static parsing (no code execution)
    // 'dynamic' → Allow code execution (current behavior)
    mode: 'auto',
    
    // Allow fallback to dynamic mode when needed
    allowDynamic: true,
    
    // Show warning when using dynamic mode
    warnOnDynamic: true,
    
    // Block dynamic mode entirely (fail on dynamic code)
    strict: false,
    
    // Timeout for dynamic execution (milliseconds)
    timeout: 5000,
    
    // Memory limit for dynamic execution (MB)
    memoryLimit: 128
  }
};`
    },
    full: {
      title: 'Complete Configuration',
      description: 'All configuration options together',
      code: `// chaincss.config.cjs
// Complete ChainCSS Configuration
// Generated: ${new Date().toISOString()}

module.exports = {
  // ========== ATOMIC CSS OPTIONS ==========
  atomic: {
    enabled: false,
    threshold: 3,
    naming: 'hash',
    cache: true,
    cachePath: './.chaincss-cache',
    minify: true,
    mode: 'hybrid',
    alwaysAtomic: [],
    neverAtomic: [
      'content', 'animation', 'transition', 'keyframes',
      'counterIncrement', 'counterReset'
    ],
    frameworkOutput: {
      react: false,
      vue: false,
      vanilla: true
    },
    preserveSelectors: false,
    verbose: false,
    outputStrategy: 'component-first'
  },
  
  // ========== AUTOPREFIXER OPTIONS ==========
  prefixer: {
    enabled: true,
    mode: 'auto',
    browsers: ['> 0.5%', 'last 2 versions', 'not dead'],
    sourceMap: true,
    sourceMapInline: false
  },
  
  // ========== SECURITY OPTIONS ==========
  security: {
    mode: 'auto',
    allowDynamic: true,
    warnOnDynamic: true,
    strict: false,
    timeout: 5000,
    memoryLimit: 128
  },
  
  // ========== RESPONSIVE BREAKPOINTS ==========
  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  }
};`
    }
  };
  
  const currentConfig = configExamples[activeTab];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Configuration</h1>
        <p className="docs-description">
          Customize ChainCSS behavior with a simple configuration file. The config is automatically created on first run.
        </p>
      </div>
      
      {/* Config File Location */}
      <h2>Configuration File Location</h2>
      <p>
        ChainCSS looks for <code className="inline-code">chaincss.config.cjs</code> in your project root.
        If it doesn't exist, it's automatically created with default settings.
      </p>
      <CodeBlock language="bash" code={`# Config file is created automatically
npx chaincss ./styles.jcss ./dist
# Created: chaincss.config.cjs`} />
      
      {/* Config Tabs */}
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
          onClick={() => setActiveTab('security')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'security' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeTab === 'security' ? '#eef2ff' : 'white',
            color: activeTab === 'security' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Security
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
      
      {/* Configuration Reference Table */}
      <h2>Configuration Reference</h2>
      
      <h3>Atomic CSS Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
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
              <td style={{ padding: '12px' }}><code className="inline-code">enabled</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">threshold</code></td>
              <td style={{ padding: '12px' }}>number</td>
              <td style={{ padding: '12px' }}>3</td>
              <td style={{ padding: '12px' }}>Minimum usage count for atomic conversion</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">naming</code></td>
              <td style={{ padding: '12px' }}>'hash' | 'readable'</td>
              <td style={{ padding: '12px' }}>'hash'</td>
              <td style={{ padding: '12px' }}>Class naming scheme</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px' }}>'atomic' | 'standard' | 'hybrid'</td>
              <td style={{ padding: '12px' }}>'hybrid'</td>
              <td style={{ padding: '12px' }}>Atomic mode behavior</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">outputStrategy</code></td>
              <td style={{ padding: '12px' }}>'component-first' | 'utility-first'</td>
              <td style={{ padding: '12px' }}>'component-first'</td>
              <td style={{ padding: '12px' }}>CSS output strategy</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Prefixer Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
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
              <td style={{ padding: '12px' }}><code className="inline-code">enabled</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Enable autoprefixer</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px' }}>'auto' | 'always' | 'never'</td>
              <td style={{ padding: '12px' }}>'auto'</td>
              <td style={{ padding: '12px' }}>Prefixer mode</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">browsers</code></td>
              <td style={{ padding: '12px' }}>array</td>
              <td style={{ padding: '12px' }}>[&gt; 0.5%, last 2 versions, not dead]</td>
              <td style={{ padding: '12px' }}>Browser targets</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">sourceMap</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Generate source maps</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Security Options</h3>
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
              <td style={{ padding: '12px' }}><code className="inline-code">mode</code></td>
              <td style={{ padding: '12px' }}>'auto' | 'static' | 'dynamic'</td>
              <td style={{ padding: '12px' }}>'auto'</td>
              <td style={{ padding: '12px' }}>Security mode</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">allowDynamic</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Allow fallback to dynamic mode</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">strict</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Block dynamic mode entirely</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* CLI Overrides */}
      <h2>CLI Overrides</h2>
      <p>
        Configuration options can be overridden via CLI flags. This is useful for one-off builds or CI/CD pipelines.
      </p>
      <CodeBlock language="bash" code={`# Override atomic settings
npx chaincss ./styles.jcss ./dist --atomic --atomic-threshold 2 --atomic-naming readable

# Override prefixer settings
npx chaincss ./styles.jcss ./dist --prefixer-mode always --browsers "> 1%, last 3 versions"

# Enable verbose mode for debugging
npx chaincss ./styles.jcss ./dist --atomic-verbose

# Security mode overrides
npx chaincss ./styles.jcss ./dist --security-mode static --strict`} />
      
      <div className="tip">
        <strong>Pro tip:</strong> CLI flags take precedence over config file settings.
        This is great for testing different configurations without editing the config file.
      </div>
      
      {/* Environment Variables */}
      <h2>Environment Variables</h2>
      <p>
        ChainCSS also supports environment variables for certain settings:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Variable</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
             </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">CHAINCSS_SKIP_CONFIG</code></td>
              <td style={{ padding: '12px' }}>Skip automatic config file creation</td>
              <td style={{ padding: '12px' }}><code className="inline-code">CHAINCSS_SKIP_CONFIG=1 npx chaincss ...</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">CHAINCSS_VERBOSE</code></td>
              <td style={{ padding: '12px' }}>Enable verbose logging</td>
              <td style={{ padding: '12px' }}><code className="inline-code">CHAINCSS_VERBOSE=1 npx chaincss ...</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">NODE_ENV</code></td>
              <td style={{ padding: '12px' }}>Affects default settings (production = minified)</td>
              <td style={{ padding: '12px' }}><code className="inline-code">NODE_ENV=production npx chaincss ...</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/atomic-css" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Atomic CSS
        </a>
        <a href="/docs/source-maps" style={{ color: '#667eea', textDecoration: 'none' }}>
          Source Maps →
        </a>
      </div>*/}
    </>
  );
}