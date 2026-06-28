import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import {
  docsLayout, sidebar, sidebarTitle, sidebarLink,
  sidebarLinkActive, content
} from '../../styles/docs.chain.ts';

const GettingStarted = lazy(() => import('./GettingStarted'));
const APIReference = lazy(() => import('./APIReference'));
const MixedMode = lazy(() => import('./MixedMode'));
const Pipeline = lazy(() => import('./Pipeline'));
const FrameworkIntegration = lazy(() => import('./FrameworkIntegration'));
const CLI = lazy(() => import('./CLI'));
const DesignTokens = lazy(() => import('./DesignTokens'));
const Recipes = lazy(() => import('./Recipes'));
const Macros = lazy(() => import('./Macros'));
const Benchmarks = lazy(() => import('./Benchmarks'));

const sections = [
  { title: 'Getting Started', links: [
    { to: '/docs', end: true, label: 'Introduction' },
    { to: '/docs/installation', label: 'Installation' },
    { to: '/docs/quickstart', label: 'Quick Start' },
  ]},
  { title: 'Core Concepts', links: [
    { to: '/docs/api', label: 'API Reference' },
    { to: '/docs/mixed-mode', label: 'Mixed Mode' },
    { to: '/docs/macros', label: 'Macros & Shorthands' },
    { to: '/docs/recipes', label: 'Recipes' },
  ]},
  { title: 'Advanced', links: [
    { to: '/docs/pipeline', label: 'Compiler Pipeline' },
    { to: '/docs/tokens', label: 'Design Tokens' },
    { to: '/docs/benchmarks', label: 'Benchmarks' },
  ]},
  { title: 'Integration', links: [
    { to: '/docs/frameworks', label: 'Frameworks' },
    { to: '/docs/cli', label: 'CLI' },
  ]},
];

function SidebarLink({ to, end, label }: { to: string; end?: boolean; label: string }) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <NavLink
      to={to}
      end={end}
      className={isActive ? sidebarLink + ' ' + sidebarLinkActive : sidebarLink}
    >
      {label}
    </NavLink>
  );
}

export default function Docs() {
  return (
    <div className={docsLayout}>
      <aside className={sidebar}>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <div className={sidebarTitle}>{section.title}</div>
            {section.links.map((link, j) => (
              <SidebarLink key={j} to={link.to} end={link.end} label={link.label} />
            ))}
          </div>
        ))}
      </aside>
      <main className={content}>
        <Suspense fallback={<div style={{ color: '#a1a1aa' }}>Loading...</div>}>
          <Routes>
            <Route index element={<GettingStarted />} />
            <Route path="installation" element={<GettingStarted />} />
            <Route path="quickstart" element={<GettingStarted />} />
            <Route path="api" element={<APIReference />} />
            <Route path="mixed-mode" element={<MixedMode />} />
            <Route path="macros" element={<Macros />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="tokens" element={<DesignTokens />} />
            <Route path="benchmarks" element={<Benchmarks />} />
            <Route path="frameworks" element={<FrameworkIntegration />} />
            <Route path="cli" element={<CLI />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
