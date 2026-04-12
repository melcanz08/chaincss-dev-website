import CodeBlock from '../../components/CodeBlock';

export default function QuickStart() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Quick Start</h1>
        <p className="docs-description">
          Get up and running with ChainCSS v2 in 5 minutes.
        </p>
      </div>
      
      <div className="tip" style={{ marginBottom: '24px' }}>
         This is the fast track. For a detailed walkthrough with interactive examples, check out <a href="/docs/your-first-style">Your First Style</a>.
      </div>
      
      <h2>1. Install</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <h2>2. Initialize configuration (optional)</h2>
      <CodeBlock language="bash" code={`npx chaincss init`} />
      
      <h2>3. Create a style</h2>
      <p>Create <code className="inline-code">src/styles/button.chain.js</code>:</p>
      <CodeBlock language="javascript" code={`import { $ } from 'chaincss';

export const button = $
  .bg('#3b82f6')      // backgroundColor
  .c('white')         // color 
  .p('12px 24px')     // padding
  .rounded('8px')     // borderRadius
  .cursor('pointer')  // cursor
  .hover()
    .bg('#2563eb')    // hover background
  .end()
  .$el('.btn');       // CSS selector`} />
      
      <h2>4. Generate CSS</h2>
      <CodeBlock language="bash" code={`npx chaincss build`} />
      <p>Output:</p>
      <CodeBlock language="text" code={`✓ Generated: src/global-style/global.css
✓ Generated: src/styles/button.class.js
✓ Generated: src/styles/button.css`} />
      
      <h2>5. Use in HTML (Vanilla JS)</h2>
      <CodeBlock language="html" code={`<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="src/global-style/global.css">
</head>
<body>
  <button class="btn">Click Me</button>
</body>
</html>`} />
      
      <h2>6. Or use in React</h2>
      <CodeBlock language="jsx" code={`import { button } from './styles/button.class.js';
function Button() {
  return <button className={button}>Click Me</button>;
}`} />
      
      <div className="tip">
        <strong>That's it!</strong> You now have a styled button with hover effects. 
        ChainCSS v2 works with vanilla JS, React, Vue, and any other framework!
      </div>
      
      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/chainable-api">Chainable API</a> - Master the syntax</li>
        <li><a href="/docs/responsive">Responsive Design</a> - Mobile-first breakpoints</li>
        <li><a href="/docs/animations">Animations</a> - Built-in animation presets</li>
        <li><a href="/docs/configuration">Configuration</a> - Customize ChainCSS</li>
      </ul>
      
      <div className="note" style={{ marginTop: '24px' }}>
        <strong>💡 Pro tip:</strong> ChainCSS v2 supports both <strong>build-time</strong> (zero-runtime) and <strong>runtime</strong> modes. 
        The example above uses build-time mode for maximum performance!
      </div>
    </>
  );
}