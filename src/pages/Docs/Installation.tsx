export default function Installation() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Installation</h1>
        <p className="docs-description">Get started with ChainCSS in your project</p>
      </div>
      
      <h2>Install via npm</h2>
      <pre className="code-block">
        <code>npm install @melcanz85/chaincss</code>
      </pre>
      
      <h2>Install via yarn</h2>
      <pre className="code-block">
        <code>yarn add @melcanz85/chaincss</code>
      </pre>
      
      <h2>Install via pnpm</h2>
      <pre className="code-block">
        <code>pnpm add @melcanz85/chaincss</code>
      </pre>
      
      <h2>Requirements</h2>
      <ul>
        <li>React 16.8+ (for Hooks support)</li>
        <li>Node.js 14+ (for build mode)</li>
      </ul>
      
      <div className="tip">
        <strong>💡 Pro tip:</strong> ChainCSS works in both runtime and build modes.
        Choose what fits your project best!
      </div>
    </>
  );
}