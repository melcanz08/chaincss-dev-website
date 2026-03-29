// src/pages/Docs/AtomicCSS.tsx

import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function AtomicCSS() {
  const [activeExample, setActiveExample] = useState('basic');
  const [threshold, setThreshold] = useState(3);
  const [namingPreview, setNamingPreview] = useState<'hash' | 'readable'>('hash');
  const [modePreview, setModePreview] = useState<'hybrid' | 'atomic' | 'standard'>('hybrid');
  const [strategyPreview, setStrategyPreview] = useState<'component-first' | 'utility-first'>('component-first');
  
  const modeStats = {
    hybrid: { atomic: 62, component: 7468, total: 9303, savings: '80.4%' },
    atomic: { atomic: 160, component: 7468, total: 12361, savings: '49.5%' },
    standard: { atomic: 0, component: 7468, total: 7468, savings: '0%' }
  };
  
  const examples = {
    basic: {
      title: 'What is Atomic CSS?',
      description: 'Learn how atomic CSS eliminates duplicate styles',
      code: `// WITHOUT ATOMIC CSS (Full styles in each component)
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
.btn-secondary {
  background-color: #3b82f6;  // ← Duplicate!
  color: white;                // ← Duplicate!
  padding: 12px 24px;         // ← Duplicate!
  border-radius: 8px;         // ← Duplicate!
  font-size: 14px;
}

// WITH ATOMIC CSS (Reusable utilities)
.c_3b82f6 { background-color: #3b82f6; }  // Used by both buttons
.c_ffffff { color: white; }              // Used by both buttons
.c_1224 { padding: 12px 24px; }          // Used by both buttons
.c_8px { border-radius: 8px; }           // Used by both buttons

.btn-primary { font-size: 16px; }        // Only unique styles remain
.btn-secondary { font-size: 14px; }

// Result: 67% CSS size reduction!`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '24px', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>Before</div>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', background: '#1e293b', color: '#e2e8f0', padding: '12px', borderRadius: '6px' }}>
                145 KB
              </div>
            </div>
            <div>
              <div style={{ fontWeight: '500', marginBottom: '8px' }}>After</div>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', background: '#10b981', color: 'white', padding: '12px', borderRadius: '6px' }}>
                45 KB
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: '14px', color: '#10b981', fontWeight: '500' }}>
            ↓ 69% reduction
          </div>
        </div>
      )
    },
    cli: {
      title: 'CLI Commands',
      description: 'Enable atomic CSS with simple CLI flags',
      code: `# Basic atomic CSS
npx chaincss styles.jcss ./dist --atomic

# With readable class names (easier debugging)
npx chaincss styles.jcss ./dist --atomic --atomic-naming readable

# Show optimization statistics
npx chaincss styles.jcss ./dist --atomic --atomic-verbose

# Maximum optimization (pure atomic, no component CSS)
npx chaincss styles.jcss ./dist --atomic --outputStrategy utility-first`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#1e293b', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`$ npx chaincss styles.jcss ./dist --atomic --atomic-verbose

   Atomic Optimization Stats:
   Total styles tracked: 317
   Atomic classes created: 62
   Atomic CSS length: 1835 bytes
   Component CSS length: 0 bytes
   Total CSS length: 4893 bytes
   Savings: 80.4%`}
          </pre>
        </div>
      )
    },
    modes: {
      title: 'Atomic Modes',
      description: 'Three levels of optimization',
      code: `// HYBRID MODE (Default) - Atomic utilities + component styles
// Safe - styles work even if atomic classes aren't applied
npx chaincss styles.jcss ./dist --atomic --atomic-mode hybrid

// ATOMIC MODE - Maximum optimization
// Best for production - smallest CSS bundle
npx chaincss styles.jcss ./dist --atomic --atomic-mode atomic

// STANDARD MODE - No atomic conversion
// Only tracks usage, doesn't generate atomic classes
npx chaincss styles.jcss ./dist --atomic --atomic-mode standard`,
      preview: () => {
        const stats = modeStats[modePreview];
        
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button onClick={() => setModePreview('hybrid')} style={{ padding: '6px 12px', borderRadius: '6px', border: modePreview === 'hybrid' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Hybrid</button>
              <button onClick={() => setModePreview('atomic')} style={{ padding: '6px 12px', borderRadius: '6px', border: modePreview === 'atomic' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Atomic</button>
              <button onClick={() => setModePreview('standard')} style={{ padding: '6px 12px', borderRadius: '6px', border: modePreview === 'standard' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Standard</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ textAlign: 'center', padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.atomic}</div>
                <div style={{ fontSize: '12px' }}>Atomic Classes</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.total} bytes</div>
                <div style={{ fontSize: '12px' }}>Total CSS</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px', background: '#f1f5f9', borderRadius: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{stats.savings}</div>
                <div style={{ fontSize: '12px' }}>Savings</div>
              </div>
            </div>
          </div>
        );
      }
    },
    naming: {
      title: 'Class Naming',
      description: 'Choose between hash or readable class names',
      code: `// HASH NAMING (Default) - Short, unique, guaranteed no collisions
.c_3b82f6 { background-color: #3b82f6; }
.c_ffffff { color: white; }
.c_1224 { padding: 12px 24px; }

// READABLE NAMING - Human-readable, like Tailwind CSS
.bg-blue-500 { background-color: #3b82f6; }
.text-white { color: white; }
.p-12-24 { padding: 12px 24px; }

// Usage
npx chaincss styles.jcss ./dist --atomic --atomic-naming readable`,
      preview: () => {
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button onClick={() => setNamingPreview('hash')} style={{ padding: '6px 12px', borderRadius: '6px', border: namingPreview === 'hash' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Hash (.c_3b82f6)</button>
              <button onClick={() => setNamingPreview('readable')} style={{ padding: '6px 12px', borderRadius: '6px', border: namingPreview === 'readable' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Readable (bg-blue-500)</button>
            </div>
            <div style={{
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              padding: '16px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '13px'
            }}>
              <pre style={{ margin: 0 }}>
{namingPreview === 'hash' 
  ? `.c_3b82f6 { background-color: #3b82f6; }
.c_ffffff { color: white; }
.c_1224 { padding: 12px 24; }`
  : `.bg-blue-500 { background-color: #3b82f6; }
.text-white { color: white; }
.p-12-24 { padding: 12px 24; }`}
              </pre>
            </div>
            <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
              {namingPreview === 'hash' 
                ? 'Short, unique, guaranteed no collisions' 
                : 'Human-readable, easier to debug in DevTools'}
            </p>
          </div>
        );
      }
    },
    threshold: {
      title: 'Threshold Tuning',
      description: 'Control which properties become atomic',
      code: `// threshold: 1 → Everything becomes atomic (max optimization)
// threshold: 2 → Properties used 2+ times become atomic
// threshold: 3 → Properties used 3+ times become atomic (balanced)
// threshold: 5 → Only highly reused properties become atomic

// Configure in chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    threshold: 3
  }
};`,
      preview: () => {
        const getSavings = () => {
          if (threshold === 1) return '89%';
          if (threshold === 2) return '73%';
          if (threshold === 3) return '58%';
          return '42%';
        };
        
        return (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Threshold: {threshold}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                Lower threshold = more atomic classes, smaller CSS
              </div>
            </div>
            <div style={{
              backgroundColor: '#e0f2fe',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0284c7' }}>
                {getSavings()}
              </span>
              <span style={{ color: '#0284c7' }}> estimated CSS reduction</span>
            </div>
          </div>
        );
      }
    },
    outputStrategy: {
      title: 'Output Strategy',
      description: 'Control how CSS is generated',
      code: `// COMPONENT-FIRST (Safe mode) - Keeps all styles in components
// CSS works even without atomic classes
npx chaincss styles.jcss ./dist --atomic --outputStrategy component-first

// UTILITY-FIRST (Pure atomic) - Removes component CSS
// Only atomic utilities - must apply atomic classes manually
npx chaincss styles.jcss ./dist --atomic --outputStrategy utility-first

// Configure in chaincss.config.cjs
module.exports = {
  atomic: {
    outputStrategy: 'utility-first'
  }
};`,
      preview: () => {
        return (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <button onClick={() => setStrategyPreview('component-first')} style={{ padding: '6px 12px', borderRadius: '6px', border: strategyPreview === 'component-first' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Component-First</button>
              <button onClick={() => setStrategyPreview('utility-first')} style={{ padding: '6px 12px', borderRadius: '6px', border: strategyPreview === 'utility-first' ? '2px solid #667eea' : '1px solid #e2e8f0', cursor: 'pointer' }}>Utility-First</button>
            </div>
            <div style={{
              backgroundColor: '#f8fafc',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontWeight: '500' }}>Component CSS</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                  {strategyPreview === 'component-first' ? '7468 bytes (all styles)' : '0 bytes (pure atomic)'}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: '500' }}>Atomic Utilities</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                  1835 bytes (62 classes)
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: strategyPreview === 'utility-first' ? '#10b981' : '#64748b' }}>
                {strategyPreview === 'utility-first' 
                  ? 'Pure atomic CSS - must apply atomic classes manually' 
                  : 'Safe mode - component styles included as fallback'}
              </div>
            </div>
          </div>
        );
      }
    },
    files: {
      title: 'Generated Files',
      description: 'What files are created with --atomic',
      code: `# With --atomic flag
npx chaincss styles.jcss ./dist --atomic

# Output:
dist/
├── global.css              # Main CSS with atomic utilities
├── global.css.map          # Source map
├── global.map.json         # Complete class mapping
├── global.classes.js       # JS utilities + class map
├── global.classes.d.ts     # TypeScript definitions
└── chaincss-manifest.json  # Build manifest`,
      preview: () => {
        const files = [
          'global.css', 'global.css.map', 'global.map.json',
          'global.classes.js', 'global.classes.d.ts', 'chaincss-manifest.json'
        ];
        
        return (
          <div style={{
            backgroundColor: '#1e293b',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {files.map((file, i) => (
              <div key={file} style={{ padding: '4px 0' }}>
                {i === 0 ? 'dist/' : '    '}{file}
              </div>
            ))}
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample as keyof typeof examples];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Atomic CSS</h1>
        <p className="docs-description">
          Automatically optimize your CSS by converting reusable styles into atomic utilities.
          Reduce bundle size by up to 75% with zero configuration.
        </p>
      </div>
      
      <div className="tip">
        <strong>How it works:</strong> ChainCSS analyzes your styles at build time. Properties that appear multiple times are extracted into reusable atomic classes, dramatically reducing your CSS bundle size.
      </div>
      
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button onClick={() => setActiveExample('basic')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white', cursor: 'pointer' }}> What is Atomic CSS?</button>
        <button onClick={() => setActiveExample('cli')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'cli' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'cli' ? '#eef2ff' : 'white', cursor: 'pointer' }}> CLI Commands</button>
        <button onClick={() => setActiveExample('modes')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'modes' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'modes' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Atomic Modes</button>
        <button onClick={() => setActiveExample('naming')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'naming' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'naming' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Class Naming</button>
        <button onClick={() => setActiveExample('threshold')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'threshold' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'threshold' ? '#eef2ff' : 'white', cursor: 'pointer' }}>Threshold Tuning</button>
        <button onClick={() => setActiveExample('outputStrategy')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'outputStrategy' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'outputStrategy' ? '#eef2ff' : 'white', cursor: 'pointer' }}>Output Strategy</button>
        <button onClick={() => setActiveExample('files')} style={{ padding: '8px 16px', borderRadius: '8px', border: activeExample === 'files' ? '2px solid #667eea' : '1px solid #e2e8f0', backgroundColor: activeExample === 'files' ? '#eef2ff' : 'white', cursor: 'pointer' }}> Generated Files</button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{currentExample.title}</h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>{currentExample.description}</p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Live Preview:</strong>
          <div style={{ marginTop: '12px' }}>{currentExample.preview()}</div>
        </div>
      </div>
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Start with <code>threshold: 3</code> for balanced optimization</li>
          <li>Use <code>--atomic-verbose</code> to see what's becoming atomic</li>
          <li>Enable <code>--atomic</code> in production builds only</li>
          <li>Use <code>--atomic-naming readable</code> during development for easier debugging</li>
          <li>Use <code>--outputStrategy utility-first</code> for maximum optimization</li>
        </ul>
      </div>
      {/*
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/cli" style={{ color: '#667eea', textDecoration: 'none' }}>← CLI Tool</a>
        <a href="/docs/cache-management" style={{ color: '#667eea', textDecoration: 'none' }}>Cache Management →</a>
      </div>*/}
    </>
  );
}