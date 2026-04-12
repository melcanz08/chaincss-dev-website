import CodeBlock from '../../components/CodeBlock';

export default function CLIReference() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">CLI Reference</h1>
        <p className="docs-description">
          Complete reference for the ChainCSS command-line interface.
        </p>
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install -g chaincss
# or use npx without installing
npx chaincss [command] [options]`} />
      
      <h2>Commands</h2>
      
      <h3>init</h3>
      <p>Initialize a ChainCSS configuration file.</p>
      <CodeBlock language="bash" code={`npx chaincss init
npx chaincss init --full    # Create full configuration with all options`} />
      
      <h3>build</h3>
      <p>Build all styles from configuration.</p>
      <CodeBlock language="bash" code={`npx chaincss build
npx chaincss build -c "src/**/*.chain.js"
npx chaincss build --timeline
npx chaincss build --verbose`} />
      
      <h3>watch</h3>
      <p>Watch for file changes and rebuild automatically.</p>
      <CodeBlock language="bash" code={`npx chaincss watch
npx chaincss watch -c "src/**/*.chain.js"`} />
      
      <h3>clean</h3>
      <p>Remove generated CSS and class files.</p>
      <CodeBlock language="bash" code={`npx chaincss clean`} />
      
      <h2>Options</h2>
      
      <h3>Input/Output Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">-c, --components</code></div>
            <div style={{ padding: '12px' }}>src/**/*.chain.js</div>
            <div style={{ padding: '12px' }}>Components pattern (glob)</div>
          </div>
        </div>
      </div>
      
      <h3>Atomic CSS Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--atomic</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Enable atomic CSS optimization</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--atomic-threshold</code></div>
            <div style={{ padding: '12px' }}>3</div>
            <div style={{ padding: '12px' }}>Minimum usage count for atomic conversion</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--atomic-naming</code></div>
            <div style={{ padding: '12px' }}>hash</div>
            <div style={{ padding: '12px' }}>Class naming scheme (hash | readable)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--atomic-mode</code></div>
            <div style={{ padding: '12px' }}>hybrid</div>
            <div style={{ padding: '12px' }}>Atomic mode (hybrid | atomic | standard)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--atomic-verbose</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Show detailed atomic optimization stats</div>
          </div>
        </div>
      </div>
      
      <h3>Autoprefixer Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--no-prefix</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Disable autoprefixer</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--prefixer-mode</code></div>
            <div style={{ padding: '12px' }}>auto</div>
            <div style={{ padding: '12px' }}>Prefixer mode (auto | full | lightweight)</div>
          </div>
        </div>
      </div>
      
      <h3>Source Map Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Disable source map generation</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--source-map-inline</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Inline source maps in CSS file</div>
          </div>
        </div>
      </div>
      
      <h3>General Options</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Option</div>
            <div style={{ padding: '12px' }}>Default</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">-t, --timeline</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Enable style timeline tracking</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">-v, --verbose</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Verbose output</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--help</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Show help message</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 150px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">--version</code></div>
            <div style={{ padding: '12px' }}>false</div>
            <div style={{ padding: '12px' }}>Show version number</div>
          </div>
        </div>
      </div>
      
      <h2>Exit Codes</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Code</div>
            <div style={{ padding: '12px' }}>Meaning</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">0</code></div>
            <div style={{ padding: '12px' }}>Success - CSS generated successfully</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">1</code></div>
            <div style={{ padding: '12px' }}>Error - Invalid input, missing files, or processing error</div>
          </div>
        </div>
      </div>
      
      <h2>Environment Variables</h2>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Variable</div>
            <div style={{ padding: '12px' }}>Description</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">NODE_ENV</code></div>
            <div style={{ padding: '12px' }}>Affects default settings (production = minified)</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">DEBUG</code></div>
            <div style={{ padding: '12px' }}>Enable debug logging with stack traces</div>
          </div>
        </div>
      </div>
      
      <h2>Examples</h2>
      
      <h3>Basic Usage</h3>
      <CodeBlock language="bash" code={`# Initialize configuration
npx chaincss init

# Initialize with full configuration
npx chaincss init --full

# Build all styles
npx chaincss build

# Build with specific pattern
npx chaincss build -c "src/**/*.chain.js"

# Watch for changes
npx chaincss watch

# Clean generated files
npx chaincss clean`} />
      
      <h3>Advanced Usage</h3>
      <CodeBlock language="bash" code={`# Build with timeline tracking
npx chaincss build --timeline

# Build with verbose output
npx chaincss build --verbose

# Build with atomic CSS enabled
npx chaincss build --atomic --atomic-naming readable

# Watch with specific pattern and verbose output
npx chaincss watch -c "src/components/**/*.chain.js" --verbose`} />
    </>
  );
}