import { useNavigate } from 'react-router-dom';
import {
  heroSection, heroBadge, heroTitle, heroGradient,
  heroSubtitle, heroCtaGroup, heroPrimaryBtn, heroSecondaryBtn
} from '../styles/hero.chain.ts';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={heroSection}>
      <div className={heroBadge}>v2.8.8 — 5-Stage Compiler Pipeline</div>
      <h1 className={heroTitle}>
        Write <span className={heroGradient}>CSS-in-JS</span>.<br />
        Ship zero runtime.
      </h1>
      <p className={heroSubtitle}>
        ChainCSS compiles your chainable styles to static CSS at build time.
        Dynamic values stay in JS — automatically. No configuration, no manual
        mode switching, no runtime overhead.
      </p>
      <div className={heroCtaGroup}>
        <button className={heroPrimaryBtn} onClick={() => navigate('/docs')}>
          View Docs
        </button>
        <button className={heroSecondaryBtn} onClick={() => navigate('/playground')}>
          Try Playground
        </button>
      </div>
    </section>
  );
}
