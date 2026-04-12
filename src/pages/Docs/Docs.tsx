import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import {codeblock,
comparisonRow,
comparisonTable,
comparisonTableTh,
comparisonTableThead,
comparisonTableWrapper,
content,
docsContainer,
docsDescription,
docsHeader,
docsTitle,
featureCard,
featureGrid,
inlineCode,
note,
problemCell,
docsSidebar,
sidebarLink,
sidebarLinkActive,
sidebarSection,
sidebarTitle,
solutionBadge,
solutionCell,
tip,
warning, docsSidebarOpen, mobileMenuBtn} from './styles/docs.class.js';

// Getting Started
const GettingStarted= lazy(() => import('./GettingStarted'));
const Installation= lazy(() => import( './Installation'));
const YourFirstStyle= lazy(() => import( './YourFirstStyle'));
const QuickStart =lazy(() => import( './QuickStart'));

// Core Concepts
const CoreConcepts= lazy(() => import( './CoreConcepts'));
const CSSProperties= lazy(() => import( './CSSProperties'));
const Selectors= lazy(() => import( './Selectors'));
const HoverStates= lazy(() => import( './HoverStates'));
const AtRules= lazy(() => import( './AtRules'));
const NestedSelectors= lazy(() => import( './NestedSelectors'));

const ModularDesign= lazy(() => import( './ModularDesign'));

// Design System
const DesignTokens= lazy(() => import( './DesignTokens'));
const Theming = lazy(() => import('./Theming'));
const CSSVariables= lazy(() => import( './CSSVariables'));
const ThemeContract= lazy(() => import( './ThemeContract'));

// Component System
const Recipes= lazy(() => import( './Recipes'));
const Variants= lazy(() => import( './Variants'));
const CompoundVariants= lazy(() => import( './CompoundVariants'));
const VariantsDeepDive= lazy(() => import( './VariantsDeepDive'));

// Build & Optimization
const CLITool= lazy(() => import( './CLITool'));
const AtomicCSS= lazy(() => import( './AtomicCSS'));
const CacheManagement= lazy(() => import( './CacheManagement'));
const Configuration= lazy(() => import( './Configuration'));
const SourceMaps =lazy(() => import( './SourceMaps'));
const Minification= lazy(() => import( './Minification'));

// Framework Integration
const VanillaJS= lazy(() => import( './VanillaJS'));
const ReactSetup= lazy(() => import( './ReactSetup'));
const VueComposables= lazy(() => import( './VueComposables'));
const NextJS= lazy(() => import( './NextJS'));
const RSCSupport= lazy(() => import( './RSCSupport'));

// Plugins & Tooling
const VitePlugin= lazy(() => import( './VitePlugin'));
const WebpackPlugin= lazy(() => import( './WebpackPlugin'));
const NextJSPlugin= lazy(() => import( './NextJSPlugin'));

// Development
const TypeScriptTypes= lazy(() => import( './TypeScriptTypes'));

// Reference
const APIReference= lazy(() => import( './APIReference'));
const CLIReference= lazy(() => import( './CLIReference'));
const ConfigReference= lazy(() => import( './ConfigReference'));

