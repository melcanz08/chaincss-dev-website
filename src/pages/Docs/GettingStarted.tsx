export default function GettingStarted() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Introduction to ChainCSS</h1>
        <p className="docs-description">
          Zero-runtime CSS-in-JS with atomic CSS and dynamic theming
        </p>
      </div>
      
      <h2>What is ChainCSS?</h2>
      <p>
        ChainCSS is a revolutionary CSS-in-JS library that combines the best of both worlds:
        <strong>build-time atomic CSS optimization</strong> and <strong>runtime flexibility</strong>
        with a unique chainable API.
      </p>
      
      <h2>Key Features</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong>Zero Runtime</strong>
          <p>0-3.2KB bundle size with atomic optimization</p>
        </div>
        <div className="feature-card">
          <strong>🔗 Chainable API</strong>
          <p>Fluent interface for dynamic styles</p>
        </div>
        <div className="feature-card">
          <strong>Atomic CSS</strong>
          <p>Built-in optimizer with class maps</p>
        </div>
        <div className="feature-card">
          <strong>Recipe System</strong>
          <p>Variant API like CVA with TypeScript</p>
        </div>
        <div className="feature-card">
          <strong>Dynamic Theming</strong>
          <p>Token-based theming with runtime flexibility</p>
        </div>
        <div className="feature-card">
          <strong>Build Plugins</strong>
          <p>Vite, Webpack, and Next.js support</p>
        </div>
      </div>
      
      <h2>How It Works</h2>
      <p>
        ChainCSS offers two modes:
      </p>
      <ul>
        <li><strong>Runtime Mode:</strong> Styles are generated on the fly using the <code className="inline-code">useChainStyles</code> hook</li>
        <li><strong>Build Mode:</strong> Styles are pre-compiled from <code className="inline-code">.jcss</code> files with atomic optimization</li>
      </ul>
      
      <div className="tip">
        <strong>Tip:</strong> Start with runtime mode for development, then enable build mode for production to get the smallest bundle size!
      </div>
    </>
  );
}