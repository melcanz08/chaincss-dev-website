import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function Troubleshooting() {
  const [activeIssue, setActiveIssue] = useState('css-not-loading');
  
  const issues = {
    'css-not-loading': {
      title: 'CSS Not Loading',
      description: 'Styles are not being applied to your HTML elements',
      solution: `1. Check that the CSS file is linked correctly:
   <link rel="stylesheet" href="dist/global.css">

2. Verify the output directory exists and contains global.css:
   ls dist/

3. Check browser DevTools Network tab to see if CSS is loading

4. Ensure you're using the correct class names from your .jcss file:
   .btn vs .button vs .btn-primary`,
      code: `<!-- Correct -->
<button class="btn">Click</button>

<!-- Wrong class name -->
<button class="button">Click</button>`
    },
    'atomic-not-working': {
      title: 'Atomic CSS Not Working',
      description: '--atomic flag isn\'t optimizing your CSS',
      solution: `1. Make sure you're using the --atomic flag:
   npx chaincss styles.jcss dist/ --atomic

2. Check your threshold setting - properties must appear threshold times:
   threshold: 3 (default) means properties used 3+ times become atomic

3. Add duplicate styles to test:
   const btn1 = $().color('blue').block('.btn1');
   const btn2 = $().color('blue').block('.btn2');`,
      code: `// In chaincss.config.cjs
atomic: {
  enabled: true,
  threshold: 2,  // Lower threshold to test
  verbose: true  // See what's becoming atomic
}`
    },
    'build-error': {
      title: 'Build Errors',
      description: 'ChainCSS fails during compilation',
      solution: `1. Check syntax errors in your .jcss file:
   - Missing closing brackets
   - Invalid CSS property names
   - Unclosed .hover() without .end()

2. Verify file paths in get() imports exist

3. Run with verbose mode to see detailed errors:
   npx chaincss styles.jcss dist/ --atomic-verbose

4. Clear cache and rebuild:
   rm -rf .chaincss-cache`,
      code: `// Common syntax error - missing .end()
const button = $()
  .hover()
    .color('red')
  // .end() is missing!
  .block();`
    },
    'hmr-not-working': {
      title: 'HMR Not Working (Vite)',
      description: 'Changes don\'t update automatically in development',
      solution: `1. Make sure hmr is enabled in vite.config.js:
   chaincss({ hmr: true })

2. Check that you're editing .jcss files, not generated .css

3. Restart the dev server after config changes

4. Clear Vite cache:
   rm -rf node_modules/.vite`,
      code: `// vite.config.js
export default {
  plugins: [
    chaincss({
      hmr: true,  // Enable HMR
      debug: true // Enable debug mode to see updates
    })
  ]
}`
    },
    'typescript-errors': {
      title: 'TypeScript Errors',
      description: 'TypeScript can\'t find ChainCSS types',
      solution: `1. Ensure chaincss is installed:
   npm install chaincss

2. Check your tsconfig.json has moduleResolution: "node"

3. Add types to compilerOptions:
   "types": ["chaincss"]

4. If using Next.js, add to next-env.d.ts:
   /// <reference types="chaincss" />`,
      code: `// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "types": ["chaincss"]
  }
}`
    },
    'nextjs-issues': {
      title: 'Next.js Issues',
      description: 'Problems with Next.js plugin or RSC',
      solution: `1. Make sure next.config.js wraps config with withChainCSS:
   const withChainCSS = require('chaincss/next-plugin');
   module.exports = withChainCSS({...});

2. For App Router, import styles in layout.tsx:
   import './styles/main.jcss';

3. Mark client components with 'use client' when using hooks:
   'use client';
   import { useChainStyles } from 'chaincss/react';`,
      code: `// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true,
  chaincss: {
    atomic: true
  }
});`
    }
  };
  
  const currentIssue = issues[activeIssue];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Troubleshooting</h1>
        <p className="docs-description">
          Common issues and solutions for ChainCSS.
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '80px' }}>
            <div className="docs-sidebar-section">
              <div className="docs-sidebar-title">Common Issues</div>
              <button onClick={() => setActiveIssue('css-not-loading')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'css-not-loading' ? '#667eea' : '#475569', fontWeight: activeIssue === 'css-not-loading' ? '500' : 'normal' }}>CSS Not Loading</button>
              <button onClick={() => setActiveIssue('atomic-not-working')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'atomic-not-working' ? '#667eea' : '#475569' }}>Atomic CSS Not Working</button>
              <button onClick={() => setActiveIssue('build-error')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'build-error' ? '#667eea' : '#475569' }}>Build Errors</button>
              <button onClick={() => setActiveIssue('hmr-not-working')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'hmr-not-working' ? '#667eea' : '#475569' }}>HMR Not Working (Vite)</button>
              <button onClick={() => setActiveIssue('typescript-errors')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'typescript-errors' ? '#667eea' : '#475569' }}>TypeScript Errors</button>
              <button onClick={() => setActiveIssue('nextjs-issues')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: activeIssue === 'nextjs-issues' ? '#667eea' : '#475569' }}>Next.js Issues</button>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            {currentIssue.title}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>
            {currentIssue.description}
          </p>
          
          <div className="note" style={{ marginBottom: '16px' }}>
            <strong>Solution:</strong>
            <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
              {currentIssue.solution.split('\n').map((line, i) => {
                if (line.trim().startsWith('-')) {
                  return <li key={i} style={{ marginBottom: '4px' }}>{line.trim().substring(1)}</li>;
                }
                return null;
              }).filter(Boolean)}
            </ul>
          </div>
          
          <CodeBlock language="javascript" code={currentIssue.code} />
          
          <div className="tip">
            <strong>Still having issues?</strong>
            <p style={{ marginTop: '8px', marginBottom: 0 }}>
              Check our <a href="https://github.com/melcanz08/chaincss/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a> for similar problems or open a new issue.
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/config-reference" style={{ color: '#667eea', textDecoration: 'none' }}>← Configuration Reference</a>
        <a href="/docs/upgrade-guide" style={{ color: '#667eea', textDecoration: 'none' }}>Upgrade Guide →</a>
      </div>*/}
    </>
  );
}