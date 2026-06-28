import {
  table, th, td, check, cross, partial, wrapper
} from '../styles/comparison.chain.ts';
import { section, sectionTitle, sectionSubtitle } from '../styles/features.chain.ts';

const data = [
  { feature: 'Runtime cost', chaincss: '0KB (static)', styled: '~14KB', vanilla: '0KB', tailwind: '0KB' },
  { feature: 'Dynamic styles', chaincss: '✅ Mixed mode', styled: '✅', vanilla: '❌', tailwind: '❌' },
  { feature: 'Build output', chaincss: 'Plain CSS', styled: 'JS-in-CSS', vanilla: 'Plain CSS', tailwind: 'Utility CSS' },
  { feature: 'TypeScript', chaincss: '✅ First-class', styled: '✅', vanilla: '✅', tailwind: 'Partial' },
  { feature: 'Atomic CSS', chaincss: '✅ Opt-in', styled: '❌', vanilla: '❌', tailwind: '✅ Built-in' },
  { feature: 'Design tokens', chaincss: '✅ Built-in', styled: '⚠️ Manual', vanilla: '✅', tailwind: '⚠️ Config' },
  { feature: 'Pipeline optimization', chaincss: '✅ 5-stage', styled: '❌', vanilla: '❌', tailwind: '❌' },
  { feature: 'Framework plugins', chaincss: 'Vite + Webpack', styled: 'Babel', vanilla: 'Vite + Webpack', tailwind: 'PostCSS' },
];

export default function ComparisonTable() {
  return (
    <section className={section} style={{ paddingTop: 0 }}>
      <h2 className={sectionTitle}>How ChainCSS Compares</h2>
      <p className={sectionSubtitle}>
        See how ChainCSS stacks up against other popular CSS solutions.
      </p>
      <div className={wrapper}>
        <table className={table}>
          <thead>
            <tr>
              <th className={th}>Feature</th>
              <th className={th} style={{ color: '#a5b4fc' }}>ChainCSS</th>
              <th className={th}>Styled Components</th>
              <th className={th}>Vanilla Extract</th>
              <th className={th}>Tailwind</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className={td} style={{ fontWeight: 500 }}>{row.feature}</td>
                <td className={td} style={{ color: '#a5b4fc' }}>{row.chaincss}</td>
                <td className={td}>{row.styled}</td>
                <td className={td}>{row.vanilla}</td>
                <td className={td}>{row.tailwind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
