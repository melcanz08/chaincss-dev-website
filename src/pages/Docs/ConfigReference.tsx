import CodeBlock from '../../components/CodeBlock';

export default function ConfigReference() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Configuration Reference</h1>
        <p className="docs-description">
          Complete reference for chaincss.config.cjs options.
        </p>
      </div>
      
      <h2>Configuration File</h2>
      <p>
        ChainCSS looks for <code className="inline-code">chaincss.config.cjs</code> in your project root.
        If it doesn't exist, it's automatically created with default settings.
      </p>
      <CodeBlock language="bash" code={`npx chaincss ./styles.jcss ./dist
# Created: chaincss.config.cjs`} />
      
      <h2>Full Configuration Example</h2>
      <CodeBlock language="javascript" code={`// chaincss.config.cjs
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
    outputStrategy: 'component-first',
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
    verbose: false
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
  }
};`} />
      
      <h2>Option Reference</h2>
      
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
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">alwaysAtomic</code></td>
              <td style={{ padding: '12px' }}>string[]</td>
              <td style={{ padding: '12px' }}>[]</td>
              <td style={{ padding: '12px' }}>Force these properties to be atomic</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">neverAtomic</code></td>
              <td style={{ padding: '12px' }}>string[]</td>
              <td style={{ padding: '12px' }}>[content, animation, ...]</td>
              <td style={{ padding: '12px' }}>Never make these properties atomic</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">frameworkOutput.react</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Generate React hooks and components</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">frameworkOutput.vue</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Generate Vue composables</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">verbose</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Show detailed atomic optimization stats</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Autoprefixer Options</h3>
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
              <td style={{ padding: '12px' }}>string[]</td>
              <td style={{ padding: '12px' }}>[&gt; 0.5%, last 2 versions, not dead]</td>
              <td style={{ padding: '12px' }}>Browser targets for autoprefixer</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">sourceMap</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>true</td>
              <td style={{ padding: '12px' }}>Generate source maps</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">sourceMapInline</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}>Inline source maps in CSS file</td>
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
      
      <h2>CLI Overrides</h2>
      <p>Configuration options can be overridden via CLI flags:</p>
      <CodeBlock language="bash" code={`# Override atomic settings
npx chaincss ./styles.jcss ./dist --atomic --atomic-threshold 2 --atomic-naming readable

# Override prefixer settings
npx chaincss ./styles.jcss ./dist --prefixer-mode always --browsers "> 1%, last 3 versions"`} />
      
      <div className="tip">
        <strong>Pro tip:</strong> CLI flags take precedence over config file settings.
      </div>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/cli-reference" style={{ color: '#667eea', textDecoration: 'none' }}>← CLI Reference</a>
        <a href="/docs/troubleshooting" style={{ color: '#667eea', textDecoration: 'none' }}>Troubleshooting →</a>
      </div>*/}
    </>
  );
}