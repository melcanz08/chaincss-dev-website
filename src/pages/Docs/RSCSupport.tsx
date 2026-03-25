export default function RSCSupport() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">React Server Components (RSC)</h1>
        <p className="docs-description">
          Optimize your app with server-side CSS extraction
        </p>
      </div>

      <h2>What Makes ChainCSS RSC-Ready?</h2>
      <p>
        ChainCSS extracts CSS at build time, meaning your styles can be rendered on the server 
        without any client-side JavaScript overhead. This is perfect for React Server Components!
      </p>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Library</th>
              <th>CSS Extraction</th>
              <th>RSC Support</th>
              <th>Client Bundle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="comparison-row">
              <td className="problem-cell">ChainCSS</td>
              <td className="solution-cell">Build-time</td>
              <td className="solution-cell">Native</td>
              <td className="solution-cell">0KB (build mode)</td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Styled Components</td>
              <td className="solution-cell">Runtime</td>
              <td className="solution-cell">Requires 'use client'</td>
              <td className="solution-cell">12.4KB</td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Emotion</td>
              <td className="solution-cell">Runtime</td>
              <td className="solution-cell">Requires 'use client'</td>
              <td className="solution-cell">7.9KB</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Server Component with Static Styles</h2>
      <div className="code-block">
        <pre>{`// app/Button.server.jsx - NO 'use client' needed!
import { $ } from 'chaincss';

// These styles are extracted at build time
const buttonStyles = $()
  .backgroundColor('blue')
  .color('white')
  .padding('8px 16px')
  .borderRadius('4px')
  .hover()
    .backgroundColor('darkblue')
    .end()
  .block();

export function Button({ children }) {
  // CSS is already in the stylesheet!
  return <button className={buttonStyles}>{children}</button>;
}`}</pre>
      </div>

      <h2>Hybrid Component (Static + Interactive)</h2>
      <div className="code-block">
        <pre>{`// app/Counter.client.jsx
'use client';  // Only the interactive part needs this
import { useChainStyles } from 'chaincss/react';
import { useState } from 'react';

export function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  
  const styles = useChainStyles(() => ({
    counter: $()
      .fontSize('24px')
      .fontWeight('bold')
      .block()
  }), []);
  
  return (
    <div>
      <span className={styles.counter}>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`}</pre>
      </div>

      <h2>Next.js App Router Setup</h2>
      <div className="code-block">
        <pre>{`// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  experimental: {
    appDir: true
  },
  chaincss: {
    atomic: true,
    prefixer: true
  }
});`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Performance Tip:</strong> Use build mode for static components and runtime mode only for interactive parts!
      </div>
    </>
  );
}