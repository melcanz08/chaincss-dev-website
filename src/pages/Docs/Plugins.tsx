export default function Plugins() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Build Plugins</h1>
        <p className="docs-description">
          Integrate ChainCSS with your favorite build tools
        </p>
      </div>
      
      <h2>Vite Plugin</h2>
      <pre className="code-block">
        <code>{`// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import chaincssVite from 'chaincss/node/plugins/vite-plugin'

export default defineConfig({
  plugins: [
    react(),
    chaincssVite({
      extension: '.jcss',
      minify: true,
      prefix: true
    })
  ]
})`}</code>
      </pre>
      
      <h2>Webpack Plugin</h2>
      <pre className="code-block">
        <code>{`// webpack.config.js
const ChainCSSPlugin = require('chaincss/node/plugins/webpack-plugin');

module.exports = {
  plugins: [
    new ChainCSSPlugin({
      input: './src/styles/main.jcss',
      output: './dist',
      atomic: true
    })
  ]
};`}</code>
      </pre>
      
      <h2>Next.js Plugin</h2>
      <pre className="code-block">
        <code>{`// next.config.js
const withChainCSS = require('chaincss/node/plugins/next-plugin');

module.exports = withChainCSS({
  chaincss: {
    atomic: process.env.NODE_ENV === 'production'
  }
});`}</code>
      </pre>
      
      <h2>CLI Usage</h2>
      <pre className="code-block">
        <code>{`# Compile .jcss file
chaincss src/styles/main.jcss dist/global.css

# Watch mode
chaincss src/styles/main.jcss dist/global.css --watch

# Enable atomic optimization
chaincss src/styles/main.jcss dist/global.css --atomic`}</code>
      </pre>
    </>
  );
}