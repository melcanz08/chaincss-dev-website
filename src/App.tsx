import { useState } from 'react';
import { $, useChainStyles, createTokens } from '@melcanz85/chaincss/react';
import { Github, Star, Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const tokens = createTokens({
  colors: {
    primary: '#667eea',
    primaryDark: '#5a67d8',
    accent: '#764ba2',
    text: '#1e293b',
    bg: '#ffffff',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
});

function Hero() {
  const styles = useChainStyles(() => ({
    hero: $()
      .background('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
      .color('white')
      .padding('8rem 1.5rem 6rem')
      .textAlign('center')
      .position('relative')
      .overflow('hidden')
      .block(),

    // ... container, headline, tagline, ctaGroup unchanged ...

    primaryButton: $()
      .backgroundColor('white')
      .color('$colors.primary')               // ← FIXED: string ref
      .padding('0.875rem 2rem')
      .fontWeight('700')
      .borderRadius('9999px')
      .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
      .hover().backgroundColor('#f1f5f9').scale(1.05).translateY('-2px')
      .transition('all 0.2s ease')
      .cursor('pointer')
      .block('button'),

    secondaryButton: $()
      .backgroundColor('transparent')
      .color('white')
      .border('2px solid white')
      .padding('0.875rem 2rem')
      .fontWeight('600')
      .borderRadius('9999px')
      .hover().backgroundColor('rgba(255,255,255,0.1)').scale(1.05)
      .transition('all 0.2s ease')
      .cursor('pointer')
      .block('a'),

    badge: $()
      .backgroundColor('rgba(255,255,255,0.2)')
      .color('white')
      .padding('0.5rem 1rem')
      .borderRadius('9999px')
      .fontSize('0.875rem')
      .marginTop('2rem')
      .display('inline-block')
      .block(),
  }));

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* ... motion.h1, p, buttons ... */}
        <div className={styles.badge}>
          This entire website is styled with ChainCSS • MIT licensed • Actively maintained
        </div>
      </div>
    </section>
  );
}

function App() {
  const [mode, setMode] = useState<'build' | 'runtime'>('runtime');

  const styles = useChainStyles(() => ({
    nav: $()
      .backgroundColor('rgba(255,255,255,0.95)')
      .backdropFilter('blur(12px)')
      .borderBottom('1px solid #e2e8f0')
      .position('sticky')
      .top('0')
      .zIndex('50')
      .block(),

    navContainer: $()
      .maxWidth('80rem')
      .margin('0 auto')
      .padding('1rem 1.5rem')
      .display('flex')
      .justifyContent('space-between')
      .alignItems('center')
      .block(),

    logo: $()
      .fontSize('1.5rem')
      .fontWeight('800')
      .color('$colors.primary')
      .block(),

    navLinks: $()
      .display('flex')
      .gap('2rem')
      .alignItems('center')
      .block(),

    link: $()
      .color('$colors.text')
      .fontWeight('500')
      .hover().color('$colors.primary')
      .transition('color 0.2s')
      .cursor('pointer')
      .block(),
  }));

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>chaincss<span style={{ color: '#764ba2' }}>.dev</span></div>

          <div className={styles.navLinks}>
            <span className={styles.link} onClick={() => setMode('build')}>
              Build Mode
            </span>
            <span className={styles.link} onClick={() => setMode('runtime')}>
              Runtime Mode
            </span>
            <a href="#playground" className={styles.link}>
              Playground
            </a>
            <a href="#components" className={styles.link}>
              Components
            </a>
            <a
              href="https://github.com/melcanz08/chaincss"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:text-primary"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>
      </nav>

      <Hero />

      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', background: '#ffffff' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          Current Mode: <span style={{ color: '#667eea' }}>{mode}</span>
        </h2>
        <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
          This site is already using ChainCSS in <strong>{mode}</strong> mode for most styles.
          <br />
          Next: interactive playground with live code → CSS output preview.
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
  );
}

export default App;