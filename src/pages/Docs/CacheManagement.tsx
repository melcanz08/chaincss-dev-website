import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function CacheManagement() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Cache Configuration',
      description: 'Configure caching for faster builds',
      code: `// chaincss.config.cjs
module.exports = {
  atomic: {
    // Enable caching (default: true)
    cache: true,
    
    // Cache storage location
    cachePath: './.chaincss-cache',
    
    // Clear cache on each build (for debugging)
    // cache: false
  }
};`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`Cache Structure:
.chaincss-cache/
├── .chaincss-cache          # Main cache file
└── (older cache files)      # Automatic rotation (keeps last 5)

 Cache loaded: 47 atomic classes
 Build time: 124ms (cached)
 Fresh build: 342ms`}
          </pre>
        </div>
      )
    },
    structure: {
      title: 'Cache Structure',
      description: 'Understanding how ChainCSS caches atomic classes',
      code: `// .chaincss-cache file structure
{
  "version": "1.0.0",
  "timestamp": 1700000000000,
  "atomicClasses": [
    ["backgroundColor:#3b82f6", {
      "className": "c_565ef3",
      "prop": "backgroundColor",
      "value": "#3b82f6",
      "usageCount": 5
    }],
    ["color:white", {
      "className": "c_0a43e5",
      "prop": "color",
      "value": "white",
      "usageCount": 5
    }]
  ],
  "componentClassMap": [
    [".btn", {
      "atomicClasses": ["c_565ef3", "c_0a43e5"],
      "hoverAtomicClasses": []
    }]
  ],
  "stats": {
    "totalStyles": 12,
    "atomicStyles": 8,
    "uniqueProperties": 10,
    "savings": "66.7%"
  },
  "config": {
    "threshold": 3,
    "naming": "hash"
  }
}`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#1e293b', 
            color: '#e2e8f0', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            <pre style={{ margin: 0, color: '#e2e8f0' }}>
{`{
  "version": "1.0.0",
  "timestamp": 1700000000000,
  "atomicClasses": 47,
  "componentClassMap": 12,
  "stats": {
    "savings": "73.5%"
  },
  "config": {
    "threshold": 3,
    "naming": "hash"
  }
}`}
            </pre>
          </div>
        );
      }
    },
    clear: {
      title: 'Clearing Cache',
      description: 'How to clear the cache when needed',
      code: `// Method 1: Delete cache folder manually
rm -rf .chaincss-cache

// Method 2: Use ChainCSS API (in your build script)
import { atomicOptimizer } from 'chaincss';

// Clear cache programmatically
atomicOptimizer.clearCache();
console.log('Cache cleared');

// Method 3: Disable cache temporarily for debugging
// chaincss.config.cjs
module.exports = {
  atomic: {
    cache: false  // Disable caching
  }
};`,
      preview: () => (
        <div style={{ 
          backgroundColor: '#f8fafc', 
          padding: '20px', 
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <pre style={{ margin: 0, color: '#1e293b' }}>
{`$ rm -rf .chaincss-cache

$ npx chaincss styles.jcss dist/ --atomic
-- Cache cleared
-- Building fresh...
   Loaded 0 atomic classes from cache
   Generated 12 atomic classes
   Cache saved to .chaincss-cache`}
          </pre>
        </div>
      )
    },
    rotation: {
      title: 'Automatic Cache Rotation',
      description: 'ChainCSS automatically manages cache size',
      code: `// ChainCSS keeps the 5 most recent cache files
// Older cache files are automatically deleted

// Example: After 6 builds, the oldest cache is removed
Build 1: .chaincss-cache-1
Build 2: .chaincss-cache-2
Build 3: .chaincss-cache-3
Build 4: .chaincss-cache-4
Build 5: .chaincss-cache-5
Build 6: .chaincss-cache-6 → removes cache-1

// Cache rotation helps manage disk space while maintaining speed`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <pre style={{ margin: 0, color: '#1e293b' }}>
{` .chaincss-cache/
├── .chaincss-cache-1 (oldest - deleted)
├── .chaincss-cache-2
├── .chaincss-cache-3
├── .chaincss-cache-4
├── .chaincss-cache-5
└── .chaincss-cache-6 (newest)

 Automatic cleanup: keeps 5 most recent
 Disk space managed automatically`}
            </pre>
          </div>
        );
      }
    },
    troubleshooting: {
      title: 'Troubleshooting Cache',
      description: 'Common cache issues and solutions',
      code: `// Issue: Cache threshold mismatch
// Cache threshold (3) differs from current (2)
// Solution: Clear cache or update config

rm -rf .chaincss-cache

// Issue: Cache version mismatch
// Cache version (1.0.0) differs from current (2.0.0)
// Solution: Cache automatically recreates

// Issue: Stale cache after config change
// Solution: Delete cache when changing atomic settings
rm -rf .chaincss-cache

// Debug: See cache stats
console.log(atomicOptimizer.getStats());
// {
//   totalStyles: 156,
//   atomicStyles: 42,
//   uniqueProperties: 89,
//   savings: "73.1%"
// }`,
      preview: () => {
        return (
          <div style={{ 
            backgroundColor: '#fef3c7', 
            padding: '20px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            <pre style={{ margin: 0, color: '#92400e' }}>
{` Cache threshold (3) differs from current (2)
 Solution: rm -rf .chaincss-cache

 Cache version mismatch
 Solution: Automatic recreation

 Cache cleared and rebuilt with new settings`}
            </pre>
          </div>
        );
      }
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Cache Management</h1>
        <p className="docs-description">
          ChainCSS uses intelligent caching to speed up builds. Learn how to configure and manage the cache.
        </p>
      </div>
      
      {/* What is Caching */}
      <h2>What is Caching?</h2>
      <p>
        ChainCSS caches atomic classes and component mappings between builds. This dramatically speeds up
        subsequent builds by reusing previously computed atomic classes.
      </p>
      
      <div className="tip">
         <strong>Performance Impact:</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>First build: ~300-500ms (generates cache)</li>
          <li>Subsequent builds: ~100-200ms (uses cache)</li>
          <li>Up to <strong>60% faster</strong> with warm cache</li>
        </ul>
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
          Basic Config
        </button>
        <button
          onClick={() => setActiveExample('structure')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'structure' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'structure' ? '#eef2ff' : 'white',
            color: activeExample === 'structure' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Cache Structure
        </button>
        <button
          onClick={() => setActiveExample('clear')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'clear' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'clear' ? '#eef2ff' : 'white',
            color: activeExample === 'clear' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Clear Cache
        </button>
        <button
          onClick={() => setActiveExample('rotation')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'rotation' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'rotation' ? '#eef2ff' : 'white',
            color: activeExample === 'rotation' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Cache Rotation
        </button>
        <button
          onClick={() => setActiveExample('troubleshooting')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'troubleshooting' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'troubleshooting' ? '#eef2ff' : 'white',
            color: activeExample === 'troubleshooting' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Troubleshooting
        </button>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="javascript" code={currentExample.code} />
        
        <div className="tip" style={{ marginTop: '16px' }}>
          <strong>Preview:</strong>
          <div style={{ marginTop: '12px' }}>
            {currentExample.preview()}
          </div>
        </div>
      </div>
      
      {/* Cache API Reference */}
      <h2>Cache API Reference</h2>
      
      <h3>CacheManager Class</h3>
      <CodeBlock language="javascript" code={`import { CacheManager } from 'chaincss/cache';

const cache = new CacheManager('./.chaincss-cache');

// Load cache from disk
cache.load();

// Get cached value
const value = cache.get('key');

// Set cached value
cache.set('key', value);

// Save cache to disk
cache.save();

// Clear all cache
cache.clear();`} />
      
      <h3>Atomic Optimizer Cache</h3>
      <CodeBlock language="javascript" code={`import { atomicOptimizer } from 'chaincss';

// Get cache statistics
const stats = atomicOptimizer.getStats();
console.log(stats);
// {
//   totalStyles: 156,
//   atomicStyles: 42,
//   uniqueProperties: 89,
//   savings: "73.1%"
// }

// Clear atomic optimizer cache
atomicOptimizer.clearCache();

// Get all cached atomic classes
const classes = atomicOptimizer.getAllAtomicClasses();
console.log(classes);
// [{ className: 'c_565ef3', prop: 'backgroundColor', value: '#3b82f6' }, ...]`} />
      
      {/* Cache Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Keep cache enabled in development for faster rebuilds</li>
          <li>Clear cache when changing atomic configuration (threshold, naming)</li>
          <li>Add <code className="inline-code">.chaincss-cache/</code> to <code className="inline-code">.gitignore</code></li>
          <li>Use <code className="inline-code">cache: false</code> in CI/CD for clean builds</li>
          <li>Cache is automatically versioned - updates will recreate stale cache</li>
        </ul>
      </div>
      
      {/* .gitignore Example */}
      <h2>.gitignore</h2>
      <CodeBlock language="gitignore" code={`# ChainCSS cache
.chaincss-cache/
chaincss-manifest.json
*.map.json
*.classes.js
*.classes.d.ts`} />
      
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
        <a href="/docs/typescript" style={{ color: '#667eea', textDecoration: 'none' }}>
          TypeScript Types →
        </a>
      </div>*/}
    </>
  );
}