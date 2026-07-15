import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { nav, navInner, logo, logoAccent, navLinks, navLink } from '../styles/nav.chain.ts';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const links = [
    { to: '/docs', label: 'Docs' },
    { to: '/playground', label: 'Playground' },
    { to: '/audit', label: 'Audit' },
  ];

  const handleNav = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <nav className={nav}>
      <div className={navInner}>
        <div className={logo} onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
          ◈ <span className={logoAccent}>Chain</span>CSS
        </div>

        <div className={navLinks}>
          {links.map(link => (
            <a
              key={link.to}
              className={navLink}
              onClick={() => handleNav(link.to)}
              style={{
                color: isActive(link.to) ? '#a5b4fc' : '#a1a1aa',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#a1a1aa',
            fontSize: 24,
            cursor: 'pointer',
            padding: '8px',
            lineHeight: 1,
          }}
          className="burger-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{
          display: 'none',
          flexDirection: 'column',
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '16px 24px',
          gap: 16,
        }} className="mobile-menu">
          {links.map(link => (
            <a
              key={link.to}
              onClick={() => handleNav(link.to)}
              style={{
                color: isActive(link.to) ? '#a5b4fc' : '#a1a1aa',
                fontSize: 16,
                fontWeight: 500,
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .burger-btn { display: block !important; }
          .chain-nav-links { display: none !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}