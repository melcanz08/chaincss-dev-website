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
      <div className="code-block">
        <pre>{`// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import chaincss from 'chaincss/vite-plugin';

export default defineConfig({
  plugins: [
    chaincss({
      extension: '.jcss',
      minify: process.env.NODE_ENV === 'production',
      prefix: true,
      atomic: true
    }),
    react()
  ]
});`}</pre>
      </div>

      <h2>Next.js Plugin</h2>
      <div className="code-block">
        <pre>{`// next.config.js
const withChainCSS = require('chaincss/next-plugin');

module.exports = withChainCSS({
  reactStrictMode: true,
  chaincss: {
    atomic: true,
    prefixer: true
  }
});`}</pre>
      </div>

      <h2>Webpack Plugin</h2>
      <div className="code-block">
        <pre>{`// webpack.config.js
const ChainCSSPlugin = require('chaincss/webpack-plugin');

module.exports = {
  plugins: [
    new ChainCSSPlugin({
      atomic: true,
      input: './src/styles/main.jcss',
      output: './dist'
    })
  ]
};`}</pre>
      </div>

      <h2>CLI Usage</h2>
      <div className="code-block">
        <pre>{`# Basic compilation
chaincss ./src/main.jcss ./dist

# Watch mode
chaincss ./src/main.jcss ./dist --watch

# Atomic CSS optimization
chaincss ./src/main.jcss ./dist --atomic

# With source maps
chaincss ./src/main.jcss ./dist --source-map

# Custom browser support
chaincss ./src/main.jcss ./dist --browsers "> 1%, last 2 versions"`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Tip:</strong> Use <code className="inline-code">--watch</code> during development for instant CSS updates!
      </div>
    </>
  );
}