import { useNavigate } from 'react-router-dom';
import { VERSION } from 'chaincss';
import {
  heroSection, heroBadge, heroTitle, heroGradient,
  heroSubtitle, heroCtaGroup, heroPrimaryBtn, heroSecondaryBtn
} from '../styles/hero.chain.ts';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={heroSection}>
      
      <h1 className={heroTitle}>
        Write <span className={heroGradient}>CSS-in-JS</span>.
        <br />
        Compile to zero-runtime CSS.
      </h1>
      <p className={heroSubtitle}>
        ChainCSS is a compiler that transforms your TypeScript styles into static CSS at build time.
        Dynamic values update via CSS variables — no runtime library, no memory leaks.
      </p>
      <div className={heroCtaGroup}>
        <button className={heroPrimaryBtn} onClick={() => navigate('/docs/quickstart')}>
          Get Started →
        </button>
        <button className={heroSecondaryBtn} onClick={() => navigate('/docs')}>
          Read the Docs
        </button>
      </div>
      <div style={{ marginTop: 32, marginBottom: 32, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { value: '0KB', label: 'Runtime' },
          { value: '0.5ms', label: 'Compile Time' },
          { value: '5-Stage', label: 'Pipeline' },
          { value: 'WCAG 2.2', label: 'A11y Audit' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#818cf8' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className={heroBadge}>
        v{VERSION} — 5-Stage Compiler Pipeline • Zero Runtime • Built-in A11y Audit
      </div>
    </section>
  );
}
