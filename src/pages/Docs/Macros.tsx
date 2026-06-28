import {
  contentTitle, contentDesc, sectionHeading, paragraph,
  codeBlock, inlineCode, tableWrapper
} from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const macros = [
  { name: 'center()', desc: 'display: flex; align-items: center; justify-content: center' },
  { name: 'pill()', desc: 'Fully rounded pill shape with inline-flex centering' },
  { name: 'circle(size)', desc: 'Perfect circle with flex centering' },
  { name: 'glass(blur?)', desc: 'Backdrop blur glassmorphism effect. Default blur: 16px' },
  { name: 'hide()', desc: 'visibility: hidden' },
  { name: 'show()', desc: 'visibility: visible' },
  { name: 'truncate()', desc: 'Single-line text truncation with ellipsis' },
  { name: 'absolute(coords?)', desc: 'position: absolute with optional top/right/bottom/left' },
  { name: 'size(value)', desc: 'Sets both width and height' },
  { name: 'stack({spacing, dir?})', desc: 'Flex column with configurable spacing' },
  { name: 'clickScale(amount?)', desc: 'Scale down on :active. Default: 0.97' },
  { name: 'pressable()', desc: 'cursor: pointer + unselectable + clickScale' },
  { name: 'focusRing(color?)', desc: ':focus-visible outline ring. Default color: #6366f1' },
  { name: 'skeleton({active, color?})', desc: 'Loading skeleton animation' },
  { name: 'fluidText({min, max})', desc: 'Responsive fluid typography via clamp()' },
];

export default function Macros() {
  return (
    <>
      <h1 className={contentTitle}>Macros & Shorthands</h1>
      <p className={contentDesc}>
        ChainCSS includes built-in macros that expand to multiple CSS declarations,
        plus shorthand methods for commonly used properties.
      </p>

      <h2 className={sectionHeading}>Macros</h2>
      <p className={paragraph}>
        Macros are multi-property shortcuts. One method call replaces several CSS declarations:
      </p>
      <pre className={codeBlock}>{`chain()
  .center()                    // display: flex + align-items: center + justify-content: center
  .pill()                      // border-radius: 9999px + inline-flex + centering
  .glass()                     // backdrop-filter: blur(16px) + bg + border
  .truncate()                  // overflow: hidden + text-overflow: ellipsis + white-space: nowrap
  .pressable()                 // cursor: pointer + user-select: none + :active scale
  .focusRing('#6366f1')       // :focus-visible outline ring
  .skeleton({ active: true })  // loading animation
  .fluidText({ min: 14, max: 20 }) // clamp(14px, 0.625vw + 12px, 20px)
  .$el('component')`}</pre>

      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>What It Does</th></tr></thead>
          <tbody>
            {macros.map((m, i) => (
              <tr key={i}>
                <td className={docTd}><span className={inlineCode}>{m.name}</span></td>
                <td className={docTd}>{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>Unit Auto-Prefixing</h2>
      <p className={paragraph}>
        Numeric values automatically get <span className={inlineCode}>px</span> added — except 
        for unitless properties like <span className={inlineCode}>opacity</span>,{' '}
        <span className={inlineCode}>zIndex</span>, <span className={inlineCode}>fontWeight</span>,{' '}
        <span className={inlineCode}>flex</span>, and <span className={inlineCode}>lineHeight</span>.
      </p>
      <pre className={codeBlock}>{`chain()
  .padding(16)        // → padding: 16px
  .fontSize(14)       // → font-size: 14px
  .opacity(0.5)       // → opacity: 0.5 (unitless)
  .zIndex(10)         // → z-index: 10 (unitless)
  .fontWeight(600)    // → font-weight: 600 (unitless)`}</pre>
    </>
  );
}
