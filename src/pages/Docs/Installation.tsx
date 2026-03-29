import CodeBlock from '../../components/CodeBlock';

export default function Installation() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Installation</h1>
        <p className="docs-description">
          Get started with ChainCSS in your project.
        </p>
      </div>
      
      <h2>Package Managers</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      <p>Or with yarn:</p>
      <CodeBlock language="bash" code={`yarn add chaincss`} />
      <p>Or with pnpm:</p>
      <CodeBlock language="bash" code={`pnpm add chaincss`} />
      
      <h2>Requirements</h2>
      <ul>
        <li><strong>Node.js 14+</strong> - For build mode and CLI</li>
        <li><strong>React 16.8+</strong> - Optional, for React hooks support</li>
        <li><strong>Vue 3+</strong> - Optional, for Vue composables</li>
      </ul>
      
      <h2>Build Tool Plugins</h2>
      <p>ChainCSS integrates with your favorite build tools:</p>
      
      <h3>Next.js</h3>
      <CodeBlock language="javascript" code={`// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true
});`} />
      
      <h3>Vite</h3>
      <CodeBlock language="javascript" code={`// vite.config.js
import chaincss from 'chaincss/vite-plugin';

export default {
  plugins: [chaincss()]
};`} />
      
      <h3>Webpack</h3>
      <CodeBlock language="javascript" code={`// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');

module.exports = {
  plugins: [new ChainCSSPlugin()]
};`} />
      
      <h2>Optional Dependencies</h2>
      <p>For full autoprefixer support:</p>
      <CodeBlock language="bash" code={`npm install -D autoprefixer postcss browserslist caniuse-db`} />
      <div className="tip">
        ChainCSS works without these, but autoprefixer is recommended for cross-browser compatibility.
      </div>
      
      {/* Navigation 
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs" style={{ color: '#667eea', textDecoration: 'none' }}>← Introduction</a>
        <a href="/docs/quick-start" style={{ color: '#667eea', textDecoration: 'none' }}>Quick Start →</a>
      </div>*/}
    </>
  );
}