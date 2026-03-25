export default function Troubleshooting() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Troubleshooting</h1>
        <p className="docs-description">
          Common issues and their solutions
        </p>
      </div>

      <h2>Common Issues</h2>

      <div className="warning">
        <strong>❌ Hover styles not working</strong>
        <p><strong>Solution:</strong> Make sure you use <code className="inline-code">.end()</code> after hover properties:</p>
        <pre>{`.hover()
  .backgroundColor('darkblue')
  .scale(1.05)
  .end()  // ← Don't forget this!`}</pre>
      </div>

      <div className="warning">
        <strong>❌ "Could not resolve 'react'" error</strong>
        <p><strong>Solution:</strong> Add dedupe to your Vite config:</p>
        <pre>{`resolve: {
  dedupe: ['react', 'react-dom']
}`}</pre>
      </div>

      <div className="warning">
        <strong>❌ CSS not updating in development</strong>
        <p><strong>Solution:</strong> Clear Vite cache:</p>
        <pre>{`rm -rf node_modules/.vite .vite
npm run dev`}</pre>
      </div>

      <div className="warning">
        <strong>❌ Autoprefixer not working</strong>
        <p><strong>Solution:</strong> Install peer dependencies:</p>
        <pre>{`npm install -D autoprefixer postcss browserslist caniuse-db`}</pre>
      </div>

      <div className="warning">
        <strong>❌ TypeScript errors with chaincss/react</strong>
        <p><strong>Solution:</strong> Add types to your tsconfig:</p>
        <pre>{`{
  "compilerOptions": {
    "types": ["chaincss"]
  }
}`}</pre>
      </div>

      <h2>Debug Checklist</h2>
      <ul>
        <li>✓ Enable debug mode: <code className="inline-code">enableChainCSSDebug()</code></li>
        <li>✓ Check browser console for warnings</li>
        <li>✓ Verify CSS is in <code className="inline-code">global.css</code></li>
        <li>✓ Clear Vite cache after package updates</li>
        <li>✓ Ensure peer dependencies are installed</li>
      </ul>
    </>
  );
}