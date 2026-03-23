import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
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
    
    // Scroll to mode section after state update
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

  // Scroll to top when route changes
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
            
            {/* Mode Section with ref */}
            <div ref={modeSectionRef}>
              <section id="mode-section" style={{ padding: '4rem 1.5rem', textAlign: 'center', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#f1f5f9', borderRadius: '9999px', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    ChainCSS
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Current Mode: <span style={{ color: '#667eea' }}>{mode}</span>
                  </h2>
                  <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem' }}>
                    This site uses ChainCSS in <strong>{mode}</strong> mode.
                    <br />
                    <strong>Static styles</strong> (layout, colors) are compiled from .jcss files with atomic optimization.
                    <br />
                    <strong>Dynamic styles</strong> (active states, hover effects) use runtime mode.
                  </p>
                </div>
              </section>
            </div>
          </>
        } />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
      
      <StatsFooter />
      <Stargazers />
    </>
  );
}

export default App;