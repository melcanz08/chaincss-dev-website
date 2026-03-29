import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import ParadigmSection from './components/Paradigm/ParadigmSection';
import Playground from './components/Playground/Playground';
import Docs from './pages/Docs/Docs';
import StatsFooter from './components/Stats/StatsFooter';
import Stargazers from './components/Stats/Stargazers';

function App() {
  const [mode, setMode] = useState<'build' | 'runtime'>('runtime');
  const navigate = useNavigate();
  const location = useLocation();
  const modeSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (newMode: 'build' | 'runtime') => {
    setMode(newMode);
    
    setTimeout(() => {
      if (modeSectionRef.current) {
        modeSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

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
      <Nav 
        mode={mode}
        setMode={handleModeChange}
        handleNavigate={handleNavigation}
      />
      
      <Routes>
        <Route path="/" element={
          <>
            <div ref={heroRef}>
              <Hero />
            </div>
            <ParadigmSection />
            
            {/* Mode Section - Now using ChainCSS classes */}
            <div ref={modeSectionRef} className="mode-section">
              <div className="mode-container">
                <h2 className="mode-title">
                  Current Mode: <span>{mode}</span>
                </h2>
                <p className="mode-description">
                  This site uses ChainCSS in <strong>{mode}</strong> mode.
                  <br />
                  <strong>Static styles</strong> (layout, colors) are compiled from .jcss files with atomic optimization.
                  <br />
                  <strong>Dynamic styles</strong> (active states, hover effects) use runtime mode.
                </p>
              </div>
            </div>
          </>} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
      
      <StatsFooter />
      <Stargazers />
    </>
  );
}

export default App;