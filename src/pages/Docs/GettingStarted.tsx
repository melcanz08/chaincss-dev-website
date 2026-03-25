export default function GettingStarted() {
  const problems = [
    {
      problem: "Styled Components are slow",
      solution: "Use Build Mode = 0KB runtime, pure CSS",
    },
    {
      problem: "CSS Modules are limited",
      solution: "Add JavaScript power with Runtime Mode",
    },
    {
      problem: "Tailwind makes HTML ugly",
      solution: "Atomic CSS without cluttering your markup",
    },
    {
      problem: "Vanilla Extract is complex",
      solution: "Simple, intuitive chainable API",
    },
    {
      problem: "Need both static and dynamic styles",
      solution: "Choose per component!",
    }
  ];

  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Introduction to ChainCSS</h1>
        <p className="docs-description">
          Zero-runtime CSS-in-JS with atomic CSS and dynamic theming
        </p>
      </div>
      
      <h2>What is ChainCSS?</h2><br />
      <p>
        ChainCSS is a powerful and flexible CSS-in-JS library that combines the <strong>best of both worlds</strong>: the performance of static CSS extraction and the flexibility of runtime styling. Write styles with an intuitive chainable API, and choose whether they're applied at build time or runtime.
      </p><br />

      <div className="tip">
        <strong>Why "ChainCSS"?</strong> The name comes from its <strong>chainable API</strong> - 
        you can chain methods together like `.color('red').backgroundColor('blue').padding('1rem').block()`
      </div><br />

      <h2>Why ChainCSS?</h2>
      <br />
      <p>
        In the modern web development landscape, you shouldn't have to choose between:
      </p>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>ChainCSS Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr className="comparison-row">
              <td className="problem-cell">Styled Components are slow</td>
              <td className="solution-cell">
                Use Build Mode = 0KB runtime, pure CSS
                <span className="solution-badge">Zero runtime</span>
              </td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">CSS Modules are limited</td>
              <td className="solution-cell">
                Add JavaScript power with Runtime Mode
              </td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Tailwind makes HTML ugly</td>
              <td className="solution-cell">
                Atomic CSS without cluttering your markup
              </td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Vanilla Extract is complex</td>
              <td className="solution-cell">
                Simple, intuitive chainable API
              </td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Need both static and dynamic styles</td>
              <td className="solution-cell">
                Choose per component!
                <span className="solution-badge">Best of both</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="tip" style={{ marginTop: '2rem' }}>
        <strong> Why ChainCSS? </strong> 
        No compromises. No lock-in. Just clean, efficient styling that works the way you want.
      </div>

      <h2>Key Features</h2>
      <br />
      <div className="feature-grid">
        <div className="feature-card">
          <strong>Zero Runtime</strong>
          <p>0-3.2KB bundle size with atomic optimization</p>
        </div>
        <div className="feature-card">
          <strong>Chainable API</strong>
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
      <br />
      <p>
        ChainCSS offers two modes:
      </p>
      <br />
      <ul>
        <li><strong>Runtime Mode:</strong> Styles are generated on the fly using the <code className="inline-code">useChainStyles</code> hook — perfect for dynamic props and theming</li><br />
        <li><strong>Build Mode:</strong> Styles are pre-compiled from <code className="inline-code">.jcss</code> files with atomic optimization — ideal for static styles and maximum performance</li><br />
      </ul>
      
      <div className="note">
        <strong>📘 Pro Tip:</strong> Start with runtime mode for development, then enable build mode for production to get the smallest bundle size!
      </div>
    </>
  );
}