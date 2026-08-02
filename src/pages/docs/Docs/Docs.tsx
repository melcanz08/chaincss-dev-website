import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { docsLayout, sidebar, sidebarTitle, sidebarLink, sidebarLinkActive, content } from './docs.chain';

const GettingStarted = lazy(() => import('../GettingStarted'));
const StylingProperties = lazy(() => import('../StylingProperties'));
const PseudoClasses = lazy(() => import('../PseudoClasses'));
const AtRules = lazy(() => import('../AtRules'));
const Macros = lazy(() => import('../Macros'));
const MixedMode = lazy(() => import('../MixedMode'));
const Prefixer = lazy(() => import('../Prefixer'));
const Breakpoints = lazy(() => import('../Breakpoints'));
const Suggestions = lazy(() => import('../Suggestions'));
const Recipes = lazy(() => import('../Recipes'));
const DesignTokens = lazy(() => import('../DesignTokens'));
const TokenEntanglement = lazy(() => import('../TokenEntanglement'));
const SemanticIntents = lazy(() => import('../SemanticIntents'));
const ThemeContracts = lazy(() => import('../ThemeContracts'));
const FigmaIntegration = lazy(() => import('../FigmaIntegration'));
const Animations = lazy(() => import('../Animations'));
const MathEngine = lazy(() => import('../MathEngine'));
const AtomicCSS = lazy(() => import('../AtomicCSS'));
const ThemeSwitching = lazy(() => import('../ThemeSwitching'));
const Pipeline = lazy(() => import('../Pipeline'));
const MultiTarget = lazy(() => import('../MultiTarget'));
const CSSIfLowering = lazy(() => import('../CSSIfLowering'));
const Constraints = lazy(() => import('../Constraints'));
const ScrollAnimations = lazy(() => import('../ScrollAnimations'));
const Accessibility = lazy(() => import('../Accessibility'));
const SelfHealing = lazy(() => import('../SelfHealing'));
const Inspector = lazy(() => import('../Inspector'));
const Caching = lazy(() => import('../Caching'));
const Security = lazy(() => import('../Security'));
const APIReference = lazy(() => import('../APIReference'));
const FrameworkIntegration = lazy(() => import('../FrameworkIntegration'));
const NextJS = lazy(() => import('../NextJS'));
const VitePlugin = lazy(() => import('../VitePlugin'));
const WebpackPlugin = lazy(() => import('../WebpackPlugin'));
const PostCSSPlugin = lazy(() => import('../PostCSSPlugin'));
const FrameworkCodegen = lazy(() => import('../FrameworkCodegen'));
const CLI = lazy(() => import('../CLI'));
const DevServer = lazy(() => import('../DevServer'));
const CacheTimeline = lazy(() => import('../CacheTimeline'));
const Configuration = lazy(() => import('../Configuration'));
const Benchmarks = lazy(() => import('../Benchmarks'));

