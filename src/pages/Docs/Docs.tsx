import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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
const RunCompileMethod= lazy(() => import( './RunCompileMethod'));
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
const Troubleshooting =lazy(() => import( './Troubleshooting'));
const UpgradeGuide= lazy(() => import( './UpgradeGuide'));

// Mastery Path
/*import MasteryOverview from './mastery/MasteryOverview';
import BeginnerPath from './mastery/BeginnerPath';
import IntermediatePath from './mastery/IntermediatePath';
import AdvancedPath from './mastery/AdvancedPath';
import ExpertPath from './mastery/ExpertPath';
import LevelDetail from './mastery/LevelDetail';*/

export default function Docs() {
  return (
    <div className="docs-container">
      <aside className="docs-sidebar">
        {/* GETTING STARTED */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Getting Started</div>
          <NavLink to="/docs" end className="docs-sidebar-link">
            Introduction
          </NavLink>
          <NavLink to="/docs/installation" className="docs-sidebar-link">
            Installation
          </NavLink>
          <NavLink to="/docs/quick-start" className="docs-sidebar-link">
            Quick Start
          </NavLink>
          <NavLink to="/docs/your-first-style" className="docs-sidebar-link">
            Your First Style
          </NavLink>
        </div>
        
        {/* CORE CONCEPTS */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Core Concepts</div>
          <NavLink to="/docs/core-concepts" className="docs-sidebar-link">
            Chainable API
          </NavLink>
          <NavLink to="/docs/css-properties" className="docs-sidebar-link">
            CSS Properties
          </NavLink>
          <NavLink to="/docs/selectors" className="docs-sidebar-link">
            Selectors
          </NavLink>
          <NavLink to="/docs/hover-states" className="docs-sidebar-link">
            Hover & Interactive States
          </NavLink>
          <NavLink to="/docs/at-rules" className="docs-sidebar-link">
            At-Rules
          </NavLink>
          <NavLink to="/docs/nested-selectors" className="docs-sidebar-link">
            Nested Selectors
          </NavLink>
          <NavLink to="/docs/run-compile-method" className="docs-sidebar-link">
            run() & compile() Method
          </NavLink>
          <NavLink to="/docs/modular-design" className="docs-sidebar-link">
            Modular Design
          </NavLink>
        </div>
        
        {/* DESIGN SYSTEM */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Design System</div>
          <NavLink to="/docs/design-tokens" className="docs-sidebar-link">
            Design Tokens
          </NavLink>
          <NavLink to="/docs/theming" className="docs-sidebar-link">
            Dynamic Theming
          </NavLink>
          <NavLink to="/docs/css-variables" className="docs-sidebar-link">
            CSS Variables
          </NavLink>
          <NavLink to="/docs/theme-contract" className="docs-sidebar-link">
            Theme Contract
          </NavLink>
        </div>
        
        {/* COMPONENT SYSTEM */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Component System</div>
          <NavLink to="/docs/recipes" className="docs-sidebar-link">
            Recipes System
          </NavLink>
          <NavLink to="/docs/variants" className="docs-sidebar-link">
            Variants
          </NavLink>
          <NavLink to="/docs/compound-variants" className="docs-sidebar-link">
            Compound Variants
          </NavLink>
          <NavLink to="/docs/advance-variants" className="docs-sidebar-link">
            Advance Variants
          </NavLink>
        </div>
        
        {/* BUILD & OPTIMIZATION */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Build & Optimization</div>
          <NavLink to="/docs/cli" className="docs-sidebar-link">
            CLI Tool
          </NavLink>
          <NavLink to="/docs/atomic-css" className="docs-sidebar-link">
            Atomic CSS
          </NavLink>
          <NavLink to="/docs/cache-management" className="docs-sidebar-link">
            Cache Management
          </NavLink>
          <NavLink to="/docs/configuration" className="docs-sidebar-link">
            Configuration
          </NavLink>
          <NavLink to="/docs/source-maps" className="docs-sidebar-link">
            Source Maps
          </NavLink>
          <NavLink to="/docs/minification" className="docs-sidebar-link">
            Minification
          </NavLink>
        </div>
        
        {/* FRAMEWORK INTEGRATION */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Framework Integration</div>
          <NavLink to="/docs/vanilla-js" className="docs-sidebar-link">
            Vanilla JavaScript
          </NavLink>
          <NavLink to="/docs/react" className="docs-sidebar-link">
            React Integration
          </NavLink>
          <NavLink to="/docs/vue" className="docs-sidebar-link">
            Vue Composables
          </NavLink>
          <NavLink to="/docs/nextjs" className="docs-sidebar-link">
            Next.js (SSR & RSC)
          </NavLink>
          <NavLink to="/docs/rsc" className="docs-sidebar-link">
            React Server Components
          </NavLink>
        </div>
        
        {/*PLUGINS & TOOLING */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Plugins & Tooling</div>
          <NavLink to="/docs/vite-plugin" className="docs-sidebar-link">
            Vite Plugin
          </NavLink>
          <NavLink to="/docs/webpack-plugin" className="docs-sidebar-link">
            Webpack Plugin
          </NavLink>
          <NavLink to="/docs/nextjs-plugin" className="docs-sidebar-link">
            Next.js Plugin
          </NavLink>
        </div>
        
        {/* DEVELOPMENT */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Development</div>
          <NavLink to="/docs/typescript" className="docs-sidebar-link">
            TypeScript Types
          </NavLink>
        </div>
        
        {/*REFERENCE */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Reference</div>
          <NavLink to="/docs/api" className="docs-sidebar-link">
            API Reference
          </NavLink>
          <NavLink to="/docs/cli-reference" className="docs-sidebar-link">
            CLI Reference
          </NavLink>
          <NavLink to="/docs/config-reference" className="docs-sidebar-link">
            Configuration Reference
          </NavLink>
          <NavLink to="/docs/troubleshooting" className="docs-sidebar-link">
            Troubleshooting
          </NavLink>
          <NavLink to="/docs/upgrade-guide" className="docs-sidebar-link">
            Upgrade Guide
          </NavLink>
        </div>
        
        {/* MASTERY PATH 
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title"> Mastery Path</div>
          <NavLink to="/docs/mastery" end className="docs-sidebar-link">
            Overview
          </NavLink>
          <NavLink to="/docs/mastery/beginner" className="docs-sidebar-link">
            Beginner (Levels 1-3)
          </NavLink>
          <NavLink to="/docs/mastery/intermediate" className="docs-sidebar-link">
            Intermediate (Levels 4-6)
          </NavLink>
          <NavLink to="/docs/mastery/advanced" className="docs-sidebar-link">
             Advanced (Levels 7-9)
          </NavLink>
          <NavLink to="/docs/mastery/expert" className="docs-sidebar-link">
             Expert (Levels 10-12)
          </NavLink>
        </div>*/}
      </aside>
      
      <main className="docs-content">
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
          <Route path="run-compile-method" element={<RunCompileMethod />} />
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
          
          {/*Reference */}
          <Route path="api" element={<APIReference />} />
          <Route path="cli-reference" element={<CLIReference />} />
          <Route path="config-reference" element={<ConfigReference />} />
          <Route path="troubleshooting" element={<Troubleshooting />} />
          <Route path="upgrade-guide" element={<UpgradeGuide />} />
          
          {/* Mastery Path 
          <Route path="mastery" element={<MasteryOverview />} />
          <Route path="mastery/beginner" element={<BeginnerPath />} />
          <Route path="mastery/intermediate" element={<IntermediatePath />} />
          <Route path="mastery/advanced" element={<AdvancedPath />} />
          <Route path="mastery/expert" element={<ExpertPath />} />
          <Route path="mastery/level-:levelId" element={<LevelDetail />} />*/}
        </Routes>
        </Suspense>
      </main>
    </div>
  );
}