import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

export default function APIReference() {
  return (
    <>
      <h1 className={contentTitle}>API Reference</h1>
      <p className={contentDesc}>
        Complete reference for the ChainCSS v2.8.15 public API.
      </p>

      <h2 className={sectionHeading}>chain(options?)</h2>
      <p className={paragraph}>
        Creates a new style chain. Returns a proxy that collects styles and 
        ultimately compiles to a class name string.
      </p>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

const styles = chain()
  .property(value)   // any CSS property in camelCase
  .$el('name')       // finalize → { selectors, ...properties }

// With debug mode:
const debugChain = chain({ debug: true })
debugChain.explain().visualization  // prints style breakdown`}</pre>

      <h2 className={sectionHeading}>chain.dynamic(options?)</h2>
      <p className={paragraph}>
        Creates a mixed-mode chain. Static values compile to CSS; functions stay 
        dynamic and resolve at runtime via <span className={inlineCode}>useChainStyles</span>.
      </p>
      <pre className={codeBlock}>{`import { chain } from 'chaincss'

export const btn = chain.dynamic()
  .bg('#6366f1')                                    // → static CSS
  .color('#ffffff')                                  // → static CSS
  .opacity(() => isActive ? 1 : 0.5)                 // → runtime
  .shadow(() => isActive ? '0 8px 25px rgba(...)' : '0 2px 8px rgba(...)')
  .$el('btn')

// Component usage:
import { btn, btnClass } from '../styles/button.chain'
import { useChainStyles } from 'chaincss/runtime'
const classes = useChainStyles({ btn }, [isActive])
// <button className={\`\${btnClass} \${classes.btn}\`}>Click</button>`}</pre>

      <h2 className={sectionHeading}>compileToCSS(styleObject, options?)</h2>
      <p className={paragraph}>
        Compiles a style object to a CSS string. Used at build time.
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Option</th><th className={docTh}>Type</th><th className={docTh}>Default</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            <tr><td className={docTd}>scopeSelector</td><td className={docTd}>string</td><td className={docTd}>''</td><td className={docTd}>CSS selector for the rule</td></tr>
            <tr><td className={docTd}>minify</td><td className={docTd}>boolean</td><td className={docTd}>false</td><td className={docTd}>Minify output</td></tr>
            <tr><td className={docTd}>sourceMap</td><td className={docTd}>boolean</td><td className={docTd}>false</td><td className={docTd}>Add source comments</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>partitionForBuild(styleObject, options?)</h2>
      <p className={paragraph}>
        Splits a style object into static CSS and dynamic values. Returns{' '}
        <span className={inlineCode}>{`{ css, dynamicValues, hasDynamic }`}</span>.
      </p>

      <h2 className={sectionHeading}>classifyValue(value)</h2>
      <p className={paragraph}>
        Returns <span className={inlineCode}>'static'</span> for strings/numbers,{' '}
        <span className={inlineCode}>'dynamic'</span> for functions.
      </p>

      <h2 className={sectionHeading}>Shorthands</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Shorthand</th><th className={docTh}>CSS Property</th><th className={docTh}>Example</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><span className={inlineCode}>bg()</span></td><td className={docTd}>background</td><td className={docTd}>.bg('#6366f1') or .bg('linear-gradient(...)')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>bgc()</span></td><td className={docTd}>background-color</td><td className={docTd}>.bgc('#6366f1')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>fs()</span></td><td className={docTd}>font-size</td><td className={docTd}>.fs(16)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>fw()</span></td><td className={docTd}>font-weight</td><td className={docTd}>.fw(600)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>rounded()</span></td><td className={docTd}>border-radius</td><td className={docTd}>.rounded(8)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>p() / m()</span></td><td className={docTd}>padding / margin</td><td className={docTd}>.p('12px 24px')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>flex() / grid()</span></td><td className={docTd}>display</td><td className={docTd}>.flex()</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>w() / h()</span></td><td className={docTd}>width / height</td><td className={docTd}>.w('100%')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>pos()</span></td><td className={docTd}>position</td><td className={docTd}>.pos('absolute')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>z()</span></td><td className={docTd}>z-index</td><td className={docTd}>.z(50)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>op()</span></td><td className={docTd}>opacity</td><td className={docTd}>.op(0.5)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>gap()</span></td><td className={docTd}>gap</td><td className={docTd}>.gap(16)</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>transform()</span></td><td className={docTd}>transform</td><td className={docTd}>.transform('translateY(-2px)')</td></tr>
            <tr><td className={docTd}><span className={inlineCode}>transition()</span></td><td className={docTd}>transition</td><td className={docTd}>.transition('all 0.2s ease')</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>States & Selectors</h2>
      <pre className={codeBlock}>{`chain()
  .hover()                    // :hover pseudo-class
    .bg('darkred')
  .end()
  .focus()                    // :focus pseudo-class
    .outline('2px solid blue')
  .end()
  .active()                   // :active pseudo-class
    .transform('scale(0.98)')
  .end()
  .checked()                  // :checked pseudo-class
    .bg('#6366f1')
  .end()
  .placeholder()              // ::placeholder pseudo-element
    .color('#a1a1aa')
  .end()
  .nest('.child', (c) =>      // nested selector
    c.color('blue')
  )
  .children((c) =>            // & > * selector
    c.padding(8)
  )
  .media('(min-width: 768px)', (c) =>
    c.flexDirection('row')
  )
  .supports('display: grid', (c) =>
    c.gap(16)
  )
  .when(condition, (c) =>     // conditional block
    c.display('none')
  )
  .$el('component')`}</pre>

      <h2 className={sectionHeading}>Compiler</h2>
      <p className={paragraph}>
        For build tooling, use <span className={inlineCode}>ChainCSSCompiler</span>:
      </p>
      <pre className={codeBlock}>{`import { ChainCSSCompiler } from 'chaincss'

const compiler = new ChainCSSCompiler({
  atomic: { enabled: true },
  output: { minify: true },
  verbose: true
})

// Compile a single style
const result = compiler.compileStyle('my-component', styleDef)

// Compile a file
const results = await compiler.compileFile('./styles/button.chain.ts')

// Compile multiple components
await compiler.compileComponents(['./src/styles/*.chain.ts'])

// Pipeline control
compiler.setPipelineEnabled(false)   // disable pipeline
compiler.isPipelineEnabled()         // check status
compiler.printPipelineReport()       // print timing report`}</pre>
    </>
  );
}