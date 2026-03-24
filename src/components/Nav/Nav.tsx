import { $ } from 'chaincss';
import { useChainStyles } from 'chaincss/react';
import { Github } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface NavProps {
  mode: 'build' | 'runtime';
  setMode: (mode: 'build' | 'runtime') => void;
  handleNavigate: (section: 'home' | 'playground' | 'docs') => void;
}

const Nav = ({ mode, setMode, handleNavigate }: NavProps) => {
  const location = useLocation();
  
  const styles = useChainStyles(() => ({
    link: $()
      .color('#1e293b')
      .fontWeight('500')
      .hover()
        .color('#667eea')
      .end()
      .transition('color 0.2s')
      .cursor('pointer')
      .textDecoration('none')
      .block(),
      
    activeLink: $()
      .color('#667eea')
      .fontWeight('600')
      .block(),
      
    modeButton: $()
      .padding('0.5rem 1rem')
      .borderRadius('0.5rem')
      .fontSize('0.875rem')
      .fontWeight('500')
      .transition('all 0.2s')
      .cursor('pointer')
      .border('none')
      .fontFamily('inherit')
      .block(),
      
    activeMode: $()
      .backgroundColor('#667eea')
      .color('white')
      .hover()
        .backgroundColor('#5a67d8')
      .end()
      .block(),
      
    inactiveMode: $()
      .backgroundColor('#f1f5f9')
      .color('#475569')
      .hover()
        .backgroundColor('#e2e8f0')
      .end()
      .block()
  }), []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/docs' && location.pathname.startsWith('/docs')) return true;
    if (path === '/playground' && location.pathname === '/playground') return true;
    return false;
  };

  const handleModeClick = (newMode: 'build' | 'runtime') => {
    setMode(newMode);
    
    // If not on home page, navigate home first then scroll to mode section
    if (location.pathname !== '/') {
      handleNavigate('home');
      // Allow time for navigation before scrolling
      setTimeout(() => {
        const modeSection = document.getElementById('mode-section');
        if (modeSection) {
          modeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } else {
      // Already on home page, just scroll to mode section
      setTimeout(() => {
        const modeSection = document.getElementById('mode-section');
        if (modeSection) {
          modeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo" onClick={() => handleNavigate('home')}>
          chaincss<span style={{ color: '#764ba2' }}>.dev</span>
        </div>

        <div className="nav-links">
          <span 
            className={`${styles.link} ${isActive('/') ? styles.activeLink : ''}`}
            onClick={() => handleNavigate('home')}
            style={{ cursor: 'pointer' }}
          >
            Home
          </span>
          <span 
            className={`${styles.link} ${isActive('/docs') ? styles.activeLink : ''}`}
            onClick={() => handleNavigate('docs')}
            style={{ cursor: 'pointer' }}
          >
            Docs
          </span>
          <span 
            className={`${styles.link} ${isActive('/playground') ? styles.activeLink : ''}`}
            onClick={() => handleNavigate('playground')}
            style={{ cursor: 'pointer' }}
          >
            Playground
          </span>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => handleModeClick('build')}
              className={`${styles.modeButton} ${mode === 'build' ? styles.activeMode : styles.inactiveMode}`}
            >
              Build
            </button>
            <button 
              onClick={() => handleModeClick('runtime')}
              className={`${styles.modeButton} ${mode === 'runtime' ? styles.activeMode : styles.inactiveMode}`}
            >
              Runtime
            </button>
          </div>
          
          <a
            href="https://github.com/melcanz08/chaincss"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;