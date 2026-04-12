import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Hero from '../components/Hero/Hero';
import ParadigmSection from '../components/Paradigm/ParadigmSection';
import Playground from '../components/Playground/Playground';
import Docs from '../pages/Docs/Docs';
import StatsFooter from '../components/Statsfooter/StatsFooter';
//import Stargazers from './components/Stats/Stargazers';
import {
  modeSection,
  modeContainer,
  modeTitle,
  modeTitleSpan,
  modeDescription
} from './styles/app.class.js'

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
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (section === 'playground') {
      navigate('/playground');
      setTimeout(() => {
        const playgroundElement = document.getElementById('playground');
        if (playgroundElement) {
          playgroundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (section === 'docs') {
      navigate('/docs');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname === '/playground') {
      setTimeout(() => {
        const playgroundElement = document.getElementById('playground');
        if (playgroundElement) {
          playgroundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
            
            {/* Mode Section - Keeping for demo purposes but removing mode toggle */}
            <div ref={modeSectionRef} className={modeSection}>
              <div className={modeContainer}>
                <h2 className={modeTitle}>
                  Two Ways to Use <span className={modeTitleSpan}>ChainCSS</span>
                </h2>
                <p className={modeDescription}>
                  ChainCSS supports both <strong>build-time compilation</strong> (zero-runtime CSS) 
                  and <strong>runtime mode</strong> (dynamic styles). Choose what works best for your project.
                </p>
              </div>
            </div>
          </>} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
      
      <StatsFooter />
      {/*<Stargazers />*/}
    </>
  );
}

export default App;