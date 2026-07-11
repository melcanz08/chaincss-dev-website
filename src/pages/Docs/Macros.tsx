import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const macros = [
  { name: 'center()', desc: 'Flexbox centering', css: 'display: flex; align-items: center; justify-content: center' },
  { name: 'pill()', desc: 'Fully rounded pill button', css: 'border-radius: 9999px; display: inline-flex; align-items: center' },
  { name: 'glass()', desc: 'Frosted glass effect', css: 'background: rgba(255,255,255,0.1); backdrop-filter: blur(16px)' },
  { name: 'truncate()', desc: 'Single-line ellipsis', css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap' },
  { name: 'skeleton()', desc: 'Loading skeleton', css: 'background: linear-gradient(90deg,...); animation: shimmer 1.5s infinite' },
  { name: 'clickScale()', desc: 'Scale down on press', css: 'transform: scale(0.98); transition: transform 0.1s' },
  { name: 'flex()', desc: 'display: flex', css: 'display: flex' },
  { name: 'grid()', desc: 'display: grid', css: 'display: grid' },
  { name: 'inline()', desc: 'display: inline', css: 'display: inline' },
  { name: 'block()', desc: 'display: block', css: 'display: block' },
  { name: 'none()', desc: 'display: none', css: 'display: none' },
  { name: 'srOnly()', desc: 'Screen-reader only', css: 'position: absolute; width: 1px; height: 1px; overflow: hidden' },
  { name: 'container()', desc: 'Responsive container', css: 'width: 100%; max-width: 1200px; margin: 0 auto' },
  { name: 'absolute()', desc: 'position: absolute', css: 'position: absolute' },
  { name: 'relative()', desc: 'position: relative', css: 'position: relative' },
  { name: 'fixed()', desc: 'position: fixed', css: 'position: fixed' },
  { name: 'sticky()', desc: 'position: sticky', css: 'position: sticky' },
  { name: 'row()', desc: 'flex-direction: row', css: 'flex-direction: row' },
  { name: 'column()', desc: 'flex-direction: column', css: 'flex-direction: column' },
  { name: 'col()', desc: 'Alias for column()', css: 'flex-direction: column' },
  { name: 'nowrap()', desc: 'flex-wrap: nowrap', css: 'flex-wrap: nowrap' },
  { name: 'hidden()', desc: 'overflow: hidden', css: 'overflow: hidden' },
  { name: 'visible()', desc: 'overflow: visible', css: 'overflow: visible' },
  { name: 'auto()', desc: 'overflow: auto', css: 'overflow: auto' },
  { name: 'touch()', desc: 'overflow: touch', css: '-webkit-overflow-scrolling: touch' },
  { name: 'ellipsis()', desc: 'text-overflow: ellipsis', css: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap' },
];

const shorthands = [
  ['Spacing','m / mt / mr / mb / ml','margin / marginTop / marginRight / marginBottom / marginLeft'],
  ['','p / pt / pr / pb / pl','padding / paddingTop / paddingRight / paddingBottom / paddingLeft'],
  ['','gap / gapX / gapY','gap / columnGap / rowGap'],
  ['Sizing','w / h','width / height'],
  ['','minW / maxW / minH / maxH','min/max-width / min/max-height'],
  ['Typography','fs / fw / lh / ls','fontSize / fontWeight / lineHeight / letterSpacing'],
  ['','fontF / italic / text / align','fontFamily / fontStyle / color / textAlign'],
  ['','c','color (alias for text)'],
  ['Visual','bg / bgc / bgImg / bgPos / bgSize','background / backgroundColor / backgroundImage / backgroundPosition / backgroundSize'],
  ['','rounded / br / radius','borderRadius (three aliases)'],
  ['','roundedTL / roundedTR / roundedBR / roundedBL','Individual corner radii'],
  ['','shadow / textShadow','boxShadow / textShadow'],
  ['','border / borderW / borderC / borderS','border / borderWidth / borderColor / borderStyle'],
  ['','borderT / borderR / borderB / borderL','Individual border sides'],
  ['','op / z','opacity / zIndex'],
  ['Layout','d / pos','display / position'],
  ['','flexDir / flexWrap / justify / items','Flexbox properties'],
  ['','self / content / grow / shrink / basis / order','More flexbox properties'],
  ['','gridCols / gridRows / gridRow / gridCol','Grid properties'],
  ['Other','ov / ovx / ovy','overflow / overflowX / overflowY'],
  ['','objFit / objPos','objectFit / objectPosition'],
  ['','transform / transformOrigin / transition','Transform and transition'],
  ['','cursor / pointer / resize','Interaction properties'],
  ['','filter / backdropFilter','CSS filters'],
];

export default function Macros() {
  return (
    <>
      <h1 className={contentTitle}>Macros & Shorthands</h1>
      <p className={contentDesc}>
        26 layout macros and 82 CSS property shorthands. Everything compiles to static CSS at build time.
      </p>

      <h2 className={sectionHeading}>Layout Macros (26)</h2>
      <p className={paragraph}>Macros expand to multiple CSS properties for common layout patterns:</p>
      <pre className={codeBlock}>{`chain()
  .center()       // display: flex; align-items: center; justify-content: center
  .pill()         // border-radius: 9999px; display: inline-flex
  .truncate()     // text-overflow: ellipsis; overflow: hidden
  .glass()        // backdrop-filter: blur(16px); background: rgba(255,255,255,0.1)
  .$el('tag')`}</pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Macro</th><th className={docTh}>Description</th><th className={docTh}>Generated CSS</th></tr></thead>
          <tbody>
            {macros.map(m => (
              <tr key={m.name}>
                <td className={docTd}><code className={inlineCode}>{m.name}</code></td>
                <td className={docTd}>{m.desc}</td>
                <td className={docTd} style={{ fontSize: 12, fontFamily: 'monospace' }}>{m.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={sectionHeading}>CSS Property Shorthands (82)</h2>
      <p className={paragraph}>Shorter aliases for common CSS properties. Both forms work identically:</p>
      <pre className={codeBlock}>{`chain()
  .bg('#6366f1')     // same as .background('#6366f1')
  .fs(16)            // same as .fontSize(16)
  .fw(600)           // same as .fontWeight(600)
  .p('8px 16px')     // same as .padding('8px 16px')
  .rounded(8)        // same as .borderRadius(8)
  .z(10)             // same as .zIndex(10)
  .$el('box')`}</pre>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Shorthands</th><th className={docTh}>Full Property</th></tr></thead>
          <tbody>
            {shorthands.map(([cat, short, full], i) => (
              <tr key={i}>
                <td className={docTd}>{cat}</td>
                <td className={docTd}><code className={inlineCode}>{short}</code></td>
                <td className={docTd} style={{ fontSize: 12 }}>{full}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={note}>
        <strong>💡 Tip:</strong> You can still use the full CSS property name for any method.
        Shorthands are optional aliases — <code className={inlineCode}>.fontSize(16)</code> and <code className={inlineCode}>.fs(16)</code> produce the same output.
      </div>
    </>
  );
}
