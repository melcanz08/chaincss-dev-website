import { useNavigate } from 'react-router-dom';
import { VERSION } from 'chaincss';
import {
  heroSection, heroBadge, heroTitle, heroGradient,
  heroSubtitle, heroCtaGroup, heroPrimaryBtn, heroSecondaryBtn
} from './hero.chain';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={heroSection}>
      
      <h1 className={heroTitle}>
        The <span className={heroGradient}>Design-Aware</span> CSS Compiler
      </h1>
      <p className={heroSubtitle}>
        Tokens know their relationships. Styles understand intent. Change one color in Figma — 
        every derived shade, hover state, and contrast ratio updates automatically. 
        Zero runtime. WCAG 2.2 built in.
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
          { value: 'Token Graph', label: 'Propagation' },
          { value: 'WCAG 2.2', label: 'Auto-Fix' },
          { value: '0KB', label: 'Runtime' },
          { value: '80ms', label: 'Figma → Browser' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#818cf8' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className={heroBadge}>
        v{VERSION} — Design Token Graph • Relationship Macros • Mixed Mode • Live Inspector
      </div>
    </section>
  );
}