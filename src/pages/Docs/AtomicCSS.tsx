export default function AtomicCSS() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Atomic CSS Optimization</h1>
        <p className="docs-description">
          Reduce CSS bundle size with reusable atomic classes
        </p>
      </div>

      <h2>What is Atomic CSS?</h2><br />
      <p>
        Atomic CSS generates single-purpose utility classes that can be reused across components.
        Instead of repeating styles, you get reusable classes like <code className="inline-code">.c_abc123</code>.
      </p><br />

      <h2>Traditional vs Atomic CSS</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong>Traditional CSS</strong>
          <pre style={{ fontSize: '12px' }}>{`.btn-primary {
  background: blue;
  color: white;
  padding: 8px;
}`}</pre>
        </div>
        <div className="feature-card">
          <strong>Atomic CSS</strong>
          <pre style={{ fontSize: '12px' }}>{`.c_abc123 { background: blue; }
.c_def456 { color: white; }
.c_ghi789 { padding: 8px; }`}</pre>
        </div>
      </div>

      <h2>Enabling Atomic CSS</h2>
      <div className="code-block">
        <pre>{`# CLI
chaincss ./src/main.jcss ./dist --atomic

# Or in config
// chaincss.config.cjs
module.exports = {
  atomic: {
    enabled: true,
    threshold: 3,        // Minimum usage count
    naming: 'hash',      // 'hash' or 'readable'
    cache: true
  }
};`}</pre>
      </div>

      <h2>Atomic Class Maps</h2>
      <div className="code-block">
        <pre>{`// Generated atomic class map
// global.classes.js
export const classMap = {
  '.btn': 'c_abc123 c_def456 c_ghi789',
  '.card': 'c_jkl012 c_mno345',
  '.container': 'c_pqr678 c_stu901'
};

// Usage
import classMap from './dist/global.classes.js';
const buttonClasses = classMap['.btn']; // "c_abc123 c_def456 c_ghi789"`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Tip:</strong> Atomic CSS can reduce your CSS bundle by 40-60%!
      </div>
    </>
  );
}