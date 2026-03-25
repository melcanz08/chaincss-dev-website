export default function APIReference() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">API Reference</h1>
        <p className="docs-description">
          Complete ChainCSS API documentation
        </p>
      </div>

      <h2><code className="inline-code">$()</code></h2>
      <p>Creates a new chainable style object.</p>
      <div className="code-block">
        <pre>{`$().color('red').fontSize('16px').block();`}</pre>
      </div>

      <h2><code className="inline-code">.block(...selectors)</code></h2>
      <p>Terminates the chain and returns the style object. Optionally adds selectors.</p>
      <div className="code-block">
        <pre>{`const style = $().color('red').block('.btn');
// Returns { color: 'red', selectors: ['.btn'] }`}</pre>
      </div>

      <h2><code className="inline-code">.hover()</code> and <code className="inline-code">.end()</code></h2>
      <p>Define hover styles. Use <code className="inline-code">.end()</code> to exit hover mode.</p>
      <div className="code-block">
        <pre>{`$()
  .backgroundColor('blue')
  .hover()
    .backgroundColor('darkblue')
    .end()
  .transition('all 0.2s')
  .block();`}</pre>
      </div>

      <h2><code className="inline-code">.select(selector)</code></h2>
      <p>Define nested styles for child elements.</p>
      <div className="code-block">
        <pre>{`$()
  .select('.parent .child')
    .color('red')
    .block()
  .block();`}</pre>
      </div>

      <h2><code className="inline-code">recipe()</code></h2>
      <p>Create variant-based components.</p>
      <div className="code-block">
        <pre>{`const button = recipe({
  base: $().padding('8px 16px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('blue').block()
    }
  }
});`}</pre>
      </div>

      <h2><code className="inline-code">createTokens()</code></h2>
      <p>Create design tokens for theming.</p>
      <div className="code-block">
        <pre>{`const tokens = createTokens({
  colors: { primary: '#3b82f6' },
  spacing: { md: '1rem' }
});`}</pre>
      </div>

      <h2><code className="inline-code">responsive()</code></h2>
      <p>Create responsive values using breakpoints.</p>
      <div className="code-block">
        <pre>{`const fontSize = responsive({
  base: '14px',
  sm: '16px',
  md: '18px'
});`}</pre>
      </div>

      <h2>React Hooks</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <strong><code className="inline-code">useChainStyles(styles, deps?)</code></strong>
          <p>Main hook for runtime styles</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">useDynamicChainStyles(styleFactory, deps?)</code></strong>
          <p>For styles that depend on props</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">useThemeChainStyles(styles, theme)</code></strong>
          <p>Theme-aware styles</p>
        </div>
        <div className="feature-card">
          <strong><code className="inline-code">cx(...classes)</code></strong>
          <p>Conditional class name utility</p>
        </div>
      </div>

      <h2>At-Rules API</h2>
      <div className="code-block">
        <pre>{`// Media Query
.media('(max-width: 768px)', (css) => {
  css.$('.element').padding('10px').block();
})

// Keyframes
.keyframes('slide', (kf) => {
  kf.from((step) => step.transform('translateX(-100%)'));
  kf.to((step) => step.transform('translateX(0)'));
})

// Container Query
.container('(min-width: 400px)', (css) => {
  css.$('.card').display('flex').block();
})

// @supports
.supports('display: grid', (css) => {
  css.$('.grid').display('grid').block();
})

// @layer
.layer('components', (css) => {
  css.$('.btn').padding('8px 16px').block();
})`}</pre>
      </div>
    </>
  );
}