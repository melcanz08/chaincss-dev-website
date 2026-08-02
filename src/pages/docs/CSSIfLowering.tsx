import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function CSSIfLowering() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>CSS if() Lowering</h1>
      <p className={contentDesc}>
        Write conditional styles using the experimental CSS <code className={inlineCode}>if()</code> function.
        ChainCSS compiles to native <code className={inlineCode}>if()</code> for Chrome 137+ and generates
        class-based fallbacks for every other browser. Progressive enhancement, automatically.
      </p>

      <h2 className={sectionHeading}>The Problem: Conditional CSS Without JavaScript</h2>
      <p className={paragraph}>
        CSS has no native way to express "if this custom property equals X, use value A, otherwise use value B."
        Developers resort to JavaScript, duplicate CSS blocks with different class names, or complex
        <code className={inlineCode}>:has()</code> selector chains. None of these are ideal.
      </p>
      <p className={paragraph}>
        The CSS Values Level 5 specification introduces <code className={inlineCode}>if()</code> — a native
        conditional function for CSS. But browser support is limited to Chrome 137+. ChainCSS lets you
        write <code className={inlineCode}>if()</code> today and compiles to native syntax for supported
        browsers with automatic fallbacks for everything else.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// Define a conditional style
export const themedBg = chain()
  .box({ padding: '12px 24px', borderRadius: 8 })
  .raw({
    // Native CSS if() — Chrome 137+ runs this directly
    backgroundColor: \`if(
      style(--isDark: true): #1e293b;
      else: #f1f5f9
    )\`
  })
  .raw({
    color: \`if(
      style(--isDark: true): #e2e8f0;
      else: #0f172a
    )\`
  })
  .$el('themed-box')`}</code></pre>

      <h2 className={sectionHeading}>Compiled Output</h2>
      <p className={paragraph}>
        The compiler generates two blocks — native <code className={inlineCode}>if()</code> for modern browsers
        and a <code className={inlineCode}>@supports</code> fallback with modifier classes:
      </p>

      <pre className={codeBlock}><code className="language-css">{`/* Native CSS if() — Chrome 137+ */
.chain-themed-box {
  padding: 12px 24px;
  border-radius: 8px;
  background-color: if(style(--isDark: true): #1e293b; else: #f1f5f9);
  color: if(style(--isDark: true): #e2e8f0; else: #0f172a);
}

/* Fallback for browsers without CSS if() */
@supports not (margin: if(style(--a: b): 0; else: 0)) {
  .chain-themed-box {
    padding: 12px 24px;
    border-radius: 8px;
    background-color: #f1f5f9;  /* default value */
    color: #0f172a;              /* default value */
  }
  
  /* Modifier classes for each condition */
  .chain-themed-box--isDark-true { background-color: #1e293b; }
  .chain-themed-box--isDark-true { color: #e2e8f0; }
}`}</code></pre>

      <h2 className={sectionHeading}>How the Fallback Works</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>@supports not (margin: if(...))</code> query is a feature detection
        trick. Browsers that support <code className={inlineCode}>if()</code> skip the fallback block entirely.
        Browsers that don't support it apply the default values and wait for modifier classes.
      </p>

      <pre className={codeBlock}><code className="language-tsx">{`// Runtime usage — apply modifier class when condition is true
function ThemedBox({ isDark }: { isDark: boolean }) {
  const baseClass = 'chain-themed-box'
  const modifierClass = isDark ? 'chain-themed-box--isDark-true' : ''
  
  return (
    <div className={[baseClass, modifierClass].filter(Boolean).join(' ')}>
      Themed content
    </div>
  )
}`}</code></pre>

      <h2 className={sectionHeading}>Multiple Conditions</h2>
      <p className={paragraph}>
        <code className={inlineCode}>if()</code> supports multiple conditions with chained{' '}
        <code className={inlineCode}>else if</code> logic:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .raw({
    backgroundColor: \`if(
      style(--theme: dark): #1e293b;
      else if style(--theme: high-contrast): #000000;
      else: #ffffff
    )\`
  })
  .$el('multi-themed')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Native */
.chain-multi-themed {
  background-color: if(
    style(--theme: dark): #1e293b;
    else if style(--theme: high-contrast): #000000;
    else: #ffffff
  );
}

/* Fallback */
@supports not (margin: if(style(--a: b): 0; else: 0)) {
  .chain-multi-themed { background-color: #ffffff; }
  .chain-multi-themed--theme-dark { background-color: #1e293b; }
  .chain-multi-themed--theme-high-contrast { background-color: #000000; }
}`}</code></pre>

      <h2 className={sectionHeading}>Multiple Properties, Same Condition</h2>
      <p className={paragraph}>
        When multiple properties share the same condition variable, the modifier class
        groups them together in a single block:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// These three properties all depend on --isDark
chain()
  .raw({
    backgroundColor: \`if(style(--isDark: true): #1e293b; else: #f1f5f9)\`,
    color: \`if(style(--isDark: true): #e2e8f0; else: #0f172a)\`,
    borderColor: \`if(style(--isDark: true): #334155; else: #e2e8f0)\`
  })
  .$el('card')`}</code></pre>

      <pre className={codeBlock}><code className="language-css">{`/* Fallback — all three properties in one modifier block */
@supports not (margin: if(style(--a: b): 0; else: 0)) {
  .chain-card {
    background-color: #f1f5f9;
    color: #0f172a;
    border-color: #e2e8f0;
  }
  .chain-card--isDark-true {
    background-color: #1e293b;
    color: #e2e8f0;
    border-color: #334155;
  }
}`}</code></pre>

      <h2 className={sectionHeading}>Selector Modifier Strategy</h2>
      <p className={paragraph}>
        The <code className={inlineCode}>appendModifierToLastClass</code> function safely appends
        modifier classes to compound selectors, pseudo-classes, and nested selectors:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Base Selector</th>
            <th className={docTh}>Modifier</th>
            <th className={docTh}>Result</th>
          </tr></thead>
          <tbody>{[
            ['.chain-btn', '--isDark-true', '.chain-btn--isDark-true'],
            ['.card.active', '--isDark-true', '.card--isDark-true.active'],
            ['.chain-btn:hover', '--isDark-true', '.chain-btn--isDark-true:hover'],
            ['.chain-btn::after', '--isDark-true', '.chain-btn--isDark-true::after'],
            ['div.card', '--isDark-true', 'div.card--isDark-true'],
            ['.a, .b', '--isDark-true', '.a--isDark-true, .b--isDark-true'],
          ].map(([base, modifier, result], i) => (
            <tr key={i}>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{base}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{modifier}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{result}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Browser Support</h2>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Browser</th>
            <th className={docTh}>Native if()</th>
            <th className={docTh}>Fallback</th>
          </tr></thead>
          <tbody>{[
            ['Chrome 137+', '✅ Native', 'Not used'],
            ['Firefox', '❌ Not yet supported', '✅ Modifier classes'],
            ['Safari', '❌ Not yet supported', '✅ Modifier classes'],
            ['Edge 137+', '✅ Native', 'Not used'],
            ['iOS Safari', '❌ Not yet supported', '✅ Modifier classes'],
            ['Samsung Internet', '❌ Not yet supported', '✅ Modifier classes'],
          ].map(([browser, native, fallback], i) => (
            <tr key={i}>
              <td className={docTd}><strong>{browser}</strong></td>
              <td className={docTd} style={{ fontSize: 13 }}>{native}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{fallback}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Progressive enhancement:</strong> As more browsers adopt CSS <code className={inlineCode}>if()</code>,
        the native block handles more traffic automatically. The fallback ensures
        every browser works today. When Firefox and Safari ship support, your compiled
        CSS is already ready — no code changes needed.
        See <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for the
        JavaScript-based alternative using <code className={inlineCode}>chain.dynamic()</code>.
      </div>
    </>
  );
}