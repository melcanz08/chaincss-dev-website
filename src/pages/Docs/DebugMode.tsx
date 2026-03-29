import CodeBlock from '../../components/CodeBlock';

export default function DebugMode() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Debug Mode & Visual Inspector</h1>
        <p className="docs-description">
          Inspect and debug your ChainCSS styles
        </p>
      </div>

      <h2>Enabling Debug Mode</h2>
      <CodeBlock 
        language="typescript"
        code={`import { enableChainCSSDebug } from 'chaincss/react';

// In your main entry file (main.tsx)
if (process.env.NODE_ENV === 'development') {
  enableChainCSSDebug();
}`}
      />

      <h2>What Debug Mode Does</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong>Hover Inspector</strong>
          <p>Hover over any element to see its atomic class names</p>
        </div>
        <div className="feature-card">
          <strong>Console Logging</strong>
          <p>See all generated styles and class maps in the console</p>
        </div>
        <div className="feature-card">
          <strong>Visual Overlay</strong>
          <p>Class names appear as tooltips on hover</p>
        </div>
      </div>

      <h2>Browser Console Output</h2>
      <ul>
        <li>ChainCSS Debug Mode Enabled</li>
        <li>Atomic classes will show on hover</li>
        <li>Generated Styles:
        <ul>
          <li>.btn: c_abc123 c_def456</li>
          <li>.btn: c_abc123 c_def456</li>
        </ul>
        </li>
        <li>.card: c_ghi789 c_jkl012</li>
        <li>Tip: Hover over elements to see their atomic classes</li>
      </ul><br />
      <h2>Vite Plugin Debug Options</h2>
      <CodeBlock 
        language="javascript"
        code={`// vite.config.js
import chaincss from 'chaincss/vite-plugin';

export default {
  plugins: [
    chaincss({
      debug: true,      // Enable debug mode
      treeShake: true,  // Remove unused CSS in production
      atomic: true      // Enable atomic CSS
    })
  ]
};`}
      />


      <h2>Manual Debugging with Stats</h2>
      <CodeBlock 
        language="javascript"
        code={`import { atomicOptimizer } from 'chaincss';

const stats = atomicOptimizer.getStats();
console.log(stats);
// {
//   totalStyles: 1250,
//   atomicStyles: 450,
//   standardStyles: 800,
//   uniqueProperties: 320,
//   savings: '36%'
// }`}
      />

      <div className="tip">
        <strong>Debug Tip:</strong> Use Chrome DevTools to inspect elements - you'll see the atomic classes applied!
      </div>
    </>
  );
}