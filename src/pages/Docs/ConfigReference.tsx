import CodeBlock from '../../components/CodeBlock';

export default function ConfigReference() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Configuration Reference</h1>
        <p className="docs-description">
          Complete reference for chaincss.config.js options.
        </p>
      </div>
      
      <h2>Configuration File</h2>
      <p>
        ChainCSS looks for <code className="inline-code">chaincss.config.js</code> in your project root.
        You can create it manually or run:
      </p>
      <CodeBlock language="bash" code={`npx chaincss init
npx chaincss init --full    # Create full configuration with all options`} />
      
      <h2>Full Configuration Example</h2>
      <CodeBlock language="javascript" code={`// chaincss.config.js
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
};`} />
      
      <h2>Option Reference</h2>
      
      <h3>Input/Output Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">inputs</code></div>
            <div style={{ padding: '12px' }}>string[]</div>
            <div style={{ padding: '12px' }}>File patterns to process</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">output</code></div>
            <div style={{ padding: '12px' }}>string</div>
            <div style={{ padding: '12px' }}>Output directory for generated files</div>
          </div>
        </div>
      </div>
      
      <h3>Atomic CSS Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">enabled</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Enable atomic CSS optimization</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">threshold</code></div>
            <div style={{ padding: '12px' }}>number</div>
            <div style={{ padding: '12px' }}>Minimum usage count for atomic conversion</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">naming</code></div>
            <div style={{ padding: '12px' }}>'hash' | 'readable'</div>
            <div style={{ padding: '12px' }}>Class naming scheme</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">mode</code></div>
            <div style={{ padding: '12px' }}>'hybrid' | 'atomic' | 'standard'</div>
            <div style={{ padding: '12px' }}>Atomic mode behavior</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">outputStrategy</code></div>
            <div style={{ padding: '12px' }}>'component-first' | 'utility-first'</div>
            <div style={{ padding: '12px' }}>CSS output strategy</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">cache</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Enable caching between builds</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">verbose</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Show detailed atomic optimization stats</div>
          </div>
        </div>
      </div>
      
      <h3>Autoprefixer Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">enabled</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Enable autoprefixer</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">mode</code></div>
            <div style={{ padding: '12px' }}>'auto' | 'full' | 'lightweight'</div>
            <div style={{ padding: '12px' }}>Prefixer mode</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">sourceMap</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Generate source maps</div>
          </div>
        </div>
      </div>
      
      <h3>Breakpoint Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Breakpoint</div>
            <div style={{ padding: '12px' }}>Default Query</div>
            <div style={{ padding: '12px' }}>Usage</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">sm</code></div>
            <div style={{ padding: '12px' }}>(max-width: 640px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.sm(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">md</code></div>
            <div style={{ padding: '12px' }}>(min-width: 641px) and (max-width: 768px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.md(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">lg</code></div>
            <div style={{ padding: '12px' }}>(min-width: 769px) and (max-width: 1024px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.lg(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">xl</code></div>
            <div style={{ padding: '12px' }}>(min-width: 1025px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.xl(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">mobile</code></div>
            <div style={{ padding: '12px' }}>(max-width: 768px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.mobile(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">tablet</code></div>
            <div style={{ padding: '12px' }}>(min-width: 769px) and (max-width: 1024px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.tablet(...)</code></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 200px', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">desktop</code></div>
            <div style={{ padding: '12px' }}>(min-width: 1025px)</div>
            <div style={{ padding: '12px' }}><code className="inline-code">.desktop(...)</code></div>
          </div>
        </div>
      </div>
      
      <h3>Debug Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">debug</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Enable debug mode</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">sourceComments</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Add source comments to CSS</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">timeline</code></div>
            <div style={{ padding: '12px' }}>boolean</div>
            <div style={{ padding: '12px' }}>Enable style timeline tracking</div>
          </div>
        </div>
      </div>
      
      <h2>CLI Overrides</h2>
      <p>Configuration options can be overridden via CLI flags:</p>
      <CodeBlock language="bash" code={`# Override atomic settings
npx chaincss build --atomic --atomic-naming readable

# Build with timeline tracking
npx chaincss build --timeline

# Verbose output
npx chaincss build --verbose`} />
      
      <div className="tip">
        <strong>Pro tip:</strong> CLI flags take precedence over config file settings.
      </div>
      
      <div className="note">
        <strong>Environment-aware defaults</strong>
        <p>ChainCSS automatically adjusts defaults based on NODE_ENV:</p>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Development: <code className="inline-code">naming: 'readable'</code>, <code className="inline-code">minify: false</code></li>
          <li>Production: <code className="inline-code">naming: 'hash'</code>, <code className="inline-code">minify: true</code></li>
        </ul>
      </div>
    </>
  );
}