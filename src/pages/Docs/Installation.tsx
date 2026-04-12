import CodeBlock from '../../components/CodeBlock';

export default function Installation() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Installation</h1>
        <p className="docs-description">
          Get started with ChainCSS v2 in your project.
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
        <li><strong>Node.js 18+</strong> - Required for build mode and CLI</li>
        <li><strong>React 18+</strong> - Optional, for React hooks support</li>
        <li><strong>Vue 3+</strong> - Optional, for Vue composables</li>
      </ul>
      
      <div className="tip">
        <strong>💡 New in v2:</strong> ChainCSS now supports both <strong>build-time</strong> (zero-runtime) and <strong>runtime</strong> modes. Choose what fits your project!
      </div>
      
      <h2>Build Tool Plugins</h2>
      <p>ChainCSS integrates with your favorite build tools:</p>
      
      <h3>Vite</h3>
      <CodeBlock language="javascript" code={`// vite.config.js
import { defineConfig } from 'vite';
import chaincss from 'chaincss/plugin/vite';

export default defineConfig({
  plugins: [chaincss()]
});`} />
      
      <h3>Webpack</h3>
      <CodeBlock language="javascript" code={`// webpack.config.js
const ChainCSSPlugin = require('chaincss/plugin/webpack');

module.exports = {
  plugins: [new ChainCSSPlugin()]
};`} />
      
      <h3>Next.js (Coming Soon)</h3>
      <div className="note">
        Next.js plugin is currently in development. For now, use the CLI approach:
        <CodeBlock language="bash" code={`npm run build:css`} />
      </div>
      
      <h2>Optional Dependencies</h2>
      <p>For full autoprefixer support (recommended):</p>
      <CodeBlock language="bash" code={`npm install -D autoprefixer postcss browserslist caniuse-db`} />
      <div className="tip">
        <strong>Note:</strong> ChainCSS works without these, but autoprefixer is recommended for cross-browser compatibility. Without it, you'll see a warning but styles will still work.
      </div>
      
      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/quick-start">Quick Start</a> - Create your first style</li>
        <li><a href="/docs/chainable-api">Chainable API</a> - Learn the syntax</li>
        <li><a href="/docs/configuration">Configuration</a> - Customize ChainCSS</li>
      </ul>
      
      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <a href="/docs" style={{ color: '#667eea', textDecoration: 'none' }}>← Introduction</a>
        <a href="/docs/quick-start" style={{ color: '#667eea', textDecoration: 'none' }}>Quick Start →</a>
      </div>
    </>
  );
}