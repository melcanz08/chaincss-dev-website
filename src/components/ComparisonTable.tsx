import { table as comparisonTable, th as comparisonTh, td as comparisonTd, check, cross, partial } from '../styles/comparison.chain.ts';

const rows = [
  { feature: 'Design Token Graph', chaincss: true, tailwind: false, styled: false, vanilla: false, panda: false },
  { feature: 'Contrast Auto-Fix (WCAG 2.2)', chaincss: true, tailwind: false, styled: false, vanilla: false, panda: false },
  { feature: 'Relationship Macros', chaincss: true, tailwind: false, styled: false, vanilla: false, panda: false },
  { feature: 'Mixed Mode (Static + Dynamic)', chaincss: true, tailwind: false, styled: true, vanilla: false, panda: false },
  { feature: 'Live Compiler Inspector', chaincss: true, tailwind: false, styled: false, vanilla: false, panda: false },
  { feature: 'Figma → Browser Sync', chaincss: true, tailwind: false, styled: false, vanilla: false, panda: false },
  { feature: 'Zero Runtime', chaincss: true, tailwind: true, styled: false, vanilla: true, panda: true },
  { feature: 'Atomic CSS (Opt-in)', chaincss: true, tailwind: true, styled: false, vanilla: false, panda: true },
  { feature: 'TypeScript API', chaincss: true, tailwind: false, styled: true, vanilla: true, panda: true },
  { feature: 'Framework Agnostic', chaincss: true, tailwind: true, styled: false, vanilla: true, panda: true },
];

function BoolCell({ value }: { value: boolean }) {
  if (value) return <span className={check}>●</span>;
  return <span className={cross}>○</span>;
}

export default function ComparisonTable() {
  return (
    <section style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>
          Comparison
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: '#f4f4f5', marginBottom: 16 }}>
          What sets ChainCSS apart
        </h2>
        <p style={{ fontSize: 17, color: '#a1a1aa', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
          Most CSS tools generate strings. ChainCSS understands relationships.
        </p>
      </div>
      <div style={{ overflow: 'auto', maxWidth: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className={comparisonTable} style={{ minWidth: 700 }}>
          <thead>
            <tr>
              <th className={comparisonTh}>Feature</th>
              <th className={comparisonTh} style={{ color: '#818cf8' }}>ChainCSS</th>
              <th className={comparisonTh}>Tailwind</th>
              <th className={comparisonTh}>Styled Comp.</th>
              <th className={comparisonTh}>Vanilla Extract</th>
              <th className={comparisonTh}>Panda CSS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature}>
                <td className={comparisonTd}>{row.feature}</td>
                <td className={comparisonTd}><BoolCell value={row.chaincss} /></td>
                <td className={comparisonTd}><BoolCell value={row.tailwind} /></td>
                <td className={comparisonTd}><BoolCell value={row.styled} /></td>
                <td className={comparisonTd}><BoolCell value={row.vanilla} /></td>
                <td className={comparisonTd}><BoolCell value={row.panda} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}