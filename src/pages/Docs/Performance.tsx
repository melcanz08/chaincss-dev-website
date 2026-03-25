export default function Performance() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Performance Optimization</h1>
        <p className="docs-description">
          Make your ChainCSS app blazing fast
        </p>
      </div>

      <h2>Performance Benchmarks</h2>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Library</th>
              <th>Bundle Size</th>
              <th>Runtime</th>
              <th>First Paint</th>
            </tr>
          </thead>
          <tbody>
            <tr className="comparison-row">
              <td className="problem-cell"><strong>ChainCSS (Build)</strong></td>
              <td className="solution-cell">0KB</td>
              <td className="solution-cell">0ms</td>
              <td className="solution-cell">~45ms</td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">ChainCSS (Runtime)</td>
              <td className="solution-cell">3.2KB</td>
              <td className="solution-cell">~2ms</td>
              <td className="solution-cell">~50ms</td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Styled Components</td>
              <td className="solution-cell">12.4KB</td>
              <td className="solution-cell">~15ms</td>
              <td className="solution-cell">~120ms</td>
            </tr>
            <tr className="comparison-row">
              <td className="problem-cell">Emotion</td>
              <td className="solution-cell">7.9KB</td>
              <td className="solution-cell">~10ms</td>
              <td className="solution-cell">~100ms</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Optimization Strategies</h2>
      <div className="code-block">
        <pre>{`// 1. Use build mode for static components
//Good
const styles = $().color('red').block();  // Build mode

// 2. Use runtime mode only when needed
//Good
const styles = useChainStyles(() => ({
  btn: $().backgroundColor(props.color).block()
}), [props.color]);

// 3. Enable atomic CSS
//Good
npx chaincss ./src/main.jcss ./dist --atomic

// 4. Enable tree shaking
//Good
--tree-shake`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Performance Tip:</strong> Use build mode for 90% of styles, runtime only for dynamic props!
      </div>
    </>
  );
}