const sections = [
  {
    title: 'Getting Started', links: [
      { to: '/docs', end: true, label: 'Introduction' },
      { to: '/docs/installation', label: 'Installation' },
      { to: '/docs/quickstart', label: 'Quick Start' },
    ]
  },
  {
    title: 'Styling API', links: [
      { to: '/docs/properties', label: 'CSS Properties' },
      { to: '/docs/pseudo-classes', label: 'Pseudo-Classes' },
      { to: '/docs/at-rules', label: 'At-Rules & Nesting' },
      { to: '/docs/macros', label: 'Macros (100+)' },
      { to: '/docs/suggestions', label: 'Suggestions Engine' },
    ]
  },
  {
    title: 'Core Features', links: [
      { to: '/docs/mixed-mode', label: 'Mixed Mode' },
      { to: '/docs/recipes', label: 'Recipes (Variants)' },
      { to: '/docs/animations', label: 'Animations' },
      { to: '/docs/math', label: 'Math Engine' },
      { to: '/docs/atomic', label: 'Atomic CSS' },
      { to: '/docs/breakpoints', label: 'Breakpoints' },
      { to: '/docs/theme-switching', label: 'Theme Switching' }
    ]
  },
  {
    title: 'Design System', links: [
      { to: '/docs/tokens', label: 'Design Tokens' },
      { to: '/docs/tokens/entanglement', label: 'Token Entanglement' },
      { to: '/docs/tokens/semantic-intents', label: 'Semantic Intents' },
      { to: '/docs/tokens/theme-contracts', label: 'Theme Contracts' },
      { to: '/docs/tokens/figma', label: 'Figma Integration' },
      { to: '/docs/accessibility', label: 'Accessibility Audit' },
    ]
  },
  {
    title: 'Compiler', links: [
      { to: '/docs/pipeline', label: '5-Stage Pipeline' },
      { to: '/docs/compiler/multi-target', label: 'Multi-Target Emission' },
      { to: '/docs/compiler/css-if', label: 'CSS if() Lowering' },
      { to: '/docs/compiler/constraints', label: 'Constraint Resolver' },
      { to: '/docs/compiler/scroll-animations', label: 'Scroll Animations' },
      { to: '/docs/inspector', label: 'Live Inspector' },
      { to: '/docs/self-healing', label: 'Intent Engine' },
      { to: '/docs/caching', label: 'Cache System' },
      { to: '/docs/prefixer', label: 'Vendor Prefixer' },
      { to: '/docs/security', label: 'Security' },
    ]
  },
  {
    title: 'Integration', links: [
      { to: '/docs/frameworks', label: 'React / Vue / Svelte / Solid' },
      { to: '/docs/nextjs', label: 'Next.js (RSC + SSR)' },
      { to: '/docs/vite-plugin', label: 'Vite Plugin' },
      { to: '/docs/webpack-plugin', label: 'Webpack Plugin' },
      { to: '/docs/postcss', label: 'PostCSS Plugin' },
      { to: '/docs/codegen', label: 'Component Codegen' }
    ]
  },
  {
    title: 'CLI & Tooling', links: [
      { to: '/docs/cli', label: 'CLI Reference' },
      { to: '/docs/cli/dev-server', label: 'Dev Server' },
      { to: '/docs/cli/cache-timeline', label: 'Cache & Timeline' },
    ]
  },
  {
    title: 'Reference', links: [
      { to: '/docs/configuration', label: 'Configuration' },
      { to: '/docs/api', label: 'API Reference' },
      { to: '/docs/benchmarks', label: 'Benchmarks' },
    ]
  },
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
            {/* Getting Started */}
            <Route index element={<GettingStarted />} />
            <Route path="installation" element={<GettingStarted />} />
            <Route path="quickstart" element={<GettingStarted />} />

            {/* Styling API */}
            <Route path="properties" element={<StylingProperties />} />
            <Route path="pseudo-classes" element={<PseudoClasses />} />
            <Route path="at-rules" element={<AtRules />} />
            <Route path="macros" element={<Macros />} />
            <Route path="suggestions" element={<Suggestions />} />

            {/* Core Features */}
            <Route path="mixed-mode" element={<MixedMode />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="animations" element={<Animations />} />
            <Route path="math" element={<MathEngine />} />
            <Route path="atomic" element={<AtomicCSS />} />
            <Route path="breakpoints" element={<Breakpoints />} />
            <Route path="theme-switching" element={<ThemeSwitching />} />

            {/* Design System */}
            <Route path="tokens" element={<DesignTokens />} />
            <Route path="tokens/entanglement" element={<TokenEntanglement />} />
            <Route path="tokens/semantic-intents" element={<SemanticIntents />} />
            <Route path="tokens/theme-contracts" element={<ThemeContracts />} />
            <Route path="tokens/figma" element={<FigmaIntegration />} />
            <Route path="accessibility" element={<Accessibility />} />

            {/* Compiler */}
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="compiler/multi-target" element={<MultiTarget />} />
            <Route path="compiler/css-if" element={<CSSIfLowering />} />
            <Route path="compiler/constraints" element={<Constraints />} />
            <Route path="compiler/scroll-animations" element={<ScrollAnimations />} />
            <Route path="inspector" element={<Inspector />} />
            <Route path="self-healing" element={<SelfHealing />} />
            <Route path="caching" element={<Caching />} />
            <Route path="prefixer" element={<Prefixer />} />
            <Route path="security" element={<Security />} />

            {/* Integration */}
            <Route path="frameworks" element={<FrameworkIntegration />} />
            <Route path="nextjs" element={<NextJS />} />
            <Route path="vite-plugin" element={<VitePlugin />} />
            <Route path="webpack-plugin" element={<WebpackPlugin />} />
            <Route path="postcss" element={<PostCSSPlugin />} />
            <Route path="codegen" element={<FrameworkCodegen />} />

            {/* CLI & Tooling */}
            <Route path="cli" element={<CLI />} />
            <Route path="cli/dev-server" element={<DevServer />} />
            <Route path="cli/cache-timeline" element={<CacheTimeline />} />

            {/* Reference */}
            <Route path="configuration" element={<Configuration />} />
            <Route path="api" element={<APIReference />} />
            <Route path="benchmarks" element={<Benchmarks />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}