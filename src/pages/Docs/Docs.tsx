import { Routes, Route, NavLink } from 'react-router-dom';
import GettingStarted from './GettingStarted';
import Installation from './Installation';
import CoreConcepts from './CoreConcepts';
import ModularDesign from './ModularDesign';
import Recipes from './Recipes';
import Theming from './Theming';
import Plugins from './Plugins';
import APIReference from './APIReference';
// New imports
import VariantsDeepDive from './VariantsDeepDive';
import RSCSupport from './RSCSupport';
import SSR from './SSR';
import ThemeContract from './ThemeContract';
import DebugMode from './DebugMode';
import TreeShaking from './TreeShaking';
import AtomicCSS from './AtomicCSS';
import HeadlessComponents from './HeadlessComponents';
import Performance from './Performance';
import UpgradeGuide from './UpgradeGuide';
import Troubleshooting from './Troubleshooting';

export default function Docs() {
  return (
    <div className="docs-container">
      <aside className="docs-sidebar">
        {/* Getting Started */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Getting Started</div>
          <NavLink to="/docs" end className="docs-sidebar-link">
            Introduction
          </NavLink>
          <NavLink to="/docs/installation" className="docs-sidebar-link">
            Installation
          </NavLink>
          <NavLink to="/docs/upgrade-guide" className="docs-sidebar-link">
            Upgrade Guide
          </NavLink>
        </div>
        
        {/* Core Concepts */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Core Concepts</div>
          <NavLink to="/docs/core-concepts" className="docs-sidebar-link">
            Chainable API
          </NavLink>
          <NavLink to="/docs/modular-design" className="docs-sidebar-link">
            Modular Design
          </NavLink>
          <NavLink to="/docs/recipes" className="docs-sidebar-link">
            Recipe System
          </NavLink>
          <NavLink to="/docs/variants-deep-dive" className="docs-sidebar-link">
            Advanced Variants
          </NavLink>
          <NavLink to="/docs/theming" className="docs-sidebar-link">
            Dynamic Theming
          </NavLink>
          <NavLink to="/docs/theme-contract" className="docs-sidebar-link">
            Theme Contracts
          </NavLink>
          <NavLink to="/docs/atomic-css" className="docs-sidebar-link">
            Atomic CSS
          </NavLink>
        </div>
        
        {/* Advanced Features */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Advanced</div>
          <NavLink to="/docs/rsc" className="docs-sidebar-link">
            React Server Components
          </NavLink>
          <NavLink to="/docs/ssr" className="docs-sidebar-link">
            Server-Side Rendering
          </NavLink>
          <NavLink to="/docs/headless" className="docs-sidebar-link">
            Headless Components
          </NavLink>
          <NavLink to="/docs/debug" className="docs-sidebar-link">
            Debug Mode
          </NavLink>
          <NavLink to="/docs/tree-shaking" className="docs-sidebar-link">
            Tree Shaking
          </NavLink>
          <NavLink to="/docs/performance" className="docs-sidebar-link">
            Performance
          </NavLink>
        </div>
        
        {/* Integrations */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Integrations</div>
          <NavLink to="/docs/plugins" className="docs-sidebar-link">
            Build Plugins
          </NavLink>
        </div>
        
        {/* Reference */}
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Reference</div>
          <NavLink to="/docs/api" className="docs-sidebar-link">
            API Reference
          </NavLink>
          <NavLink to="/docs/troubleshooting" className="docs-sidebar-link">
            Troubleshooting
          </NavLink>
        </div>
      </aside>
      
      <main className="docs-content">
        <Routes>
          <Route index element={<GettingStarted />} />
          <Route path="installation" element={<Installation />} />
          <Route path="core-concepts" element={<CoreConcepts />} />
          <Route path="modular-design" element={<ModularDesign />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="variants-deep-dive" element={<VariantsDeepDive />} />
          <Route path="theming" element={<Theming />} />
          <Route path="theme-contract" element={<ThemeContract />} />
          <Route path="atomic-css" element={<AtomicCSS />} />
          <Route path="rsc" element={<RSCSupport />} />
          <Route path="ssr" element={<SSR />} />
          <Route path="headless" element={<HeadlessComponents />} />
          <Route path="debug" element={<DebugMode />} />
          <Route path="tree-shaking" element={<TreeShaking />} />
          <Route path="performance" element={<Performance />} />
          <Route path="plugins" element={<Plugins />} />
          <Route path="api" element={<APIReference />} />
          <Route path="upgrade-guide" element={<UpgradeGuide />} />
          <Route path="troubleshooting" element={<Troubleshooting />} />
        </Routes>
      </main>
    </div>
  );
}