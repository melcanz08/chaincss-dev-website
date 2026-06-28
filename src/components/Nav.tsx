import { useNavigate, useLocation } from 'react-router-dom';
import { nav, navInner, logo, logoAccent, navLinks, navLink } from '../styles/nav.chain.ts';
import { chain } from 'chaincss';

const navLinkActive = chain()
  .color('#a5b4fc')
  .$el('nav-link-active');

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className={nav}>
      <div className={navInner}>
        <div className={logo} onClick={() => navigate('/')}>
          ◈ <span className={logoAccent}>Chain</span>CSS
        </div>
        <div className={navLinks}>
          <span
            className={navLink + (isActive('/docs') ? ' ' + navLinkActive : '')}
            onClick={() => navigate('/docs')}
          >
            Docs
          </span>
          <span
            className={navLink + (isActive('/playground') ? ' ' + navLinkActive : '')}
            onClick={() => navigate('/playground')}
          >
            Playground
          </span>
          <a href="https://github.com/melcanz08/chaincss" target="_blank" rel="noopener" className={navLink}>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
