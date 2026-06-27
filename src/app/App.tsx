import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Hero from '../components/Hero/Hero';
import ParadigmSection from '../components/Paradigm/ParadigmSection';
import Playground from '../components/Playground/Playground';
import Docs from '../pages/Docs/Docs';
import StatsFooter from '../components/Statsfooter/StatsFooter';
import {
  modeSection,
  modeContainer,
  modeTitle,
  modeTitleSpan,
  modeDescription,
  featureGrid,
  featureCard,
  featureIcon,
  featureTitle,
  featureText,
} from './styles/app.class.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const modeSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (section: 'home' | 'playground' | 'docs') => {
    if (section === 'home') {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else if (section === 'playground') {
      navigate('/playground');
      setTimeout(() => {
        document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (section === 'docs') {
      navigate('/docs');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname === '/playground') {
      setTimeout(() => {
        document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (location.pathname.startsWith('/docs')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Nav handleNavigate={handleNavigation} />
      
      <Routes>
        <Route path="/" element={
          <>
            <div ref={heroRef}>
              <Hero />
            </div>
            <ParadigmSection />
            
            {/* How It Works Section */}
            <div ref={modeSectionRef} className={modeSection}>
              <div className={modeContainer}>
                <h2 className={modeTitle}>
                  How <span className={modeTitleSpan}>ChainCSS</span> Works
                </h2>
                <p className={modeDescription}>
                  One API. Automatic detection. Strings and numbers compile to static CSS at build time. 
                  Functions stay dynamic and resolve at runtime. No configuration, no manual mode switching.
                </p>

                <div className={featureGrid}>
                  <div className={featureCard}>
                    <div className={featureIcon}>⚡</div>
                    <h3 className={featureTitle}>Zero-Runtime by Default</h3>
                    <p className={featureText}>
                      Every static value is extracted at build time into plain CSS files. 
                      No JavaScript shipped for styles that never change.
                    </p>
                  </div>

                  <div className={featureCard}>
                    <div className={featureIcon}>🔄</div>
                    <h3 className={featureTitle}>Auto-Detection Mixed Mode</h3>
                    <p className={featureText}>
                      Use <code>chain.dynamic()</code> and chaincss automatically splits your styles — 
                      static to CSS, dynamic to runtime. No manual partitioning.
                    </p>
                  </div>

                  <div className={featureCard}>
                    <div className={featureIcon}>🎯</div>
                    <h3 className={featureTitle}>One Chainable API</h3>
                    <p className={featureText}>
                      Same fluent API for both modes. <code>chain()</code> for static, 
                      <code>chain.dynamic()</code> for mixed. Same shorthands, same macros, same DX.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
      
      <StatsFooter />
    </>
  );
}

export default App;