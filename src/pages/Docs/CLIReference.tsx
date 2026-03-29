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
npx chaincss [options] <input> <output>`} />
      
      <h2>Basic Syntax</h2>
      <CodeBlock language="bash" code={`chaincss <input> <output> [options]

# Parameters:
#   input   - Input .jcss file path
#   output  - Output directory or file path
#   options - Optional flags (see below)`} />
      
      <h2>Options</h2>
      
      <h3>Atomic CSS</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                 </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic</code></td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-threshold</code></td>
              <td style={{ padding: '12px' }}>Minimum usage count for atomic conversion</td>
              <td style={{ padding: '12px' }}>3</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-threshold 2</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-naming</code></td>
              <td style={{ padding: '12px' }}>Class naming scheme (hash | readable)</td>
              <td style={{ padding: '12px' }}>hash</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-naming readable</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-mode</code></td>
              <td style={{ padding: '12px' }}>Atomic mode (atomic | standard | hybrid)</td>
              <td style={{ padding: '12px' }}>hybrid</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-mode atomic</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-verbose</code></td>
              <td style={{ padding: '12px' }}>Show detailed atomic optimization stats</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--atomic-verbose</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Autoprefixer</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-prefix</code></td>
              <td style={{ padding: '12px' }}>Disable autoprefixer</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-prefix</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--prefixer-mode</code></td>
              <td style={{ padding: '12px' }}>Prefixer mode (auto | always | never)</td>
              <td style={{ padding: '12px' }}>auto</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--prefixer-mode always</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--browsers</code></td>
              <td style={{ padding: '12px' }}>Browser targets (comma-separated)</td>
              <td style={{ padding: '12px' }}>&gt; 0.5%, last 2 versions, not dead</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--browsers "&gt; 1%, last 3 versions"</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>Source Maps</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
              <td style={{ padding: '12px' }}>Disable source map generation</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-source-map</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map-inline</code></td>
              <td style={{ padding: '12px' }}>Inline source maps in CSS file</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--source-map-inline</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>General Options</h3>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--watch</code></td>
              <td style={{ padding: '12px' }}>Watch for file changes and rebuild</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--watch</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--preserve-selectors</code></td>
              <td style={{ padding: '12px' }}>Keep original selector names in comments</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--preserve-selectors</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--help</code></td>
              <td style={{ padding: '12px' }}>Show help message</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--help</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">--version</code></td>
              <td style={{ padding: '12px' }}>Show version number</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--version</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Exit Codes</h2>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Code</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Meaning</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">0</code></td>
              <td style={{ padding: '12px' }}>Success - CSS generated successfully</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">1</code></td>
              <td style={{ padding: '12px' }}>Error - Invalid input, missing files, or processing error</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h2>Environment Variables</h2>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/api" style={{ color: '#667eea', textDecoration: 'none' }}>← API Reference</a>
        <a href="/docs/config-reference" style={{ color: '#667eea', textDecoration: 'none' }}>Configuration Reference →</a>
      </div>*/}
    </>
  );
}