import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { docsLayout, sidebar, sidebarTitle, sidebarLink, sidebarLinkActive, content } from '../../styles/docs.class.js';

const GettingStarted = lazy(() => import('./GettingStarted'));
const StylingProperties = lazy(() => import('./StylingProperties'));
const PseudoClasses = lazy(() => import('./PseudoClasses'));
const AtRules = lazy(() => import('./AtRules'));
const Macros = lazy(() => import('./Macros'));
const MixedMode = lazy(() => import('./MixedMode'));
const Recipes = lazy(() => import('./Recipes'));
const DesignTokens = lazy(() => import('./DesignTokens'));
const Animations = lazy(() => import('./Animations'));
const MathEngine = lazy(() => import('./MathEngine'));
const AtomicCSS = lazy(() => import('./AtomicCSS'));
const Pipeline = lazy(() => import('./Pipeline'));
const Accessibility = lazy(() => import('./Accessibility'));
const SelfHealing = lazy(() => import('./SelfHealing'));
const Inspector = lazy(() => import('./Inspector'));
const Caching = lazy(() => import('./Caching'));
const Security = lazy(() => import('./Security'));
const APIReference = lazy(() => import('./APIReference'));
const FrameworkIntegration = lazy(() => import('./FrameworkIntegration'));
const NextJS = lazy(() => import('./NextJS'));
const VitePlugin = lazy(() => import('./VitePlugin'));
const WebpackPlugin = lazy(() => import('./WebpackPlugin'));
const PostCSSPlugin = lazy(() => import('./PostCSSPlugin'));
const CLI = lazy(() => import('./CLI'));
const Benchmarks = lazy(() => import('./Benchmarks'));

const sections = [
  { title: 'Getting Started', links: [
    { to: '/docs', end: true, label: 'Introduction' },
    { to: '/docs/installation', label: 'Installation' },
    { to: '/docs/quickstart', label: 'Quick Start' },
  ]},
  { title: 'Styling API', links: [
    { to: '/docs/properties', label: 'CSS Properties' },
    { to: '/docs/pseudo-classes', label: 'Pseudo-Classes' },
    { to: '/docs/at-rules', label: 'At-Rules & Nesting' },
    { to: '/docs/macros', label: 'Macros' },
  ]},
  { title: 'Core Features', links: [
    { to: '/docs/mixed-mode', label: 'Mixed Mode' },
    { to: '/docs/recipes', label: 'Recipes (Variants)' },
    { to: '/docs/tokens', label: 'Design Tokens' },
    { to: '/docs/animations', label: 'Animations' },
    { to: '/docs/math', label: 'Math Engine' },
    { to: '/docs/atomic', label: 'Atomic CSS' },
  ]},
  { title: 'Compiler', links: [
    { to: '/docs/pipeline', label: '5-Stage Pipeline' },
    { to: '/docs/inspector', label: 'Live Inspector' },
    { to: '/docs/self-healing', label: 'Intent Engine' },
    { to: '/docs/accessibility', label: 'A11y Audit' },
    { to: '/docs/caching', label: 'Cache System' },
    { to: '/docs/security', label: 'Security' },
  ]},
  { title: 'Integration', links: [
    { to: '/docs/frameworks', label: 'React / Vue / Svelte / Solid' },
    { to: '/docs/nextjs', label: 'Next.js (RSC + SSR)' },
    { to: '/docs/vite-plugin', label: 'Vite Plugin' },
    { to: '/docs/webpack-plugin', label: 'Webpack Plugin' },
    { to: '/docs/postcss', label: 'PostCSS Plugin' },
  ]},
  { title: 'Reference', links: [
    { to: '/docs/api', label: 'API Reference' },
    { to: '/docs/cli', label: 'CLI Commands' },
    { to: '/docs/benchmarks', label: 'Benchmarks' },
  ]},
];

function SidebarLink({ to, end, label }: { to: string; end?: boolean; label: string }) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
  return (
    <NavLink to={to} end={end} className={isActive ? sidebarLink + ' ' + sidebarLinkActive : sidebarLink}>
      {label}
    </NavLink>
  );
}

export default function Docs() {
  return (
    <div className={docsLayout}>
      <aside className={sidebar}>
        <div className={sidebarTitle} style={{ fontSize: 18, marginBottom: 20 }}>📚 Documentation</div>
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
        <Suspense fallback={<div style={{ color: '#a1a1aa', padding: 40 }}>Loading...</div>}>
          <Routes>
            <Route index element={<GettingStarted />} />
            <Route path="installation" element={<GettingStarted />} />
            <Route path="quickstart" element={<GettingStarted />} />
            <Route path="properties" element={<StylingProperties />} />
            <Route path="pseudo-classes" element={<PseudoClasses />} />
            <Route path="at-rules" element={<AtRules />} />
            <Route path="macros" element={<Macros />} />
            <Route path="mixed-mode" element={<MixedMode />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="tokens" element={<DesignTokens />} />
            <Route path="animations" element={<Animations />} />
            <Route path="math" element={<MathEngine />} />
            <Route path="atomic" element={<AtomicCSS />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="inspector" element={<Inspector />} />
            <Route path="self-healing" element={<SelfHealing />} />
            <Route path="accessibility" element={<Accessibility />} />
            <Route path="caching" element={<Caching />} />
            <Route path="security" element={<Security />} />
            <Route path="api" element={<APIReference />} />
            <Route path="cli" element={<CLI />} />
            <Route path="benchmarks" element={<Benchmarks />} />
            <Route path="frameworks" element={<FrameworkIntegration />} />
            <Route path="nextjs" element={<NextJS />} />
            <Route path="vite-plugin" element={<VitePlugin />} />
            <Route path="webpack-plugin" element={<WebpackPlugin />} />
            <Route path="postcss" element={<PostCSSPlugin />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}