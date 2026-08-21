import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { nav, navInner, logo, logoAccent, navLinks, navLink } from './nav.chain';

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const manifestoLinks = [
    { to: '/features/tokens', label: 'Tokens & Relationships' },
    { to: '/features/intent', label: 'Intent-Driven Styles' },
    { to: '/features/figma-sync', label: 'Figma Sync' },
  ];

  const toolLinks = [
    { to: '/theme-graph', label: 'Theme Graph' },
    { to: '/audit', label: 'Audit' },
    { to: '/newpipeline', label: 'Pipeline' },
  ];

  const standardLinks = [
    { to: '/docs', label: 'Docs' },
    { to: '/playground', label: 'Playground' },
  ];

  const handleNav = (to: string) => {
    setMenuOpen(false);
    setFeaturesOpen(false);
    navigate(to);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFeaturesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={nav}>
      <div className={navInner}>
        <div className={logo} onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>
          ◈ <span className={logoAccent}>Chain</span>CSS
        </div>

        <div className={navLinks} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Features Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className={navLink}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                color: location.pathname.startsWith('/features') || toolLinks.some(l => isActive(l.to)) ? '#a5b4fc' : '#a1a1aa',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Platform ▾
            </button>

            {featuresOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '-20px',
                background: 'rgba(15, 23, 42, 0.98)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px',
                minWidth: '240px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                zIndex: 100,
              }}>
                <div style={{ color: '#818cf8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 8px' }}>
                  Manifesto Tour
                </div>
                {manifestoLinks.map(feat => (
                  <a
                    key={feat.to}
                    onClick={() => handleNav(feat.to)}
                    style={{
                      color: isActive(feat.to) ? '#a5b4fc' : '#cbd5e1',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                      backgroundColor: isActive(feat.to) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isActive(feat.to) ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                  >
                    {feat.label}
                  </a>
                ))}

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

                <div style={{ color: '#818cf8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 8px' }}>
                  Engine Tools
                </div>
                {toolLinks.map(tool => (
                  <a
                    key={tool.to}
                    onClick={() => handleNav(tool.to)}
                    style={{
                      color: isActive(tool.to) ? '#a5b4fc' : '#cbd5e1',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                      backgroundColor: isActive(tool.to) ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isActive(tool.to) ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                  >
                    {tool.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Standard Navigation Links */}
          {standardLinks.map(link => (
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

      {/* Mobile Menu Expansion */}
      {menuOpen && (
        <div style={{
          display: 'none',
          flexDirection: 'column',
          background: 'rgba(10, 10, 15, 0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '16px 24px',
          gap: 10,
        }} className="mobile-menu">
          <div style={{ color: '#818cf8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
            Manifesto Tour
          </div>
          {manifestoLinks.map(feat => (
            <a
              key={feat.to}
              onClick={() => handleNav(feat.to)}
              style={{
                color: isActive(feat.to) ? '#a5b4fc' : '#cbd5e1',
                fontSize: 14,
                paddingLeft: '12px',
                borderLeft: isActive(feat.to) ? '2px solid #6366f1' : '2px solid transparent',
                cursor: 'pointer',
                paddingTop: '3px',
                paddingBottom: '3px',
              }}
            >
              {feat.label}
            </a>
          ))}

          <div style={{ color: '#818cf8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>
            Engine Tools
          </div>
          {toolLinks.map(tool => (
            <a
              key={tool.to}
              onClick={() => handleNav(tool.to)}
              style={{
                color: isActive(tool.to) ? '#a5b4fc' : '#cbd5e1',
                fontSize: 14,
                paddingLeft: '12px',
                borderLeft: isActive(tool.to) ? '2px solid #6366f1' : '2px solid transparent',
                cursor: 'pointer',
                paddingTop: '3px',
                paddingBottom: '3px',
              }}
            >
              {tool.label}
            </a>
          ))}

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />

          <div style={{ color: '#818cf8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Navigation
          </div>
          {standardLinks.map(link => (
            <a
              key={link.to}
              onClick={() => handleNav(link.to)}
              style={{
                color: isActive(link.to) ? '#a5b4fc' : '#a1a1aa',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                padding: '4px 0 4px 12px',
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