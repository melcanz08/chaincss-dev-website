export default function TreeShaking() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Tree Shaking & Dead Code Elimination</h1>
        <p className="docs-description">
          Automatically remove unused CSS for smaller bundles
        </p>
      </div>

      <h2>How It Works</h2><br />
      <p>
        ChainCSS analyzes your JavaScript bundle to find which CSS classes are actually used,
        then removes unused styles from the final CSS output.
      </p><br />

      <h2>Enabling Tree Shaking</h2>
      <div className="code-block">
        <pre>{`// chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    treeShake: true,    // Enable dead code elimination
    threshold: 3        // Minimum usage to keep class
  }
};`}</pre>
      </div>

      <h2>Build Output with Statistics</h2>
      <div className="code-block">
        <pre>{`> chaincss ./src/main.jcss ./dist --atomic --tree-shake

  ChainCSS Tree Shaking Results:
    Total styles: 1250
    Used styles: 892
    Dead code eliminated: 358 (28.6% savings)
    CSS size reduced by 31.2%`}</pre>
      </div>

      <h2>Manual Analysis</h2>
      <div className="code-block">
        <pre>{`import { atomicOptimizer } from 'chaincss';

// Analyze unused styles
const unused = atomicOptimizer.findUnusedStyles();
console.log('Unused selectors:', unused);
// ['.unused-class', '.deprecated-button', '.old-styles']`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Performance Tip:</strong> Enable tree shaking in production for optimal bundle sizes!
      </div>
    </>
  );
}