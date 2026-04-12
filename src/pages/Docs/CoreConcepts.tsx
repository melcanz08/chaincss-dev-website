import CodeBlock from '../../components/CodeBlock';

export default function CoreConcepts() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Chainable API</h1>
        <p className="docs-description">
          Understanding the ChainCSS v2 API
        </p>
      </div>

      <div className="tip" style={{ marginBottom: '24px' }}>
        <strong>New in v2:</strong> ChainCSS now supports shorthand properties! Write less, do more.
      </div>

      <h2>The <code className="inline-code">$</code> Function</h2>
      <p>
        The heart of ChainCSS is the <code className="inline-code">$</code> function. 
        It creates a chainable proxy that collects styles until you call <code className="inline-code">.$el()</code>.
      </p>
      <CodeBlock 
        language="javascript"
        code={`import { $ } from 'chaincss';

// v2 syntax with shorthands
export const styles = $
  .c('red')           // color: red
  .bg('blue')         // background-color: blue
  .p('10px')          // padding: 10px
  .$el('.styles');    // terminates the chain

// Generated CSS:
// .styles { color: red; background-color: blue; padding: 10px; }`}
      />

      <h2>The <code className="inline-code">.$el()</code> Method</h2>
      <p>
        <code className="inline-code">.$el()</code> terminates the chain and assigns the styles to CSS selectors.
      </p>
      <CodeBlock 
        language="javascript"
        code={`export const button = $
  .c('white')
  .bg('blue')
  .$el('.btn', '.button', '[type="button"]');

// Generated CSS:
// .btn, .button, [type="button"] { color: white; background-color: blue; }`}
      />

      <h2>Shorthand Properties (v2)</h2>
      <p>ChainCSS v2 includes powerful shorthands to reduce typing:</p>
      <CodeBlock 
        language="javascript"
        code={`// v1 (verbose)
.backgroundColor('blue')
.color('white')
.padding('12px 24px')
.borderRadius('8px')

// v2 (shorthands)
.bg('blue')
.c('white')
.p('12px 24px')
.rounded('8px')

// Available shorthands:
// .bg()    → background-color
// .c()     → color
// .p()     → padding
// .m()     → margin
// .rounded() → border-radius
// .textSize() → font-size
// .weight() → font-weight
// .w()     → width
// .h()     → height`}
      />

      <h2>CSS Properties (camelCase)</h2>
      <p>ChainCSS supports all standard CSS properties in camelCase:</p>
      <CodeBlock 
        language="javascript"
        code={`export const card = $
  .bg('white')
  .rounded('12px')
  .textSize('16px')
  .textAlign('center')
  .boxShadow('0 2px 4px rgba(0,0,0,0.1)')
  .transition('all 0.2s')
  .$el('.card');`}
      />

      <h2>Multiple Selectors</h2>
      <CodeBlock 
        language="javascript"
        code={`export const element = $
  .c('red')
  .$el('.btn', '.button', '[type="submit"]');`}
      />

      <h2>Hover States with <code className="inline-code">.hover()</code> and <code className="inline-code">.end()</code></h2>
      <CodeBlock 
        language="javascript"
        code={`export const button = $
  .bg('blue')
  .c('white')
  .hover()
    .bg('darkblue')
  .end()
  .transition('all 0.2s')
  .$el('.btn');`}
      />

      <h2>Responsive Breakpoints (v2)</h2>
      <p>ChainCSS v2 includes built-in responsive breakpoints:</p>
      <CodeBlock 
        language="javascript"
        code={`export const title = $
  .textSize('3rem')
  .mobile((css) => css.textSize('1.5rem'))
  .tablet((css) => css.textSize('2rem'))
  .desktop((css) => css.textSize('2.5rem'))
  .$el('.title');`}
      />

      <h2>Animation Presets (v2)</h2>
      <p>Built-in animations without writing keyframes:</p>
      <CodeBlock 
        language="javascript"
        code={`export const animated = $
  .fadeIn()
  .duration('0.3s')
  .bg('blue')
  .c('white')
  .$el('.animated');`}
      />

      <h2>Math Helpers (v2)</h2>
      <p>Dynamic calculations with built-in helpers:</p>
      <CodeBlock 
        language="javascript"
        code={`export const container = $
  .width($.calc('100% - 40px'))
  .padding($.add($.rem(2), $.px(10)))
  .$el('.container');`}
      />

      <div className="tip">
        <strong>Tip:</strong> Use <code className="inline-code">.debug()</code> to see what styles are being generated:
        <CodeBlock language="javascript" code={`export const button = $
  .debug()
  .bg('blue')
  .c('white')
  .$el('.btn');
// Console output shows source file and line number`} />
      </div>

      <div className="note">
        <strong>Migration from v1:</strong>
        <ul>
          <li><code>.block()</code> → <code>.$el()</code></li>
          <li>Runtime mode: <code>import {`{ $ }`} from 'chaincss/runtime'</code></li>
          <li>Build mode: <code>import { `{ $ }` } from 'chaincss'</code></li>
        </ul>
      </div>
    </>
  );
}