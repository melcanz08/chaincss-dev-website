import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, note, tableWrapper
} from './Docs/docs.chain.ts';
import { docTable, docTh, docTd } from './Docs/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

export default function Constraints() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Constraint Resolver</h1>
      <p className={contentDesc}>
        Express layout relationships instead of hardcoded values. Write{' '}
        <code className={inlineCode}>width &lt;= parent</code> and the compiler generates{' '}
        <code className={inlineCode}>max-width: 100%</code>. Write{' '}
        <code className={inlineCode}>height = width * 0.5</code> and it generates{' '}
        <code className={inlineCode}>aspect-ratio: 2</code>. Design intent, not CSS mechanics.
      </p>

      <h2 className={sectionHeading}>The Problem: Translating Design to CSS</h2>
      <p className={paragraph}>
        A designer says "this card should never be wider than its parent." You write{' '}
        <code className={inlineCode}>max-width: 100%</code>. They say "this hero image should
        always be twice as wide as it is tall." You write <code className={inlineCode}>aspect-ratio: 2</code>.
        They say "this sidebar should fill the viewport height." You write{' '}
        <code className={inlineCode}>min-height: 100vh</code>.
      </p>
      <p className={paragraph}>
        These are layout <strong>constraints</strong> — relationships between elements — expressed
        in CSS property syntax. The constraint resolver lets you write the relationship
        directly and compiles it to the correct CSS.
      </p>

      <h2 className={sectionHeading}>Quick Example</h2>

      <pre className={codeBlock}><code className="language-ts">{`import { chain } from 'chaincss'

// Without constraints — you translate manually
chain()
  .box({ width: '100%', maxWidth: '100%' })
  .$el('manual-card')

// With constraints — express the relationship
chain()
  .raw({ constrain: 'width <= parent' })
  .raw({ constrain: 'height >= parent' })
  .raw({ constrain: 'height = width * 0.5' })
  .$el('constrained-card')`}</code></pre>

      <h2 className={sectionHeading}>Constraint Types</h2>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Relative Size Constraints</h3>
      <p className={paragraph}>
        Compare an element's dimension to its parent. The resolver generates the correct{' '}
        <code className={inlineCode}>min-*</code> or <code className={inlineCode}>max-*</code> property:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Constraint</th>
            <th className={docTh}>Meaning</th>
            <th className={docTh}>Generated CSS</th>
          </tr></thead>
          <tbody>{[
            ['width <= parent', 'Never wider than parent', 'max-width: 100%'],
            ['width >= parent', 'At least as wide as parent', 'min-width: 100%'],
            ['height <= parent', 'Never taller than parent', 'max-height: 100%'],
            ['height >= parent', 'At least as tall as parent', 'min-height: 100%'],
            ['width <= viewport', 'Never wider than viewport', 'max-width: 100vw'],
            ['height >= viewport', 'At least viewport height', 'min-height: 100vh'],
          ].map(([constraint, meaning, css], i) => (
            <tr key={i}>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{constraint}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{meaning}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13, color: '#4ade80' }}>{css}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Algebraic Layout Expressions</h3>
      <p className={paragraph}>
        Express proportional relationships between dimensions. The resolver converts
        these to modern <code className={inlineCode}>aspect-ratio</code> — no JavaScript, no padding hacks:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Constraint</th>
            <th className={docTh}>Meaning</th>
            <th className={docTh}>Generated CSS</th>
          </tr></thead>
          <tbody>{[
            ['height = width * 0.5', 'Height is half the width', 'aspect-ratio: 2'],
            ['height = width * 0.5625', '16:9 aspect ratio', 'aspect-ratio: 1.7778'],
            ['width = height * 0.75', 'Width is 75% of height', 'aspect-ratio: 0.75 / 1'],
            ['width = height * 1.5', 'Width is 1.5x height', 'aspect-ratio: 1.5 / 1'],
            ['height = width * 1', 'Perfect square', 'aspect-ratio: 1'],
          ].map(([constraint, meaning, css], i) => (
            <tr key={i}>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{constraint}</td>
              <td className={docTd} style={{ fontSize: 13 }}>{meaning}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13, color: '#4ade80' }}>{css}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h3 style={{ color: '#e2e8f0', marginTop: 28 }}>Direct Assignments</h3>
      <p className={paragraph}>
        Reference other dimensions or viewport units directly:
      </p>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr>
            <th className={docTh}>Constraint</th>
            <th className={docTh}>Generated CSS</th>
          </tr></thead>
          <tbody>{[
            ['width = parent.width', 'width: 100%'],
            ['height = viewport.height', 'height: 100vh'],
            ['width = viewport.width', 'width: 100vw'],
          ].map(([constraint, css], i) => (
            <tr key={i}>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13 }}>{constraint}</td>
              <td className={docTd} style={{ fontFamily: 'monospace', fontSize: 13, color: '#4ade80' }}>{css}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Constraint Composition</h2>
      <p className={paragraph}>
        Multiple constraints compose naturally — the resolver generates
        all necessary CSS properties:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`chain()
  .raw({ constrain: 'width <= parent' })      // → max-width: 100%
  .raw({ constrain: 'width >= viewport' })     // → min-width: 100vw
  .raw({ constrain: 'height = width * 0.5' })  // → aspect-ratio: 2
  .$el('responsive-hero')

// Generated CSS:
// .chain-responsive-hero {
//   max-width: 100%;
//   min-width: 100vw;
//   aspect-ratio: 2;
// }`}</code></pre>

      <h2 className={sectionHeading}>Why aspect-ratio Instead of calc()</h2>
      <p className={paragraph}>
        When you write <code className={inlineCode}>height = width * 0.5</code>, the resolver
        generates <code className={inlineCode}>aspect-ratio: 2</code> — not{' '}
        <code className={inlineCode}>height: calc(width * 0.5)</code>. Here's why:
      </p>
      <ul style={{ paddingLeft: '1.5rem', lineHeight: '2.2', color: '#cbd5e1' }}>
        <li><strong>Browser-native:</strong> <code className={inlineCode}>aspect-ratio</code> is a standard CSS property with excellent browser support.</li>
        <li><strong>Dynamic:</strong> It responds to width changes automatically — no need to recalculate on resize.</li>
        <li><strong>Layout-friendly:</strong> It works with Grid, Flexbox, and absolute positioning.</li>
        <li><strong>No layout shift:</strong> The browser reserves space before the element loads.</li>
      </ul>

      <h2 className={sectionHeading}>Constraint + Semantic Intents</h2>
      <p className={paragraph}>
        Constraints compose with the intent system. The sidebar-layout intent
        already declares <code className={inlineCode}>min-height: 100vh</code> via constraints:
      </p>

      <pre className={codeBlock}><code className="language-ts">{`// The 'sidebar-layout' intent internally declares:
// { constrain: 'height >= parent' }  →  min-height: 100vh

chain()
  .raw({ intent: 'sidebar-layout' })  // ← includes height constraint
  .raw({ constrain: 'width <= viewport' })  // ← additional constraint
  .$el('app-layout')

// Generated CSS:
// .chain-app-layout {
//   display: grid;
//   grid-template-columns: 280px 1fr;
//   min-height: 100vh;         // ← from sidebar-layout intent
//   max-width: 100vw;          // ← from explicit constraint
// }`}</code></pre>

      <div className={note}>
        <strong>💡 Design intent first:</strong> Constraints let you express what you want
        ("this should never overflow its parent") instead of how to achieve it
        ("max-width: 100%"). The compiler handles the translation — and as CSS evolves,
        the generated output can improve without changing your source code.
        See <a href="/docs/tokens/semantic-intents" style={{ color: '#818cf8' }}>Semantic Intents</a> for
        higher-level abstractions that compose with constraints.
      </div>
    </>
  );
}