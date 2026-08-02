import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const shorthandMethods = [
  { method: '.box(options)', desc: 'Margin, padding, border, dimensions, overflow', example: '.box({ padding: 24, borderRadius: 8, width: "100%" })' },
  { method: '.typography(options)', desc: 'Font, text, color, opacity', example: '.typography({ fontSize: 16, fontWeight: "600", color: "#333" })' },
  { method: '.flex(options)', desc: 'Flexbox container + item properties', example: '.flex({ direction: "column", align: "center", gap: 16 })' },
  { method: '.grid(options)', desc: 'CSS Grid container + item properties', example: '.grid({ columns: "1fr 1fr", gap: 24 })' },
  { method: '.background(options)', desc: 'Background color, image, position, size', example: '.background({ color: "#fff", size: "cover" })' },
  { method: '.position(options)', desc: 'Position, top/right/bottom/left, z-index', example: '.position({ type: "absolute", top: 0, zIndex: 10 })' },
  { method: '.shadow(options)', desc: 'Box-shadow and text-shadow', example: '.shadow({ y: 4, blur: 12, color: "rgba(0,0,0,0.1)" })' },
  { method: '.animation(options)', desc: 'Animation name, duration, timing, delay', example: '.animation({ name: "fadeIn", duration: "0.3s" })' },
  { method: '.transform(options)', desc: 'Translate, scale, rotate, skew', example: '.transform({ x: 10, y: 20, rotate: 45 })' },
  { method: '.transition(options)', desc: 'Transition property, duration, timing', example: '.transition({ tr: "all 0.2s ease" })' },
  { method: '.filter(options)', desc: 'CSS filters: blur, brightness, contrast', example: '.filter({ blur: 4, brightness: 1.1 })' },
  { method: '.containerQuery(options)', desc: 'Container-type and container-name', example: '.containerQuery({ type: "inline-size" })' },
  { method: '.outline(options)', desc: 'Outline width, style, color, offset', example: '.outline({ width: 2, color: "blue" })' },
  { method: '.scroll(options)', desc: 'Scroll behavior, snap, margin, padding', example: '.scroll({ behavior: "smooth" })' },
  { method: '.list(options)', desc: 'List style type, position, image', example: '.list({ style: "none" })' },
  { method: '.raw(prop, value)', desc: 'Any CSS property not covered above', example: '.raw({ cursor: "pointer", resize: "vertical" })' },
];

const pseudoClasses = [
  { method: '.hover() … .end()', css: '&:hover' },
  { method: '.focus() … .end()', css: '&:focus' },
  { method: '.active() … .end()', css: '&:active' },
  { method: '.checked() … .end()', css: '&:checked' },
  { method: '.disabled() … .end()', css: '&:disabled' },
  { method: '.before() … .end()', css: '&::before' },
  { method: '.after() … .end()', css: '&::after' },
  { method: '.placeholder() … .end()', css: '&::placeholder' },
];

const atRules = [
  { method: '.media(query, fn)', desc: 'Wrap styles in @media query' },
  { method: '.supports(condition, fn)', desc: 'Wrap styles in @supports' },
  { method: '.container(query, fn)', desc: 'Wrap styles in @container' },
  { method: '.layer(name, fn)', desc: 'Wrap styles in @layer' },
  { method: '.nest(selector, fn)', desc: 'Nest child selector styles' },
  { method: '.children(fn)', desc: 'Target direct children (& > *)' },
  { method: '.keyframes(name, steps)', desc: 'Define @keyframes animation' },
  { method: '.fontFace(properties)', desc: 'Define @font-face declaration' },
  { method: '.when(condition, fn)', desc: 'Conditionally apply styles at build time' },
];

const runtimeAPI = [
  { method: 'useChainStyles(styles, deps)', desc: 'Evaluate dynamic styles, return { classes, styleVars }', framework: 'React, Vue, Svelte, Solid' },
  { method: 'useChainStylesApplied(styles, deps)', desc: 'Convenience: returns { className, style } merged', framework: 'React' },
  { method: 'chain()', desc: 'Static-only chain — returns plain string className', framework: 'All' },
  { method: 'chain.dynamic()', desc: 'Mixed mode chain — returns { className, dynamic }', framework: 'All' },
  { method: 'chain({ debug: true })', desc: 'Enable debug mode — tracks every property classification', framework: 'All' },
  { method: 'recipe({ base, variants, ... })', desc: 'Create type-safe component variants', framework: 'All' },
  { method: 'styleInjector.inject(className, css)', desc: 'Inject CSS into DOM (deduplicated by content hash)', framework: 'Vanilla' },
  { method: 'styleInjector.remove(className)', desc: 'Remove injected styles for a class', framework: 'Vanilla' },
  { method: 'compileToCSS(styleObject, options)', desc: 'Compile a style object to CSS string', framework: 'All' },
  { method: 'run(...styleObjects)', desc: 'Compile multiple style objects to CSS', framework: 'All' },
];

