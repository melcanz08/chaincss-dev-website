import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';
import { usePrism } from '../../lib/usePrism';

const relationshipMacros = [
  { name: 'pressable()', desc: 'Interactive element', css: 'cursor: pointer; user-select: none; active:scale(0.97); hover:opacity(0.85)' },
  { name: 'peerDim()', desc: 'Dim non-hovered siblings', css: '.group:has(> :hover) > &:not(:hover) { opacity, scale, blur }' },
  { name: 'peerHover()', desc: 'Style on sibling hover', css: '.peer:hover ~ & + .group:has(.peer:hover) &:not(.peer:hover)' },
  { name: 'groupHasHover()', desc: 'Parent reacts to child hover', css: '&:has(> :hover) { ... }' },
  { name: 'hasCount()', desc: 'Style based on child count', css: '&:has(> :nth-child(N)) { ... }' },
  { name: 'entangleFocus()', desc: 'Floating label pattern', css: '&:focus-within label, &:has(input:not(:placeholder-shown)) label' },
  { name: 'hoverLift()', desc: 'Lift on hover', css: 'transform: translateY(-4px); box-shadow elevation' },
  { name: 'hoverGlow()', desc: 'Glow on hover', css: 'box-shadow: 0 0 20px <color>' },
  { name: 'focusRing()', desc: 'Focus indicator', css: '&:focus-visible { outline: 2px solid; outline-offset: 2px }' },
  { name: 'clickScale()', desc: 'Scale on press', css: '&:active { transform: scale(0.97) }' },
];

const layoutMacros = [
  { name: 'center()', desc: 'Flexbox centering', css: 'display: flex; align-items: center; justify-content: center' },
  { name: 'pill()', desc: 'Fully rounded pill', css: 'border-radius: 9999px; padding: 6px 14px; display: inline-flex' },
  { name: 'glass()', desc: 'Frosted glass effect', css: 'backdrop-filter: blur(16px); background: rgba(255,255,255,0.1)' },
  { name: 'truncate()', desc: 'Single-line ellipsis', css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' },
  { name: 'srOnly()', desc: 'Screen-reader only', css: 'position: absolute; width: 1px; height: 1px; overflow: hidden' },
  { name: 'container()', desc: 'Centered container', css: 'width: 100%; max-width: 1200px; margin-inline: auto' },
  { name: 'hero()', desc: 'Hero section', css: 'display: flex; flex-direction: column; min-height: 60vh; text-align: center' },
  { name: 'gridList()', desc: 'Auto-fit grid', css: 'grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))' },
  { name: 'autoGrid()', desc: 'No-media-query grid', css: 'grid-template-columns: repeat(auto-fit, minmax(min(280px,100%),1fr))' },
  { name: 'hide()', desc: 'Completely hidden', css: 'opacity: 0; visibility: hidden; pointer-events: none' },
  { name: 'show()', desc: 'Completely visible', css: 'opacity: 1; visibility: visible; pointer-events: auto' },
];

const animationMacros = [
  { name: 'skeleton()', desc: 'Loading skeleton', css: 'Animated gradient sweep' },
  { name: 'shimmer()', desc: 'Shimmer effect', css: 'Light sweep animation' },
  { name: 'float()', desc: 'Floating animation', css: 'translateY oscillation' },
  { name: 'spin()', desc: 'Rotating animation', css: 'Continuous rotation' },
  { name: 'pulse()', desc: 'Pulsing opacity', css: 'Opacity oscillation' },
  { name: 'bounce()', desc: 'Bouncing animation', css: 'TranslateY bounce' },
];

export default function Macros() {
  usePrism([]);

  return (
    <>
      <h1 className={contentTitle}>Macros & Shorthands</h1>
      <p className={contentDesc}>
        32+ macros and 100+ shorthands. Express design intent — not selector mechanics.
      </p>

      <h2 className={sectionHeading}>Relationship Macros — The Differentiator</h2>
      <p className={paragraph}>
        These macros generate CSS relationship selectors. Instead of writing complex{' '}
        <code className={inlineCode}>:has()</code>, <code className={inlineCode}>:focus-within</code>, 
        and sibling selectors manually, express what you want to happen:
      </p>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .pressable()       // cursor + active scale + hover opacity
  .hoverLift()       // translateY on hover
  .peerDim()         // dim siblings when one is hovered
  .entangleFocus()   // floating label pattern
  .$el('interactive')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated Selectors</th></tr></thead>
          <tbody>
            {relationshipMacros.map(m => (
              <tr key={m.name}>
                <td className={docTd}><code className={inlineCode}>{m.name}</code></td>
                <td className={docTd}>{m.desc}</td>
                <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Layout Macros</h2>
      <pre className={codeBlock}><code className="language-ts">{`chain()
  .center()       // display: flex; align-items: center; justify-content: center
  .glass()        // frosted glass with backdrop-filter
  .hero()         // full-width centered hero section
  .gridList()     // auto-fit responsive grid
  .$el('layout')`}</code></pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>
            {layoutMacros.map(m => (
              <tr key={m.name}>
                <td className={docTd}><code className={inlineCode}>{m.name}</code></td>
                <td className={docTd}>{m.desc}</td>
                <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Animation Macros</h2>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Effect</th></tr></thead>
          <tbody>
            {animationMacros.map(m => (
              <tr key={m.name}>
                <td className={docTd}><code className={inlineCode}>{m.name}</code></td>
                <td className={docTd}>{m.desc}</td>
                <td className={docTd} style={{ fontSize: 12 }}>{m.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Tip:</strong> All macros compile to plain CSS at build time. 
        Zero runtime overhead. Use the <a href="/docs/inspector" style={{ color: '#818cf8' }}>Live Inspector</a> to see the generated output.
      </div>
    </>
  );
}