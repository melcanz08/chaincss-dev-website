import CodeBlock from '../../components/CodeBlock';

export default function QuickStart() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Quick Start</h1>
        <p className="docs-description">
          Get up and running with ChainCSS in 5 minutes.
        </p>
      </div>
      
      <div className="tip" style={{ marginBottom: '24px' }}>
         This is the fast track. For a detailed walkthrough with interactive examples, check out <a href="/docs/your-first-style">Your First Style</a>.
      </div>
      
      <h2>Install</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <h2>Create a style</h2>
      <p>Create <code className="inline-code">styles.jcss</code>:</p>
      <CodeBlock language="javascript" code={`<@
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .block('.btn');

run(button);
@>`} />
      
      <h2>Generate CSS</h2>
      <CodeBlock language="bash" code={`npx chaincss styles.jcss ./styles`} />
      
      <h2>Use in HTML</h2>
      <CodeBlock language="html" code={`<link rel="stylesheet" href=".styles/global.css">
<button class="btn">Click Me</button>`} />
      
      <h2>Add interactivity</h2>
      <CodeBlock language="javascript" code={`<@
const button = $()
  .backgroundColor('#3b82f6')
  .color('white')
  .padding('12px 24px')
  .borderRadius('8px')
  .hover()
    .backgroundColor('#2563eb')
    .end()
  .block('.btn');

run(button);
@>`} />
      
      <div className="tip">
        That's it! You now have a styled button with hover effects.
      </div>
      
      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/chainable-api">Chainable API</a> - Understand the core syntax</li>
        <li><a href="/docs/design-tokens">Design Tokens</a> - Build a design system</li>
        <li><a href="/docs/atomic-css">Atomic CSS</a> - Optimize your CSS bundle</li>
        <li><a href="/docs/react">React Integration</a> - Use with React</li>
        <li><a href="/docs/vue">Vue Integration</a> - Use with Vue</li>
      </ul>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs/installation" style={{ color: '#667eea', textDecoration: 'none' }}>← Installation</a>
        <a href="/docs/your-first-style" style={{ color: '#667eea', textDecoration: 'none' }}>Your First Style →</a>
      </div>*/}
    </>
  );
}