const configAPI = [
  { method: 'defineConfig(config)', desc: 'Type-safe config helper for chaincss.config.ts' },
  { method: 'registerIntent(name, def)', desc: 'Register a custom design intent' },
  { method: 'registerAnimationPreset(name, steps)', desc: 'Register a custom animation preset' },
  { method: 'registerLayoutMacro(name, macro)', desc: 'Register a custom layout macro' },
  { method: 'registerEmitter(emitter)', desc: 'Register a custom output emitter' },
  { method: 'setBreakpoints(breakpoints)', desc: 'Set custom breakpoints' },
  { method: 'createThemeContract(shape)', desc: 'Define a theme contract shape' },
  { method: 'createTheme(contract, values)', desc: 'Create a validated theme instance' },
];

export default function APIReference() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>API Reference</h1>
      <p className={contentDesc}>
        Complete reference of all ChainCSS methods — from style definition to runtime
        hooks to compiler configuration.
      </p>

      <h2 className={sectionHeading}>Core Styling API</h2>
      <pre className={codeBlock}><code className="language-javascript">{`import { chain } from 'chaincss'

// Static mode — zero runtime, returns a className string
const btn = chain()
  .box({ padding: 24, borderRadius: 8 })
  .typography({ fontSize: 16, color: '#333' })
  .hover().background({ color: '#f0f0f0' }).transform({ scale: 1.02 }).end()
  .media('(max-width: 640px)', (c) => c.box({ padding: 16 }))
  .$el('my-component')
// btn = 'chain-my-component'

// Dynamic mode — returns { className, dynamic }
const dynamic = chain.dynamic()
  .box({ padding: '12px 24px', borderRadius: 8 })
  .background({ color: (ctx) => ctx.isActive ? '#6366f1' : '#e0e0e0' })
  .$el('btn-dynamic')
// dynamic = { className: 'chain-btn-dynamic', dynamic: { backgroundColor: (ctx) => ... } }`}</code></pre>

      <h2 className={sectionHeading}>Structured Shorthand Methods</h2>
      <p className={paragraph}>
        16 typed methods. Every property accepts <code className={inlineCode}>T | (() =&gt; T)</code> for mixed static/dynamic values.
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Covers</th><th className={docTh}>Example</th></tr></thead>
          <tbody>
            {shorthandMethods.map(s => (
              <tr key={s.method}>
                <td className={docTd}><code className={inlineCode}>{s.method}</code></td>
                <td className={docTd}>{s.desc}</td>
                <td className={docTd}><code className={inlineCode}>{s.example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Token References ($prefix)</h2>
      <p className={paragraph}>
        Any property value can reference a design token using the <code className={inlineCode}>$</code> prefix.
        Tokens are resolved at build time (CLI/Vite/Webpack) or become CSS custom properties
        at runtime (playground, <code className={inlineCode}>compileToCSS</code>):
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// Build time — resolved to actual values by the pipeline
chain()
  .background({ color: '$colors.primary.500' })   // → #6366f1
  .box({ padding: '$spacing.md' })                // → 1rem
  .typography({ 
    fontFamily: '$typography.fontFamily.sans',    // → system-ui, sans-serif
    fontSize: '$typography.fontSize.lg'           // → 1.125rem
  })
  .shadow({ box: '$shadows.md' })                // → 0 4px 6px -1px rgba(...)
  .$el('themed-card')

// Runtime / playground — becomes CSS custom properties
chain()
  .background({ color: '$colors.primary.500' })
  // → var(--colors-primary-500) — resolved by the browser at runtime`}</code></pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Token Path</th>
            <th className={docTh}>Example</th>
            <th className={docTh}>Build Time</th>
            <th className={docTh}>Runtime</th>
          </tr></thead>
          <tbody>{[
            ['$colors.*', '$colors.primary.500', '#6366f1', 'var(--colors-primary-500)'],
            ['$spacing.*', '$spacing.md', '1rem', 'var(--spacing-md)'],
            ['$typography.fontFamily.*', '$typography.fontFamily.sans', 'system-ui, sans-serif', 'var(--typography-fontFamily-sans)'],
            ['$typography.fontSize.*', '$typography.fontSize.lg', '1.125rem', 'var(--typography-fontSize-lg)'],
            ['$typography.fontWeight.*', '$typography.fontWeight.bold', '700', 'var(--typography-fontWeight-bold)'],
            ['$shadows.*', '$shadows.md', '0 4px 6px -1px rgba(...)', 'var(--shadows-md)'],
            ['$borderRadius.*', '$borderRadius.lg', '0.5rem', 'var(--borderRadius-lg)'],
          ].map(([path, example, build, runtime], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{path}</code></td>
              <td className={docTd} style={{ fontSize: 13, fontFamily: 'monospace' }}>{example}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace', color: '#4ade80' }}>{build}</td>
              <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace', color: '#fbbf24' }}>{runtime}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className={note}>
        <strong>💡 Custom tokens:</strong> Define your own tokens in{' '}
        <code className={inlineCode}>chaincss.config.ts</code> under{' '}
        <code className={inlineCode}>tokens</code>. ChainCSS ships with a comprehensive
        default token system (colors, spacing, typography, shadows, breakpoints).
        Custom tokens merge with and override defaults.
        See <a href="/docs/tokens" style={{ color: '#818cf8' }}>Design Tokens</a> for the
        full token system documentation.
      </div>

      <h2 className={sectionHeading}>Pseudo-Classes</h2>
      <p className={paragraph}>
        Open a pseudo-class block with the method, add styles, close with <code className={inlineCode}>.end()</code>.
        Pseudo-classes stack: <code className={inlineCode}>.hover().active()</code> produces{' '}
        <code className={inlineCode}>:hover:active</code>.
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>CSS Selector</th></tr></thead>
          <tbody>
            {pseudoClasses.map(p => (
              <tr key={p.method}>
                <td className={docTd}><code className={inlineCode}>{p.method}</code></td>
                <td className={docTd}><code className={inlineCode}>{p.css}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>At-Rules & Nesting</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            {atRules.map(a => (
              <tr key={a.method}>
                <td className={docTd}><code className={inlineCode}>{a.method}</code></td>
                <td className={docTd}>{a.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Dynamic&lt;T&gt; — Mixed Mode Per-Property</h2>
      <p className={paragraph}>
        Every property in every shorthand accepts either a static value or a function.
        Functions receive context from <code className={inlineCode}>useChainStyles</code> and
        return values applied as CSS custom properties.
      </p>
      <pre className={codeBlock}><code className="language-javascript">{`// Static values → compiled to CSS at build time
chain().box({ padding: 24, borderRadius: 8 }).$el('static')

// Dynamic values → CSS custom properties at runtime
chain.dynamic()
  .box({
    padding: 24,                                    // static
    borderRadius: 8,                                // static
    background: (ctx) => ctx.dark ? '#333' : '#fff' // dynamic
  })
  .typography({
    fontSize: 16,                                   // static
    color: (ctx) => ctx.dark ? '#fff' : '#000'      // dynamic
  })
  .$el('mixed')`}</code></pre>

      <h2 className={sectionHeading}>Terminal Methods</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Returns</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            <tr><td className={docTd}><code className={inlineCode}>.$el('name')</code></td><td className={docTd}>StyleDefinition</td><td className={docTd}>Set selector and finalize. Class gets chain- prefix.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.$el()</code></td><td className={docTd}>StyleDefinition</td><td className={docTd}>Finalize without selector (class from export name).</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.extend(styleDef)</code></td><td className={docTd}>StyleCollector</td><td className={docTd}>Inherit all properties from a base style definition.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.build(['.custom'])</code></td><td className={docTd}>StyleDefinition</td><td className={docTd}>Build with explicit selectors array.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.explain()</code></td><td className={docTd}>Explanation</td><td className={docTd}>Debug: show how each property was resolved (static vs dynamic).</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.addClass('name')</code></td><td className={docTd}>StyleCollector</td><td className={docTd}>Add an additional class name to the element.</td></tr>
            <tr><td className={docTd}><code className={inlineCode}>.enableDebug()</code></td><td className={docTd}>StyleCollector</td><td className={docTd}>Enable debug tracking for this chain.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Runtime API</h2>
      <p className={paragraph}>
        Hooks and utilities for using ChainCSS styles in components:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Description</th><th className={docTh}>Framework</th></tr></thead>
          <tbody>
            {runtimeAPI.map(r => (
              <tr key={r.method}>
                <td className={docTd}><code className={inlineCode}>{r.method}</code></td>
                <td className={docTd}>{r.desc}</td>
                <td className={docTd} style={{ fontSize: 12 }}>{r.framework}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            <h2 className={sectionHeading}>Build Output Files</h2>
      <p className={paragraph}>
        ChainCSS generates two files alongside each <code className={inlineCode}>.chain.ts</code> source:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>File</th>
            <th className={docTh}>Purpose</th>
            <th className={docTh}>When It's Used</th>
          </tr></thead>
          <tbody>{[
            ['.class.js', 'Exports class names (and dynamic functions) as JavaScript modules', 'Vite production builds, PostCSS/webpack, CLI builds, cold-start cache'],
            ['.css', 'The compiled CSS output', 'Vite production builds (combined into assets/chaincss.css), CLI builds, PostCSS output'],
          ].map(([file, purpose, used], i) => (
            <tr key={i}>
              <td className={docTd}><code className={inlineCode}>{file}</code></td>
              <td className={docTd} style={{ fontSize: 13 }}>{purpose}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{used}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 24 }}>Vite Dev Mode vs Production</h3>
      <p className={paragraph}>
        In <strong>development</strong>, Vite intercepts <code className={inlineCode}>.chain.ts</code> imports
        through its <code className={inlineCode}>transform</code> hook. The ChainCSS compiler runs in memory
        and returns the class name directly — the <code className={inlineCode}>.class.js</code> file on disk
        is written as a cache fallback but is not read during dev mode.
      </p>
      <p className={paragraph}>
        In <strong>production</strong> (<code className={inlineCode}>vite build</code>), the plugin pre-compiles
        all <code className={inlineCode}>.chain.ts</code> files, writes <code className={inlineCode}>.class.js</code>
        and <code className={inlineCode}>.css</code> to disk, and Rollup bundles them into the final output.
        The combined CSS is emitted as <code className={inlineCode}>assets/chaincss.css</code>.
      </p>

      <div className={note}>
        <strong>💡 Import rules:</strong>
        <br /><br />
        
        <strong>With Vite — always import <code className={inlineCode}>.chain.ts</code>:</strong>
        <pre style={{ margin: '8px 0', fontSize: 13 }}><code>{`import { button } from './styles/button.chain'`}</code></pre>
        The Vite plugin intercepts this, runs the compiler pipeline, and returns the result.
        HMR works. Recompilation happens on every change.
        
        <br /><br />
        <strong>Without Vite (PostCSS, plain Node.js) — import <code className={inlineCode}>.class.js</code>:</strong>
        <pre style={{ margin: '8px 0', fontSize: 13 }}><code>{`const { button } = require('./styles/button.class.js')`}</code></pre>
        PostCSS and standalone CLI builds don't have a transform hook. The{' '}
        <code className={inlineCode}>.class.js</code> file is the pre-compiled output.
        Run <code className={inlineCode}>chaincss build</code> first to generate these files.
        
        <br /><br />
        <strong>With Webpack — use the ChainCSS loader:</strong>
        <pre style={{ margin: '8px 0', fontSize: 13 }}><code>{`// webpack.config.js — loader handles .chain.ts imports`}</code></pre>
        The Webpack loader works like the Vite plugin — it intercepts{' '}
        <code className={inlineCode}>.chain.ts</code> imports and compiles them.
      </div>

      <h2 className={sectionHeading}>Configuration & Extensibility API</h2>
      <p className={paragraph}>
        Register custom intents, animations, macros, emitters, and themes:
      </p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Method</th><th className={docTh}>Description</th></tr></thead>
          <tbody>
            {configAPI.map(c => (
              <tr key={c.method}>
                <td className={docTd}><code className={inlineCode}>{c.method}</code></td>
                <td className={docTd}>{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>📚 See also:</strong> <a href="/docs/properties" style={{ color: '#818cf8' }}>Styling API</a> for
        detailed property tables and short aliases.{' '}
        <a href="/docs/macros" style={{ color: '#818cf8' }}>Macros (100+)</a> for the
        full macro catalog.{' '}
        <a href="/docs/mixed-mode" style={{ color: '#818cf8' }}>Mixed Mode</a> for
        dynamic styling patterns.{' '}
        <a href="/docs/frameworks" style={{ color: '#818cf8' }}>Framework Integration</a> for
        framework-specific adapters.
      </div>
    </>
  );
}