export default function APIReference() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">API Reference</h1>
        <p className="docs-description">
          Complete API documentation for ChainCSS
        </p>
      </div>
      
      <h2>$() - Chainable Builder</h2>
      <pre className="code-block">
        <code>{`$() -> ChainBuilder
  .hover() -> Enter hover mode
  .end() -> Exit hover mode
  .block(...selectors) -> Return style object`}</code>
      </pre>
      
      <h2>useChainStyles() - React Hook</h2>
      <pre className="code-block">
        <code>{`useChainStyles(styles: () => object, deps?: any[]) -> classNames`}</code>
      </pre>
      
      <h2>recipe() - Variant System</h2>
      <pre className="code-block">
        <code>{`recipe({
  base: string | object,
  variants: Record<string, Record<string, string | object>>,
  defaultVariants?: Record<string, string>,
  compoundVariants?: Array<{...}>
}) -> (props) => string`}</code>
      </pre>
      
      <h2>compile() - Build-time Compiler</h2>
      <pre className="code-block">
        <code>{`compile(styles: object) -> string // Returns CSS`}</code>
      </pre>
      
      <h2>createTokens() - Design Tokens</h2>
      <pre className="code-block">
        <code>{`createTokens(tokens: object) -> TokenManager
  .get(path: string) -> value
  .toCSSVariables() -> string
  .createTheme(name, overrides) -> TokenManager`}</code>
      </pre>
    </>
  );
}