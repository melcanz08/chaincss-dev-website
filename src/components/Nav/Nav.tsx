import { useState } from 'react';
import { Github } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import {
  nav,
  navContainer,
  logo,
  link,
  navLinks,
  navLinksOpen,
  activeLink   
} from './styles/nav.class.js';


interface NavProps {
  handleNavigate: (section: 'home' | 'playground' | 'docs') => void;
}

const Nav = ({handleNavigate }: NavProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/docs' && location.pathname.startsWith('/docs')) return true;
    if (path === '/playground' && location.pathname === '/playground') return true;
    return false;
  };

  const handleLinkClick = (section: 'home' | 'playground' | 'docs') => {
    setMobileMenuOpen(false);
    handleNavigate(section);
  };

  return (
    <nav className={nav}>
      <div className={navContainer}>
        <div className={logo} onClick={() => handleNavigate('home')}>
          ChainCSS
        </div>

        <button 
          className="show-on-mobile menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
        >
          ☰
        </button>

        <div className={`${navLinks} ${mobileMenuOpen ? navLinksOpen : ''}`}>
          <span 
            className={`${link} ${isActive('/') ? activeLink : ''}`}
            onClick={() => handleLinkClick('home')}
            style={{ cursor: 'pointer' }}
          >
            Home
          </span>
          <span 
            className={`${link} ${isActive('/docs') ? activeLink : ''}`}
            onClick={() => handleLinkClick('docs')}
            style={{ cursor: 'pointer' }}
          >
            Docs
          </span>
          <span 
            className={`${link} ${isActive('/playground') ? activeLink : ''}`}
            onClick={() => handleLinkClick('playground')}
            style={{ cursor: 'pointer' }}
          >
            Playground
          </span>
          
          <a
            href="https://github.com/melcanz08/chaincss"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
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