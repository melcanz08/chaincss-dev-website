import { $, useChainStyles } from '@melcanz85/chaincss/react';
import { Github } from 'lucide-react';

interface NavProps {
  activeSection: 'home' | 'playground';
  setActiveSection: (section: 'home' | 'playground') => void;
  mode: 'build' | 'runtime';
  setMode: (mode: 'build' | 'runtime') => void;
}

const Nav = ({ activeSection, setActiveSection, mode, setMode }: NavProps) => {
  // ONLY dynamic styles for active states and hover effects
  const styles = useChainStyles(() => ({
    link: $()
      .color('#1e293b')
      .fontWeight('500')
      .hover().color('#667eea')
      .transition('color 0.2s')
      .cursor('pointer')
      .textDecoration('none')
      .block(),

    activeLink: $()
      .color('#667eea')
      .block(),
  }));

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo" onClick={() => setActiveSection('home')}>
          chaincss<span style={{ color: '#764ba2' }}>.dev</span>
        </div>

        <div className="nav-links">
          <span 
            className={`${styles.link} ${activeSection === 'home' ? styles.activeLink : ''}`}
            onClick={() => setActiveSection('home')}
          >
            Home
          </span>
          <span 
            className={`${styles.link} ${activeSection === 'playground' ? styles.activeLink : ''}`}
            onClick={() => setActiveSection('playground')}
          >
            Playground
          </span>
          <span className={styles.link} onClick={() => setMode('build')}>
            Build Mode
          </span>
          <span className={styles.link} onClick={() => setMode('runtime')}>
            Runtime Mode
          </span>
          <a
            href="https://github.com/melcanz08/chaincss"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;