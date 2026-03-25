export default function SSR() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Server-Side Rendering (SSR)</h1>
        <p className="docs-description">
          Optimize your app for server-side rendering
        </p>
      </div>

      <h2>How ChainCSS Handles SSR</h2>
      <p>
        ChainCSS extracts CSS during build, so on the server, styles are already in your CSS bundle.
        No runtime CSS injection needed!
      </p>

      <h2>Next.js Pages Router</h2>
      <div className="code-block">
        <pre>{`// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* global.css contains all extracted ChainCSS styles */}
        <link rel="stylesheet" href="/styles/global.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`}</pre>
      </div>

      <h2>Manual SSR with ReactDOMServer</h2>
      <div className="code-block">
        <pre>{`import { renderToString } from 'react-dom/server';
import { chain } from 'chaincss';
import App from './App';

// Render your app
const html = renderToString(<App />);

// Get all generated CSS
const css = chain.cssOutput;

// Send HTML with inline styles (optional)
const fullHtml = \`
  <!DOCTYPE html>
  <html>
    <head>
      <style>\${css}</style>
    </head>
    <body>
      <div id="root">\${html}</div>
    </body>
  </html>
\`;`}</pre>
      </div>

      <h2>Performance Metrics</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong>Time to First Paint</strong>
          <p>~50ms faster than runtime CSS-in-JS</p>
        </div>
        <div className="feature-card">
          <strong>First Contentful Paint</strong>
          <p>CSS is ready before JavaScript loads</p>
        </div>
        <div className="feature-card">
          <strong>Cumulative Layout Shift</strong>
          <p>Zero CLS from style injection</p>
        </div>
      </div>

      <div className="warning">
        <strong>⚠️ Important:</strong> Always use build mode for SSR to ensure styles are available on the server!
      </div>
    </>
  );
}