// Mastery Path
/*import MasteryOverview from './mastery/MasteryOverview';
import BeginnerPath from './mastery/BeginnerPath';
import IntermediatePath from './mastery/IntermediatePath';
import AdvancedPath from './mastery/AdvancedPath';
import ExpertPath from './mastery/ExpertPath';
import LevelDetail from './mastery/LevelDetail';*/

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleLinkClick = () => {
  if (window.innerWidth < 1025) {  // Only close on mobile
    setSidebarOpen(false);
  }
};
  return (
    <div className={docsContainer}>
      {/* Mobile menu button */}
      <button 
        className={mobileMenuBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        Menu
      </button>
      <aside className={`${sidebarOpen ? docsSidebarOpen : docsSidebar }`}>
        {/* GETTING STARTED */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Getting Started</div>
          <NavLink to="/docs" end onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Introduction
          </NavLink>
          <NavLink to="/docs/installation" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Installation
          </NavLink>
          <NavLink to="/docs/quick-start" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Quick Start
          </NavLink>
          <NavLink to="/docs/your-first-style" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Your First Style
          </NavLink>
        </div>
        
        {/* CORE CONCEPTS */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Core Concepts</div>
          <NavLink to="/docs/core-concepts" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Chainable API
          </NavLink>
          <NavLink to="/docs/css-properties" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            CSS Properties
          </NavLink>
          <NavLink to="/docs/selectors" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Selectors
          </NavLink>
          <NavLink to="/docs/hover-states" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Hover & Interactive States
          </NavLink>
          <NavLink to="/docs/at-rules" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            At-Rules
          </NavLink>
          <NavLink to="/docs/nested-selectors" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Nested Selectors
          </NavLink>
          
          <NavLink to="/docs/modular-design" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Modular Design
          </NavLink>
        </div>
        
        {/* DESIGN SYSTEM */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Design System</div>
          <NavLink to="/docs/design-tokens" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Design Tokens
          </NavLink>
          <NavLink to="/docs/theming" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Dynamic Theming
          </NavLink>
          <NavLink to="/docs/css-variables" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            CSS Variables
          </NavLink>
          <NavLink to="/docs/theme-contract" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Theme Contract
          </NavLink>
        </div>
        
        {/* COMPONENT SYSTEM */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Component System</div>
          <NavLink to="/docs/recipes" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Recipes System
          </NavLink>
          <NavLink to="/docs/variants" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Variants
          </NavLink>
          <NavLink to="/docs/compound-variants" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Compound Variants
          </NavLink>
          <NavLink to="/docs/advance-variants" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Advance Variants
          </NavLink>
        </div>
        
        {/* BUILD & OPTIMIZATION */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Build & Optimization</div>
          <NavLink to="/docs/cli" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            CLI Tool
          </NavLink>
          <NavLink to="/docs/atomic-css" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Atomic CSS
          </NavLink>
          <NavLink to="/docs/cache-management" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Cache Management
          </NavLink>
          <NavLink to="/docs/configuration" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Configuration
          </NavLink>
          <NavLink to="/docs/source-maps" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Source Maps
          </NavLink>
          <NavLink to="/docs/minification" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Minification
          </NavLink>
        </div>
        
        {/* FRAMEWORK INTEGRATION */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Framework Integration</div>
          <NavLink to="/docs/vanilla-js" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Vanilla JavaScript
          </NavLink>
          <NavLink to="/docs/react" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            React Integration
          </NavLink>
          <NavLink to="/docs/vue" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Vue Composables
          </NavLink>
          <NavLink to="/docs/nextjs" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Next.js (SSR & RSC)
          </NavLink>
          <NavLink to="/docs/rsc" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            React Server Components
          </NavLink>
        </div>
        
        {/* PLUGINS & TOOLING */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Plugins & Tooling</div>
          <NavLink to="/docs/vite-plugin" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Vite Plugin
          </NavLink>
          <NavLink to="/docs/webpack-plugin" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Webpack Plugin
          </NavLink>
          <NavLink to="/docs/nextjs-plugin" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Next.js Plugin
          </NavLink>
        </div>
        
        {/* DEVELOPMENT */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Development</div>
          <NavLink to="/docs/typescript" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            TypeScript Types
          </NavLink>
        </div>
        
        {/* REFERENCE */}
        <div className={sidebarSection}>
          <div className={sidebarTitle}>Reference</div>
          <NavLink to="/docs/api" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            API Reference
          </NavLink>
          <NavLink to="/docs/cli-reference" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            CLI Reference
          </NavLink>
          <NavLink to="/docs/config-reference" onClick={handleLinkClick} className={({ isActive }) => isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink}>
            Configuration Reference
          </NavLink>
        </div>
      </aside>
      
      <main className={content}>
        <Suspense fallback={<div style={{padding: 24}}>Loading…</div>}>
          <Routes>
            {/* Getting Started */}
            <Route index element={<GettingStarted />} />
            <Route path="installation" element={<Installation />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="your-first-style" element={<YourFirstStyle />} />
            
            {/* Core Concepts */}
            <Route path="core-concepts" element={<CoreConcepts />} />
            <Route path="css-properties" element={<CSSProperties />} />
            <Route path="selectors" element={<Selectors />} />
            <Route path="hover-states" element={<HoverStates />} />
            <Route path="at-rules" element={<AtRules />} />
            <Route path="nested-selectors" element={<NestedSelectors />} />
            
            <Route path="modular-design" element={<ModularDesign />} />

            {/* Design System */}
            <Route path="design-tokens" element={<DesignTokens />} />
            <Route path="theming" element={<Theming />} />
            <Route path="css-variables" element={<CSSVariables />} />
            <Route path="theme-contract" element={<ThemeContract />} />
            
            {/* Component System */}
            <Route path="recipes" element={<Recipes />} />
            <Route path="variants" element={<Variants />} />
            <Route path="compound-variants" element={<CompoundVariants />} />
            <Route path="advance-variants" element={<VariantsDeepDive />} />
            
            {/* Build & Optimization */}
            <Route path="cli" element={<CLITool />} />
            <Route path="atomic-css" element={<AtomicCSS />} />
            <Route path="cache-management" element={<CacheManagement />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="source-maps" element={<SourceMaps />} />
            <Route path="minification" element={<Minification />} />
            
            {/* Framework Integration */}
            <Route path="vanilla-js" element={<VanillaJS />} />
            <Route path="react" element={<ReactSetup />} />
            <Route path="vue" element={<VueComposables />} />
            <Route path="nextjs" element={<NextJS />} />
            <Route path="rsc" element={<RSCSupport />} />
            
            {/* Plugins & Tooling */}
            <Route path="vite-plugin" element={<VitePlugin />} />
            <Route path="webpack-plugin" element={<WebpackPlugin />} />
            <Route path="nextjs-plugin" element={<NextJSPlugin />} />
            
            {/* Development */}
            <Route path="typescript" element={<TypeScriptTypes />} />
            
            {/* Reference */}
            <Route path="api" element={<APIReference />} />
            <Route path="cli-reference" element={<CLIReference />} />
            <Route path="config-reference" element={<ConfigReference />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}