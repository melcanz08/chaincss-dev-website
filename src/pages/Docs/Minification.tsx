import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Minification() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Minification',
      description: 'Minify CSS for smaller file sizes and faster loading',
      code: `// Minification is enabled by default
npx chaincss ./styles.jcss ./dist

// Output: minified CSS`,
      input: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}`,
      output: `.btn{background-color:#3b82f6;color:#fff;padding:12px 24px;border-radius:8px;font-size:16px;font-weight:600;border:none;cursor:pointer;transition:all .2s}`
    },
    disabled: {
      title: 'Disable Minification',
      description: 'Keep CSS readable for debugging',
      code: `// Disable minification via config
// chaincss.config.cjs
module.exports = {
  atomic: {
    minify: false  // Disable minification
  }
};`,
      input: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`,
      output: `.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`
    },
    comparison: {
      title: 'Size Comparison',
      description: 'See the difference minification makes',
      code: `// With minification
.btn{background-color:#3b82f6;color:#fff;padding:12px 24px;border-radius:8px}
// Size: 78 bytes

// Without minification
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
// Size: 95 bytes

// Savings: ~18% smaller`,
      stats: {
        original: 95,
        minified: 78,
        savings: '18%'
      }
    },
    advanced: {
      title: 'Advanced Minification',
      description: 'ChainCSS uses CleanCSS for advanced optimizations',
      code: `// CleanCSS optimizations include:
// - Removing unnecessary whitespace
// - Shortening color values (#ffffff → #fff)
// - Removing redundant units (0px → 0)
// - Merging duplicate rules
// - Removing unused selectors
// - Optimizing calc() expressions

// Example input:
.btn {
  margin: 0px;
  color: #ffffff;
  background: linear-gradient(90deg, #ff0000, #00ff00);
}

// Minified output:
.btn{margin:0;color:#fff;background:linear-gradient(90deg,red,#0f0)}`,
      output: `.btn{margin:0;color:#fff;background:linear-gradient(90deg,red,#0f0)}`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Minification</h1>
        <p className="docs-description">
          Reduce CSS file size with built-in minification. Smaller files mean faster load times.
        </p>
      </div>
      
      {/* What is Minification */}
      <h2>What is Minification?</h2>
      <p>
        Minification removes unnecessary characters from CSS without changing how it works.
        This includes whitespace, comments, and redundant characters, resulting in smaller file sizes.
      </p>
      
      <div className="tip">
        <strong>Why minify?</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Smaller file sizes:</strong> Up to 30-50% reduction</li>
          <li><strong>Faster page loads:</strong> Less data to download</li>
          <li><strong>Better performance:</strong> Faster CSS parsing</li>
          <li><strong>Lower bandwidth costs:</strong> Especially for high-traffic sites</li>
        </ul>
      </div>
      
      {/* Visual Comparison */}
      <h2>Visual Comparison</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '12px', color: '#ef4444' }}>Unminified (95 bytes)</div>
          <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>{`.btn {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}`}</pre>
        </div>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '12px', color: '#10b981' }}>Minified (78 bytes)</div>
          <pre style={{ margin: 0, fontSize: '12px', overflow: 'auto' }}>{`.btn{background-color:#3b82f6;color:#fff;padding:12px 24px;border-radius:8px}`}</pre>
        </div>
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
          Basic Minification
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
          Disable Minification
        </button>
        <button
          onClick={() => setActiveExample('comparison')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'comparison' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'comparison' ? '#eef2ff' : 'white',
            color: activeExample === 'comparison' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Size Comparison
        </button>
        <button
          onClick={() => setActiveExample('advanced')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'advanced' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'advanced' ? '#eef2ff' : 'white',
            color: activeExample === 'advanced' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Advanced Optimizations
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
        
        {currentExample.input && (
          <>
            <div style={{ marginTop: '16px' }}>
              <div className="tip" style={{ backgroundColor: '#f1f5f9', borderLeftColor: '#94a3b8' }}>
                <strong>Input CSS:</strong>
                <CodeBlock language="css" code={currentExample.input} />
              </div>
            </div>
          </>
        )}
        
        {currentExample.output && (
          <div className="tip" style={{ marginTop: '16px' }}>
            <strong>Minified Output:</strong>
            <CodeBlock language="css" code={currentExample.output} />
          </div>
        )}
        
        {currentExample.stats && (
          <div className="tip" style={{ marginTop: '16px', backgroundColor: '#ecfdf5', borderLeftColor: '#10b981' }}>
            <strong>Size Statistics:</strong>
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              <li>Original size: <strong>{currentExample.stats.original} bytes</strong></li>
              <li>Minified size: <strong>{currentExample.stats.minified} bytes</strong></li>
              <li>Savings: <strong>{currentExample.stats.savings}</strong></li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Configuration Options */}
      <h2>Configuration</h2>
      <p>Control minification behavior in your <code className="inline-code">chaincss.config.cjs</code>:</p>
      <CodeBlock language="javascript" code={`// chaincss.config.cjs
module.exports = {
  atomic: {
    // Enable/disable minification (default: true)
    minify: true,
    
    // Other minification settings (via CleanCSS)
    // All CleanCSS options are supported
  }
};`} />
      
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
              <td style={{ padding: '12px' }}><code className="inline-code">--no-minify</code></td>
              <td style={{ padding: '12px' }}>Disable CSS minification</td>
              <td style={{ padding: '12px' }}>false</td>
              <td style={{ padding: '12px' }}><code className="inline-code">--no-minify</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* CleanCSS Optimizations */}
      <h2>CleanCSS Optimizations</h2>
      <p>ChainCSS uses <a href="https://github.com/clean-css/clean-css" target="_blank" rel="noopener noreferrer">CleanCSS</a> for minification, which includes these optimizations:</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
        marginBottom: '32px'
      }}>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">#ffffff → #fff</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Shorten hex colors</p>
        </div>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">0px → 0</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Remove unnecessary units</p>
        </div>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">rgb(0,0,0) → #000</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Convert rgb to hex</p>
        </div>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">calc(100% - 0px) → 100%</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Simplify calc expressions</p>
        </div>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">0 0 0 0 → 0</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Merge identical values</p>
        </div>
        <div style={{ padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
          <code className="inline-code">margin: 10px 10px → margin: 10px</code>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Remove duplicate values</p>
        </div>
      </div>
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Development:</strong> Disable minification for easier debugging (<code className="inline-code">minify: false</code>)</li>
          <li><strong>Production:</strong> Always enable minification for smaller bundle sizes</li>
          <li><strong>Source Maps:</strong> Use source maps with minification to debug original source</li>
          <li><strong>Atomic CSS:</strong> Minification works seamlessly with atomic CSS optimization</li>
        </ul>
      </div>
      
      {/* Performance Impact */}
      <h2>Performance Impact</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>30-50%</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Average size reduction</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>~10ms</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Minification overhead (per file)</div>
        </div>
        <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3b82f6' }}>20-40%</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Faster CSS parsing</div>
        </div>
      </div>
      
      {/* Troubleshooting */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Troubleshooting</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li><strong>Minification not working?</strong> Check that <code className="inline-code">minify: true</code> in your config</li>
          <li><strong>CSS looks broken after minification?</strong> Run with <code className="inline-code">--no-minify</code> to see if it's a minification issue</li>
          <li><strong>Need to debug minified CSS?</strong> Use source maps to see original source</li>
        </ul>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/source-maps" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← Source Maps
        </a>
        <a href="/docs/atomic-css" style={{ color: '#667eea', textDecoration: 'none' }}>
          Atomic CSS →
        </a>
      </div>*/}
    </>
  );
}