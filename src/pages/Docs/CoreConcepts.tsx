export default function CoreConcepts() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Core Concepts</h1>
        <p className="docs-description">
          Understanding the ChainCSS API
        </p>
      </div>

      <h2>The <code className="inline-code">$()</code> Function</h2>
      <p>
        The heart of ChainCSS is the <code className="inline-code">$()</code> function. 
        It creates a chainable proxy that collects styles until you call <code className="inline-code">.block()</code>.
      </p>
      <div className="code-block">
        <pre>{`const styles = $()
  .color('red')
  .backgroundColor('blue')
  .padding('10px')
  .block();

// styles = { color: 'red', backgroundColor: 'blue', padding: '10px' }`}</pre>
      </div>

      <h2>The <code className="inline-code">.block()</code> Method</h2>
      <p>
        <code className="inline-code">.block()</code> terminates the chain and returns the style object. 
        You can also pass selectors:
      </p>
      <div className="code-block">
        <pre>{`const button = $()
  .color('white')
  .backgroundColor('blue')
  .block('.btn', '.button', '[type="button"]');

// button.selectors = ['.btn', '.button', '[type="button"]']`}</pre>
      </div>

      <h2>CSS Properties (camelCase)</h2>
      <p>ChainCSS uses camelCase for CSS properties (like React):</p>
      <div className="code-block">
        <pre>{`// All these work:
.backgroundColor('blue')
.borderRadius('8px')
.fontSize('16px')
.textAlign('center')
.boxShadow('0 2px 4px rgba(0,0,0,0.1)')
.transition('all 0.2s')`}</pre>
      </div>

      <h2>Multiple Selectors</h2>
      <div className="code-block">
        <pre>{`const element = $()
  .color('red')
  .block('.btn', '.button', '[type="submit"]');`}</pre>
      </div>

      <h2>Hover States with <code className="inline-code">.end()</code></h2>
      <div className="code-block">
        <pre>{`const button = $()
  .backgroundColor('blue')
  .color('white')
  .hover()
    .backgroundColor('darkblue')
    .scale(1.05)
    .end()
  .transition('all 0.2s')
  .block();`}</pre>
      </div>

      <h2>Nested Selectors with <code className="inline-code">.select()</code></h2>
      <div className="code-block">
        <pre>{`const component = $()
  .select('.parent .child')
    .color('red')
    .fontSize('16px')
    .block()
  .block();`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Tip:</strong> Always end your hover styles with <code className="inline-code">.end()</code> to exit hover mode!
      </div>
    </>
  );
}