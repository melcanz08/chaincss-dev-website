import { contentTitle, contentDesc, sectionHeading, paragraph, codeBlock, inlineCode, note, tableWrapper } from '../../styles/docs.chain.ts';
import { docTable, docTh, docTd } from '../../styles/docs.chain.ts';

const props = [
  ['Layout','display','display','flex, grid, block, inline, none'],
  ['','position','position','relative, absolute, fixed, sticky'],
  ['','top / right / bottom / left','top / right / bottom / left','0, 50%, auto'],
  ['','zIndex','z-index','z(10) → z-index: 10'],
  ['Flexbox','flexDirection','flex-direction','row, column, row-reverse'],
  ['','alignItems','align-items','center, start, end, stretch'],
  ['','justifyContent','justify-content','center, space-between, space-around'],
  ['','flexWrap','flex-wrap','wrap, nowrap'],
  ['','gap','gap','gap(16) → gap: 16px'],
  ['Spacing','padding / p','padding','p(16) or padding("8px 16px")'],
  ['','margin / m','margin','m(8) or margin("0 auto")'],
  ['Sizing','width / w','width','w(200) or width("100%")'],
  ['','height / h','height','h(48) or height("100vh")'],
  ['','minWidth / maxWidth','min/max-width','minW(320), maxW(1200)'],
  ['Typography','fontSize / fs','font-size','fs(16) → font-size: 16px'],
  ['','fontWeight / fw','font-weight','fw(600) → font-weight: 600'],
  ['','fontFamily / ff','font-family','ff("Inter, sans-serif")'],
  ['','lineHeight / lh','line-height','lh(1.5) → line-height: 1.5'],
  ['','textAlign / ta','text-align','center, left, right'],
  ['','color','color','#hex, rgb(), named'],
  ['Visual','background / bg','background','bg("#6366f1")'],
  ['','borderRadius / rounded','border-radius','rounded(8) → border-radius: 8px'],
  ['','boxShadow / shadow','box-shadow','shadow("0 4px 12px rgba(0,0,0,0.1)")'],
  ['','opacity','opacity','opacity(0.5) → opacity: 0.5'],
  ['','border','border','border("1px solid #e2e8f0")'],
  ['','cursor','cursor','cursor("pointer")'],
  ['','overflow','overflow','overflow("hidden")'],
  ['Effects','transition','transition','transition("all 0.2s ease")'],
  ['','transform','transform','transform("scale(1.05)")'],
  ['','filter','filter','filter("blur(4px)")'],
];

export default function StylingProperties() {
  return (
    <>
      <h1 className={contentTitle}>CSS Properties Reference</h1>
      <p className={contentDesc}>Every CSS property available as a chainable method. Numeric values auto-add px.</p>
      <div className={tableWrapper}>
        <table className={docTable}>
          <thead><tr><th className={docTh}>Category</th><th className={docTh}>Method</th><th className={docTh}>CSS</th><th className={docTh}>Example</th></tr></thead>
          <tbody>{props.map(([cat, method, css, ex], i) => (
            <tr key={i}><td className={docTd}>{cat}</td><td className={docTd}><code className={inlineCode}>{method}</code></td><td className={docTd}><code className={inlineCode}>{css}</code></td><td className={docTd}>{ex}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
