import { useState } from 'react';
import { Github } from 'lucide-react';
import Nav from './components/Nav/Nav';
import Hero from './components/Hero/Hero';
import Playground from './components/Playground/Playground';

function App() {
  const [mode, setMode] = useState<'build' | 'runtime'>('runtime');
  const [activeSection, setActiveSection] = useState<'home' | 'playground'>('home');

  return (
    <>
      <Nav 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mode={mode}
        setMode={setMode}
      />
      
      {activeSection === 'home' ? (
        <>
          <Hero onPlaygroundClick={() => setActiveSection('playground')} />
          
          <section style={{ padding: '6rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Current Mode: <span style={{ color: '#667eea' }}>{mode}</span>
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
              This site uses ChainCSS in <strong>{mode}</strong> mode.
              <br />
              <strong>Static styles</strong> (layout, colors) are compiled from .jcss files.
              <br />
              <strong>Dynamic styles</strong> (active states, hover effects) use runtime mode.
            </p>
            <button
              onClick={() => setMode(mode === 'build' ? 'runtime' : 'build')}
              style={{
                padding: '0.875rem 2rem',
                background: '#667eea',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Toggle Mode
            </button>
          </section>
        </>
      ) : (
        <Playground />
      )}
    </>
  );
}

export default App;