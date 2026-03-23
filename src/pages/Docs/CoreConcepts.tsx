export default function CoreConcepts() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Chainable API</h1>
        <p className="docs-description">
          The core of ChainCSS is its intuitive chainable API
        </p>
      </div>
      
      <h2>Basic Usage</h2>
      <pre className="code-block">
        <code>{`const styles = $()
  .backgroundColor('blue')
  .color('white')
  .padding('1rem')
  .borderRadius('8px')
  .block();`}</code>
      </pre>
      
      <h2>Hover States</h2>
      <pre className="code-block">
        <code>{`const styles = $()
  .backgroundColor('blue')
  .hover()
    .backgroundColor('darkblue')
    .scale(1.05)
  .end()
  .transition('all 0.2s')
  .block();`}</code>
      </pre>
      
      <h2>Selectors</h2>
      <pre className="code-block">
        <code>{`const styles = $()
  .color('red')
  .block('.error', '.warning');`}</code>
      </pre>
      
      <h2>At-Rules</h2>
      <pre className="code-block">
        <code>{`$()
  .media('(max-width: 768px)', ($) => {
    $.fontSize('14px')
  })
  .keyframes('slideIn', ($) => {
    $.from().transform('translateX(-100%)')
    $.to().transform('translateX(0)')
  })
  .block();`}</code>
      </pre>
    </>
  );
}