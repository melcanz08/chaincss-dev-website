import {
  table, th, td, check, cross, wrapper
} from '../styles/comparison.chain.ts';
import { section, sectionTitle, sectionSubtitle } from '../styles/features.chain.ts';

const data = [
  { feature: 'Type', chaincss: 'Compiler', styled: 'Runtime Library', vanilla: 'Compiler', tailwind: 'Compiler' },
  { feature: 'Runtime cost', chaincss: '0KB', styled: '~14KB', vanilla: '0KB', tailwind: '0KB' },
  { feature: 'Dynamic styles', chaincss: '✅ Mixed mode', styled: '✅', vanilla: '❌', tailwind: '❌' },
  { feature: 'Design tokens', chaincss: '✅ Built-in', styled: '❌', vanilla: '❌', tailwind: 'Config only' },
  { feature: 'Atomic CSS', chaincss: '✅ Opt-in', styled: '❌', vanilla: '❌', tailwind: '✅' },
  { feature: 'Accessibility audit', chaincss: '✅ Built-in', styled: '❌', vanilla: '❌', tailwind: '❌' },
  { feature: 'Compiler inspector', chaincss: '✅ Live', styled: '❌', vanilla: '❌', tailwind: '❌' },
  { feature: 'Theme contracts', chaincss: '✅ Build-time', styled: '✅ Runtime', vanilla: '✅ Build-time', tailwind: '❌' },
  { feature: 'Zero-runtime mode', chaincss: '✅ Default', styled: '❌', vanilla: '✅', tailwind: '✅' },
  { feature: 'TypeScript API', chaincss: '✅ First-class', styled: '✅', vanilla: '✅', tailwind: 'Partial' },
];

export default function ComparisonTable() {
  return (
    <section className={section}>
      <h2 className={sectionTitle}>How ChainCSS Compares</h2>
      <p className={sectionSubtitle}>
        ChainCSS is a compiler that understands your styles — not a runtime library or a utility framework.
      </p>
      <div className={wrapper}>
        <table className={table}>
          <thead>
            <tr>
              <th className={th} style={{ textAlign: 'left' }}>Feature</th>
              <th className={th}>ChainCSS</th>
              <th className={th}>Styled Components</th>
              <th className={th}>Vanilla Extract</th>
              <th className={th}>Tailwind</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.feature}>
                <td className={td} style={{ fontWeight: 600, textAlign: 'left' }}>{row.feature}</td>
                <td className={td}>{row.chaincss}</td>
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
